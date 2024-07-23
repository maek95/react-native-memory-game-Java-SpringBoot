import  { createContext, useState } from "react";

export const Context = createContext(); // global "prop"(?)... kan t.ex. göra det vi gör i return statement nedanför direkt i app.js (behöver alltså inte CounterProvider funktionen här om vi inte vill!)

export function ContextProvider({children}) {
  const [count, setCount] = useState(10);

  return ( 
    <Context.Provider value={{count, setCount}}>
      {children}
    </Context.Provider>
  )
}