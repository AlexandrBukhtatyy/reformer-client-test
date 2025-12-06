/**
 * Константы формы заявки на кредит
 */

import type { LoanType, EmploymentStatus, MaritalStatus, Education } from './types';

// ============================================================================
// Опции для Select/RadioGroup полей
// ============================================================================

export const LOAN_TYPE_OPTIONS: Array<{ value: LoanType; label: string }> = [
  { value: 'consumer', label: 'Потребительский кредит' },
  { value: 'mortgage', label: 'Ипотека' },
  { value: 'car', label: 'Автокредит' },
  { value: 'business', label: 'Бизнес-кредит' },
  { value: 'refinancing', label: 'Рефинансирование' },
];

export const EMPLOYMENT_STATUS_OPTIONS: Array<{ value: EmploymentStatus; label: string }> = [
  { value: 'employed', label: 'Работаю по найму' },
  { value: 'selfEmployed', label: 'Индивидуальный предприниматель' },
  { value: 'unemployed', label: 'Не работаю' },
  { value: 'retired', label: 'Пенсионер' },
  { value: 'student', label: 'Студент' },
];

export const MARITAL_STATUS_OPTIONS: Array<{ value: MaritalStatus; label: string }> = [
  { value: 'single', label: 'Не женат/Не замужем' },
  { value: 'married', label: 'Женат/Замужем' },
  { value: 'divorced', label: 'Разведён(а)' },
  { value: 'widowed', label: 'Вдовец/Вдова' },
];

export const EDUCATION_OPTIONS: Array<{ value: Education; label: string }> = [
  { value: 'secondary', label: 'Среднее' },
  { value: 'specialized', label: 'Среднее специальное' },
  { value: 'higher', label: 'Высшее' },
  { value: 'postgraduate', label: 'Учёная степень' },
];

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
];

export const PROPERTY_TYPE_OPTIONS = [
  { value: 'apartment', label: 'Квартира' },
  { value: 'house', label: 'Дом' },
  { value: 'land', label: 'Земельный участок' },
  { value: 'car', label: 'Автомобиль' },
  { value: 'other', label: 'Другое' },
];

// ============================================================================
// Лимиты и ограничения
// ============================================================================

export const LOAN_LIMITS = {
  minAmount: 50000,
  maxAmount: 10000000,
  minTerm: 6,
  maxTerm: 240,
  amountStep: 10000,
};

export const MORTGAGE_LIMITS = {
  minPropertyValue: 1000000,
  minInitialPaymentPercent: 20,
};

export const CAR_LIMITS = {
  minYear: 2000,
  maxYear: new Date().getFullYear() + 1,
  minPrice: 300000,
  maxPrice: 10000000,
};

export const INCOME_LIMITS = {
  minMonthlyIncome: 10000,
};

export const AGE_LIMITS = {
  minAge: 18,
  maxAge: 70,
};

export const VALIDATION_LIMITS = {
  maxPaymentToIncomeRatio: 50,
  warningPaymentToIncomeRatio: 40,
  maxDependents: 10,
};

// ============================================================================
// Базовые процентные ставки по типам кредита
// ============================================================================

export const BASE_INTEREST_RATES: Record<LoanType, number> = {
  consumer: 15.9,
  mortgage: 10.5,
  car: 12.5,
  business: 14.9,
  refinancing: 11.9,
};

// ============================================================================
// Шаги формы
// ============================================================================

export const FORM_STEPS = [
  { number: 1, title: 'Информация о кредите', shortTitle: 'Кредит' },
  { number: 2, title: 'Персональные данные', shortTitle: 'Данные' },
  { number: 3, title: 'Контактная информация', shortTitle: 'Контакты' },
  { number: 4, title: 'Занятость и доход', shortTitle: 'Работа' },
  { number: 5, title: 'Дополнительная информация', shortTitle: 'Доп. инфо' },
  { number: 6, title: 'Подтверждение', shortTitle: 'Подтверждение' },
];

export const TOTAL_STEPS = FORM_STEPS.length;

// ============================================================================
// Маски для InputMask
// ============================================================================

export const MASKS = {
  passportSeries: '99 99',
  passportNumber: '999999',
  departmentCode: '999-999',
  inn: '999999999999',
  companyInn: '9999999999',
  snils: '999-999-999 99',
  phone: '+7 (999) 999-99-99',
  postalCode: '999999',
  smsCode: '999999',
};

// ============================================================================
// Замокированные данные для справочников
// ============================================================================

/** Регионы России */
export const MOCK_REGIONS = [
  { value: 'moscow', label: 'Москва' },
  { value: 'moscow_region', label: 'Московская область' },
  { value: 'spb', label: 'Санкт-Петербург' },
  { value: 'leningrad_region', label: 'Ленинградская область' },
  { value: 'novosibirsk_region', label: 'Новосибирская область' },
  { value: 'sverdlovsk_region', label: 'Свердловская область' },
  { value: 'tatarstan', label: 'Республика Татарстан' },
  { value: 'krasnodar_region', label: 'Краснодарский край' },
  { value: 'chelyabinsk_region', label: 'Челябинская область' },
  { value: 'samara_region', label: 'Самарская область' },
  { value: 'rostov_region', label: 'Ростовская область' },
  { value: 'bashkortostan', label: 'Республика Башкортостан' },
  { value: 'nizhny_novgorod_region', label: 'Нижегородская область' },
  { value: 'perm_region', label: 'Пермский край' },
  { value: 'voronezh_region', label: 'Воронежская область' },
];

/** Города по регионам */
export const MOCK_CITIES_BY_REGION: Record<string, Array<{ value: string; label: string }>> = {
  moscow: [{ value: 'moscow', label: 'Москва' }],
  moscow_region: [
    { value: 'balashikha', label: 'Балашиха' },
    { value: 'khimki', label: 'Химки' },
    { value: 'podolsk', label: 'Подольск' },
    { value: 'odintsovo', label: 'Одинцово' },
    { value: 'mytishchi', label: 'Мытищи' },
    { value: 'korolev', label: 'Королёв' },
    { value: 'lyubertsy', label: 'Люберцы' },
    { value: 'krasnogorsk', label: 'Красногорск' },
    { value: 'elektrostal', label: 'Электросталь' },
    { value: 'kolomen', label: 'Коломна' },
  ],
  spb: [{ value: 'spb', label: 'Санкт-Петербург' }],
  leningrad_region: [
    { value: 'gatchina', label: 'Гатчина' },
    { value: 'vyborg', label: 'Выборг' },
    { value: 'vsevolozhsk', label: 'Всеволожск' },
    { value: 'sosnoviy_bor', label: 'Сосновый Бор' },
    { value: 'tikhvin', label: 'Тихвин' },
  ],
  novosibirsk_region: [
    { value: 'novosibirsk', label: 'Новосибирск' },
    { value: 'berdsk', label: 'Бердск' },
    { value: 'iskitim', label: 'Искитим' },
    { value: 'ob', label: 'Обь' },
  ],
  sverdlovsk_region: [
    { value: 'ekaterinburg', label: 'Екатеринбург' },
    { value: 'nizhny_tagil', label: 'Нижний Тагил' },
    { value: 'kamensk_uralsky', label: 'Каменск-Уральский' },
    { value: 'pervouralsk', label: 'Первоуральск' },
    { value: 'serov', label: 'Серов' },
  ],
  tatarstan: [
    { value: 'kazan', label: 'Казань' },
    { value: 'naberezhnye_chelny', label: 'Набережные Челны' },
    { value: 'nizhnekamsk', label: 'Нижнекамск' },
    { value: 'almetyevsk', label: 'Альметьевск' },
    { value: 'zelenodolsk', label: 'Зеленодольск' },
  ],
  krasnodar_region: [
    { value: 'krasnodar', label: 'Краснодар' },
    { value: 'sochi', label: 'Сочи' },
    { value: 'novorossiysk', label: 'Новороссийск' },
    { value: 'armavir', label: 'Армавир' },
    { value: 'anapa', label: 'Анапа' },
    { value: 'gelendzhik', label: 'Геленджик' },
  ],
  chelyabinsk_region: [
    { value: 'chelyabinsk', label: 'Челябинск' },
    { value: 'magnitogorsk', label: 'Магнитогорск' },
    { value: 'zlatoust', label: 'Златоуст' },
    { value: 'miass', label: 'Миасс' },
  ],
  samara_region: [
    { value: 'samara', label: 'Самара' },
    { value: 'tolyatti', label: 'Тольятти' },
    { value: 'syzran', label: 'Сызрань' },
    { value: 'novokuibyshevsk', label: 'Новокуйбышевск' },
  ],
  rostov_region: [
    { value: 'rostov_on_don', label: 'Ростов-на-Дону' },
    { value: 'taganrog', label: 'Таганрог' },
    { value: 'shakhty', label: 'Шахты' },
    { value: 'volgodonsk', label: 'Волгодонск' },
    { value: 'novocherkassk', label: 'Новочеркасск' },
  ],
  bashkortostan: [
    { value: 'ufa', label: 'Уфа' },
    { value: 'sterlitamak', label: 'Стерлитамак' },
    { value: 'salavat', label: 'Салават' },
    { value: 'neftekamsk', label: 'Нефтекамск' },
  ],
  nizhny_novgorod_region: [
    { value: 'nizhny_novgorod', label: 'Нижний Новгород' },
    { value: 'dzerzhinsk', label: 'Дзержинск' },
    { value: 'arzamas', label: 'Арзамас' },
    { value: 'sarov', label: 'Саров' },
  ],
  perm_region: [
    { value: 'perm', label: 'Пермь' },
    { value: 'berezniki', label: 'Березники' },
    { value: 'solikamsk', label: 'Соликамск' },
    { value: 'chaikovskiy', label: 'Чайковский' },
  ],
  voronezh_region: [
    { value: 'voronezh', label: 'Воронеж' },
    { value: 'borisoglebsk', label: 'Борисоглебск' },
    { value: 'rossosh', label: 'Россошь' },
    { value: 'liski', label: 'Лиски' },
  ],
};

/** Марки автомобилей */
export const MOCK_CAR_BRANDS = [
  { value: 'toyota', label: 'Toyota' },
  { value: 'bmw', label: 'BMW' },
  { value: 'mercedes', label: 'Mercedes-Benz' },
  { value: 'audi', label: 'Audi' },
  { value: 'volkswagen', label: 'Volkswagen' },
  { value: 'hyundai', label: 'Hyundai' },
  { value: 'kia', label: 'Kia' },
  { value: 'skoda', label: 'Skoda' },
  { value: 'mazda', label: 'Mazda' },
  { value: 'nissan', label: 'Nissan' },
  { value: 'honda', label: 'Honda' },
  { value: 'ford', label: 'Ford' },
  { value: 'chevrolet', label: 'Chevrolet' },
  { value: 'lexus', label: 'Lexus' },
  { value: 'porsche', label: 'Porsche' },
  { value: 'lada', label: 'LADA' },
  { value: 'geely', label: 'Geely' },
  { value: 'chery', label: 'Chery' },
  { value: 'haval', label: 'Haval' },
  { value: 'changan', label: 'Changan' },
];

/** Модели автомобилей по маркам */
export const MOCK_CAR_MODELS: Record<string, Array<{ value: string; label: string }>> = {
  toyota: [
    { value: 'camry', label: 'Camry' },
    { value: 'corolla', label: 'Corolla' },
    { value: 'rav4', label: 'RAV4' },
    { value: 'land_cruiser', label: 'Land Cruiser' },
    { value: 'highlander', label: 'Highlander' },
    { value: 'prius', label: 'Prius' },
    { value: 'fortuner', label: 'Fortuner' },
  ],
  bmw: [
    { value: '3_series', label: '3 Series' },
    { value: '5_series', label: '5 Series' },
    { value: '7_series', label: '7 Series' },
    { value: 'x3', label: 'X3' },
    { value: 'x5', label: 'X5' },
    { value: 'x7', label: 'X7' },
    { value: 'i4', label: 'i4' },
    { value: 'ix', label: 'iX' },
  ],
  mercedes: [
    { value: 'c_class', label: 'C-Class' },
    { value: 'e_class', label: 'E-Class' },
    { value: 's_class', label: 'S-Class' },
    { value: 'gle', label: 'GLE' },
    { value: 'gls', label: 'GLS' },
    { value: 'glc', label: 'GLC' },
    { value: 'a_class', label: 'A-Class' },
    { value: 'eqe', label: 'EQE' },
  ],
  audi: [
    { value: 'a3', label: 'A3' },
    { value: 'a4', label: 'A4' },
    { value: 'a6', label: 'A6' },
    { value: 'a8', label: 'A8' },
    { value: 'q3', label: 'Q3' },
    { value: 'q5', label: 'Q5' },
    { value: 'q7', label: 'Q7' },
    { value: 'q8', label: 'Q8' },
    { value: 'e_tron', label: 'e-tron' },
  ],
  volkswagen: [
    { value: 'polo', label: 'Polo' },
    { value: 'golf', label: 'Golf' },
    { value: 'passat', label: 'Passat' },
    { value: 'tiguan', label: 'Tiguan' },
    { value: 'touareg', label: 'Touareg' },
    { value: 'id4', label: 'ID.4' },
    { value: 'taos', label: 'Taos' },
  ],
  hyundai: [
    { value: 'solaris', label: 'Solaris' },
    { value: 'creta', label: 'Creta' },
    { value: 'tucson', label: 'Tucson' },
    { value: 'santa_fe', label: 'Santa Fe' },
    { value: 'sonata', label: 'Sonata' },
    { value: 'elantra', label: 'Elantra' },
    { value: 'palisade', label: 'Palisade' },
  ],
  kia: [
    { value: 'rio', label: 'Rio' },
    { value: 'ceed', label: 'Ceed' },
    { value: 'sportage', label: 'Sportage' },
    { value: 'sorento', label: 'Sorento' },
    { value: 'k5', label: 'K5' },
    { value: 'seltos', label: 'Seltos' },
    { value: 'carnival', label: 'Carnival' },
  ],
  skoda: [
    { value: 'rapid', label: 'Rapid' },
    { value: 'octavia', label: 'Octavia' },
    { value: 'superb', label: 'Superb' },
    { value: 'kodiaq', label: 'Kodiaq' },
    { value: 'karoq', label: 'Karoq' },
  ],
  mazda: [
    { value: 'mazda3', label: 'Mazda3' },
    { value: 'mazda6', label: 'Mazda6' },
    { value: 'cx5', label: 'CX-5' },
    { value: 'cx9', label: 'CX-9' },
    { value: 'cx30', label: 'CX-30' },
  ],
  nissan: [
    { value: 'qashqai', label: 'Qashqai' },
    { value: 'x_trail', label: 'X-Trail' },
    { value: 'murano', label: 'Murano' },
    { value: 'pathfinder', label: 'Pathfinder' },
    { value: 'terrano', label: 'Terrano' },
  ],
  honda: [
    { value: 'civic', label: 'Civic' },
    { value: 'accord', label: 'Accord' },
    { value: 'cr_v', label: 'CR-V' },
    { value: 'pilot', label: 'Pilot' },
    { value: 'hr_v', label: 'HR-V' },
  ],
  ford: [
    { value: 'focus', label: 'Focus' },
    { value: 'mondeo', label: 'Mondeo' },
    { value: 'kuga', label: 'Kuga' },
    { value: 'explorer', label: 'Explorer' },
    { value: 'mustang', label: 'Mustang' },
  ],
  chevrolet: [
    { value: 'cruze', label: 'Cruze' },
    { value: 'malibu', label: 'Malibu' },
    { value: 'tahoe', label: 'Tahoe' },
    { value: 'trailblazer', label: 'Trailblazer' },
    { value: 'equinox', label: 'Equinox' },
  ],
  lexus: [
    { value: 'es', label: 'ES' },
    { value: 'rx', label: 'RX' },
    { value: 'nx', label: 'NX' },
    { value: 'lx', label: 'LX' },
    { value: 'gx', label: 'GX' },
  ],
  porsche: [
    { value: 'cayenne', label: 'Cayenne' },
    { value: 'macan', label: 'Macan' },
    { value: 'panamera', label: 'Panamera' },
    { value: '911', label: '911' },
    { value: 'taycan', label: 'Taycan' },
  ],
  lada: [
    { value: 'vesta', label: 'Vesta' },
    { value: 'granta', label: 'Granta' },
    { value: 'niva', label: 'Niva' },
    { value: 'xray', label: 'XRAY' },
    { value: 'largus', label: 'Largus' },
  ],
  geely: [
    { value: 'coolray', label: 'Coolray' },
    { value: 'atlas', label: 'Atlas' },
    { value: 'tugella', label: 'Tugella' },
    { value: 'monjaro', label: 'Monjaro' },
    { value: 'emgrand', label: 'Emgrand' },
  ],
  chery: [
    { value: 'tiggo_4', label: 'Tiggo 4' },
    { value: 'tiggo_7', label: 'Tiggo 7 Pro' },
    { value: 'tiggo_8', label: 'Tiggo 8 Pro' },
    { value: 'arrizo_8', label: 'Arrizo 8' },
  ],
  haval: [
    { value: 'jolion', label: 'Jolion' },
    { value: 'f7', label: 'F7' },
    { value: 'h9', label: 'H9' },
    { value: 'dargo', label: 'Dargo' },
  ],
  changan: [
    { value: 'cs35', label: 'CS35 Plus' },
    { value: 'cs55', label: 'CS55 Plus' },
    { value: 'cs75', label: 'CS75 Plus' },
    { value: 'uni_t', label: 'UNI-T' },
    { value: 'uni_k', label: 'UNI-K' },
  ],
};

/** Банки */
export const MOCK_BANKS = [
  { value: 'sberbank', label: 'Сбербанк' },
  { value: 'vtb', label: 'ВТБ' },
  { value: 'alfa', label: 'Альфа-Банк' },
  { value: 'gazprombank', label: 'Газпромбанк' },
  { value: 'tinkoff', label: 'Т-Банк (Тинькофф)' },
  { value: 'raiffeisen', label: 'Райффайзенбанк' },
  { value: 'rosbank', label: 'Росбанк' },
  { value: 'otkritie', label: 'Банк Открытие' },
  { value: 'sovcombank', label: 'Совкомбанк' },
  { value: 'psb', label: 'Промсвязьбанк' },
  { value: 'mkb', label: 'МКБ' },
  { value: 'unicredit', label: 'ЮниКредит Банк' },
  { value: 'uralsib', label: 'Уралсиб' },
  { value: 'pochtabank', label: 'Почта Банк' },
  { value: 'homecredit', label: 'Хоум Кредит Банк' },
];

/** Типы существующих кредитов */
export const MOCK_EXISTING_LOAN_TYPES = [
  { value: 'consumer', label: 'Потребительский кредит' },
  { value: 'mortgage', label: 'Ипотека' },
  { value: 'car', label: 'Автокредит' },
  { value: 'credit_card', label: 'Кредитная карта' },
  { value: 'installment', label: 'Рассрочка' },
  { value: 'microfinance', label: 'Микрозайм' },
  { value: 'education', label: 'Образовательный кредит' },
  { value: 'business', label: 'Бизнес-кредит' },
];

/** Типы родства для созаемщиков */
export const MOCK_RELATIONSHIP_TYPES = [
  { value: 'spouse', label: 'Супруг/Супруга' },
  { value: 'parent', label: 'Родитель' },
  { value: 'child', label: 'Ребёнок (совершеннолетний)' },
  { value: 'sibling', label: 'Брат/Сестра' },
  { value: 'other_relative', label: 'Другой родственник' },
  { value: 'not_relative', label: 'Не родственник' },
];

/** Должности */
export const MOCK_POSITIONS = [
  { value: 'director', label: 'Директор' },
  { value: 'deputy_director', label: 'Заместитель директора' },
  { value: 'head_of_department', label: 'Начальник отдела' },
  { value: 'manager', label: 'Менеджер' },
  { value: 'senior_specialist', label: 'Ведущий специалист' },
  { value: 'specialist', label: 'Специалист' },
  { value: 'engineer', label: 'Инженер' },
  { value: 'developer', label: 'Разработчик' },
  { value: 'accountant', label: 'Бухгалтер' },
  { value: 'lawyer', label: 'Юрист' },
  { value: 'economist', label: 'Экономист' },
  { value: 'salesperson', label: 'Продавец-консультант' },
  { value: 'driver', label: 'Водитель' },
  { value: 'worker', label: 'Рабочий' },
  { value: 'other', label: 'Другое' },
];

/** Типы бизнеса для ИП */
export const MOCK_BUSINESS_TYPES = [
  { value: 'ip', label: 'Индивидуальный предприниматель (ИП)' },
  { value: 'ooo', label: 'ООО (учредитель)' },
  { value: 'self_employed', label: 'Самозанятый' },
  { value: 'farm', label: 'Крестьянское (фермерское) хозяйство' },
];