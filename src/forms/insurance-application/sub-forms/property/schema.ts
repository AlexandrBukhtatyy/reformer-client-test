import type { FormSchema } from '@reformer/core';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import type { PropertyData } from './type';
import { PROPERTY_TYPE_OPTIONS, WALL_MATERIAL_OPTIONS } from '../../constants';

export const propertySchema: FormSchema<PropertyData> = {
  propertyType: {
    value: 'apartment',
    component: Select,
    componentProps: {
      label: 'Тип недвижимости',
      placeholder: 'Выберите тип',
      options: PROPERTY_TYPE_OPTIONS,
      testId: 'property-type',
    },
  },
  address: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Адрес объекта',
      placeholder: 'г. Москва, ул. Примерная, д. 1, кв. 1',
      testId: 'property-address',
    },
  },
  area: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Площадь (м²)',
      type: 'number',
      placeholder: '50',
      min: 1,
      testId: 'property-area',
    },
  },
  floor: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Этаж',
      type: 'number',
      placeholder: '5',
      min: 1,
      testId: 'property-floor',
    },
  },
  totalFloors: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Этажность дома',
      type: 'number',
      placeholder: '9',
      min: 1,
      testId: 'property-totalFloors',
    },
  },
  buildYear: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Год постройки',
      type: 'number',
      placeholder: '2000',
      min: 1800,
      testId: 'property-buildYear',
    },
  },
  wallMaterial: {
    value: 'brick',
    component: Select,
    componentProps: {
      label: 'Материал стен',
      placeholder: 'Выберите материал',
      options: WALL_MATERIAL_OPTIONS,
      testId: 'property-wallMaterial',
    },
  },
  marketValue: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Рыночная стоимость (₽)',
      type: 'number',
      placeholder: '5000000',
      min: 0,
      testId: 'property-marketValue',
    },
  },
  cadastralNumber: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Кадастровый номер',
      placeholder: '77:01:0001001:1234',
      testId: 'property-cadastralNumber',
    },
  },
  hasAlarm: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Есть охранная сигнализация',
      testId: 'property-hasAlarm',
    },
  },
  hasSprinkler: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Есть система пожаротушения',
      testId: 'property-hasSprinkler',
    },
  },
  isRented: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Сдается в аренду',
      testId: 'property-isRented',
    },
  },
};
