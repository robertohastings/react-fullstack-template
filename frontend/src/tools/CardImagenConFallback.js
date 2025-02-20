import React, { useState } from "react"
import { Card } from "react-bootstrap"

function CardImagenConFallback({ src, alt, fallback = "/img/image-not-available.png", width = "200px", height = "200px" }) {
    const [hasError, setHasError] = useState(false)

    const imageStyle = {
        width: width,
        height: height,
        objectFit: "cover" // o 'contain', 'fill', 'cover', etc.
    }

    return <Card.Img src={hasError ? fallback : src} alt={alt} onError={() => setHasError(true)} style={imageStyle} />
}

export default CardImagenConFallback
