import React from 'react';
import { createContext } from 'react';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [DataRegistrer, setDataRegistrer] = React.useState({
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
  });

  return (
    <Context.Provider value={{ DataRegistrer, setDataRegistrer }}>
      {children}
    </Context.Provider>
  );
};
