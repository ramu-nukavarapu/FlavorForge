import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useAppContext } from '../../context/AppContext';
import { getTrendsData, getCompetitorsData } from '../../services/api';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

const MarketIntelligence = () => {
  const { setLoading, setError, loading, error } = useAppContext();
  const [trends, setTrends] = useState(null);
  const [competitors, setCompetitors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const trendsData = await getTrendsData();
        const competitorsData = await getCompetitorsData();
        setTrends(trendsData);
        setCompetitors(competitorsData);
      } catch (err) {
        setError('Failed to fetch market intelligence data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setLoading, setError]);

  if (loading) return <div className="text-center py-8">Loading market intelligence...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!trends) return null;

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">Market Intelligence</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Trending Ingredients</h3>
          <ul className="space-y-4">
            {trends.trendingIngredients.map((ingredient, idx) => (
              <li key={idx} className="flex items-center justify-between">
                <span className="text-lg font-medium">{ingredient.name}</span>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-sm font-semibold">{ingredient.score}</span>
                    <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                      <div className="h-2 bg-blue-600 rounded-full" style={{ width: `${ingredient.score}%` }}></div>
                    </div>
                  </div>
                  <span className={`text-sm font-medium ${ingredient.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {ingredient.growth}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">Regional Preferences</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={trends.regionalData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="percentage"
              >
                {trends.regionalData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}%`, name]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Market Trends Over Time</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={trends.timelineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="healthy" stroke="#3B82F6" strokeWidth={2} name="Healthy Foods" />
            <Line type="monotone" dataKey="organic" stroke="#10B981" strokeWidth={2} name="Organic" />
            <Line type="monotone" dataKey="plantBased" stroke="#F59E0B" strokeWidth={2} name="Plant-Based" />
            <Line type="monotone" dataKey="functional" stroke="#EF4444" strokeWidth={2} name="Functional Foods" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Competitive Landscape</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitors.map((competitor, idx) => (
            <div key={idx} className="p-6 border border-gray-200 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">{competitor.company}</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>Products:</span>
                  <span className="font-medium text-gray-900">{competitor.products}</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Score:</span>
                  <span className="font-medium text-gray-900">{competitor.score}</span>
                </div>
                <div className="flex justify-between">
                  <span>Growth:</span>
                  <span className={`font-medium ${competitor.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {competitor.trend}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketIntelligence;