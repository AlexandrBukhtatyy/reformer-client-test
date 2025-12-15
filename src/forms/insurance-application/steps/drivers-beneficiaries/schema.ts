import type { FormSchema } from '@reformer/core';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import type { DriversBeneficiariesStep } from './type';
import { driverSchema } from '../../sub-forms/driver/schema';
import { beneficiarySchema } from '../../sub-forms/beneficiary/schema';

export const driversBeneficiariesSchema: FormSchema<DriversBeneficiariesStep> = {
  unlimitedDrivers: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Неограниченное количество водителей',
      testId: 'unlimitedDrivers',
    },
  },
  drivers: [driverSchema],
  minDriverAge: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Минимальный возраст водителя',
      type: 'number',
      disabled: true,
      testId: 'minDriverAge',
    },
  },
  minDriverExperience: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Минимальный стаж водителя',
      type: 'number',
      disabled: true,
      testId: 'minDriverExperience',
    },
  },
  beneficiaries: [beneficiarySchema],
  totalBeneficiaryShare: {
    value: 0,
    component: Input,
    componentProps: {
      label: 'Общая сумма долей (%)',
      type: 'number',
      disabled: true,
      testId: 'totalBeneficiaryShare',
    },
  },
};
