import React from 'react'
import { IoMdSettings } from 'react-icons/io'
import { BiMessageDetail } from 'react-icons/bi'

const Footer = () => {
  return (
    <div className='relative bottom-0 left-0 w-full flex lg:flex-row md:flex-row sm:flex-col xs:flex-col justify-between items-center p-6'>
        <div className="flex gap-3">
            <h3>Advertising</h3>
            <h3>Business</h3>
            <h3>About</h3>
        </div>
        <div className="flex gap-3 items-center text-lg">
            <h3>Privacy</h3>
            <h3>Terms</h3>
            <IoMdSettings />
            <BiMessageDetail />
        </div>
    </div>
  )
}

export default Footer