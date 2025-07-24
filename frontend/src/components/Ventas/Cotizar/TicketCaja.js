import React, { useEffect } from 'react';

function TicketCaja({ formData, formasDePago }) {
    // useEffect(() => {
    //      console.log("formData:", formData)
    // }
    // , [formData]);

    // Genera un array con descripción e importe
    const formasDePagoConDescripcion = Object.entries(formData.formasDePago)
        .filter(([_, importe]) => Number(importe) > 0)
        .map(([id, importe]) => {
            const forma = formasDePago.find(f => String(f.id_forma_de_pago) === String(id));
            return {
                descripcion: forma ? forma.descripcion : id,
                importe: Number(importe)
            };
    });

    return (
        <div>
            {/* <h5 className="text-center">Ticket de Caja</h5>
            <hr /> */}
            <p><strong>Cajero ID:</strong> {`${formData.cajeroId} - ${formData.nombre_cajero}`}</p>
            <p><strong>Tipo de Movimiento:</strong> {formData.tipoMovimiento}</p>
            <p><strong>Motivo:</strong> {formData.motivo}</p>
            <p><strong>Importe:</strong> ${Number(formData.importe).toFixed(2)}</p>
            {formData.cerrarCaja && (
                <>
                    <h6>Formas de Pago:</h6>
                    <ul>
                        {/* {Object.entries(formData.formasDePago).map(([forma, importe]) => (
                            <li key={forma}>
                                {forma}: ${Number(importe).toFixed(2)}
                            </li>
                        ))} */}
                        {formasDePagoConDescripcion.map((fp, index) => (
                            <li key={index}>
                                {fp.descripcion}: ${fp.importe.toFixed(2)}
                            </li>
                        ))}

                    </ul>
                </>
            )}
        </div>
    );
}

export default TicketCaja