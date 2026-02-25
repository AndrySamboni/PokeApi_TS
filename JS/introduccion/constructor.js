//Constructor-> se utiliza upper camellcase-> nos ayuda a inicializar o construir el valor de las propiedades a travez de la palabra reservada this 
// function usuario(){
// //en caso de crear una propiedad con valor numerico
// this.id = 1;
// //en caso de crear una funcion
// this.recuperarClave = function() {
//     console.log("Recuperando clave");
// }
// }
// //como se usa->new->instancia->new objeto()
// let user = new usuario();
// console.log(user);

function usuario(nombre, edad){
    this.nombre = nombre;
    this.edad = edad;
}
console.log(usuario.nombre);
console.log(usuario.length);

const U = new usuario("Diego",25);
// U = {
//     nombre : "Diego"
// }
console.log(U.nombre, U.edad);

