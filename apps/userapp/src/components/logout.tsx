import { useState } from "react";
import { SubmitButtonLoadType } from "@repo/ui/submit-button-load-type";
import { useNavigate } from "react-router";
import logoutModel from "../model/logoutModel";
import { useDispatch, useSelector } from "react-redux";
import { checkUserLoginStatusThunk, setUserDetailsState } from "../globalStates/userDataSlice";

export default function Logout(){

    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean>(false);
    const loginStatus = useSelector(setUserDetailsState).loginStatus;
    const dsipatch = useDispatch();
    const navigate= useNavigate();

    async function handleLogout(){
        //@ts-ignore
        setLoading(true);
        const [loading, status] = await logoutModel();
        setLoading(loading);
        setStatus(status);
    }    

    if(status){
        //@ts-ignore
        dsipatch(checkUserLoginStatusThunk(""));
        navigate("/login");
    }

    return(
        <div>
            <SubmitButtonLoadType buttonText= {loginStatus ? "logout":"login"} 
                                  handleClick={loginStatus?handleLogout : () => {navigate("/login")}} 
                                  loading={loading}
            />
        </div>
    )
}