export class Constants {
   static API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";
     static urlEndPoints = {
         SEND_OTP: `${(this.API_BASE_URL)}/auth/send-otp`,
         RESEND_OTP: `${(this.API_BASE_URL)}/auth/resend-otp`,
         VERIFY_OTP: `${(this.API_BASE_URL)}/auth/verify-otp`,
         REFRESH_ACCESS_TOKEN: `${(this.API_BASE_URL)}/auth/refresh-access-token`,
         CLINIC_SEND_OTP: "/clinic/send-otp",
         CLINIC_VERIFY_OTP: "/clinic/verify-otp",
         SUBMIT_CLINIC_FORM: "/clinic/submit-form"
    }
}