// CreditApplicationForm.tsx - Главный компонент формы заявки на кредит

import { useRef, useState } from 'react';
import { StepNavigation, type StepNavigationHandle } from '@/components/ui/step-navigation';
import { Button } from '@/components/ui/button';
import { useCreditApplicationForm } from './hooks/useCreditApplicationForm';
import { StepProgressBar } from './components/StepProgressBar';
import {
  Step1LoanInfo,
  Step2PersonalData,
  Step3ContactInfo,
  Step4Employment,
  Step5AdditionalInfo,
  Step6Confirmation,
} from './steps';
import type { CreditApplicationForm as FormType, FormMode } from './model/types';
import { mockApi } from './api/mock-api';

interface CreditApplicationFormProps {
  applicationId?: string | null;
  mode?: FormMode;
  onSuccess?: (id: string) => void;
  onCancel?: () => void;
}

export function CreditApplicationForm({
  applicationId = null,
  mode = 'create',
  onSuccess,
  onCancel,
}: CreditApplicationFormProps) {
  const navRef = useRef<StepNavigationHandle<FormType>>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const { form, loading, error, stepValidations, totalSteps } = useCreditApplicationForm({
    applicationId,
    mode,
  });

  const handleSubmit = async (values: FormType) => {
    setSubmitError(null);
    setSubmitSuccess(null);

    const response = await mockApi.submitApplication(values);

    if (response.success && response.data) {
      setSubmitSuccess(`Заявка успешно отправлена! ID: ${response.data.id}`);
      onSuccess?.(response.data.id);
      return response.data;
    } else {
      setSubmitError(response.error || 'Не удалось отправить заявку');
      throw new Error(response.error);
    }
  };

  // Состояние загрузки
  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Загрузка заявки...</p>
        </div>
      </div>
    );
  }

  // Ошибка загрузки
  if (error) {
    return (
      <div className="p-12 bg-red-50 rounded-lg text-center">
        <div className="text-red-600 mb-4">
          <svg
            className="w-12 h-12 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="font-medium">{error}</p>
        </div>
        <Button onClick={() => window.location.reload()}>Попробовать снова</Button>
      </div>
    );
  }

  // Форма не инициализирована
  if (!form) {
    return null;
  }

  // Заголовок в зависимости от режима
  const getTitle = () => {
    switch (mode) {
      case 'view':
        return 'Просмотр заявки';
      case 'edit':
        return 'Редактирование заявки';
      default:
        return 'Новая заявка на кредит';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{getTitle()}</h1>

      {/* Сообщение об успехе */}
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {submitSuccess}
          </div>
        </div>
      )}

      <StepNavigation
        ref={navRef}
        form={form}
        config={{
          totalSteps,
          stepValidations,
          fullValidation: stepValidations[totalSteps],
        }}
      >
        {({ currentStep, completedSteps, isFirstStep, isLastStep, isValidating }) => (
          <>
            {/* Прогресс-бар */}
            <StepProgressBar
              currentStep={currentStep}
              totalSteps={totalSteps}
              completedSteps={completedSteps}
              onStepClick={(step) => navRef.current?.goToStep(step)}
            />

            {/* Контент шага */}
            <div className="mt-8 mb-8">
              {currentStep === 1 && <Step1LoanInfo control={form} />}
              {currentStep === 2 && <Step2PersonalData control={form} />}
              {currentStep === 3 && <Step3ContactInfo control={form} />}
              {currentStep === 4 && <Step4Employment control={form} />}
              {currentStep === 5 && <Step5AdditionalInfo control={form} />}
              {currentStep === 6 && <Step6Confirmation control={form} />}
            </div>

            {/* Ошибка отправки */}
            {submitError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {submitError}
                </div>
              </div>
            )}

            {/* Навигация */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <div className="flex gap-2">
                {onCancel && (
                  <Button type="button" variant="outline" onClick={onCancel}>
                    Отмена
                  </Button>
                )}
                {!isFirstStep && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navRef.current?.goToPreviousStep()}
                  >
                    Назад
                  </Button>
                )}
              </div>

              <div className="flex gap-2">
                {!isLastStep && (
                  <Button
                    type="button"
                    onClick={() => navRef.current?.goToNextStep()}
                    disabled={isValidating}
                  >
                    {isValidating ? 'Проверка...' : 'Далее'}
                  </Button>
                )}

                {isLastStep && mode !== 'view' && (
                  <Button
                    type="button"
                    onClick={() => navRef.current?.submit(handleSubmit)}
                    disabled={isValidating}
                  >
                    {isValidating ? 'Отправка...' : 'Отправить заявку'}
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </StepNavigation>
    </div>
  );
}
