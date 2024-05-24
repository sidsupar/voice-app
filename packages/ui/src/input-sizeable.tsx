type TextAreaSizeableProps = {
  width?: string,
  height?: string,
  padding?:string,
  type?:string,
  bgColor?:string
  onInputHandler:(e:React.SyntheticEvent) => void
}

export const InputSizeable = ({padding="5", bgColor,onInputHandler, width="20vw", height="5vh", type="text"}:TextAreaSizeableProps) => {
  return (
    <div className="">
        <input style={{
          width,
          height,
          padding
        }} type={type} onInput={onInputHandler} className={`border-[2px] ${bgColor} rounded-md`} />
    </div>
  );
};
