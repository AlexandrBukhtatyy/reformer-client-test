import { useState, useCallback } from 'react';
import type { GroupNodeWithControls } from '@reformer/core';

export interface StepForm<T> {
  steps: Array<GroupNodeWithControls<T>>;
  currentStep: number;
  goToStep: (step: number) => void;
  nextStep: () => Promise<boolean>;
  prevStep: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  validateCurrentStep: () => Promise<boolean>;
}

export function useStepForm<T>(
  steps: Array<GroupNodeWithControls<T>>,
  validateStep?: (stepIndex: number, stepForm: GroupNodeWithControls<T>) => Promise<boolean>
): StepForm<T> {
  const [currentStep, setCurrentStep] = useState(0);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
    }
  }, [steps.length]);

  const nextStep = useCallback(async (): Promise<boolean> => {
    if (currentStep < steps.length - 1) {
      if (validateStep) {
        const isValid = await validateStep(currentStep, steps[currentStep]);
        if (isValid) {
          setCurrentStep(prev => prev + 1);
          return true;
        }
        return false;
      } else {
        setCurrentStep(prev => prev + 1);
        return true;
      }
    }
    return true;
  }, [currentStep, steps, validateStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const validateCurrentStep = useCallback(async (): Promise<boolean> => {
    if (validateStep) {
      return await validateStep(currentStep, steps[currentStep]);
    }
    return true;
  }, [currentStep, steps, validateStep]);

  return {
    steps,
    currentStep,
    goToStep,
    nextStep,
    prevStep,
    isLastStep: currentStep === steps.length - 1,
    isFirstStep: currentStep === 0,
    validateCurrentStep
  };
}