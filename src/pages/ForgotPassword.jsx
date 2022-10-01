import {useState} from 'react';
import {Link} from "react-router-dom";
import Alerta from '../components/Alerta';
import cliente from '../config/axios';


const ForgotPassword = () => {
  const [email , setEmail] = useState('');
  const [alerta , setAlerta] = useState('');
  

  const handleSubmit = async function (e) {
    e.preventDefault();
    if(email === ''){
      setAlerta({
        msg: 'El email es requerido',
        error: true,
      })
      return;
    }

    try {
      const { data } = await cliente.post('/veterinarios/cambio-password' , {email});
      setAlerta({
        msg: data.msg,
      });
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
          Recupera tu Acceso y no Pierdas{" "}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>
      <div>
        <div className="p-5 lg:w-3/4 mx-auto mt-10 bg-gray-50 rounded-xl shadow-lg">
          <h3 className="font-bold text-3xl text-center">Introduce tu Email</h3>
          { msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label
                className="uppercase text-gray-600 block text-xl font-bold"
              >
                Email
              </label>
              <input
                type="email"
                className="border w-full p-3 mt-3 rounded-xl"
                placeholder="Email de registro"
                onChange={ e => setEmail(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Enviar Código"
              className="bg-indigo-700 hover:bg-indigo-500 min-w-full py-2 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer md:w-auto px-10"
            />
          </form>
          <nav className="mt-10 lg:flex lg:justify-between">
             <Link
                to="/registrar"
                className="block text-center text-gray-500">
                ¿No tienes una cuenta? Registrate
              </Link>
          </nav>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword