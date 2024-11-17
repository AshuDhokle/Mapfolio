import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='p-2 flex flex-row items-center justify-between'>
      <Link to={'/'} className="m-2 font-bold text-3xl"> Mapfolio </Link>
      <div className='flex items-center'>
      <Link to={'/Admin'} className='m-1'>Admin</Link>
      <Link to={'/'} className='m-1'>Home</Link>
      </div>
    </div>
  )
}

export default Navbar