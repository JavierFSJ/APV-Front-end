import { Link } from "react-router-dom";
import useAuth from "../hook/useAuth";

const Header = () => {
  const { cerrarSesion } = useAuth();
  return (
    <header className="py-10 bg-indigo-600">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <h1 className="text-indigo-200 font-bold text-2xl">
          Administrador de pacientes{" "}
          <span className="text-white font-black">Veterinaria</span>
        </h1>

        <nav className="mt-5 flex flex-col lg:flex-row gap-1 lg:gap-5 items-center">
          <Link
            to="/admin"
            className="uppercase text-white  hover:text-gray-300 font-bold text-base"
          >
            Pacientes
          </Link>
          <Link
            to="perfil"
            className="uppercase text-white hover:text-gray-300 font-bold text-base"
          >
            Perfil
          </Link>

          <button
            className="uppercase text-white hover:text-gray-300 font-bold text-base"
            type="button"
            onClick={cerrarSesion}
          >
            Cerrar Sesion
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
