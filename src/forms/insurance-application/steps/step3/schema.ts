import { Input, Select, RadioGroup, Checkbox } from '@/components/ui';
import type { FormSchema } from '@reformer/core';
import type { Step3Form } from './type';

export const step3Schema: FormSchema<Step3Form> = {
  vehicle: {
    vin: {
      value: '',
      component: Input,
      componentProps: {
        label: 'VIN-номер',
        placeholder: 'XXXXXXXXX',
      },
    },
    brand: {
      value: '',
      component: Select,
      componentProps: {
        label: 'Марка автомобиля',
        placeholder: 'Выберите марку',
        options: [
          { value: 'toyota', label: 'Toyota' },
          { value: 'bmw', label: 'BMW' },
          { value: 'mercedes', label: 'Mercedes' },
          { value: 'audi', label: 'Audi' },
          { value: 'volkswagen', label: 'Volkswagen' },
        ],
      },
    },
    model: {
      value: '',
      component: Select,
      componentProps: {
        label: 'Модель автомобиля',
        placeholder: 'Выберите модель',
        options: [],
      },
    },
    year: {
      value: undefined,
      component: Input,
      componentProps: {
        label: 'Год выпуска',
        type: 'number',
        placeholder: '2020',
      },
    },
    mileage: {
      value: undefined,
      component: Input,
      componentProps: {
        label: 'Пробег (км)',
        type: 'number',
        placeholder: '50000',
      },
    },
    enginePower: {
      value: undefined,
      component: Input,
      componentProps: {
        label: 'Мощность двигателя (л.с.)',
        type: 'number',
        placeholder: '150',
      },
    },
    bodyType: {
      value: 'sedan',
      component: Select,
      componentProps: {
        label: 'Тип кузова',
        options: [
          { value: 'sedan', label: 'Седан' },
          { value: 'hatchback', label: 'Хэтчбек' },
          { value: 'suv', label: 'Внедорожник' },
          { value: 'wagon', label: 'Универсал' },
          { value: 'coupe', label: 'Купе' },
          { value: 'minivan', label: 'Минивэн' },
          { value: 'pickup', label: 'Пикап' },
        ],
      },
    },
    transmission: {
      value: 'manual',
      component: RadioGroup,
      componentProps: {
        label: 'Коробка передач',
        options: [
          { value: 'manual', label: 'Механика' },
          { value: 'automatic', label: 'Автомат' },
        ],
      },
    },
    marketValue: {
      value: undefined,
      component: Input,
      componentProps: {
        label: 'Рыночная стоимость (₽)',
        type: 'number',
        placeholder: '15000',
      },
    },
    licensePlate: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Госномер',
        placeholder: 'А000АА000',
      },
    },
    registrationCert: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Номер СТС',
        placeholder: '00 00 0000',
      },
    },
    hasAntiTheft: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'Наличие противоугонной системы',
      },
    },
    antiTheftBrand: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Марка противоугонной системы',
        placeholder: 'StarLine',
      },
    },
    garageParking: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'Гаражное хранение',
      },
    },
    usagePurpose: {
      value: 'personal',
      component: Select,
      componentProps: {
        label: 'Цель использования',
        options: [
          { value: 'personal', label: 'Личное' },
          { value: 'taxi', label: 'Такси' },
          { value: 'training', label: 'Учебный' },
          { value: 'commercial', label: 'Коммерческое' },
        ],
      },
    },
  },
  property: {
    type: {
      value: 'apartment',
      component: Select,
      componentProps: {
        label: 'Тип недвижимости',
        options: [
          { value: 'apartment', label: 'Квартира' },
          { value: 'house', label: 'Дом' },
          { value: 'townhouse', label: 'Таунхаус' },
          { value: 'commercial', label: 'Коммерческая' },
          { value: 'land', label: 'Земельный участок' },
        ],
      },
    },
    address: {
      region: {
        value: '',
        component: Input,
        componentProps: {
          label: 'Регион',
          placeholder: 'Московская область',
        },
      },
      city: {
        value: '',
        component: Input,
        componentProps: {
          label: 'Город',
          placeholder: 'Москва',
        },
      },
      street: {
        value: '',
        component: Input,
        componentProps: {
          label: 'Улица',
          placeholder: 'ул. Ленина',
        },
      },
      house: {
        value: '',
        component: Input,
        componentProps: {
          label: 'Дом',
          placeholder: '1',
        },
      },
      apartment: {
        value: '',
        component: Input,
        componentProps: {
          label: 'Квартира',
          placeholder: '1',
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
      },
    },
    floors: {
      value: undefined,
      component: Input,
      componentProps: {
        label: 'Этажность здания',
        type: 'number',
        placeholder: '9',
      },
    },
    floor: {
      value: undefined,
      component: Input,
      componentProps: {
        label: 'Этаж квартиры',
        type: 'number',
        placeholder: '5',
      },
    },
    yearBuilt: {
      value: undefined,
      component: Input,
      componentProps: {
        label: 'Год постройки',
        type: 'number',
        placeholder: '2010',
      },
    },
    wallMaterial: {
      value: 'brick',
      component: Select,
      componentProps: {
        label: 'Материал стен',
        options: [
          { value: 'brick', label: 'Кирпич' },
          { value: 'concrete', label: 'Бетон' },
          { value: 'wood', label: 'Дерево' },
          { value: 'panel', label: 'Панель' },
          { value: 'monolithic', label: 'Монолит' },
          { value: 'other', label: 'Другое' },
        ],
      },
    },
    marketValue: {
      value: undefined,
      component: Input,
      componentProps: {
        label: 'Рыночная стоимость (₽)',
        type: 'number',
        placeholder: '5000000',
      },
    },
    hasAlarm: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'Охранная сигнализация',
      },
    },
    hasFireAlarm: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'Пожарная сигнализация',
      },
    },
    ownershipDoc: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Номер документа о собственности',
        placeholder: '00-00/000-00/000/0000-0000',
      },
    },
  },
  health: {
    height: {
      value: undefined,
      component: Input,
      componentProps: {
        label: 'Рост (см)',
        type: 'number',
        placeholder: '175',
      },
    },
    weight: {
      value: undefined,
      component: Input,
      componentProps: {
        label: 'Вес (кг)',
        type: 'number',
        placeholder: '70',
      },
    },
    bmi: {
      value: undefined,
      component: Input,
      componentProps: {
        label: 'Индекс массы тела',
        type: 'number',
        disabled: true,
      },
    },
    bloodPressure: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Артериальное давление',
        placeholder: '120/80',
      },
    },
    isSmoker: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'Курящий',
      },
    },
    smokingYears: {
      value: undefined,
      component: Input,
      componentProps: {
        label: 'Стаж курения (лет)',
        type: 'number',
        placeholder: '5',
      },
    },
    hasChronicDiseases: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'Хронические заболевания',
      },
    },
    chronicDiseases: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Описание заболеваний',
        placeholder: 'Перечислите заболевания',
      },
    },
    hadSurgeries: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'Перенесенные операции',
      },
    },
    surgeries: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Описание операций',
        placeholder: 'Перечислите операции',
      },
    },
    occupation: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Род занятий',
        placeholder: 'Менеджер',
      },
    },
    isHighRiskJob: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'Опасная профессия',
      },
    },
    practicesSports: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'Занятия спортом',
      },
    },
    extremeSports: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'Экстремальные виды спорта',
      },
    },
  },
  travel: {
    destination: {
      value: 'europe',
      component: Select,
      componentProps: {
        label: 'Страна/регион назначения',
        options: [
          { value: 'europe', label: 'Европа' },
          { value: 'asia', label: 'Азия' },
          { value: 'usa', label: 'США и Канада' },
          { value: 'cis', label: 'СНГ' },
          { value: 'worldwide', label: 'Весь мир' },
        ],
      },
    },
    tripPurpose: {
      value: 'tourism',
      component: Select,
      componentProps: {
        label: 'Цель поездки',
        options: [
          { value: 'tourism', label: 'Туризм' },
          { value: 'business', label: 'Бизнес' },
          { value: 'study', label: 'Обучение' },
          { value: 'work', label: 'Работа' },
          { value: 'other', label: 'Другое' },
        ],
      },
    },
    departureDate: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Дата отъезда',
        type: 'date',
      },
    },
    returnDate: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Дата возвращения',
        type: 'date',
      },
    },
    tripDuration: {
      value: undefined,
      component: Input,
      componentProps: {
        label: 'Длительность поездки (дни)',
        type: 'number',
        disabled: true,
      },
    },
  },
  propertyCoverageOptions: {
    structure: {
      value: true,
      component: Checkbox,
      componentProps: {
        label: 'Страхование конструктива',
      },
    },
    interior: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'Страхование отделки',
      },
    },
    movables: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'Страхование движимого имущества',
      },
    },
    liability: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'Гражданская ответственность',
      },
    },
  },
  lifeCoverageOptions: {
    death: {
      value: true,
      component: Checkbox,
      componentProps: {
        label: 'Страхование на случай смерти',
      },
    },
    disability: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'Страхование инвалидности',
      },
    },
    criticalIllness: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'Критические заболевания',
      },
    },
    accident: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'Несчастные случаи',
      },
    },
  },
  travelCoverageOptions: {
    medical: {
      value: true,
      component: Checkbox,
      componentProps: {
        label: 'Медицинские расходы',
      },
    },
    baggage: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'Багаж',
      },
    },
    tripCancellation: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'Отмена поездки',
      },
    },
    flightDelay: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'Задержка рейса',
      },
    },
    carRental: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: 'Аренда авто',
      },
    },
  },
};