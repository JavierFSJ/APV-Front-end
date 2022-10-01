import NavPerfil from "../components/NavPerfil";
import { useState , useEffect } from "react";
import Alerta from "../components/Alerta";
import useAuth from "../hook/useAuth";

const Perfil = () => {
  const {auth , actualizarPerfil} = useAuth();
  const [perfil , setPerfil] = useState({});
  const [alerta, setAlerta] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {nombre , email} = perfil;
    if ([nombre, email ].includes("")) {
      setAlerta({ msg: "Nombre y email son obligatorios", error: true });
      return;
    }
    const res = await actualizarPerfil(perfil);
    setAlerta(res);
  };
  
  useEffect( ( ) => {
    setPerfil(auth);
  } , [auth])

  const {msg} = alerta;
  return (
    <>
      <NavPerfil></NavPerfil>
      <h2 className="text-center font-black text-3xl">
        Editar <span className="text-indigo-600">Perfil</span>
      </h2>
      <div className="p-5 w-4/5 lg:w-3/5  mx-auto mt-10 bg-gray-50 rounded-xl shadow-lg">
        {msg && <Alerta alerta={alerta} />}
        <form className="mx-auto" onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              className="border w-full p-3 mt-3 rounded-xl"
              placeholder="Tu nombre"
              value={perfil.nombre || ''}
              onChange={(e) => setPerfil({
                ...perfil,
                [e.target.name]: e.target.value
              })}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="border w-full p-3 mt-3 rounded-xl"
              placeholder="Email de registro"
              value={perfil.email || ''}
              onChange={(e) => setPerfil({
                ...perfil,
                [e.target.name]: e.target.value
              })}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Telefono
            </label>
            <input
              type="tel"
              className="border w-full p-3 mt-3 rounded-xl"
              placeholder="Telefono"
              name="telefono"
              value={perfil.telefono || ''}
              onChange={(e) => setPerfil({
                ...perfil,
                [e.target.name]: e.target.value
              })}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Web
            </label>
            <input
              type="text"
              className="border w-full p-3 mt-3 rounded-xl"
              placeholder="Web"
              name="web"
              value={perfil.web || ''}
              onChange={(e) => setPerfil({
                ...perfil,
                [e.target.name]: e.target.value
              })}
            />
          </div>
          <input
            type="submit"
            value="Actualizar Datos"
            className="bg-indigo-700 hover:bg-indigo-500 min-w-full md:w-1/2 py-2 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer  px-10"
          />
        </form>
      </div>
    </>
  );
};

export default Perfil;
