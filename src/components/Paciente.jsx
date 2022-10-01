import usePaciente from '../hook/usePacientes';

const Paciente = ({ paciente }) => {
  const { email, fecha, nombre, propietario, sintomas, _id } = paciente;
  const formatearFecha = fecha => {
    const nuevaFecha = new Date(fecha);
    return new Intl.DateTimeFormat('ex-MX' , {dataStyle: 'long'}).format(nuevaFecha);
  }

  const {setEdicion , pacienteEdit , eliminarPaciente} = usePaciente();
  return (
    <div className="mx-5 mb-10 bg-gray-100 shadow-md px-5 py-5">
      <p className="mb-2 font-bold uppercase text-indigo-600">
        Nombre:{" "}
        <span className="font-normal normal-case text-black">{nombre}</span>
      </p>
      <p className="mb-2 font-bold uppercase text-indigo-600">
        Propietario:{" "}
        <span className="font-normal normal-case text-black">
          {propietario}
        </span>
      </p>
      <p className="mb-2 font-bold uppercase text-indigo-600">
        Email:{" "}
        <span className="font-normal normal-case text-black">{email}</span>
      </p>
      <p className="mb-2 font-bold uppercase text-indigo-600">
        Fecha:{" "}
        <span className="font-normal normal-case text-black">{formatearFecha(fecha)}</span>
      </p>
      <p className="font-bold uppercase text-indigo-600">
        Sintomas:{" "}
        <span className="font-normal normal-case text-black">{sintomas}</span>
      </p>
      <div className="flex justify-between gap-5">
        <button className="bg-indigo-700 hover:bg-indigo-500 py-2 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer md:w-auto px-10"
        onClick={() => setEdicion(paciente)}>
          Editar
        </button>
        <button className="bg-red-700 hover:bg-red-500 py-2 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer md:w-auto px-10"
        onClick={() => eliminarPaciente(_id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Paciente;
