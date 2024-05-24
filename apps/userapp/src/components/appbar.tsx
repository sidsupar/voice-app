import { Link } from "react-router-dom";
import Logout from "./logout";
import AvatarComponent from "./avatarComponent";
import { useSelector } from "react-redux";
import { setUserDetailsState } from "../globalStates/userDataSlice";
import SwitchTheme from "./switchThemeMode";

export default function Appbar(){
    console.log("Inside AppBar compnent--------------------------------------------------------------");
    const userDetails = useSelector(setUserDetailsState);
    console.log(userDetails);
    console.log("Inside AppBar compnent--------------------------------------------------------------");

    return(
        <div className="max-h-fit min-h-[15vh] flex justify-center bg-slate-100 dark:bg-gray-600">
            <div className="border-b pt-2 pb-2 pl-1 pr-1 flex justify-between w-screen">
                <div className="flex flex-col justify-center p-2">
                    <Link to="/home">                
                        <div className="underline underline-offset-2 flex flex-col justify-center text-xl font-sans font-bold">
                            voice
                        </div>
                    </Link>
                </div>            
                <div className="flex justify-between gap-5">
                    <div className="flex flex-col justify-center">
                        <div className="">
                            <SwitchTheme />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="text-center">
                            <div className="mt-[6px]">
                                <Link to="/auth/writeBlog">
                                    <button type="button" className="focus:outline-none text-white 
                                                                     bg-green-700 hover:bg-green-800 
                                                                     focus:ring-4 focus:ring-green-300 
                                                                     font-medium rounded-lg text-sm 
                                                                     px-5 py-2.5 me-2 mb-2 
                                                                     dark:bg-green-600 dark:hover:bg-green-700 
                                                                     dark:focus:ring-green-800">
                                                                        post
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="text-center">
                            <AvatarComponent fontStyle="serif" size={40} color="white" image="" name={userDetails?.name as string} />
                        </div>
                    </div>                    
                    <div className="flex flex-col justify-center">
                        <div className="">
                            <Logout />
                        </div>
                    </div>
                </div>                              
            </div>
        </div>
    )
}