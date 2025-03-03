import React from "react";
import { MdSearch } from "react-icons/md";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { getAuthToken } from "@/utils/auth";
import Sidebar from "@/Components/sidebar";
import Header from "@/Components/header";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import withAuth from "@/hoc/withAuth";
import { api } from "../../utils/apiHandlers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
        const response = await api.get(`/investment/list-earnings`);

        console.log("Reasponse form the earnings---->", response);

        const data = await response.data;
        console.log({ data });
        setEarnings(data);
      } catch (err) {
        setError(err.message);
        console.log(err);
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
      <Sidebar title="Earnings" />

      {/* Main Content */}
      <div className="w-full flex flex-col lg:ml-64 ">
        {/* Navbar */}
        <Header />

        {/* Earnings Overview & Chart */}
        <main className="p-6 mt-16">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Earnings Overview */}
            <div className="md:w-1/2 bg-gray-900 p-6 rounded-lg shadow-lg">
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
            <div className="md:w-1/2 bg-gray-900 p-6 rounded-lg shadow-lg">
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
                        <td className="px-6 py-3">
                          {new Date(earning.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-3">{earning.investment_id}</td>
                        <td className="px-6 py-3">
                          ${earning.amount.toFixed(2)}
                        </td>
                        <td
                          className={`px-6 py-3 ${
                            earning.is_withdrawn
                              ? "text-green-400"
                              : "text-yellow-400"
                          }`}
                        >
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

export default withAuth(Earnings);
