import { useFormContext, useWatch } from 'react-hook-form';
import { FormCheckbox, FormInput } from '@/components/form';
import type { InsuranceFormData } from '../../types';
import { useFormMode } from '../../hooks';
import { ComputedField } from '../ui';

export function Step6Confirmation() {
  const { isReadOnly } = useFormMode();
  const { control } = useFormContext<InsuranceFormData>();

  const paymentType = useWatch({ control, name: 'paymentType' });

  const formatCurrency = (value: unknown) => {
    if (value == null) return '-';
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(value as number);
  };

  const formatPercent = (value: unknown) => {
    if (value == null) return '-';
    return `${((value as number) * 100).toFixed(0)}%`;
  };

  const formatCoefficient = (value: unknown) => {
    if (value == null) return '-';
    return (value as number).toFixed(2);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Шаг 6: Расчет и подтверждение</h2>

      <div className="bg-muted p-6 rounded-lg space-y-4">
        <h3 className="text-lg font-medium">Расчет страховой премии</h3>

        <div className="space-y-2">
          <ComputedField
            name="basePremium"
            label="Базовая премия"
            format={formatCurrency}
          />

          <div className="border-t pt-2 mt-2">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Коэффициенты
            </h4>
            <ComputedField
              name="ageCoefficient"
              label="Коэффициент возраста"
              format={formatCoefficient}
            />
            <ComputedField
              name="experienceCoefficient"
              label="Коэффициент стажа"
              format={formatCoefficient}
            />
            <ComputedField
              name="regionCoefficient"
              label="Региональный коэффициент"
              format={formatCoefficient}
            />
            <ComputedField
              name="claimsCoefficient"
              label="Коэффициент убыточности"
              format={formatCoefficient}
            />
          </div>

          <div className="border-t pt-2 mt-2">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Скидки
            </h4>
            <ComputedField
              name="deductibleDiscount"
              label="Скидка за франшизу"
              format={formatPercent}
            />
            <ComputedField
              name="promoDiscount"
              label="Скидка по промокоду"
              format={formatPercent}
            />
            <ComputedField
              name="multiPolicyDiscount"
              label="Скидка за мультиполис"
              format={formatPercent}
            />
          </div>

          <div className="border-t pt-4 mt-4">
            <ComputedField
              name="totalPremium"
              label="Итоговая премия"
              format={formatCurrency}
            />
            {paymentType === 'installments' && (
              <ComputedField
                name="installmentAmount"
                label="Сумма одного платежа"
                format={formatCurrency}
              />
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Согласия</h3>

        <div className="space-y-3">
          <FormCheckbox
            name="agreePersonalData"
            label="Согласен на обработку персональных данных"
            disabled={isReadOnly}
          />
          <FormCheckbox
            name="agreeTerms"
            label="Согласен с правилами страхования"
            disabled={isReadOnly}
          />
          <FormCheckbox
            name="agreeElectronicPolicy"
            label="Согласен на получение электронного полиса"
            disabled={isReadOnly}
          />
          <FormCheckbox
            name="agreeMarketing"
            label="Согласен на получение рекламных материалов (необязательно)"
            disabled={isReadOnly}
          />
          <FormCheckbox
            name="confirmAccuracy"
            label="Подтверждаю достоверность предоставленных данных"
            disabled={isReadOnly}
          />
        </div>
      </div>

      <div className="space-y-2">
        <FormInput
          name="electronicSignature"
          label="Код подтверждения (6 цифр)"
          placeholder="123456"
          maxLength={6}
          disabled={isReadOnly}
        />
        <p className="text-sm text-muted-foreground">
          Введите код подтверждения, отправленный на ваш телефон
        </p>
      </div>
    </div>
  );
}
