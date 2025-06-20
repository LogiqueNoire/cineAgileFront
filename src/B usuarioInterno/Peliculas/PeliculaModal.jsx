import Pelicula from "../../servicios/Pelicula";
import FTextInput from "../../0 componentesGenerales/FTextInput";
import FSelectInput from "../../0 componentesGenerales/FSelectInput";

const PeliculaModal = ({ pelicula, onCerrar }) => {

    const onInputSave = async (keyValue) => {
        await Pelicula.editarPelicula({ idPelicula: pelicula.idPelicula, ...keyValue });
    };

    return (
        <div>
            <div className="modal-terminos-overlay">
                <div className="modal-terminos w-50 d-flex flex-column align-items-center p-5" style={{ "max-height": "80vh", "overflow-y": "auto" }}>
                    <div className="d-flex align-items-center justify-content-between w-100 mb-3">
                        <button className="btn btn-danger" onClick={onCerrar}>Cerrar</button>
                        <h2>Detalles Pelicula</h2>
                    </div>
                    <div className="d-flex flex-column gap-3 w-100">
                        <FTextInput atributo={"nombre"} valorPorDefecto={ pelicula.nombre } label={"Nombre"} onSave={ onInputSave } />
                        <FTextInput atributo={"director"} valorPorDefecto={ pelicula.director } label={"Director"} onSave={ onInputSave } />
                        <FTextInput atributo={"actores"} valorPorDefecto={ pelicula.actores } label={"Actores"} onSave={ onInputSave } />
                        <FSelectInput atributo={ "genero" }
                            opciones={ [ "Acción", "Animación", "Biográfico", "Ciencia ficción", "Comedia", "Drama", "Documental", "Terror", "Thriller" ] } 
                            valorPorDefecto={ pelicula.genero } label={"Género"} onSave={ onInputSave }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PeliculaModal;