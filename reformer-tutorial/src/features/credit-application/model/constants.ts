// model/constants.ts - Константы и опции для формы

import type { SelectOption } from './types';

// =============================================================================
// ТИПЫ КРЕДИТА
// =============================================================================

export const LOAN_TYPE_OPTIONS: SelectOption[] = [
  { value: 'consumer', label: 'Потребительский кредит' },
  { value: 'mortgage', label: 'Ипотека' },
  { value: 'car', label: 'Автокредит' },
  { value: 'business', label: 'Бизнес-кредит' },
  { value: 'refinancing', label: 'Рефинансирование' },
];

// =============================================================================
// ПОЛ
// =============================================================================

export const GENDER_OPTIONS: SelectOption[] = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
];

// =============================================================================
// СТАТУС ЗАНЯТОСТИ
// =============================================================================

export const EMPLOYMENT_STATUS_OPTIONS: SelectOption[] = [
  { value: 'employed', label: 'Работаю по найму' },
  { value: 'selfEmployed', label: 'Самозанятый / ИП' },
  { value: 'unemployed', label: 'Безработный' },
  { value: 'retired', label: 'Пенсионер' },
  { value: 'student', label: 'Студент' },
];

// =============================================================================
// СЕМЕЙНОЕ ПОЛОЖЕНИЕ
// =============================================================================

export const MARITAL_STATUS_OPTIONS: SelectOption[] = [
  { value: 'single', label: 'Не состою в браке' },
  { value: 'married', label: 'Состою в браке' },
  { value: 'divorced', label: 'В разводе' },
  { value: 'widowed', label: 'Вдовец/вдова' },
];

// =============================================================================
// ОБРАЗОВАНИЕ
// =============================================================================

export const EDUCATION_OPTIONS: SelectOption[] = [
  { value: 'secondary', label: 'Среднее' },
  { value: 'specialized', label: 'Среднее специальное' },
  { value: 'higher', label: 'Высшее' },
  { value: 'postgraduate', label: 'Учёная степень' },
];

// =============================================================================
// ТИП ИМУЩЕСТВА
// =============================================================================

export const PROPERTY_TYPE_OPTIONS: SelectOption[] = [
  { value: 'apartment', label: 'Квартира' },
  { value: 'house', label: 'Дом' },
  { value: 'land', label: 'Земельный участок' },
  { value: 'car', label: 'Автомобиль' },
  { value: 'other', label: 'Другое' },
];

// =============================================================================
// РЕГИОНЫ (для примера)
// =============================================================================

export const REGION_OPTIONS: SelectOption[] = [
  { value: 'moscow', label: 'Москва' },
  { value: 'moscow_region', label: 'Московская область' },
  { value: 'spb', label: 'Санкт-Петербург' },
  { value: 'spb_region', label: 'Ленинградская область' },
  { value: 'novosibirsk', label: 'Новосибирская область' },
  { value: 'sverdlovsk', label: 'Свердловская область' },
  { value: 'tatarstan', label: 'Республика Татарстан' },
  { value: 'krasnodar', label: 'Краснодарский край' },
];

// =============================================================================
// БАНКИ (для существующих кредитов)
// =============================================================================

export const BANK_OPTIONS: SelectOption[] = [
  { value: 'sberbank', label: 'Сбербанк' },
  { value: 'vtb', label: 'ВТБ' },
  { value: 'alfa', label: 'Альфа-Банк' },
  { value: 'tinkoff', label: 'Тинькофф' },
  { value: 'gazprombank', label: 'Газпромбанк' },
  { value: 'raiffeisen', label: 'Райффайзенбанк' },
  { value: 'rosbank', label: 'Росбанк' },
  { value: 'other', label: 'Другой банк' },
];

// =============================================================================
// МАРКИ АВТОМОБИЛЕЙ
// =============================================================================

export const CAR_BRAND_OPTIONS: SelectOption[] = [
  { value: 'toyota', label: 'Toyota' },
  { value: 'honda', label: 'Honda' },
  { value: 'bmw', label: 'BMW' },
  { value: 'mercedes', label: 'Mercedes-Benz' },
  { value: 'audi', label: 'Audi' },
  { value: 'volkswagen', label: 'Volkswagen' },
  { value: 'hyundai', label: 'Hyundai' },
  { value: 'kia', label: 'Kia' },
  { value: 'lada', label: 'LADA' },
  { value: 'skoda', label: 'Skoda' },
];

// =============================================================================
// МОДЕЛИ АВТОМОБИЛЕЙ ПО МАРКАМ
// =============================================================================

export const CAR_MODELS_BY_BRAND: Record<string, SelectOption[]> = {
  toyota: [
    { value: 'camry', label: 'Camry' },
    { value: 'corolla', label: 'Corolla' },
    { value: 'rav4', label: 'RAV4' },
    { value: 'land_cruiser', label: 'Land Cruiser' },
  ],
  honda: [
    { value: 'civic', label: 'Civic' },
    { value: 'accord', label: 'Accord' },
    { value: 'cr-v', label: 'CR-V' },
    { value: 'pilot', label: 'Pilot' },
  ],
  bmw: [
    { value: '3-series', label: '3 Series' },
    { value: '5-series', label: '5 Series' },
    { value: 'x3', label: 'X3' },
    { value: 'x5', label: 'X5' },
  ],
  mercedes: [
    { value: 'c-class', label: 'C-Class' },
    { value: 'e-class', label: 'E-Class' },
    { value: 'glc', label: 'GLC' },
    { value: 'gle', label: 'GLE' },
  ],
  audi: [
    { value: 'a4', label: 'A4' },
    { value: 'a6', label: 'A6' },
    { value: 'q5', label: 'Q5' },
    { value: 'q7', label: 'Q7' },
  ],
  volkswagen: [
    { value: 'polo', label: 'Polo' },
    { value: 'tiguan', label: 'Tiguan' },
    { value: 'passat', label: 'Passat' },
    { value: 'touareg', label: 'Touareg' },
  ],
  hyundai: [
    { value: 'solaris', label: 'Solaris' },
    { value: 'creta', label: 'Creta' },
    { value: 'tucson', label: 'Tucson' },
    { value: 'santa-fe', label: 'Santa Fe' },
  ],
  kia: [
    { value: 'rio', label: 'Rio' },
    { value: 'sportage', label: 'Sportage' },
    { value: 'sorento', label: 'Sorento' },
    { value: 'k5', label: 'K5' },
  ],
  lada: [
    { value: 'vesta', label: 'Vesta' },
    { value: 'granta', label: 'Granta' },
    { value: 'niva', label: 'Niva' },
    { value: 'largus', label: 'Largus' },
  ],
  skoda: [
    { value: 'octavia', label: 'Octavia' },
    { value: 'rapid', label: 'Rapid' },
    { value: 'kodiaq', label: 'Kodiaq' },
    { value: 'superb', label: 'Superb' },
  ],
};

// =============================================================================
// ГОРОДА ПО РЕГИОНАМ
// =============================================================================

export const CITIES_BY_REGION: Record<string, SelectOption[]> = {
  moscow: [{ value: 'moscow', label: 'Москва' }],
  moscow_region: [
    { value: 'odintsovo', label: 'Одинцово' },
    { value: 'khimki', label: 'Химки' },
    { value: 'balashikha', label: 'Балашиха' },
    { value: 'podolsk', label: 'Подольск' },
    { value: 'mytishchi', label: 'Мытищи' },
  ],
  spb: [{ value: 'spb', label: 'Санкт-Петербург' }],
  spb_region: [
    { value: 'pushkin', label: 'Пушкин' },
    { value: 'kolpino', label: 'Колпино' },
    { value: 'gatchina', label: 'Гатчина' },
    { value: 'vyborg', label: 'Выборг' },
  ],
  novosibirsk: [
    { value: 'novosibirsk', label: 'Новосибирск' },
    { value: 'berdsk', label: 'Бердск' },
    { value: 'akademgorodok', label: 'Академгородок' },
  ],
  sverdlovsk: [
    { value: 'ekaterinburg', label: 'Екатеринбург' },
    { value: 'nizhny_tagil', label: 'Нижний Тагил' },
    { value: 'kamensk', label: 'Каменск-Уральский' },
  ],
  tatarstan: [
    { value: 'kazan', label: 'Казань' },
    { value: 'naberezhnye_chelny', label: 'Набережные Челны' },
    { value: 'nizhnekamsk', label: 'Нижнекамск' },
  ],
  krasnodar: [
    { value: 'krasnodar', label: 'Краснодар' },
    { value: 'sochi', label: 'Сочи' },
    { value: 'novorossiysk', label: 'Новороссийск' },
  ],
};

// =============================================================================
// ТИПЫ ОТНОШЕНИЙ (для созаёмщиков)
// =============================================================================

export const RELATIONSHIP_OPTIONS: SelectOption[] = [
  { value: 'spouse', label: 'Супруг/супруга' },
  { value: 'parent', label: 'Родитель' },
  { value: 'child', label: 'Ребёнок' },
  { value: 'sibling', label: 'Брат/сестра' },
  { value: 'other_relative', label: 'Другой родственник' },
  { value: 'friend', label: 'Друг/знакомый' },
  { value: 'colleague', label: 'Коллега' },
];

// =============================================================================
// ЛИМИТЫ И ЗНАЧЕНИЯ ПО УМОЛЧАНИЮ
// =============================================================================

export const LOAN_LIMITS = {
  amount: {
    min: 50000,
    max: 10000000,
    step: 10000,
  },
  term: {
    min: 6,
    max: 240,
  },
  propertyValue: {
    min: 1000000,
  },
  carPrice: {
    min: 300000,
    max: 10000000,
  },
  carYear: {
    min: 2000,
    max: new Date().getFullYear() + 1,
  },
  age: {
    min: 18,
    max: 70,
  },
  income: {
    min: 10000,
  },
  dependents: {
    min: 0,
    max: 10,
  },
  paymentToIncomeRatio: {
    max: 50,
  },
};

export const DEFAULT_INITIAL_PAYMENT_PERCENT = 0.2; // 20%

// =============================================================================
// НАЗВАНИЯ ШАГОВ
// =============================================================================

export const STEP_TITLES = [
  'Информация о кредите',
  'Персональные данные',
  'Контактная информация',
  'Информация о занятости',
  'Дополнительная информация',
  'Подтверждение',
];

export const TOTAL_STEPS = 6;
