import { createContext, useState, useContext, useEffect } from 'react';
import { getProductsData } from '../services/api';
import toast from 'react-hot-toast'; 

const AppContext = createContext();

const initialState = {
  currentScreen: 'dashboard',
  searchTerm: '',
  categoryFilter: '',
  creatorForm: {
    category: '',
    ageGroup: '',
    region: '',
    flavors: [],
  },
};

export const AppProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchInitialProducts = async () => {
      try {
        const initialProducts = await getProductsData();
        setProducts(initialProducts);
      } catch (err) {
        toast.error("Failed to fetch initial product data."); 
        console.error("Failed to fetch initial product data:", err);
      }
    };
    fetchInitialProducts();
  }, []);

  const setScreen = (screen) => {
    setState(prevState => ({ ...prevState, currentScreen: screen }));
  };

  const setSearchTerm = (term) => {
    setState(prevState => ({ ...prevState, searchTerm: term }));
  };

  const setCategoryFilter = (category) => {
    setState(prevState => ({ ...prevState, categoryFilter: category }));
  };

  const handleCreatorFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setState(prevState => {
      const newForm = { ...prevState.creatorForm };
      if (type === 'checkbox') {
        newForm.flavors = checked
          ? [...newForm.flavors, value]
          : newForm.flavors.filter(flavor => flavor !== value);
      } else {
        newForm[name] = value;
      }
      return { ...prevState, creatorForm: newForm };
    });
  };

  const addProduct = (newProduct) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  const value = {
    state,
    loading,
    error,
    aiSuggestions,
    currentStep,
    products,
    setScreen,
    setSearchTerm,
    setCategoryFilter,
    handleCreatorFormChange,
    setCurrentStep,
    setLoading,
    setError,
    setAiSuggestions,
    addProduct,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};