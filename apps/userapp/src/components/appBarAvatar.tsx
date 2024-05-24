import { useSelector } from "react-redux";
import AvatarComponent from "./avatarComponent";
import { setUserDetailsState } from "../globalStates/userDataSlice";

export default function AppBarAvatar(){
    console.log("Inside AppBarAvatar compnent--------------------------------------------------------------");
    const userDetails = useSelector(setUserDetailsState);
    console.log(userDetails);

    function handleAvatarClick(){

    }

    console.log("Inside AppBarAvatar compnent--------------------------------------------------------------");
    return(
        <div>
            <div onClick={handleAvatarClick} className="fixed">
                <AvatarComponent size={40} name={userDetails?.name as string} image=""/>
            </div>
        </div>
    )

}