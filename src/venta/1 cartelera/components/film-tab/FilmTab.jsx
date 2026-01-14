import { Link } from "react-router-dom";

const categorias = ["En cartelera", "Próximamente"]

const FilmTab = ({ query }) => {
    let cat = categorias.find(el => el === query)
    cat = cat || "En cartelera"

    return (
        <div className="peli-head d-flex justify-content-evenly flex-wrap my-2">
            <div className='fs-1 fw-bold'>Películas</div>
            <ul className='fs-2 peli-nav nav'>
                {categorias.map((el, i) =>
                    <li key={i} className='nav-item'>
                        <Link to={`?tab=${el}`} className={`nav-link tab ${cat === el ? "active activetab" : "inactivetab"}`}>
                            {el}
                        </Link>
                    </li>)
                }
            </ul>
        </div>
    )
}

export default FilmTab;