import { useContext } from "react";
import { createContext } from "react";

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }
  return context;
};
// This is substituted buy Zustand
