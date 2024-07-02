export async function apiLanding (req, res) {
    const data = {
        aboutUs: {
            titulo: "About Us",
            activo: true,
            contenido: "<p>Lorem itsu lorem itsu. lorem itus.</p><ol><li>One</li><li>Two</li><br></ol>"
        },
        products: {
            titulo: "Nuestros productos",
            activo: true,
            contenido: "<p><strong>Lorem</strong> ipsum dolor sit amet consectetur adipisicing elit. Voluptas aliquam nemo laboriosam consectetur ut voluptatem ad, saepe tenetur porro repudiandae recusandae exercitationem eveniet quia mollitia dolorem. Quidem delectus voluptatibus fuga?</p><p><strong>Lorem</strong> ipsum dolor sit amet consectetur adipisicing elit. Voluptas aliquam nemo laboriosam consectetur ut voluptatem ad, saepe tenetur porro repudiandae recusandae exercitationem eveniet quia mollitia dolorem. Quidem delectus voluptatibus fuga?</p>"
        },
        services: {
            titulo: "Nuestros servicios",
            activo: true,
            contenido: "<p><strong>Lorem</strong> ipsum dolor sit amet consectetur adipisicing elit. Voluptas aliquam nemo laboriosam consectetur ut voluptatem ad, saepe tenetur porro repudiandae recusandae exercitationem eveniet quia mollitia dolorem. Quidem delectus voluptatibus fuga?</p><p><strong>Lorem</strong> ipsum dolor sit amet consectetur adipisicing elit. Voluptas aliquam nemo laboriosam consectetur ut voluptatem ad, saepe tenetur porro repudiandae recusandae exercitationem eveniet quia mollitia dolorem. Quidem delectus voluptatibus fuga?</p>"
        },
        categories: [
            {
                id: 1,
                descripcion: "Cillum 1 ullamco dolore commodo velit ut"
            },
            {
                id: 2,
                descripcion: "Cillum 2 ullamco dolore commodo velit ut"
            },
            {
                id: 3,
                descripcion: "Cillum 3 ullamco dolore commodo velit ut"
            },
            {
                id: 4,
                descripcion: "Cillum 4 ullamco dolore commodo velit ut"
            },
            {
                id: 5,
                descripcion: "Cillum 5 ullamco dolore commodo velit ut"
            }
        ]
    }
    await res.send(data)
}
