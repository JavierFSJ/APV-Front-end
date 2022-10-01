const Alerta = ({ alerta }) => {
  return (
    <div
      className={`${
        alerta.error
          ? "from-red-400 to-red-600"
          : "from-indigo-400 to-indigo-600"
      } bg-gradient-to-r py-2 w-full px-3 text-center rounded-lg text-white uppercase font-bold my-5`}
    >
      {alerta.msg}
    </div>
  );
};

export default Alerta;
