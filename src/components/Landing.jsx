import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useLocation } from 'react-router-dom'

const Landing = ({setSearchClicked, setQuery}) => {
  const location = useLocation();
  if(location.pathname === '/images') {}

  return (
    <div className='absolute pb-16 inset-0 w-full h-full flex flex-col gap-10 justify-center items-center select-none'>
       <div className="flex items-end">
          <FcGoogle size={145}/>
          {location.pathname === '/images' && (
            <h3 className='font-bold text-sm'>Images</h3>
          )}
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            const inputValue = e.target.elements.query.value;
            if (inputValue !== '') {
              setSearchClicked(true);
              setQuery(inputValue);
            }
          }}
        >
          <div className="relative">
            <input 
              className='border-gray-300 outline-none lg:w-[450px] md:w-[350px] sm:w-[300px] xs:w-[250px] border p-1 drop-shadow-xl transition-all hover:drop-shadow-2xl rounded-xl pl-7 pr-[6rem]'   type="text" 
              name="query" 
              autoComplete="off"
            />
            <AiOutlineSearch 
              className="absolute top-1/2 left-2 transform -translate-y-1/2"
            />
            <button 
            className="absolute top-1/2 right-2 transform -translate-y-1/2 flex items-center gap-2 px-1 text-md" 
            type="submit">
                Search <FcGoogle />
            </button>
          </div>
        </form>
    </div>
  )
}

export default Landing