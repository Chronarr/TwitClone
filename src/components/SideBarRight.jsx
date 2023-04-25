import React from 'react'
import Search from './Search'
import NewsWidget from './NewsWidget'
import FollowWidget from './FollowWidget'
import { useRecoilState, } from 'recoil'
import { modalState } from "../../atom/modalAtom.js"

export default function SideBarRight({ news, total, followThis }) {
    const [open, setOpen] = useRecoilState(modalState);
    return (
        <div className={`${open ? "overflow-hidden max-h-screen" : "min-h-full"} hidden flex-col pb-4 min-h-full foo:inline p-2 w-[290px] min-w[290px] max-w-[290px] lg:max-w-[350px] lg:w-[350px] lg:min-w-[350px]`}>
            <Search />
            <NewsWidget news={news} total={total} />
            <FollowWidget followThis={followThis} />
        </div>
    )
}
