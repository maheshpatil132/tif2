import React, { createContext, useContext, useState } from "react";
import { number } from "yup";

const initialValues = {
  requisitionDetails: {
    gender: "",
    noOfOpenings: 0,
    requisitionTitle: "",
    urgency: "",
  },
  jobDetails: {
    jobDetails: "",
    jobLocation: "",
    jobTitle: "",
  },
  interviewSettings: {
    interviewDuration: "",
    interviewLanguage: "",
    interviewMode: "",
  },
};

const DataContext = createContext<{
  state: typeof initialValues;
  setState: React.Dispatch<React.SetStateAction<typeof initialValues>>;
  ind : number,
  setInd : React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState(initialValues);
  const [ind , setInd] = useState(0);
  return (
    <DataContext.Provider value={{ state, setState , ind , setInd }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export default DataProvider;
