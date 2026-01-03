import axios from "axios";
import { Constants } from "@/app/utils/constants";

/**
 * SEND LOGIN OTP
 */
export const sendLoginOtp = async (mobileNo) => {
    const response = await axios.post(
        Constants.urlEndPoints.SEND_OTP,
        { mobileNo }
    );
    return response.data;
};

/**
 * VERIFY LOGIN OTP
 * Returns accessToken & refreshToken
 */
export const verifyLoginOtp = async (mobileNo, otp) => {
    const response = await axios.post(
        Constants.urlEndPoints.VERIFY_OTP,
        { mobileNo, otp }
    );
    return response.data;
};
