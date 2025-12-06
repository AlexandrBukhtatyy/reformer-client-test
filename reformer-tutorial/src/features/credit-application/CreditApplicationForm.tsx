/**
 * Главный компонент формы заявки на кредит
 */

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { StepNavigation } from '@/components/ui/step-navigation/StepNavigation';
import type { StepNavigationHandle } from '@/components/ui/step-navigation/types';
import { StepProgressBar } from './components/StepProgressBar';
import {
  Step1LoanInfo,
  Step2PersonalData,
  Step3ContactInfo,
  Step4Employment,
  Step5AdditionalInfo,
  Step6Confirmation,
} from './steps';
import { useCreditApplicationForm } from './hooks/useCreditApplicationForm';
import type { CreditApplicationForm as CreditApplicationFormType } from './model/types';

interface CreditApplicationFormProps {
  applicationId?: string | null;
  mode?: 'create' | 'edit' | 'view';
  onSuccess?: (message: string) => void;
  onCancel?: () => void;
}

export function CreditApplicationForm({
  applicationId,
  mode = 'create',
  onSuccess,
  onCancel,
}: CreditApplicationFormProps) {
  const navRef = useRef<StepNavigationHandle<CreditApplicationFormType>>(null);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  const { form, stepConfig, isLoading, isSubmitting, isSendingSms, error, handleSubmit, handleSendSmsCode } =
    useCreditApplicationForm({ applicationId, mode });

  const handleFormSubmit = async () => {
    const result = await navRef.current?.submit(handleSubmit);

    if (result) {
      setSubmitResult({ success: true, message: result.message || 'Заявка успешно отправлена!' });
      onSuccess?.(result.message || 'Заявка успешно отправлена!');
    }
  };

  // Состояние загрузки
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Загрузка данных заявки...</p>
        </div>
      </div>
    );
  }

  // Успешная отправка
  if (submitResult?.success) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="p-8 bg-green-50 rounded-lg border border-green-200 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
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
          </div>
          <h2 className="text-2xl font-semibold text-green-900 mb-2">Заявка отправлена!</h2>
          <p className="text-green-700 mb-6">{submitResult.message}</p>
          <Button onClick={onCancel} variant="outline">
            Вернуться на главную
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {mode === 'view' ? 'Просмотр заявки' : mode === 'edit' ? 'Редактирование заявки' : 'Заявка на кредит'}
        </h1>
        <p className="text-gray-600">
          {mode === 'view'
            ? 'Просмотр данных заявки'
            : 'Заполните все поля формы для подачи заявки на кредит'}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>
      )}

      <StepNavigation ref={navRef} form={form} config={stepConfig}>
        {({ currentStep, completedSteps, isFirstStep, isLastStep, isValidating }) => (
          <>
            {/* Индикатор прогресса */}
            <StepProgressBar
              currentStep={currentStep}
              completedSteps={completedSteps}
              onStepClick={(step) => navRef.current?.goToStep(step)}
            />

            {/* Содержимое шага */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              {currentStep === 1 && <Step1LoanInfo control={form} />}
              {currentStep === 2 && <Step2PersonalData control={form} />}
              {currentStep === 3 && <Step3ContactInfo control={form} />}
              {currentStep === 4 && <Step4Employment control={form} />}
              {currentStep === 5 && <Step5AdditionalInfo control={form} />}
              {currentStep === 6 && (
                <Step6Confirmation
                  control={form}
                  onSendSmsCode={handleSendSmsCode}
                  isSendingSms={isSendingSms}
                />
              )}
            </div>

            {/* Навигационные кнопки */}
            {mode !== 'view' && (
              <div className="flex justify-between items-center">
                <div>
                  {onCancel && (
                    <Button type="button" variant="ghost" onClick={onCancel}>
                      Отмена
                    </Button>
                  )}
                </div>

                <div className="flex gap-3">
                  {!isFirstStep && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navRef.current?.goToPreviousStep()}
                      disabled={isValidating}
                    >
                      Назад
                    </Button>
                  )}

                  {!isLastStep ? (
                    <Button
                      type="button"
                      onClick={() => navRef.current?.goToNextStep()}
                      disabled={isValidating}
                    >
                      {isValidating ? 'Проверка...' : 'Далее'}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleFormSubmit}
                      disabled={isSubmitting || isValidating}
                    >
                      {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </StepNavigation>
    </div>
  );
}
