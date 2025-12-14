import { Input, Checkbox } from '@/components/ui';
import type { FormSchema } from '@reformer/core';
import type { Step6Form } from './type';

export const step6Schema: FormSchema<Step6Form> = {
  // Premium calculation results
  basePremium: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Базовая премия (₽)',
      type: 'number',
      disabled: true,
    },
  },
  ageCoefficient: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Коэффициент возраста',
      type: 'number',
      disabled: true,
    },
  },
  experienceCoefficient: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Коэффициент стажа',
      type: 'number',
      disabled: true,
    },
  },
  regionCoefficient: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Региональный коэффициент',
      type: 'number',
      disabled: true,
    },
  },
  claimsCoefficient: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Коэффициент страховых случаев',
      type: 'number',
      disabled: true,
    },
  },
  deductibleDiscount: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Скидка за франшизу (%)',
      type: 'number',
      disabled: true,
    },
  },
  promoDiscount: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Скидка по промокоду (%)',
      type: 'number',
      disabled: true,
    },
  },
  multiPolicyDiscount: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Скидка за мультиполис (%)',
      type: 'number',
      disabled: true,
    },
  },
  totalPremium: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Итоговая премия (₽)',
      type: 'number',
      disabled: true,
    },
  },
  installmentAmount: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Сумма ежемесячного платежа (₽)',
      type: 'number',
      disabled: true,
    },
  },

  // Confirmation and agreement
  agreePersonalData: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Согласие на обработку персональных данных',
    },
  },
  agreeTerms: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Согласие с условиями страхования',
    },
  },
  agreeElectronicPolicy: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Согласие на электронный полис',
    },
  },
  agreeMarketing: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Согласие на маркетинговые рассылки',
    },
  },
  confirmAccuracy: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Подтверждение достоверности информации',
    },
  },
  electronicSignature: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Электронная подпись',
      placeholder: 'ФИО полностью',
    },
  },

  // Policy data
  policyNumber: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Номер полиса',
      disabled: true,
    },
  },
  policyStartDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата начала действия',
      type: 'date',
      disabled: true,
    },
  },
  policyEndDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата окончания действия',
      type: 'date',
      disabled: true,
    },
  },
};