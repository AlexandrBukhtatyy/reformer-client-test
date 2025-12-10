import React, { useState, useMemo } from 'react';
import { createForm } from '@reformer/core';
import { StepNavigation } from '@/components/ui/step-navigation';
import { Step1 } from './steps/step1';
import { Step2 } from './steps/step2';
import { Step3 } from './steps/step3';
import { Step4 } from './steps/step4';
import { Step5 } from './steps/step5';
import { Step6 } from './steps/step6';
import { insuranceApplicationSchema } from './schema';
import { insuranceApplicationValidation } from './validators';
import { insuranceApplicationBehavior } from './behaviors';
import type { InsuranceApplicationForm as InsuranceFormType } from './type';

// Define step titles
const STEP_TITLES = [
  'Тип страхования и параметры',
  'Данные страхователя',
  'Объект страхования',
  'Водители и выгодоприобретатели',
  'История и дополнительная информация',
  'Расчет и подтверждение'
];

export const InsuranceApplicationForm: React.FC = () => {
  // Create form instance with schema, validation and behavior
  const form = useMemo(() => {
    return createForm<InsuranceFormType>({
      form: insuranceApplicationSchema,
      validation: insuranceApplicationValidation,
      behavior: insuranceApplicationBehavior
    });
  }, []);

  const [currentStep, setCurrentStep] = useState(0);

  // Handle next step
  const handleNext = () => {
    // Check if current step is valid before proceeding
    if (currentStep < STEP_TITLES.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Handle previous step
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    // Submit the form data
    console.log('Form submitted:', form.getValues());
    alert('Форма успешно отправлена!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Форма заявления на страхование</h1>
      
      {/* Step Navigation */}
      <StepNavigation
        currentStep={currentStep}
        totalSteps={STEP_TITLES.length}
        stepTitles={STEP_TITLES}
        onStepChange={setCurrentStep}
      />
      
      {/* Step Content */}
      <div className="mt-8">
        {currentStep === 0 && <Step1 control={form} />}
        {currentStep === 1 && <Step2 control={form} />}
        {currentStep === 2 && <Step3 control={form} />}
        {currentStep === 3 && <Step4 control={form} />}
        {currentStep === 4 && <Step5 control={form} />}
        {currentStep === 5 && <Step6 control={form} />}
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className={`px-6 py-2 rounded-md ${
            currentStep === 0
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Назад
        </button>
        
        {currentStep < STEP_TITLES.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Далее
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
          >
            Отправить заявку
          </button>
        )}
      </div>
    </div>
  );
};