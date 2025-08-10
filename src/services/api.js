// src/services/api.js

export const getDashboardData = async () => {
  return dashboardData;
};

export const getProductsData = async () => {
  return productsData;
};

export const getTrendsData = async () => {
  return trendsData;
};

export const getCompetitorsData = async () => {
  return competitorsData;
};

export const getAiSuggestions = async (formData) => {
  // In a real app, send formData to the API to get suggestions
  console.log("Fetching AI suggestions for:", formData);
  return aiSuggestions;
};

// Mock Data to be used in the API service
const mockData = {
  dashboardData: {
    totalProducts: 247,
    successRate: 87,
    activeUsers: 1432,
    trendingCategories: 5,
    growthMetrics: {
      productsGrowth: 12,
      successRateGrowth: 3,
      usersGrowth: 8
    },
    chartData: [
      { month: 'Jan', beverages: 65, snacks: 45, dairy: 30 },
      { month: 'Feb', beverages: 70, snacks: 50, dairy: 35 },
      { month: 'Mar', beverages: 75, snacks: 55, dairy: 40 },
      { month: 'Apr', beverages: 80, snacks: 60, dairy: 45 }
    ]
  },
  productsData: [
    { id: 1, name: 'Spiced Turmeric Latte', category: 'Beverages', score: 92, status: 'Active', created: '2024-08-01' },
    { id: 2, name: 'Coconut Quinoa Bites', category: 'Snacks', score: 87, status: 'Testing', created: '2024-07-28' },
    { id: 3, name: 'Green Tea Yogurt', category: 'Dairy', score: 94, status: 'Active', created: '2024-07-25' },
    { id: 4, name: 'Mango Chili Chips', category: 'Snacks', score: 89, status: 'Active', created: '2024-07-20' },
    { id: 5, name: 'Oat Milk Matcha', category: 'Beverages', score: 91, status: 'Active', created: '2024-07-15' },
    { id: 6, name: 'Protein Chickpea Pasta', category: 'Cereals', score: 85, status: 'Testing', created: '2024-07-10' },
    { id: 7, name: 'Hibiscus Ginger Tea', category: 'Beverages', score: 88, status: 'Active', created: '2024-07-05' },
    { id: 8, name: 'Dark Chocolate Quinoa', category: 'Confectionery', score: 93, status: 'Active', created: '2024-06-30' }
  ],
  trendsData: {
    trendingIngredients: [
      { name: 'Turmeric', score: 85, growth: '+12%' },
      { name: 'Green Tea', score: 78, growth: '+8%' },
      { name: 'Coconut', score: 72, growth: '+15%' },
      { name: 'Quinoa', score: 68, growth: '+6%' }
    ],
    regionalData: [
      { region: 'North America', percentage: 35 },
      { region: 'Europe', percentage: 28 },
      { region: 'Asia Pacific', percentage: 25 },
      { region: 'Others', percentage: 12 }
    ],
    timelineData: [
      { month: 'Jan', healthy: 65, organic: 45, plantBased: 30, functional: 25 },
      { month: 'Feb', healthy: 70, organic: 50, plantBased: 35, functional: 30 },
      { month: 'Mar', healthy: 75, organic: 55, plantBased: 40, functional: 35 },
      { month: 'Apr', healthy: 80, organic: 60, plantBased: 45, functional: 40 },
      { month: 'May', healthy: 78, organic: 65, plantBased: 50, functional: 45 },
      { month: 'Jun', healthy: 85, organic: 70, plantBased: 55, functional: 50 }
    ]
  },
  competitorsData: [
    { company: 'NaturalFoods Inc', products: 45, score: 87, trend: '+5%' },
    { company: 'HealthyBites Co', products: 32, score: 82, trend: '+3%' },
    { company: 'GreenTech Foods', products: 28, score: 79, trend: '-1%' }
  ],
  aiSuggestions: [
    { name: 'Turmeric Ginger Energy Drink', score: 94, description: 'Health-focused beverage with anti-inflammatory properties' },
    { name: 'Spiced Coconut Refresher', score: 89, description: 'Tropical flavor with warming spices for mass appeal' },
    { name: 'Green Tea Mint Fusion', score: 87, description: 'Calming blend targeting wellness-conscious consumers' }
  ]
};

export const {
  dashboardData,
  productsData,
  trendsData,
  competitorsData,
  aiSuggestions
} = mockData;