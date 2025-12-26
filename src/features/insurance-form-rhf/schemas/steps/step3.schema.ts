import { z } from 'zod';

// Адрес недвижимости
const propertyAddressSchema = z.object({
  region: z.string(),
  city: z.string(),
  street: z.string(),
  house: z.string(),
  apartment: z.string().optional(),
});

// Данные транспорта
const vehicleSchema = z.object({
  vin: z.string(),
  brand: z.string(),
  model: z.string(),
  year: z.number().nullable(),
  mileage: z.number().nullable(),
  enginePower: z.number().nullable(),
  bodyType: z.enum(['sedan', 'hatchback', 'suv', 'wagon', 'coupe', 'minivan', 'pickup']),
  transmission: z.enum(['manual', 'automatic']),
  marketValue: z.number().nullable(),
  licensePlate: z.string(),
  registrationCert: z.string(),
  hasAntiTheft: z.boolean(),
  antiTheftBrand: z.string(),
  garageParking: z.boolean(),
  usagePurpose: z.enum(['personal', 'taxi', 'training', 'commercial']),
});

// Данные недвижимости
const propertySchema = z.object({
  type: z.enum(['apartment', 'house', 'townhouse', 'commercial', 'land']),
  address: propertyAddressSchema,
  area: z.number().nullable(),
  floors: z.number().nullable(),
  floor: z.number().nullable(),
  yearBuilt: z.number().nullable(),
  wallMaterial: z.enum(['brick', 'concrete', 'wood', 'panel', 'monolith', 'other']),
  marketValue: z.number().nullable(),
  hasAlarm: z.boolean(),
  hasFireAlarm: z.boolean(),
  ownershipDoc: z.string(),
});

// Опции покрытия недвижимости
const propertyCoverageOptionsSchema = z.object({
  structure: z.boolean(),
  interior: z.boolean(),
  movables: z.boolean(),
  liability: z.boolean(),
});

// Данные здоровья
const healthSchema = z.object({
  height: z.number().nullable(),
  weight: z.number().nullable(),
  bmi: z.number().nullable(),
  bloodPressure: z.string(),
  isSmoker: z.boolean(),
  smokingYears: z.number().nullable(),
  hasChronicDiseases: z.boolean(),
  chronicDiseases: z.string(),
  hadSurgeries: z.boolean(),
  surgeries: z.string(),
  occupation: z.string(),
  isHighRiskJob: z.boolean(),
  practicesSports: z.boolean(),
  extremeSports: z.boolean(),
});

// Опции покрытия жизни
const lifeCoverageOptionsSchema = z.object({
  death: z.boolean(),
  disability: z.boolean(),
  criticalIllness: z.boolean(),
  accident: z.boolean(),
});

// Данные путешествия
const travelSchema = z.object({
  destination: z.enum(['europe', 'asia', 'usa_canada', 'cis', 'worldwide']),
  tripPurpose: z.enum(['tourism', 'business', 'study', 'work', 'other']),
  departureDate: z.string(),
  returnDate: z.string(),
  tripDuration: z.number().nullable(),
  isMultipleTrips: z.boolean(),
});

// Опции покрытия путешествий
const travelCoverageOptionsSchema = z.object({
  medical: z.boolean(),
  baggage: z.boolean(),
  tripCancellation: z.boolean(),
  flightDelay: z.boolean(),
  carRental: z.boolean(),
});

// Путешественник
const travelerSchema = z.object({
  id: z.string(),
  fullName: z.string().min(1, 'Укажите ФИО'),
  birthDate: z.string().min(1, 'Укажите дату рождения'),
  passportNumber: z.string().min(1, 'Укажите номер загранпаспорта'),
});

// Шаг 3: Объект страхования
export const step3Schema = z.object({
  vehicle: vehicleSchema,
  property: propertySchema,
  propertyCoverageOptions: propertyCoverageOptionsSchema,
  health: healthSchema,
  lifeCoverageOptions: lifeCoverageOptionsSchema,
  travel: travelSchema,
  travelCoverageOptions: travelCoverageOptionsSchema,
  travelers: z.array(travelerSchema),
  // Для контекстной валидации
  insuranceType: z.enum(['casco', 'osago', 'property', 'life', 'travel']).optional(),
}).superRefine((data, ctx) => {
  const type = data.insuranceType;

  // Валидация для КАСКО/ОСАГО
  if (type === 'casco' || type === 'osago') {
    if (!data.vehicle.vin || data.vehicle.vin.length !== 17) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'VIN должен содержать 17 символов',
        path: ['vehicle', 'vin'],
      });
    }
    if (!data.vehicle.brand) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Выберите марку автомобиля',
        path: ['vehicle', 'brand'],
      });
    }
    if (!data.vehicle.model) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Выберите модель автомобиля',
        path: ['vehicle', 'model'],
      });
    }
    if (!data.vehicle.year) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Укажите год выпуска',
        path: ['vehicle', 'year'],
      });
    }
    if (!data.vehicle.licensePlate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Укажите госномер',
        path: ['vehicle', 'licensePlate'],
      });
    }
  }

  // Валидация для недвижимости
  if (type === 'property') {
    if (!data.property.address.city) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Укажите город',
        path: ['property', 'address', 'city'],
      });
    }
    if (!data.property.area) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Укажите площадь',
        path: ['property', 'area'],
      });
    }
    if (!data.property.marketValue) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Укажите рыночную стоимость',
        path: ['property', 'marketValue'],
      });
    }
  }

  // Валидация для жизни и здоровья
  if (type === 'life') {
    if (!data.health.height) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Укажите рост',
        path: ['health', 'height'],
      });
    }
    if (!data.health.weight) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Укажите вес',
        path: ['health', 'weight'],
      });
    }
    if (!data.health.occupation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Укажите род занятий',
        path: ['health', 'occupation'],
      });
    }
  }

  // Валидация для путешествий
  if (type === 'travel') {
    if (!data.travel.departureDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Укажите дату отъезда',
        path: ['travel', 'departureDate'],
      });
    }
    if (!data.travel.returnDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Укажите дату возвращения',
        path: ['travel', 'returnDate'],
      });
    }
    if (data.travel.departureDate && data.travel.returnDate) {
      const dep = new Date(data.travel.departureDate);
      const ret = new Date(data.travel.returnDate);
      if (ret <= dep) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Дата возвращения должна быть позже даты отъезда',
          path: ['travel', 'returnDate'],
        });
      }
    }
    if (data.travelers.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Добавьте хотя бы одного путешественника',
        path: ['travelers'],
      });
    }
  }
});

export type Step3Data = z.infer<typeof step3Schema>;
