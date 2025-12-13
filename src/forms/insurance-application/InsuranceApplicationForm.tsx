import { createForm } from '@reformer/core';
import { useStepForm } from '@/hooks/useStepForm';
import { Step1Form } from './steps/step1/Step1Form';
import { Step2Form } from './steps/step2/Step2Form';
import { Step3Form } from './steps/step3/Step3Form';
import { Step4Form } from './steps/step4/Step4Form';
import { Step5Form } from './steps/step5/Step5Form';
import { Step6Form } from './steps/step6/Step6Form';
import { insuranceApplicationSchema } from './formSchema';
import { insuranceApplicationValidation } from './formValidators';
import { insuranceApplicationBehavior } from './formBehaviors';
import type { InsuranceApplicationForm } from './type';

interface InsuranceApplicationFormProps {
  initialData?: Partial<InsuranceApplicationForm>;
  onSubmit: (data: InsuranceApplicationForm) => void;
}

export function InsuranceApplicationForm({ 
  initialData, 
  onSubmit 
}: InsuranceApplicationFormProps) {
  // Create the main form with all steps
  const form = createForm<InsuranceApplicationForm>({
    form: insuranceApplicationSchema,
    validation: insuranceApplicationValidation,
    behavior: insuranceApplicationBehavior,
    initialValues: initialData
  });

  // Initialize step forms
  const stepForms = [
    form.step1,
    form.step2,
    form.step3,
    form.step4,
    form.step5,
    form.step6
  ];

  // Use step form navigation
  const {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    isLastStep,
    isFirstStep,
    validateCurrentStep
  } = useStepForm(stepForms);

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      await nextStep();
    }
  };

  const handleSubmit = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && isLastStep) {
      onSubmit(form.getValue());
    }
  };

  const stepTitles = [
    'Тип страхования',
    'Данные страхователя',
    'Объект страхования',
    'Водители/Выгодоприобретатели',
    'История и доп. информация',
    'Расчет и подтверждение'
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Заявление на страхование</h1>
        <p className="text-gray-600">Заполните все шаги для оформления полиса</p>
      </div>

      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {stepTitles.map((title, index) => (
            <div key={index} className="flex items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index === currentStep 
                    ? 'bg-blue-600 text-white' 
                    : index < currentStep 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => goToStep(index)}
                style={{ cursor: index <= currentStep ? 'pointer' : 'default' }}
              >
                {index + 1}
              </div>
              {index < stepTitles.length - 1 && (
                <div className={`h-1 w-16 ${index < currentStep ? 'bg-green-600' : 'bg-gray-200'}`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          {stepTitles.map((title, index) => (
            <div 
              key={index} 
              className={`text-center ${index <= currentStep ? 'text-blue-600 font-medium' : ''}`}
              style={{ width: `${100 / stepTitles.length}%` }}
              onClick={() => goToStep(index)}
              style={{ cursor: index <= currentStep ? 'pointer' : 'default' }}
            >
              {title}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {currentStep === 0 && <Step1Form form={form.step1} />}
        {currentStep === 1 && <Step2Form form={form.step2} />}
        {currentStep === 2 && <Step3Form form={form.step3} insuranceType={form.step1.insuranceType.value.value} />}
        {currentStep === 3 && <Step4Form form={form.step4} insuranceType={form.step1.insuranceType.value.value} />}
        {currentStep === 4 && <Step5Form form={form.step5} />}
        {currentStep === 5 && <Step6Form form={form.step6} />}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          disabled={isFirstStep}
          className={`px-4 py-2 rounded-md ${
            isFirstStep 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-gray-600 text-white hover:bg-gray-700'
          }`}
        >
          Назад
        </button>

        {isLastStep ? (
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Подать заявку
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Далее
          </button>
        )}
      </div>
    </div>
  );
}