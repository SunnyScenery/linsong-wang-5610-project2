import { createContext, useState } from "react";

export const RecordContext = createContext();

export default function RecordContextProvider(props) {
    const [records, setRecords] = useState([]);

  return (
    <RecordContext.Provider value={[records, setRecords]}>
      {props.children}
    </RecordContext.Provider>
  );
}
