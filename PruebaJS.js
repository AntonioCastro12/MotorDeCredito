function calculoMotor(tipoNomina, fechaPrimerEmpleo, genero) {
    // Definición de las tablas para montos mínimos y máximos
    const montosMinimos = {
        m: {
            A: [[0, 26, 100], [27, 27, 400], [28, 28, 900], [29, 29, 100], [30, Infinity, 600]],
            B: [[0, 26, 1000], [27, 27, 600], [28, 28, 1000], [29, 29, 1000], [30, Infinity, 1000]],
            C: [[0, 26, 400], [27, 27, 200], [28, 28, 200], [29, 29, 1000], [30, Infinity, 600]],
            D: [[0, 26, 400], [27, 27, 300], [28, 28, 500], [29, 29, 900], [30, Infinity, 1000]],
        },
        f: {
            A: [[0, 24, 800], [25, 25, 800], [26, 26, 800], [27, 27, 600], [28, Infinity, 200]],
            B: [[0, 24, 800], [25, 25, 700], [26, 26, 100], [27, 27, 600], [28, Infinity, 700]],
            C: [[0, 24, 200], [25, 25, 900], [26, 26, 700], [27, 27, 800], [28, Infinity, 100]],
            D: [[0, 24, 500], [25, 25, 1000], [26, 26, 600], [27, 27, 400], [28, Infinity, 700]],
        },
    };

    const montosMaximos = {
        m: {
            A: [[0, 26, 4900], [27, 27, 4700], [28, 28, 4600], [29, 29, 4600], [30, Infinity, 4500]],
            B: [[0, 26, 4700], [27, 27, 4400], [28, 28, 5000], [29, 29, 4400], [30, Infinity, 4900]],
            C: [[0, 26, 5000], [27, 27, 4700], [28, 28, 5000], [29, 29, 4200], [30, Infinity, 4600]],
            D: [[0, 26, 4400], [27, 27, 4700], [28, 28, 4300], [29, 29, 4900], [30, Infinity, 4300]],
        },
        f: {
            A: [[0, 24, 4000], [25, 25, 4200], [26, 26, 4100], [27, 27, 4200], [28, Infinity, 4500]],
            B: [[0, 24, 4700], [25, 25, 4200], [26, 26, 4500], [27, 27, 4300], [28, Infinity, 4400]],
            C: [[0, 24, 4600], [25, 25, 4900], [26, 26, 4600], [27, 27, 4700], [28, Infinity, 4000]],
            D: [[0, 24, 5000], [25, 25, 4900], [26, 26, 4700], [27, 27, 5000], [28, Infinity, 4300]],
        },
    };

    // Función para calcular el tiempo en meses desde la fecha de primer empleo
    function calcularMeses(fecha) {
        const ahora = new Date();
        const fechaInicio = new Date(fecha);
        return (ahora.getFullYear() - fechaInicio.getFullYear()) * 12 + ahora.getMonth() - fechaInicio.getMonth();
    }

    // Función para obtener el monto de la tabla según los meses de empleo
    function obtenerMonto(tabla, tipo, meses) {
        for (let rango of tabla[tipo]) {
            if (meses >= rango[0] && meses <= rango[1]) {
                return rango[2];
            }
        }
        return 0; // Si no se encuentra un valor, se devuelve 0
    }

    const mesesDesdePrimerEmpleo = calcularMeses(fechaPrimerEmpleo);

    const montoMinimo = obtenerMonto(montosMinimos[genero], tipoNomina, mesesDesdePrimerEmpleo);
    const montoMaximo = obtenerMonto(montosMaximos[genero], tipoNomina, mesesDesdePrimerEmpleo);

    const p1 = montoMinimo + Math.sqrt(montoMaximo - montoMinimo);
    const p2 = montoMinimo + 0.0175 * (montoMaximo - montoMinimo);

    const lineaOptima = Math.max(p1, p2);

    return {
        montoMinimo,
        montoMaximo,
        recomendacionLinea: lineaOptima
    };
}

// Datos de prueba
const datosPrueba = [
    { tipoNomina: 'A', fechaPrimerEmpleo: '2022-06-12', genero: 'f' },
    { tipoNomina: 'B', fechaPrimerEmpleo: '1993-12-30', genero: 'f' },
    { tipoNomina: 'C', fechaPrimerEmpleo: '2020-09-19', genero: 'm' },
    { tipoNomina: 'D', fechaPrimerEmpleo: '2019-01-15', genero: 'm' },
];

// Evaluación de la función con los datos de prueba
datosPrueba.forEach(datos => {
    const resultado = calculoMotor(datos.tipoNomina, datos.fechaPrimerEmpleo, datos.genero);
    console.log(`Tipo de Nómina: ${datos.tipoNomina}, Fecha Desde el Primer Empleo: ${datos.fechaPrimerEmpleo}, Género: ${datos.genero}`);
    console.log(`Monto Mínimo de Crédito: ${resultado.montoMinimo}`);
    console.log(`Monto Máximo de Crédito: ${resultado.montoMaximo}`);
    console.log(`Línea Óptima de Crédito: ${resultado.recomendacionLinea}`);
    console.log('-----------------------------------------');
});