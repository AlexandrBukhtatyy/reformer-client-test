import type { FormSchema } from '@reformer/core';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import type { HistoryStep } from './type';
import { REFERRAL_SOURCE_OPTIONS } from '../../constants';
import { claimSchema } from '../../sub-forms/claim/schema';

export const historySchema: FormSchema<HistoryStep> = {
  hasPreviousInsurance: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Есть действующий или истекший полис',
      testId: 'hasPreviousInsurance',
    },
  },
  previousInsurer: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Страховая компания',
      placeholder: 'Название страховой компании',
      testId: 'previousInsurer',
    },
  },
  previousPolicyNumber: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Номер полиса',
      placeholder: 'XXX-000000000',
      testId: 'previousPolicyNumber',
    },
  },
  previousPolicyEndDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата окончания полиса',
      type: 'date',
      testId: 'previousPolicyEndDate',
    },
  },
  hasClaimsHistory: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Были страховые случаи',
      testId: 'hasClaimsHistory',
    },
  },
  claims: [claimSchema],
  promoCode: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Промокод',
      placeholder: 'PROMO2024',
      testId: 'promoCode',
    },
  },
  referralSource: {
    value: '',
    component: Select,
    componentProps: {
      label: 'Откуда узнали о нас',
      placeholder: 'Выберите источник',
      options: REFERRAL_SOURCE_OPTIONS,
      testId: 'referralSource',
    },
  },
  agentCode: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Код агента',
      placeholder: 'AG-00000',
      testId: 'agentCode',
    },
  },
  additionalNotes: {
    value: '',
    component: Textarea,
    componentProps: {
      label: 'Дополнительная информация',
      placeholder: 'Любая дополнительная информация...',
      rows: 4,
      testId: 'additionalNotes',
    },
  },
};
