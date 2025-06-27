import { useReducer, useState } from "react";

import guardar from '../../assets/guardar.svg';
import pencilSvg from "../../assets/pencil.svg"

const generoReducer = (state, action) => {
    switch(action.tipo) {
        case 'toggle': {
            const nuevoEstado = [ ...state ];

            for (const item of nuevoEstado) {
                if (item.id == action.id) {
                    item.checked = !item.checked;
                    break;
                }
            }

            return nuevoEstado;
        }

        default:
            return state;
    }
};

const generoMakeInitialStatus = (totalGeneros, generosPelicula) => {
    return totalGeneros.map(genero => ({
        ...genero,
        checked: generosPelicula.some(gp => gp.id == genero.id)
    }));
};

const FGeneroInput = ({ className, valoresPorDefecto, onSave, generos, atributo, required }) => {
    const [ modo, setModo ] = useState("read"); // read, edit, submitting
    // const [ input, setInput ] = useState(valoresPorDefecto);
    const [ status, setStatus ] = useState({ error: false, msg: null });

    const [ generosEstado, dispatch ] = useReducer(generoReducer, [], () => generoMakeInitialStatus(generos, valoresPorDefecto));

    const onEditClick = () => {
        setModo("edit");
    }

    const onSaveClick = () => {
        const generosSel = generosEstado.filter(genState => genState.checked).map(g => ({ 
            id: g.id,
            nombre: g.nombre
         }));

        if (generosSel.length == 0) {
            setStatus({ error: true, msg: "Género(s) no seleccionado(s)." })
            return;
        }

        console.log(generosSel);

        if (modo == "submitting") return;
        setModo("submitting");

        onSave({ [atributo]: input }).then(res => {
            setModo("read");
        }).catch(err => {
            if (err.response?.data) {
                setStatus({ error: true, msg: err.response.data })
            } else {
                setStatus({ error: true, msg: "Error del servidor" })
            }
            setModo("edit")
        })
    };

    const onChange = (evt) => {
        const nuevosGeneros = +evt.target.dataset.idgenre;
        dispatch({ tipo: "toggle", id: nuevosGeneros });

        if (status.error)
            setStatus({ error: false, msg: null });
    }

    return (
        <>

        <div className={`${className} py-2 px-4 border border-3 rounded`}>
            <div className="d-flex justify-content-between">
                <div className="fs-2">Géneros</div>
                
                <button className="btn btn-primary py-2 px-4 align-self-start" onClick={ modo == "read" ? onEditClick : onSaveClick } disabled={ modo == "submitting" }>
                    { modo == "submitting" ? 
                    <span className="d-flex align-items-center mx-2 my-2 spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </span> 
                    : 
                    ( modo == "read" ? 
                        <img src={pencilSvg} /> 
                        : modo == "edit" ? 
                            <img src={guardar} style={{ "width": "32px", "height": "32px" }} /> : "" )
                    }
                </button>
            </div>

            <div className={`col ${ status.error && '' }`}>

                <div className={`${ status.error && 'border-danger' } rounded p-3`} style={{ height: '200px', overflowY: 'auto' }}>
                {generosEstado.map((genre, id) => {
                    return (
                      <div className="form-check" key={genre.id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          data-idgenre={genre.id}
                          checked={genre.checked}
                          onChange={ onChange }
                          disabled={ modo == 'read' }
                        />
                        <label className="form-check-label" htmlFor={`genre-${genre.id}`}>
                          {genre.nombre}
                        </label>
                      </div>
                    );
                  })}
                </div>

                { status.error &&
                    <div className="text-danger">Debe seleccionar por lo menos 1 género.</div>
                }

            </div>

            { status.msg && 
                <div class="invalid-feedback">
                    { status.msg }
                </div>
            }
        </div>


        </>
    )
}

export default FGeneroInput;