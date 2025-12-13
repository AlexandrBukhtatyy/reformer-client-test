import { Input, Select, RadioGroup } from '@/components/ui';
import type { FormSchema } from '@reformer/core';
import type { Step1Form } from './type';

export const step1Schema: FormSchema<Step1Form> = {
  insuranceType: {
    value: 'casco',
    component: Select,
    componentProps: {
      label: 'Тип страхования',
      placeholder: 'Выберите тип страхования',
      options: [
        { value: 'casco', label: 'КАСКО' },
        { value: 'osago', label: 'ОСАГО' },
        { value: 'property', label: 'Недвижимость' },
        { value: 'life', label: 'Жизнь и здоровье' },
        { value: 'travel', label: 'Путешествия' },
      ],
    },
  },
  insurancePeriod: {
    value: 12,
    component: Select,
    componentProps: {
      label: 'Срок страхования',
      placeholder: 'Выберите срок',
      options: [
        { value: 3, label: '3 месяца' },
        { value: 6, label: '6 месяцев' },
        { value: 12, label: '1 год' },
        { value: 24, label: '2 года' },
        { value: 36, label: '3 года' },
      ],
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
    },
  },
  coverageAmount: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Страховая сумма (₽)',
      type: 'number',
      placeholder: 'от 100 000 до 50 000 000',
    },
  },
 deductible: {
    value: undefined,
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
      options: [
        { value: 'single', label: 'Единовременно' },
        { value: 'installments', label: 'В рассрочку' },
      ],
    },
  },
  installments: {
    value: undefined,
    component: Select,
    componentProps: {
      label: 'Количество платежей',
      placeholder: 'Выберите количество',
      options: [
        { value: 2, label: '2 платежа' },
        { value: 3, label: '3 платежа' },
        { value: 4, label: '4 платежа' },
        { value: 6, label: '6 платежей' },
        { value: 12, label: '12 платежей' },
      ],
    },
  },
};