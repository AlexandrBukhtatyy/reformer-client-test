import { useState } from 'react';
import type { FormNavigationHandle } from '@reformer/ui/form-navigation';
import { Button } from '@/components/ui/button';
import type { InsuranceApplicationForm } from '../type';

interface NavigationButtonsProps {
  navRef: React.RefObject<FormNavigationHandle<InsuranceApplicationForm> | null>;
  currentStep: number;
  totalSteps: number;
}

export function NavigationButtons({ navRef, currentStep, totalSteps }: NavigationButtonsProps) {
  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  const handlePrev = () => {
    navRef.current?.goToPreviousStep();
  };

  const handleNext = async () => {
    setIsValidating(true);
    try {
      await navRef.current?.goToNextStep();
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await navRef.current?.submit(async (values) => {
        console.log('Form submitted:', values);
        alert('Заявка успешно отправлена!');
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-between pt-4">
      <Button
        type="button"
        variant="outline"
        onClick={handlePrev}
        disabled={isFirstStep}
      >
        Назад
      </Button>

      {!isLastStep ? (
        <Button type="button" onClick={handleNext} disabled={isValidating}>
          {isValidating ? 'Проверка...' : 'Далее'}
        </Button>
      ) : (
        <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
        </Button>
      )}
    </div>
  );
}
