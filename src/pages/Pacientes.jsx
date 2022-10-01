import Formulario from "../components/Formulario";
import Listado from "../components/Listado";
import { useState } from "react";

const Pacientes = () => {
  const [mostrarForm, setMostrarForm] = useState(false);

  return (
    <>
      <h2 className="text-center font-black text-3xl">Pacientes</h2>
      <div className="mt-10 flex flex-col md:flex-row gap-20">
        <button
          type="button"
          className="block md:hidden bg-indigo-600 text-white font-bold  w-3/4 rounded-lg
          py-2 px-3 mx-auto  uppercase hover:bg-indigo-400 transition-colors cursor-pointer"
          onClick={() => setMostrarForm(!mostrarForm) }
        >
          {`${mostrarForm ?' Ocultar formulario' : 'Mostrar Formulario'}`}
        </button>
        <div
          className={`${mostrarForm ? "block" : "hidden"} md:block md:w-1/2 lg:w-2/5`}
        >
          <Formulario />
        </div>
        <div className="md:w-1/2 lg:w-3/5">
          <Listado />
        </div>
      </div>
    </>
  );
};

export default Pacientes;
