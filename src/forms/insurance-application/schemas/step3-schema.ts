import { required, min, max, email, pattern } from "@reformer/core/validators";
import { applyWhen } from "@reformer/core/validators";
import { watchField } from "@reformer/core/behaviors";
import type { ValidationSchemaFn, BehaviorSchemaFn } from "@reformer/core";
import { date } from "@reformer/core/validators";
import { Input } from "../../../components/ui/input";
import { Select } from "../../../components/ui/select";
import { RadioGroup } from "../../../components/ui/radio-group";
import { Checkbox } from "../../../components/ui/checkbox";
import { Textarea } from "../../../components/ui/textarea";

// Define the interfaces for step 3 data (different based on insurance type)
interface VehicleData {
  vin: string;
  brand: string;
  model: string;
  year: number | undefined;
  mileage: number | undefined;
  enginePower: number | undefined;
  bodyType:
    | "sedan"
    | "hatchback"
    | "suv"
    | "wagon"
    | "coupe"
    | "minivan"
    | "pickup";
  transmission: "manual" | "automatic";
  marketValue: number | undefined;
  licensePlate: string;
  registrationCert: string;
  hasAntiTheft: boolean;
  antiTheftBrand: string;
  garageParking: boolean;
  usagePurpose: "personal" | "taxi" | "training" | "commercial";
}

interface PropertyAddress {
  region: string;
  city: string;
  street: string;
  house: string;
  apartment: string;
}

interface PropertyData {
  type: "apartment" | "house" | "townhouse" | "commercial" | "land";
  address: PropertyAddress;
  area: number | undefined;
  floors: number | undefined;
  floor: number | undefined;
  yearBuilt: number | undefined;
  wallMaterial:
    | "brick"
    | "concrete"
    | "wood"
    | "panel"
    | "monolithic"
    | "other";
  marketValue: number | undefined;
  hasAlarm: boolean;
  hasFireAlarm: boolean;
  ownershipDoc: string;
}

interface PropertyCoverageOptions {
  structure: boolean;
  interior: boolean;
  movables: boolean;
  liability: boolean;
}

interface HealthData {
  height: number | undefined;
  weight: number | undefined;
  bmi: number | undefined; // computed
  bloodPressure: string;
  isSmoker: boolean;
  smokingYears: number | undefined;
  hasChronicDiseases: boolean;
  chronicDiseases: string;
  hadSurgeries: boolean;
  surgeries: string;
  occupation: string;
  isHighRiskJob: boolean;
  practicesSports: boolean;
  extremeSports: boolean;
}

interface LifeCoverageOptions {
  death: boolean;
  disability: boolean;
  criticalIllness: boolean;
  accident: boolean;
}

interface TravelData {
  destination: "europe" | "asia" | "usa" | "cis" | "worldwide";
  tripPurpose: "tourism" | "business" | "study" | "work" | "other";
  departureDate: string; // YYYY-MM-DD
  returnDate: string; // YYYY-MM-DD
  tripDuration: number | undefined; // computed
  isMultipleTrips: boolean;
}

interface Traveler {
  fullName: string;
  birthDate: string; // YYYY-MM-DD
  passportNumber: string;
}

interface TravelCoverageOptions {
  medical: boolean;
  baggage: boolean;
  tripCancellation: boolean;
  flightDelay: boolean;
  carRental: boolean;
}

export interface Step3Data {
  // Vehicle data (for casco/osago)
  vehicle: VehicleData;

  // Property data (for property insurance)
  property: PropertyData;
  propertyCoverageOptions: PropertyCoverageOptions;

  // Health data (for life insurance)
  health: HealthData;
  lifeCoverageOptions: LifeCoverageOptions;

  // Travel data (for travel insurance)
  travel: TravelData;
  travelers: Traveler[];
  travelCoverageOptions: TravelCoverageOptions;
}

// Schema for the form fields
export const step3Schema = {
  // Vehicle data schema (for casco/osago)
  vehicle: {
    vin: {
      value: "",
      component: Input,
      componentProps: {
        label: "VIN-номер",
        placeholder: "XXXXXXXXXXXXXXXXX",
      },
    },
    brand: {
      value: "",
      component: Select,
      componentProps: {
        label: "Марка автомобиля",
        placeholder: "Выберите марку",
        options: [], // Will be populated dynamically
      },
    },
    model: {
      value: "",
      component: Select,
      componentProps: {
        label: "Модель автомобиля",
        placeholder: "Выберите модель",
        options: [], // Will be populated based on brand
      },
    },
    year: {
      value: undefined,
      component: Input,
      componentProps: {
        label: "Год выпуска",
        type: "number",
        placeholder: "2020",
      },
    },
    mileage: {
      value: undefined,
      component: Input,
      componentProps: {
        label: "Пробег (км)",
        type: "number",
        placeholder: "50000",
      },
    },
    enginePower: {
      value: undefined,
      component: Input,
      componentProps: {
        label: "Мощность двигателя (л.с.)",
        type: "number",
        placeholder: "150",
      },
    },
    bodyType: {
      value: "sedan",
      component: Select,
      componentProps: {
        label: "Тип кузова",
        options: [
          { value: "sedan", label: "Седан" },
          { value: "hatchback", label: "Хэтчбек" },
          { value: "suv", label: "Внедорожник" },
          { value: "wagon", label: "Универсал" },
          { value: "coupe", label: "Купе" },
          { value: "minivan", label: "Минивэн" },
          { value: "pickup", label: "Пикап" },
        ],
      },
    },
    transmission: {
      value: "manual",
      component: RadioGroup,
      componentProps: {
        label: "Коробка передач",
        options: [
          { value: "manual", label: "Механика" },
          { value: "automatic", label: "Автомат" },
        ],
      },
    },
    marketValue: {
      value: undefined,
      component: Input,
      componentProps: {
        label: "Рыночная стоимость (₽)",
        type: "number",
        placeholder: "1500000",
      },
    },
    licensePlate: {
      value: "",
      component: Input,
      componentProps: {
        label: "Госномер",
        placeholder: "А000АА000",
      },
    },
    registrationCert: {
      value: "",
      component: Input,
      componentProps: {
        label: "Номер СТС",
        placeholder: "00 00 000000",
      },
    },
    hasAntiTheft: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: "Наличие противоугонной системы",
      },
    },
    antiTheftBrand: {
      value: "",
      component: Input,
      componentProps: {
        label: "Марка противоугонной системы",
        placeholder: "StarLine",
      },
    },
    garageParking: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: "Гаражное хранение",
      },
    },
    usagePurpose: {
      value: "personal",
      component: Select,
      componentProps: {
        label: "Цель использования",
        options: [
          { value: "personal", label: "Личное" },
          { value: "taxi", label: "Такси" },
          { value: "training", label: "Учебный" },
          { value: "commercial", label: "Коммерческое" },
        ],
      },
    },
  },

  // Property data schema (for property insurance)
  property: {
    type: {
      value: "apartment",
      component: Select,
      componentProps: {
        label: "Тип недвижимости",
        options: [
          { value: "apartment", label: "Квартира" },
          { value: "house", label: "Дом" },
          { value: "townhouse", label: "Таунхаус" },
          { value: "commercial", label: "Коммерческая" },
          { value: "land", label: "Земельный участок" },
        ],
      },
    },
    address: {
      region: {
        value: "",
        component: Input,
        componentProps: {
          label: "Регион",
          placeholder: "Московская область",
        },
      },
      city: {
        value: "",
        component: Input,
        componentProps: {
          label: "Город",
          placeholder: "Москва",
        },
      },
      street: {
        value: "",
        component: Input,
        componentProps: {
          label: "Улица",
          placeholder: "ул. Ленина",
        },
      },
      house: {
        value: "",
        component: Input,
        componentProps: {
          label: "Дом",
          placeholder: "1",
        },
      },
      apartment: {
        value: "",
        component: Input,
        componentProps: {
          label: "Квартира",
          placeholder: "1",
        },
      },
    },
    area: {
      value: undefined,
      component: Input,
      componentProps: {
        label: "Площадь (м²)",
        type: "number",
        placeholder: "50",
      },
    },
    floors: {
      value: undefined,
      component: Input,
      componentProps: {
        label: "Этажность здания",
        type: "number",
        placeholder: "9",
      },
    },
    floor: {
      value: undefined,
      component: Input,
      componentProps: {
        label: "Этаж квартиры",
        type: "number",
        placeholder: "5",
      },
    },
    yearBuilt: {
      value: undefined,
      component: Input,
      componentProps: {
        label: "Год постройки",
        type: "number",
        placeholder: "2010",
      },
    },
    wallMaterial: {
      value: "brick",
      component: Select,
      componentProps: {
        label: "Материал стен",
        options: [
          { value: "brick", label: "Кирпич" },
          { value: "concrete", label: "Бетон" },
          { value: "wood", label: "Дерево" },
          { value: "panel", label: "Панель" },
          { value: "monolithic", label: "Монолит" },
          { value: "other", label: "Другое" },
        ],
      },
    },
    marketValue: {
      value: undefined,
      component: Input,
      componentProps: {
        label: "Рыночная стоимость (₽)",
        type: "number",
        placeholder: "5000000",
      },
    },
    hasAlarm: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: "Охранная сигнализация",
      },
    },
    hasFireAlarm: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: "Пожарная сигнализация",
      },
    },
    ownershipDoc: {
      value: "",
      component: Input,
      componentProps: {
        label: "Номер документа о собственности",
        placeholder: "00-00/000-00/000/000/0000-0000",
      },
    },
  },
  propertyCoverageOptions: {
    structure: {
      value: true,
      component: Checkbox,
      componentProps: {
        label: "Страхование конструктива",
      },
    },
    interior: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: "Страхование отделки",
      },
    },
    movables: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: "Страхование движимого имущества",
      },
    },
    liability: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: "Гражданская ответственность",
      },
    },
  },

  // Health data schema (for life insurance)
  health: {
    height: {
      value: undefined,
      component: Input,
      componentProps: {
        label: "Рост (см)",
        type: "number",
        placeholder: "175",
      },
    },
    weight: {
      value: undefined,
      component: Input,
      componentProps: {
        label: "Вес (кг)",
        type: "number",
        placeholder: "70",
      },
    },
    bmi: {
      value: undefined,
      component: Input,
      componentProps: {
        label: "Индекс массы тела",
        type: "number",
        disabled: true,
      },
    },
    bloodPressure: {
      value: "",
      component: Input,
      componentProps: {
        label: "Артериальное давление",
        placeholder: "120/80",
      },
    },
    isSmoker: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: "Курящий",
      },
    },
    smokingYears: {
      value: undefined,
      component: Input,
      componentProps: {
        label: "Стаж курения (лет)",
        type: "number",
        placeholder: "5",
      },
    },
    hasChronicDiseases: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: "Хронические заболевания",
      },
    },
    chronicDiseases: {
      value: "",
      component: Textarea,
      componentProps: {
        label: "Описание заболеваний",
        placeholder: "Перечислите заболевания",
      },
    },
    hadSurgeries: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: "Перенесенные операции",
      },
    },
    surgeries: {
      value: "",
      component: Textarea,
      componentProps: {
        label: "Описание операций",
        placeholder: "Перечислите операции",
      },
    },
    occupation: {
      value: "",
      component: Input,
      componentProps: {
        label: "Род занятий",
        placeholder: "Менеджер",
      },
    },
    isHighRiskJob: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: "Опасная профессия",
      },
    },
    practicesSports: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: "Занятия спортом",
      },
    },
    extremeSports: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: "Экстремальные виды спорта",
      },
    },
  },
  lifeCoverageOptions: {
    death: {
      value: true,
      component: Checkbox,
      componentProps: {
        label: "Страхование на случай смерти",
      },
    },
    disability: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: "Страхование инвалидности",
      },
    },
    criticalIllness: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: "Критические заболевания",
      },
    },
    accident: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: "Несчастные случаи",
      },
    },
  },

  // Travel data schema (for travel insurance)
  travel: {
    destination: {
      value: "europe",
      component: Select,
      componentProps: {
        label: "Страна/регион назначения",
        options: [
          { value: "europe", label: "Европа" },
          { value: "asia", label: "Азия" },
          { value: "usa", label: "США и Канада" },
          { value: "cis", label: "СНГ" },
          { value: "worldwide", label: "Весь мир" },
        ],
      },
    },
    tripPurpose: {
      value: "tourism",
      component: Select,
      componentProps: {
        label: "Цель поездки",
        options: [
          { value: "tourism", label: "Туризм" },
          { value: "business", label: "Бизнес" },
          { value: "study", label: "Обучение" },
          { value: "work", label: "Работа" },
          { value: "other", label: "Другое" },
        ],
      },
    },
    departureDate: {
      value: "",
      component: Input,
      componentProps: {
        label: "Дата отъезда",
        type: "date",
      },
    },
    returnDate: {
      value: "",
      component: Input,
      componentProps: {
        label: "Дата возвращения",
        type: "date",
      },
    },
    tripDuration: {
      value: undefined,
      component: Input,
      componentProps: {
        label: "Длительность поездки (дни)",
        type: "number",
        disabled: true,
      },
    },
    isMultipleTrips: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: "Мультипоездка (годовой полис)",
      },
    },
  },
  travelers: [
    {
      fullName: {
        value: "",
        component: Input,
        componentProps: {
          label: "ФИО",
          placeholder: "Ivanov Ivan",
        },
      },
      birthDate: {
        value: "",
        component: Input,
        componentProps: {
          label: "Дата рождения",
          type: "date",
        },
      },
      passportNumber: {
        value: "",
        component: Input,
        componentProps: {
          label: "Номер загранпаспорта",
          placeholder: "00 0000000",
        },
      },
    },
  ],
  travelCoverageOptions: {
    medical: {
      value: true,
      component: Checkbox,
      componentProps: {
        label: "Медицинские расходы",
      },
    },
    baggage: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: "Багаж",
      },
    },
    tripCancellation: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: "Отмена поездки",
      },
    },
    flightDelay: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: "Задержка рейса",
      },
    },
    carRental: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: "Аренда авто",
      },
    },
  },
};

// Validation schema for step 3 - simplified to handle the main conditional validation
export const step3Validation: ValidationSchemaFn<Step3Data> = (path) => {
  // This would contain complex conditional validation based on insurance type
  // For now, we'll define the basic structure
};

// Behavior schema for step 3
export const step3Behavior: BehaviorSchemaFn<Step3Data> = (path) => {
  // Calculate BMI when height and weight change (for life insurance)
  watchField(
    path.health.height,
    (value: number | undefined, ctx) => {
      if (!value) return;

      const weight = ctx.form.health.weight.value.value;
      if (weight && weight > 0) {
        const heightInMeters = value / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        ctx.setFieldValue("health.bmi", Number(bmi.toFixed(2)));
      }
    },
    { immediate: false }
  );

  watchField(
    path.health.weight,
    (value: number | undefined, ctx) => {
      if (!value) return;

      const height = ctx.form.health.height.value.value;
      if (height && height > 0) {
        const heightInMeters = height / 100;
        const bmi = value / (heightInMeters * heightInMeters);
        ctx.setFieldValue("health.bmi", Number(bmi.toFixed(2)));
      }
    },
    { immediate: false }
  );

  // Calculate trip duration when departure and return dates change (for travel insurance)
  watchField(
    path.travel.departureDate,
    (value: string, ctx) => {
      if (!value) {
        ctx.setFieldValue("travel.tripDuration", undefined);
        return;
      }

      const returnDate = ctx.form.travel.returnDate.value.value;
      if (returnDate) {
        try {
          const departure = new Date(value);
          const returnD = new Date(returnDate);
          const diffTime = Math.abs(returnD.getTime() - departure.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          ctx.setFieldValue("travel.tripDuration", diffDays);
        } catch (e) {
          console.error("Error calculating trip duration:", e);
        }
      }
    },
    { immediate: false }
  );

  watchField(
    path.travel.returnDate,
    (value: string, ctx) => {
      if (!value) {
        ctx.setFieldValue("travel.tripDuration", undefined);
        return;
      }

      const departureDate = ctx.form.travel.departureDate.value.value;
      if (departureDate) {
        try {
          const departure = new Date(departureDate);
          const returnD = new Date(value);
          const diffTime = Math.abs(returnD.getTime() - departure.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          ctx.setFieldValue("travel.tripDuration", diffDays);
        } catch (e) {
          console.error("Error calculating trip duration:", e);
        }
      }
    },
    { immediate: false }
  );
};
