export class Constants {
   static API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4500/api";
     static urlEndPoints = {
         SEND_OTP: `${(this.API_BASE_URL)}/user/auth/send-otp`,
         VERIFY_OTP: `${(this.API_BASE_URL)}/user/auth/verify-otp`,
         REFRESH_ACCESS_TOKEN: `${(this.API_BASE_URL)}/user/auth/refresh-access-token`,
    }
}