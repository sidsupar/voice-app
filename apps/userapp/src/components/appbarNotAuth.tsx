import { Link } from "react-router-dom";
import SwitchTheme from "./switchThemeMode";

export default function AppbarNotAuth(){

    return(
        <div className=" max-h-fit min-h-[15vh] border-b pt-2 pb-2 pl-1 pr-1 grid grid-cols-12">
            <div className="col-span-1">

            </div>
            <div className="col-span-2 flex flex-col justify-center">
                <Link to="/home">                
                    <div className="flex flex-col justify-center font-italic font-extrabold">
                        voice
                    </div>
                </Link>
            </div>   
            <div className="col-span-8">

            </div>
            <div className="flex flex-col justify-center">
                <div className="flex flex-col justify-center">
                    <SwitchTheme />
                </div>
            </div>                    
        </div>
    )
}