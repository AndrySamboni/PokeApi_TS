function toPair(arr: object[]): [string, any][] {
  return arr.map((obj: object) => Object.entries(obj)[0]);
}

const datos = [
  { nombre: "Ana" },
  { edad: 25 },
  { ciudad: "Bogotá" }
];

console.log(toPair(datos));
