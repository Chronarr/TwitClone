import React from 'react'

export default function SideBarItem({ text, Icon, active }) {
    return (
        <div className="menu-item">
            <Icon className={`xl:ml-4  ${active && "scale-105"}`} />
            <p className={`xl:ml-4 hidden xl:inline-grid ${active && "font-bold"}`}>{text}</p>
        </div>
    )
}
