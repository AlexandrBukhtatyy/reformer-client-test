// Insurance Application Form - Main Component
import { useRef } from 'react';
import { createForm, type FormSchema } from '@reformer/core';
import {
  FormNavigation,
  useFormNavigation,
  type FormNavigationHandle,
  type FormNavigationConfig,
} from '@reformer/ui';
import { Button } from '@/components/ui/button';
import type { InsuranceApplicationForm as FormType } from './types';
import { defaultFormValues } from './types';
import {
  step1Validation,
  step2Validation,
  step3Validation,
  step4Validation,
  step5Validation,
  step6Validation,
} from './validation';
import { formBehaviors } from './behaviors';
import {
  Step1InsuranceType,
  Step2InsuredParty,
  Step3InsuranceObject,
  Step4DriversAndBeneficiaries,
  Step5History,
  Step6Confirmation,
} from './components';

// Step titles for display
const stepTitles = [
  'Тип страхования',
  'Данные страхователя',
  'Объект страхования',
  'Водители и застрахованные',
  'История',
  'Подтверждение',
];

// Full validation combining all steps
const fullValidation = (path: Parameters<typeof step1Validation>[0]) => {
  step1Validation(path);
  step2Validation(path);
  step3Validation(path);
  step4Validation(path);
  step5Validation(path);
  step6Validation(path);
};

// Form navigation config with step validations
const navigationConfig: FormNavigationConfig<FormType> = {
  stepValidations: {
    1: step1Validation,
    2: step2Validation,
    3: step3Validation,
    4: step4Validation,
    5: step5Validation,
    6: step6Validation,
  },
  fullValidation,
};

// Create form instance using cast (FormSchema requires FieldConfig objects)
// We use the simpler approach: cast values to FormSchema and apply schemas separately
const form = createForm<FormType>(defaultFormValues as unknown as FormSchema<FormType>);

// Apply validation and behaviors
form.applyValidationSchema(fullValidation);
form.applyBehaviorSchema(formBehaviors);

interface InsuranceApplicationFormProps {
  onSubmit?: (data: FormType) => void;
  initialData?: Partial<FormType>;
}

// Navigation controls component (used inside FormNavigation)
function NavigationControls({ onSubmit }: { onSubmit?: (data: FormType) => void }) {
  const {
    currentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    completedSteps,
    isValidating,
    form,
  } = useFormNavigation<FormType>();

  const handleNext = async () => {
    await goToNextStep();
  };

  const handleSubmit = async () => {
    const isValid = await goToNextStep();
    if (isValid) {
      const formData = form.getValue();
      console.log('Form submitted:', formData);
      onSubmit?.(formData);
      alert('Заявка успешно отправлена!');
    }
  };

  const handleStepClick = (stepIndex: number) => {
    goToStep(stepIndex + 1); // API uses 1-based indexing
  };

  return (
    <>
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {stepTitles.map((title, index) => {
            const stepNumber = index + 1;
            const isCompleted = completedSteps.includes(stepNumber);
            const isCurrent = stepNumber === currentStep;
            const canNavigate = isCompleted || stepNumber <= currentStep;

            return (
              <div
                key={index}
                className="flex flex-col items-center flex-1"
                onClick={() => canNavigate && handleStepClick(index)}
              >
                {/* Step Circle */}
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                    transition-colors cursor-pointer
                    ${
                      isCurrent
                        ? 'bg-blue-600 text-white'
                        : isCompleted
                          ? 'bg-green-500 text-white'
                          : canNavigate
                            ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  {isCompleted && !isCurrent ? '✓' : stepNumber}
                </div>

                {/* Step Title */}
                <span
                  className={`
                    mt-2 text-xs text-center max-w-[80px]
                    ${isCurrent ? 'text-blue-600 font-medium' : 'text-gray-500'}
                  `}
                >
                  {title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        {/* Step Counter */}
        <div className="mt-2 text-center text-sm text-gray-500">
          Шаг {currentStep} из {totalSteps}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={goToPreviousStep}
          disabled={isFirstStep}
        >
          ← Назад
        </Button>

        <div className="flex gap-2">
          {!isLastStep ? (
            <Button type="button" onClick={handleNext} disabled={isValidating}>
              {isValidating ? 'Проверка...' : 'Далее →'}
            </Button>
          ) : (
            <Button type="button" onClick={handleSubmit} disabled={isValidating}>
              {isValidating ? 'Проверка...' : 'Отправить заявку'}
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export function InsuranceApplicationForm({
  onSubmit,
  initialData,
}: InsuranceApplicationFormProps) {
  const navigationRef = useRef<FormNavigationHandle<FormType>>(null);

  // Initialize form with initial data if provided
  if (initialData) {
    form.patchValue(initialData);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Form Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-center mb-2">
          Заявка на страхование
        </h1>
        <p className="text-gray-600 text-center">
          Заполните форму для оформления страхового полиса
        </p>
      </div>

      <FormNavigation
        ref={navigationRef}
        form={form}
        config={navigationConfig}
        scrollToTop={true}
      >
        {/* Progress and Navigation at top */}
        <NavigationControls onSubmit={onSubmit} />

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <FormNavigation.Step component={Step1InsuranceType} control={form} />
          <FormNavigation.Step component={Step2InsuredParty} control={form} />
          <FormNavigation.Step component={Step3InsuranceObject} control={form} />
          <FormNavigation.Step component={Step4DriversAndBeneficiaries} control={form} />
          <FormNavigation.Step component={Step5History} control={form} />
          <FormNavigation.Step component={Step6Confirmation} control={form} />
        </div>
      </FormNavigation>
    </div>
  );
}
