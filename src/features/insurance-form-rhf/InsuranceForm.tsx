import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormModeProvider } from './context';
import type { FormMode } from './context';
import type { InsuranceFormData } from './types';
import { DEFAULT_FORM_VALUES } from './constants';
import { insuranceFormSchema } from './schemas';
import { useStepNavigation, useComputedFields } from './hooks';
import {
  FormStepper,
  StepNavigation,
  Step1InsuranceType,
  Step2InsuredInfo,
  Step3CoverageObject,
  Step4DriversAndBeneficiaries,
  Step5History,
  Step6Confirmation,
} from './components';

interface InsuranceFormProps {
  mode?: FormMode;
  initialData?: Partial<InsuranceFormData>;
  onSubmit?: (data: InsuranceFormData) => void | Promise<void>;
}

export function InsuranceForm({
  mode = 'create',
  initialData,
  onSubmit,
}: InsuranceFormProps) {
  const methods = useForm<InsuranceFormData>({
    resolver: zodResolver(insuranceFormSchema),
    defaultValues: {
      ...DEFAULT_FORM_VALUES,
      ...initialData,
    },
    mode: 'onChange',
  });

  const { trigger, getValues, handleSubmit, formState } = methods;

  const stepNavigation = useStepNavigation({
    trigger,
    getValues,
  });

  const handleFormSubmit = async (data: InsuranceFormData) => {
    if (onSubmit) {
      await onSubmit(data);
    } else {
      console.log('Form submitted:', data);
      alert('Форма успешно отправлена!');
    }
  };

  const renderStep = () => {
    switch (stepNavigation.currentStep) {
      case 0:
        return <Step1InsuranceType />;
      case 1:
        return <Step2InsuredInfo />;
      case 2:
        return <Step3CoverageObject />;
      case 3:
        return <Step4DriversAndBeneficiaries />;
      case 4:
        return <Step5History />;
      case 5:
        return <Step6Confirmation />;
      default:
        return null;
    }
  };

  return (
    <FormModeProvider mode={mode}>
      <FormProvider {...methods}>
        <ComputedFieldsProvider />
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="max-w-4xl mx-auto p-6"
        >
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-center mb-2">
              Заявка на страхование
            </h1>
            <p className="text-center text-muted-foreground">
              Режим: {mode === 'create' ? 'Создание' : mode === 'edit' ? 'Редактирование' : 'Просмотр'}
            </p>
          </div>

          <FormStepper
            currentStep={stepNavigation.currentStep}
            visitedSteps={stepNavigation.visitedSteps}
            onStepClick={(index) => stepNavigation.goToStep(index)}
          />

          <div className="bg-card rounded-lg border p-6 mb-6">
            {renderStep()}
          </div>

          <StepNavigation
            isFirstStep={stepNavigation.isFirstStep}
            isLastStep={stepNavigation.isLastStep}
            isLoading={formState.isSubmitting}
            onPrev={stepNavigation.goToPrevStep}
            onNext={stepNavigation.goToNextStep}
          />

          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 p-4 bg-muted rounded-lg">
              <details>
                <summary className="cursor-pointer font-medium">
                  Debug: Form State
                </summary>
                <pre className="mt-2 text-xs overflow-auto max-h-60">
                  {JSON.stringify(
                    {
                      isValid: formState.isValid,
                      isDirty: formState.isDirty,
                      errors: formState.errors,
                      currentStep: stepNavigation.currentStep,
                    },
                    null,
                    2
                  )}
                </pre>
              </details>
            </div>
          )}
        </form>
      </FormProvider>
    </FormModeProvider>
  );
}

// Вспомогательный компонент для активации вычисляемых полей
function ComputedFieldsProvider() {
  useComputedFields();
  return null;
}
