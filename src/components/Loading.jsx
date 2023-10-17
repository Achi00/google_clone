import React from 'react'
import { FcGoogle } from 'react-icons/fc'

const Loading = () => {
  return (
    <div className='absolute inset-0 w-full h-full flex flex-col gap-4 justify-center items-center'>
        <FcGoogle size={100}/>
        <div className="spinner"></div>
    </div>
  )
}

export default Loading