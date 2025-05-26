import './pago.css';

export const ModalTerminos = ({ onClose }) => {
  return (
    <div className="modal-terminos-overlay">
      <div className="modal-terminos">
        <h3 className="modal-terminos-title">Términos y Condiciones</h3>
        <div>
          <strong>Aceptación de Términos:</strong> Al comprar en línea en CineAgile, el usuario acepta los términos y condiciones.
        </div>
        <div>
          <strong>Compra y Devoluciones:</strong> Las compras no son reembolsables ni modificables.
        </div>
        <div>
          <strong>Métodos de Pago:</strong> El pago se realiza con tarjeta de crédito o débito, o mediante billeteras digitales. Algunas tarjetas pueden ser rechazadas y no se aceptan tarjetas extranjeras.
        </div>
        <div>
          <strong>Ingreso a la Sala:</strong> Se requiere la entrada para ingresar a la sala. El personal validará los datos de la entrada mediante el escaneo del QR y, de ser necesario, validará los datos de la persona. Ante cualquier falta a la verdad determinada por el personal durante el ingreso o verificación manual, la empresa se reserva el derecho a impedir el ingreso de aquellas personas sin derecho a reembolso bajo ningún criterio.
        </div>
        <div>
          <strong>Elementos Prohibidos:</strong> Está prohibido el ingreso de bebidas alcohólicas y armas.
        </div>
        <div>
          <strong>Normas de Comportamiento:</strong> Se prohíben comportamientos peligrosos o de acoso. El cine puede negar el acceso a quienes no respeten las normas. No se permite grabar total o parcialmente el contenido de la función.
        </div>
        <button className="terminos-close-button" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};