import { useRouter } from 'next/router'
import React from 'react'

export default function SideBarItem({ text, Icon, active }) {
    const router = useRouter();
    return (
        <div className="menu-item" onClick={() => { (text === "Home" ? router.push("/") : router.push(`/${text.toLowerCase().split(" ").join("")}`)) }} >
            <Icon className={`xl:ml-4  ${active && "scale-105"}`} />
            <p className={`xl:ml-4 hidden xl:inline-grid ${active && "font-bold"}`}>{text}</p>
        </div>
    )
}
