import { Input, Checkbox, Select } from '@/components/ui';
import type { FormSchema } from '@reformer/core';
import type { Step4Form } from './type';

export const step4Schema: FormSchema<Step4Form> = {
  drivers: [{
    fullName: {
      value: '',
      component: Input,
      componentProps: {
        label: 'ФИО водителя',
        placeholder: 'Иванов Иван Иванович',
      },
    },
    birthDate: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Дата рождения',
        type: 'date',
      },
    },
    licenseNumber: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Номер ВУ',
        placeholder: '00 00 000000',
      },
    },
    licenseIssueDate: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Дата выдачи ВУ',
        type: 'date',
      },
    },
    drivingExperience: {
      value: undefined,
      component: Input,
      componentProps: {
        label: 'Стаж вождения (лет)',
        type: 'number',
        disabled: true,
      },
    },
    accidentsCount: {
      value: 0,
      component: Input,
      componentProps: {
        label: 'Кол-во ДТП за 3 года',
        type: 'number',
        placeholder: '0',
      },
    },
    isMainDriver: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'Основной водитель',
      },
    },
  }],
  unlimitedDrivers: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Неограниченное количество водителей',
    },
  },
  minDriverAge: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Мин. возраст водителя',
      type: 'number',
      disabled: true,
    },
  },
  minDriverExperience: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Мин. стаж водителя',
      type: 'number',
      disabled: true,
    },
  },

  beneficiaries: [{
    fullName: {
      value: '',
      component: Input,
      componentProps: {
        label: 'ФИО',
        placeholder: 'Иванов Иван Иванович',
      },
    },
    birthDate: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Дата рождения',
        type: 'date',
      },
    },
    relationship: {
      value: 'spouse',
      component: Select,
      componentProps: {
        label: 'Степень родства',
        options: [
          { value: 'spouse', label: 'Супруг(а)' },
          { value: 'child', label: 'Ребенок' },
          { value: 'parent', label: 'Родитель' },
          { value: 'sibling', label: 'Брат/сестра' },
          { value: 'other', label: 'Другое' },
        ],
      },
    },
    share: {
      value: undefined,
      component: Input,
      componentProps: {
        label: 'Доля (%)',
        type: 'number',
        placeholder: '50',
      },
    },
    phone: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Телефон',
        placeholder: '+7 (___) ___-__-__',
      },
    },
  }],
  totalBeneficiaryShare: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Сумма долей (%)',
      type: 'number',
      disabled: true,
    },
  },

  travelers: [{
    fullName: {
      value: '',
      component: Input,
      componentProps: {
        label: 'ФИО',
        placeholder: 'Иванов Иван Иванович',
      },
    },
    birthDate: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Дата рождения',
        type: 'date',
      },
    },
    passportNumber: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Номер загранпаспорта',
        placeholder: '00 0000000',
      },
    },
  }],
};