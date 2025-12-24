import Pelicula from "@/services/Pelicula";
import FTextInput from "@/components/FTextInput";
import FSelectInput from "@/components/FSelectInput";
import FNumberInput from "@/components/FNumberInput";
import FDateInput from "@/components/FDateInput";
import FTextAreaInput from "@/components/FTextAreaInput";
import FGeneroInput from "./FGeneroInput";

import Cookies from "js-cookie";
import axios from "axios";
import { url } from "@/configuracion/backend";
import { useState, useEffect } from "react";
import Loading from "@/components/Loading/Loading";
import Genero from "@/services/Genero";

const ordenamientoAlfa = (a, b) => {
    const x = a.nombre.toLowerCase();
    const y = b.nombre.toLowerCase();

    return x < y ? -1 : 1;
}

const PeliculaModal = ({ pelicula, onCerrar }) => {
    const [generos, setGeneros] = useState([])

    const onInputSave = async (keyValue) => {
        await Pelicula.editarPelicula({ idPelicula: pelicula.idPelicula, ...keyValue });
    };

    const consultarGeneros = async () => {
        try {
          const datos = await Genero.consultarGeneros()
    
          setGeneros(datos.sort(ordenamientoAlfa))
        } catch (error) {
          console.error(error);
        }
    }

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                await consultarGeneros();

            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        obtenerDatos();
    }, []);


    // console.log('Pelicula Modal: ', pelicula, generos);

    return (
        <div>
            <div className="modal-terminos-overlay">
                <div className="modal-terminos w-75 d-flex flex-column align-items-center p-5" style={{ "max-height": "80vh", "overflow-y": "auto" }}>
                    <div className="d-flex align-items-center justify-content-between w-100 mb-3 gap-2">
                        <button className="btn btn-danger" onClick={onCerrar}>Cerrar</button>
                        <h2 className="text-wrap text-end">Detalles Pelicula</h2>
                    </div>
                    <div className="d-flex flex-column gap-3 w-100">
                        <div className="row d-flex gap-3">
                            <FTextInput className="col-xl" atributo={"nombre"} valorPorDefecto={pelicula.nombre} label={"Nombre (máx. 255 caracteres)"} onSave={onInputSave} required={true} />
                            <FNumberInput className="col-lg" atributo={"duracion"} valorPorDefecto={pelicula.duracion} label={"Duración (máx. 500 min)"} onSave={onInputSave} required={true} />
                            <FDateInput className="col-lg" atributo={"fechaEstreno"} valorPorDefecto={pelicula.fechaInicioEstreno} label={"Fecha Inicio Estreno"} onSave={onInputSave} required={true} />
                        </div>
                        <div className="row">
                            <FTextInput atributo={"actores"} valorPorDefecto={pelicula.actores} label={"Actores principales (opcional, máx. 255 caracteres)"} onSave={onInputSave} />
                        </div>
                        <div className="row gap-3">
                            <FTextInput className="col-lg" atributo={"director"} valorPorDefecto={pelicula.director} label={"Director (máx. 255 caracteres)"} onSave={onInputSave} required={true} />
                            <FSelectInput className="col-lg" atributo={ "clasificacion" }
                                opciones={ [ "Apto para todos", "+14", "+18" ] } 
                                valorPorDefecto={ pelicula.clasificacion } label={"Clasificación"} onSave={ onInputSave }
                                required={true}
                            />
                        </div>
                        
                        <div className="row">
                            <FTextInput atributo={"urlImagen"} valorPorDefecto={pelicula.imageUrl} label={"Imagen URL (máx. 255 caracteres)"} onSave={onInputSave} required={true} />
                        </div>
                        
                        <div className="row gap-4">
                            {  generos.length == 0 
                                ? <Loading />
                                :
                                <FGeneroInput
                                    className={"col"} 
                                    atributo={ "generos" }
                                    generos={ generos } 
                                    valoresPorDefecto={ pelicula.genero } onSave={ onInputSave }
                                    required={true}
                                />
                            }
                            <FTextAreaInput className="col" atributo={"sinopsis"} valorPorDefecto={pelicula.sinopsis} label={"Sinopsis (máx. 500 caracteres)"} onSave={onInputSave} required={true} />
                        </div>

                        <div className="row">
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
};

export default PeliculaModal;