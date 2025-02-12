import React, { useState } from 'react';
import Header from '@/Components/header';
import Sidebar from '@/Components/sidebar';

function Investment() {
    const [isOpen, setIsOpen] = useState(false); // Modal state

    return (
        <div className="flex min-h-screen bg-black text-white text-base">
            {/* Sidebar */}
            <Sidebar/>

            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <Header />

                {/* Main Content */}
                <main className="flex-1 p-5 mt-12">
                    {/* Investment Overview Section */}
                    <section className="mb-6 rounded-lg shadow-lg relative">
                        <img
                            src="/Assets/investment.jpg"
                            alt="Investment Overview"
                            className="w-full h-56 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 flex items-center justify-end bg-black bg-opacity-50 p-6 rounded-lg">
                            <p className="text-white text-base max-w-md">
                                Track your investments in real-time and make informed decisions. View your portfolio performance, analyze trends, and manage assets effortlessly.
                            </p>
                        </div>
                    </section>

                    {/* Recent Transactions & Investment Button */}
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Recent Transactions</h3>
                        <button 
                            onClick={() => setIsOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 text-sm rounded-lg transition duration-300">
                            Make an Investment
                        </button>
                    </div>

                    {/* Recent Transactions Section */}
                    <section className="bg-black border border-blue-600 p-4 rounded-lg shadow-lg">
                        <div className="overflow-x-auto">
                            <table className="w-full h-auto bg-black text-white text-sm rounded-lg">
                                <thead>
                                    <tr className="bg-blue-800 text-left">
                                        <th className="px-6 py-3">Date</th>
                                        <th className="px-6 py-3">Investment Type</th>
                                        <th className="px-6 py-3">Amount</th>
                                        <th className="px-6 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-700">
                                        <td className="px-6 py-3">Jan 28, 2025</td>
                                        <td className="px-6 py-3">Crypto</td>
                                        <td className="px-6 py-3">$5,000</td>
                                        <td className="px-6 py-3 text-green-400">Completed</td>
                                    </tr>
                                    <tr className="border-b border-gray-700">
                                        <td className="px-6 py-3">Jan 25, 2025</td>
                                        <td className="px-6 py-3">Crypto</td>
                                        <td className="px-6 py-3">$3,200</td>
                                        <td className="px-6 py-3 text-yellow-400">Pending</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-3">Jan 20, 2025</td>
                                        <td className="px-6 py-3">Crypto</td>
                                        <td className="px-6 py-3">$10,000</td>
                                        <td className="px-6 py-3 text-green-400">Completed</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Investment Modal */}
                    {isOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
                                <h2 className="text-white text-lg font-bold mb-4">New Investment</h2>
                                <label className="block text-gray-300 text-sm mb-2">Investment Type</label>
                                <select className="w-full p-2 rounded bg-gray-800 text-white mb-4">
                                    <option>Crypto</option>
                                    <option>Stocks</option>
                                    <option>Real Estate</option>
                                </select>

                                <label className="block text-gray-300 text-sm mb-2">Amount ($)</label>
                                <input type="number" placeholder="Enter amount" className="w-full p-2 rounded bg-gray-800 text-white mb-4" />

                                <div className="flex justify-end space-x-2">
                                    <button 
                                        onClick={() => setIsOpen(false)}
                                        className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white rounded-lg">
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={() => { setIsOpen(false); alert('Investment Successful!'); }}
                                        className="bg-green-600 hover:bg-green-700 px-4 py-2 text-white rounded-lg">
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Investment;
