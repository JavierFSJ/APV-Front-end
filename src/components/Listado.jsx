import usePacientes from '../hook/usePacientes';
import Paciente from './Paciente'

const Listado = () => {
  const {pacientes} = usePacientes()
  
  return (
    <>
      {pacientes.length ? (
        <>
          {pacientes.map( paciente => (
            <Paciente 
              key={paciente._id}
              paciente={paciente}
            />
          ))}
        </>
      ) : (
        <>
          <h2 className='font-black text-3xl text-center'>No hay Pacientes</h2>
          <p className='text-xl mt-5 text-center'>
            Comienza Agregando tus{' '}
            <span className=' text-indigo-600 font-bold'>Pacientes</span>
          </p>
        </>
      )}
    </>
  )
}

export default Listado