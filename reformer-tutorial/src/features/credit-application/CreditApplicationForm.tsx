/**
 * Главный компонент формы заявки на кредит
 */

import { useRef } from 'react';
import { StepNavigation } from '@/components/ui/step-navigation';
import type { StepNavigationHandle, StepNavigationConfig } from '@/components/ui/step-navigation/types';
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
import { stepValidations, fullValidation } from './model/validation';
import { saveApplication } from './api/mock-api';
import type { CreditApplicationForm as CreditApplicationFormType, FormMode } from './model/types';

interface CreditApplicationFormProps {
  mode?: FormMode;
  applicationId?: string;
  onSuccess?: (id: string) => void;
  onCancel?: () => void;
}

export function CreditApplicationForm({
  mode = 'create',
  applicationId,
  onSuccess,
  onCancel,
}: CreditApplicationFormProps) {
  const navRef = useRef<StepNavigationHandle<CreditApplicationFormType>>(null);

  const { form, loading, error } = useCreditApplicationForm({
    mode,
    applicationId,
  });

  // Конфигурация навигации по шагам
  const config: StepNavigationConfig<CreditApplicationFormType> = {
    totalSteps: 6,
    stepValidations,
    fullValidation,
  };

  // Обработчик отправки формы
  const handleSubmit = async (values: CreditApplicationFormType) => {
    const response = await saveApplication(values);

    if (response.success && response.data) {
      alert('Заявка успешно отправлена!');
      onSuccess?.(response.data.id);
    } else {
      alert('Ошибка при отправке заявки: ' + (response.error || 'Неизвестная ошибка'));
    }

    return response;
  };

  // Состояние загрузки
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Загрузка заявки...</p>
          </div>
        </div>
      </div>
    );
  }

  // Состояние ошибки
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Ошибка загрузки</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Попробовать снова
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Заголовок */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {mode === 'create' && 'Новая заявка на кредит'}
          {mode === 'edit' && 'Редактирование заявки'}
          {mode === 'view' && 'Просмотр заявки'}
        </h1>
        <p className="text-gray-600 mt-1">
          {mode === 'create' && 'Заполните форму для подачи заявки на кредит'}
          {mode === 'edit' && 'Внесите необходимые изменения в заявку'}
          {mode === 'view' && 'Просмотр данных заявки'}
        </p>
      </div>

      <StepNavigation ref={navRef} form={form} config={config}>
        {({ currentStep, completedSteps, isFirstStep, isLastStep, isValidating }) => (
          <>
            {/* Индикатор прогресса */}
            <StepProgressBar
              currentStep={currentStep}
              totalSteps={6}
              completedSteps={completedSteps}
            />

            {/* Содержимое текущего шага */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              {currentStep === 1 && <Step1LoanInfo control={form} />}
              {currentStep === 2 && <Step2PersonalData control={form} />}
              {currentStep === 3 && <Step3ContactInfo control={form} />}
              {currentStep === 4 && <Step4Employment control={form} />}
              {currentStep === 5 && <Step5AdditionalInfo control={form} />}
              {currentStep === 6 && <Step6Confirmation control={form} />}
            </div>

            {/* Навигация */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {onCancel && (
                  <Button variant="ghost" onClick={onCancel}>
                    Отмена
                  </Button>
                )}

                <Button
                  variant="outline"
                  onClick={() => navRef.current?.goToPreviousStep()}
                  disabled={isFirstStep}
                >
                  ← Назад
                </Button>
              </div>

              <div className="text-sm text-gray-500">
                Шаг {currentStep} из 6
              </div>

              <div>
                {!isLastStep ? (
                  <Button
                    onClick={() => navRef.current?.goToNextStep()}
                    disabled={isValidating || mode === 'view'}
                  >
                    {isValidating ? 'Проверка...' : 'Далее →'}
                  </Button>
                ) : (
                  <Button
                    onClick={() => navRef.current?.submit(handleSubmit)}
                    disabled={isValidating || mode === 'view'}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isValidating ? 'Проверка...' : 'Отправить заявку'}
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
