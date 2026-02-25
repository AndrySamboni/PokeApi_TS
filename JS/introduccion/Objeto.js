let  matriz = [1, "hola"];
// clave  - valor
// num : 2
// edad  : "35"
// matriz : [ Matriz1[] , ]
//
// Array
let arreglo = []

//crear una instancia 

// // declarando un objeto.
// //objeto literal
// let personaLiteral = {
//     claves -> propiedades 
//    nombre : "Juan",
//    edad : 17,
//    dni : "1061599408",
//     esEmpleado : true
// }
//INSTANCIA
// let personaInstancia = new Object()

// persona.nombre = "Gheydy";
// persona.edad = "17";
// persona.esEmpleado=true;
// console.log(personaLiteral);


// //dinamismo -> puedo llamar o hacer uso en cualquiere parte de el codigo. -> hablando de objetos

// let user = {
//     email : "gheydyestacio13@gmail.com",
//     name : "gheydy",
//     direccion : {
//         calle : "avenida siempre viva",
//         nuemro : 123
//     },
//     activo : true,
//     // metyodo -> funcionalidades 
//     recuperarClave: function(){
//         console.log("Recuperar clave");
//     },
// }

// user.email = "Marcela@sena.edu.co";

// // console.log(user.email);

// const user1 = {
//     id : 1,

// }
// user.name = "Gheydy";
// // funcion anonima -> es que no tienen nombre -> solo se uasan una vez.
// user.guardar = function(){
//     console.log('Guardando' , user.name)
// }
// user.guardar();

// console.log(user);

// si lo que queremos es que NO SE MODIFIQUE NI EL OBEJTO NI SUS PROPIEDADES 
const user = Object.freeza({
    id : 1,
    name :"Gheydy",
}) 
// si lo que quiero es NO MODIFICAR EL OBJETO per si modificar las propiedades.
const user1 = Object.seal({
    id : 1,
    name :"Gheydy",
}) 
console.log(user1.name);
use1.name ="gheydyestacio13@gamil.com"
console.log(user1);



function createUser(name, email){
    return {
        id: 1,
        email,
        name,
        activo: true,
        recuperarcontarseña: function () {
            console.log("recuperando contraseña");
        }
    }

}