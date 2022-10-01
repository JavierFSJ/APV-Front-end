import { Link, useNavigate, Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import { useState } from "react";
import Alerta from "../components/Alerta";
import cliente from "../config/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState("");
  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setAlerta({
        msg: "Los campos son obligatorios",
        error: true,
      });
      return;
    }

    try {
      const { data } = await cliente.post("/veterinarios/autenticar", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      navigate("/admin");
      setAuth(data);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
 
  const { msg } = alerta;
  return (
    <>
      {auth._id ? (
        <Navigate Navigate to='/admin'></Navigate>
      ) : (
        <>
          <div>
            <h1 className="text-indigo-600 text-6xl font-black">
              Inicia Sesión y administra tus{" "}
              <span className="text-black">Pacientes</span>
            </h1>
          </div>
          <div>
            <div className="p-5 lg:w-3/4 mx-auto mt-10 bg-gray-50 rounded-xl shadow-lg">
              <h3 className="font-bold text-3xl text-center">Iniciar Sesion</h3>
              {msg && <Alerta alerta={alerta} />}
              <form onSubmit={handleSubmit}>
                <div className="my-5">
                  <label className="uppercase text-gray-600 block text-xl font-bold">
                    Email
                  </label>
                  <input
                    type="email"
                    className="border w-full p-3 mt-3 rounded-xl"
                    placeholder="Email de registro"
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
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Inciar sesión"
                  className="bg-indigo-700 hover:bg-indigo-500 min-w-full py-2 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer md:w-auto px-10"
                />
              </form>
              <nav className="mt-10 lg:flex lg:justify-between">
                <Link
                  to="/registrar"
                  className="block text-center text-gray-500"
                >
                  ¿No tienes una cuenta? Registrate
                </Link>
                <Link
                  to="/olvide-password"
                  className="block text-center text-gray-500"
                >
                  Olvide mi password
                </Link>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
