import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import cliente from "../config/axios";
import Alerta from "../components/Alerta";

const Confirm = () => {
  const { token } = useParams();
  const [cuentaConfirmada, setConfirm] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState("");

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${token}`;
        const { data } = await cliente(url);
        setAlerta({
          msg: data.msg,
        });
        setConfirm(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
      setCargando(false);
    };
    confirmarCuenta();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 text-6xl font-black">
          Confirma tu cuenta y administra tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div>
        {!cargando && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link to="/" className="block text-center text-gray-500">
            Iniciar Sesion
          </Link>
        )}
      </div>
    </>
  );
};

export default Confirm;
