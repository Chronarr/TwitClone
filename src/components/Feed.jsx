import { useRouter } from 'next/router'
import React, { useReducer } from 'react'

export default function Feed() {
    const router = useRouter();
    function homeClick() {
        router.reload()
    }
    return (
        <div className='flex sm:ml-[65px] lg:ml-[275px] max-w-[600px] flex-grow bg-white border-l border-r h-screen'>
            <header className='sticky w-full h-28 border-b flex flex-col top-0 bg-opacity-60 z-50 bg-white border-gray-100'>
                <div onClick={homeClick} className='cursor-pointer flex item-center h-1/2 w-full '>
                    <h2 className="text-xl font-semibold my-auto pl-4" >Home</h2>
                </div>
                <div className='h-1/2 flex w-full justify-between'>
                    <div className="w-1/2 flex justify-center cursor-pointer transition-colors duration-300 hover:bg-gray-200">
                        <button className='min-w-0 header-btn border-b-4 border-blue-500'>For you</button>
                        </div>
                        <div className="w-1/2 flex justify-center cursor-pointer transition-colors duration-300 hover:bg-gray-200">
                    <button className='header-btn text-gray-400'>Following</button>
                    </div>
                </div>
            </header>
        </div>
    )
}
