// Step 1: Insurance Type and Basic Parameters
import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { RadioGroup } from '@/components/ui/radio-group';
import type { InsuranceApplicationForm } from '../types';

interface Step1Props {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

const insuranceTypeOptions = [
  { value: 'casco', label: 'КАСКО' },
  { value: 'osago', label: 'ОСАГО' },
  { value: 'property', label: 'Недвижимость' },
  { value: 'life', label: 'Жизнь и здоровье' },
  { value: 'travel', label: 'Путешествия' },
];

const insurancePeriodOptions = [
  { value: '3', label: '3 месяца' },
  { value: '6', label: '6 месяцев' },
  { value: '12', label: '1 год' },
  { value: '24', label: '2 года' },
  { value: '36', label: '3 года' },
];

const paymentTypeOptions = [
  { value: 'single', label: 'Единовременно' },
  { value: 'installments', label: 'В рассрочку' },
];

const installmentsOptions = [
  { value: '2', label: '2 платежа' },
  { value: '3', label: '3 платежа' },
  { value: '4', label: '4 платежа' },
  { value: '6', label: '6 платежей' },
  { value: '12', label: '12 платежей' },
];

export function Step1InsuranceType({ control }: Step1Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Шаг 1: Тип страхования и основные параметры</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Insurance Type */}
        <FormField
          control={control.controls.insuranceType.withComponent(Select, {
            label: 'Тип страхования',
            options: insuranceTypeOptions,
            placeholder: 'Выберите тип страхования',
            testId: 'insuranceType',
          })}
          testId="insuranceType"
        />

        {/* Insurance Period */}
        <FormField
          control={control.controls.insurancePeriod.withComponent(Select, {
            label: 'Срок страхования',
            options: insurancePeriodOptions,
            placeholder: 'Выберите срок',
            testId: 'insurancePeriod',
          })}
          testId="insurancePeriod"
        />

        {/* Start Date */}
        <FormField
          control={control.controls.startDate.withComponent(Input, {
            label: 'Дата начала действия полиса',
            type: 'date',
            testId: 'startDate',
          })}
          testId="startDate"
        />

        {/* End Date (computed, readonly) */}
        <FormField
          control={control.controls.endDate.withComponent(Input, {
            label: 'Дата окончания',
            type: 'date',
            disabled: true,
            testId: 'endDate',
          })}
          testId="endDate"
        />

        {/* Coverage Amount */}
        <FormField
          control={control.controls.coverageAmount.withComponent(Input, {
            label: 'Страховая сумма (₽)',
            type: 'number',
            placeholder: 'от 100 000 до 50 000 000',
            min: 100000,
            max: 50000000,
            testId: 'coverageAmount',
          })}
          testId="coverageAmount"
        />

        {/* Deductible */}
        <FormField
          control={control.controls.deductible.withComponent(Input, {
            label: 'Франшиза (₽)',
            type: 'number',
            placeholder: '0',
            min: 0,
            testId: 'deductible',
          })}
          testId="deductible"
        />
      </div>

      {/* Payment Section */}
      <div className="border-t pt-4 mt-4">
        <h3 className="text-lg font-medium mb-4">Оплата</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Payment Type */}
          <FormField
            control={control.controls.paymentType.withComponent(RadioGroup, {
              label: 'Способ оплаты',
              options: paymentTypeOptions,
              testId: 'paymentType',
            })}
            testId="paymentType"
          />

          {/* Installments - conditional */}
          {control.controls.installments.enabled && (
            <FormField
              control={control.controls.installments.withComponent(Select, {
                label: 'Количество платежей',
                options: installmentsOptions,
                placeholder: 'Выберите количество',
                testId: 'installments',
              })}
              testId="installments"
            />
          )}
        </div>
      </div>
    </div>
  );
}
