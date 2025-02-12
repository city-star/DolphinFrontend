import React from 'react';
import { FaTachometerAlt, FaChartLine, FaWallet, FaExchangeAlt } from 'react-icons/fa';

function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-cover bg-center text-white p-6 flex flex-col items-center shadow-lg relative after:content-[''] after:absolute after:inset-0 after:bg-black/60 after:rounded-lg">
      
      {/* Sidebar Title bg-[url('/Assets/sidebar.jpeg')] */}
      <h1 className="text-2xl font-bold mb-8 mt-24 text-center relative z-10">Dashboard</h1>

      {/* Navigation Links */}
      <nav className="space-y-4 w-full text-center relative z-10">
        <a href="/Dashboard" className="flex items-center space-x-3 hover:bg-blue-700  px-4 py-3 rounded transition duration-300">
          <FaTachometerAlt className="text-xl" />
          <span>Dashboard</span>
        </a>
        <a href="/investment" className="flex items-center space-x-3 hover:bg-blue-700  px-4 py-3 rounded transition duration-300">
          <FaChartLine className="text-xl" />
          <span>Investments</span>
        </a>
        <a href="/earnings" className="flex items-center space-x-3 hover:bg-blue-700  px-4 py-3 rounded transition duration-300">
          <FaWallet className="text-xl" />
          <span>Earnings</span>
        </a>
        <a href="/exchange" className="flex items-center space-x-3 hover:bg-blue-700 px-4 py-3 rounded transition duration-300">
          <FaExchangeAlt className="text-xl" />
          <span>Exchanges</span>
        </a>
      </nav>
    </aside>
  );
}

export default Sidebar;
