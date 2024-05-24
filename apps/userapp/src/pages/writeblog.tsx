import { lazy } from "react";

const WriteComponent = lazy(() => import("../components/writeComponent"));

export default function WriteBlog(){

    return(
        <div className="flex flex-col">
            <div className="">
                <WriteComponent />
            </div>
            <div className="">
                
            </div>  
        </div>
    );
}