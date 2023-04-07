import React from 'react'
import { BiHomeAlt2, BiHash, BiBell, BiMessageDetail, BiBookmarks, BiUniversalAccess, BiBookReader, BiCollection, BiDotsHorizontalRounded, BiPlusCircle } from "react-icons/bi"
import SideBarItem from '@/components/SideBarItem'

export default function SideBarLeft() {
    return (
        <div className='fixed hidden w-[65px] sm:flex flex-col h-full xl:w-[275px] p-2'>
            <div className='flex item-center h-[50px] w-[50px] rounded-full mb-2 hover:bg-gray-200 justify-center cursor-pointer'>
                <img className='h-6 w-8 flex my-auto mx-auto' src="/Twitter-logo.svg.png" alt="" />
            </div>
            <nav className='space-y-2'>
                <SideBarItem text="Home" Icon={BiHomeAlt2} active />
                <SideBarItem text="Explore" Icon={BiHash} />
                <SideBarItem text="Notifications" Icon={BiBell} />
                <SideBarItem text="Messages" Icon={BiMessageDetail} />
                <SideBarItem text="Bookmarks" Icon={BiBookmarks} />
                <SideBarItem text="Twitter Blue" Icon={BiUniversalAccess} />
                <SideBarItem text="Profile" Icon={BiBookReader} />
                <SideBarItem text="More" Icon={BiCollection} />
            </nav>
            <div className="h-[50px] cursor-pointer hidden lg:inline-grid text-lg font-bold w-full bg-blue-400 text-white mt-6 hover:bg-blue-500 flex items-center justify-center rounded-full">Tweet</div>
            <div className="h-[50px] cursor-pointer inline-grid lg:hidden text-lg font-bold w-full bg-blue-400 text-white mt-6 hover:bg-blue-500 flex items-center justify-center rounded-full"><BiPlusCircle /></div>

            <div className='absolute bottom-0 w-full'>
                <div className="menu-item mb-2 lg:px-4 lg:my-0 my-0 px-0 flex w-[50px] lg:w-[260px]  h-[50px] lg:h-[66px] lg:justify-between justify-center">
                    <img className='h-9 w-9 lg:h-11 lg:w-11 rounded-full object-cover' src="/hacker.jpg" alt="" />
                    <div className="ml-3 hidden lg:flex flex-col">
                        <p className='text-sm font-bold truncate max-w-[135px]'>Marc Lodberg</p>
                        <p className=' text-sm text-gray-500 truncate max-w-[135px]'>@LodbergMarc89179</p>
                    </div>
                    <BiDotsHorizontalRounded className='hidden min-w-8 lg:inline-grid' />

                </div>

            </div>
        </div>
    )
}
