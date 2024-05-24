

export default function ShortBlogData({heading, desc}:{heading:string, desc:string}){

    return(
        <>
            <div className="cursor-pointer font-bold relative font-sans text-sm md:text-xl lg:text-2xl ">
                <div className="">
                    {heading}
                </div>
                <div className="font-bold relative font-sans text-xs md:text-l lg:text-xl">
                    {desc?.substring(0, 40)+"..."}
                </div>
            </div>
        </>
    )
}