import { Input, RadioGroup } from '@/components/ui';
import type { FormSchema } from '@reformer/core';
import type { Step2Form } from './type';

export const step2Schema: FormSchema<Step2Form> = {
  insuredType: {
    value: 'individual',
    component: RadioGroup,
    componentProps: {
      label: 'Тип страхователя',
      options: [
        { value: 'individual', label: 'Физическое лицо' },
        { value: 'company', label: 'Юридическое лицо' },
      ],
    },
  },
  personalData: {
    lastName: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Фамилия',
        placeholder: 'Введите фамилию',
      },
    },
    firstName: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Имя',
        placeholder: 'Введите имя',
      },
    },
    middleName: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Отчество',
        placeholder: 'Введите отчество',
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
    gender: {
      value: 'male',
      component: RadioGroup,
      componentProps: {
        label: 'Пол',
        options: [
          { value: 'male', label: 'Мужской' },
          { value: 'female', label: 'Женский' },
        ],
      },
    },
  },
  companyData: {
    name: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Название организации',
        placeholder: 'ООО "Компания"',
      },
    },
    inn: {
      value: '',
      component: Input,
      componentProps: {
        label: 'ИНН организации',
        placeholder: '1234567890',
      },
    },
    ogrn: {
      value: '',
      component: Input,
      componentProps: {
        label: 'ОГРН',
        placeholder: '1234567890123',
      },
    },
    kpp: {
      value: '',
      component: Input,
      componentProps: {
        label: 'КПП',
        placeholder: '123456789',
      },
    },
    ceoName: {
      value: '',
      component: Input,
      componentProps: {
        label: 'ФИО руководителя',
        placeholder: 'Иванов Иван Иванович',
      },
    },
  },
  passportData: {
    series: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Серия паспорта',
        placeholder: '12 34',
      },
    },
    number: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Номер паспорта',
        placeholder: '123456',
      },
    },
    issueDate: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Дата выдачи',
        type: 'date',
      },
    },
    issuedBy: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Кем выдан',
        placeholder: 'Отделением УФМС...',
      },
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
  email: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Email',
      type: 'email',
      placeholder: 'example@mail.com',
    },
  },
  fullName: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Полное имя (ФИО)',
      disabled: true,
    },
  },
  age: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Возраст',
      type: 'number',
      disabled: true,
    },
  },
};