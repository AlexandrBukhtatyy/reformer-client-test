// Insurance Application Form - Main Component
import { useRef, useMemo } from 'react';
import { createForm } from '@reformer/core';
import { FormNavigation, type FormNavigationHandle } from '@reformer/ui/form-navigation';
import type { InsuranceApplicationForm as InsuranceFormType } from './type';
import { insuranceApplicationSchema } from './schema';
import { insuranceApplicationBehaviors } from './behaviors';
import { STEP_VALIDATIONS, fullValidation } from './validators';
import {
  Step1InsuranceType,
  Step2PolicyholderData,
  Step3InsuranceObject,
  Step4DriversAndBeneficiaries,
  Step5History,
  Step6CalculationAndConfirmation,
} from './steps';

// Step definitions for indicator
const STEPS = [
  { number: 1, title: 'Тип страхования' },
  { number: 2, title: 'Данные страхователя' },
  { number: 3, title: 'Объект страхования' },
  { number: 4, title: 'Водители/Выгодоприобретатели' },
  { number: 5, title: 'История' },
  { number: 6, title: 'Расчет и подтверждение' },
];

export function InsuranceApplicationForm() {
  // Create form instance with schema, behaviors, and validation
  const form = useMemo(
    () =>
      createForm<InsuranceFormType>({
        form: insuranceApplicationSchema,
        behavior: insuranceApplicationBehaviors,
        validation: fullValidation,
      }),
    []
  );

  // Ref for programmatic navigation control
  const navRef = useRef<FormNavigationHandle<InsuranceFormType>>(null);

  // Form navigation config
  const config = useMemo(
    () => ({
      stepValidations: STEP_VALIDATIONS,
      fullValidation,
    }),
    []
  );

  // Handle form submission
  const handleSubmit = async () => {
    const values = form.value;
    console.log('Form submitted:', values);
    alert('Заявка успешно отправлена! Номер полиса: INS-' + Date.now());
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Заявка на страхование
      </h1>

      <FormNavigation
        ref={navRef}
        form={form}
        config={config}
        scrollToTop={true}
        onStepChange={(step) => console.log('Step changed to:', step)}
      >
        {/* Progress Indicator */}
        <FormNavigation.Indicator steps={STEPS}>
          {({ steps, goToStep, currentStep }) => (
            <div className="mb-8">
              {/* Step indicators */}
              <div className="flex justify-between items-center mb-4">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className={`flex flex-col items-center cursor-pointer ${
                      step.isCurrent
                        ? 'text-blue-600'
                        : step.isCompleted
                        ? 'text-green-600'
                        : 'text-gray-400'
                    }`}
                    onClick={() => step.canNavigate && goToStep(step.number)}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                        step.isCurrent
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : step.isCompleted
                          ? 'border-green-600 bg-green-600 text-white'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      {step.isCompleted ? '✓' : step.number}
                    </div>
                    <span className="text-xs mt-1 text-center max-w-[80px] hidden md:block">
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />
              </div>
            </div>
          )}
        </FormNavigation.Indicator>

        {/* Current Step Display */}
        <FormNavigation.Progress>
          {({ current, total }) => (
            <div className="text-center text-sm text-gray-500 mb-4">
              Шаг {current} из {total}: {STEPS[current - 1]?.title}
            </div>
          )}
        </FormNavigation.Progress>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <FormNavigation.Step component={Step1InsuranceType} control={form} />
          <FormNavigation.Step component={Step2PolicyholderData} control={form} />
          <FormNavigation.Step component={Step3InsuranceObject} control={form} />
          <FormNavigation.Step component={Step4DriversAndBeneficiaries} control={form} />
          <FormNavigation.Step component={Step5History} control={form} />
          <FormNavigation.Step component={Step6CalculationAndConfirmation} control={form} />
        </div>

        {/* Navigation Actions */}
        <FormNavigation.Actions onSubmit={handleSubmit}>
          {({ prev, next, submit, isLastStep, isValidating }) => (
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prev.onClick}
                disabled={prev.disabled}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  prev.disabled
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                ← Назад
              </button>

              {isLastStep ? (
                <button
                  type="button"
                  onClick={submit.onClick}
                  disabled={submit.disabled}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    submit.disabled
                      ? 'bg-green-300 cursor-wait'
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white`}
                >
                  {submit.isSubmitting ? 'Отправка...' : isValidating ? 'Проверка...' : 'Отправить заявку'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={next.onClick}
                  disabled={next.disabled}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    next.disabled
                      ? 'bg-blue-300 cursor-wait'
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white`}
                >
                  {isValidating ? 'Проверка...' : 'Далее →'}
                </button>
              )}
            </div>
          )}
        </FormNavigation.Actions>
      </FormNavigation>
    </div>
  );
}
