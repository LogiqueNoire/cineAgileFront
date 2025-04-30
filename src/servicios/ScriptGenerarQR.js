//import { url } from '../configuracion/backend'
import CryptoJS from 'crypto-js';

class ScriptGenerarQR {
    /*Es solo pa hacer la prueba: luego se pasa a back si quieren xd*/
    generar() {
         const sede = "TRUJILLO";
         const idSala = 3; /*según Yo la sede 1 tiene salas del 1 al 12 , la sede 2 también , etc... xd*/
         const filaButaca = 2; /*fila de la butaca ps*/
         const columnaButaca = 5; /*columna de la butaca ps*/
         const idEntrada = 234; /*un id de entrada cualquiera*/
 
         /*Es para jalar las 3 primeras letras del departamento*/
         const Codsede = sede.substring(0, 3).toUpperCase();
         /*Emm aca lo transformo a string pero miren yo quiero un limite fijo
         de caracteres por código, o sea no quiero decir que "1" tiene solo 1 dígito
         si Yo manejo de 1 a 99 entonces los números de 1 dígito se verían así:
         1 = "01" esto servirá más adelante xd solo es para el QR*/
         const CodSala = idSala.toString().padStart(2, '0');
         /*Método que transforma un número a un carácter, o sea si es 1 es A y así sucesivamente xd*/
         const numToChar = (n) => String.fromCharCode(64 + n); 
         /*Convertimos la fila a char */
         const filaChar = numToChar(filaButaca);
         /*Convertimos la columna a char */
         const columnaChar = numToChar(columnaButaca);
         /*Convertir un id de entrada a string xd */
         const CodEntrada = idEntrada.toString();
 
         /*Generar la cadena que será convertida en QR*/
         const cadenaPaConvertirEnQR = `${Codsede}${CodSala}${filaChar}${columnaChar}${CodEntrada}`;
         console.log("Código sin encriptar:", cadenaPaConvertirEnQR); // Ejemplo: TRU03BE234
 
         /*Clave secreta para encriptarxd es parte del algoritmo AES*/
         const claveSecreta = 'mi_clave_secreta_123';
 
         /*Encriptar la cadena */
         const codigoEncriptado = CryptoJS.AES.encrypt(cadenaPaConvertirEnQR, claveSecreta).toString();
         
         console.log("Código Encriptado:", codigoEncriptado);
 
         return codigoEncriptado; // Devolver el código encriptado
     }
 }

export default ScriptGenerarQR;

