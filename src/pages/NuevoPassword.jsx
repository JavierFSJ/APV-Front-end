import { useState } from "react";
import cliente from "../config/axios";
import Alerta from "../components/Alerta";
import { useParams, Link } from "react-router-dom";

const NuevoPassword = () => {
  const [password , setPassword] = useState('');
  const [retype, setRetype] = useState('');
  const [alerta , setAlerta] = useState('');
  const [ready , setReady] = useState(false);
  const { token } = useParams();


  const handleSubmit = async e => {
    e.preventDefault();

    /* Verificando campos vacios */    
    if ([password, retype].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }

    if( password !== retype) {
      setAlerta({ msg: "Las contraseñas no coinciden", error: true });
      return;
    }

    if( password.length < 6) {
      setAlerta({ msg: "La contraseña debe ser mayor a 6 caracteres", error: true });
      return;
    }

    try {
      const { data } = await cliente.post(`/veterinarios/change-password/${token}` , {password});
      setAlerta({
        msg: data.msg,
        error: false,
      })
      setReady(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      })
    }
  }

  const { msg } = alerta;
  return (
    <>
      <div>
        <h1 className="text-indigo-600 text-6xl font-black">
          Restablece tu cuenta y administra tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div> 
        <div className="p-5 lg:w-3/4 mx-auto mt-10 bg-gray-50 rounded-xl shadow-lg">
          <h3 className="font-bold text-3xl text-center">Cambiar password</h3>
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Password
              </label>
              <input
                type="password"
                className="border w-full p-3 mt-3 rounded-xl"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Repite tu Password
              </label>
              <input
                type="password"
                className="border w-full p-3 mt-3 rounded-xl"
                placeholder="Password"
                value={retype}
                onChange={(e) => setRetype(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Restablecer Password"
              className="bg-indigo-700 hover:bg-indigo-500 min-w-full py-2 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer md:w-auto px-10"
            />
          </form>
          <nav className="mt-10 lg:flex lg:justify-between">
            {ready && <Link to="/" className="block text-center text-gray-500">
              Iniciar Session
            </Link> }
          </nav>
        </div>
      </div>
    </>
  );
};

export default NuevoPassword;
