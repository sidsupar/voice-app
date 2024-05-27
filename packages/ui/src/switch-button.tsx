import { Switch } from '@headlessui/react'
import { useEffect, useState } from 'react'

interface SwitchButtonProps{
  onEnableHandler: () => void
  onDisbleHandler: () => void
  initialValue: any
}

export default function SwitchButton({initialValue, onEnableHandler, onDisbleHandler}: SwitchButtonProps) {
    const [enabled, setEnabled] = useState(initialValue);

    useEffect(()=>{
        if(enabled){
            onEnableHandler();
        }else{
            onDisbleHandler();
        }
    },[enabled]);

    return (
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className="bg-gray-600 dark:bg-sky-600 group relative 
                   flex h-7 w-14 cursor-pointer rounded-full 
                   p-1 transition-colors duration-200 
                   ease-in-out focus:outline-none data-[focus]:outline-1 
                   data-[focus]:outline-white"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none inline-block size-5 
                     translate-x-0 rounded-full bg-white ring-0 
                     shadow-lg transition duration-200 ease-in-out 
                     group-data-[checked]:translate-x-7"
        />
    </Switch>
    )
}