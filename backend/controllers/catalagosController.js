exports.apiObtenerCategorias = async function (req, res) {
    const data = [
        {
            id: 1,
            descripcion: "Cillum ullamco dolore commodo velit ut anim enim consectetur cillum ex."
        },
        {
            id: 2,
            descripcion: "Cillum ullamco dolore commodo velit ut anim enim consectetur cillum ex."
        },
        {
            id: 3,
            descripcion: "Cillum ullamco dolore commodo velit ut anim enim consectetur cillum ex."
        },
        {
            id: 4,
            descripcion: "Cillum ullamco dolore commodo velit ut anim enim consectetur cillum ex."
        },
        {
            id: 5,
            descripcion: "Cillum ullamco dolore commodo velit ut anim enim consectetur cillum ex."
        }
    ]
    await res.send(data)
}

exports.apiObtenerProductos = async function (req, res) {
    const data = [
        {
            id: 1,
            sku: "AB-1",
            nombre: "Producto 1",
            descripcion: "Cillum ullamco dolore commodo velit ut anim enim consectetur cillum ex.",
            pict1: "https://fiestatijuana.mx/image-not-available.png",
            precio: 10.0,
            descuento: 0.0,
            oferta: 0.0,
            existencia: 5
        },
        {
            id: 2,
            sku: "AB-2",
            nombre: "Producto 2",
            descripcion: "Cillum ullamco dolore commodo velit ut anim enim consectetur cillum ex.",
            pict1: "https://fiestatijuana.mx/image-not-available.png",
            precio: 13.0,
            descuento: 0.0,
            oferta: 0.0,
            existencia: 5
        },
        {
            id: 3,
            sku: "AB-3",
            nombre: "Producto 3",
            descripcion: "Cillum ullamco dolore commodo velit ut anim enim consectetur cillum ex.",
            pict1: "https://fiestatijuana.mx/image-not-available.png",
            precio: 20.0,
            descuento: 0.0,
            oferta: 0.0,
            existencia: 5
        },
        {
            id: 4,
            sku: "AB-4",
            nombre: "Producto 4",
            descripcion: "Cillum ullamco dolore commodo velit ut anim enim consectetur cillum ex.",
            pict1: "https://fiestatijuana.mx/image-not-available.png",
            precio: 25.0,
            descuento: 0.0,
            oferta: 0.0,
            existencia: 5
        },
        {
            id: 5,
            sku: "AB-5",
            nombre: "Producto 5",
            descripcion: "Cillum ullamco dolore commodo velit ut anim enim consectetur cillum ex.",
            pict1: "https://fiestatijuana.mx/image-not-available.png",
            precio: 30.0,
            descuento: 0.0,
            oferta: 0.0,
            existencia: 5
        }
    ]
    await res.send(data)
}
