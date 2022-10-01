import { useContext } from "react";
import PacientesContext from "../context/PacientesProvider";

const useAuth  = ( ) => {
  return useContext(PacientesContext);
}

export default useAuth;