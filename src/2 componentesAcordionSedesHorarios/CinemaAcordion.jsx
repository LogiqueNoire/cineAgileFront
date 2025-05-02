import './CinemaAcordion.css';
import ScreeningButton from './ScreeningButton.jsx';

const CinemaAcordion = ({ data, idPelicula, nombrePelicula, imagenPeli }) => {
    
    data.funciones.filter(sede => sede === "CineCentro Cajamarca - El Quinde").map(sede => {
        console.log(sede.funciones)
    })

    return (
        <div className="mx-3">
            {data.funciones.map((sede) => (
                <div key={sede.idSede} className="card mb-3">
                    <button
                        className="card-header"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${sede.nombreSede.replace(/\s+/g, '')}`}
                        aria-expanded="false"
                        aria-controls={sede.nombreSede.replace(/\s+/g, '')}
                    >
                        <h5 className='text-start'>{sede.nombreSede}</h5>
                    </button>

                    <div className="card-body collapse" id={sede.nombreSede.replace(/\s+/g, '')}>
                        {["2D Regular", "2D Prime", "3D Regular", "3D Prime"].map((tipo) => {
                            const [dimension, categoria] = tipo.split(" ");


                            const funcionesFiltradas = sede.funciones.filter(
                                f => f.dimension === dimension && f.categoria === categoria
                            );

                            return funcionesFiltradas.length > 0 ? (
                                <div key={tipo}>
                                    <h5 className="card-title">{tipo}</h5>
                                    <div className="row mb-2">
                                        {funcionesFiltradas.map(funcion => (
                                            <ScreeningButton key={funcion.idFuncion} funcion={funcion} idPelicula={idPelicula} nombrePelicula={nombrePelicula} imagenPeli={imagenPeli} catePeli={catePeli} director={director} sinopsis={sinopsis}/>
                                        ))}
                                    </div>
                                </div>
                            ) : null;
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CinemaAcordion;
