import { useContext } from "react";
import StateContext from "../StateContext";

export const useTipoPedido = () => {
    const appState = useContext(StateContext)

    return appState.landingPage.tipoPedido
}
export const useFormasDePagoEnSitio = () => {
    const appState = useContext(StateContext)
    const formasDePago = appState.landingPage.formasDePago

    return formasDePago.filter((formaDePago) => formaDePago.en_sitio === 1)
}
export const useFormasDePagoEnTiendaOnLine = () => {
    const appState = useContext(StateContext)
    const formasDePago = appState.landingPage.formasDePago

    return formasDePago.filter((formaDePago) => formaDePago.en_tienda_online === 1)
}
export const useUsuarioID = () => {
    const appState = useContext(StateContext)

    return appState.usuario.idUsuario
}
export const useEmpresaID = () => {
    const appState = useContext(StateContext)

    return appState.idEmpresa
}

export const useHostname = () => {
    const appState = useContext(StateContext)

    return appState.hostname
}
export const useLandingPageID = () => {
    const appState = useContext(StateContext)

    return appState.landingPage.idLandingPage
}