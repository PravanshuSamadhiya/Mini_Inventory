import React, { useEffect, useState } from 'react';
import API from '../api/api';

function Transactions() {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ product: '', quantity: '', type: 'purchase' });

  useEffect(() => {
    fetchProducts();
    fetchTransactions();
  }, []);

  const fetchProducts = async () => {
    const res = await API.get('/products');
    setProducts(res.data);
  };

  const fetchTransactions = async () => {
    const res = await API.get('/transactions');
    setTransactions(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/transactions', {
      ...form,
      quantity: Number(form.quantity),
    });
    setForm({ product: '', quantity: '', type: 'purchase' });
    fetchTransactions();
    fetchProducts(); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6 md:p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">💸 Transaction Records</h1>

      <div className="from-blue-50 to-purple-100 p-6 rounded-2xl shadow-md mb-10">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              name="product"
              value={form.product}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} (Stock: {p.stock})
                </option>
              ))}
            </select>

            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={form.quantity}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
              min="1"
            />

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="purchase">Purchase</option>
              <option value="sale">Sale</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 bg-black text-white px-6 py-2 rounded-md transition"
          >
            ➕ Record Transaction
          </button>
        </form>
      </div>

      <div className="from-blue-50 to-purple-100  p-6 rounded-2xl shadow-md overflow-x-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">📄 All Transactions</h2>

        <table className="min-w-full text-sm md:text-base border border-gray-200 rounded">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border">Product</th>
              <th className="p-3 border">Type</th>
              <th className="p-3 border">Quantity</th>
              <th className="p-3 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No transactions yet
                </td>
              </tr>
            ) : (
              transactions.map((txn, idx) => (
                <tr key={txn._id} className={idx % 2 === 0 ? 'from-blue-50 to-purple-100' : 'from-blue-50 to-purple-100'}>
                  <td className="p-3 border">{txn.product?.name || '(deleted)'}</td>
                  <td className="p-3 border">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                        txn.type === 'sale' ? 'bg-red-500' : 'bg-green-500'
                      }`}
                    >
                      {txn.type}
                    </span>
                  </td>
                  <td className="p-3 border">{txn.quantity}</td>
                  <td className="p-3 border text-gray-600">
                    {new Date(txn.date).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;
