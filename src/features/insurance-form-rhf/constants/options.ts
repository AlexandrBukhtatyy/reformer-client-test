// Опции для Select и RadioGroup

export const INSURANCE_TYPE_OPTIONS = [
  { value: 'casco', label: 'КАСКО' },
  { value: 'osago', label: 'ОСАГО' },
  { value: 'property', label: 'Недвижимость' },
  { value: 'life', label: 'Жизнь и здоровье' },
  { value: 'travel', label: 'Путешествия' },
] as const;

export const INSURANCE_PERIOD_OPTIONS = [
  { value: 3, label: '3 месяца' },
  { value: 6, label: '6 месяцев' },
  { value: 12, label: '1 год' },
  { value: 24, label: '2 года' },
  { value: 36, label: '3 года' },
] as const;

export const PAYMENT_TYPE_OPTIONS = [
  { value: 'single', label: 'Единовременно' },
  { value: 'installments', label: 'В рассрочку' },
] as const;

export const INSTALLMENTS_OPTIONS = [
  { value: 2, label: '2 платежа' },
  { value: 3, label: '3 платежа' },
  { value: 4, label: '4 платежа' },
  { value: 6, label: '6 платежей' },
  { value: 12, label: '12 платежей' },
] as const;

export const INSURED_TYPE_OPTIONS = [
  { value: 'individual', label: 'Физическое лицо' },
  { value: 'corporate', label: 'Юридическое лицо' },
] as const;

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
] as const;

export const BODY_TYPE_OPTIONS = [
  { value: 'sedan', label: 'Седан' },
  { value: 'hatchback', label: 'Хэтчбек' },
  { value: 'suv', label: 'Внедорожник' },
  { value: 'wagon', label: 'Универсал' },
  { value: 'coupe', label: 'Купе' },
  { value: 'minivan', label: 'Минивэн' },
  { value: 'pickup', label: 'Пикап' },
] as const;

export const TRANSMISSION_OPTIONS = [
  { value: 'manual', label: 'Механика' },
  { value: 'automatic', label: 'Автомат' },
] as const;

export const USAGE_PURPOSE_OPTIONS = [
  { value: 'personal', label: 'Личное' },
  { value: 'taxi', label: 'Такси' },
  { value: 'training', label: 'Учебный' },
  { value: 'commercial', label: 'Коммерческое' },
] as const;

export const PROPERTY_TYPE_OPTIONS = [
  { value: 'apartment', label: 'Квартира' },
  { value: 'house', label: 'Дом' },
  { value: 'townhouse', label: 'Таунхаус' },
  { value: 'commercial', label: 'Коммерческая' },
  { value: 'land', label: 'Земельный участок' },
] as const;

export const WALL_MATERIAL_OPTIONS = [
  { value: 'brick', label: 'Кирпич' },
  { value: 'concrete', label: 'Бетон' },
  { value: 'wood', label: 'Дерево' },
  { value: 'panel', label: 'Панель' },
  { value: 'monolith', label: 'Монолит' },
  { value: 'other', label: 'Другое' },
] as const;

export const TRAVEL_DESTINATION_OPTIONS = [
  { value: 'europe', label: 'Европа' },
  { value: 'asia', label: 'Азия' },
  { value: 'usa_canada', label: 'США и Канада' },
  { value: 'cis', label: 'СНГ' },
  { value: 'worldwide', label: 'Весь мир' },
] as const;

// Алиас для совместимости
export const DESTINATION_OPTIONS = TRAVEL_DESTINATION_OPTIONS;

export const TRIP_PURPOSE_OPTIONS = [
  { value: 'tourism', label: 'Туризм' },
  { value: 'business', label: 'Бизнес' },
  { value: 'study', label: 'Обучение' },
  { value: 'work', label: 'Работа' },
  { value: 'other', label: 'Другое' },
] as const;

export const RELATIONSHIP_OPTIONS = [
  { value: 'spouse', label: 'Супруг(а)' },
  { value: 'child', label: 'Ребенок' },
  { value: 'parent', label: 'Родитель' },
  { value: 'sibling', label: 'Брат/сестра' },
  { value: 'other', label: 'Другое' },
] as const;

export const CLAIM_TYPE_OPTIONS = [
  { value: 'accident', label: 'ДТП' },
  { value: 'theft', label: 'Угон/кража' },
  { value: 'damage', label: 'Повреждение' },
  { value: 'natural_disaster', label: 'Стихийное бедствие' },
  { value: 'medical', label: 'Медицинский случай' },
  { value: 'other', label: 'Другое' },
] as const;

export const REFERRAL_SOURCE_OPTIONS = [
  { value: 'internet', label: 'Интернет' },
  { value: 'friends', label: 'Рекомендации друзей' },
  { value: 'tv', label: 'Телевидение' },
  { value: 'agent', label: 'Страховой агент' },
  { value: 'other', label: 'Другое' },
] as const;

// Марки автомобилей (пример)
export const CAR_BRAND_OPTIONS = [
  { value: 'toyota', label: 'Toyota' },
  { value: 'volkswagen', label: 'Volkswagen' },
  { value: 'bmw', label: 'BMW' },
  { value: 'mercedes', label: 'Mercedes-Benz' },
  { value: 'audi', label: 'Audi' },
  { value: 'hyundai', label: 'Hyundai' },
  { value: 'kia', label: 'Kia' },
  { value: 'nissan', label: 'Nissan' },
  { value: 'mazda', label: 'Mazda' },
  { value: 'honda', label: 'Honda' },
  { value: 'ford', label: 'Ford' },
  { value: 'chevrolet', label: 'Chevrolet' },
  { value: 'skoda', label: 'Skoda' },
  { value: 'renault', label: 'Renault' },
  { value: 'lada', label: 'LADA' },
] as const;
