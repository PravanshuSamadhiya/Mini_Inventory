import React, { useEffect, useState } from 'react';
import API from '../api/api';

function Dashboard() {
  const [data, setData] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStock: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const res = await API.get('/reports/dashboard');
    setData(res.data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6 md:p-10 font-sans">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">📊 Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
          <h2 className="text-lg font-semibold text-gray-700">📦 Total Products</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">{data.totalProducts}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
          <h2 className="text-lg font-semibold text-gray-700">💰 Total Inventory Value</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">₹{data.totalValue.toFixed(2)}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
          <h2 className="text-lg font-semibold text-gray-700">⚠️ Low Stock Items</h2>
          <p className="text-3xl font-bold text-red-600 mt-2">{data.lowStock.length}</p>
        </div>
      </div>

      {data.lowStock.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🔔 Low Stock Alerts</h2>
          <p className="text-sm text-gray-500 mb-4">Items with less than 10 units in stock.</p>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded overflow-hidden">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 text-left border-b">Product</th>
                  <th className="p-3 text-left border-b">Stock</th>
                </tr>
              </thead>
              <tbody>
                {data.lowStock.map((product, idx) => (
                  <tr key={product._id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-3 border-b">{product.name}</td>
                    <td className="p-3 border-b font-semibold text-red-600">{product.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
