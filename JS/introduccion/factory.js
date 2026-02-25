///patron de diseño
// let user = {
//     name: "Diego",
//     age: 22,
//     email: "diego.calderon@outlook.com",
//     activo: true,
//     recuperarContraseña: function() {
//         console.log("Recuperando contraseña");
//     }
// }
///probee seguridad y escalabilidad, encapsula la logica de creacion de objetos, reutilizacion de codigo, evita errores humanos
///factory function-> es un factor de diseño que me permite agrupar multiples objetos del mismo tipo
function createUser(name,email) {
    return {
        id:1,
        name: name,
        email: email,
        activo: true,
        recuperarContraseña: function() {
            console.log("Recuperando contraseña");
        }

    }
}
//instancia de un objeto
const user = createUser("Diego","diego.calderon@outlook.com");
console.log(user);
const user2 = createUser("Ana","Ana.calderon@outlook.com");
console.log(user2);


