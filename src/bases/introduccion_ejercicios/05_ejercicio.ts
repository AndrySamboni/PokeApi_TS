function getMenorMayor({ arr }: { arr: number[] }) {
  let menor = arr[0];
  let mayor = arr[0];

  for (let n of arr) {
    if (n < menor) menor = n;
    if (n > mayor) mayor = n;
  }

  return { menor, mayor };
}

const numeros = [4, 17, -3, 8, 22, 1, 9];

console.log(getMenorMayor({ arr: numeros }));
// { menor: -3, mayor: 22 }