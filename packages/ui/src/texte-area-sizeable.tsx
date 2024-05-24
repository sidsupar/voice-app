type TextAreaSizeableProps = {
  width?: string,
  height?: string,
  bgColor?:string,
  padding?:string,
  onInputHandler:(e:React.SyntheticEvent) => void
}

export const TextAreaSizeable = ({padding="5px", bgColor="bg-white" ,onInputHandler, width, height}:TextAreaSizeableProps) => {
  return (
    <div className="">
        <textarea onInput={onInputHandler} style={{
          width,
          height,
          padding,
        }} className={`border-[2px] rounded-md ${bgColor}`} />
    </div>
  );
};
