import React, { useState, useRef, useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import Cropper from "cropperjs"
import "cropperjs/dist/cropper.css"

const ImageEditor = ({ onImageEdited, ImageWidth = 256, ImageHeight = 197 }) => {
    const [file, setFile] = useState(null)
    const [cropper, setCropper] = useState(null)
    const imageRef = useRef(null)
    const previewCanvasRef = useRef(null)

    useEffect(() => {
        if (file && imageRef.current) {
            const cropperInstance = new Cropper(imageRef.current, {
                aspectRatio: 4 / 3,
                viewMode: 1,
                autoCropArea: 1,
                background: false,
                zoomable: false,
                scalable: false,
                crop: () => {
                    const canvas = previewCanvasRef.current
                    if (canvas && cropperInstance) {
                        const ctx = canvas.getContext("2d")
                        const croppedCanvas = cropperInstance.getCroppedCanvas()
                        canvas.width = croppedCanvas.width
                        canvas.height = croppedCanvas.height
                        ctx.clearRect(0, 0, canvas.width, canvas.height)
                        ctx.drawImage(croppedCanvas, 0, 0)
                    }
                }
            })
            setCropper(cropperInstance)
        }
    }, [file])

    const handleFileChange = e => {
        const selectedFile = e.target.files[0]
        if (selectedFile) {
            setFile(URL.createObjectURL(selectedFile))
        }
    }

    const handleSave = () => {
        if (cropper) {
            const canvas = cropper.getCroppedCanvas({
                width: ImageWidth, // Cambia el tamaño según tus necesidades 256 * 197
                height: ImageHeight,
                imageSmoothingQuality: "high"
            })

            const ctx = canvas.getContext("2d")
            ctx.globalCompositeOperation = "destination-over"
            ctx.fillStyle = "rgba(0,0,0,0)" // Fondo transparente
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            canvas.toBlob(
                blob => {
                    onImageEdited(blob)
                },
                "image/png",
                0.8
            ) // Ajusta el formato y calidad según tus necesidades
        }
    }

    return (
        <div>
            {/* <h2>Image Editor</h2> */}
            <input type="file" accept="image/*" name="image" onChange={handleFileChange} />
            <div>
                <Row>
                    <Col>{file && <img ref={imageRef} src={file} alt="Selected" style={{ width: "100%", height: "100%" }} />}</Col>
                    <Col>
                        <canvas ref={previewCanvasRef} style={{ width: "256px", height: "197px" }}></canvas>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button onClick={handleSave}>Seleccionar</button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ImageEditor
