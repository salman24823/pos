"use client";

import { useEffect, useState } from "react";
import SummaryCard from "./components/SummaryCard";
import SalesChart from "./components/SalesChart";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiDownload,
  FiUpload,
  FiAlertTriangle,
  FiBox,
  FiRefreshCw,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";
import { useSession } from "next-auth/react";

const invoices = [
  {
    id: "INV001",
    customer: "Skylar Price",
    date: "11/02/2024",
    amount: "$354",
    status: "Delivered",
  },
  {
    id: "INV002",
    customer: "Julian",
    date: "11/09/2024",
    amount: "$910",
    status: "In Progress",
  },
  {
    id: "INV003",
    customer: "Ava Jones",
    date: "08/05/2024",
    amount: "$230",
    status: "Returned",
  },
];

const stockSummary = [
  {
    title: "Total Sales Items",
    value: 210,
    icon: <FiCheckCircle className="text-green-500" />,
  },
  {
    title: "Total Return Items",
    value: 2,
    icon: <FiRefreshCw className="text-yellow-500" />,
  },
  {
    title: "Total Purchases",
    value: 500,
    icon: <FiBox className="text-blue-500" />,
  },
  {
    title: "Purchase Returns",
    value: 10,
    icon: <FiAlertTriangle className="text-red-500" />,
  },
];

const alerts = [
  {
    product: "iPad Pro",
    qty: 5,
    icon: <FiAlertTriangle className="text-red-500" />,
  },
  {
    product: "DJI Mavic Pro 2",
    qty: 3,
    icon: <FiAlertTriangle className="text-red-500" />,
  },
  {
    product: "Google Pixel",
    qty: 8,
    icon: <FiAlertTriangle className="text-yellow-500" />,
  },
];

export default function Dashboard() {
  const [totalExpense, setTotalExpense] = useState(0);

  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session,status, "session")
    if (status === "unauthenticated") {
      location.replace("/");
    }
  }, [status, session]);

  
  useEffect(() => {
    const fetchTotalExpenses = async () => {
      try {
        const res = await fetch("/api/expense");
        const data = await res.json();
        if (res.ok && data.total !== undefined) {
          setTotalExpense(data.total);
        } else {
          throw new Error(data.message || "Failed to load expense");
        }
      } catch (err) {
        console.error("❌ Failed to load total expense:", err.message);
      }
    };

    fetchTotalExpenses();
  }, []);

  const summaryCards = [
    {
      title: "Total Sales",
      value: "$12,345",
      change: "20%",
      isPositive: true,
      icon: <FiTrendingUp className="text-green-500 text-2xl" />,
      color: "bg-green-100",
    },
    {
      title: "Total Expense",
      value: `$${totalExpense.toLocaleString()}`, // ✅ formatted dynamically
      change: "8%",
      isPositive: false,
      icon: <FiTrendingDown className="text-yellow-500 text-2xl" />,
      color: "bg-yellow-100",
    },
    {
      title: "Payment Sent",
      value: "$65,920",
      change: "32%",
      isPositive: true,
      icon: <FiUpload className="text-blue-500 text-2xl" />,
      color: "bg-blue-100",
    },
    {
      title: "Payment Received",
      value: "$72,840",
      change: "3%",
      isPositive: false,
      icon: <FiDownload className="text-red-500 text-2xl" />,
      color: "bg-red-100",
    },
  ];

  return (
    <main className="flex-1 p-6 space-y-6 overflow-auto">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, idx) => (
          <SummaryCard key={idx} {...card} />
        ))}
      </div>

      {/* Invoices and Stock Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Recent Invoices</h2>
            <button className="text-sm text-indigo-600 hover:underline">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b text-gray-500">
                  <th className="pb-2">ID</th>
                  <th className="pb-2">Customer</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2 text-right">Amount</th>
                  <th className="pb-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {invoices.map((invoice, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="py-3">{invoice.id}</td>
                    <td>{invoice.customer}</td>
                    <td>{invoice.date}</td>
                    <td className="text-right font-medium">{invoice.amount}</td>
                    <td className="text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${invoice.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : invoice.status === "In Progress"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stock Summary & Alerts */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <h2 className="font-semibold text-lg mb-4">Stock Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              {stockSummary.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="p-2 bg-white rounded-lg shadow-xs">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.title}</p>
                    <p className="font-bold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Stock Alerts</h2>
              <button className="text-sm text-indigo-600 hover:underline">
                Manage
              </button>
            </div>
            <div className="space-y-3">
              {alerts.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <span className="font-medium">{item.product}</span>
                  </div>
                  <span className="font-bold text-red-600">
                    Only {item.qty} left
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
