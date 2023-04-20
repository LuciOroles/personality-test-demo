import React, { createContext, useState, useContext } from "react";
import { useSWRConfig } from 'swr';
import { USERID_KEY } from "./constatnts";

interface Data {
  getValueForKey: (key: string) => any;
  deleteKey: (key: string) => void;
  setCacheKey: (keyValue: string, key?: string) => void;
  responses: Map<number, number>;
  setResponses: React.Dispatch<React.SetStateAction<Map<number, number>>>;
}

const defaultData: Data = {
  getValueForKey: () => {},
  deleteKey: () => {},
  setCacheKey: () => {},
  responses: new Map(),
  setResponses: () => {},
};

export const DataContext = createContext<Data>(defaultData);

export interface IDataProviderProps {
  children: JSX.Element;
}

export const AppContextProvider = ({ children }: IDataProviderProps) => {
  const { cache } = useSWRConfig();
 
  const [responses, setResponses] = useState<Map<number, number>>(new Map());
  

  const value = {
    getValueForKey: (key: string= USERID_KEY) => cache.get(key),
    deleteKey: (key: string) => cache.delete(key),
    setCacheKey: (keyValue: any, key: string= USERID_KEY) => cache.set(key, keyValue),
    responses,
    setResponses,
 
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
