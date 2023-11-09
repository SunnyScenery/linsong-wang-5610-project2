import { createContext, useEffect, useState } from "react";

export const RecordContext = createContext();

export default function RecordContextProvider(props) {
  // const [records, setRecords] = useState([]);
  const [records, setRecords] = useState(() => {
    const savedRecords = localStorage.getItem("records");
    console.log(localStorage);
    console.log("saved records", savedRecords);
    return savedRecords ? JSON.parse(savedRecords) : [];
  });
  console.log("in provider", records);

  useEffect(() => {
    localStorage.setItem("records", JSON.stringify(records));
  }, [records]);

  // localStorage.setItem("records", JSON.stringify(records));
  // useEffect(() => {
  //     localStorage.setItem("records", JSON.stringify(records));
  // });

  return (
    <RecordContext.Provider value={[records, setRecords]}>
      {props.children}
    </RecordContext.Provider>
  );
}
