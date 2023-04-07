import React from 'react'
import { BiSearchAlt } from "react-icons/bi"
import Search from './Search'

export default function SideBarRight() {

    return (
        <div className='hidden flex-col border-l border-r border-b border-gray-200 h-screen md:flex p-2 w-[350px] min-w-[350px]'>
            <Search />
        </div>
    )
}
