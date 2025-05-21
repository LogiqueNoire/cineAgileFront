import React from "react";

export const FormularioTarjeta = ({ tarjeta, setTarjeta }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTarjeta((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const simularPago = (e) => {
    e.preventDefault();
    console.log("Datos tarjeta:", tarjeta);
    alert("Pago simulado con éxito!");
  };

  return (
    <form className="formulario-tarjeta" onSubmit={simularPago}>
      <div className="input-row">
        <input
          className="input-numero"
          type="text"
          name="numero"
          placeholder="Número de tarjeta"
          value={tarjeta.numero}
          onChange={handleChange}
          maxLength={16}
          required
        />
        <select
          className="input-tipo"
          name="tipo"
          value={tarjeta.tipo}
          onChange={handleChange}
          required
        >
          <option value="">Tipo</option>
          <option value="credito">Crédito</option>
          <option value="debito">Débito</option>
        </select>
      </div>

      <div className="input-row">
        <select
          className="input-mes"
          name="mes"
          value={tarjeta.mes}
          onChange={handleChange}
          required
        >
          <option value="">Mes</option>
          {[...Array(12)].map((_, i) => {
            const month = (i + 1).toString().padStart(2, "0");
            return (
              <option key={month} value={month}>
                {month}
              </option>
            );
          })}
        </select>

        <select
          className="input-anio"
          name="anio"
          value={tarjeta.anio}
          onChange={handleChange}
          required
        >
          <option value="">Año</option>
          {(() => {
            const currentYear = new Date().getFullYear();
            const years = [];
            for (let i = 0; i < 10; i++) {
              const year = (currentYear + i).toString().slice(2);
              years.push(year);
            }
            return years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ));
          })()}
        </select>

        <input
          className="input-cvv"
          type="text"
          name="cvv"
          placeholder="CVV"
          value={tarjeta.cvv}
          onChange={handleChange}
          maxLength={3}
          required
        />
      </div>

      <button type="submit" className="pay-button">
        Pagar
      </button>
    </form>
  );
};
