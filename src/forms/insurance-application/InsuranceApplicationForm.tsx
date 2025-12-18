import { useRef, useState, useEffect } from 'react';
import { createForm } from '@reformer/core';
import type { FormNavigationHandle, FormNavigationConfig } from '@reformer/ui/form-navigation';
import {
  FormNavigation,
  FormNavigationStep,
  FormNavigationIndicator,
  FormNavigationActions,
} from '@reformer/ui/form-navigation';

import type { InsuranceApplicationForm as IInsuranceApplicationForm } from './type';
import { insuranceApplicationSchema } from './schema';
import { insuranceApplicationBehaviors } from './behaviors';
import { STEP_VALIDATIONS, fullValidation } from './validators';
import { fetchApplicationData, populateForm } from './mock-data';

import { InsuranceTypeStep } from './steps/insurance-type/InsuranceTypeStep';
import { InsuredPartyStep } from './steps/insured-party/InsuredPartyStep';
import { InsuranceObjectStep } from './steps/insurance-object/InsuranceObjectStep';
import { DriversBeneficiariesStep } from './steps/drivers-beneficiaries/DriversBeneficiariesStep';
import { HistoryStep } from './steps/history/HistoryStep';
import { ConfirmationStep } from './steps/confirmation/ConfirmationStep';
import { Button } from '@/components/ui/button';

// Шаги для индикатора
const STEPS = [
  { number: 1, title: 'Тип страхования' },
  { number: 2, title: 'Данные страхователя' },
  { number: 3, title: 'Объект страхования' },
  { number: 4, title: 'Водители / Выгодоприобретатели' },
  { number: 5, title: 'История страхования' },
  { number: 6, title: 'Подтверждение' },
];

// Создаём форму ВНЕ компонента (singleton)
const form = createForm<IInsuranceApplicationForm>({
  form: insuranceApplicationSchema,
  behavior: insuranceApplicationBehaviors,
  validation: fullValidation,
});

// Конфиг для FormNavigation
const config: FormNavigationConfig<IInsuranceApplicationForm> = {
  stepValidations: STEP_VALIDATIONS,
  fullValidation,
};

export function InsuranceApplicationForm() {
  const navRef = useRef<FormNavigationHandle<IInsuranceApplicationForm>>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Загрузка начальных данных при инициализации
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        console.log('Loading initial form data...');
        const data = await fetchApplicationData();
        console.log('Received data:', data);
        populateForm(form, data);
        console.log('Form populated successfully');
      } catch (error) {
        console.error('Failed to load initial data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleSubmit = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const values = form.getValue() as any;
    console.log('Form submitted:', values);
    // TODO: POST /api/insurance/applications
    alert('Заявка успешно отправлена!');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка данных заявки...</p>
        </div>
      </div>
    );
  }

  return (
    <FormNavigation ref={navRef} form={form} config={config}>
      <div className="space-y-6">
        {/* Step indicator */}
        <FormNavigationIndicator steps={STEPS}>
          {({ steps, goToStep, currentStep, totalSteps }) => (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {steps.map((step) => (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => step.canNavigate && goToStep(step.number)}
                    disabled={!step.canNavigate}
                    className={`
                      flex flex-col items-center gap-2 group cursor-pointer
                      ${step.isCurrent ? 'text-blue-600' : step.isCompleted ? 'text-green-600' : 'text-gray-400'}
                      ${!step.canNavigate ? 'cursor-not-allowed' : ''}
                    `}
                  >
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                        transition-colors duration-200
                        ${step.isCurrent ? 'bg-blue-600 text-white' : ''}
                        ${step.isCompleted ? 'bg-green-600 text-white' : ''}
                        ${!step.isCurrent && !step.isCompleted ? 'bg-gray-200 text-gray-600' : ''}
                        ${step.canNavigate ? 'group-hover:ring-2 group-hover:ring-offset-2' : ''}
                        ${step.isCurrent && step.canNavigate ? 'group-hover:ring-blue-600' : ''}
                        ${step.isCompleted && step.canNavigate ? 'group-hover:ring-green-600' : ''}
                        ${!step.isCurrent && !step.isCompleted && step.canNavigate ? 'group-hover:ring-gray-400' : ''}
                      `}
                    >
                      {step.isCompleted ? '✓' : step.number}
                    </div>
                    <span className="text-xs text-center max-w-[80px] hidden md:block">
                      {step.title}
                    </span>
                  </button>
                ))}
              </div>

              {/* Progress bar */}
              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                />
              </div>

              {/* Current step title */}
              <div className="text-center mt-6">
                <span className="text-sm text-gray-500">
                  Шаг {currentStep} из {totalSteps}
                </span>
                <h1 className="text-2xl font-bold">
                  {steps.find((s) => s.isCurrent)?.title}
                </h1>
              </div>
            </div>
          )}
        </FormNavigationIndicator>

        {/* Step content */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <FormNavigationStep component={InsuranceTypeStep} control={form} />
          <FormNavigationStep component={InsuredPartyStep} control={form} />
          <FormNavigationStep component={InsuranceObjectStep} control={form} />
          <FormNavigationStep component={DriversBeneficiariesStep} control={form} />
          <FormNavigationStep component={HistoryStep} control={form} />
          <FormNavigationStep component={ConfirmationStep} control={form} />
        </div>

        {/* Navigation buttons */}
        <FormNavigationActions onSubmit={handleSubmit}>
          {({ prev, next, submit, isFirstStep, isLastStep, isValidating, isSubmitting }) => (
            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={prev.onClick}
                disabled={prev.disabled || isFirstStep}
              >
                Назад
              </Button>

              {!isLastStep ? (
                <Button type="button" onClick={next.onClick} disabled={next.disabled || isValidating}>
                  {isValidating ? 'Проверка...' : 'Далее'}
                </Button>
              ) : (
                <Button type="button" onClick={submit.onClick} disabled={submit.disabled || isSubmitting}>
                  {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                </Button>
              )}
            </div>
          )}
        </FormNavigationActions>
      </div>
    </FormNavigation>
  );
}
