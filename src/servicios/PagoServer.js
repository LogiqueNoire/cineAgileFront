// src/mirage/server.js
import { createServer } from "miragejs";
import { url } from "../configuracion/backend";


export function makeServer() {
  console.log("Mirage JS server initialized!");
  createServer({
    routes() {
      this.passthrough(url); // Esto cubre todas las rutas bajo tu URL base del backend.

      // Opcional: Si tienes otras llamadas a APIs externas o archivos estáticos
      // que no deben ser simulados por Mirage y no pasan por tu backend real,
      // puedes añadir un passthrough global para ellos:
      //this.passthrough();

      // 2. Ahora, define tus rutas que SÍ quieres simular.
      // Esto DEBE ir DESPUÉS de los passthrough para el backend real,
      // para que Mirage sepa que debe interceptar ESTAS rutas.
      this.namespace = "api";

      // Simulación de pago
      this.post("/pago", (schema, request) => {
        const datos = JSON.parse(request.requestBody);
        const { nombre, correo, metodo, tarjeta } = datos;

        if (!nombre || !correo || !metodo) {
          return new Response(400, {}, { error: "Faltan datos obligatorios" });
        }

        const estado = Math.random() > 0.3 ? "aprobado" : "rechazado";

        return {
          estado,
          transaccionId: Math.floor(Math.random() * 1000000),
        };
      });

    },
  });
}



