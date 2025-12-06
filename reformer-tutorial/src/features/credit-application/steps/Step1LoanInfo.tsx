// steps/Step1LoanInfo.tsx - Шаг 1: Информация о кредите

import { useFormControl, type GroupNodeWithControls, type FieldNode } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import type { CreditApplicationForm } from '../model/types';

interface Step1Props {
  control: GroupNodeWithControls<CreditApplicationForm>;
}

export function Step1LoanInfo({ control }: Step1Props) {
  // Получаем значение типа кредита для условного рендеринга
  const { value: loanType } = useFormControl(
    control.loanType as FieldNode<CreditApplicationForm['loanType']>
  );

  const isMortgage = loanType === 'mortgage';
  const isCarLoan = loanType === 'car';

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Информация о кредите</h2>

      {/* Основные поля кредита */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.loanType} />
        <FormField control={control.loanAmount} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.loanTerm} />
      </div>

      <FormField control={control.loanPurpose} />

      {/* Поля для ипотеки */}
      {isMortgage && (
        <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
          <h3 className="font-medium text-blue-900 mb-4">Информация о недвижимости</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.propertyValue} />
            <FormField control={control.initialPayment} />
          </div>
        </div>
      )}

      {/* Поля для автокредита */}
      {isCarLoan && (
        <div className="p-4 border border-green-200 rounded-lg bg-green-50">
          <h3 className="font-medium text-green-900 mb-4">Информация об автомобиле</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.carBrand} />
            <FormField control={control.carModel} />
            <FormField control={control.carYear} />
            <FormField control={control.carPrice} />
          </div>
        </div>
      )}

      {/* Вычисляемые поля (информационный блок) */}
      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
        <h3 className="font-medium text-gray-700 mb-4">Расчёт кредита</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField control={control.interestRate} />
          <FormField control={control.monthlyPayment} />
          <FormField control={control.paymentToIncomeRatio} />
        </div>
      </div>
    </div>
  );
}
