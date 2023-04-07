import React from 'react'
import { BiSearchAlt } from "react-icons/bi"

export default function Search() {
    return (
        <div className='group'>
            <div className='flex group-focus-within:bg-white h-12 mx-auto my-0 w-80 items-center rounded-full group-focus-within:border group-focus-within:shadow border-0 border-sky-400 bg-gray-200 '>
                <BiSearchAlt className='h-5 w-5 group-focus-within:text-sky-500 text-gray-400 ml-4 mr-3' />
                <input className='bg-transparent group-focus-within:bg-white outline-none w-64' type="text" name="" id="" placeholder='Search Twitter' />
            </div>
        </div>
    )
}
