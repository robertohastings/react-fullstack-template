import React, { useState } from "react"
import { Card } from "react-bootstrap"

function CardImagenConFallback({ src, alt, fallback = "/img/image-not-available.png" }) {
    const [hasError, setHasError] = useState(false)

    return <Card.Img src={hasError ? fallback : src} alt={alt} onError={() => setHasError(true)} />
}

export default CardImagenConFallback
