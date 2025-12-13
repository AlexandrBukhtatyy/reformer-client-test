import { Input, Select, Checkbox, Textarea } from '@/components/ui';
import type { FormSchema } from '@reformer/core';
import type { Step5Form } from './type';

export const step5Schema: FormSchema<Step5Form> = {
  hasPreviousInsurance: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Был ли полис ранее',
    },
  },
  previousInsurer: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Предыдущий страховщик',
      placeholder: 'Название компании',
    },
  },
  previousPolicyNumber: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Номер предыдущего полиса',
      placeholder: 'XXX-000000',
    },
  },
  previousPolicyEndDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата окончания предыдущего полиса',
      type: 'date',
    },
  },
  hadClaims: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Были ли страховые случаи',
    },
  },
  claims: [{
    date: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Дата события',
        type: 'date',
      },
    },
    type: {
      value: 'accident',
      component: Select,
      componentProps: {
        label: 'Тип события',
        options: [
          { value: 'accident', label: 'ДТП' },
          { value: 'theft', label: 'Угон/кража' },
          { value: 'damage', label: 'Повреждение' },
          { value: 'disaster', label: 'Стихийное бедствие' },
          { value: 'medical', label: 'Медицинский случай' },
          { value: 'other', label: 'Другое' },
        ],
      },
    },
    description: {
      value: '',
      component: Textarea,
      componentProps: {
        label: 'Описание',
        placeholder: 'Опишите событие',
      },
    },
    amount: {
      value: undefined,
      component: Input,
      componentProps: {
        label: 'Сумма выплаты (₽)',
        type: 'number',
        placeholder: '100000',
      },
    },
    atFault: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'По вине страхователя',
      },
    },
  }],
  promoCode: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Промокод',
      placeholder: 'PROMO2024',
    },
  },
  referralSource: {
    value: 'internet',
    component: Select,
    componentProps: {
      label: 'Откуда узнали о нас',
      options: [
        { value: 'internet', label: 'Интернет' },
        { value: 'friends', label: 'Рекомендации друзей' },
        { value: 'tv', label: 'Телевидение' },
        { value: 'agent', label: 'Страховой агент' },
        { value: 'other', label: 'Другое' },
      ],
    },
  },
  agentCode: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Код агента',
      placeholder: 'AGT-000',
    },
  },
  additionalNotes: {
    value: '',
    component: Textarea,
    componentProps: {
      label: 'Дополнительные комментарии',
      placeholder: 'Ваши пожелания...',
    },
  },
};