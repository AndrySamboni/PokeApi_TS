function precioCompleto({ precio, impuesto }: { precio: number; impuesto: number; }) {
  const valorImpuesto = precio * impuesto;
  return parseFloat((precio + valorImpuesto).toFixed(2));
}

console.log(precioCompleto({ precio: 100, impuesto: 0.19 }));   
console.log(precioCompleto({ precio: 50000, impuesto: 0.19 })); 
console.log(precioCompleto({ precio: 25.5, impuesto: 0.16 }));  