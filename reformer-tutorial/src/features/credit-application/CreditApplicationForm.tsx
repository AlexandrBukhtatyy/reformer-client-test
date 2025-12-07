/**
 * Главный компонент формы заявки на кредит
 */

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
import type { CreditApplicationForm as FormData } from './model/types';

import './CreditApplicationForm.css';

export interface CreditApplicationFormProps {
  /** ID заявки для редактирования */
  applicationId?: string;
  /** Режим формы */
  mode?: 'create' | 'edit' | 'view';
  /** Callback при успешной отправке */
  onSubmitSuccess?: (data: FormData) => void;
  /** Callback при ошибке отправки */
  onSubmitError?: (error: Error) => void;
}

export function CreditApplicationForm({
  applicationId,
  mode = 'create',
  onSubmitSuccess,
  onSubmitError,
}: CreditApplicationFormProps) {
  const {
    form,
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    goToStep,
    canGoNext,
    canGoPrev,
    isLastStep,
    submitForm,
    isLoading,
    error,
  } = useCreditApplicationForm({
    applicationId,
    mode,
    onSubmitSuccess,
    onSubmitError,
  });

  const isViewMode = mode === 'view';

  const handleNext = async () => {
    await nextStep();
  };

  const handleSubmit = async () => {
    const success = await submitForm();
    if (success) {
      alert('Заявка успешно отправлена!');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1LoanInfo form={form} disabled={isViewMode} />;
      case 2:
        return <Step2PersonalData form={form} disabled={isViewMode} />;
      case 3:
        return <Step3ContactInfo form={form} disabled={isViewMode} />;
      case 4:
        return <Step4Employment form={form} disabled={isViewMode} />;
      case 5:
        return <Step5AdditionalInfo form={form} disabled={isViewMode} />;
      case 6:
        return <Step6Confirmation form={form} disabled={isViewMode} />;
      default:
        return null;
    }
  };

  return (
    <div className="credit-application-form">
      <header className="form-header">
        <h1>Заявка на кредит</h1>
        <StepProgressBar
          currentStep={currentStep}
          totalSteps={totalSteps}
          onStepClick={(step) => goToStep(step)}
        />
      </header>

      <main className="form-content">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {renderStep()}
      </main>

      <footer className="form-footer">
        <div className="form-actions">
          {canGoPrev && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={prevStep}
              disabled={isLoading}
            >
              Назад
            </button>
          )}

          <div className="spacer" />

          {!isLastStep && canGoNext && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleNext}
              disabled={isLoading}
            >
              Далее
            </button>
          )}

          {isLastStep && !isViewMode && (
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Отправка...' : 'Отправить заявку'}
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
