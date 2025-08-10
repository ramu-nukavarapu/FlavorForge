import { Plus } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const Navigation = () => {
  const { state, setScreen } = useAppContext();
  const { currentScreen } = state;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto py-4 px-4 md:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold text-blue-600">FlavorForge</h1>
          <div className="hidden md:flex gap-4">
            {['dashboard', 'creator', 'product analysis', 'market intelligence'].map((screen) => (
              <button
                key={screen}
                onClick={() => setScreen(screen)}
                className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  currentScreen === screen
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {screen === 'creator' ? 'Create Product' : screen.charAt(0).toUpperCase() + screen.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
        {
        <button
          onClick={() => setScreen('creator')}
          className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          New Product
        </button>
        }
      </div>
    </nav>
  );
};

export default Navigation;