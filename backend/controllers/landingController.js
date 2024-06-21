exports.apiLanding = function (req, res) {
    const data = {
        aboutUs: {
            titulo: "About Us",
            activo: true,
            contenido: "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas aliquam nemo laboriosam consectetur ut voluptatem ad, saepe tenetur porro repudiandae recusandae exercitationem eveniet quia mollitia dolorem. Quidem delectus voluptatibus fuga?</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem adipisci maiores ab sequi unde explicabo ratione excepturi harum obcaecati modi. Sint, minus quo? Ut quibusdam excepturi, officiis odio non libero.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem adipisci maiores ab sequi unde explicabo ratione excepturi harum obcaecati modi. Sint, minus quo? Ut quibusdam excepturi, officiis odio non libero.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem adipisci maiores ab sequi unde explicabo ratione excepturi harum obcaecati modi. Sint, minus quo? Ut quibusdam excepturi, officiis odio non libero.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem adipisci maiores ab sequi unde explicabo ratione excepturi harum obcaecati modi. Sint, minus quo? Ut quibusdam excepturi, officiis odio non libero.</p>"
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
        }        
    }
    res.send(data)
}
