import axiosInstance from "../../tools/AxiosInstance";

export const gettingMenu = async (params) => {
    try {
        const response = await axiosInstance.get("/getMenu", { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching menu:", error);
        throw error;
    }
};
export const updatingMenu = async (data) => {
    try {
        const response = await axiosInstance.post("/postMenu", data);
        return response.data;
    } catch (error) {
        console.error("Error updating menu:", error);
        throw error;
    }
};
export const gettingRolListing = async (params) => {
    try {
        const response = await axiosInstance.get("/getRolListing", { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching roles:", error);
        throw error;
    }
};
export const postingRoles = async (data) => {
    try {
        const response = await axiosInstance.post("/postRol", data);
        return response.data;
    } catch (error) {
        console.error("Error posting roles:", error);
        throw error;
    }
};
export const gettingModulos = async (params) => {
    try {
        const response = await axiosInstance.get("/getModuloListing", { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching modulos:", error);
        throw error;
    }
};
export const postingModulos = async (data) => {
    try {
        const response = await axiosInstance.post("/postModulo", data);
        return response.data;
    } catch (error) {
        console.error("Error posting modulos:", error);
        throw error;
    }
};
export const gettingRolMenuListing = async (params) => {
    try {
        console.log('Request params from gettingRolMenuListing:', params);
        const response = await axiosInstance.get("/admin/getRolMenuListing", { params });
        console.log('Response data from getRolMenuListing:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching rol menu:", error);
        throw error;
    }
};
export const postingRolMenu = async (data) => {
    try {
        const response = await axiosInstance.post("/admin/postRolMenu", data);
        return response.data;
    } catch (error) {
        console.error("Error posting rol menu:", error);
        throw error;
    }
};
export const gettingRoles = async (params) => {
    try {
        const response = await axiosInstance.get("/admin/getRoles", { params });
        console.log("Response data from getRoles:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching roles:", error);
        throw error;
    }
};
export const gettingEmpresasListing = async (params) => {
    try {
        console.log('Request params from gettingEmpresasListing:', params);
        const response = await axiosInstance.get("/admin/getEmpresasListing", { params });
        console.log("Response data from getEmpresasListing:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching empresas:", error);
        throw error;
    }
};
export const postingEmpresas = async (data) => {
    try {
        const response = await axiosInstance.post("/admin/postEmpresa", data);
        return response.data;
    } catch (error) {
        console.error("Error posting empresas:", error);
        throw error;
    }
};
