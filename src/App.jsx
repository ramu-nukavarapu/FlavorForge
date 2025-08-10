import { AppProvider, useAppContext } from './context/AppContext';
import Navigation from './components/Navigation/Navigation';
import Dashboard from './components/Dashboard/Dashboard';
import ProductCreator from './components/ProductCreator/ProductCreator';
import ProductAnalysis from './components/ProductAnalysis/ProductAnalysis';
import MarketIntelligence from './components/MarketIntelligence/MarketIntelligence';
import { Toaster } from 'react-hot-toast'; 

const AppContent = () => {
  const { state } = useAppContext();

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'dashboard':
        return <Dashboard />;
      case 'create product':
        return <ProductCreator />;
      case 'product analysis':
        return <ProductAnalysis />;
      case 'market intelligence':
        return <MarketIntelligence />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navigation />
      <div className="py-6 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        {renderScreen()}
      </div>
      <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm text-gray-500 mb-1">Current Screen:</p>
        <p className="font-medium capitalize">{state.currentScreen.replace('-', ' ')}</p>
      </div>
      <Toaster /> 
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;