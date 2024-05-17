import { InputElement } from "@repo/ui/input-element";
import { useState, useEffect } from "react";
import { SubmitButton } from "@repo/ui/submit-button";
import signUpMethod from "../hooks/signUpHook";

export default function SignUpComponent(){

    const [mobile, setMobile] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [buttonClicked, setButtonClicked] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>("");

    useEffect(()=>{
        const registerUser = async function (){
            if(buttonClicked){
                const {loading, message} = await signUpMethod({
                    mob:mobile,
                    password:password,
                    name:name,
                    email:email,
                    address:address,
                });
                setLoading(loading);
                setMsg(message)
                setButtonClicked(false);
            }
        }
        registerUser();
    },[buttonClicked]);
    function handleClick(){
        console.log("SignUp button clicked: "+buttonClicked)
        setButtonClicked(val => !val);
    }
    if(loading){
        return(
            <div>
                Loading...
            </div>
        )
    }

    return(
        <>        
            <div className="p-1 w-[25%] border-[2px] rounded-md border-white-500">
                
                <div className="flex flex-col items-center gap-2">
                    <div className="font-italic font-extrabold text-4xl">
                        SignUp
                    </div>
                    <div>
                        {msg}
                    </div>
                    <InputElement state={name} setState={setName} placeholder="Jhon Doe" label="Name" />
                    <InputElement state={email} setState={setEmail} placeholder="jhon.doe@xyz.com" label="Email" />
                    <InputElement state={address} setState={setAddress} placeholder="71, street 2, xyz city, abc state, 100202, NYC, United States" label="Address" />
                    <InputElement state={mobile} setState={setMobile} placeholder="9999999999" label="Contact Number" />
                    <InputElement state={password} setState={setPassword} placeholder="abc@1234A" label="Password" />
                    <SubmitButton buttonText="SignUp" handleClick={handleClick} />
                </div>
            </div>            
        </>
    )
}