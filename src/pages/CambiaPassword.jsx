import NavPerfil from "../components/NavPerfil";
import { useState, useEffect } from "react";
import Alerta from "../components/Alerta";
import useAuth from "../hook/useAuth";

const CambiaPassword = () => {
  const { resetPassword } = useAuth();
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    pwd_actual: "",
    pwd_nuevo: "",
    pwd_confirm: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(password).some((campo) => campo === "")) {
      setAlerta({
        msg: "Campos obligatorios",
        error: true,
      });
      return;
    }

    if (password.pwd_nuevo.length < 6) {
      setAlerta({
        msg: "El password debe ser mayor a 6 caracteres",
        error: true,
      });
      return;
    }

    if (password.pwd_nuevo !== password.pwd_confirm) {
      setAlerta({
        msg: "El password no coincide",
        error: true,
      });
      return;
    }

    const res = await resetPassword(password);
    setAlerta(res);
    setPassword({ pwd_actual: "", pwd_nuevo: "", pwd_confirm: "" });
  };

  const { msg } = alerta;
  return (
    <>
      <NavPerfil></NavPerfil>
      <h2 className="text-center font-black text-3xl">
        Cambiar <span className="text-indigo-600">Password</span>
      </h2>
      <div className="p-5 w-4/5 lg:w-3/5  mx-auto mt-10 bg-gray-50 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit} className="mx-auto" action="">
          {msg && <Alerta alerta={alerta} />}
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Password Actual
            </label>
            <input
              type="password"
              name="pwd_actual"
              className="border w-full p-3 mt-3 rounded-xl"
              placeholder="Password Actual"
              onChange={(e) =>
                setPassword({
                  ...password,
                  [e.target.name]: e.target.value,
                })
              }
              value={password.pwd_actual || ''}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Nueva Password
            </label>
            <input
              type="password"
              name="pwd_nuevo"
              className="border w-full p-3 mt-3 rounded-xl"
              placeholder="Nueva password"
              onChange={(e) =>
                setPassword({
                  ...password,
                  [e.target.name]: e.target.value,
                })
              }
              value={password.pwd_nuevo || ''}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Confirma Tu password
            </label>
            <input
              type="password"
              name="pwd_confirm"
              className="border w-full p-3 mt-3 rounded-xl"
              placeholder="Confirma tu password"
              onChange={(e) =>
                setPassword({
                  ...password,
                  [e.target.name]: e.target.value,
                })
              }
              value={password.pwd_confirm || ''}
            />
          </div>
          <input
            type="submit"
            value="Actualizar password"
            className="bg-indigo-700 hover:bg-indigo-500 min-w-full md:w-1/2 py-2 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer  px-10"
          />
        </form>
      </div>
    </>
  );
};

export default CambiaPassword;
