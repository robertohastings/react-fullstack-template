const nodemailer = require("nodemailer")

exports.apiSendEmailByGmal = async function (req, res) {
    const { nombre, email, telefono, comentarios } = req.body

    if (!nombre || !email || !telefono || !comentarios) {
        return res.status(400).send("Todos los campos son obligatorios")
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "rob.hst@gmail.com", // Reemplaza con tu dirección de correo de Gmail
            pass: "IaN090918." // Reemplaza con tu contraseña de Gmail
        }
    })

    const mailOptions = {
        from: "rob.hst@gmail.com",
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
