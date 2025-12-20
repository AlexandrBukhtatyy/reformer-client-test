import React from 'react';
import type { GroupNodeWithControls } from '@reformer/core';
import { insuranceApplicationForm } from './schemas/form-schema';
import Step1Form from './steps/Step1';
import Step2Form from './steps/Step2';
import Step3Form from './steps/Step3';
import Step4Form from './steps/Step4';
import Step5Form from './steps/Step5';
import Step6Form from './steps/Step6';
import type { InsuranceApplicationForm } from './schemas/form-schema';
import { FormNavigation } from './components/FormNavigation';

// Define step components
const stepComponents = [
  Step1Form,
  Step2Form,
  Step3Form,
  Step4Form,
  Step5Form,
  Step6Form,
];

interface InsuranceApplicationFormProps {
  initialData?: Partial<InsuranceApplicationForm>;
}

const InsuranceApplicationFormComponent: React.FC<InsuranceApplicationFormProps> = ({ 
  initialData 
}) => {
  // In a real implementation, we would initialize the form with initialData
  // For now, we'll use the form as created
  
  const [currentStep, setCurrentStep] = React.useState(0);
  const form = insuranceApplicationForm;

  const goToNextStep = () => {
    if (currentStep < stepComponents.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Validate the entire form before submission
    const isValid = await form.validate();
    if (isValid) {
      // Submit the form
      await form.submit((values) => {
        console.log('Form submitted:', values);
        // In a real app, you would send the data to your API
      });
    } else {
      // Mark all fields as touched to show validation errors
      form.markAsTouched();
    }
  };

  const CurrentStepComponent = stepComponents[currentStep];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Заявка на страхование</h1>
        <p className="text-gray-600">Шаг {currentStep + 1} из {stepComponents.length}</p>
      </div>

      <FormNavigation 
        currentStep={currentStep} 
        totalSteps={stepComponents.length}
        onStepChange={setCurrentStep}
      />

      <div className="mt-8">
        <CurrentStepComponent form={form as GroupNodeWithControls<InsuranceApplicationForm>} />
      </div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={goToPreviousStep}
          disabled={currentStep === 0}
          className={`px-4 py-2 rounded-md ${
            currentStep === 0 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Назад
        </button>
        
        {currentStep < stepComponents.length - 1 ? (
          <button
            type="button"
            onClick={goToNextStep}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Далее
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Отправить заявку
          </button>
        )}
      </div>
    </div>
  );
};

export default InsuranceApplicationFormComponent;