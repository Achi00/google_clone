import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { SiGmail, SiGoogleanalytics } from 'react-icons/si'
import { FaGoogleDrive, FaGooglePlay, FaBell } from 'react-icons/fa'

const Navbar = () => {
  return (
    <>
    
    <div className='absolute top-0 right-0 justify-end w-[60%] flex flex-wrap gap-7 text-3xl p-7'>
      <FcGoogle size={20}/>
      <FaGoogleDrive size={20}/>
      <FaGooglePlay size={20}/>
      <SiGmail size={20}/>
      <SiGoogleanalytics size={20}/>
      <FaBell size={20}/>
    </div>
    </>
  )
}

export default Navbar