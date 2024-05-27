import axios from "axios";
import { lazy } from "react"
const AppbarNotAuth = lazy(() => import("../components/appbarNotAuth"));
const SignInComponent = lazy(() => import("../components/signInComponent"));
import { refreshInterceptor } from "../axiosInterceptors";

export default function SignInPage(){
    axios.interceptors.response.clear();
    axios.interceptors.response.eject(refreshInterceptor);
    return (
        <>
            <div className="flex flex-col items-center gap-5">
                <div className="w-full">
                    <AppbarNotAuth />
                </div>
                <div className="">
                    <SignInComponent />
                </div>                    
            </div>
        </>
    )
}