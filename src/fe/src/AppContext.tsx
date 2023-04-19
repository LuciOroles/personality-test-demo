import React, { createContext, useState,  useContext, useEffect } from "react";

interface Data {
  ss: string,
   setSs:  React.Dispatch<React.SetStateAction< string >>,
  responses: Map<number,number>,
  setResponses: React.Dispatch<React.SetStateAction<Map<number,number>>>;
}

const defaultData: Data = {
  ss: '',
  setSs:  () => {},
  responses: new Map(),
  setResponses: () => {}
};

export const DataContext = createContext<Data>(defaultData);

export interface IDataProviderProps {
    children: JSX.Element;
  }
  
export const AppContextProvider  = ({ children }: IDataProviderProps) => {
  const [ss, setSs] = useState<string>('');
  const [responses, setResponses] = useState<Map<number, number>>(new Map());
  useEffect(() => {
    console.log(responses);
  }, [responses]);

  const value = {
    ss,
    setSs,
    responses,
    setResponses,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
