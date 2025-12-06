/**
 * Хук для инициализации и управления формой заявки на кредит
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { createForm, type GroupNodeWithControls } from '@reformer/core';
import type { CreditApplicationForm, FormMode } from '../model/types';
import { creditApplicationSchema } from '../model/schema';
import { fullValidation } from '../model/validation';
import { creditApplicationBehavior } from '../model/behavior';
import { loadApplication } from '../api/mock-api';

interface UseCreditApplicationFormOptions {
  mode: FormMode;
  applicationId?: string;
}

interface UseCreditApplicationFormResult {
  form: GroupNodeWithControls<CreditApplicationForm>;
  loading: boolean;
  error: string | null;
  mode: FormMode;
}

export function useCreditApplicationForm({
  mode,
  applicationId,
}: UseCreditApplicationFormOptions): UseCreditApplicationFormResult {
  const [loading, setLoading] = useState(mode !== 'create');
  const [error, setError] = useState<string | null>(null);
  const loadingRef = useRef(false);

  // Инициализация формы с createForm
  const form = useMemo(() => createForm<CreditApplicationForm>({
    form: creditApplicationSchema,
    validation: fullValidation,
    behavior: creditApplicationBehavior,
  }), []);

  // Функция загрузки данных
  const loadData = useCallback(async () => {
    if (!applicationId || mode === 'create' || loadingRef.current) {
      return;
    }

    loadingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const response = await loadApplication(applicationId);

      if (response.success && response.data) {
        // Устанавливаем значения формы
        form.setValue(response.data);

        // В режиме просмотра отключаем все поля
        if (mode === 'view') {
          form.disable();
        }
      } else {
        setError(response.error || 'Не удалось загрузить заявку');
      }
    } catch (err) {
      setError((err as Error).message || 'Произошла ошибка при загрузке заявки');
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [applicationId, mode, form]);

  // Загрузка данных для режимов edit и view
  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    form,
    loading,
    error,
    mode,
  };
}
