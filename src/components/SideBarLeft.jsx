import React, { useState } from 'react'
import { BiHomeAlt2, BiUserCircle, BiBell, BiMessageDetail, BiBookmarks, BiUniversalAccess, BiBookReader, BiCollection, BiDotsHorizontalRounded, BiPlusCircle } from "react-icons/bi"
import SideBarItem from '@/components/SideBarItem'
import { signOut } from 'next-auth/react'
import { Button } from '@mui/material';


export default function SideBarLeft({ user }) {
    const [signOutMenu, setSignOutMenu] = useState(false);
    return (
        <div className='sticky overflow-y-auto overflow-x-hidden top-0 w-[65px] sm:flex flex-col h-screen xl:w-[275px] p-2'>
            <div className='flex item-center h-[50px] w-[50px] rounded-full mb-2 hover:bg-gray-200 justify-center cursor-pointer'>
                <img className='h-6 w-8 flex my-auto mx-auto' src="/Twitter-logo.svg.png" alt="" />
            </div>
            <nav className='space-y-2 mb-6'>
                <SideBarItem text="Home" link="/" Icon={BiHomeAlt2} />
                <SideBarItem text="Messages" link="/messages" Icon={BiMessageDetail} user={user} />
                <SideBarItem text="Bookmarks" link="/bookmarks" Icon={BiBookmarks} />
                <SideBarItem text="Profile" link={`../profile/${user.uid}`} user={user} Icon={BiBookReader} />
                <SideBarItem text="More" Icon={BiCollection} />
            </nav>
            <button className="transition-all duration-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-size-200 bg-pos-0 hover:bg-pos-100 h-0 xl:h-[50px] cursor-pointer hidden xl:inline-grid text-lg font-bold w-full text-white mt-6 rounded-md">Tweet</button>
            <button className="transition-all duration-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-size-200 bg-pos-0 hover:bg-pos-100 h-[50px] cursor-pointer xl:hidden text-lg font-bold w-full mb-[58px] xl:mb-[66px] text-white mt-6 flex items-center justify-center rounded-md"><BiPlusCircle /></button>


            <div onClick={() => setSignOutMenu(!signOutMenu)} className='absolute bottom-0 mb-2 flex flex-col w-full space-y-2'>
                <div onClick={() => (signOut({ callbackUrl: "/auth/signin" }))} className={`${signOutMenu ? "opacity-100" : "opacity-0"} transition-opacity duration-300 menu-item xl:px-4 xl:my-0 my-0 px-0 flex w-[50px] xl:w-[260px]  h-[50px] xl:h-[66px] xl:justify-between justify-center`}>
                    <img className='h-9 w-9 xl:h-11 xl:w-11 rounded-full object-cover' src={user.userImg} alt="" />
                    <div className="ml-3 mr-16 hidden xl:flex flex-col">
                        <p className='text-lg font-bold truncate max-w-[135px]'>Log out</p>
                    </div>


                </div>
                <div className="menu-item mb-2 xl:px-4 xl:my-0 my-0 px-0 flex w-[50px] xl:w-[260px]  h-[50px] xl:h-[66px] xl:justify-between justify-center">
                    <img className='h-9 w-9 xl:h-11 xl:w-11 rounded-full object-cover' src={user.userImg} alt="" />
                    <div className="ml-3 hidden xl:flex flex-col">
                        <p className='text-sm font-bold truncate max-w-[135px]'>{user.name}</p>
                        <p className=' text-sm text-gray-500 truncate max-w-[135px]'>@{user.username}</p>
                    </div>
                    <BiDotsHorizontalRounded className='hidden min-w-8 xl:inline-grid' />

                </div>
            </div>


        </div>
    )
}
