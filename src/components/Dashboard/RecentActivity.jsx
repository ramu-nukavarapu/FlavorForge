import { ArrowRight } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const RecentActivity = ({ products }) => {
  const { setScreen } = useAppContext();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
      <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
      <div className="flex-grow flex flex-col gap-4">
        {products.map(product => (
          <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{product.name}</p>
              <p className="text-sm text-gray-500">{product.category} • Score: {product.score}</p>
            </div>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {product.status}
            </span>
          </div>
        ))}
      </div>
      <button 
        onClick={() => setScreen('product analysis')} 
        className="mt-4 text-blue-600 font-medium hover:underline flex items-center gap-1 self-end"
      >
        View All Products <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default RecentActivity;