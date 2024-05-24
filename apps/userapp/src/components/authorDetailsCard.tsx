import { UserSignUp } from "@repo/types";

interface AuthorProps extends Partial<UserSignUp> {

}

export default function AuthorDetailsCard({author}: {author: AuthorProps}){

    return(
        <div className="bg-slate-100 text-ellipsis overflow-hidden whitespace-pre w-[20vw] absolute z-[999] h-[40vh] flex flex-col bg-white border-[2px] rounded-md p-5">
            <div className="text-sm relative z-10 ">
                {author.name}
            </div>
            <div className="text-sm relative z-10">
                email: {author.email}
            </div>
        </div>
    )
}