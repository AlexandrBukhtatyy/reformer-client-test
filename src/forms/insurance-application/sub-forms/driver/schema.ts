import type { FormSchema } from '@reformer/core';
import { Input } from '@/components/ui/input';
import { InputMask } from '@/components/ui/input-mask';
import type { DriverData } from './type';

export const driverSchema: FormSchema<DriverData> = {
  lastName: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Фамилия',
      placeholder: 'Иванов',
      testId: 'driver-lastName',
    },
  },
  firstName: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Имя',
      placeholder: 'Иван',
      testId: 'driver-firstName',
    },
  },
  middleName: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Отчество',
      placeholder: 'Иванович',
      testId: 'driver-middleName',
    },
  },
  birthDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата рождения',
      type: 'date',
      testId: 'driver-birthDate',
    },
  },
  age: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Возраст',
      type: 'number',
      disabled: true,
      testId: 'driver-age',
    },
  },
  licenseNumber: {
    value: '',
    component: InputMask,
    componentProps: {
      label: 'Номер водительского удостоверения',
      placeholder: '00 00 000000',
      mask: '99 99 999999',
      testId: 'driver-licenseNumber',
    },
  },
  licenseIssueDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата выдачи ВУ',
      type: 'date',
      testId: 'driver-licenseIssueDate',
    },
  },
  experience: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Стаж (лет)',
      type: 'number',
      disabled: true,
      testId: 'driver-experience',
    },
  },
};
