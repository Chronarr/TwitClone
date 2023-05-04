import { useRouter } from 'next/router'
import React from 'react'

export default function SideBarItem({ text, link, Icon, active, user }) {
    const router = useRouter();
    function link2() {
        if (link) {
            router.push(link)
        }
    }

    return (
        <div className="menu-item" onClick={link2} >
            <div className='relative flex'>
                <Icon className={`xl:ml-4  ${active && "scale-105"}`} />
                {text === "Messages" && user && user.newDm ? <div className='absolute xl:ml-4 -inset-x-2 -inset-y-2 text-sm text-center  font-bold w-5 h-5 bg-red-600 pb-1 rounded-full'>!</div> : <div></div>}
            </div>
            <p className={`xl:ml-4 hidden xl:inline-grid ${active && "font-bold"}`}>{text}</p>
        </div>
    )
}
