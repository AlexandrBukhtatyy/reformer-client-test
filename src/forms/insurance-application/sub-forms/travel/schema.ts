import type { FormSchema } from '@reformer/core';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import type { TravelData } from './type';
import { DESTINATION_OPTIONS, TRAVEL_PURPOSE_OPTIONS, SPORT_TYPE_OPTIONS } from '../../constants';

export const travelSchema: FormSchema<TravelData> = {
  destination: {
    value: 'europe',
    component: Select,
    componentProps: {
      label: 'Страна/регион назначения',
      placeholder: 'Выберите регион',
      options: DESTINATION_OPTIONS,
      testId: 'travel-destination',
    },
  },
  departureDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата вылета',
      type: 'date',
      testId: 'travel-departureDate',
    },
  },
  returnDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата возвращения',
      type: 'date',
      testId: 'travel-returnDate',
    },
  },
  tripDuration: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Длительность поездки (дней)',
      type: 'number',
      disabled: true,
      testId: 'travel-tripDuration',
    },
  },
  travelPurpose: {
    value: 'tourism',
    component: Select,
    componentProps: {
      label: 'Цель поездки',
      placeholder: 'Выберите цель',
      options: TRAVEL_PURPOSE_OPTIONS,
      testId: 'travel-purpose',
    },
  },
  sportType: {
    value: 'none',
    component: Select,
    componentProps: {
      label: 'Активный отдых',
      placeholder: 'Выберите вид спорта',
      options: SPORT_TYPE_OPTIONS,
      testId: 'travel-sportType',
    },
  },
  hasMedicalConditions: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Есть медицинские противопоказания',
      testId: 'travel-hasMedicalConditions',
    },
  },
  medicalConditionsDescription: {
    value: '',
    component: Textarea,
    componentProps: {
      label: 'Описание медицинских противопоказаний',
      placeholder: 'Опишите противопоказания...',
      rows: 2,
      testId: 'travel-medicalConditionsDescription',
    },
  },
  includesCancellation: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Включить страховку от отмены поездки',
      testId: 'travel-includesCancellation',
    },
  },
  includesLuggage: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Включить страховку багажа',
      testId: 'travel-includesLuggage',
    },
  },
  luggageValue: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Стоимость багажа ($)',
      type: 'number',
      placeholder: '1000',
      min: 0,
      testId: 'travel-luggageValue',
    },
  },
  includesLiability: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Включить гражданскую ответственность',
      testId: 'travel-includesLiability',
    },
  },
  isMultipleTrips: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Мультипоездка (несколько поездок в год)',
      testId: 'travel-isMultipleTrips',
    },
  },
  coverageOptions: {
    medical: {
      value: true,
      component: Checkbox,
      componentProps: {
        label: 'Медицинские расходы',
        testId: 'travel-coverage-medical',
      },
    },
    baggage: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'Багаж',
        testId: 'travel-coverage-baggage',
      },
    },
    tripCancellation: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'Отмена поездки',
        testId: 'travel-coverage-tripCancellation',
      },
    },
    flightDelay: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'Задержка рейса',
        testId: 'travel-coverage-flightDelay',
      },
    },
    carRental: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'Аренда авто',
        testId: 'travel-coverage-carRental',
      },
    },
  },
};
