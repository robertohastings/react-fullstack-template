import React, { useState } from "react"
import { Modal, Button } from "react-bootstrap"

function CustomModal({ show, title, question, buttons, onClose }) {
    const [showModal, setShowModal] = useState(show)

    const handleClose = value => {
        setShowModal(false)
        onClose(value) // Retorna el valor del botón seleccionado
    }

    return (
        <Modal show={showModal} onHide={() => handleClose(null)}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{question}</p>
            </Modal.Body>
            <Modal.Footer>
                {buttons.map((button, index) => (
                    <Button key={index} variant={button.variant || "secondary"} onClick={() => handleClose(button.value)}>
                        {button.label}
                    </Button>
                ))}
            </Modal.Footer>
        </Modal>
    )
}

export default CustomModal
