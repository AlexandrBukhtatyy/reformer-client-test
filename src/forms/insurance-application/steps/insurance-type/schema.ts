import type { FormSchema } from '@reformer/core';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { RadioGroup } from '@/components/ui/radio-group';
import type { InsuranceTypeStep } from './type';
import {
  INSURANCE_TYPE_OPTIONS,
  INSURANCE_PERIOD_OPTIONS,
  PAYMENT_TYPE_OPTIONS,
  INSTALLMENTS_OPTIONS,
} from '../../constants';

export const insuranceTypeSchema: FormSchema<InsuranceTypeStep> = {
  insuranceType: {
    value: 'casco',
    component: Select,
    componentProps: {
      label: 'Тип страхования',
      placeholder: 'Выберите тип страхования',
      options: INSURANCE_TYPE_OPTIONS,
      testId: 'insuranceType',
    },
  },
  insurancePeriod: {
    value: 12,
    component: Select,
    componentProps: {
      label: 'Срок страхования',
      placeholder: 'Выберите срок',
      options: INSURANCE_PERIOD_OPTIONS,
      testId: 'insurancePeriod',
    },
  },
  startDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата начала действия полиса',
      type: 'date',
      testId: 'startDate',
    },
  },
  endDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата окончания',
      type: 'date',
      disabled: true,
      testId: 'endDate',
    },
  },
  coverageAmount: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Страховая сумма (₽)',
      type: 'number',
      placeholder: 'от 100 000 до 50 000 000',
      min: 100000,
      max: 50000000,
      testId: 'coverageAmount',
    },
  },
  deductible: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Франшиза (₽)',
      type: 'number',
      placeholder: '0',
      min: 0,
      testId: 'deductible',
    },
  },
  paymentType: {
    value: 'single',
    component: RadioGroup,
    componentProps: {
      label: 'Способ оплаты',
      options: PAYMENT_TYPE_OPTIONS,
      testId: 'paymentType',
    },
  },
  installments: {
    value: undefined,
    component: Select,
    componentProps: {
      label: 'Количество платежей',
      placeholder: 'Выберите количество',
      options: INSTALLMENTS_OPTIONS,
      testId: 'installments',
    },
  },
};
