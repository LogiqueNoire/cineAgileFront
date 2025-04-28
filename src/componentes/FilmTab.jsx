import { Link } from "react-router";

const FilmTab = () => {
    return (<>
        <div className="peli-head d-flex justify-content-evenly">
            <div className='fs-1'> PELÍCULAS </div>
            <ul className='fs-2 peli-nav nav nav-tabs'>
                <li className='nav-item'><Link className='nav-link active' to="?tab=estreno">En cartelera</Link></li>
                <li className='nav-item'><Link className='nav-link' to="?tab=proximamente">Próximamente</Link></li>
            </ul>
        </div>
    </>)
}

export default FilmTab;