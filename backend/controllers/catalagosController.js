exports.apiObtenerCategorias = function (req, res) {
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
        }
    ]
    res.send(data)
}
