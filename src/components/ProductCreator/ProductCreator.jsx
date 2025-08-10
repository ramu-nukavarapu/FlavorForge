import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { getAiSuggestions } from '../../services/api';
import StepIndicator from './StepIndicator';
import toast from 'react-hot-toast'; 

const ProductCreator = () => {
  const { setLoading, setError, loading, error, setScreen, addProduct } = useAppContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [creatorForm, setCreatorForm] = useState({
    category: '',
    ageGroup: '',
    region: '',
    flavors: [],
  });
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  const handleCreatorFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCreatorForm(prevState => {
      const newForm = { ...prevState };
      if (type === 'checkbox') {
        newForm.flavors = checked
          ? [...newForm.flavors, value]
          : newForm.flavors.filter(flavor => flavor !== value);
      } else {
        newForm[name] = value;
      }
      return newForm;
    });
  };

  const validateStep = () => {
    const errors = {};
    if (currentStep === 1 && !creatorForm.category) {
      errors.category = 'Please select a category.';
    }
    if (currentStep === 2 && (!creatorForm.ageGroup || !creatorForm.region)) {
      errors.demographics = 'Please select both age group and region.';
    }
    if (currentStep === 3 && creatorForm.flavors.length === 0) {
      errors.flavors = 'Please select at least one flavor.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = async () => {
    if (validateStep()) {
      if (currentStep === 3) {
        setLoading(true);
        setError(null);
        try {
          const suggestions = await getAiSuggestions(creatorForm);
          setAiSuggestions(suggestions);
          setCurrentStep(currentStep + 1);
        } catch (err) {
          setError('Failed to fetch AI suggestions.');
          toast.error('Failed to fetch AI suggestions.'); 
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    setCurrentStep(Math.max(1, currentStep - 1));
    setFormErrors({});
  };
  
  const handleCreateProduct = () => {
    if (!selectedSuggestion) {
      toast.error('Please select a product concept before creating.');
      return;
    }
    const newProduct = {
      id: Date.now(),
      name: selectedSuggestion.name,
      category: creatorForm.category,
      score: selectedSuggestion.score,
      status: 'Testing',
      created: new Date().toISOString().slice(0, 10),
    };
    
    addProduct(newProduct);
    toast.success(`Product "${selectedSuggestion.name}" created successfully!`);
    setScreen('analysis');
    setCurrentStep(1);
    setCreatorForm({
      category: '',
      ageGroup: '',
      region: '',
      flavors: [],
    });
    setAiSuggestions([]);
    setSelectedSuggestion(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">Create New Product</h2>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <StepIndicator currentStep={currentStep} />
        </div>

        <div className="p-6">
          {currentStep === 1 && (
            <div>
              <h3 className="text-xl font-medium mb-4">Select Product Category</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['Beverages', 'Snacks', 'Dairy', 'Cereals', 'Frozen Foods', 'Confectionery'].map(category => (
                  <button
                    key={category}
                    onClick={() => handleCreatorFormChange({ target: { name: 'category', value: category } })}
                    className={`p-6 border-2 rounded-lg text-center transition-colors ${
                      creatorForm.category === category
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="w-8 h-8 bg-gray-300 mx-auto mb-2 rounded-md"></div>
                    <p className="font-medium">{category}</p>
                  </button>
                ))}
              </div>
              {formErrors.category && <p className="mt-2 text-red-500 text-sm">{formErrors.category}</p>}
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3 className="text-xl font-medium mb-4">Target Demographics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age Group</label>
                  <select
                    name="ageGroup"
                    value={creatorForm.ageGroup}
                    onChange={handleCreatorFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select an age group</option>
                    <option>18-25</option>
                    <option>26-35</option>
                    <option>36-45</option>
                    <option>46-60</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                  <select
                    name="region"
                    value={creatorForm.region}
                    onChange={handleCreatorFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a region</option>
                    <option>North America</option>
                    <option>Europe</option>
                    <option>Asia Pacific</option>
                    <option>Latin America</option>
                  </select>
                </div>
              </div>
              {formErrors.demographics && <p className="mt-2 text-red-500 text-sm">{formErrors.demographics}</p>}
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h3 className="text-xl font-medium mb-4">Flavor Preferences</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Sweet', 'Spicy', 'Salty', 'Sour', 'Bitter', 'Umami', 'Fruity', 'Herbal'].map(flavor => (
                  <label
                    key={flavor}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      creatorForm.flavors.includes(flavor)
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="flavors"
                      value={flavor}
                      checked={creatorForm.flavors.includes(flavor)}
                      onChange={handleCreatorFormChange}
                      className="form-checkbox text-blue-600 rounded"
                    />
                    <span className="ml-3 text-gray-700">{flavor}</span>
                  </label>
                ))}
              </div>
              {formErrors.flavors && <p className="mt-2 text-red-500 text-sm">{formErrors.flavors}</p>}
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h3 className="text-xl font-medium mb-4">AI Generated Suggestions</h3>
              {loading && <p className="text-center py-4">Generating suggestions...</p>}
              {error && <p className="text-center py-4 text-red-500">Error: {error}</p>}
              {!loading && !error && (
                <div className="flex flex-col gap-4">
                  {aiSuggestions.map((suggestion, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedSuggestion(suggestion)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedSuggestion && selectedSuggestion.name === suggestion.name
                          ? 'border-blue-600 ring-2 ring-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-lg">{suggestion.name}</h4>
                        <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                          Score: {suggestion.score}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{suggestion.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">High Demand</span>
                          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">Trending</span>
                        </div>
                        <button
                          onClick={() => setSelectedSuggestion(suggestion)}
                          className="text-blue-600 font-medium hover:underline"
                        >
                          {selectedSuggestion && selectedSuggestion.name === suggestion.name ? 'Selected' : 'Select This Concept'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-6 flex justify-between border-t border-gray-200 mt-4">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="py-2 px-6 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={currentStep === 4 ? handleCreateProduct : handleNext}
            disabled={loading || (currentStep === 4 && !selectedSuggestion)}
            className={`py-2 px-6 rounded-lg font-medium text-white transition-colors ${
              currentStep === 4 ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? 'Processing...' : currentStep === 4 ? 'Create Product' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCreator;