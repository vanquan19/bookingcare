import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import auth from "../configs/firebase.config";

const sendOTP = async (phoneNumber) => {
    const appVerifier = recaptchaVerifier;
    try {
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);

        return { isSuccess: true, confirmationResult };
    } catch (error) {
        return { isSuccess: false, message: error.message };
    }
};
