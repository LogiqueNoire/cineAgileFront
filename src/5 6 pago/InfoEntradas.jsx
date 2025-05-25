import { useLocation } from "react-router-dom";

const EntradaCard = ({ infoGeneral, entrada }) => {
    // Adherir 'Z' a la fecha UTC en formato ISO 8601 hará que new Date() transforme
    // dicha fecha a la zona horaria correcta.
    const tiempoRegistroCorrecto = (new Date(entrada.tiempoRegistro + 'Z')).toLocaleString();

    // Falta estandarizar todas las fechas de las funciones a UTC
    const fechaHoraInicioCorrecto = (new Date(infoGeneral.fechaHoraInicio)).toLocaleString();

    const { fila, columna } = entrada.butaca;
    const letra = String.fromCharCode('A'.charCodeAt(0) + fila);

    console.log(infoGeneral)

    return (
    <div className="border border-secondary">
        <div>CineAgile entrada (titulo)</div>
        <div>QR</div>

        <h2>Datos elegidos</h2>
        <p>Pelicula: { infoGeneral.tituloPelicula }</p>
        <p>Fecha y hora: { fechaHoraInicioCorrecto }</p>
        <p>Sede: { infoGeneral.nombreSede } </p>
        <p>Sala: { infoGeneral.sala }</p>
        <p>Butaca: { letra + (columna + 1) }</p>

        <h2>Datos del pago</h2>
        <p>Fecha y hora del pago: { tiempoRegistroCorrecto }</p>
        <p>Precio final: { entrada.costoFinal } nuevos soles </p>
    </div>
    )

}

const InfoEntradas = () => {
    const location = useLocation();
    const { entradas = null } = location.state || {};

    return (
        <div className="container">
            <h1>Entradas</h1>

            { entradas && entradas.entradas.map(el => {
                return (
                    <EntradaCard infoGeneral={ { ...entradas } } entrada={ el } />
                )
            }) }

        </div>
    )
}

export default InfoEntradas;