import { Link } from "react-router-dom";
import { useState } from "react";
import cliente from "../config/axios";
import Alerta from "../components/Alerta";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [alerta, setAlerta] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, repeatPassword].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }

    if (password !== repeatPassword) {
      setAlerta({ msg: "Los passwords no coinciden", error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "El password debe ser mayor a seis caracteres",
        error: true,
      });
      return;
    }

    try {
      await cliente.post('/veterinarios', {nombre , email , password})
      setAlerta({
        msg: "Cuenta creada, Revisa tu email",
        error: false,
      })
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
          Crea tu Cuenta y Administra tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div>
        
        <div className="p-5 lg:w-3/4 mx-auto mt-10 bg-gray-50 rounded-xl shadow-lg">
          <h3 className="font-bold text-3xl text-center">Registrate</h3>
          { msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Nombre
              </label>
              <input
                type="text"
                className="border w-full p-3 mt-3 rounded-xl"
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Email
              </label>
              <input
                type="email"
                className="border w-full p-3 mt-3 rounded-xl"
                placeholder="Email de registro"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
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
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Crear cuenta"
              className="bg-indigo-700 hover:bg-indigo-500 min-w-full py-2 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer md:w-auto px-10"
            />
          </form>
          <nav className="mt-10 lg:flex lg:justify-between">
            <Link to="/" className="block text-center text-gray-500">
              ¿Ya tienes una cuenta? Inicia Sesion
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Register;
