import axiosInstance from "../../tools/AxiosInstance";

export const gettingClientes = async (params) => {
    try {
        const response = await axiosInstance.get("/cartera/getclientesListing", { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching clientes:", error);
        throw error;
    }
};
export const postingCliente = async (data) => {
    try {
        const response = await axiosInstance.post("/cartera/postCliente", data);
        return response.data;
    } catch (error) {
        console.error("Error posting clientes:", error);
        throw error;
    }
};
