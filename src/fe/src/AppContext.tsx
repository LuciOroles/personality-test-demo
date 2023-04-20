import React, { createContext, useState, useContext } from "react";
import { useSWRConfig } from 'swr';
import { USERID_KEY } from "./constatnts";

interface Data {
  getUserKey: () => any;
  setUserKey: (keyValue: string) => void;
  responses: Map<number, number>;
  setResponses: React.Dispatch<React.SetStateAction<Map<number, number>>>;
}

const defaultData: Data = {
  getUserKey: () => {},
  setUserKey: () => {},
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
    getUserKey: () => cache.get(USERID_KEY),
    setUserKey: (keyValue: string) => cache.set(USERID_KEY, keyValue),
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
