import type { FormSchema } from '@reformer/core';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import type { LifeHealthData } from './type';

export const lifeHealthSchema: FormSchema<LifeHealthData> = {
  height: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Рост (см)',
      type: 'number',
      placeholder: '175',
      min: 100,
      max: 250,
      testId: 'lifeHealth-height',
    },
  },
  weight: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Вес (кг)',
      type: 'number',
      placeholder: '70',
      min: 30,
      max: 300,
      testId: 'lifeHealth-weight',
    },
  },
  bmi: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Индекс массы тела (ИМТ)',
      type: 'number',
      disabled: true,
      testId: 'lifeHealth-bmi',
    },
  },
  bloodPressureSystolic: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Давление (верхнее)',
      type: 'number',
      placeholder: '120',
      min: 80,
      max: 200,
      testId: 'lifeHealth-bloodPressureSystolic',
    },
  },
  bloodPressureDiastolic: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Давление (нижнее)',
      type: 'number',
      placeholder: '80',
      min: 50,
      max: 130,
      testId: 'lifeHealth-bloodPressureDiastolic',
    },
  },
  hasChronicDiseases: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Есть хронические заболевания',
      testId: 'lifeHealth-hasChronicDiseases',
    },
  },
  chronicDiseasesDescription: {
    value: '',
    component: Textarea,
    componentProps: {
      label: 'Описание хронических заболеваний',
      placeholder: 'Опишите заболевания...',
      rows: 3,
      testId: 'lifeHealth-chronicDiseasesDescription',
    },
  },
  isSmoker: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Курите',
      testId: 'lifeHealth-isSmoker',
    },
  },
  smokingYears: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Стаж курения (лет)',
      type: 'number',
      placeholder: '5',
      min: 0,
      testId: 'lifeHealth-smokingYears',
    },
  },
  hasAllergies: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Есть аллергии',
      testId: 'lifeHealth-hasAllergies',
    },
  },
  allergiesDescription: {
    value: '',
    component: Textarea,
    componentProps: {
      label: 'Описание аллергий',
      placeholder: 'Опишите аллергии...',
      rows: 2,
      testId: 'lifeHealth-allergiesDescription',
    },
  },
  hasSurgeries: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Были операции',
      testId: 'lifeHealth-hasSurgeries',
    },
  },
  surgeriesDescription: {
    value: '',
    component: Textarea,
    componentProps: {
      label: 'Описание операций',
      placeholder: 'Опишите операции...',
      rows: 2,
      testId: 'lifeHealth-surgeriesDescription',
    },
  },
  occupation: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Род занятий',
      placeholder: 'Программист',
      testId: 'lifeHealth-occupation',
    },
  },
  isHazardousWork: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Работа связана с опасными условиями',
      testId: 'lifeHealth-isHazardousWork',
    },
  },
  practicesSports: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Занимаетесь спортом',
      testId: 'lifeHealth-practicesSports',
    },
  },
  extremeSports: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Экстремальные виды спорта',
      testId: 'lifeHealth-extremeSports',
    },
  },
  coverageOptions: {
    death: {
      value: true,
      component: Checkbox,
      componentProps: {
        label: 'Смерть',
        testId: 'lifeHealth-coverage-death',
      },
    },
    disability: {
      value: true,
      component: Checkbox,
      componentProps: {
        label: 'Инвалидность',
        testId: 'lifeHealth-coverage-disability',
      },
    },
    criticalIllness: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'Критические заболевания',
        testId: 'lifeHealth-coverage-criticalIllness',
      },
    },
    accident: {
      value: true,
      component: Checkbox,
      componentProps: {
        label: 'Несчастный случай',
        testId: 'lifeHealth-coverage-accident',
      },
    },
  },
};
