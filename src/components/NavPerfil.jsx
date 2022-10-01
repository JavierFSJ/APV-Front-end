import { Link } from "react-router-dom";
const NavPerfil = () => {
  return (
    <nav className="flex flex-col md:flex-row gap-3 mx-auto text-left my-5 items-center mb-10">
        <Link to='/admin/perfil' className="w-1/2 md:w-auto cursor-pointer font-semibold  text-center text-base bg-indigo-600 rounded-lg px-3 py-2 text-white hover:bg-indigo-400 transition-colors uppercase">
          Editar perfil
        </Link>
        <Link to='/admin/cambiar-password' className="w-1/2 md:w-auto cursor-pointer text-center font-semibold text-base bg-indigo-600 rounded-lg px-3 py-2 text-white hover:bg-indigo-400 transition-colors uppercase">
          Cambiar password
        </Link>
      </nav>
  )
}

export default NavPerfil