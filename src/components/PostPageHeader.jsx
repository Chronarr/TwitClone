import { useRouter } from 'next/router';
import React from 'react'
import { BiArrowBack } from "react-icons/bi"

export default function PostPageHeader() {
    const router = useRouter();
    return (
        <div className='sticky top-0 w-full h-14 border-b bg-opacity-80 backdrop-blur z-30 bg-white border-gray-100'>
            <div className='flex h-full items-center cursor-pointer'>
                <div className="ml-4 flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-200">
                    <BiArrowBack onClick={() => { router.back() }} className=" text-xl" />
                </div>
                <div className='ml-4 cursor-pointer flex flex-col item-center h-full w-full '>
                    <h2 className="text-xl font-semibold my-auto pl-4" >Tweet</h2>
                </div>
            </div>
        </div>
    )
}
