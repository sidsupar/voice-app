import axios from "axios";
import { refreshInterceptor } from "../axiosInterceptors";
import AppbarNotAuth from "../components/appbarNotAuth";
import SignUpComponent from "../components/signUpComponent";

export default function SignUpPage(){
    axios.interceptors.response.clear();
    axios.interceptors.response.eject(refreshInterceptor);

    return(
        <div>
            <div className="flex flex-col justify-center mt-[2%]">
                <div className="w-full">
                    <AppbarNotAuth />
                </div>
                <div className="flex flex-col items-center">
                    <SignUpComponent />
                </div>
            </div>
        </div>
    )

}