`bitacora.md`

```md
# Bitácora de Análisis - Café Origen v0.1

## Diccionario de datos

| Propiedad | Tipo | Significado |
| :--- | :--- | :--- |
| `id` | number | Identificador único de la venta. |
| `fecha` | string | Fecha en la que se realizó la venta. |
| `cliente` | string | Código que identifica al cliente. |
| `producto` | string | Nombre del producto vendido. |
| `ciudad` | string | Ciudad donde se registró la venta. |
| `cantidad` | number | Número de unidades vendidas. |
| `precio` | number | Precio de una unidad del producto. |

## Casos borde detectados

| Caso | Decisión |
| :--- | :--- |
| La ciudad Medellín aparece como `Medellín` y `medellín`. | Normalizar cada ciudad con `trim().toLowerCase()` antes de comparar o agrupar. |
| La venta con ID 8 tiene cantidad igual a `0`. | Excluirla de totales, unidades, promedio, agrupaciones y rankings. |
| Los clientes están representados por códigos como `C01` y no por nombres completos. | Mantener el código original porque no existe información adicional para modificarlo. |

## Pseudocódigo de indicadores

### valorVenta

1. Recibir una venta.
2. Multiplicar cantidad por precio.
3. Devolver el resultado.

### totalVendido

1. Iniciar un acumulador en `0`.
2. Recorrer todas las ventas.
3. Si la cantidad es mayor que `0`, sumar cantidad por precio.
4. Devolver el acumulador.

### unidadesVendidas

1. Iniciar un acumulador en `0`.
2. Recorrer todas las ventas.
3. Si la cantidad es mayor que `0`, sumar la cantidad.
4. Devolver el acumulador.

### ventaMayor

1. Iniciar la venta mayor en `null`.
2. Recorrer todas las ventas válidas.
3. Comparar el valor de la venta actual con la venta mayor.
4. Guardar la venta actual si su valor es superior.
5. Devolver la venta mayor o `null` si no hay ventas válidas.

### ticketPromedio

1. Iniciar el total en `0`.
2. Iniciar el contador de ventas válidas en `0`.
3. Recorrer las ventas.
4. Sumar el valor y aumentar el contador solo si la cantidad es mayor que `0`.
5. Si el contador es `0`, devolver `0`.
6. Dividir el total entre el contador.

### ventasPorCiudad

1. Normalizar la ciudad solicitada.
2. Iniciar un acumulador en `0`.
3. Recorrer las ventas.
4. Normalizar la ciudad de cada venta.
5. Si la ciudad coincide y la venta es válida, sumar su valor.
6. Devolver el acumulador.

## Comportamiento con arreglos vacíos

| Función | Resultado con `[]` |
| :--- | :--- |
| `totalVendido` | `0` |
| `unidadesVendidas` | `0` |
| `ventaMayor` | `null` |
| `ticketPromedio` | `0` |
| `ventasPorCiudad` | `0` |

## Trazas manuales

### Traza de totalVendido

| ID | Cantidad | Precio | Valor | Acumulado |
| :--- | ---: | ---: | ---: | ---: |
| 1 | 2 | 42000 | 84000 | 84000 |
| 2 | 1 | 26000 | 26000 | 110000 |
| 3 | 1 | 95000 | 95000 | 205000 |
| 8 | 0 | 42000 | 0 | 457000 |
| 12 | 3 | 26000 | 78000 | 985000 |

Resultado final: `$985.000`.

### Traza de ventaMayor

| ID | Producto | Valor | Venta mayor actual |
| :--- | :--- | ---: | :--- |
| 1 | Origen Huila 500 g | 84000 | ID 1 |
| 3 | Prensa francesa | 95000 | ID 3 |
| 5 | Origen Sierra 500 g | 135000 | ID 5 |
| 10 | Origen Huila 500 g | 168000 | ID 10 |

Resultado final: la venta mayor es la ID 10, por `$168.000`.

## Funciones con métodos de arreglo

| Función | ¿Qué recorro? | ¿Qué filtro? | ¿Qué transformo? | ¿Qué acumulo o agrupo? |
| :--- | :--- | :--- | :--- | :--- |
| `totalVendidoM` | Ventas | Cantidad mayor que 0 | Cada venta en su valor | Suma total de dinero |
| `unidadesVendidasM` | Ventas | Cantidad mayor que 0 | Cada venta en su cantidad | Suma total de unidades |
| `ventasPorCiudadM` | Ventas | Ciudad solicitada y cantidad mayor que 0 | Cada venta en su valor | Suma por ciudad |
| `totalPorCiudad` | Ventas | Cantidad mayor que 0 | Ciudad normalizada | Total monetario por ciudad |
| `unidadesPorProducto` | Ventas | Cantidad mayor que 0 | Producto | Unidades por producto |
| `topProductosPorValor` | Ventas | Cantidad mayor que 0 | Pares producto y total | Dinero por producto y ranking |

Para ordenar el ranking se usa `Object.entries()` para convertir el diccionario en un arreglo, `sort()` para ordenar de mayor a menor, `slice()` para tomar los primeros resultados y `map()` para extraer los nombres. El arreglo original no se modifica.

## Depuración de errores

### Error: Bogotá aparece dos veces

- **Síntoma**: El reporte podría mostrar grupos separados para `Bogotá` y `Bogotá `.
- **Entrada que lo produce**: Dos ventas con ciudades que solo se diferencian por espacios o mayúsculas.
- **Hipótesis**: La agrupación usa el texto original sin normalizar.
- **Prueba realizada**: Comparar los resultados antes y después de aplicar `trim().toLowerCase()`.
- **Causa**: Las cadenas de texto no eran idénticas.
- **Corrección**: Normalizar la ciudad antes de comparar y usarla como clave del diccionario.

### Error: Ticket promedio muestra NaN

- **Síntoma**: El promedio puede aparecer como `NaN` en un día sin ventas.
- **Entrada que lo produce**: Un arreglo vacío obtenido al filtrar una fecha sin registros.
- **Hipótesis**: Se está dividiendo `0` entre `0`.
- **Prueba realizada**: Ejecutar `ticketPromedio([])`.
- **Causa**: No se validaba que existieran ventas válidas antes de dividir.
- **Corrección**: Si la cantidad de ventas válidas es `0`, la función devuelve `0`.