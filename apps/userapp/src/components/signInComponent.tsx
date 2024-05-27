import { InputElement } from "@repo/ui/input-element";
import { useState, useEffect } from "react";
import { SubmitButtonLoadType } from "@repo/ui/submit-button-load-type";
import signInMethod from "../model/signInModel";
import { useDispatch, useSelector } from "react-redux";
import { checkUserLoginStatusThunk, setUserDetails, setUserDetailsState } from "../globalStates/userDataSlice";
import { useNavigate } from "react-router";
import { EmojiGenerator } from "@repo/ui/emoji-generator";

export default function SignInComponent(){

    const [mobileOrEmail, setMobileOrEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [buttonClicked, setButtonClicked] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [showMsg, setShowMsg] = useState<boolean>(false);
    const [status, setStatus] = useState<string>("");
    const [msg, setMsg] = useState<string>("");
    const userDetails:any = useSelector( setUserDetailsState );
    const dispatch = useDispatch();
    const loginStatus = userDetails?.loginStatus ?? false;
    const navigate = useNavigate();
    
    console.log(`loginStatus = ${loginStatus}`);
    
    useEffect(()=>{
        if(loginStatus){
            navigate("/auth/dashboard");
        }
    },[loginStatus]);    

    useEffect(()=>{
        const signInUser = async function (){
            if(buttonClicked){
                setShowMsg(false);
                setLoading(true);
                const result = await signInMethod({
                    username:mobileOrEmail,
                    password:password
                });

                const  {status, message} = result;
                console.log(`result onbject in signin + `);
                console.log(result)
                console.log(`status of "user" in result = ${"user" in result ? "true" : "false"} `)
                if("user" in result){
                    dispatch(setUserDetails(result.user));
                    setTimeout(() => {
                        //@ts-ignore
                        dispatch(checkUserLoginStatusThunk(result.user.name));
                    },2000);
                }else{
                    console.log("User not found in response while logging in");                    
                }
                setLoading(false);
                setMsg(message);
                setStatus(status);
                setShowMsg(true);
                setButtonClicked(false);
            }
        }
        signInUser();
    },[buttonClicked]);

    function handleClick(){
        console.log("SignIn button clicked: "+buttonClicked)
        setButtonClicked(val => !val);
    }

    return(
        <>        
            <div className="flex flex-col items-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className={`${status == "error" ? "text-red-500" : "text-green-500"} font-sm`}>
                    {showMsg && msg} {showMsg && ((status == "error") ?<EmojiGenerator symbol={"0x1F9D0"} /> : <EmojiGenerator symbol={"0x1F60E"} />)}
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="font-italic font-extrabold text-4xl">
                        SignIn
                    </div>
                    <InputElement state={mobileOrEmail} setState={setMobileOrEmail} placeholder="Enter your email or password" label="UserID" />
                    <InputElement state={password} setState={setPassword} placeholder="abc@1234A" label="Password" />
                    <SubmitButtonLoadType loading={loading} buttonText="SignIn" handleClick={handleClick} />
                </div>
            </div>            
        </>
    )
}