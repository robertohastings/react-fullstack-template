import jwt from "jsonwebtoken"

export const authenticateToken = (req, res, next) => {
    //console.log('authenticateToken', req)
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1] // Extrae el token del encabezado
    //console.log('token', token)

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token no proporcionado",
        })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: "Token inválido o expirado",
            })
        }

        req.user = user // Agrega la información del usuario al objeto `req`
        next() // Continúa con el siguiente middleware o controlador
    })
}
