function cuantosPositivos(arr: number[]) {
  let count = 0;

  for (let n of arr) {
    if (n > 0) count++;
  }

  return count;
}

const numeros = [-5, 3, 0, 7, -1, 12, -8, 4];

console.log(cuantosPositivos(numeros)); // 4