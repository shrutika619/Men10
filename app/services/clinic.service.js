import axios from "axios";
import { Constants } from "@/app/utils/constants"; 

export const getAllClinics = async (cityId) => {
    // 1. Validation Check: If cityId is missing, null, or undefined
    if (!cityId) {
        console.error("Fetch aborted: cityId is required.");
        return { 
            success: false, 
            clinics: [], 
            message: "City not found. Please select a valid city." 
        };
    }

    try {
        // 2. Request with mandatory city parameter
        const response = await axios.get(`${Constants.urlEndPoints.GET_CLINICS}`, {
            params: { city: cityId }
        });

        // 3. Handling the specific structure of your response
        if (response.data && response.data.success) {
            return {
                success: true,
                clinics: response.data.data.clinics,
                total: response.data.data.total,
                message: response.data.message
            };
        }
        
        return { 
            success: false, 
            clinics: [], 
            message: response.data?.message || "Failed to fetch clinics" 
        };

    } catch (error) {
        console.error("Error fetching clinics:", error);
        return { 
            success: false, 
            clinics: [], 
            message: error.response?.data?.message || "Server Error" 
        };
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