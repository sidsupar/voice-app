import { InputElement } from "@repo/ui/input-element";
import { useState, useEffect } from "react";
import signUpMethod from "../model/signUpModel";
import { SubmitButtonLoadType } from "@repo/ui/submit-button-load-type";

export default function SignUpComponent(){

    const [mobile, setMobile] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [buttonClicked, setButtonClicked] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [showMsg, setShowMsg] = useState<boolean>(false);
    const [status, setStatus] = useState<string>("");
    const [msg, setMsg] = useState<string>("");

    useEffect(()=>{
        const registerUser = async function (){
            if(buttonClicked){
                setShowMsg(false);
                setLoading(true);
                const {message, status} = await signUpMethod({
                    mob:mobile,
                    password:password,
                    name:name,
                    email:email,
                    address:address,
                });
                setLoading(false);
                setMsg(message);
                setStatus(status);
                setShowMsg(true);
                setButtonClicked(false);
            }
        }
        registerUser();
    },[buttonClicked]);

    function handleClick(){
        console.log("SignUp button clicked: "+buttonClicked)
        setButtonClicked(val => !val);
    }

    return(
        <>        
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className={`${status == "error" ? "text-red-500" : "text-green-500"} font-sm`}>
                    {showMsg && msg}
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="font-italic font-extrabold text-4xl">
                        SignUp
                    </div>
                    <InputElement state={name} setState={setName} placeholder="Jhon Doe" label="Name" />
                    <InputElement state={email} setState={setEmail} placeholder="jhon.doe@xyz.com" label="Email" />
                    <InputElement state={address} setState={setAddress} placeholder="71, street 2, xyz city, abc state, 100202, NYC, United States" label="Address" />
                    <InputElement state={mobile} setState={setMobile} placeholder="9999999999" label="Contact Number" />
                    <InputElement state={password} setState={setPassword} placeholder="abc@1234A" label="Password" />
                    <SubmitButtonLoadType loading={loading} buttonText="SignUp" handleClick={handleClick} />
                </div>
            </div>            
        </>
    )
}