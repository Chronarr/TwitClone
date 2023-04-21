import { useRouter } from 'next/router'
import React from 'react'

export default function SideBarItem({ text, link, Icon, active, user }) {
    const router = useRouter();
    function link2() {
        router.push(link)
    }
    return (
        <div className="menu-item" onClick={link2} >
            <Icon className={`xl:ml-4  ${active && "scale-105"}`} />
            <p className={`xl:ml-4 hidden xl:inline-grid ${active && "font-bold"}`}>{text}</p>
        </div>
    )
}
