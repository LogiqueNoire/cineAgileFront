import './pago.css';

export const ModalTerminos = ({ onClose }) => {
  return (
    <div className="modal-terminos-overlay">
      <div className="modal-terminos w-75">
        <h3 className="modal-terminos-title ancizar-sans-regular mb-2 fs-2 text-center cineagile-blue-500">Términos y Condiciones</h3>
        <div>
          <strong>Aceptación de Términos:</strong><br />
          Al comprar en línea en cineagile, el usuario acepta los términos y condiciones.
        </div>
        <div>
          <strong>Compra y Devoluciones:</strong><br />
          Las compras no son reembolsables ni modificables.
        </div>
        <div>
          <strong>Métodos de Pago:</strong><br />
          El pago se realiza con tarjeta de crédito o débito. Algunas tarjetas pueden ser rechazadas y no se aceptan tarjetas extranjeras.
        </div>
        <div>
          <strong>Ingreso a la Sala:</strong><br />
          Se requiere la entrada para ingresar a la sala. El personal validará los datos de la entrada mediante el escaneo del QR y, de ser necesario, validará los datos de la persona. Ante cualquier falta a la verdad determinada por el personal durante el ingreso o verificación manual, la empresa se reserva el derecho a impedir el ingreso de aquellas personas sin derecho a reembolso bajo ningún criterio.
        </div>
        <div>
          <strong>Bloqueo de butacas:</strong><br />
          Las butacas seleccionadas durante una compra que no se lleguen a realizar exitosamente, quedarán bloqueadas. Se recomienda elegir otras butacas, pues al tratarse de venta en línea podrán ser seleccionadas por otros clientes.
        </div>
        <div>
          <strong>Elementos Prohibidos:</strong><br />
          Está prohibido el ingreso de bebidas alcohólicas y armas.
        </div>
        <div>
          <strong>Normas de Comportamiento:</strong><br />
          Se prohíben comportamientos peligrosos o de acoso. El cine puede negar el acceso a quienes no respeten las normas. No se permite grabar total o parcialmente el contenido de la función.
        </div>
        <div>
          <strong>Protección a menores:</strong><br />
          En el supuesto de que Cineagile constate que las personas que utilizarán las entradas
          que el usuario adquirió a través del sistema, no tienen la
          edad correspondiente a la calificación de la película que se exhibirá, Cineagile podrá impedir el
          ingreso de los mismos a la función.
        </div>
        <div>
          <strong>Uso de entrada digital:</strong><br />No es necesario acercarte a boletería para canjear tu entrada virtual. Solo debes dirigirte a la
          taquilla, mostrarla impresa o desde tu celular al momento de ingresar a
          la sala para que realice la descarga del sistema. Para compras online estás aceptando no divulgar tu código QR ni compartirlo con terceros ya que
          esto podría afectarte.
        </div>
        <div>
          <strong>Ingreso a funciones iniciadas:</strong><br />Cineagile podrá permitir la compra de entradas una vez iniciada la función, hasta un máximo de 10 minutos
          después del horario programado de inicio. El Usuario reconoce y acepta que, al adquirir una entrada en
          estas condiciones, puede perder una parte del contenido de la película, siendo su exclusiva
          responsabilidad dicha decisión.
        </div>
        <button className="btn btn-primary btn-primary-gradient mt-3 w-100" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};