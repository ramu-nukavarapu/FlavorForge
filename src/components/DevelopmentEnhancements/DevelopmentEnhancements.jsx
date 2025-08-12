import { CheckCircle2, Link } from 'lucide-react';

const frontendEnhancements = [
  'Refactored API calls into a dedicated `services/api.js` file for better code organization and reusability.',
  'Integrated `react-hot-toast` for user-friendly notifications on API success or failure, improving user experience.',
  'Implemented a new `ProductCreator` component with a multi-step form and `StepIndicator` for a guided user flow.',
  'Used `recharts` to visualize market trends on the dashboard with an interactive bar chart.',
  'Applied Tailwind CSS for a modern, responsive, and consistent design across the application.',
  'Set up a project structure with separate folders for `components`, `services`, and `context` to follow best practices and improve maintainability.',
  'Created a new `DevelopmentEnhancements` page to document project updates.',
];

const backendEnhancements = {
  description: "The backend was built using FastAPI, providing a set of well-defined API endpoints to manage product data, market trends, and dashboard metrics. It includes:",
  features: [
    'CRUD Operations: Endpoints for creating and retrieving product data.',
    'Dashboard Metrics: An endpoint to fetch key performance indicators like success rate and active users.',
    'Data Analysis: Endpoints for market trends and product analysis based on CSV data.',
    'Input Validation: The backend uses Pydantic models for robust data validation.',
  ],
  openapi_url: "https://flavorforge-backend.onrender.com/docs"
};

const DevelopmentEnhancements = () => {
  return (
    <div className="container p-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Development Enhancements</h1>
      <p className="mb-8 text-gray-700">
        This page documents the key changes and improvements made to the codebase.
      </p>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Frontend Enhancements</h2>
        <ul className="space-y-4">
          {frontendEnhancements.map((change, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle2 className="flex-shrink-0 mt-1 mr-3 text-green-500" size={20} />
              <span className="text-gray-800">{change}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 mt-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Backend Enhancements</h2>
        <p className="mb-4 text-gray-800">{backendEnhancements.description}</p>
        <ul className="space-y-4">
          {backendEnhancements.features.map((feature, index) => (
            <li key={index} className="flex items-start">
            <CheckCircle2 className="flex-shrink-0 mt-1 mr-3 text-green-500" size={20} />
              <span className="text-gray-800">{feature}</span>
              </li>
          ))}
        </ul>
        <div className="flex items-center mt-5">
          <Link className="mr-2 text-blue-600" size={20} />
          <a
            href={backendEnhancements.openapi_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:underline"
          >
            View OpenAPI Documentation
          </a>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentEnhancements;