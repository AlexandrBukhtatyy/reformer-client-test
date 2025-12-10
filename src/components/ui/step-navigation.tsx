import React from 'react';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
  onStepChange: (step: number) => void;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  totalSteps,
  stepTitles,
  onStepChange
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress bar */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2 -z-10"></div>
        <div
          className="absolute top-1/2 left-0 h-1 bg-blue-500 transform -translate-y-1/2 -z-10 transition-all duration-300 ease-in-out"
          style={{
            width: totalSteps > 1 ? `${(currentStep / (totalSteps - 1)) * 100}%` : '100%'
          }}
        ></div>
        
        {/* Step indicators */}
        <div className="flex items-center justify-between w-full">
          {stepTitles.map((title, index) => (
            <div key={index} className="flex flex-col items-center z-10">
              <button
                onClick={() => onStepChange(index)}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index <= currentStep
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
                disabled={index > currentStep}
                type="button"
              >
                {index + 1}
              </button>
              <span 
                className={`mt-2 text-sm text-center max-w-[100px] ${
                  index === currentStep 
                    ? 'font-semibold text-blue-500' 
                    : index < currentStep 
                      ? 'text-gray-600' 
                      : 'text-gray-400'
                }`}
              >
                {title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};