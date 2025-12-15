import type { FormSchema } from '@reformer/core';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { InputMask } from '@/components/ui/input-mask';
import type { BeneficiaryData } from './type';

const RELATION_OPTIONS = [
  { value: 'spouse', label: 'Супруг(а)' },
  { value: 'child', label: 'Ребенок' },
  { value: 'parent', label: 'Родитель' },
  { value: 'sibling', label: 'Брат/Сестра' },
  { value: 'other', label: 'Другое' },
];

export const beneficiarySchema: FormSchema<BeneficiaryData> = {
  lastName: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Фамилия',
      placeholder: 'Иванова',
      testId: 'beneficiary-lastName',
    },
  },
  firstName: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Имя',
      placeholder: 'Мария',
      testId: 'beneficiary-firstName',
    },
  },
  middleName: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Отчество',
      placeholder: 'Ивановна',
      testId: 'beneficiary-middleName',
    },
  },
  birthDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата рождения',
      type: 'date',
      testId: 'beneficiary-birthDate',
    },
  },
  relation: {
    value: 'spouse',
    component: Select,
    componentProps: {
      label: 'Степень родства',
      placeholder: 'Выберите',
      options: RELATION_OPTIONS,
      testId: 'beneficiary-relation',
    },
  },
  share: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Доля (%)',
      type: 'number',
      placeholder: '50',
      min: 1,
      max: 100,
      testId: 'beneficiary-share',
    },
  },
  passportSeries: {
    value: '',
    component: InputMask,
    componentProps: {
      label: 'Серия паспорта',
      placeholder: '00 00',
      mask: '99 99',
      testId: 'beneficiary-passportSeries',
    },
  },
  passportNumber: {
    value: '',
    component: InputMask,
    componentProps: {
      label: 'Номер паспорта',
      placeholder: '000000',
      mask: '999999',
      testId: 'beneficiary-passportNumber',
    },
  },
  phone: {
    value: '',
    component: InputMask,
    componentProps: {
      label: 'Телефон',
      placeholder: '+7 (___) ___-__-__',
      mask: '+7 (999) 999-99-99',
      testId: 'beneficiary-phone',
    },
  },
};
