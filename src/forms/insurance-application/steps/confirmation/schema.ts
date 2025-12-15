import type { FormSchema } from '@reformer/core';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { InputMask } from '@/components/ui/input-mask';
import type { ConfirmationStep } from './type';

export const confirmationSchema: FormSchema<ConfirmationStep> = {
  basePremium: {
    value: 0,
    component: Input,
    componentProps: {
      label: 'Базовая премия',
      type: 'number',
      disabled: true,
      testId: 'basePremium',
    },
  },
  ageCoefficient: {
    value: 1,
    component: Input,
    componentProps: {
      label: 'Коэффициент возраста',
      type: 'number',
      disabled: true,
      testId: 'ageCoefficient',
    },
  },
  experienceCoefficient: {
    value: 1,
    component: Input,
    componentProps: {
      label: 'Коэффициент стажа',
      type: 'number',
      disabled: true,
      testId: 'experienceCoefficient',
    },
  },
  regionalCoefficient: {
    value: 1,
    component: Input,
    componentProps: {
      label: 'Региональный коэффициент',
      type: 'number',
      disabled: true,
      testId: 'regionalCoefficient',
    },
  },
  kbmCoefficient: {
    value: 1,
    component: Input,
    componentProps: {
      label: 'КБМ (бонус-малус)',
      type: 'number',
      disabled: true,
      testId: 'kbmCoefficient',
    },
  },
  deductibleDiscount: {
    value: 0,
    component: Input,
    componentProps: {
      label: 'Скидка за франшизу',
      type: 'number',
      disabled: true,
      testId: 'deductibleDiscount',
    },
  },
  promoDiscount: {
    value: 0,
    component: Input,
    componentProps: {
      label: 'Скидка по промокоду',
      type: 'number',
      disabled: true,
      testId: 'promoDiscount',
    },
  },
  multiPolicyDiscount: {
    value: 0,
    component: Input,
    componentProps: {
      label: 'Скидка за мультиполис',
      type: 'number',
      disabled: true,
      testId: 'multiPolicyDiscount',
    },
  },
  totalPremium: {
    value: 0,
    component: Input,
    componentProps: {
      label: 'Итого к оплате',
      type: 'number',
      disabled: true,
      testId: 'totalPremium',
    },
  },
  installmentAmount: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Сумма одного платежа',
      type: 'number',
      disabled: true,
      testId: 'installmentAmount',
    },
  },
  agreePersonalData: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Согласен на обработку персональных данных',
      testId: 'agreePersonalData',
    },
  },
  agreeInsuranceTerms: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Ознакомлен и согласен с условиями страхования',
      testId: 'agreeInsuranceTerms',
    },
  },
  agreeElectronicPolicy: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Согласен на получение электронного полиса',
      testId: 'agreeElectronicPolicy',
    },
  },
  agreeMarketing: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Согласен на получение рекламных материалов',
      testId: 'agreeMarketing',
    },
  },
  confirmDataAccuracy: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Подтверждаю достоверность указанных данных',
      testId: 'confirmDataAccuracy',
    },
  },
  smsVerificationCode: {
    value: '',
    component: InputMask,
    componentProps: {
      label: 'Код подтверждения из СМС',
      placeholder: '______',
      mask: '999999',
      testId: 'smsVerificationCode',
    },
  },
};
