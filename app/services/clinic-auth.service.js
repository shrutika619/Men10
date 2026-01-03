import axiosInstance from "@/app/utils/axiosInstance";
import {Constants} from "@/app/utils/constants";

/**
 * SEND OTP
 * @param {string} mobileNo
 */
export const sendClinicOtp = async (mobileNo) => {
    const response = await axiosInstance.post(
        Constants.urlEndPoints.CLINIC_SEND_OTP,
        { mobileNo }
    );
    return response.data;
};

/**
 * VERIFY OTP
 * @param {string} mobileNo
 * @param {string} otp
 */
export const verifyClinicOtp = async (mobileNo, otp) => {
    const response = await axiosInstance.post(
        Constants.urlEndPoints.CLINIC_VERIFY_OTP,
        { mobileNo, otp }
    );
    return response.data;
};

/**
 * Submit clinic registration form (multipart/form-data)
 */
export const submitClinicForm = async (formData) => {
    const res = await axiosInstance.post(
        Constants.urlEndPoints.SUBMIT_CLINIC_FORM,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return res.data;
};
