import axiosInstance from "@/app/utils/axiosInstance"; // ✅ Use the Instance
import { Constants } from "@/app/utils/constants";

/**
 * SEND LOGIN OTP
 */
export const sendLoginOtp = async (mobileNo) => {
  try {
    const response = await axiosInstance.post(
      Constants.urlEndPoints.SEND_OTP,
      { mobileNo }
    );
    
    // Normalize response to match your other services
    return response.data; 
  } catch (error) {
    console.error("Send OTP Error:", error);
    // Return a failed object instead of crashing
    return {
      success: false,
      message: error.response?.data?.message || "Failed to send OTP",
    };
  }
};

/**
 * VERIFY LOGIN OTP
 * Returns accessToken & refreshToken
 */
export const verifyLoginOtp = async (mobileNo, otp) => {
  try {
    const response = await axiosInstance.post(
      Constants.urlEndPoints.VERIFY_OTP,
      { mobileNo, otp },
      { withCredentials: true } // ✅ Keeps cookies working
    );

    return response.data;
  } catch (error) {
    console.error("Verify OTP Error:", error);
    // Throwing here is actually okay because OTPLogin.jsx expects to catch errors
    // But for consistency, we can return the error object, 
    // and let the component handle the 'success: false' check.
    throw error; 
  }
};