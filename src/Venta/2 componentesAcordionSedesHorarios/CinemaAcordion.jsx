import { env } from '@/configuracion/backend';
import './CinemaAcordion.css';
import ScreeningButton from './ScreeningButton.jsx';

const CinemaAcordion = ({ data, pelicula }) => {
    env === "dev" && console.log(data);
    return (
        <div className="mx-3">
            {data.funciones.map((sede) => (
                <div key={sede.idSede} className="card mb-3 border-0 shadow">
                    <button
                        className="card-header p-3"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={ "#s" + sede.idSede } //`#${sede.nombreSede.replace(/\s+/g, '')}`}
                        aria-expanded="false"
                        aria-controls={ `s${sede.idSede}` } //sede.nombreSede.replace(/\s+/g, '')}
                    >
                        <h5 className='ancizar-sans-regular mb-0 text-start h5'>{sede.nombreSede}</h5>
                    </button>

                    <div className="card-body collapse p-3" 
                        id={ `s${sede.idSede}` } // sede.nombreSede.replace(/\s+/g, '')  }>
                    >
                        {["2D Regular", "2D Prime", "3D Regular", "3D Prime"].map((tipo) => {
                            const [dimension, categoria] = tipo.split(" ");


                            const funcionesFiltradas = sede.funciones.filter(
                                f => f.dimension === dimension && f.categoria === categoria
                            );

                            return funcionesFiltradas.length > 0 ? (
                                <div className='d-flex flex-column gap-2' key={tipo}>
                                    <h5 className="ancizar-sans-regular mb-0 card-title h5">{tipo}</h5>
                                    <div className="row mb-2">
                                        {funcionesFiltradas.map(funcion => (
                                            <ScreeningButton key={funcion.idFuncion} pelicula={pelicula} funcion={funcion}/>
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
