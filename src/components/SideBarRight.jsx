import React from 'react'
import { BiSearchAlt } from "react-icons/bi"
import Search from './Search'
import NewsWidget from './NewsWidget'

export default function SideBarRight({news, total}) {
    return (
        <div className='hidden flex-col border-r border-b border-gray-200 h-screen foo:flex p-2 w-[290px] min-w[290px] max-w-[290px] lg:max-w-[350px] lg:w-[350px] lg:min-w-[350px]'>
            <Search />
            <NewsWidget news={news} total={total}/>
        </div>
    )
}
