import axiosInstance from "@/app/utils/axiosInstance";
import { Constants } from "@/app/utils/constants";

export const savePatientProfile = async (profileData) => {
  try {
    let payload;

    if (profileData.profileImage instanceof File) {
      payload = new FormData();
      
      if (profileData.fullName) payload.append("fullName", profileData.fullName);
      if (profileData.email) payload.append("email", profileData.email);
      if (profileData.age) payload.append("age", profileData.age);
      if (profileData.gender) payload.append("gender", profileData.gender);
      
      payload.append("profileImage", profileData.profileImage);
    } else {
      payload = {
        fullName: profileData.fullName,
        email: profileData.email,
        age: profileData.age,
        gender: profileData.gender,
      };
    }

    const response = await axiosInstance.post(
      Constants.urlEndPoints.SAVE_PATIENT_PROFILE,
      payload
    );

    if (response.data.success) {
      return { 
        success: true, 
        data: response.data.data, 
        message: response.data.message 
      };
    }

    return { success: false, message: response.data.message };

  } catch (error) {
    console.error("Error saving patient profile:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong while saving profile",
    };
  }
};


export const getPatientProfile = async () => {
  try {
    const endpoint = Constants.urlEndPoints.GET_PATIENT_PROFILE;
    
    const response = await axiosInstance.get(endpoint);

    if (response.data.success) {
      return {
        success: true,
        data: response.data.data, 
        message: response.data.message
      };
    }

    return { success: false, message: response.data.message };
  } catch (error) {
    // ✅ HANDLE 404 SPECIFICALLY
    if (error.response?.status === 404) {
      return {
        success: false,
        isNotFound: true, // Special flag we can check in UI
        message: "Profile not found",
      };
    }

    console.error("Error fetching patient profile:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch profile details",
    };
  }
};