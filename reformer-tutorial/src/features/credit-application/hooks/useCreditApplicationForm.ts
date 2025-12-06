// hooks/useCreditApplicationForm.ts - Хук инициализации формы

import { useMemo, useEffect, useState } from 'react';
import { createForm, type GroupNodeWithControls } from '@reformer/core';
import type { CreditApplicationForm, FormMode } from '../model/types';
import { creditApplicationSchema } from '../model/schema';
import { behaviorSchema } from '../model/behavior';
import { fullValidation, stepValidations } from '../model/validation';
import { mockApi } from '../api/mock-api';
import { TOTAL_STEPS } from '../model/constants';

interface UseCreditApplicationFormOptions {
  applicationId?: string | null;
  mode: FormMode;
}

interface UseCreditApplicationFormReturn {
  form: GroupNodeWithControls<CreditApplicationForm> | null;
  loading: boolean;
  error: string | null;
  stepValidations: typeof stepValidations;
  fullValidation: typeof fullValidation;
  totalSteps: number;
}

export function useCreditApplicationForm({
  applicationId,
  mode,
}: UseCreditApplicationFormOptions): UseCreditApplicationFormReturn {
  const [loading, setLoading] = useState(!!applicationId);
  const [error, setError] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<Partial<CreditApplicationForm> | null>(null);

  // Загрузка данных существующей заявки
  useEffect(() => {
    if (applicationId) {
      setLoading(true);
      setError(null);

      mockApi
        .getApplication(applicationId)
        .then((response) => {
          if (response.success && response.data) {
            setInitialData(response.data);
          } else {
            setError(response.error || 'Не удалось загрузить заявку');
          }
        })
        .catch((err) => {
          setError(err.message || 'Ошибка при загрузке заявки');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [applicationId]);

  // Создание формы
  const form = useMemo(() => {
    // Не создаём форму пока грузятся данные
    if (applicationId && loading) {
      return null;
    }

    // Создаём форму
    const formInstance = createForm<CreditApplicationForm>({
      form: creditApplicationSchema,
      behavior: behaviorSchema,
      validation: fullValidation,
    });

    // Если есть начальные данные - применяем их
    if (initialData) {
      formInstance.patchValue(initialData as CreditApplicationForm);
    }

    return formInstance;
  }, [applicationId, loading, initialData]);

  // Управление режимом (disable в режиме view)
  useEffect(() => {
    if (!form) return;

    if (mode === 'view') {
      form.disable();
    } else {
      form.enable();
    }
  }, [form, mode]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (form) {
        form.dispose();
      }
    };
  }, [form]);

  return {
    form,
    loading,
    error,
    stepValidations,
    fullValidation,
    totalSteps: TOTAL_STEPS,
  };
}
