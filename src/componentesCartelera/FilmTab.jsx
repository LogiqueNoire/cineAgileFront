import { useState } from "react";
import { Link } from "react-router";

const categorias = [ "estreno", "proximamente" ]

const FilmTab = () => {
    const [ seleccion, setSeleccion ] = useState(0)

    return (<>
        <div className="peli-head d-flex justify-content-evenly">
            <div className='fs-1'> PELÍCULAS </div>
            <ul className='fs-2 peli-nav nav nav-tabs'>
                { categorias.map((el, i) => {
                    return <>
                        <li key={i} className='nav-item'>
                            <Link 
                                className={`nav-link ${ seleccion === i ? "active" : "" }`} 
                                to={`?tab=${ el }` } onClick={ () => setSeleccion(i) }>
                                    En cartelera
                            </Link>
                        </li>
                    </>
                }) }
            </ul>
        </div>
    </>)
}

export default FilmTab;