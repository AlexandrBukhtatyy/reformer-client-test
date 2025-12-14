// Step 6: Calculation and Confirmation
import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/input';
import { InputMask } from '@/components/ui/input-mask';
import { Checkbox } from '@/components/ui/checkbox';
import type { InsuranceApplicationForm } from '../types';

interface Step6Props {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

const formatCurrency = (value: number | undefined): string => {
  if (value === undefined) return '-';
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value);
};

const formatPercent = (value: number | undefined): string => {
  if (value === undefined) return '-';
  return `${value.toFixed(2)}%`;
};

const formatCoefficient = (value: number | undefined): string => {
  if (value === undefined) return '-';
  return value.toFixed(2);
};

export function Step6Confirmation({ control }: Step6Props) {
  const paymentType = control.controls.paymentType.value;
  const installments = control.controls.installments.value;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Шаг 6: Расчет и подтверждение</h2>

      {/* Calculation Summary */}
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-medium">Расчет стоимости полиса</h3>

        {/* Base Premium */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Базовая премия:</span>
            <span className="font-medium">
              {formatCurrency(control.controls.basePremium.value)}
            </span>
          </div>
        </div>

        {/* Coefficients */}
        <div className="border-t pt-4">
          <h4 className="text-md font-medium mb-2">Коэффициенты</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Коэффициент возраста:</span>
              <span>{formatCoefficient(control.controls.ageCoefficient.value)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Коэффициент стажа:</span>
              <span>{formatCoefficient(control.controls.experienceCoefficient.value)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Региональный коэффициент:</span>
              <span>{formatCoefficient(control.controls.regionCoefficient.value)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Коэффициент аварийности (КБМ):</span>
              <span>{formatCoefficient(control.controls.claimsCoefficient.value)}</span>
            </div>
          </div>
        </div>

        {/* Discounts */}
        <div className="border-t pt-4">
          <h4 className="text-md font-medium mb-2">Скидки</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Скидка за франшизу:</span>
              <span className="text-green-600">
                -{formatPercent(control.controls.deductibleDiscount.value)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Скидка по промокоду:</span>
              <span className="text-green-600">
                -{formatPercent(control.controls.promoDiscount.value)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Скидка за комплексное страхование:</span>
              <span className="text-green-600">
                -{formatPercent(control.controls.multiPolicyDiscount.value)}
              </span>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="border-t pt-4">
          <div className="flex justify-between text-lg">
            <span className="font-semibold">Итоговая премия:</span>
            <span className="font-bold text-blue-600">
              {formatCurrency(control.controls.totalPremium.value)}
            </span>
          </div>

          {paymentType === 'installments' && installments && (
            <div className="flex justify-between mt-2">
              <span className="text-gray-600">
                Сумма платежа ({installments} платежей):
              </span>
              <span className="font-medium">
                {formatCurrency(control.controls.installmentAmount.value)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Hidden inputs for computed values */}
      <div className="hidden">
        <FormField
          control={control.controls.basePremium.withComponent(Input, {
            type: 'number',
            disabled: true,
            testId: 'basePremium',
          })}
          testId="basePremium"
        />
        <FormField
          control={control.controls.ageCoefficient.withComponent(Input, {
            type: 'number',
            disabled: true,
            testId: 'ageCoefficient',
          })}
          testId="ageCoefficient"
        />
        <FormField
          control={control.controls.experienceCoefficient.withComponent(Input, {
            type: 'number',
            disabled: true,
            testId: 'experienceCoefficient',
          })}
          testId="experienceCoefficient"
        />
        <FormField
          control={control.controls.regionCoefficient.withComponent(Input, {
            type: 'number',
            disabled: true,
            testId: 'regionCoefficient',
          })}
          testId="regionCoefficient"
        />
        <FormField
          control={control.controls.claimsCoefficient.withComponent(Input, {
            type: 'number',
            disabled: true,
            testId: 'claimsCoefficient',
          })}
          testId="claimsCoefficient"
        />
        <FormField
          control={control.controls.deductibleDiscount.withComponent(Input, {
            type: 'number',
            disabled: true,
            testId: 'deductibleDiscount',
          })}
          testId="deductibleDiscount"
        />
        <FormField
          control={control.controls.promoDiscount.withComponent(Input, {
            type: 'number',
            disabled: true,
            testId: 'promoDiscount',
          })}
          testId="promoDiscount"
        />
        <FormField
          control={control.controls.multiPolicyDiscount.withComponent(Input, {
            type: 'number',
            disabled: true,
            testId: 'multiPolicyDiscount',
          })}
          testId="multiPolicyDiscount"
        />
        <FormField
          control={control.controls.totalPremium.withComponent(Input, {
            type: 'number',
            disabled: true,
            testId: 'totalPremium',
          })}
          testId="totalPremium"
        />
        <FormField
          control={control.controls.installmentAmount.withComponent(Input, {
            type: 'number',
            disabled: true,
            testId: 'installmentAmount',
          })}
          testId="installmentAmount"
        />
      </div>

      {/* Agreements */}
      <div className="border-t pt-6 space-y-4">
        <h3 className="text-lg font-medium">Согласия</h3>

        <FormField
          control={control.controls.agreePersonalData.withComponent(Checkbox, {
            label: 'Согласие на обработку персональных данных',
            testId: 'agreePersonalData',
          })}
          testId="agreePersonalData"
        />

        <FormField
          control={control.controls.agreeTerms.withComponent(Checkbox, {
            label: 'Согласие с правилами страхования',
            testId: 'agreeTerms',
          })}
          testId="agreeTerms"
        />

        <FormField
          control={control.controls.agreeElectronicPolicy.withComponent(Checkbox, {
            label: 'Согласие на электронный полис',
            testId: 'agreeElectronicPolicy',
          })}
          testId="agreeElectronicPolicy"
        />

        <FormField
          control={control.controls.agreeMarketing.withComponent(Checkbox, {
            label: 'Согласие на получение рекламных материалов (необязательно)',
            testId: 'agreeMarketing',
          })}
          testId="agreeMarketing"
        />
      </div>

      {/* Confirmation */}
      <div className="border-t pt-6 space-y-4">
        <h3 className="text-lg font-medium">Подтверждение</h3>

        <FormField
          control={control.controls.confirmAccuracy.withComponent(Checkbox, {
            label: 'Подтверждаю достоверность предоставленных данных',
            testId: 'confirmAccuracy',
          })}
          testId="confirmAccuracy"
        />

        <div className="max-w-xs">
          <FormField
            control={control.controls.electronicSignature.withComponent(InputMask, {
              label: 'SMS-код подтверждения',
              mask: '999999',
              placeholder: '000000',
              testId: 'electronicSignature',
            })}
            testId="electronicSignature"
          />
          <p className="text-sm text-gray-500 mt-1">
            Введите 6-значный код, отправленный на ваш телефон
          </p>
        </div>
      </div>
    </div>
  );
}
