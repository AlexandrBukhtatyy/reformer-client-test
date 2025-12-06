/**
 * Хук для управления формой заявки на кредит
 */

import { useMemo, useState, useCallback, useEffect } from 'react';
import { createForm } from '@reformer/core';

import { creditApplicationSchema } from '../model/schema';
import { fullValidation, STEP_VALIDATIONS } from '../model/validation';
import { creditApplicationBehavior } from '../model/behavior';
import { loadApplication, submitApplication, sendSmsCode } from '../api/mock-api';
import { TOTAL_STEPS } from '../model/constants';
import type { CreditApplicationForm } from '../model/types';
import type { StepNavigationConfig } from '@/components/ui/step-navigation/types';

interface UseCreditApplicationFormOptions {
  applicationId?: string | null;
  mode?: 'create' | 'edit' | 'view';
}

interface UseCreditApplicationFormReturn {
  form: ReturnType<typeof createForm<CreditApplicationForm>>;
  stepConfig: StepNavigationConfig<CreditApplicationForm>;
  isLoading: boolean;
  isSubmitting: boolean;
  isSendingSms: boolean;
  error: string | null;
  handleSubmit: (values: CreditApplicationForm) => Promise<{ success: boolean; message?: string }>;
  handleSendSmsCode: () => Promise<void>;
}

export function useCreditApplicationForm(
  options: UseCreditApplicationFormOptions = {}
): UseCreditApplicationFormReturn {
  const { applicationId, mode = 'create' } = options;

  const [isLoading, setIsLoading] = useState(!!applicationId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingSms, setIsSendingSms] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Создаем форму один раз
  const form = useMemo(() => {
    console.log('Creating form with behavior...');
    const f = createForm<CreditApplicationForm>({
      form: creditApplicationSchema,
      validation: fullValidation,
      behavior: creditApplicationBehavior,
    });
    console.log('Form created:', f);
    console.log('Form loanType initial value:', f.loanType.value.value);
    return f;
  }, []);

  // Конфигурация шагов для StepNavigation
  const stepConfig = useMemo<StepNavigationConfig<CreditApplicationForm>>(
    () => ({
      totalSteps: TOTAL_STEPS,
      stepValidations: STEP_VALIDATIONS,
      fullValidation,
    }),
    []
  );

  // Загрузка данных заявки
  useEffect(() => {
    if (!applicationId) {
      setIsLoading(false);
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await loadApplication(applicationId);

        if (!response.success || !response.data) {
          setError(response.error || 'Не удалось загрузить заявку');
          return;
        }

        // Заполняем форму данными
        console.log('Loading application data:', response.data);
        form.patchValue(response.data);
        console.log('Form value after patch:', form.value);
      } catch (err) {
        setError('Произошла ошибка при загрузке данных');
        console.error('Load application error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [applicationId, form]);

  // Отключаем форму в режиме просмотра
  useEffect(() => {
    if (mode === 'view') {
      form.disable();
    } else {
      form.enable();
    }
  }, [mode, form]);

  // Отправка формы
  const handleSubmit = useCallback(
    async (values: CreditApplicationForm): Promise<{ success: boolean; message?: string }> => {
      setIsSubmitting(true);
      setError(null);

      try {
        const response = await submitApplication(values);

        if (!response.success) {
          setError(response.error || 'Ошибка при отправке заявки');
          return { success: false, message: response.error };
        }

        return {
          success: true,
          message: response.data?.message || 'Заявка успешно отправлена',
        };
      } catch (err) {
        const errorMessage = 'Произошла ошибка при отправке заявки';
        setError(errorMessage);
        console.error('Submit application error:', err);
        return { success: false, message: errorMessage };
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  // Отправка СМС-кода
  const handleSendSmsCode = useCallback(async () => {
    const phone = form.phoneMain.value.value;

    if (!phone) {
      setError('Укажите номер телефона');
      return;
    }

    setIsSendingSms(true);
    setError(null);

    try {
      const response = await sendSmsCode(phone);

      if (!response.success) {
        setError(response.error || 'Не удалось отправить СМС');
      }
    } catch (err) {
      setError('Произошла ошибка при отправке СМС');
      console.error('Send SMS error:', err);
    } finally {
      setIsSendingSms(false);
    }
  }, [form]);

  return {
    form,
    stepConfig,
    isLoading,
    isSubmitting,
    isSendingSms,
    error,
    handleSubmit,
    handleSendSmsCode,
  };
}
