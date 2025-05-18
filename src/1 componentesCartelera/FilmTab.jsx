import { useState } from "react";
import { Link } from "react-router-dom";

const categorias = [ "estreno", "proximamente" ]

const FilmTab = ({ query }) => {
    let cat = categorias.find(el => el == query)
    cat = cat ? cat : "estreno"

    return (<>
        <div className="peli-head d-flex justify-content-evenly">
            <div className='fs-1'> PELÍCULAS </div>
            <ul className='fs-2 peli-nav nav nav-tabs'>
                { categorias.map((el, i) => {
                    return <>
                        <li key={i} className='nav-item'>
                            <Link 
                                className={`nav-link ${ cat == el ? "active" : "" }`} 
                                to={`?tab=${ el }` }>
                                    { el }
                            </Link>
                        </li>
                    </>
                }) }
            </ul>
        </div>
    </>)
}

export default FilmTab;