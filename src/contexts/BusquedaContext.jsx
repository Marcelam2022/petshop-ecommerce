import { createContext, useContext, useState } from "react";

const BusquedaContext = createContext();

export const BusquedaProvider = ({ children }) => {
  const [termino, setTermino] = useState("");

  return (
    <BusquedaContext.Provider value={{ termino, setTermino }}>
      {children}
    </BusquedaContext.Provider>
  );
};

export const useBusquedaContext = () => useContext(BusquedaContext);
