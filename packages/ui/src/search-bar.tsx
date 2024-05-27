import { BlogType } from "@repo/types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface SearchBarProps {
  onInputHandler: (input: string, skip:number, take:number) => Promise<Array<BlogType>>,
  onClickHandler?: any,
  skip?:number,
  take?:number
}

function useDebouncedInput(input:string, setInput:React.Dispatch<React.SetStateAction<string>>){
  
  useEffect(()=>{
    const timeOut = setTimeout(()=>{
      setInput(input)
    },500)

    return(()=>{
      clearTimeout(timeOut);
    })
  },[input])

}

export const SearchBar = ({onInputHandler, skip=0, take=5,onClickHandler}: SearchBarProps) => {
  
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [result, setResult] = useState<Array<BlogType>>();
  useDebouncedInput(input, setDebouncedInput);
  console.log(`input = ${input} and debouncedInput=${debouncedInput}`);

  useEffect(() =>{
      const handle = async () => {
                      if(debouncedInput.length > 0){
                        const results = await onInputHandler(input, skip, take);
                        console.log("Inside searchbar");
                        console.log(results)
                        if("status" in results && "data" in results && results.status ){
                          console.log("Setting result");
                          setResult(results.data.posts as Array<BlogType>)
                       }
                      }                       
                    }
      handle();                    
  }, [debouncedInput]);

  function clickHandler(){
    if(debouncedInput.length > 0){
      console.log("searching for "+debouncedInput);
      onClickHandler(debouncedInput);
      setDebouncedInput("");
      setInput("");
    }
  }

  return (
    <div className="relative">      
      <div className="flex flex-col items-center xs:flex-row max-w-lg mx-auto">   
          <label htmlFor="voice-search" className="sr-only">Search</label>
          <div className="relative w-full">
              <input onInput={(e) => {
                                const tgt=e.target as HTMLInputElement 
                                setInput(tgt.value);
                              }
                            }    
                     type="text" id="voice-search"
                     value={input} 
                     className="bg-gray-50 border 
                                border-gray-300 text-gray-900
                                text-sm rounded-lg focus:ring-blue-500
                                focus:border-blue-500 block w-full 
                                p-2.5  dark:bg-gray-700 
                                dark:border-gray-600 dark:placeholder-gray-400 
                                dark:text-white dark:focus:ring-blue-500 
                                dark:focus:border-blue-500" 
                      placeholder="Search Mockups, Logos, Design Templates..." 
                      required 
              />
              <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"/>
                  </svg>
              </button>
          </div>
          <button onClick={clickHandler} type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>Search
          </button>
      </div>
      <div>
        {
          debouncedInput.length > 0 && <ShowResultsTab setInput={setInput} setDebouncedInput={setDebouncedInput} result={result as Array<BlogType>} />
        }
      </div>                            
    </div>
  );
};

function ShowResultsTab({result, setInput, setDebouncedInput}:{result:Array<BlogType>, setInput:React.Dispatch<React.SetStateAction<string>>, setDebouncedInput:React.Dispatch<React.SetStateAction<string>>}){
  console.log("ShowResultsTab");
  console.log(result);
  return(
    <div className="shadow w-full rounded-b-md p-2 absolute z-[9999] bg-white border-[2px]
                    dark:bg-gray-600 dark:text-slate-300"
    >
      {result?.map((blog, index) => {
        return(
          <div onClick={()=>{
                          setDebouncedInput("");
                          setInput("");
                        }
                      } 
                      key={"searchresult-"+index} 
                      className="flex justify-betwwen gap-2 border-b-[2px]"
          >
              <Link to="/auth/blog" state={{
                                              blogId: blog.id
                                    }}>
                <div className="font-sans text-sm">
                  {blog.heading}
                </div>
                <div className="font-sans text-sm">
                  {blog.publishDate}
                </div>
              </Link>
          </div>  
        )
      })}
    </div>
  )
}