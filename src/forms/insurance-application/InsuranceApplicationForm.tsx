import { useMemo } from 'react';
import { createForm } from '@reformer/core';
import { FormNavigation } from '@reformer/ui/form-navigation';
import { Step1Form } from './steps/step1/Step1Form';
import { Step2Form } from './steps/step2/Step2Form';
import { Step3Form } from './steps/step3/Step3Form';
import { Step4Form } from './steps/step4/Step4Form';
import { Step5Form } from './steps/step5/Step5Form';
import { Step6Form } from './steps/step6/Step6Form';
import { insuranceApplicationSchema } from './formSchema';
import { insuranceApplicationValidation } from './formValidators';
import { insuranceApplicationBehavior } from './formBehaviors';
import { step1Validation } from './steps/step1/validators';
import { step2Validation } from './steps/step2/validators';
import { step3Validation } from './steps/step3/validators';
import { step4Validation } from './steps/step4/validators';
import { step5Validation } from './steps/step5/validators';
import { step6Validation } from './steps/step6/validators';
import type { InsuranceApplicationForm } from './type';

interface InsuranceApplicationFormProps {
  onSubmit: (data: InsuranceApplicationForm) => void;
}

const STEPS = [
  { number: 1, title: 'Тип страхования' },
  { number: 2, title: 'Данные страхователя' },
  { number: 3, title: 'Объект страхования' },
  { number: 4, title: 'Водители/Выгодоприобретатели' },
  { number: 5, title: 'История и доп. информация' },
  { number: 6, title: 'Расчет и подтверждение' },
];

export function InsuranceApplicationForm({
  onSubmit
}: InsuranceApplicationFormProps) {
  // Create the main form ONCE (memoized to prevent re-creation on every render)
  const form = useMemo(() => createForm<InsuranceApplicationForm>({
    form: insuranceApplicationSchema,
    validation: insuranceApplicationValidation,
    behavior: insuranceApplicationBehavior
  }), []);

  // Configuration for step validation
  const config = useMemo(() => ({
    stepValidations: {
      1: step1Validation,
      2: step2Validation,
      3: step3Validation,
      4: step4Validation,
      5: step5Validation,
      6: step6Validation,
    },
    fullValidation: insuranceApplicationValidation,
  }), []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Заявление на страхование</h1>
        <p className="text-gray-600">Заполните все шаги для оформления полиса</p>
      </div>

      <FormNavigation form={form} config={config}>
        {/* Step indicator */}
        <div className="mb-8">
          <FormNavigation.Indicator steps={STEPS}>
            {({ steps, goToStep }) => (
              <>
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer ${
                          step.isCurrent
                            ? 'bg-blue-600 text-white'
                            : step.isCompleted
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-200 text-gray-700'
                        }`}
                        onClick={() => step.canNavigate && goToStep(step.number)}
                        style={{ cursor: step.canNavigate ? 'pointer' : 'default' }}
                      >
                        {step.isCompleted ? '✓' : step.number}
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`h-1 w-16 ${step.isCompleted ? 'bg-green-600' : 'bg-gray-200'}`}></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-600">
                  {steps.map((step) => (
                    <div
                      key={step.number}
                      className={`text-center ${step.isCurrent || step.isCompleted ? 'text-blue-600 font-medium' : ''}`}
                      style={{ width: `${100 / steps.length}%`, cursor: step.canNavigate ? 'pointer' : 'default' }}
                      onClick={() => step.canNavigate && goToStep(step.number)}
                    >
                      {step.title}
                    </div>
                  ))}
                </div>
              </>
            )}
          </FormNavigation.Indicator>
        </div>

        {/* Step content */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <FormNavigation.Step component={Step1Form} control={form} form={form} />
          <FormNavigation.Step component={Step2Form} control={form} form={form} />
          <FormNavigation.Step component={Step3Form} control={form} form={form} />
          <FormNavigation.Step component={Step4Form} control={form} form={form} />
          <FormNavigation.Step component={Step5Form} control={form} form={form} />
          <FormNavigation.Step component={Step6Form} control={form} form={form} />
        </div>

        {/* Navigation buttons */}
        <FormNavigation.Actions onSubmit={() => onSubmit(form.getValue())}>
          {({ prev, next, submit, isFirstStep, isLastStep, isValidating }) => (
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prev.onClick}
                disabled={prev.disabled || isFirstStep}
                className={`px-4 py-2 rounded-md ${
                  isFirstStep
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                Назад
              </button>

              {isLastStep ? (
                <button
                  type="button"
                  onClick={submit.onClick}
                  disabled={submit.disabled}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {submit.isSubmitting ? 'Отправка...' : 'Подать заявку'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={next.onClick}
                  disabled={next.disabled}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {isValidating ? 'Проверка...' : 'Далее'}
                </button>
              )}
            </div>
          )}
        </FormNavigation.Actions>
      </FormNavigation>
    </div>
  );
}