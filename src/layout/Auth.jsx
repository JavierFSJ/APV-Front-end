import {Outlet} from 'react-router-dom'

const auth = () => {
  return (
    <>
      <main className='container mx-auto md:grid md:grid-cols-2 mt-32 p-5 gap-16 items-center'>
        <Outlet />
      </main>
    </>
  )
}

export default auth