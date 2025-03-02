import { useState } from "react";
import { MdSearch } from "react-icons/md";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from "chart.js";
import { MdAccountBalanceWallet, MdAttachMoney, MdTrendingUp } from "react-icons/md";
import Link from 'next/link';
import Header from "@/Components/header";
import Sidebar from "@/Components/sidebar";
import withAuth from "@/hoc/withAuth";

// Initialize Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

 function Dashboard() {
  // Dummy data for the graph
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Earnings",
        data: [1000, 1200, 900, 1500, 1800, 2100],
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: "rgba(59, 130, 246, 1)",
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
     <Sidebar/>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
       <Header/>
        {/* Main Section */}
        <main className="p-6 space-y-6 flex flex-col mt-16 justify-between h-[calc(100vh-96px)]">
          {/* Cards */}
          <div className="grid grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-black border-2 border-blue-800 p-6 rounded-lg shadow flex items-center space-x-4">
              <div className="p-3 bg-blue-800 rounded-full">
                <MdAccountBalanceWallet size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-300">Account Balance</h3>
                <p className="text-2xl font-bold text-white">$12,500</p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="bg-black border-2 border-blue-800 p-6 rounded-lg shadow flex items-center space-x-4">
              <div className="p-3 bg-blue-800 rounded-full">
                <MdAttachMoney size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-300">Earnings</h3>
                <p className="text-2xl font-bold text-white">$3,200</p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="bg-black border-2 border-blue-800 p-6 rounded-lg shadow flex items-center space-x-4">
              <div className="p-3 bg-blue-800 rounded-full">
                <MdTrendingUp size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-300">Total</h3>
                <p className="text-2xl font-bold text-white">$15,700</p>
              </div>
            </div>
          </div>


          {/* Graph */}
          <div className="bg-gray-900 p-6 rounded-lg shadow flex-1">
            <h3 className="text-lg font-medium text-gray-300 mb-4">Earnings Over Time</h3>
            <div className="h-[200px] w-[800px]">
              <Line data={data} options={{ maintainAspectRatio: false }} />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 justify-center">
            <button className="bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
             Topup Fuel
            </button>
            <button className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
              View Details
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default withAuth(Dashboard)