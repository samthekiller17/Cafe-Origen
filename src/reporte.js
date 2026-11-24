const { ventas } = require("./datos");
const {
  totalVendido,
  unidadesVendidas,
  ventaMayor,
  ticketPromedio,
  totalPorCiudad,
  unidadesPorProducto,
  topProductosPorValor,
  ventasDelDia,
} = require("./analitica");

function pesos(valor) {
  return `$${valor.toLocaleString("es-CO")}`;
}

function mostrarResumenDia(fecha) {
  const ventasDia = ventasDelDia(ventas, fecha);

  console.log(`\nResumen del día ${fecha}`);

  if (ventasDia.length === 0) {
    console.log("No hay ventas registradas para este día.");
    console.log("Total vendido: $0");
    console.log("Unidades vendidas: 0");
    console.log("Ticket promedio: $0");
    return;
  }

  console.log("Ventas registradas:", ventasDia.length);
  console.log("Total vendido:", pesos(totalVendido(ventasDia)));
  console.log("Unidades vendidas:", unidadesVendidas(ventasDia));
  console.log("Ticket promedio:", pesos(ticketPromedio(ventasDia)));
}

const mayorVenta = ventaMayor(ventas);

console.log("==============================================================");
console.log("             REPORTE DE ANALÍTICA - CAFÉ ORIGEN");
console.log("==============================================================");

console.log("\nRESUMEN GENERAL");
console.log("Total vendido:", pesos(totalVendido(ventas)));
console.log("Unidades vendidas:", unidadesVendidas(ventas));
console.log("Ticket promedio:", pesos(ticketPromedio(ventas)));
console.log(
  "Venta mayor:",
  mayorVenta
    ? `${mayorVenta.producto} - ${pesos(mayorVenta.cantidad * mayorVenta.precio)}`
    : "Sin ventas"
);

console.log("\nVENTAS POR CIUDAD");
const ciudades = Object.entries(totalPorCiudad(ventas)).map(
  ([ciudad, total]) => ({
    ciudad,
    total: pesos(total),
  })
);
console.table(ciudades);

console.log("\nUNIDADES POR PRODUCTO");
const productos = Object.entries(unidadesPorProducto(ventas)).map(
  ([producto, unidades]) => ({
    producto,
    unidades,
  })
);
console.table(productos);

console.log("\nTOP 3 PRODUCTOS POR VALOR");
topProductosPorValor(ventas, 3).forEach((producto, indice) => {
  console.log(`${indice + 1}. ${producto}`);
});

mostrarResumenDia("2026-09-01");
mostrarResumenDia("2026-09-30");

console.log("\n==============================================================");