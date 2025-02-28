import React from 'react';
import { MdSearch } from "react-icons/md";
import { Line } from 'react-chartjs-2';
import { useState,useEffect } from 'react';
import { getAuthToken } from '@/utils/auth'; 

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Earnings() {


    const [earnings, setEarnings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   
    useEffect(() => {
        const fetchEarnings = async () => {
            const token = getAuthToken();
            if (!token) {
                setError("Authentication error. Please log in again.");
                return;
            }

            try {
                const response = await fetch('http://13.203.104.224/api/investment/list-earnings', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }

                });

                console.log("Reasponse form the earnings---->",response);

                if (!response.ok) {
                    throw new Error("Failed to fetch earnings.");
                }

                const data = await response.json();
                setEarnings(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEarnings();
    }, []);
    // Sample data for the earnings chart
    const earningsData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Earnings ($)",
                data: [1200, 1500, 1800, 1700, 1900, 2200],
                borderColor: "rgb(59, 130, 246)",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                tension: 0.4,
            },
        ],
    };

    return (
        <div className="flex min-h-screen bg-black text-white">
            {/* Sidebar */}
            <aside className="w-60 bg-black text-white p-5 fixed h-full">
                <h1 className="text-xl font-semibold mb-8 mt-16 text-center">My Dashboard</h1>
                <nav className="space-y-3 w-full text-center">
                    <a href="#" className="block hover:bg-blue-700 px-4 py-2 rounded">Dashboard</a>
                    <a href="#" className="block hover:bg-blue-700 px-4 py-2 rounded">Investments</a>
                    <a href="" className="block hover:bg-blue-700 px-4 py-2 rounded bg-blue-700">Earnings</a>
                    <a href="exchange" className="block hover:bg-blue-700 px-4 py-2 rounded">Exchanges</a>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col ml-60">
                {/* Navbar */}
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
                    <div className="flex items-center space-x-3">
                        <img src="/Assets/user.jpeg" alt="User Profile" className="w-10 h-10 rounded-full" />
                        <span className="text-white font-medium text-sm">John Doe</span>
                    </div>
                </header>

                {/* Earnings Overview & Chart */}
                <main className="p-6 mt-16">
                    <div className="flex space-x-6">
                        {/* Earnings Overview */}
                        <div className="w-1/2 bg-gray-900 p-6 rounded-lg shadow-lg">
                            <h2 className="text-lg font-semibold mb-4">Earnings Overview</h2>
                            <div className="space-y-4">
                                <div className="bg-black p-4 rounded-lg flex justify-between items-center border border-blue-800">
                                    <p className="text-sm text-gray-300">Total Earnings</p>
                                    <h3 className="text-xl font-bold ">$15,200</h3>
                                </div>
                                <div className="bg-black p-4 rounded-lg flex justify-between items-center border border-blue-800">
                                    <p className="text-sm text-gray-300">Monthly Earnings</p>
                                    <h3 className="text-xl font-bold">$2,500</h3>
                                </div>
                                <div className="bg-black p-4 rounded-lg flex justify-between items-center border border-blue-800">
                                    <p className="text-sm text-gray-300">Daily Earnings</p>
                                    <h3 className="text-xl font-bold">$120</h3>
                                </div>
                            </div>

                        </div>

                        {/* Earnings Chart */}
                        <div className="w-1/2 bg-gray-900 p-6 rounded-lg shadow-lg">
                            <h2 className="text-lg font-semibold mb-4">Earnings Trend</h2>
                            <Line data={earningsData} />
                        </div>
                    </div>

                 
                    {/* Earnings Table */}
                    <section className="mt-6 bg-gray-900 p-4 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Earnings Breakdown</h2>
                        <div className="overflow-x-auto">
                            {loading ? (
                                <p className="text-center text-gray-300">Loading earnings...</p>
                            ) : error ? (
                                <p className="text-center text-red-500">{error}</p>
                            ) : (
                                <table className="w-full bg-black text-white text-sm rounded-lg">
                                    <thead>
                                        <tr className="bg-blue-800 text-left">
                                            <th className="px-6 py-3">Date</th>
                                            <th className="px-6 py-3">Investment ID</th>
                                            <th className="px-6 py-3">Earnings</th>
                                            <th className="px-6 py-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {earnings.map((earning) => (
                                            <tr key={earning.id} className="border-b border-gray-700">
                                                <td className="px-6 py-3">{new Date(earning.created_at).toLocaleDateString()}</td>
                                                <td className="px-6 py-3">{earning.investment_id}</td>
                                                <td className="px-6 py-3">${earning.amount.toFixed(2)}</td>
                                                <td className={`px-6 py-3 ${earning.is_withdrawn ? "text-green-400" : "text-yellow-400"}`}>
                                                    {earning.is_withdrawn ? "Withdrawn" : "Pending"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </section>

                </main>
            </div>
        </div>
    );
}

export default Earnings;
