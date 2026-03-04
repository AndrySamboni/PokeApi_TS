function nombreResolucion(ancho: number, alto: number): string {
    if (ancho === 7680 && alto === 4320) return "8K";
    if (ancho === 3840 && alto === 2160) return "4K";
    if (ancho === 2560 && alto === 1440) return "WQHD";
    if (ancho === 1920 && alto === 1080) return "FHD";
    if (ancho === 1280 && alto === 720)  return "HD";
    return "Resolución desconocida";
}

console.log(nombreResolucion(7680, 4320)); // 8K
console.log(nombreResolucion(3840, 2160)); // 4K
console.log(nombreResolucion(2560, 1440)); // WQHD
console.log(nombreResolucion(1920, 1080)); // FHD
console.log(nombreResolucion(1280, 720));  // HD
console.log(nombreResolucion(800, 600));   // Resolución desconocida