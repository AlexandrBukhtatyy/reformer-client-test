import type { FormSchema } from '@reformer/core';
import { Input } from '@/components/ui/input';
import type { TravelerData } from './type';

export const travelerSchema: FormSchema<TravelerData> = {
  lastName: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Фамилия (как в загранпаспорте)',
      placeholder: 'IVANOV',
      testId: 'traveler-lastName',
    },
  },
  firstName: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Имя (как в загранпаспорте)',
      placeholder: 'IVAN',
      testId: 'traveler-firstName',
    },
  },
  middleName: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Отчество',
      placeholder: 'Иванович',
      testId: 'traveler-middleName',
    },
  },
  birthDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата рождения',
      type: 'date',
      testId: 'traveler-birthDate',
    },
  },
  passportNumber: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Номер загранпаспорта',
      placeholder: '00 0000000',
      testId: 'traveler-passportNumber',
    },
  },
  passportExpiry: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Срок действия паспорта',
      type: 'date',
      testId: 'traveler-passportExpiry',
    },
  },
  citizenship: {
    value: 'RUS',
    component: Input,
    componentProps: {
      label: 'Гражданство',
      placeholder: 'RUS',
      testId: 'traveler-citizenship',
    },
  },
};
