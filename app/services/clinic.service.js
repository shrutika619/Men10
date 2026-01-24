import axios from "axios";
import { Constants } from "@/app/utils/constants"; 

export const getAllClinics = async () => {
    try {
        const response = await axios.get(Constants.urlEndPoints.GET_CLINICS);
        // Based on your API docs, the data structure might be response.data.data.clinics
        // But if you return response.data, the component can handle it.
        return response.data;
    } catch (error) {
        console.error("Error fetching clinics:", error);
        return { success: false, data: [] };
    }
};
export const getAllCities = async () => {
    try {
        const response = await axios.get(Constants.urlEndPoints.GET_CLINICS_city);
        // Based on your API docs, the data structure might be response.data.data.clinics
        // But if you return response.data, the component can handle it.
        return response.data;
    } catch (error) {
        console.error("Error fetching clinics:", error);
        return { success: false, data: [] };
    }
};