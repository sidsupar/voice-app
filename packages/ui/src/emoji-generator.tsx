import React from "react";

export const EmojiGenerator = React.memo(({ className, label, symbol }:{className?:string, label?:string, symbol:string}) =>
  <span className={className} role="img" aria-label={label}>
    
      {
        //@ts-ignore
        String.fromCodePoint(symbol)
      }
  </span>)
