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
            <button className='w-20 mx-1 bg-black text-sm font-bold rounded-full cursor-pointer hover:bg-slate-800 text-white h-8'>Follow</button>
        </div>
    )
}
