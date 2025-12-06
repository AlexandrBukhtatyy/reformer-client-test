/**
 * Шаг 1: Информация о кредите
 */

import { useFormControl, type GroupNodeWithControls, type FieldNode } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import type { CreditApplicationForm, LoanType } from '../model/types';

interface Step1LoanInfoProps {
  control: GroupNodeWithControls<CreditApplicationForm>;
}

export function Step1LoanInfo({ control }: Step1LoanInfoProps) {
  const { value: loanType } = useFormControl(control.loanType as FieldNode<LoanType>);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Шаг 1: Информация о кредите</h2>

      {/* Основные поля */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.loanType} className="md:col-span-2" />
        <FormField control={control.loanAmount} />
        <FormField control={control.loanTerm} />
        <FormField control={control.loanPurpose} className="md:col-span-2" />
      </div>

      {/* Условные поля для ипотеки */}
      {loanType === 'mortgage' && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 space-y-4">
          <h3 className="font-medium text-blue-800">Данные об ипотеке</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.propertyValue} />
            <FormField control={control.initialPayment} />
          </div>
          <p className="text-sm text-blue-600">
            Первоначальный взнос рассчитывается автоматически как 20% от стоимости недвижимости.
          </p>
        </div>
      )}

      {/* Условные поля для автокредита */}
      {loanType === 'car' && (
        <div className="p-4 bg-green-50 rounded-lg border border-green-100 space-y-4">
          <h3 className="font-medium text-green-800">Данные об автомобиле</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.carBrand} />
            <FormField control={control.carModel} />
            <FormField control={control.carYear} />
            <FormField control={control.carPrice} />
          </div>
        </div>
      )}

      {/* Вычисляемые поля */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-medium text-gray-700 mb-3">Расчет кредита</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={control.interestRate} />
          <FormField control={control.monthlyPayment} />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Ставка и платеж рассчитываются автоматически на основе введенных данных.
        </p>
      </div>
    </div>
  );
}
