import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router";
import { checkUserLoginStatusThunk, setUserDetailsState } from "../globalStates/userDataSlice";
import { useEffect } from "react";
import Appbar from "./appbar";
import { refreshInterceptor } from "../axiosInterceptors";
import axios from "axios";

console.log("Interceptor imported");

export default function ProtectedRoute({children}: {children:React.ReactNode}){

    const userDetails = useSelector(setUserDetailsState);
    console.log("UserDetails using useSelector in ProtectedRoute")
    console.log(userDetails);
    const loginStatus = userDetails?.loginStatus;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(`loginStatus = ${loginStatus}`);
    
    useEffect(()=>{
        let ignore = false;
        if(loginStatus !== true){
            //@ts-ignore
            dispatch(checkUserLoginStatusThunk(userDetails?.name));
            navigate("/auth");
        }
        return () => {
            console.log("Axios interceptors")
            console.log(axios.interceptors)
            console.log("Axios interceptors")
            ignore = true;
        };
    });

    return(
        <div className="flex flex-col">
            <div>
                <Appbar />
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}