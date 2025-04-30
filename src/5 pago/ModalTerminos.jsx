import React from 'react';
import './pago.css';

export const ModalTerminos = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3 className="modal-title">Términos y Condiciones</h3>
        <div>
          <strong>Aceptación de Términos:</strong> Al comprar en línea en Cineplanet, el usuario acepta los términos y condiciones.
        </div>
        <div>
          <strong>Compra y Devoluciones:</strong> Las compras no son reembolsables ni modificables. Los productos deben recogerse el mismo día y se aplican cargos adicionales.
        </div>
        <div>
          <strong>Métodos de Pago:</strong> El pago se realiza con tarjeta de crédito o débito, o mediante billeteras digitales. Algunas tarjetas pueden ser rechazadas, y no se aceptan tarjetas extranjeras.
        </div>
        <div>
          <strong>Registro de Socio:</strong> No obligatorio, pero permite beneficios. El usuario es responsable de la seguridad de su cuenta.
        </div>
        <div>
          <strong>Ingreso a la Sala:</strong> Se requiere comprobante de compra para ingresar. Está prohibido el ingreso de alimentos, bebidas externas, armas o cámaras.
        </div>
        <div>
          <strong>Normas de Comportamiento:</strong> Se prohíben comportamientos peligrosos o de acoso. El cine puede negar el acceso a quienes no respeten las normas.
        </div>
        <div>
          <strong>Política de Reembolsos:</strong> Solo se aceptan devoluciones por doble cobro o falta de confirmación. No se aceptan devoluciones de entradas anticipadas.
        </div>
        <div>
          <strong>Canjes Online:</strong> No se permiten cambios ni devoluciones de boletos corporativos por error. Existen boletos corporativos totales y parciales.
        </div>
        <div>
          <strong>Discapacidad:</strong> Personas con discapacidad acreditada tienen un descuento del 20% en entradas, con presentación de carnet CONADIS y DNI.
        </div>
        <button className="close-button" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};