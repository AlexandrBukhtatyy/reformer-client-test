/**
 * Хук для работы с формой заявки на кредит
 */

import { useCallback, useState, useMemo, useEffect } from 'react';
import { createForm, type GroupNodeWithControls } from '@reformer/core';

import type { CreditApplicationForm } from '../model/types';
import { creditApplicationSchema } from '../model/schema';
import { creditApplicationBehavior } from '../model/behavior';
import { fullValidation } from '../model/validation';
import { TOTAL_STEPS } from '../model/constants';

export interface UseCreditApplicationFormOptions {
  /** ID заявки для редактирования */
  applicationId?: string;
  /** Режим формы */
  mode?: 'create' | 'edit' | 'view';
  /** Callback при успешной отправке */
  onSubmitSuccess?: (data: CreditApplicationForm) => void;
  /** Callback при ошибке отправки */
  onSubmitError?: (error: Error) => void;
}

export interface UseCreditApplicationFormResult {
  /** Экземпляр формы */
  form: GroupNodeWithControls<CreditApplicationForm>;
  /** Текущий шаг */
  currentStep: number;
  /** Общее количество шагов */
  totalSteps: number;
  /** Переход к следующему шагу */
  nextStep: () => Promise<boolean>;
  /** Переход к предыдущему шагу */
  prevStep: () => void;
  /** Переход к конкретному шагу */
  goToStep: (step: number) => Promise<boolean>;
  /** Можно ли перейти к следующему шагу */
  canGoNext: boolean;
  /** Можно ли перейти к предыдущему шагу */
  canGoPrev: boolean;
  /** Последний ли это шаг */
  isLastStep: boolean;
  /** Первый ли это шаг */
  isFirstStep: boolean;
  /** Отправка формы */
  submitForm: () => Promise<boolean>;
  /** Состояние загрузки */
  isLoading: boolean;
  /** Ошибка */
  error: string | null;
  /** Режим формы */
  mode: 'create' | 'edit' | 'view';
}

export function useCreditApplicationForm(
  options: UseCreditApplicationFormOptions = {}
): UseCreditApplicationFormResult {
  const { mode = 'create', onSubmitSuccess, onSubmitError } = options;

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Инициализация формы (создаётся один раз)
  // Полная валидация применяется при создании формы
  const form = useMemo(
    () =>
      createForm<CreditApplicationForm>({
        form: creditApplicationSchema,
        behavior: creditApplicationBehavior,
        validation: fullValidation,
      }),
    []
  );

  // Cleanup при unmount
  useEffect(() => {
    return () => {
      form.dispose();
    };
  }, [form]);

  // Валидация текущего шага
  // Используем form.validate() - валидирует по полной схеме,
  // но ошибки показываются только на touched полях
  const validateCurrentStep = useCallback(async (): Promise<boolean> => {
    // Запускаем полную валидацию
    const isValid = await form.validate();

    if (!isValid) {
      // Помечаем поля текущего шага как touched чтобы показать ошибки
      form.markAsTouched();
    }

    return isValid;
  }, [form]);

  // Переход к следующему шагу
  const nextStep = useCallback(async (): Promise<boolean> => {
    if (currentStep >= TOTAL_STEPS) return false;

    const isValid = await validateCurrentStep();
    if (!isValid) return false;

    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    return true;
  }, [currentStep, validateCurrentStep]);

  // Переход к предыдущему шагу
  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  // Переход к конкретному шагу
  const goToStep = useCallback(
    async (step: number): Promise<boolean> => {
      if (step < 1 || step > TOTAL_STEPS) return false;

      // Если идём назад - просто переходим
      if (step < currentStep) {
        setCurrentStep(step);
        return true;
      }

      // Если идём вперёд - валидируем форму
      const isValid = await form.validate();
      if (!isValid) {
        form.markAsTouched();
        return false;
      }

      setCurrentStep(step);
      return true;
    },
    [currentStep, form]
  );

  // Отправка формы
  const submitForm = useCallback(async (): Promise<boolean> => {
    setError(null);
    setIsLoading(true);

    try {
      // Полная валидация всей формы
      const isValid = await form.validate();
      if (!isValid) {
        form.markAsTouched();
        setIsLoading(false);
        return false;
      }

      const formData = form.getValue();

      // Здесь будет вызов API
      // const response = await submitCreditApplication(formData);

      onSubmitSuccess?.(formData);
      setIsLoading(false);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Произошла ошибка при отправке';
      setError(errorMessage);
      onSubmitError?.(err instanceof Error ? err : new Error(errorMessage));
      setIsLoading(false);
      return false;
    }
  }, [form, onSubmitSuccess, onSubmitError]);

  return {
    form,
    currentStep,
    totalSteps: TOTAL_STEPS,
    nextStep,
    prevStep,
    goToStep,
    canGoNext: currentStep < TOTAL_STEPS,
    canGoPrev: currentStep > 1,
    isLastStep: currentStep === TOTAL_STEPS,
    isFirstStep: currentStep === 1,
    submitForm,
    isLoading,
    error,
    mode,
  };
}
