import React from 'react'

export default function Follow({ name, login, img }) {
    return (
        <div className='flex flex-row p-2 hover:bg-slate-300 justify-between items-center cursor-pointer'>
            <div className='flex flex-row max-w-fit'>
                <img className='rounded-full h-10 w-10 mt-1.5 filter hover:saturate-50' src={img.thumbnail} alt="" />
                <div className=' ml-2 mt-1 max-w-10/12'><p className='font-bold text-sm max-w-fit line-clamp-1 hover:underline'>{name.first} {name.last}</p>
                    <p className='text-xs text-gray-500 mt-0.5 truncate'>@{login.username}</p>
                </div>
            </div>
            <div className='text-center pt-2 leading-none w-20 mx-1 transition-all duration-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-size-200 bg-pos-0 hover:bg-pos-100 text-sm font-bold rounded-md cursor-pointer hover:bg-slate-800 text-white h-8'>Follow</div>
        </div>
    )
}
