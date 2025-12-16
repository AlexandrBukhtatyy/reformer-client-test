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
    region: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Регион',
        placeholder: 'Московская область',
        testId: 'property-address-region',
      },
    },
    city: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Город',
        placeholder: 'Москва',
        testId: 'property-address-city',
      },
    },
    street: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Улица',
        placeholder: 'ул. Примерная',
        testId: 'property-address-street',
      },
    },
    house: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Дом',
        placeholder: '1',
        testId: 'property-address-house',
      },
    },
    apartment: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Квартира',
        placeholder: '1',
        testId: 'property-address-apartment',
      },
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
  hasFireAlarm: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Есть пожарная сигнализация',
      testId: 'property-hasFireAlarm',
    },
  },
  ownershipDoc: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Номер документа о собственности',
      placeholder: '77-77/001-77/001/001/2020-1234',
      testId: 'property-ownershipDoc',
    },
  },
  coverageOptions: {
    structure: {
      value: true,
      component: Checkbox,
      componentProps: {
        label: 'Конструктивные элементы',
        testId: 'property-coverage-structure',
      },
    },
    interior: {
      value: true,
      component: Checkbox,
      componentProps: {
        label: 'Внутренняя отделка',
        testId: 'property-coverage-interior',
      },
    },
    movables: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'Движимое имущество',
        testId: 'property-coverage-movables',
      },
    },
    liability: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'Гражданская ответственность',
        testId: 'property-coverage-liability',
      },
    },
  },
};
