/**
 * Шаг 1: Информация о кредите
 */

import type { GroupNodeWithControls } from '@reformer/core';
import { useFormControlValue } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import type { CreditApplicationForm } from '../model/types';

interface Step1LoanInfoProps {
  control: GroupNodeWithControls<CreditApplicationForm>;
}

export function Step1LoanInfo({ control }: Step1LoanInfoProps) {
  const loanType = useFormControlValue(control.loanType);

  console.log('Step1LoanInfo render, loanType:', loanType);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Основная информация о кредите</h3>

        <div className="space-y-4">
          <FormField control={control.loanType} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.loanAmount} />
            <FormField control={control.loanTerm} />
          </div>

          <FormField control={control.loanPurpose} />
        </div>
      </div>

      {/* Вычисляемые поля */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-3">Расчетные данные</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={control.interestRate} />
          <FormField control={control.monthlyPayment} />
        </div>
      </div>

      {/* Поля для ипотеки */}
      {loanType === 'mortgage' && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Информация о недвижимости</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.propertyValue} />
            <FormField control={control.initialPayment} />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Первоначальный взнос рассчитывается автоматически (минимум 20% от стоимости недвижимости)
          </p>
        </div>
      )}

      {/* Поля для автокредита */}
      {loanType === 'car' && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Информация об автомобиле</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.carBrand} />
            <FormField control={control.carModel} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <FormField control={control.carYear} />
            <FormField control={control.carPrice} />
          </div>
        </div>
      )}
    </div>
  );
}
