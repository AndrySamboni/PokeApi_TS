type usuario = {
    nombre:string;
    edad:number;
    telefono?:string; 
    activo:boolean
}

const yuliana: usuario = {
    nombre:"Yuliana",
    edad:34,
    activo:true
}
const alberto: usuario = {
    nombre: "Alberto",
    edad: 30,
    activo: true 
};
export const users : usuario[] = [];
users.push(alberto, yuliana);
console.log(users);