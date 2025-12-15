// Типы страхования
export const INSURANCE_TYPE_OPTIONS = [
  { value: 'casco', label: 'КАСКО' },
  { value: 'osago', label: 'ОСАГО' },
  { value: 'property', label: 'Недвижимость' },
  { value: 'life', label: 'Жизнь и здоровье' },
  { value: 'travel', label: 'Путешествия' },
] as const;

// Сроки страхования (в месяцах)
export const INSURANCE_PERIOD_OPTIONS = [
  { value: '3', label: '3 месяца' },
  { value: '6', label: '6 месяцев' },
  { value: '12', label: '1 год' },
  { value: '24', label: '2 года' },
  { value: '36', label: '3 года' },
] as const;

// Способ оплаты
export const PAYMENT_TYPE_OPTIONS = [
  { value: 'single', label: 'Единовременно' },
  { value: 'installments', label: 'В рассрочку' },
] as const;

// Количество платежей
export const INSTALLMENTS_OPTIONS = [
  { value: '2', label: '2 платежа' },
  { value: '3', label: '3 платежа' },
  { value: '4', label: '4 платежа' },
  { value: '6', label: '6 платежей' },
  { value: '12', label: '12 платежей' },
] as const;

// Тип страхователя
export const INSURED_TYPE_OPTIONS = [
  { value: 'individual', label: 'Физическое лицо' },
  { value: 'company', label: 'Юридическое лицо' },
] as const;

// Пол
export const GENDER_OPTIONS = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
] as const;

// Марки автомобилей
export const CAR_BRAND_OPTIONS = [
  { value: 'audi', label: 'Audi' },
  { value: 'bmw', label: 'BMW' },
  { value: 'chevrolet', label: 'Chevrolet' },
  { value: 'ford', label: 'Ford' },
  { value: 'honda', label: 'Honda' },
  { value: 'hyundai', label: 'Hyundai' },
  { value: 'kia', label: 'Kia' },
  { value: 'lada', label: 'LADA' },
  { value: 'mazda', label: 'Mazda' },
  { value: 'mercedes', label: 'Mercedes-Benz' },
  { value: 'mitsubishi', label: 'Mitsubishi' },
  { value: 'nissan', label: 'Nissan' },
  { value: 'renault', label: 'Renault' },
  { value: 'skoda', label: 'Skoda' },
  { value: 'toyota', label: 'Toyota' },
  { value: 'volkswagen', label: 'Volkswagen' },
  { value: 'volvo', label: 'Volvo' },
] as const;

// Модели по маркам
export const CAR_MODELS: Record<string, Array<{ value: string; label: string }>> = {
  audi: [
    { value: 'a3', label: 'A3' },
    { value: 'a4', label: 'A4' },
    { value: 'a6', label: 'A6' },
    { value: 'q3', label: 'Q3' },
    { value: 'q5', label: 'Q5' },
    { value: 'q7', label: 'Q7' },
  ],
  bmw: [
    { value: '3series', label: '3 Series' },
    { value: '5series', label: '5 Series' },
    { value: 'x3', label: 'X3' },
    { value: 'x5', label: 'X5' },
  ],
  toyota: [
    { value: 'camry', label: 'Camry' },
    { value: 'corolla', label: 'Corolla' },
    { value: 'rav4', label: 'RAV4' },
    { value: 'landcruiser', label: 'Land Cruiser' },
  ],
  lada: [
    { value: 'granta', label: 'Granta' },
    { value: 'vesta', label: 'Vesta' },
    { value: 'xray', label: 'XRAY' },
    { value: 'niva', label: 'Niva' },
  ],
  hyundai: [
    { value: 'solaris', label: 'Solaris' },
    { value: 'creta', label: 'Creta' },
    { value: 'tucson', label: 'Tucson' },
    { value: 'santafe', label: 'Santa Fe' },
  ],
  kia: [
    { value: 'rio', label: 'Rio' },
    { value: 'ceed', label: 'Ceed' },
    { value: 'sportage', label: 'Sportage' },
    { value: 'sorento', label: 'Sorento' },
  ],
  volkswagen: [
    { value: 'polo', label: 'Polo' },
    { value: 'golf', label: 'Golf' },
    { value: 'tiguan', label: 'Tiguan' },
    { value: 'passat', label: 'Passat' },
  ],
  mercedes: [
    { value: 'cclass', label: 'C-Class' },
    { value: 'eclass', label: 'E-Class' },
    { value: 'gle', label: 'GLE' },
    { value: 'glc', label: 'GLC' },
  ],
  default: [{ value: 'other', label: 'Другая модель' }],
};

// Тип кузова
export const BODY_TYPE_OPTIONS = [
  { value: 'sedan', label: 'Седан' },
  { value: 'hatchback', label: 'Хэтчбек' },
  { value: 'suv', label: 'Внедорожник' },
  { value: 'wagon', label: 'Универсал' },
  { value: 'coupe', label: 'Купе' },
  { value: 'minivan', label: 'Минивэн' },
  { value: 'pickup', label: 'Пикап' },
] as const;

// Коробка передач
export const TRANSMISSION_OPTIONS = [
  { value: 'manual', label: 'Механика' },
  { value: 'automatic', label: 'Автомат' },
] as const;

// Тип недвижимости
export const PROPERTY_TYPE_OPTIONS = [
  { value: 'apartment', label: 'Квартира' },
  { value: 'house', label: 'Дом' },
  { value: 'townhouse', label: 'Таунхаус' },
  { value: 'cottage', label: 'Дача' },
  { value: 'commercial', label: 'Коммерческая недвижимость' },
] as const;

// Тип стен
export const WALL_MATERIAL_OPTIONS = [
  { value: 'brick', label: 'Кирпич' },
  { value: 'panel', label: 'Панель' },
  { value: 'monolith', label: 'Монолит' },
  { value: 'wood', label: 'Дерево' },
  { value: 'block', label: 'Блок' },
] as const;

// Цель путешествия
export const TRAVEL_PURPOSE_OPTIONS = [
  { value: 'tourism', label: 'Туризм' },
  { value: 'business', label: 'Деловая поездка' },
  { value: 'study', label: 'Обучение' },
  { value: 'work', label: 'Работа' },
  { value: 'sport', label: 'Спорт' },
] as const;

// Страны для путешествий
export const COUNTRY_OPTIONS = [
  { value: 'schengen', label: 'Шенген (все страны)', group: 'Европа' },
  { value: 'germany', label: 'Германия', group: 'Европа' },
  { value: 'france', label: 'Франция', group: 'Европа' },
  { value: 'italy', label: 'Италия', group: 'Европа' },
  { value: 'spain', label: 'Испания', group: 'Европа' },
  { value: 'turkey', label: 'Турция', group: 'Азия' },
  { value: 'thailand', label: 'Таиланд', group: 'Азия' },
  { value: 'uae', label: 'ОАЭ', group: 'Азия' },
  { value: 'egypt', label: 'Египет', group: 'Африка' },
  { value: 'usa', label: 'США', group: 'Америка' },
  { value: 'worldwide', label: 'Весь мир', group: 'Мультистрана' },
] as const;

// Виды спорта
export const SPORT_TYPE_OPTIONS = [
  { value: 'none', label: 'Без активного отдыха' },
  { value: 'skiing', label: 'Горные лыжи/Сноуборд' },
  { value: 'diving', label: 'Дайвинг' },
  { value: 'extreme', label: 'Экстремальные виды спорта' },
  { value: 'water', label: 'Водные виды спорта' },
] as const;

// Тип страхового случая
export const CLAIM_TYPE_OPTIONS = [
  { value: 'accident', label: 'ДТП' },
  { value: 'theft', label: 'Угон' },
  { value: 'damage', label: 'Повреждение' },
  { value: 'fire', label: 'Пожар' },
  { value: 'flood', label: 'Затопление' },
  { value: 'other', label: 'Другое' },
] as const;

// Источник информации
export const REFERRAL_SOURCE_OPTIONS = [
  { value: 'internet', label: 'Интернет' },
  { value: 'friends', label: 'Рекомендация друзей' },
  { value: 'advertising', label: 'Реклама' },
  { value: 'agent', label: 'Страховой агент' },
  { value: 'repeat', label: 'Повторное обращение' },
  { value: 'other', label: 'Другое' },
] as const;

// Коэффициенты для расчета премии
export const PREMIUM_COEFFICIENTS = {
  // Базовые тарифы по типам страхования
  baseTariffs: {
    casco: 0.05, // 5% от стоимости ТС
    osago: 4000, // Базовая ставка ОСАГО
    property: 0.003, // 0.3% от стоимости недвижимости
    life: 0.01, // 1% от страховой суммы
    travel: 2, // $2 в день
  },

  // Возрастные коэффициенты
  age: {
    under22: 1.8,
    '22-25': 1.3,
    '26-35': 1.0,
    '36-50': 0.95,
    '51-65': 1.1,
    over65: 1.5,
  },

  // Коэффициенты по стажу
  experience: {
    under2: 1.5,
    '2-5': 1.2,
    '5-10': 1.0,
    over10: 0.9,
  },

  // Региональные коэффициенты
  regional: {
    moscow: 2.0,
    spb: 1.8,
    other: 1.0,
  },

  // Коэффициенты мощности двигателя
  enginePower: {
    under70: 0.8,
    '70-100': 1.0,
    '100-120': 1.1,
    '120-150': 1.3,
    over150: 1.5,
  },

  // Скидка за франшизу
  deductibleDiscount: {
    0: 0,
    10000: 0.03,
    20000: 0.05,
    30000: 0.08,
    50000: 0.12,
  },

  // Скидка за безаварийность (КБМ)
  kbm: {
    0: 2.45,
    1: 2.3,
    2: 1.55,
    3: 1.0,
    4: 0.95,
    5: 0.9,
    6: 0.85,
    7: 0.8,
    8: 0.75,
    9: 0.7,
    10: 0.65,
    11: 0.6,
    12: 0.55,
    13: 0.5,
  },

  // Скидка за мультиполис
  multiPolicy: 0.1, // 10%

  // Наценка за рассрочку
  installmentSurcharge: 0.05, // 5%
} as const;

// Маски для полей ввода
export const INPUT_MASKS = {
  phone: '+7 (999) 999-99-99',
  passportSeries: '99 99',
  passportNumber: '999999',
  inn: '9999999999',
  ogrn: '9999999999999',
  kpp: '999999999',
  snils: '999-999-999 99',
  vin: 'XXXXXXXXXXXXXXXXX',
} as const;

// Лимиты значений
export const FIELD_LIMITS = {
  coverageAmount: { min: 100000, max: 50000000 },
  deductible: { min: 0, max: 1000000 },
  insurancePeriod: { min: 3, max: 36 },
  year: { min: 1990, max: new Date().getFullYear() },
  mileage: { min: 0, max: 1000000 },
  enginePower: { min: 1, max: 1000 },
  age: { min: 18, max: 100 },
  driverAge: { min: 18, max: 75 },
  propertyArea: { min: 1, max: 10000 },
  propertyYear: { min: 1800, max: new Date().getFullYear() },
  weight: { min: 30, max: 300 },
  height: { min: 100, max: 250 },
  driversCount: { min: 0, max: 10 },
  beneficiariesCount: { min: 1, max: 10 },
  travelersCount: { min: 1, max: 20 },
  claimsCount: { min: 0, max: 50 },
  beneficiaryShare: { min: 1, max: 100 },
} as const;