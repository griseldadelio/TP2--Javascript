//1-
/*  -- PUNTO A      
precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede 
armar con esos componentes, que es la suma de los precios de cada componente incluido. -- */

const precioMaquina = (componentes) => {
    let sumaComponente = 0;
    for (let n = 0; n < componentes.length; n++) {
        for (let i = 0; i < local.precios.length; i++) {
            if (componentes[n] === local.precios[i].componente) {
                sumaComponente += local.precios[i].precio;
            }
        }
    }
    return sumaComponente;
}
console.log("La suma de los componentes es: " + precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS 1500"])); // 320 ($200 del monitor + $120 del motherboard) 

/*  -- PUNTO B    
cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad de veces que fue vendido, 
o sea que formó parte de una máquina que se vendió.La lista de ventas no se pasa por parámetro, se asume 
que está identificada por la variable ventas.
-- */

const cantidadVentasComponente = (componente) => {
    let sumaVentas = [];
    let arrayVentas = local.ventas;
    for (let i = 0; i < arrayVentas.length; i++) { //recorro las ventas del local
        for (let v = 0; v < arrayVentas[i].componentes.length; v++) {//recorro los componentes
            if (componente === arrayVentas[i].componentes[v]) {
                sumaVentas.push(arrayVentas[i].componentes[v])
            }
        }
    }
    return sumaVentas.length;
}
console.log("El componente se vendio " + cantidadVentasComponente("Monitor ASC 543") + " veces"); // 2

/*  -- PUNTO C        
vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la 
vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. 
El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde 
el 1 (enero) hasta el 12 (diciembre).
-- */

const vendedoraDelMes = (mes, anio) => {
    let mayorImporte = 0;
    let nombreDeVendedora = '';

    // recorrer vendedoras
    for (let i = 0; i < local.vendedoras.length; i++) {
        const vendedora = local.vendedoras[i];
        let totalVendido = 0;

        let ventasXMes = local.ventas.filter(venta => venta.nombreVendedora === vendedora && venta.fecha.getFullYear() === anio && venta.fecha.getMonth() + 1 === mes);
        ventasXMes.forEach(venta => totalVendido = precioMaquina(venta.componentes)); //se asigna el valor de los componentes vendidos

        // lo que vendió X vendedora
        if (totalVendido > mayorImporte) {
            mayorImporte = totalVendido;
            nombreDeVendedora = vendedora;
        }
    }
    return nombreDeVendedora;
}

console.log('la vendedora del mes es ' + vendedoraDelMes(1, 2019)); // "Ada" (vendio por $670, una máquina de $320 y otra de $350)

/*  -- PUNTO D       
ventasMes(mes, anio): Obtener las ventas de un mes. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).
-- */

const ventasMes = (mes, anio) => {
    let total = 0;
    for (let venta of local.ventas) {
        if (venta.fecha.getFullYear() === anio && venta.fecha.getMonth() + 1 === mes) {
            total += precioMaquina(venta.componentes);
        }
    }
    return total;
}
console.log('las ventas del mes es de ' + ventasMes(1, 2019) + ' pesos');

/*  -- PUNTO E       
ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha
-- */

const ventasVendedora = (nombre) => {
    let total = 0;
    for (let venta of local.ventas) {
        if (venta.nombreVendedora === nombre) {
            total += precioMaquina(venta.componentes);
        }
    }
    return total;
}

//console.log(ventasVendedora("Ada"));
console.log('Las vendedora seleccionada vendio ' + ventasVendedora("Grace") + ' pesos en total');

/*  -- PUNTO F      
componenteMasVendido(): Devuelve el nombre del componente que más ventas tuvo historicamente. El dato 
de la cantidad de ventas es el que indica la función cantidadVentasComponente
-- */
const componenteMasVendido = () => {
    const componentes = precio => precio.componente;
    const cantidades = (parciales, actual) => {
        parciales = { ...parciales, [actual]: cantidadVentasComponente(actual, local.ventas) };
        return parciales;
    }
    const ventasXComponente = local.precios.map(componentes).reduce(cantidades, {});
    const masVendido = (masVendido, componente) => (ventasXComponente[masVendido] > ventasXComponente[componente]) ? masVendido : componente;
    return Object.keys(ventasXComponente).reduce(masVendido);
}
document.getElementById('producto').innerHTML = '<b>Producto estrella: </b>' + componenteMasVendido();
console.log("El componente mas vendido es: " + componenteMasVendido()); // Monitor GPRS 3000

/*  -- PUNTO G   
huboVentas(mes, anio): que indica si hubo ventas en un mes determinado. El mes es un número entero 
que va desde el 1 (enero) hasta el 12 (diciembre).    
-- */

const huboVentas = (mes, anio) => {
    for (let i = 0; i < local.ventas.length; i++) {
        if (ventasMes(mes, anio) !== 0) {
            return true
        } else {
            return false
        }
    }
}
console.log("En el mes seleccionado hubo ventas: " + huboVentas(3, 2019)); // false

//2- 
/* Agregar la propiedad sucursal con el valor Centro */
for (let i = 0; i < local.ventas.length; i++) {
    local.ventas[i].sucursal = "Centro";
    console.log(local.ventas[i]);
}

/* Agregar al objeto principal la propiedad sucursales: ['Centro', 'Caballito'] */
local.sucursales = ["Centro", "Caballito"];
console.log(local)

/* Agregar nuevas ventas */

const nuevasVentas = (fecha, nombreVendedora, componentes, sucursal) => {
    local.ventas.push({ fecha, nombreVendedora, componentes, sucursal });
    return local.ventas;
}
nuevasVentas(new Date(2019, 01, 12), "Hedy", ["Monitor GPRS 3000", "HDD Toyiva"], "Centro")
nuevasVentas(new Date(2019, 01, 24), "Sheryl", ["Motherboard ASUS 1500", "HDD Wezter Dishital"], "Caballito")
nuevasVentas(new Date(2019, 01, 01), "Ada", ["Motherboard MZI", "RAM Quinston Fury"], "Centro")
nuevasVentas(new Date(2019, 01, 11), "Grace", ["Monitor ASC 543", "RAM Quinston"], "Caballito")
nuevasVentas(new Date(2019, 01, 15), "Ada", ["Motherboard ASUS 1200", "RAM Quinston Fury"], "Centro")
nuevasVentas(new Date(2019, 01, 12), "Hedy", ["Motherboard ASUS 1500", "HDD Toyiva"], "Caballito")
nuevasVentas(new Date(2019, 01, 21), "Grace", ["Motherboard MZI", "RAM Quinston"], "Centro")
nuevasVentas(new Date(2019, 01, 08), "Sheryl", ["Monitor ASC 543", "HDD Wezter Dishital"], "Centro")
nuevasVentas(new Date(2019, 01, 16), "Sheryl", ["Monitor GPRS 3000", "RAM Quinston Fury"], "Centro")
nuevasVentas(new Date(2019, 01, 27), "Hedy", ["Motherboard ASUS 1200", "HDD Toyiva"], "Caballito")
nuevasVentas(new Date(2019, 01, 22), "Grace", ["Monitor ASC 543", "HDD Wezter Dishital"], "Centro")
nuevasVentas(new Date(2019, 01, 05), "Ada", ["Motherboard ASUS 1500", "RAM Quinston"], "Centro")
nuevasVentas(new Date(2019, 01, 01), "Grace", ["Motherboard MZI", "HDD Wezter Dishital"], "Centro")
nuevasVentas(new Date(2019, 01, 07), "Sheryl", ["Monitor GPRS 3000", "RAM Quinston"], "Caballito")
nuevasVentas(new Date(2019, 01, 14), "Ada", ["Motherboard ASUS 1200", "HDD Toyiva"], "Centro")

console.log(local.ventas)

/* -- PUNTO A
Crear la función ventasSucursal(sucursal), que obtiene las ventas totales realizadas por una sucursal sin límite de fecha.
-- */
const ventasSucursal = (sucursal) => {
    let total = 0;
    for (let venta of local.ventas) {
        if (venta.sucursal === sucursal) {
            total += precioMaquina(venta.componentes);
        }
    }
    return total;
}
console.log('Ventas totales de la sucursal seleccionada ' + ventasSucursal("Centro")); // 4195


/* -- PUNTO B 
Las funciones ventasSucursal y ventasVendedora tienen mucho código en común, ya que es la misma funcionalidad 
pero trabajando con una propiedad distinta. Entonces, ¿cómo harías para que ambas funciones reutilicen código 
y evitemos repetir?
-- */
const ventasParametroIndistinto = (parametro) => {
    let total = 0;
    for (let venta of local.ventas) {
        if (venta.sucursal === parametro || venta.nombreVendedora === parametro) {
            total += precioMaquina(venta.componentes);
        }
    }
    return total;
}
console.log('Total de ventas por vendedora (misma func.)= ' + ventasParametroIndistinto("Grace"));
console.log('Total de ventas por sucursal (misma func.)= ' + ventasParametroIndistinto("Centro"));

/* -- PUNTO C
Crear la función sucursalDelMes(mes, anio), que se le pasa dos parámetros numéricos, (mes, anio) y devuelve
el nombre de la sucursal que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las
ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va
desde el 1 (enero) hasta el 12 (diciembre).
-- */

const sucursalDelMes = (mes, anio) => {
    let mayorImporte = 0;
    let nombreDeSucursal = '';
    for (let i = 0; i < local.sucursales.length; i++) {
        const sucursal = local.sucursales[i];
        let totalVendido = 0;

        local.ventas.filter(venta => venta.sucursal === sucursal && venta.fecha.getFullYear() === anio && venta.fecha.getMonth() + 1 === mes);
        local.ventas.forEach(venta => totalVendido = precioMaquina(venta.componentes));

        if (totalVendido > mayorImporte) {
            mayorImporte = totalVendido;
            nombreDeSucursal = sucursal;
        }
    }
    return nombreDeSucursal;
}

console.log('La sucursal que más vendió en el mes es: ' + sucursalDelMes(1, 2019)); // "Centro"

//3-
/* -- PUNTO A
renderPorMes(): Muestra una lista ordenada del importe total vendido por cada mes/año
-- */
//console.log(local)
const renderPorMes = () => {
    let resultado = '';
    let meses = {
        mesEnNumero: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        mesEnPalabra: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto",
            "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    }

    for (let i = 0; i < meses.mesEnNumero.length; i++) {
        if (huboVentas(meses.mesEnNumero[i], 2019)) {
            resultado = resultado + "El mes " + meses.mesEnPalabra[i] + " vendió: " + ventasMes(meses.mesEnNumero[i], 2019) + "\n" + '<br>';
        }
    }
    document.getElementById('mes').innerHTML = '<b>Ventas por mes: </b>' + '<br>' + resultado + '<br>';
    return resultado;
}
console.log(renderPorMes()); // Ventas por mes: //   Total de enero 2019: 1250 //   Total de febrero 2019: 4210

/* -- PUNTO B
renderPorSucursal(): Muestra una lista del importe total vendido por cada sucursal
-- */
const renderPorSucursal = () => {
    let resultado = "";
    for (let i = 0; i < local.sucursales.length; i++) {
        resultado += "El local " + local.sucursales[i] + " vendió: " + ventasSucursal(local.sucursales[i]) + "\n" + '<br>';
    }
    document.getElementById('local').innerHTML = `<b>Ventas por local: </b>` + '<br>' + resultado + '<br>';
    return resultado;
}

console.log(renderPorSucursal()); // Ventas por sucursal: //   Total de Centro: 4195 //   Total de Caballito: 1265

/* -- PUNTO C
render(): Tiene que mostrar la unión de los dos reportes anteriores, cual fue el producto más vendido y la
vendedora que más ingresos generó
-- */
const render = () => {
    let general = [];

    for (let i = 0; i < local.vendedoras.length; i++) {
        vendioVendedora = {
            nombre: local.vendedoras[i],
            vendio: 0,
        }
        vendioVendedora.vendio = vendioVendedora.vendio + ventasVendedora(local.vendedoras[i])
        general.push(vendioVendedora)
    }
    //console.log(general)

    let vendedoraMaxima;
    let ventaMaxima = 0

    for (n = 0; n < general.length; n++) {
        if (ventaMaxima < general[n].vendio) {
            ventaMaxima = general[n].vendio;
            vendedoraMaxima = general[n].nombre;
        }
    }
    //en Html
    document.getElementById('vendedora').innerHTML = `<b>La vendedora que más ingresos generó: </b>` + vendedoraMaxima;

    //en consola
    let listaFinal = `
    Ventas por mes
    ${renderPorMes()}
    ------------------------------------------
    Ventas por sucursal
    ${renderPorSucursal()}
    ------------------------------------------
    Producto estrella: ${componenteMasVendido()}
    ------------------------------------------
    Vendedora que más ingresos generó: ${vendedoraMaxima}`

    return listaFinal;

}


console.log(render());
/*
console.log(renderPorMes())
console.log(renderPorSucursal())
console.log(componenteMasVendido())
*/


// Reporte
// Ventas por mes:
//   Total de enero 2019: 1250
//   Total de febrero 2019: 4210
// Ventas por sucursal:
//   Total de Centro: 4195
//   Total de Caballito: 1265
// Producto estrella: Monitor GPRS 3000
// Vendedora que más ingresos generó: Grace
