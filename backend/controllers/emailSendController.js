const nodemailer = require("nodemailer")

exports.apiSendEmailByGmal = async function (req, res) {
    console.log('entre')
    const { nombre, email, telefono, comentarios } = req.body

    if (!nombre || !email || !telefono || !comentarios) {
        return res.status(400).send("Todos los campos son obligatorios")
    }

    const transporter = nodemailer.createTransport({
        host: "slmp-550-46.slc.westdc.net",
        port: 465,
        secure: true,
        auth: {
            user: "contacto@hostregio.com", // Reemplaza con tu dirección de correo de Gmail
            pass: "6$(V@!Tel@$$" // Reemplaza con tu contraseña de Gmail
        }
    })

    const mailOptions = {
        from: "contacto@hostregio.com",
        to: "rob.hst@gmail.com",
        subject: "Nuevo mensaje de contacto",
        text: `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nComentarios: ${comentarios}`
    }

    try {
        await transporter.sendMail(mailOptions)
        res.send("Mensaje enviado")
    } catch (error) {
        console.error("Error al enviar el correo:", error)
        res.status(500).send("Error al enviar el correo")
    }
}
