import { createContext, useState } from "react";

export const InputContext = createContext();

export default function InputContextProvider(props) {
  const [inputValue, setInputValue] = useState("");

  return (
    <InputContext.Provider value={[inputValue, setInputValue]}>
      {props.children}
    </InputContext.Provider>
  );
}
