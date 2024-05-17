import { Dispatch, SetStateAction } from "react";

interface InputElementProps {
  state:string
  setState:Dispatch<SetStateAction<string>>
  placeholder:string
  label:string
}

export const InputElement = ({state, setState, placeholder, label}: InputElementProps) => {

  function handleInput(e:React.SyntheticEvent){
    const tgt = e.target as HTMLInputElement;
    setState(tgt.value);
  }

  return (
    <div className="flex flex-col justify-center">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={label}>{label}</label>
      <input data-cy={"input-"+label} id={label} value={state} onInput={handleInput} 
            placeholder={placeholder}
            className="text-center font-italic font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm
                      rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"      
      />
    </div>
  );
};
