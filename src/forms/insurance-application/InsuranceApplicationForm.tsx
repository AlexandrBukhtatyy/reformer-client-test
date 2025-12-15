import { useState, useEffect } from 'react';
import { createForm, validateForm } from '@reformer/core';
import type { ValidationSchemaFn } from '@reformer/core';
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

const STEP_TITLES = [
  'Тип страхования',
  'Данные страхователя',
  'Объект страхования',
  'Водители / Выгодоприобретатели',
  'История страхования',
  'Подтверждение',
];

// Создаём форму ВНЕ компонента (singleton)
const form = createForm<IInsuranceApplicationForm>({
  form: insuranceApplicationSchema,
  behavior: insuranceApplicationBehaviors,
  validation: fullValidation,
});

export function InsuranceApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const totalSteps = 6;

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

  const goToNextStep = async () => {
    const validation = STEP_VALIDATIONS[currentStep] as ValidationSchemaFn<IInsuranceApplicationForm>;
    if (validation) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const isValid = await validateForm(form as any, validation as any);
      if (!isValid) {
        form.markAsTouched();
        return;
      }
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = async (step: number) => {
    // Разрешаем переход только на предыдущие шаги без валидации
    if (step < currentStep) {
      setCurrentStep(step);
      return;
    }

    // Для перехода вперёд валидируем все промежуточные шаги
    for (let i = currentStep; i < step; i++) {
      const validation = STEP_VALIDATIONS[i] as ValidationSchemaFn<IInsuranceApplicationForm>;
      if (validation) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const isValid = await validateForm(form as any, validation as any);
        if (!isValid) {
          form.markAsTouched();
          setCurrentStep(i);
          return;
        }
      }
    }

    setCurrentStep(step);
  };

  const handleSubmit = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isValid = await validateForm(form as any, fullValidation as any);

    if (!isValid) {
      form.markAsTouched();
      return;
    }

    setIsSubmitting(true);

    try {
      await form.submit(async (values: IInsuranceApplicationForm) => {
        console.log('Form submitted:', values);
        // TODO: POST /api/insurance/applications
        alert('Заявка успешно отправлена!');
      });
    } catch (error) {
      console.error('Submit error:', error);
      alert('Ошибка при отправке заявки');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <InsuranceTypeStep control={form} />;
      case 2:
        return <InsuredPartyStep control={form} />;
      case 3:
        return <InsuranceObjectStep control={form} />;
      case 4:
        return <DriversBeneficiariesStep control={form} />;
      case 5:
        return <HistoryStep control={form} />;
      case 6:
        return <ConfirmationStep control={form} />;
      default:
        return null;
    }
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
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {STEP_TITLES.map((title, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;

            return (
              <button
                key={stepNumber}
                type="button"
                onClick={() => goToStep(stepNumber)}
                className={`
                  flex flex-col items-center gap-2 group cursor-pointer
                  ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}
                `}
              >
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                    transition-colors duration-200
                    ${isActive ? 'bg-blue-600 text-white' : ''}
                    ${isCompleted ? 'bg-green-600 text-white' : ''}
                    ${!isActive && !isCompleted ? 'bg-gray-200 text-gray-600' : ''}
                    group-hover:ring-2 group-hover:ring-offset-2
                    ${isActive ? 'group-hover:ring-blue-600' : ''}
                    ${isCompleted ? 'group-hover:ring-green-600' : ''}
                    ${!isActive && !isCompleted ? 'group-hover:ring-gray-400' : ''}
                  `}
                >
                  {isCompleted ? '✓' : stepNumber}
                </div>
                <span className="text-xs text-center max-w-[80px] hidden md:block">{title}</span>
              </button>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Current step title */}
      <div className="text-center mb-6">
        <span className="text-sm text-gray-500">
          Шаг {currentStep} из {totalSteps}
        </span>
        <h1 className="text-2xl font-bold">{STEP_TITLES[currentStep - 1]}</h1>
      </div>

      {/* Step content */}
      <div className="bg-white rounded-lg shadow-sm border p-6">{renderStep()}</div>

      {/* Navigation buttons */}
      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={goToPreviousStep}
          disabled={currentStep === 1}
        >
          Назад
        </Button>

        {currentStep < totalSteps ? (
          <Button type="button" onClick={goToNextStep}>
            Далее
          </Button>
        ) : (
          <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
          </Button>
        )}
      </div>
    </div>
  );
}
