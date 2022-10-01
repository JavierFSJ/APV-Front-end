import { createContext, useState, useEffect } from "react";
import cliente from "../config/axios";

const PacientesContext = createContext();

export const PacientesProvider = ({ children }) => {
  const [pacienteEdit , setPaciente] = useState({});
  const [pacientes , setPacientes] = useState({});
  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const token = localStorage.getItem("token");
        if(!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await cliente('/pacientes' , config);
        setPacientes(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPacientes();
  }, []);

  const guardarPaciente = async (paciente) => {
    const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
    if(paciente.id){
      let _id = paciente.id;
      try {
        const {data} = await cliente.put(`/pacientes/${_id}` , paciente , config)
        const pacientesActualizados = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState);
        setPacientes(pacientesActualizados);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
    else{
      try {
        const { data } = await cliente.post("/pacientes", paciente, config);
        const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
        setPacientes([pacienteAlmacenado, ...pacientes]);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  };

  const setEdicion = paciente => {
    setPaciente(paciente);
  }

  const eliminarPaciente = async id => {
    const confirmar = confirm('Se eliminara el registro de manera permanente');
    if(confirmar){
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const {data} = await cliente.delete(`/pacientes/${id}` , config)
        const actulizados = pacientes.filter(pacienteState => pacienteState._id !== data._id);
        setPacientes(actulizados);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  }


  return (
    <PacientesContext.Provider
      value={{
        pacientes,
        guardarPaciente,
        setEdicion,
        setPaciente,
        pacienteEdit,
        eliminarPaciente,
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export default PacientesContext;
