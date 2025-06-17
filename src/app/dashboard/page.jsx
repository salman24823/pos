'use client'

export default function Dashboard() {
  const summaryCards = [
    { title: 'Total Sales', value: '$12,345', change: '▲ 20%', color: 'text-green-500', icon: '💰' },
    { title: 'Total Expense', value: '$3,213', change: '▲ 8%', color: 'text-yellow-500', icon: '💸' },
    { title: 'Payment Sent', value: '$65,920', change: '▲ 32%', color: 'text-blue-500', icon: '📤' },
    { title: 'Payment Received', value: '$72,840', change: '▼ 3%', color: 'text-red-500', icon: '📥' },
  ];

  const salesData = [
    { month: 'Feb', sales: 3000, purchases: 2400 },
    { month: 'Mar', sales: 4000, purchases: 2600 },
    { month: 'Apr', sales: 3500, purchases: 1800 },
    { month: 'May', sales: 5000, purchases: 3000 },
    { month: 'Jun', sales: 4200, purchases: 2700 },
  ];

  const invoices = [
    { id: 'INV001', customer: 'Skylar Price', date: '11/02/2024', amount: '$354', status: 'Delivered' },
    { id: 'INV002', customer: 'Julian', date: '11/09/2024', amount: '$910', status: 'In Progress' },
    { id: 'INV003', customer: 'Ava Jones', date: '08/05/2024', amount: '$230', status: 'Returned' },
  ];

  const stockSummary = {
    totalSalesItems: 210,
    totalReturnItems: 2,
    totalPurchases: 500,
    purchaseReturns: 10,
  };

  const alerts = [
    { product: 'iPad Pro', qty: 5 },
    { product: 'DJI Mavic Pro 2', qty: 3 },
    { product: 'Google Pixel', qty: 8 },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0E0E18] text-white p-4 space-y-4">
        <div className="text-2xl font-bold mb-6">panze <span className="text-sm">studio</span></div>
        <nav className="space-y-2 text-sm">
          {[
        
            'Dashboard', 'Attendence', 'Product Manager', 'Sales', 'Purchases',
            'Stock Transfer', 'POS', 'Cash & Bank', 'Expenses', 'Staff Members',
            'Sales Reports', 'Online Orders', 'Settings', 'Subscription', 'Logout',
          ].map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-800 ${item === 'Dashboard' ? 'bg-gray-700' : ''}`}
            >
              <span className="text-lg">🔹</span>
              <span>{item}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6 bg-gray-100">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {summaryCards.map((card, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{card.title}</p>
                <h2 className="text-lg font-bold">{card.value}</h2>
                <p className={`text-sm ${card.color}`}>{card.change}</p>
              </div>
              <div className="text-2xl">{card.icon}</div>
            </div>
          ))}
        </div>

        {/* Sales & Purchases */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Sales & Purchases</h2>
          <div className="space-y-2">
            {salesData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span className="w-16">{item.month}</span>
                <div className="flex-1 bg-gray-200 h-4 mx-2 rounded relative">
                  <div className="bg-blue-400 h-4 rounded-l" style={{ width: `${item.sales / 60}%` }}></div>
                  <div className="bg-green-400 h-4 rounded-r absolute top-0 left-0" style={{ width: `${item.purchases / 60}%`, opacity: 0.6 }}></div>
                </div>
                <span className="w-20 text-right">${item.sales}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Invoices and Stock Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Invoices */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-2">Recent Invoices</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b text-gray-500">
                  <th>ID</th><th>Customer</th><th>Date</th><th>Amount</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, idx) => (
                  <tr key={idx} className="border-b">
                    <td>{invoice.id}</td>
                    <td>{invoice.customer}</td>
                    <td>{invoice.date}</td>
                    <td>{invoice.amount}</td>
                    <td>
                      <span className={`text-xs px-2 py-1 rounded-full
                        ${invoice.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          invoice.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'}`}>
                        {invoice.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Stock Summary & Alerts */}
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow">
              <h2 className="font-semibold mb-2">Stock History</h2>
              <ul className="text-sm space-y-1">
                <li>Total Sales Items: <strong>{stockSummary.totalSalesItems}</strong></li>
                <li>Total Return Items: <strong>{stockSummary.totalReturnItems}</strong></li>
                <li>Total Purchase Items: <strong>{stockSummary.totalPurchases}</strong></li>
                <li>Purchase Returns: <strong>{stockSummary.purchaseReturns}</strong></li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <h2 className="font-semibold mb-2">Stock Alerts</h2>
              <ul className="text-sm space-y-1">
                {alerts.map((item, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{item.product}</span>
                    <span className="text-red-500 font-medium">{item.qty} left</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
  
}
