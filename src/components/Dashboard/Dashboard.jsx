import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../../context/AppContext';
import { getDashboardData, getProductsData } from '../../services/api';
import MetricsCard from './MetricsCard';
import RecentActivity from './RecentActivity';

const Dashboard = () => {
  const { setLoading, setError, loading, error } = useAppContext();
  const [dashboardMetrics, setDashboardMetrics] = useState(null);
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const metrics = await getDashboardData();
        const products = await getProductsData();
        setDashboardMetrics(metrics);
        setRecentProducts(products.slice(0, 3));
      } catch (err) {
        setError('Failed to fetch dashboard data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setLoading, setError]);

  if (loading) return <div className="text-center py-8">Loading dashboard...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!dashboardMetrics) return null;

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricsCard 
          title="Total Products" 
          value={dashboardMetrics.totalProducts} 
          growth={dashboardMetrics.growthMetrics.productsGrowth} 
          icon="Package" 
        />
        <MetricsCard 
          title="Success Rate" 
          value={`${dashboardMetrics.successRate}%`} 
          growth={dashboardMetrics.growthMetrics.successRateGrowth} 
          icon="TrendingUp" 
        />
        <MetricsCard 
          title="Active Users" 
          value={dashboardMetrics.activeUsers.toLocaleString()} 
          growth={dashboardMetrics.growthMetrics.usersGrowth} 
          icon="Users" 
        />
        <MetricsCard 
          title="Trending Categories" 
          value={dashboardMetrics.trendingCategories} 
          growthPhrase="Beverages leading" 
          icon="Lightbulb" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Market Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardMetrics.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="beverages" fill="#3B82F6" name="Beverages" />
              <Bar dataKey="snacks" fill="#10B981" name="Snacks" />
              <Bar dataKey="dairy" fill="#F59E0B" name="Dairy" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <RecentActivity products={recentProducts} />
      </div>
    </div>
  );
};

export default Dashboard;