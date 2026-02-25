// function usuario(nombre){
//     this.nombre = nombre;
// }
// console.log(usuario.nombre);
// console.log(usuario.length);
                                     //COMUNNN
// const U = new usuario("Diego");
// // U = {
// //     nombre : "Diego"
// // }
// console.log(U.nombre);

function of(fn, arg) {
    return new fn(arg);
}
const user1 = of(usuario, "Gheydy");
console.log(user1);