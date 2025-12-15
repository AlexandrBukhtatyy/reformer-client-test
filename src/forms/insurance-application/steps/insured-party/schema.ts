import type { FormSchema } from '@reformer/core';
import { Input } from '@/components/ui/input';
import { RadioGroup } from '@/components/ui/radio-group';
import { InputMask } from '@/components/ui/input-mask';
import type { InsuredPartyStep } from './type';
import { INSURED_TYPE_OPTIONS, GENDER_OPTIONS } from '../../constants';

export const insuredPartySchema: FormSchema<InsuredPartyStep> = {
  insuredType: {
    value: 'individual',
    component: RadioGroup,
    componentProps: {
      label: 'Тип страхователя',
      options: INSURED_TYPE_OPTIONS,
      testId: 'insuredType',
    },
  },
  personalData: {
    lastName: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Фамилия',
        placeholder: 'Иванов',
        testId: 'personalData-lastName',
      },
    },
    firstName: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Имя',
        placeholder: 'Иван',
        testId: 'personalData-firstName',
      },
    },
    middleName: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Отчество',
        placeholder: 'Иванович',
        testId: 'personalData-middleName',
      },
    },
    birthDate: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Дата рождения',
        type: 'date',
        testId: 'personalData-birthDate',
      },
    },
    gender: {
      value: 'male',
      component: RadioGroup,
      componentProps: {
        label: 'Пол',
        options: GENDER_OPTIONS,
        testId: 'personalData-gender',
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
        testId: 'companyData-name',
      },
    },
    inn: {
      value: '',
      component: InputMask,
      componentProps: {
        label: 'ИНН организации',
        placeholder: '1234567890',
        mask: '9999999999',
        testId: 'companyData-inn',
      },
    },
    ogrn: {
      value: '',
      component: InputMask,
      componentProps: {
        label: 'ОГРН',
        placeholder: '1234567890123',
        mask: '9999999999999',
        testId: 'companyData-ogrn',
      },
    },
    kpp: {
      value: '',
      component: InputMask,
      componentProps: {
        label: 'КПП',
        placeholder: '123456789',
        mask: '999999999',
        testId: 'companyData-kpp',
      },
    },
    ceoName: {
      value: '',
      component: Input,
      componentProps: {
        label: 'ФИО руководителя',
        placeholder: 'Иванов Иван Иванович',
        testId: 'companyData-ceoName',
      },
    },
  },
  passportData: {
    series: {
      value: '',
      component: InputMask,
      componentProps: {
        label: 'Серия паспорта',
        placeholder: '12 34',
        mask: '99 99',
        testId: 'passportData-series',
      },
    },
    number: {
      value: '',
      component: InputMask,
      componentProps: {
        label: 'Номер паспорта',
        placeholder: '123456',
        mask: '999999',
        testId: 'passportData-number',
      },
    },
    issueDate: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Дата выдачи',
        type: 'date',
        testId: 'passportData-issueDate',
      },
    },
    issuedBy: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Кем выдан',
        placeholder: 'Отделением УФМС...',
        testId: 'passportData-issuedBy',
      },
    },
  },
  phone: {
    value: '',
    component: InputMask,
    componentProps: {
      label: 'Телефон',
      placeholder: '+7 (___) ___-__-__',
      mask: '+7 (999) 999-99-99',
      testId: 'phone',
    },
  },
  email: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Email',
      type: 'email',
      placeholder: 'example@mail.com',
      testId: 'email',
    },
  },
  fullName: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Полное имя (ФИО)',
      disabled: true,
      testId: 'fullName',
    },
  },
  age: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Возраст',
      type: 'number',
      disabled: true,
      testId: 'age',
    },
  },
};
