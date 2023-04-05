import React from 'react'

export default function SideBarItem({ text, Icon, active }) {
    return (
        <div className="menu-item">
            <Icon className={`lg:ml-4  ${active && "scale-105"}`} />
            <p className={`lg:ml-4 hidden lg:inline-grid ${active && "font-bold"}`}>{text}</p>
        </div>
    )
}
