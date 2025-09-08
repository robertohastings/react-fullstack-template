import React, { useState} from 'react'
//import VTracer from 'vtracer'
import { Offcanvas, Form, Button, Spinner, Alert, Card, Row, Col } from 'react-bootstrap';




function ImageConvertToSVG({ show, handleClose, onConversionComplete }) {
    const [originalImage, setOriginalImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            setError('Por favor, selecciona un archivo JPG o PNG.');
            return;
        }

        setError('');
        setLoading(true);
        setOriginalImage(URL.createObjectURL(file));

        try {
            //const tracer = await VTracer.init();

            // 3. Inicializa el trazador (necesario para WebAssembly)
            
            // 4. Llama al método de trazado con la URL del archivo
            // const svgString = await tracer.trace(URL.createObjectURL(file), {
            //     // Opciones de configuración para vtracer
            //     color_precision: 6,
            //     gradient_step: 2,
            //     filter_speckle: 10,
            // });

            //onConversionComplete(svgString);
        } catch (err) {
            console.error('Error durante la conversión:', err);
            setError('Ocurrió un error al convertir la imagen. Intenta con otra imagen.');
        } finally {
            setLoading(false);
        }
    };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" style={{ width: '500px' }}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Conversor de Imagen a SVG</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Card className="shadow-sm border-0">
          <Card.Body>
            <Form>
              <Form.Group controlId="imageFile" className="mb-4">
                <Form.Label className="fw-bold">1. Selecciona una imagen (JPG o PNG):</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} accept=".jpg,.jpeg,.png" />
              </Form.Group>
            </Form>

            {loading && (
              <div className="text-center my-4">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2 text-primary">Convirtiendo imagen a SVG...</p>
              </div>
            )}
            {error && <Alert variant="danger">{error}</Alert>}
          </Card.Body>
        </Card>

        {originalImage && (
          <div className="mt-4">
            <h3 className="h6 fw-bold">Imagen Original</h3>
            <Card className="shadow-sm border-0">
              <Card.Body className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                <img src={originalImage} alt="Original" className="img-fluid rounded-2" style={{ maxHeight: '250px' }} />
              </Card.Body>
            </Card>
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default ImageConvertToSVG