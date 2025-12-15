import type { FormSchema } from '@reformer/core';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import type { ClaimData } from './type';
import { CLAIM_TYPE_OPTIONS } from '../../constants';

export const claimSchema: FormSchema<ClaimData> = {
  date: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата страхового случая',
      type: 'date',
      testId: 'claim-date',
    },
  },
  claimType: {
    value: 'accident',
    component: Select,
    componentProps: {
      label: 'Тип страхового случая',
      placeholder: 'Выберите тип',
      options: CLAIM_TYPE_OPTIONS,
      testId: 'claim-type',
    },
  },
  description: {
    value: '',
    component: Textarea,
    componentProps: {
      label: 'Описание',
      placeholder: 'Опишите страховой случай...',
      rows: 3,
      testId: 'claim-description',
    },
  },
  amount: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Сумма ущерба (₽)',
      type: 'number',
      placeholder: '100000',
      min: 0,
      testId: 'claim-amount',
    },
  },
  wasCompensated: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Была выплачена компенсация',
      testId: 'claim-wasCompensated',
    },
  },
  compensationAmount: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Сумма компенсации (₽)',
      type: 'number',
      placeholder: '50000',
      min: 0,
      testId: 'claim-compensationAmount',
    },
  },
};
