import { Input, Select, Checkbox, RadioGroup } from '@/components/ui';
import type { FormSchema } from '@reformer/core';
import type { Step6Form } from './type';

export const step6Schema: FormSchema<Step6Form> = {
  basePremium: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Базовая премия (₽)',
      type: 'number',
      disabled: true,
    },
  },
  riskCoefficients: {
    age: {
      value: 1,
      component: Input,
      componentProps: {
        label: 'Коэффициент возраста',
        type: 'number',
        disabled: true,
      },
    },
    experience: {
      value: 1,
      component: Input,
      componentProps: {
        label: 'Коэффициент стажа',
        type: 'number',
        disabled: true,
      },
    },
    region: {
      value: 1,
      component: Input,
      componentProps: {
        label: 'Региональный коэффициент',
        type: 'number',
        disabled: true,
      },
    },
    vehicleAge: {
      value: undefined,
      component: Input,
      componentProps: {
        label: 'Коэффициент возраста ТС',
        type: 'number',
        disabled: true,
      },
    },
    vehiclePower: {
      value: undefined,
      component: Input,
      componentProps: {
        label: 'Коэффициент мощности ТС',
        type: 'number',
        disabled: true,
      },
    },
    propertyValue: {
      value: undefined,
      component: Input,
      componentProps: {
        label: 'Коэффициент стоимости имущества',
        type: 'number',
        disabled: true,
      },
    },
  },
  discounts: {
    loyalty: {
      value: 0,
      component: Input,
      componentProps: {
        label: 'Скидка за лояльность (%)',
        type: 'number',
        disabled: true,
      },
    },
    safeDriver: {
      value: undefined,
      component: Input,
      componentProps: {
        label: 'Скидка за безопасное вождение (%)',
        type: 'number',
        disabled: true,
      },
    },
    securitySystem: {
      value: undefined,
      component: Input,
      componentProps: {
        label: 'Скидка за сигнализацию (%)',
        type: 'number',
        disabled: true,
      },
    },
    franchise: {
      value: undefined,
      component: Input,
      componentProps: {
        label: 'Скидка за франшизу (%)',
        type: 'number',
        disabled: true,
      },
    },
    promoCode: {
      value: undefined,
      component: Input,
      componentProps: {
        label: 'Скидка по промокоду (%)',
        type: 'number',
        disabled: true,
      },
    },
  },
  calculatedPremium: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Итоговая премия (₽)',
      type: 'number',
      disabled: true,
    },
  },
  paymentMethod: {
    value: 'online',
    component: RadioGroup,
    componentProps: {
      label: 'Способ оплаты',
      options: [
        { value: 'online', label: 'Онлайн-оплата' },
        { value: 'bank_transfer', label: 'Банковский перевод' },
        { value: 'installments', label: 'Рассрочка' },
      ],
    },
  },
  installmentsCount: {
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
      ],
    },
  },
  installmentAmount: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Сумма платежа (₽)',
      type: 'number',
      disabled: true,
    },
  },
  agreeToTerms: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Я согласен с условиями страхования',
    },
  },
  agreeToProcessing: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Я даю согласие на обработку персональных данных',
    },
  },
  agreeToCommunications: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Я согласен получать информационные сообщения',
    },
  },
  confirmInformation: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Я подтверждаю достоверность предоставленной информации',
    },
  },
  electronicSignature: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Электронная подпись (ФИО)',
      placeholder: 'Иванов Иван Иванович',
    },
  },
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