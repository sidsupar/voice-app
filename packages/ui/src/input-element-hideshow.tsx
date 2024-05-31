import { Dispatch, SetStateAction, useState } from "react";

interface InputElementProps {
  state:string
  setState:Dispatch<SetStateAction<string>>
  placeholder:string
  label:string
}

export const InputElementHideShow = ({state, setState, placeholder, label}: InputElementProps) => {

  const [hide, setHide] = useState(true);
  let hiddenPasswordDots = "";
  for(let i=0; i < placeholder.length ?? 0; i++){
    hiddenPasswordDots+="●";
  }
  function handleInput(e:React.SyntheticEvent){
    const tgt = e.target as HTMLInputElement;
    setState(tgt.value);
  }

  return (
    <div className="flex flex-col justify-center w-[90%]">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={label}>
        {label}
      </label>
      <div className="flex justify-between items-center gap-2">
        <input data-cy={"input-"+label} id={label} value={state} onInput={handleInput} 
              placeholder={hide ? hiddenPasswordDots : placeholder}
              type={hide ? "password" : "text"}
              className={`text-center font-italic font-bold 
                        bg-gray-50 border border-gray-300 
                        text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 
                        block w-full p-2.5 dark:bg-gray-700 
                        dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 
                        dark:focus:border-blue-500`}
        />
        <div onClick={ () => setHide(val => !val) } 
             className="col-span-1 cursor-pointer 
                        h-fit w-fit border-[1px] border-gray-300 
                        rounded-lg p-2 focus:ring-blue-500 
                        focus:border-blue-500 dark:border-gray-600 
                        dark:focus:border-blue-500 dark:focus:ring-blue-500">
          <ShowEye hide={hide} />
        </div>
      </div>
    </div>
  );
};

function ShowEye({hide}:{hide:boolean}){

  return(
    <div>
      {hide ? 
        <svg xmlns="http://www.w3.org/2000/svg" 
             viewBox="0 0 16 16" 
             fill="currentColor" 
             className="size-4">
          <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
          <path fillRule="evenodd" 
                d="M1.38 8.28a.87.87 0 0 1 
                   0-.566 7.003 7.003 0 0 
                   1 13.238.006.87.87 0 0 1 0 
                   .566A7.003 7.003 0 0 1 
                   1.379 8.28ZM11 8a3 3 0 1 
                   1-6 0 3 3 0 0 1 6 0Z" 
                clipRule="evenodd" />
          </svg>:
          <svg xmlns="http://www.w3.org/2000/svg" 
               viewBox="0 0 16 16" 
               fill="currentColor" 
               className="size-4">
            <path fillRule="evenodd" 
                  d="M3.28 2.22a.75.75 
                     0 0 0-1.06 1.06l10.5 
                     10.5a.75.75 0 1 0 
                     1.06-1.06l-1.322-1.323a7.012 
                     7.012 0 0 0 2.16-3.11.87.87 
                     0 0 0 0-.567A7.003 7.003 
                     0 0 0 4.82 3.76l-1.54-1.54Zm3.196 
                     3.195 1.135 1.136A1.502 1.502 
                     0 0 1 9.45 8.389l1.136 1.135a3 
                     3 0 0 0-4.109-4.109Z" 
                  clipRule="evenodd" />
            <path d="m7.812 10.994 1.816 
                     1.816A7.003 7.003 0 
                     0 1 1.38 8.28a.87.87 
                     0 0 1 0-.566 6.985 
                     6.985 0 0 1 1.113-2.039l2.513 
                     2.513a3 3 0 0 0 2.806 2.806Z" />
          </svg>
      }
    </div>
  )

}

