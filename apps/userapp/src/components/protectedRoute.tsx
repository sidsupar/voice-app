import { useDispatch, useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router";
import { checkUserLoginStatusThunk, setUserDetailsState } from "../globalStates/userDataSlice";
import { useEffect } from "react";
//@ts-ignore
import { refreshInterceptor } from "../axiosInterceptors";
//@ts-ignore
import axios from "axios";

console.log("Interceptor imported");

export default function ProtectedRoute(){

    const userDetails = useSelector(setUserDetailsState);
    // console.log("UserDetails using useSelector in ProtectedRoute")
    // console.log(userDetails);
    const loginStatus = userDetails?.loginStatus;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // console.log(`loginStatus = ${loginStatus}`);
    
    useEffect(()=>{
        let ignore = false;
        if(loginStatus !== true){
            //@ts-ignore
            dispatch(checkUserLoginStatusThunk(userDetails?.name));
            navigate("/login");
        }
        return () => {
            // console.log("Axios interceptors")
            // console.log(axios.interceptors)
            // console.log("Axios interceptors")
            console.log(`ignore = ${ignore}`);
            ignore = true;
        };
    });

    return(
        <div className="flex flex-col">
            <div>
                <Outlet />
            </div>
        </div>
    )
}