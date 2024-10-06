const productos = [
    {nombre: "Laptop", categoria: "Electronica"},
    {nombre: "Telefono", categoria: "Electronica"},
    {nombre: "Silla", categoria: "Muebles"},
    {nombre: "Camiseta", categoria: "Ropa"},
    {nombre: "Pantalon", categoria: "Ropa"},
    {nombre: "Gorras", categoria: "Ropa"},
];

const productosPrecio = [
    {nombre: "Laptop", precio   : 11300},
    {nombre: "Telefono", precio : 6500},
    {nombre: "Silla",    precio : 750},
    {nombre: "Camiseta", precio : 129},
    {nombre: "Pantalon", precio : 200},
    {nombre: "Gorras",   precio : 500},
];

// Filtrar por categoría y mostrar productos con precios
const filtrarPorCategoria = (categoria) => {
    return productos.filter(producto =>
        producto.categoria.toLowerCase() === categoria.toLowerCase()
    );
};


// Filtrar por precio y ordenar de menor a mayor
const filtrarPorPrecios = (productosFiltrados) => {
    return productosFiltrados
        .map(producto => {
            const productoConPrecio = productosPrecio.find(p => p.nombre === producto.nombre);
            return {...producto, precio: productoConPrecio.precio};
        })
        .sort((a, b) => a.precio - b.precio); // Ordenar de menor a mayor precio
};

// Filtrar por rango de precio
const filtrarPorRangoPrecio = (precioMin, precioMax) => {
    return productosPrecio.filter(producto =>
        producto.precio >= precioMin && producto.precio <= precioMax
    ).sort((a, b) => a.precio - b.precio); // Ordenar de menor a mayor
};

// Mostrar productos filtrados con sus precios
const mostrarProductosYPrecios = (productosConPrecio, listaId) => {
    const listaProductos = document.getElementById(listaId);
    listaProductos.innerHTML = ''; // Limpiamos la lista anterior

    if (productosConPrecio.length === 0) {
        listaProductos.innerHTML = '<li>No se encontraron productos</li>';
        return;
    }

    productosConPrecio.forEach(producto => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - Precio: $${producto.precio}`;
        listaProductos.appendChild(li);
    });
};

// Manejador de evento para filtrar por categoría
document.getElementById('formulario').addEventListener('submit', (evento) => {
    evento.preventDefault(); // Prevenimos el envío del formulario
    
    const categoria = document.getElementById('categoria').value.trim();

    if (categoria === '') {
        alert('Por favor ingresa una categoría válida');
        return;
    }

    // Filtrar por categoría
    const productosFiltrados = filtrarPorCategoria(categoria);

    // Filtrar y ordenar por precio
    const productosConPrecio = filtrarPorPrecios(productosFiltrados);

    // Mostrar productos filtrados por categoría
    mostrarProductosYPrecios(productosConPrecio, 'lista-productos');
});

// Manejador de evento para filtrar por rango de precio
document.getElementById('formulario-precio').addEventListener('submit', (evento) => {
    evento.preventDefault();

    const precioMin = parseFloat(document.getElementById('precio-min').value.trim());
    const precioMax = parseFloat(document.getElementById('precio-max').value.trim());

    if (isNaN(precioMin) || isNaN(precioMax)) {
        alert('Por favor ingresa valores numéricos válidos para los precios');
        return;
    }

    // Filtrar por rango de precio
    const productosEnRango = filtrarPorRangoPrecio(precioMin, precioMax);

    // Mostrar productos filtrados por rango de precio
    mostrarProductosYPrecios(productosEnRango, 'lista-precios');
});
