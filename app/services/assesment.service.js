import axiosInstance from "@/app/utils/axiosInstance"; // ✅ Use the centralized instance
import { Constants } from "@/app/utils/constants";

// =================== SERVICES ===================

// 1. Get Concerns by Gender
export const getConcerns = async (gender) => {
  try {
    const formattedGender = gender.charAt(0).toUpperCase() + gender.slice(1);
    
    // ✅ Use axiosInstance (Auto-handles URL if base path is set, otherwise full URL)
    const response = await axiosInstance.get(`${Constants.urlEndPoints.GET_CONCERNS}/${formattedGender}`);

    if (response.data.success) {
      return { success: true, data: response.data.data };
    }
    return { success: false, message: response.data.message };
  } catch (error) {
    console.error("Error fetching concerns:", error);
    return { success: false, message: error.response?.data?.message || "Failed to fetch concerns" };
  }
};

// 2. Get Questions for Selected Concerns
export const getQuestions = async (gender, concerns) => {
  try {
    const payload = {
      gender: gender.charAt(0).toUpperCase() + gender.slice(1),
      concerns: concerns,
    };

    const response = await axiosInstance.post(Constants.urlEndPoints.GET_QUESTIONS, payload);

    if (response.data.success) {
      return { success: true, data: response.data.data.questions };
    }
    return { success: false, message: response.data.message };
  } catch (error) {
    console.error("Error fetching questions:", error);
    return { success: false, message: error.response?.data?.message || "Failed to fetch questions" };
  }
};

// 3. Submit Assessment
export const submitAssessment = async (gender, selectedConcerns, formattedAnswers, freshToken) => {
  try {
    const payload = {
      gender: gender.charAt(0).toUpperCase() + gender.slice(1),
      selectedConcerns,
      answers: formattedAnswers,
    };

    // ✅ Special Config: If we have a fresh token (immediate login),
    // pass it in a custom header. The interceptor will pick it up, use it, and delete the header.
    const config = freshToken ? { headers: { _freshToken: freshToken } } : {};

    const response = await axiosInstance.post(
      Constants.urlEndPoints.SUBMIT_ASSESSMENT,
      payload,
      config 
    );

    if (response.data.success) {
      return { success: true, data: response.data.data };
    }
    return { success: false, message: response.data.message };

  } catch (error) {
    console.error("Error submitting assessment:", error);

    // Explicitly handle 401 if the interceptor didn't auto-refresh successfully
    if (error.response?.status === 401) {
      return {
        success: false,
        message: "Please login to submit assessment",
        requireLogin: true, // Signals UI to show modal
      };
    }

    return {
      success: false,
      message: error.response?.data?.message || "Failed to submit assessment",
    };
  }
};

// 4. ✅ Get My Assessment (Required for Data Hydration)
export const getMyAssessment = async () => {
  try {
    // Ensure this endpoint exists in your Constants or use the raw string
    const endpoint = Constants.urlEndPoints.GET_MY_ASSESSMENT || "/assessment/my-assessment";

    // No token logic needed here; axiosInstance grabs it from Redux storage
    const response = await axiosInstance.get(endpoint);

    if (response.data.success) {
      return { success: true, data: response.data.data }; // Returns: { gender, selectedConcerns, scores }
    }
    return { success: false, message: response.data.message };

  } catch (error) {
    // If 401 (Not logged in / Token invalid), just return success:false.
    // The UI knows this means "no data found" and won't show an error toast.
    if (error.response?.status === 401) {
        return { success: false };
    }

    console.error("Error fetching history:", error);
    return { 
        success: false, 
        message: error.response?.data?.message || "Failed to fetch assessment" 
    };
  }
};

// ✅ NEW: Reset/Delete Assessment on Backend
export const resetAssessmentData = async () => {
  try {
    const endpoint = "/assessment/reset"; // Ensure this matches your API definition
    const response = await axiosInstance.delete(endpoint);

    if (response.data.success) {
      return { success: true, message: response.data.message };
    }
    return { success: false, message: response.data.message };
  } catch (error) {
    console.error("Error resetting assessment:", error);
    return { success: false, message: error.response?.data?.message || "Failed to reset" };
  }
};