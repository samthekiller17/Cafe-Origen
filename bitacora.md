# Bitácora de Análisis - Café Origen v0.1

## 1. Diccionario de datos (Minirreto 1)

| Propiedad | Tipo de dato | Significado |
| :--- | :--- | :--- |
| `id` | number | Identificador único de la venta. |
| `fecha` | string | Fecha en la que se realizó la venta. |
| `cliente` | string | Código identificador del cliente. |
| `producto` | string | Nombre del producto vendido. |
| `ciudad` | string | Ciudad donde se realizó la venta. |
| `cantidad` | number | Número de unidades incluidas en la venta. |
| `precio` | number | Precio unitario del producto. |

---

## 2. Casos borde detectados en los datos (Minirreto 1)

### Hallazgo 1:
- **Descripción**: La ciudad Medellín aparece escrita como `"Medellín"` y `"medellín"`.
- **¿Cómo se debe tratar en el análisis?**: Se normaliza usando `.trim().toLowerCase()` antes de comparar o agrupar.

### Hallazgo 2:
- **Descripción**: Existe una venta con cantidad igual a `0`.
- **¿Cómo se debe tratar en el análisis?**: Se excluye de los cálculos de dinero, unidades, promedios, agrupaciones y rankings.

---

## 3. Patrones con ciclos manuales (Minirreto 2)

- **`totalVendido(ventas)`**:
  - *Patrón usado (contador, acumulador, filtro, extremo)*: Acumulador con filtro manual para sumar únicamente ventas con cantidad mayor a cero.
- **`totalUnidades(ventas)`**:
  - *Patrón usado*: Acumulador con filtro manual.
- **`ventaMayorValor(ventas)`**:
  - *Patrón usado*: Búsqueda de extremo máximo usando una variable inicializada en `null`.
- **`ventasDeCiudad(ventas, ciudad)`**:
  - *Patrón usado*: Filtro manual con un arreglo nuevo y normalización de texto.
- **`promedioPorVenta(ventas)`**:
  - *Patrón usado*: Acumulador y contador para dividir el total vendido entre las ventas válidas.

---

## 4. Del ciclo al método: Preguntas de transformación y agrupación (Minirreto 3)

- **¿Qué filtro? (`.filter`)**: Se filtran las ventas con `cantidad > 0`.
- **¿Qué transformo? (`.map`)**: Cada venta válida se transforma en un resumen con `id`, `producto`, `ciudad` normalizada y `total`.
- **¿Qué reduzco / acumulo? (`.reduce`)**: Se acumulan valores monetarios por ciudad, valores monetarios por producto y unidades por producto.
- **¿Cómo agrupo en un diccionario?**: Se usa un objeto donde cada clave representa una ciudad o producto y se suma el valor usando `(diccionario[clave] || 0) + valor`.
- **¿Cómo ordeno sin modificar el arreglo original? (`.sort`)**: Se ordena el nuevo arreglo generado por `Object.entries()`; el arreglo original de ventas nunca se modifica.

---

## 5. Verificación del reporte y pureza de funciones (Minirreto 4)

- **¿Cómo comprobaste que el arreglo `ventas` original no fue modificado?**: Al ejecutar el reporte se verifica que conserva 12 registros y que el primer registro continúa teniendo el ID 1.
- **Comando para ejecutar el reporte**: `node src/reporte.js`