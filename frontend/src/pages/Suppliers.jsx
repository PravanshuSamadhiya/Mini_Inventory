import React, { useEffect, useState } from 'react';
import API from '../api/api';

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({ name: '', contact: '' });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const res = await API.get('/suppliers');
      setSuppliers(res.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    try {
      await API.post('/suppliers', form);
      setForm({ name: '', contact: '' });
      fetchSuppliers();
    } catch (error) {
      console.error("Error adding supplier:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6 md:p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">🚚 Manage Suppliers</h1>

      <div className="from-blue-50 to-purple-100  p-6 rounded-2xl shadow-md mb-10">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Supplier Name"
              value={form.name}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact Info"
              value={form.contact}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-black text-white px-6 py-2 rounded-md transition"
          >
            ➕ Add Supplier
          </button>
        </form>
      </div>

      <div className="from-blue-50 to-purple-100  p-6 rounded-2xl shadow-md overflow-x-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">📋 Supplier List</h2>

        <table className="min-w-full text-sm md:text-base border border-gray-200 rounded">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Contact</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length === 0 ? (
              <tr>
                <td colSpan="2" className="text-center p-4 text-gray-500">
                  No suppliers found
                </td>
              </tr>
            ) : (
              suppliers.map((supplier, idx) => (
                <tr key={supplier._id} className={idx % 2 === 0 ? 'from-blue-50 to-purple-100' : 'from-blue-50 to-purple-100'}>
                  <td className="p-3 border">{supplier.name}</td>
                  <td className="p-3 border">{supplier.contact || '—'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Suppliers;
