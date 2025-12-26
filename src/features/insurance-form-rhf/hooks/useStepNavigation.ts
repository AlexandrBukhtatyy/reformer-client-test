import { useState, useCallback, useMemo } from 'react';
import type { UseFormTrigger, UseFormGetValues, FieldValues, Path } from 'react-hook-form';
import { STEPS } from '../constants';
import type { InsuranceFormData } from '../types';

interface UseStepNavigationOptions<T extends FieldValues> {
  trigger: UseFormTrigger<T>;
  getValues: UseFormGetValues<T>;
  initialStep?: number;
}

export function useStepNavigation<T extends FieldValues = InsuranceFormData>({
  trigger,
  getValues,
  initialStep = 0,
}: UseStepNavigationOptions<T>) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([initialStep]));

  const totalSteps = STEPS.length;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const currentStepConfig = STEPS[currentStep];

  // Получить поля текущего шага для валидации
  const getCurrentStepFields = useCallback((): Path<T>[] => {
    const stepConfig = STEPS[currentStep];
    if (!stepConfig) return [];
    return stepConfig.fields as Path<T>[];
  }, [currentStep]);

  // Валидация текущего шага
  const validateCurrentStep = useCallback(async (): Promise<boolean> => {
    const fields = getCurrentStepFields();
    if (fields.length === 0) return true;

    const result = await trigger(fields);
    return result;
  }, [trigger, getCurrentStepFields]);

  // Переход к следующему шагу с валидацией
  const goToNextStep = useCallback(async (): Promise<boolean> => {
    if (isLastStep) return false;

    const isValid = await validateCurrentStep();
    if (!isValid) return false;

    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    setVisitedSteps((prev) => new Set([...prev, nextStep]));
    return true;
  }, [currentStep, isLastStep, validateCurrentStep]);

  // Переход к предыдущему шагу без валидации
  const goToPrevStep = useCallback(() => {
    if (isFirstStep) return;
    setCurrentStep((prev) => prev - 1);
  }, [isFirstStep]);

  // Переход к конкретному шагу
  const goToStep = useCallback(async (stepIndex: number, validate = true): Promise<boolean> => {
    if (stepIndex < 0 || stepIndex >= totalSteps) return false;

    // Если переходим назад или на уже посещенный шаг - без валидации
    if (stepIndex < currentStep || visitedSteps.has(stepIndex)) {
      setCurrentStep(stepIndex);
      return true;
    }

    // Если переходим вперед - валидация
    if (validate) {
      const isValid = await validateCurrentStep();
      if (!isValid) return false;
    }

    setCurrentStep(stepIndex);
    setVisitedSteps((prev) => new Set([...prev, stepIndex]));
    return true;
  }, [currentStep, totalSteps, visitedSteps, validateCurrentStep]);

  // Проверка, был ли шаг посещен
  const isStepVisited = useCallback(
    (stepIndex: number) => visitedSteps.has(stepIndex),
    [visitedSteps]
  );

  // Сброс навигации
  const resetNavigation = useCallback(() => {
    setCurrentStep(initialStep);
    setVisitedSteps(new Set([initialStep]));
  }, [initialStep]);

  // Прогресс (0-100)
  const progress = useMemo(() => {
    return Math.round(((currentStep + 1) / totalSteps) * 100);
  }, [currentStep, totalSteps]);

  return {
    currentStep,
    currentStepConfig,
    totalSteps,
    isFirstStep,
    isLastStep,
    visitedSteps,
    progress,
    goToNextStep,
    goToPrevStep,
    goToStep,
    validateCurrentStep,
    isStepVisited,
    resetNavigation,
    getCurrentStepFields,
  };
}
