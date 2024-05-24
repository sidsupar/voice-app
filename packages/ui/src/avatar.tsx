import { useMemo } from "react";

type AvatarProps = {
  name:string, 
  image:string,
  backgroundColor?:string,
  color?:string,
  size?:number,
  fontStyle?:string
}

export default function Avatar({fontStyle="italic", size=32, name="img", image, backgroundColor="gray", color="white"} : AvatarProps){

  const fontSize=`${Math.floor(size/2)}px`;
  const padding=`${Math.floor(size/12)}px`; 
  const width=`${Math.floor(size)}px`;
  const height=`${Math.floor(size)}px`

  const nameInitials = useMemo(() => {
    const nameArray = name?.split(" ");
    return nameArray?.map((init) => init[0]).join("");
  },[name])

  return(
      <div className="shadow border-[2px] rounded-full">
          <div style={{
            fontSize,
          }} className="rounded-full">
            {image ? <img className="border-[2px]" src={image} alt={name} width={width} height={height} /> : 
            <div style={{
              backgroundColor,
              width,
              height,
              color,
              padding,
              textOverflow:"hidden",
              fontStyle
            }} className="border-[1px] rounded-full">
              {nameInitials}
            </div>}
              
          </div>                
      </div>
  )

}