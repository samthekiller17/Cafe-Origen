const { ventas } = require("./datos");
const {
    totalVendido,
    unidadesVendidas,
    ventasPorCiudad,
    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,
} = require("./analitica");

function verificar(nombre, resultadoCiclo, resultadoMetodo) {
    const estado = resultadoCiclo === resultadoMetodo ? "OK" : "DIFERENTE";

    console.log(
        `${nombre}: ${estado} | Ciclo: ${resultadoCiclo} | Métodos: ${resultadoMetodo}`
    );
}

verificar(
    "Total vendido",
    totalVendido(ventas),
    totalVendidoM(ventas)
);

verificar(
    "Unidades vendidas",
    unidadesVendidas(ventas),
    unidadesVendidasM(ventas)
);

verificar(
    "Ventas en Medellín",
    ventasPorCiudad(ventas, "Medellín"),
    ventasPorCiudadM(ventas, "Medellín")
);

verificar(
    "Ventas en Bogotá",
    ventasPorCiudad(ventas, "Bogotá"),
    ventasPorCiudadM(ventas, "Bogotá")
);