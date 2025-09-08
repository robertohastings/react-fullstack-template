import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import HeaderCRM from '../LandingPages/Header2'
import HeaderERP from './Header2'

function AppLayout() {
    const location = useLocation();

    // Se añade este useEffect para manipular la clase del body
    useEffect(() => {
        const isCotizarPage = location.pathname === '/erp/Ventas/Cotizar';

        if (isCotizarPage) {
            // Si estamos en la página de Cotizar, añade la clase para el modo pantalla completa
            document.body.classList.add('full-screen-mode');
        }

        // Función de limpieza: se ejecuta cuando el componente se desmonta o antes de que el efecto se vuelva a ejecutar.
        return () => {
            // Siempre elimina la clase al salir de la ruta para restaurar el layout normal.
            document.body.classList.remove('full-screen-mode');
        };
    }, [location]); // El efecto se re-ejecuta cada vez que la 'location' cambia


    // Si la ruta es exactamente la de Cotizar, no renderices ningún header.
    if (location.pathname === '/erp/Ventas/Cotizar') {
        return null;
    }

    // Si la ruta actual comienza con /erp, muestra el HeaderERP.
    if (location.pathname.startsWith('/erp')) {
        return <HeaderERP />;
    }

    // Para cualquier otra ruta (incluyendo "/", "/crm/login", etc.), muestra el HeaderCRM.
    return <HeaderCRM />;
}

export default AppLayout