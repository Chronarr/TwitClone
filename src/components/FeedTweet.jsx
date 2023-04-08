import React from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { BiImageAdd, BiPoll, BiSmile, BiCalendar, BiMap } from "react-icons/bi"

export default function FeedTweet() {

    return (
        <div className='w-full border-b border-gray-200 min-h-36 mt-2 px-6 flex'>
            <div>
                <img className='rounded-full object-cover h-12 w-12 cursor-pointer filter hover:saturate-50' src="/hacker.jpg" alt="" />
            </div>
            <div className='flex-1'>
                <div className='flex items-center min-h-[56px] w-full'>
                    <TextareaAutosize maxLength="280" className="w-full ml-4 text-xl outline-none resize-none" placeholder="What's happening?" />
                </div>
                <div className='h-14 ml-2 flex  mt-2 min-w-full bottom-0 justify-between  border-t border-gray-200'>
                    <div className='flex items-center'>
                        <BiImageAdd className='text-sky-500 h-9 w-9 p-2 rounded-full hover:bg-sky-100 cursor-pointer' />
                        <BiPoll className='text-sky-500 h-9 w-9 p-2 hidden sm:inline-grid rounded-full hover:bg-sky-100 cursor-pointer' />
                        <BiSmile className='text-sky-500 h-9 w-9 p-2 rounded-full hover:bg-sky-100 cursor-pointer' />
                        <BiCalendar className='text-sky-500 h-9 w-9 p-2 rounded-full hidden sm:inline-grid hover:bg-sky-100 cursor-pointer' />
                        <BiMap className='text-sky-500 h-9 w-9 p-2 rounded-full hover:bg-sky-100 cursor-pointer' />
                    </div>
                    <button className='mr-2 rounded-full bg-sky-300 text-white w-20 h-8 my-auto pb-1 font-bold disabled:opacity-50' >Tweet</button>
                </div>
            </div>
        </div>
    )
}
