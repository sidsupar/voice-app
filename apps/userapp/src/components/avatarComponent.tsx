import Avatar from "@repo/ui/avatar";

type AvatarProps = {
    name:string, 
    image:string,
    backgroundColor?:string,
    color?:string,
    size?:number,
    fontStyle?:string
}

export default function AvatarComponent({fontStyle, size, name, image, backgroundColor, color} : AvatarProps){

    return(
        <div>
            <Avatar fontStyle={fontStyle} color={color} backgroundColor={backgroundColor} image={image} name={name} size={size}/>
        </div>
    )

}