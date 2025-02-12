import React from 'react';
import { MdSearch } from "react-icons/md";

function header() {
    return (
        <header className="bg-black shadow p-3 flex justify-between items-center fixed w-[calc(100%-240px)] z-10">
            {/* Search Bar */}
            <div className="relative w-80">
                <MdSearch size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-black text-white border border-blue-800 rounded-lg pl-10 pr-3 py-2 text-sm w-full focus:outline-none"
                />
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-3 mr-4 ">
                <img src="/Assets/user.jpeg" alt="User Profile" className="w-10 h-10 rounded-full" />
                <span className="text-white font-medium text-sm mr-4">John</span>
                </div>
        </header>
    )
}

export default header
