import { useRef, useState, useEffect } from 'react';
import { createForm } from '@reformer/core';
import type { FormNavigationHandle, FormNavigationConfig } from '@reformer/ui/form-navigation';
import {
  FormNavigation,
  FormNavigationStep,
  FormNavigationIndicator,
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
import { NavigationButtons } from './components/NavigationButtons';
import { StepIndicator } from './components/StepIndicator';

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
  const [currentStep, setCurrentStep] = useState(1);

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
    <FormNavigation ref={navRef} form={form} config={config} onStepChange={setCurrentStep}>
      <div className="space-y-6">
        {/* Step indicator */}
        <FormNavigationIndicator steps={STEPS}>
          {(props) => <StepIndicator {...props} />}
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
        <NavigationButtons
          navRef={navRef}
          currentStep={currentStep}
          totalSteps={STEPS.length}
        />
      </div>
    </FormNavigation>
  );
}
