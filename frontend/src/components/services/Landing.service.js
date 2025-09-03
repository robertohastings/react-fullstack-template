import axiosInstance from "../../tools/AxiosInstance";

export const updateLanding = async (data) => {
    try {
        const response = await axiosInstance.put("/putLandingPage_Settings", data);
        return response.data;
    } catch (error) {
        console.error("Error updating landing page:", error);
        throw new Error(error.response?.data?.message || "No se pudo actualizar la landing page.");
    }
};
export const gettingLandingPageAdmin = async (data) => {
    console.log("gettingLandingPageAdmin data:", data);
    try {
        const response = await axiosInstance.get("/getLandingPageAdmin", { params: { hostname: data }    });
        return response.data;
    } catch (error) {
        console.error("Error getting landing page:", error);
        throw new Error(error.response?.data?.message || "No se pudo obtener la landing page.");
    }
};
export const updateLandingPage_QuienesSomos = async (data) => {
    try {
        const response = await axiosInstance.put("/putLandingPage_QuienesSomos", data);
        return response.data;
    } catch (error) {
        console.error("Error updating landing page quienes somos:", error);
        throw new Error(error.response?.data?.message || "No se pudo actualizar la landing page quienes somos.");
    }
};
export const updateLandingPage_Products = async (data) => {
    try {
        const response = await axiosInstance.put("/putLandingPage_Productos", data);
        return response.data;
    } catch (error) {
        console.error("Error updating landing page productos:", error);
        throw new Error(error.response?.data?.message || "No se pudo actualizar la landing page productos.");
    }
};
export const updateLandingPage_Servicios = async (data) => {
    try {
        const response = await axiosInstance.put("/putLandingPage_Servicios", data);
        return response.data;
    } catch (error) {
        console.error("Error updating landing page servicios:", error);
        throw new Error(error.response?.data?.message || "No se pudo actualizar la landing page servicios.");
    }
};
export const gettingPuntosDeEntrega = async (params) => {
    console.log("gettingPuntosDeEntrega data:", params);
    try {
        const response = await axiosInstance.get("/getPuntosDeEntrega", {params});
        return response.data;
    } catch (error) {
        console.error("Error getting puntos de entrega:", error);
        throw new Error(error.response?.data?.message || "No se pudo obtener los puntos de entrega.");
    }
};
export const updatingPuntosDeEntrega = async (data) => {
    console.log("updatingPuntosDeEntrega data:", data);
    try {
        const response = await axiosInstance.put("/postPuntosDeEntrega", data);
        return response.data;
    } catch (error) {
        console.error("Error actualizando puntos de entrega:", error);
        throw new Error(error.response?.data?.message || "No se pudo actualizar los puntos de entrega.");
    }
};
//Fomras de Pago
export const gettingFormasDePago= async (params) => {
    console.log("gettingFormasDePago data:", params);
    try {
        const response = await axiosInstance.get("/getFormasDePago", { params });
        return response.data;
    } catch (error) {
        console.error("Error getting formas de pago:", error);
        throw new Error(error.response?.data?.message || "No se pudo obtener formas de pago.");
    }
};
export const updatingFormasDePago= async (data) => {
    console.log("updatingFormasDePago data:", data);
    try {
        const response = await axiosInstance.put("/putFormasDePago", data);
        return response.data;
    } catch (error) {
        console.error("Error updating formas de pago:", error);
        throw new Error(error.response?.data?.message || "No se pudo actualizar formas de pago.");
    }
};
// Colonias Delivery
export const gettingColoniasDelivery = async (params) => {
    console.log("gettingColoniasDelivery data:", params);
    try {
        const response = await axiosInstance.get("/getColoniasDeliveryListing", { params });
        return response.data;
    } catch (error) {
        console.error("Error getting colonias delivery:", error);
        throw new Error(error.response?.data?.message || "No se pudo obtener colonias delivery.");
    }
};
export const updatingColoniasDelivery = async (data) => {
    console.log("updatingColoniasDelivery data:", data);
    try {
        const response = await axiosInstance.post("/postColoniaDelivery", data);
        return response.data;
    } catch (error) {
        console.error("Error updating colonias delivery:", error);
        throw new Error(error.response?.data?.message || "No se pudo actualizar colonias delivery.");
    }
};
// Cajeros
export const gettingCajeros = async (params) => {
    console.log("gettingCajeros data:", params);
    try {
        const response = await axiosInstance.get("/getCajeroListing", { params });
        return response.data;
    } catch (error) {
        console.error("Error getting cajeros:", error);
        throw new Error(error.response?.data?.message || "No se pudo obtener cajeros.");
    }
};
export const updatingCajeros = async (data) => {
    console.log("updatingCajeros data:", data);
    try {
        const response = await axiosInstance.post("/postCajero", data);
        return response.data;
    } catch (error) {
        console.error("Error updating cajeros:", error);
        throw new Error(error.response?.data?.message || "No se pudo actualizar cajeros.");
    }
};