import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, Filter, Download } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import ProductTable from './ProductTable';

const ProductAnalysis = () => {
  const { state, setSearchTerm, setCategoryFilter, products } = useAppContext(); // Get products from context
  const [chartData, setChartData] = useState([]);
  const { searchTerm, categoryFilter } = state;

  useEffect(() => {
    // We no longer need to fetch products here, as it's handled by the context
    // We can still set up the chart data if needed
    // setChartData([
    //   { month: 'Jan', product1: 65, product2: 45, product3: 70 },
    //   { month: 'Feb', product1: 70, product2: 52, product3: 75 },
    //   { month: 'Mar', product1: 75, product2: 58, product3: 80 },
    //   { month: 'Apr', product1: 80, product2: 65, product3: 85 },
    // ]);
  }, [products]); // Re-run effect when products change

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-3xl font-semibold mb-4 sm:mb-0">Product Analysis</h2>
        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {['Beverages', 'Snacks', 'Dairy', 'Cereals', 'Confectionery'].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <ProductTable products={filteredProducts} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Product Performance Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="product1" stroke="#3B82F6" strokeWidth={2} name="Spiced Turmeric Latte" />
            <Line type="monotone" dataKey="product2" stroke="#10B981" strokeWidth={2} name="Coconut Quinoa Bites" />
            <Line type="monotone" dataKey="product3" stroke="#F59E0B" strokeWidth={2} name="Green Tea Yogurt" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductAnalysis;