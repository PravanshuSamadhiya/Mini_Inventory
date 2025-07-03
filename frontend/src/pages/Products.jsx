import React, { useEffect, useState } from 'react';
import API from '../api/api';

function Products() {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', stock: '', supplier: '' });
  const [editId, setEditId] = useState(null);
  const [reorderSuggestions, setReorderSuggestions] = useState({}); 

  useEffect(() => {
    fetchProducts();
    fetchSuppliers();
  }, []);

  const fetchProducts = async () => {
    const res = await API.get('/products');
    setProducts(res.data);
  };

  const fetchSuppliers = async () => {
    const res = await API.get('/suppliers');
    setSuppliers(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/products/${editId}`, form);
    } else {
      await API.post('/products', form);
    }
    setForm({ name: '', price: '', stock: '', supplier: '' });
    setEditId(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      supplier: product.supplier?._id || '',
    });
    setEditId(product._id);
  };

  const handleDelete = async (id) => {
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  const handleSuggestReorder = async (productId) => {
    try {
      const res = await API.post(`/ai/reorder-suggestion/${productId}`);
      setReorderSuggestions((prev) => ({ ...prev, [productId]: res.data.reorderQuantity }));
    } catch (error) {
      console.error('AI suggestion failed:', error);
      alert('Failed to fetch reorder suggestion. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6 md:p-10 font-sans">
      <h1 className="text-3xl text-gray-800 font-bold mb-8">📦 Manage Products</h1>

      <div className="text-black from-blue-50 to-purple-100 p-6 rounded-2xl shadow-md mb-10">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={form.name}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <select
              name="supplier"
              value={form.supplier}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            >
              <option value="">Select Supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier._id} value={supplier._id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 bg-black text-white px-6 py-2 rounded-md transition"
          >
            {editId ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      </div>

      <div className="from-blue-50 to-purple-100 text-black p-6 rounded-2xl shadow-md overflow-x-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">🧾 Product List</h2>
        <table className="min-w-full border border-gray-200 text-sm md:text-base">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Stock</th>
              <th className="p-3 border">Supplier</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">No products found</td>
              </tr>
            ) : (
              products.map((product, idx) => (
                <React.Fragment key={product._id}>
                  <tr className={idx % 2 === 0 ? 'from-blue-50 to-purple-100' : 'from-blue-50 to-purple-100'}>
                    <td className="p-3 border">{product.name}</td>
                    <td className="p-3 border">₹{product.price}</td>
                    <td className="p-3 border">{product.stock}</td>
                    <td className="p-3 border">{product.supplier?.name || '—'}</td>
                    <td className="p-3 border space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded transition"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition"
                      >
                        🗑️ Delete
                      </button>
                      <button
                        onClick={() => handleSuggestReorder(product._id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-1 rounded transition"
                      >
                        💡 Suggest Reorder
                      </button>
                    </td>
                  </tr>
                  {reorderSuggestions[product._id] !== undefined && (
                    <tr className="bg-purple-100 text-black">
                      <td colSpan="5" className="p-3 text-sm">
                        🤖 AI Suggests: <strong>{reorderSuggestions[product._id]}</strong> units to reorder
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
