import type { FormSchema } from '@reformer/core';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { RadioGroup } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import type { VehicleData } from './type';
import {
  CAR_BRAND_OPTIONS,
  BODY_TYPE_OPTIONS,
  TRANSMISSION_OPTIONS,
} from '../../constants';

export const vehicleSchema: FormSchema<VehicleData> = {
  vin: {
    value: '',
    component: Input,
    componentProps: {
      label: 'VIN-номер',
      placeholder: 'XXXXXXXXXXXXXXXXX',
      maxLength: 17,
      testId: 'vehicle-vin',
    },
  },
  brand: {
    value: '',
    component: Select,
    componentProps: {
      label: 'Марка автомобиля',
      placeholder: 'Выберите марку',
      options: CAR_BRAND_OPTIONS,
      testId: 'vehicle-brand',
    },
  },
  model: {
    value: '',
    component: Select,
    componentProps: {
      label: 'Модель автомобиля',
      placeholder: 'Выберите модель',
      options: [],
      testId: 'vehicle-model',
    },
  },
  year: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Год выпуска',
      type: 'number',
      placeholder: '2020',
      min: 1990,
      max: new Date().getFullYear(),
      testId: 'vehicle-year',
    },
  },
  mileage: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Пробег (км)',
      type: 'number',
      placeholder: '50000',
      min: 0,
      testId: 'vehicle-mileage',
    },
  },
  enginePower: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Мощность двигателя (л.с.)',
      type: 'number',
      placeholder: '150',
      min: 1,
      testId: 'vehicle-enginePower',
    },
  },
  bodyType: {
    value: 'sedan',
    component: Select,
    componentProps: {
      label: 'Тип кузова',
      placeholder: 'Выберите тип',
      options: BODY_TYPE_OPTIONS,
      testId: 'vehicle-bodyType',
    },
  },
  transmission: {
    value: 'manual',
    component: RadioGroup,
    componentProps: {
      label: 'Коробка передач',
      options: TRANSMISSION_OPTIONS,
      testId: 'vehicle-transmission',
    },
  },
  marketValue: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Рыночная стоимость (₽)',
      type: 'number',
      placeholder: '1000000',
      min: 0,
      testId: 'vehicle-marketValue',
    },
  },
  licensePlate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Государственный номер',
      placeholder: 'А000АА000',
      testId: 'vehicle-licensePlate',
    },
  },
  registrationCertificate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Номер СТС',
      placeholder: '00 00 000000',
      testId: 'vehicle-registrationCertificate',
    },
  },
  hasAntiTheft: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Есть противоугонная система',
      testId: 'vehicle-hasAntiTheft',
    },
  },
  antiTheftBrand: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Марка противоугонной системы',
      placeholder: 'StarLine, Pandora...',
      testId: 'vehicle-antiTheftBrand',
    },
  },
};
