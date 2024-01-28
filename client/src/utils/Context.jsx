import React, { useState } from 'react';
import { createContext } from 'react';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const initialState = {
    name: '',
    lastname: '',
    email: '',
    age: '',
    gender: '',
    nationality: '',
    country: '',
    city: '',
    address: '',
    phone: '',
    civil_status: '',
    sons: '',
    sons_number: '',
  };

  const [DataRegistrer, setDataRegistrer] = useState(initialState);

  const resetDataRegistrer = () => {
    setDataRegistrer(initialState);
  };

  return (
    <Context.Provider value={{ DataRegistrer, setDataRegistrer, resetDataRegistrer }}>
      {children}
    </Context.Provider>
  );
};
