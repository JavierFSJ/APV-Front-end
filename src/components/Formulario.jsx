import Alerta from "./Alerta";
import { useState , useEffect } from "react";
import cliente from '../config/axios';
import usePacientes from '../hook/usePacientes';

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [alerta , setAlerta] = useState('');
  const {guardarPaciente , pacienteEdit} = usePacientes();
  const [id , setId] = useState(null);

  useEffect(() => {
    if(pacienteEdit?.nombre) {
      setNombre(pacienteEdit.nombre);
      setPropietario(pacienteEdit.propietario);
      setEmail(pacienteEdit.email);
      setSintomas(pacienteEdit.sintomas);
      setId(pacienteEdit._id);
    }
  }, [pacienteEdit])


  const handleSubmit = (e) => {
    e.preventDefault();
    if([nombre, email, sintomas, propietario].includes("")){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
      return
    }
    
    
    guardarPaciente({nombre , email , propietario , sintomas , id});
    setAlerta({
      msg: 'Guardado Correctamente',
      error: false,
    })

    setNombre('');
    setPropietario('');
    setEmail('');
    setSintomas('');
    setId('');
  }

  const {msg} = alerta;
  return (
    <div className="px-3">
      <form onSubmit={handleSubmit} className="bg-gray-100 p-5 border rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-center my-2  mb-5">
          Añade tus pacientes
        </h3>
        {msg && <Alerta alerta={alerta} />}
        <div className="my-3">
          <label htmlFor="mascota" className="font-bold">
            Nombre mascota
          </label>
          <input
            type="text"
            id="mascota"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 rounded-lg"
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
          />
        </div>
        <div className="my-3">
          <label htmlFor="propietario" className="font-bold">
            Propietario
          </label>
          <input
            type="text"
            id="propietario"
            placeholder="Propietario"
            className="border-2 w-full p-2 mt-2 rounded-lg"
            onChange={(e) => setPropietario(e.target.value)}
            value={propietario}
          />
        </div>
        <div className="my-3">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email Propietario"
            className="border-2 w-full p-2 mt-2 rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="my-3">
          <label htmlFor="sintomas" className="font-bold">
            Sintomas
          </label>
          <textarea
            id="sintomas"
            placeholder="Sintomas"
            className="border-2 w-full p-2 mt-2 rounded-lg"
            onChange={(e) => setSintomas(e.target.value)}
            value={sintomas}
          />
        </div>
        <input
          type="submit"
          value={id ? 'Guardar Cambios' : 'Agregar Paciente'}
          className="bg-indigo-700 hover:bg-indigo-500 min-w-full py-2 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer md:w-auto px-10"
        />
      </form>
    </div>
  );
};

export default Formulario;
