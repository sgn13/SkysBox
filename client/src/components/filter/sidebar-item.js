import React from 'react'
import { act } from 'react-dom/test-utils'



function SidebarItem({ name, active, handleClick }) {
    return (
        <div>
            <button
                onClick={handleClick}
                className={`sidebar-item ${active ? 'active' : ''}`}>{name}
            </button>
        </div>
    )
}

export default SidebarItem
