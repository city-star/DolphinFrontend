import React, { useState, useEffect } from 'react';
import Header from '@/Components/header';
import Sidebar from '@/Components/sidebar';
import { getAuthToken } from '@/utils/auth'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Investment() {
    const [isOpen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [investments, setInvestments] = useState([]); 

    
    useEffect(() => {
        fetchInvestments();
    }, []);
    
    // ________________ FETCH INVESTMENTS________________>

    const fetchInvestments = async () => {
        const token = getAuthToken();
        if (!token) {
            toast.error('Authentication error. Please log in again.');
            return;
        }

        try {
            const response = await fetch('http://13.203.104.224/api/investment/investments', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch investments");
            }
            setInvestments(data);
        } catch (error) {
            console.error("Error fetching investments:", error);
            toast.error("Error fetching investments");
        }
    };
    // _________________ HANDLE INVEST _____________________>

    const handleInvestment = async () => {
        const token = getAuthToken();
        if (!token) {
            toast.error('Authentication error. Please log in again.');
            return;
        }

        if (!amount) {
            toast.error("Please enter a valid investment amount.");
            return;
        }

        const investmentData = {
            amount: Number(amount),
        };

        try {
            const response = await fetch('http://13.203.104.224/api/investment/invest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(investmentData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Investment failed");
            }

            toast.success('Investment Successful', { position: "top-right", autoClose: 3000 });
            setAmount('');
            setIsOpen(false);
            fetchInvestments(); 

        } catch (error) {
            console.error("Error in investment:", error);
            toast.error(error.message || "Investment failed");
        }
    };

    return (
        <div className="flex min-h-screen bg-black text-white text-base">
            {/* Sidebar */}
            <Sidebar />

            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <Header />

                {/* Main Content */}
                <main className="flex-1 p-5 mt-12">
                    <ToastContainer />

                    {/* Investment Overview Section */}
                    <section className="mb-6 rounded-lg shadow-lg relative">
                        <img src="/Assets/investment.jpg" alt="Investment Overview"
                            className="w-full h-56 object-cover rounded-lg" />
                        <div className="absolute inset-0 flex items-center justify-end bg-black bg-opacity-50 p-6 rounded-lg">
                            <p className="text-white text-base max-w-md">
                                Track your investments in real-time and make informed decisions.
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
                                        <th className="px-6 py-3">Txn Hash</th>
                                        <th className="px-6 py-3">Amount</th>
                                        <th className="px-6 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {investments.length > 0 ? (
                                        investments.map((investment, index) => (
                                            <tr key={index} className="border-b border-gray-700">
                                                <td className="px-6 py-3">{new Date(investment.created_at).toLocaleDateString()}</td>
                                                <td className="px-6 py-3">{investment.txn_hash}</td>
                                                <td className="px-6 py-3">${investment.amount}</td>
                                                <td className={`px-6 py-3 ${investment.status ? 'text-green-400' : 'text-red-400'}`}>
                                                    {investment.status ? 'Completed' : 'Pending'}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-4">No investments found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Investment Modal */}
                    {isOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
                                <h2 className="text-white text-lg font-bold mb-4">New Investment</h2>

                                {/* Amount Input */}
                                <label className="block text-gray-300 text-sm mb-2">Amount ($)</label>
                                <input type="number" placeholder="Enter amount"
                                    value={amount} onChange={(e) => setAmount(e.target.value)}
                                    className="w-full p-2 rounded bg-gray-800 text-white mb-4" />

                                {/* Buttons */}
                                <div className="flex justify-end space-x-2">
                                    <button onClick={() => setIsOpen(false)}
                                        className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white rounded-lg">
                                        Cancel
                                    </button>
                                    <button onClick={handleInvestment}
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
