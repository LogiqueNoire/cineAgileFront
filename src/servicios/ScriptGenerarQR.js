import { url } from '../configuracion/backend'
class ScriptGenerarQR {
    
   /*Es solo pa hacer la prueba:v luego se pasa a back si quieren xd*/
    generar() {
        const departamento = "TRUJILLO";
        const idSala = 3; /* segun Yo la sede 1 tiene salas del 1 al 12 , la sede 2 tambien , etc... xd*/
        const filaButaca = 2; /*fila de la butaca ps*/
        const columnaButaca = 5; /*columna de la butaca ps*/
        const idEntrada = 234; /*un id de entrada cualquiera*/

        /*Es para jalar las 3 primeras letras del departamento*/
        const CodDepartamento = departamento.substring(0, 3).toUpperCase();
        /*Emm aca lo transformo a string pero miren yo quiero un limite fijo
        de caracteres por codigo o sea no quiero decir que "1" tiene solo 1 digito
        si Yo manejo de 1 a 99 entonces los numeros de 1 digito se verian asi:
        1 = "01" esto servira mas adelante xd solo es pal qr*/
        const CodSala = idSala.toString().padStart(2, '0');
        /*metodo que transforma un numero a un char o sea si es 1 es A y asi sucesivamente xd*/
        const numToChar = (n) => String.fromCharCode(64 + n); 
        /*convertimos el fila a char */
        const filaChar = numToChar(filaButaca);
        /*convertimos el columna a char */
        const columnaChar = numToChar(columna);
        /*convertir un id de entrada a string xd */
        const CodEntrada = idEntrada.toString();

        const cadenaPaConvertirEnQR = `${CodDepartamento}${CodSala}${filaChar}${columnaChar}${CodEntrada}`;
        console.log(cadenaPaConvertirEnQR); // Ejemplo: TRU03BE234

        return finalCode;
    }

}

export default ScriptGenerarQR;

const generador = new ScriptGenerarQR();
generador.generar();