import { Button } from '@/components/ui/button';
import { useFormMode } from '../../hooks';

interface StepNavigationProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  isLoading?: boolean;
  onPrev: () => void;
  onNext: () => Promise<boolean> | void;
  onSubmit?: () => void;
}

export function StepNavigation({
  isFirstStep,
  isLastStep,
  isLoading = false,
  onPrev,
  onNext,
  onSubmit,
}: StepNavigationProps) {
  const { isViewMode } = useFormMode();

  if (isViewMode) {
    return (
      <div className="flex justify-between mt-8 pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          disabled={isFirstStep}
        >
          Назад
        </Button>
        <Button
          type="button"
          onClick={() => onNext()}
          disabled={isLastStep}
        >
          Далее
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-between mt-8 pt-6 border-t">
      <Button
        type="button"
        variant="outline"
        onClick={onPrev}
        disabled={isFirstStep || isLoading}
      >
        Назад
      </Button>
      {isLastStep ? (
        <Button
          type="submit"
          disabled={isLoading}
          onClick={onSubmit}
        >
          {isLoading ? 'Отправка...' : 'Оформить полис'}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={() => onNext()}
          disabled={isLoading}
        >
          Далее
        </Button>
      )}
    </div>
  );
}
