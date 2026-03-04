function getByldx(arr: string[], idx: number): string | number {
    if (idx < 0) return "Error: el índice no puede ser menor que cero";
    if (idx >= arr.length) return "Error: el elemento no existe en el array";
    return arr[idx];
}

const frutas = ["manzana", "banana", "cereza", "uva"];

console.log(getByldx(frutas, 0));  // manzana
console.log(getByldx(frutas, 2));  // cereza
console.log(getByldx(frutas, -1)); // Error: el índice no puede ser menor que cero
console.log(getByldx(frutas, 10)); // Error: el elemento no existe en el array