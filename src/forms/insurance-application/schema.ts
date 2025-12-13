import type { FormSchema } from '@reformer/core';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup } from '@/components/ui/radio-group';
import { InputMask } from '@/components/ui/input-mask';
import { Textarea } from '@/components/ui/textarea';
import type { InsuranceApplicationForm, Traveler, Driver, Beneficiary, Claim } from './type';

// Options for select/radio fields
export const insuranceTypeOptions = [
  { value: 'casco', label: 'КАСКО' },
  { value: 'osago', label: 'ОСАГО' },
  { value: 'property', label: 'Недвижимость' },
  { value: 'life', label: 'Жизнь и здоровье' },
  { value: 'travel', label: 'Путешествия' },
];

export const insurancePeriodOptions = [
  { value: '3', label: '3 месяца' },
  { value: '6', label: '6 месяцев' },
  { value: '12', label: '1 год' },
  { value: '24', label: '2 года' },
  { value: '36', label: '3 года' },
];

export const paymentTypeOptions = [
  { value: 'single', label: 'Единовременно' },
  { value: 'installments', label: 'В рассрочку' },
];

export const installmentsOptions = [
  { value: 2, label: '2 платежа' },
  { value: 3, label: '3 платежа' },
  { value: 4, label: '4 платежа' },
  { value: 6, label: '6 платежей' },
  { value: 12, label: '12 платежей' },
];

export const insuredTypeOptions = [
  { value: 'individual', label: 'Физическое лицо' },
  { value: 'company', label: 'Юридическое лицо' },
];

export const genderOptions = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
];

export const bodyTypeOptions = [
  { value: 'sedan', label: 'Седан' },
  { value: 'hatchback', label: 'Хэтчбек' },
  { value: 'suv', label: 'Внедорожник' },
  { value: 'wagon', label: 'Универсал' },
  { value: 'coupe', label: 'Купе' },
  { value: 'minivan', label: 'Минивэн' },
  { value: 'pickup', label: 'Пикап' },
];

export const transmissionOptions = [
  { value: 'manual', label: 'Механика' },
  { value: 'automatic', label: 'Автомат' },
];

export const usagePurposeOptions = [
  { value: 'personal', label: 'Личное' },
  { value: 'taxi', label: 'Такси' },
  { value: 'education', label: 'Учебный' },
  { value: 'commercial', label: 'Коммерческое' },
];

export const propertyTypeOptions = [
  { value: 'apartment', label: 'Квартира' },
  { value: 'house', label: 'Дом' },
  { value: 'townhouse', label: 'Таунхаус' },
  { value: 'commercial', label: 'Коммерческая' },
  { value: 'land', label: 'Земельный участок' },
];

export const wallMaterialOptions = [
  { value: 'brick', label: 'Кирпич' },
  { value: 'concrete', label: 'Бетон' },
  { value: 'wood', label: 'Дерево' },
  { value: 'panel', label: 'Панель' },
  { value: 'monolith', label: 'Монолит' },
  { value: 'other', label: 'Другое' },
];

export const travelDestinationOptions = [
  { value: 'europe', label: 'Европа' },
  { value: 'asia', label: 'Азия' },
  { value: 'usa_canada', label: 'США и Канада' },
  { value: 'cis', label: 'СНГ' },
  { value: 'worldwide', label: 'Весь мир' },
];

export const tripPurposeOptions = [
  { value: 'tourism', label: 'Туризм' },
  { value: 'business', label: 'Бизнес' },
  { value: 'education', label: 'Обучение' },
  { value: 'work', label: 'Работа' },
  { value: 'other', label: 'Другое' },
];

export const relationshipOptions = [
  { value: 'spouse', label: 'Супруг(а)' },
  { value: 'child', label: 'Ребенок' },
  { value: 'parent', label: 'Родитель' },
  { value: 'sibling', label: 'Брат/сестра' },
  { value: 'other', label: 'Другое' },
];

export const claimTypeOptions = [
  { value: 'accident', label: 'ДТП' },
  { value: 'theft', label: 'Угон/кража' },
  { value: 'damage', label: 'Повреждение' },
  { value: 'natural_disaster', label: 'Стихийное бедствие' },
  { value: 'medical', label: 'Медицинский случай' },
  { value: 'other', label: 'Другое' },
];

export const referralSourceOptions = [
  { value: 'internet', label: 'Интернет' },
  { value: 'friends', label: 'Рекомендации друзей' },
  { value: 'tv', label: 'Телевидение' },
  { value: 'agent', label: 'Страховой агент' },
  { value: 'other', label: 'Другое' },
];

export const carBrandOptions = [
  { value: 'toyota', label: 'Toyota' },
  { value: 'honda', label: 'Honda' },
  { value: 'bmw', label: 'BMW' },
  { value: 'mercedes', label: 'Mercedes-Benz' },
  { value: 'audi', label: 'Audi' },
  { value: 'volkswagen', label: 'Volkswagen' },
  { value: 'ford', label: 'Ford' },
  { value: 'chevrolet', label: 'Chevrolet' },
  { value: 'nissan', label: 'Nissan' },
  { value: 'hyundai', label: 'Hyundai' },
  { value: 'kia', label: 'Kia' },
  { value: 'lada', label: 'LADA' },
];

// Traveler item schema
const travelerSchema: FormSchema<Traveler> = {
  fullName: { value: '', component: Input, componentProps: { label: 'ФИО', placeholder: 'Ivanov Ivan', testId: 'traveler-fullName' } },
  birthDate: { value: '', component: Input, componentProps: { label: 'Дата рождения', type: 'date', testId: 'traveler-birthDate' } },
  passportNumber: { value: '', component: Input, componentProps: { label: 'Номер загранпаспорта', placeholder: '00 0000000', testId: 'traveler-passportNumber' } },
};

// Driver item schema
const driverSchema: FormSchema<Driver> = {
  fullName: { value: '', component: Input, componentProps: { label: 'ФИО водителя', placeholder: 'Иванов Иван Иванович', testId: 'driver-fullName' } },
  birthDate: { value: '', component: Input, componentProps: { label: 'Дата рождения', type: 'date', testId: 'driver-birthDate' } },
  licenseNumber: { value: '', component: Input, componentProps: { label: 'Номер ВУ', placeholder: '00 00 000000', testId: 'driver-licenseNumber' } },
  licenseIssueDate: { value: '', component: Input, componentProps: { label: 'Дата выдачи ВУ', type: 'date', testId: 'driver-licenseIssueDate' } },
  drivingExperience: { value: undefined, component: Input, componentProps: { label: 'Стаж вождения (лет)', type: 'number', disabled: true, testId: 'driver-drivingExperience' } },
  accidentsCount: { value: 0, component: Input, componentProps: { label: 'Кол-во ДТП за 3 года', type: 'number', min: 0, testId: 'driver-accidentsCount' } },
  isMainDriver: { value: false, component: Checkbox, componentProps: { label: 'Основной водитель', testId: 'driver-isMainDriver' } },
};

// Beneficiary item schema
const beneficiarySchema: FormSchema<Beneficiary> = {
  fullName: { value: '', component: Input, componentProps: { label: 'ФИО', placeholder: 'Иванов Иван Иванович', testId: 'beneficiary-fullName' } },
  birthDate: { value: '', component: Input, componentProps: { label: 'Дата рождения', type: 'date', testId: 'beneficiary-birthDate' } },
  relationship: { value: 'spouse', component: Select, componentProps: { label: 'Степень родства', options: relationshipOptions, testId: 'beneficiary-relationship' } },
  share: { value: undefined, component: Input, componentProps: { label: 'Доля (%)', type: 'number', min: 1, max: 100, placeholder: '50', testId: 'beneficiary-share' } },
  phone: { value: '', component: InputMask, componentProps: { label: 'Телефон', mask: '+7 (999) 999-99-99', placeholder: '+7 (___) ___-__-__', testId: 'beneficiary-phone' } },
};

// Claim item schema
const claimSchema: FormSchema<Claim> = {
  date: { value: '', component: Input, componentProps: { label: 'Дата события', type: 'date', testId: 'claim-date' } },
  type: { value: 'accident', component: Select, componentProps: { label: 'Тип события', options: claimTypeOptions, testId: 'claim-type' } },
  description: { value: '', component: Textarea, componentProps: { label: 'Описание', placeholder: 'Опишите событие', testId: 'claim-description' } },
  amount: { value: undefined, component: Input, componentProps: { label: 'Сумма выплаты (руб.)', type: 'number', min: 0, placeholder: '100000', testId: 'claim-amount' } },
  atFault: { value: false, component: Checkbox, componentProps: { label: 'По вине страхователя', testId: 'claim-atFault' } },
};

// Main form schema
export const insuranceApplicationSchema: FormSchema<InsuranceApplicationForm> = {
  // Step 1: Insurance Type and Basic Parameters
  insuranceType: { value: 'casco', component: Select, componentProps: { label: 'Тип страхования', options: insuranceTypeOptions, placeholder: 'Выберите тип страхования', testId: 'insuranceType' } },
  insurancePeriod: { value: '', component: Select, componentProps: { label: 'Срок страхования', options: insurancePeriodOptions, placeholder: 'Выберите срок', testId: 'insurancePeriod' } },
  startDate: { value: '', component: Input, componentProps: { label: 'Дата начала действия полиса', type: 'date', testId: 'startDate' } },
  endDate: { value: '', component: Input, componentProps: { label: 'Дата окончания', type: 'date', disabled: true, testId: 'endDate' } },
  coverageAmount: { value: undefined, component: Input, componentProps: { label: 'Страховая сумма (руб.)', type: 'number', min: 100000, max: 50000000, placeholder: 'от 100 000 до 50 000 000', testId: 'coverageAmount' } },
  deductible: { value: undefined, component: Input, componentProps: { label: 'Франшиза (руб.)', type: 'number', min: 0, placeholder: '0', testId: 'deductible' } },
  paymentType: { value: 'single', component: RadioGroup, componentProps: { label: 'Способ оплаты', options: paymentTypeOptions, testId: 'paymentType' } },
  installments: { value: undefined, component: Select, componentProps: { label: 'Количество платежей', options: installmentsOptions, placeholder: 'Выберите количество', testId: 'installments' } },

  // Step 2: Policyholder Data
  insuredType: { value: 'individual', component: RadioGroup, componentProps: { label: 'Тип страхователя', options: insuredTypeOptions, testId: 'insuredType' } },
  personalData: {
    lastName: { value: '', component: Input, componentProps: { label: 'Фамилия', placeholder: 'Введите фамилию', testId: 'personalData-lastName' } },
    firstName: { value: '', component: Input, componentProps: { label: 'Имя', placeholder: 'Введите имя', testId: 'personalData-firstName' } },
    middleName: { value: '', component: Input, componentProps: { label: 'Отчество', placeholder: 'Введите отчество', testId: 'personalData-middleName' } },
    birthDate: { value: '', component: Input, componentProps: { label: 'Дата рождения', type: 'date', testId: 'personalData-birthDate' } },
    gender: { value: 'male', component: RadioGroup, componentProps: { label: 'Пол', options: genderOptions, testId: 'personalData-gender' } },
  },
  companyData: {
    name: { value: '', component: Input, componentProps: { label: 'Название организации', placeholder: 'ООО "Компания"', testId: 'companyData-name' } },
    inn: { value: '', component: InputMask, componentProps: { label: 'ИНН организации', mask: '9999999999', placeholder: '1234567890', testId: 'companyData-inn' } },
    ogrn: { value: '', component: InputMask, componentProps: { label: 'ОГРН', mask: '9999999999999', placeholder: '1234567890123', testId: 'companyData-ogrn' } },
    kpp: { value: '', component: InputMask, componentProps: { label: 'КПП', mask: '999999999', placeholder: '123456789', testId: 'companyData-kpp' } },
    ceoName: { value: '', component: Input, componentProps: { label: 'ФИО руководителя', placeholder: 'Иванов Иван Иванович', testId: 'companyData-ceoName' } },
  },
  passportData: {
    series: { value: '', component: InputMask, componentProps: { label: 'Серия паспорта', mask: '99 99', placeholder: '12 34', testId: 'passportData-series' } },
    number: { value: '', component: InputMask, componentProps: { label: 'Номер паспорта', mask: '999999', placeholder: '123456', testId: 'passportData-number' } },
    issueDate: { value: '', component: Input, componentProps: { label: 'Дата выдачи', type: 'date', testId: 'passportData-issueDate' } },
    issuedBy: { value: '', component: Input, componentProps: { label: 'Кем выдан', placeholder: 'Отделением УФМС...', testId: 'passportData-issuedBy' } },
  },
  phone: { value: '', component: InputMask, componentProps: { label: 'Телефон', mask: '+7 (999) 999-99-99', placeholder: '+7 (___) ___-__-__', testId: 'phone' } },
  email: { value: '', component: Input, componentProps: { label: 'Email', type: 'email', placeholder: 'example@mail.com', testId: 'email' } },
  fullName: { value: '', component: Input, componentProps: { label: 'Полное имя (ФИО)', disabled: true, testId: 'fullName' } },
  age: { value: undefined, component: Input, componentProps: { label: 'Возраст', type: 'number', disabled: true, testId: 'age' } },

  // Step 3: Insurance Object - Vehicle
  vehicle: {
    vin: { value: '', component: Input, componentProps: { label: 'VIN-номер', placeholder: 'XXXXXXXXXXXXXXXXX', maxLength: 17, testId: 'vehicle-vin' } },
    brand: { value: '', component: Select, componentProps: { label: 'Марка автомобиля', options: carBrandOptions, placeholder: 'Выберите марку', testId: 'vehicle-brand' } },
    model: { value: '', component: Select, componentProps: { label: 'Модель автомобиля', options: [], placeholder: 'Выберите модель', testId: 'vehicle-model' } },
    year: { value: undefined, component: Input, componentProps: { label: 'Год выпуска', type: 'number', min: 1990, placeholder: '2020', testId: 'vehicle-year' } },
    mileage: { value: undefined, component: Input, componentProps: { label: 'Пробег (км)', type: 'number', min: 0, placeholder: '50000', testId: 'vehicle-mileage' } },
    enginePower: { value: undefined, component: Input, componentProps: { label: 'Мощность двигателя (л.с.)', type: 'number', min: 1, placeholder: '150', testId: 'vehicle-enginePower' } },
    bodyType: { value: 'sedan', component: Select, componentProps: { label: 'Тип кузова', options: bodyTypeOptions, placeholder: 'Выберите тип', testId: 'vehicle-bodyType' } },
    transmission: { value: 'manual', component: RadioGroup, componentProps: { label: 'Коробка передач', options: transmissionOptions, testId: 'vehicle-transmission' } },
    marketValue: { value: undefined, component: Input, componentProps: { label: 'Рыночная стоимость (руб.)', type: 'number', min: 0, placeholder: '1500000', testId: 'vehicle-marketValue' } },
    licensePlate: { value: '', component: Input, componentProps: { label: 'Госномер', placeholder: 'А000АА000', testId: 'vehicle-licensePlate' } },
    registrationCert: { value: '', component: Input, componentProps: { label: 'Номер СТС', placeholder: '00 00 000000', testId: 'vehicle-registrationCert' } },
    hasAntiTheft: { value: false, component: Checkbox, componentProps: { label: 'Наличие противоугонной системы', testId: 'vehicle-hasAntiTheft' } },
    antiTheftBrand: { value: '', component: Input, componentProps: { label: 'Марка противоугонной системы', placeholder: 'StarLine', testId: 'vehicle-antiTheftBrand' } },
    garageParking: { value: false, component: Checkbox, componentProps: { label: 'Гаражное хранение', testId: 'vehicle-garageParking' } },
    usagePurpose: { value: 'personal', component: Select, componentProps: { label: 'Цель использования', options: usagePurposeOptions, placeholder: 'Выберите цель', testId: 'vehicle-usagePurpose' } },
  },

  // Step 3: Insurance Object - Property
  property: {
    type: { value: 'apartment', component: Select, componentProps: { label: 'Тип недвижимости', options: propertyTypeOptions, placeholder: 'Выберите тип', testId: 'property-type' } },
    address: {
      region: { value: '', component: Input, componentProps: { label: 'Регион', placeholder: 'Московская область', testId: 'property-address-region' } },
      city: { value: '', component: Input, componentProps: { label: 'Город', placeholder: 'Москва', testId: 'property-address-city' } },
      street: { value: '', component: Input, componentProps: { label: 'Улица', placeholder: 'ул. Ленина', testId: 'property-address-street' } },
      house: { value: '', component: Input, componentProps: { label: 'Дом', placeholder: '1', testId: 'property-address-house' } },
      apartment: { value: '', component: Input, componentProps: { label: 'Квартира', placeholder: '1', testId: 'property-address-apartment' } },
    },
    area: { value: undefined, component: Input, componentProps: { label: 'Площадь (м2)', type: 'number', min: 1, placeholder: '50', testId: 'property-area' } },
    floors: { value: undefined, component: Input, componentProps: { label: 'Этажность здания', type: 'number', min: 1, placeholder: '9', testId: 'property-floors' } },
    floor: { value: undefined, component: Input, componentProps: { label: 'Этаж квартиры', type: 'number', min: 1, placeholder: '5', testId: 'property-floor' } },
    yearBuilt: { value: undefined, component: Input, componentProps: { label: 'Год постройки', type: 'number', min: 1800, placeholder: '2010', testId: 'property-yearBuilt' } },
    wallMaterial: { value: 'brick', component: Select, componentProps: { label: 'Материал стен', options: wallMaterialOptions, placeholder: 'Выберите материал', testId: 'property-wallMaterial' } },
    marketValue: { value: undefined, component: Input, componentProps: { label: 'Рыночная стоимость (руб.)', type: 'number', min: 0, placeholder: '5000000', testId: 'property-marketValue' } },
    hasAlarm: { value: false, component: Checkbox, componentProps: { label: 'Охранная сигнализация', testId: 'property-hasAlarm' } },
    hasFireAlarm: { value: false, component: Checkbox, componentProps: { label: 'Пожарная сигнализация', testId: 'property-hasFireAlarm' } },
    ownershipDoc: { value: '', component: Input, componentProps: { label: 'Номер документа о собственности', placeholder: '00-00/000-00/000/000/0000-0000', testId: 'property-ownershipDoc' } },
  },
  propertyCoverageOptions: {
    structure: { value: true, component: Checkbox, componentProps: { label: 'Страхование конструктива', testId: 'propertyCoverageOptions-structure' } },
    interior: { value: false, component: Checkbox, componentProps: { label: 'Страхование отделки', testId: 'propertyCoverageOptions-interior' } },
    movables: { value: false, component: Checkbox, componentProps: { label: 'Страхование движимого имущества', testId: 'propertyCoverageOptions-movables' } },
    liability: { value: false, component: Checkbox, componentProps: { label: 'Гражданская ответственность', testId: 'propertyCoverageOptions-liability' } },
  },

  // Step 3: Insurance Object - Health (Life Insurance)
  health: {
    height: { value: undefined, component: Input, componentProps: { label: 'Рост (см)', type: 'number', min: 100, max: 250, placeholder: '175', testId: 'health-height' } },
    weight: { value: undefined, component: Input, componentProps: { label: 'Вес (кг)', type: 'number', min: 30, max: 300, placeholder: '70', testId: 'health-weight' } },
    bmi: { value: undefined, component: Input, componentProps: { label: 'Индекс массы тела', type: 'number', disabled: true, testId: 'health-bmi' } },
    bloodPressure: { value: '', component: Input, componentProps: { label: 'Артериальное давление', placeholder: '120/80', testId: 'health-bloodPressure' } },
    isSmoker: { value: false, component: Checkbox, componentProps: { label: 'Курящий', testId: 'health-isSmoker' } },
    smokingYears: { value: undefined, component: Input, componentProps: { label: 'Стаж курения (лет)', type: 'number', min: 0, placeholder: '5', testId: 'health-smokingYears' } },
    hasChronicDiseases: { value: false, component: Checkbox, componentProps: { label: 'Хронические заболевания', testId: 'health-hasChronicDiseases' } },
    chronicDiseases: { value: '', component: Textarea, componentProps: { label: 'Описание заболеваний', placeholder: 'Перечислите заболевания', testId: 'health-chronicDiseases' } },
    hadSurgeries: { value: false, component: Checkbox, componentProps: { label: 'Перенесенные операции', testId: 'health-hadSurgeries' } },
    surgeries: { value: '', component: Textarea, componentProps: { label: 'Описание операций', placeholder: 'Перечислите операции', testId: 'health-surgeries' } },
    occupation: { value: '', component: Input, componentProps: { label: 'Род занятий', placeholder: 'Менеджер', testId: 'health-occupation' } },
    isHighRiskJob: { value: false, component: Checkbox, componentProps: { label: 'Опасная профессия', testId: 'health-isHighRiskJob' } },
    practicesSports: { value: false, component: Checkbox, componentProps: { label: 'Занятия спортом', testId: 'health-practicesSports' } },
    extremeSports: { value: false, component: Checkbox, componentProps: { label: 'Экстремальные виды спорта', testId: 'health-extremeSports' } },
  },
  lifeCoverageOptions: {
    death: { value: true, component: Checkbox, componentProps: { label: 'Страхование на случай смерти', testId: 'lifeCoverageOptions-death' } },
    disability: { value: false, component: Checkbox, componentProps: { label: 'Страхование инвалидности', testId: 'lifeCoverageOptions-disability' } },
    criticalIllness: { value: false, component: Checkbox, componentProps: { label: 'Критические заболевания', testId: 'lifeCoverageOptions-criticalIllness' } },
    accident: { value: false, component: Checkbox, componentProps: { label: 'Несчастные случаи', testId: 'lifeCoverageOptions-accident' } },
  },

  // Step 3: Insurance Object - Travel
  travel: {
    destination: { value: 'europe', component: Select, componentProps: { label: 'Страна/регион назначения', options: travelDestinationOptions, placeholder: 'Выберите регион', testId: 'travel-destination' } },
    tripPurpose: { value: 'tourism', component: Select, componentProps: { label: 'Цель поездки', options: tripPurposeOptions, placeholder: 'Выберите цель', testId: 'travel-tripPurpose' } },
    departureDate: { value: '', component: Input, componentProps: { label: 'Дата отъезда', type: 'date', testId: 'travel-departureDate' } },
    returnDate: { value: '', component: Input, componentProps: { label: 'Дата возвращения', type: 'date', testId: 'travel-returnDate' } },
    tripDuration: { value: undefined, component: Input, componentProps: { label: 'Длительность поездки (дни)', type: 'number', disabled: true, testId: 'travel-tripDuration' } },
    isMultipleTrips: { value: false, component: Checkbox, componentProps: { label: 'Мультипоездка (годовой полис)', testId: 'travel-isMultipleTrips' } },
  },
  travelCoverageOptions: {
    medical: { value: true, component: Checkbox, componentProps: { label: 'Медицинские расходы', testId: 'travelCoverageOptions-medical' } },
    baggage: { value: false, component: Checkbox, componentProps: { label: 'Багаж', testId: 'travelCoverageOptions-baggage' } },
    tripCancellation: { value: false, component: Checkbox, componentProps: { label: 'Отмена поездки', testId: 'travelCoverageOptions-tripCancellation' } },
    flightDelay: { value: false, component: Checkbox, componentProps: { label: 'Задержка рейса', testId: 'travelCoverageOptions-flightDelay' } },
    carRental: { value: false, component: Checkbox, componentProps: { label: 'Аренда авто', testId: 'travelCoverageOptions-carRental' } },
  },
  travelers: [travelerSchema],

  // Step 4: Drivers/Beneficiaries
  drivers: [driverSchema],
  unlimitedDrivers: { value: false, component: Checkbox, componentProps: { label: 'Неограниченное количество водителей', testId: 'unlimitedDrivers' } },
  minDriverAge: { value: undefined, component: Input, componentProps: { label: 'Мин. возраст водителя', type: 'number', disabled: true, testId: 'minDriverAge' } },
  minDriverExperience: { value: undefined, component: Input, componentProps: { label: 'Мин. стаж водителя', type: 'number', disabled: true, testId: 'minDriverExperience' } },
  beneficiaries: [beneficiarySchema],
  totalBeneficiaryShare: { value: undefined, component: Input, componentProps: { label: 'Сумма долей (%)', type: 'number', disabled: true, testId: 'totalBeneficiaryShare' } },

  // Step 5: History
  hasPreviousInsurance: { value: false, component: Checkbox, componentProps: { label: 'Был ли полис ранее', testId: 'hasPreviousInsurance' } },
  previousInsurer: { value: '', component: Input, componentProps: { label: 'Предыдущий страховщик', placeholder: 'Название компании', testId: 'previousInsurer' } },
  previousPolicyNumber: { value: '', component: Input, componentProps: { label: 'Номер предыдущего полиса', placeholder: 'XXX-000000', testId: 'previousPolicyNumber' } },
  previousPolicyEndDate: { value: '', component: Input, componentProps: { label: 'Дата окончания предыдущего полиса', type: 'date', testId: 'previousPolicyEndDate' } },
  hadClaims: { value: false, component: Checkbox, componentProps: { label: 'Были ли страховые случаи', testId: 'hadClaims' } },
  claims: [claimSchema],
  promoCode: { value: '', component: Input, componentProps: { label: 'Промокод', placeholder: 'PROMO2024', testId: 'promoCode' } },
  referralSource: { value: 'internet', component: Select, componentProps: { label: 'Откуда узнали о нас', options: referralSourceOptions, placeholder: 'Выберите источник', testId: 'referralSource' } },
  agentCode: { value: '', component: Input, componentProps: { label: 'Код агента', placeholder: 'AGT-000', testId: 'agentCode' } },
  additionalNotes: { value: '', component: Textarea, componentProps: { label: 'Дополнительные комментарии', placeholder: 'Ваши пожелания...', testId: 'additionalNotes' } },

  // Step 6: Calculation and Confirmation
  basePremium: { value: undefined, component: Input, componentProps: { label: 'Базовая премия (руб.)', type: 'number', disabled: true, testId: 'basePremium' } },
  ageCoefficient: { value: undefined, component: Input, componentProps: { label: 'Коэффициент возраста', type: 'number', disabled: true, testId: 'ageCoefficient' } },
  experienceCoefficient: { value: undefined, component: Input, componentProps: { label: 'Коэффициент стажа', type: 'number', disabled: true, testId: 'experienceCoefficient' } },
  regionCoefficient: { value: undefined, component: Input, componentProps: { label: 'Региональный коэффициент', type: 'number', disabled: true, testId: 'regionCoefficient' } },
  claimsCoefficient: { value: undefined, component: Input, componentProps: { label: 'Коэффициент аварийности (КБМ)', type: 'number', disabled: true, testId: 'claimsCoefficient' } },
  deductibleDiscount: { value: undefined, component: Input, componentProps: { label: 'Скидка за франшизу (%)', type: 'number', disabled: true, testId: 'deductibleDiscount' } },
  promoDiscount: { value: undefined, component: Input, componentProps: { label: 'Скидка по промокоду (%)', type: 'number', disabled: true, testId: 'promoDiscount' } },
  multiPolicyDiscount: { value: undefined, component: Input, componentProps: { label: 'Скидка за комплексное страхование (%)', type: 'number', disabled: true, testId: 'multiPolicyDiscount' } },
  totalPremium: { value: undefined, component: Input, componentProps: { label: 'Итоговая премия (руб.)', type: 'number', disabled: true, testId: 'totalPremium' } },
  installmentAmount: { value: undefined, component: Input, componentProps: { label: 'Сумма платежа (руб.)', type: 'number', disabled: true, testId: 'installmentAmount' } },
  agreePersonalData: { value: false, component: Checkbox, componentProps: { label: 'Согласие на обработку персональных данных', testId: 'agreePersonalData' } },
  agreeTerms: { value: false, component: Checkbox, componentProps: { label: 'Согласие с правилами страхования', testId: 'agreeTerms' } },
  agreeElectronicPolicy: { value: false, component: Checkbox, componentProps: { label: 'Согласие на электронный полис', testId: 'agreeElectronicPolicy' } },
  agreeMarketing: { value: false, component: Checkbox, componentProps: { label: 'Согласие на рекламу', testId: 'agreeMarketing' } },
  confirmAccuracy: { value: false, component: Checkbox, componentProps: { label: 'Подтверждение достоверности данных', testId: 'confirmAccuracy' } },
  electronicSignature: { value: '', component: InputMask, componentProps: { label: 'SMS-код подтверждения', mask: '999999', placeholder: '000000', testId: 'electronicSignature' } },
};
