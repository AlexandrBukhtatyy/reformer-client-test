import type { FormSchema } from '@reformer/core';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { RadioGroup } from '@/components/ui/radio-group';
import type { Step1FormData } from './step1-type';

// Options for selects and radio groups
const INSURANCE_TYPES = [
  { value: 'casco', label: 'КАСКО' },
  { value: 'osago', label: 'ОСАГО' },
  { value: 'property', label: 'Недвижимость' },
  { value: 'life', label: 'Жизнь и здоровье' },
  { value: 'travel', label: 'Путешествия' },
];

const INSURANCE_PERIODS = [
  { value: 3, label: '3 месяца' },
  { value: 6, label: '6 месяцев' },
  { value: 12, label: '1 год' },
  { value: 24, label: '2 года' },
  { value: 36, label: '3 года' },
];

const PAYMENT_TYPES = [
  { value: 'single', label: 'Единовременно' },
  { value: 'installments', label: 'В рассрочку' },
];

const INSTALLMENT_OPTIONS = [
  { value: 2, label: '2 платежа' },
  { value: 3, label: '3 платежа' },
  { value: 4, label: '4 платежа' },
  { value: 6, label: '6 платежей' },
  { value: 12, label: '12 платежей' },
];

export const step1Schema: FormSchema<Step1FormData> = {
  insuranceType: {
    value: 'casco',
    component: Select,
    componentProps: {
      label: 'Тип страхования',
      options: INSURANCE_TYPES,
    },
  },
  insurancePeriod: {
    value: 12,
    component: Select,
    componentProps: {
      label: 'Срок страхования',
      options: INSURANCE_PERIODS,
    },
  },
  startDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата начала действия полиса',
      type: 'date',
    },
  },
  endDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата окончания',
      type: 'date',
      disabled: true,
      readonly: true,
    },
  },
  coverageAmount: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Страховая сумма (₽)',
      type: 'number',
      placeholder: 'от 100 000 до 50 000 000',
    },
  },
  deductible: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Франшиза (₽)',
      type: 'number',
      placeholder: '0',
    },
  },
  paymentType: {
    value: 'single',
    component: RadioGroup,
    componentProps: {
      label: 'Способ оплаты',
      options: PAYMENT_TYPES,
    },
  },
  installments: {
    value: null,
    component: Select,
    componentProps: {
      label: 'Количество платежей',
      options: INSTALLMENT_OPTIONS,
    },
  },
};