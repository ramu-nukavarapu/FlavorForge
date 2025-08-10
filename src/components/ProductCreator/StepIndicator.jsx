import React from 'react';

const StepIndicator = ({ currentStep }) => {
  const steps = [1, 2, 3, 4];
  const stepTitles = ['Category', 'Demographics', 'Flavors', 'Suggestions'];

  return (
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-semibold">Create Product</h3>
      <div className="flex items-center gap-4">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-colors ${
                  step <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                {step}
              </div>
              <span className="mt-2 text-sm text-gray-600 hidden md:block">{stepTitles[index]}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 h-px transition-colors ${step < currentStep ? 'bg-blue-600' : 'bg-gray-300'}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;