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
        console.log('error token', err)
        if (err) {
            // 1. Comprueba si el error es por expiración
            if (err.name === 'TokenExpiredError') {
                // --- INICIO: Mensajes de depuración ---
                console.log("--- Depuración de Token Expirado ---");
                console.log("Hora actual del servidor:", new Date());
                console.log("Hora de expiración del token:", err.expiredAt);
                console.log("------------------------------------");
                // --- FIN: Mensajes de depuración ---
                return res.status(403).json({
                    success: false,
                    message: "Token expirado",
                });
            }
            // 2. Para cualquier otro error, es inválido
            return res.status(403).json({
                success: false,
                message: "Token inválido",
            });
        }

        // --- INICIO: Mensajes de depuración para token válido ---
        // Si el token es válido, 'user' contiene el payload decodificado.
        if (user && user.exp) {
            // El timestamp 'exp' está en segundos, lo convertimos a milisegundos para el objeto Date.
            const expirationDate = new Date(user.exp * 1000);
            console.log("--- Depuración de Token Válido ---");
            console.log("Token válido. Expira en:", expirationDate);
            console.log("Hora actual del servidor:", new Date());
            console.log("----------------------------------");
        }
        // --- FIN: Mensajes de depuración ---

        req.user = user // Agrega la información del usuario al objeto `req`
        next() // Continúa con el siguiente middleware o controlador
    })
}
