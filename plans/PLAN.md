# План разработки формы заявки на страхование

## Обзор задачи

Необходимо создать форму заявки на страхование на основе спецификации `spec/insurance-application-form.md`. Форма должна быть пошаговой (6 шагов) и использовать библиотеку `@reformer/ui` для создания пошаговых форм и массивов форм.

## Технические требования

1. Использовать `@reformer/ui` для:

   - создания пошаговых форм (form-navigation)
   - создания массивов форм (form-array)

2. Использовать MCP сервер reformer для:

   - получения документации (reformer://docs и reformer://api)
   - примеров кода (reformer://examples)
   - решения возникших проблем (reformer://troubleshooting)
   - регистрации проблем возникших при работе (report_issue)
   - структура кода (reformer://docs)

3. Форма должна:

   - Быть пошаговой (6 шагов)
   - Иметь отдельные файлы валидации для каждого шага
   - Использовать useStepForm для навигации
   - Поддерживать вычисляемые поля (endDate, age, experience)
   - Иметь условную видимость полей
   - Использовать TailwindCSS для верстки формы (установленной версии)

4. Обязательно: Фиксация всех правок
   - После первоначальной генерации формы, КАЖДЫЙ РАЗ когда вносишь исправления или доработки - вызывай `report_issue`

## Структура формы

Форма будет состоять из 6 шагов:

### Шаг 1: Тип страхования и основные параметры

- Тип страхования (КАСКО, ОСАГО, Недвижимость, Жизнь и здоровье, Путешествия)
- Срок страхования
- Дата начала действия полиса
- Вычисляемая дата окончания
- Страховая сумма
- Франшиза
- Способ оплаты
- Количество платежей (если рассрочка)

### Шаг 2: Данные страхователя

- Тип страхователя (физическое или юридическое лицо)
- Персональные данные (ФИО, дата рождения, пол)
- Компания (для юридических лиц)
- Паспортные данные
- Контактная информация
- Вычисляемые поля (ФИО, возраст)

### Шаг 3: Объект страхования

- В зависимости от типа страхования:
  - Транспорт (VIN, марка, модель, год, и т.д.)
  - Недвижимость (тип, адрес, характеристики)
  - Жизнь и здоровье (рост, вес, BMI, привычки)
  - Путешествия (назначение, даты, покрытие)

### Шаг 4: Водители и застрахованные лица

- Водители (для КАСКО/ОСАГО)
- Выгодоприобретатели (для страхования жизни)
- Вычисляемые поля (минимальный возраст/стаж водителя, сумма долей)

### Шаг 5: История и дополнительная информация

- Предыдущий полис
- Страховые случаи
- Промокод
- Дополнительные комментарии

### Шаг 6: Расчет и подтверждение

- Расчет стоимости полиса
- Согласия и подтверждения
- SMS-код подтверждения

## Подробный план реализации

### Этап 1: Подготовка и анализ

- [x] Изучение спецификации `spec/insurance-application-form.md`
- [x] Изучение требований в `PROMT.md`
- [x] Анализ структуры проекта
- [x] Получение документации по @reformer/ui через MCP сервер
- [x] Определение структуры компонентов формы
- [x] Определение схем валидации для каждого шага
- [x] Определение вычисляемых полей и их зависимостей
- [x] Определение условной логики отображения полей
- [x] Проектирование навигации между шагами

### Этап 2: Создание схем валидации

#### Шаг 1: Тип страхования и основные параметры

- [ ] Создание интерфейса данных для шага 1
- [ ] Создание схемы формы для шага 1
- [ ] Создание схемы валидации для шага 1
- [ ] Создание компонента формы для шага 1

#### Шаг 2: Данные страхователя

- [ ] Создание интерфейса данных для шага 2
- [ ] Создание схемы формы для шага 2
- [ ] Создание схемы валидации для шага 2
- [ ] Создание компонента формы для шага 2

#### Шаг 3: Объект страхования

- [ ] Создание интерфейса данных для шага 3
- [ ] Создание схемы формы для шага 3
- [ ] Создание схемы валидации для шага 3
- [ ] Создание компонента формы для шага 3

#### Шаг 4: Водители и застрахованные лица

- [ ] Создание интерфейса данных для шага 4
- [ ] Создание схемы формы для шага 4
- [ ] Создание схемы валидации для шага 4
- [ ] Создание компонента формы для шага 4

#### Шаг 5: История и дополнительная информация

- [ ] Создание интерфейса данных для шага 5
- [ ] Создание схемы формы для шага 5
- [ ] Создание схемы валидации для шага 5
- [ ] Создание компонента формы для шага 5

#### Шаг 6: Расчет и подтверждение

- [ ] Создание интерфейса данных для шага 6
- [ ] Создание схемы формы для шага 6
- [ ] Создание схемы валидации для шага 6
- [ ] Создание компонента формы для шага 6

### Этап 3: Реализация основной формы

- [ ] Создание общего интерфейса формы
- [ ] Создание общей схемы формы
- [ ] Создание компонента навигации между шагами
- [ ] Реализация логики переключения шагов
- [ ] Создание компонента прогресс-бара

### Этап 4: Реализация специфичных функций

- [ ] Реализация вычисляемых полей
- [ ] Реализация условной логики отображения полей
- [ ] Реализация массивов форм (водители, выгодоприобретатели и т.д.)
- [ ] Реализация динамических селектов (модели автомобилей)

### Этап 5: Интеграция с API

- [ ] Создание mock-функций для API
- [ ] Интеграция с расчетом стоимости полиса
- [ ] Интеграция с валидацией промокода
- [ ] Интеграция с отправкой формы

### Этап 6: Тестирование и отладка

- [ ] Тестирование навигации между шагами
- [ ] Тестирование валидации
- [ ] Тестирование вычисляемых полей
- [ ] Тестирование условной логики
- [ ] Исправление выявленных проблем

## Архитектурные решения

### Используемые библиотеки

- `@reformer/core` - для управления формой и валидацией
- `@reformer/ui` - для компонентов формы
- `react` - для построения интерфейса
- `tailwindcss` - для стилизации

### Структура файлов

```
src/
├── forms/
│   └── insurance-application/
│       ├── type.ts (общий интерфейс формы)
│       ├── schema.ts (общая схема формы)
│       ├── validators.ts (валидаторы для всей формы)
│       ├── behaviors.ts (поведения для всей формы)
│       ├── api.ts (mock API функции)
│       ├── InsuranceApplicationForm.tsx (основной компонент формы)
│       ├── FormNavigation.tsx (навигация между шагами)
│       ├── ProgressBar.tsx (прогресс-бар)
│       ├── steps/
│       │   ├── Step1.tsx (Тип страхования)
│       │   ├── Step2.tsx (Данные страхователя)
│       │   ├── Step3.tsx (Объект страхования)
│       │   ├── Step4.tsx (Водители/Выгодоприобретатели)
│       │   ├── Step5.tsx (История)
│       │   └── Step6.tsx (Расчет и подтверждение)
│       ├── steps/
│       │   ├── step1/
│       │   │   ├── type.ts
│       │   │   ├── schema.ts
│       │   │   ├── validators.ts
│       │   │   └── Step1Form.tsx
│       │   ├── step2/
│       │   │   ├── type.ts
│       │   │   ├── schema.ts
│       │   │   ├── validators.ts
│       │   │   └── Step2Form.tsx
│       │   ├── step3/
│       │   │   ├── type.ts
│       │   │   ├── schema.ts
│       │   │   ├── validators.ts
│       │   │   └── Step3Form.tsx
│       │   ├── step4/
│       │   │   ├── type.ts
│       │   │   ├── schema.ts
│       │   │   ├── validators.ts
│       │   │   └── Step4Form.tsx
│       │   ├── step5/
│       │   │   ├── type.ts
│       │   │   ├── schema.ts
│       │   │   ├── validators.ts
│       │   │   └── Step5Form.tsx
│       │   └── step6/
│       │       ├── type.ts
│       │       ├── schema.ts
│       │       ├── validators.ts
│       │       └── Step6Form.tsx
│       └── components/
│           ├── CalculatedField.tsx
│           ├── ConditionalField.tsx
│           └── FormArrayManager.tsx
```

## Определение интерфейсов для каждого шага

### Шаг 1: Тип страхования и основные параметры

```typescript
interface Step1Data {
  insuranceType: "casco" | "osago" | "property" | "life" | "travel";
  insurancePeriod: 3 | 6 | 12 | 24 | 36;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD (computed)
  coverageAmount: number | undefined;
  deductible: number | undefined;
  paymentType: "single" | "installments";
  installments: 2 | 3 | 4 | 6 | 12 | undefined;
}
```

### Шаг 2: Данные страхователя

```typescript
interface PersonalData {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string; // YYYY-MM-DD
  gender: "male" | "female";
}

interface CompanyData {
  name: string;
  inn: string;
  ogrn: string;
  kpp: string;
  ceoName: string;
}

interface PassportData {
  series: string;
  number: string;
  issueDate: string; // YYYY-MM-DD
  issuedBy: string;
}

interface Step2Data {
  insuredType: "individual" | "company";
  personalData: PersonalData;
  companyData: CompanyData;
  passportData: PassportData;
  phone: string;
  email: string;
  fullName: string; // computed
  age: number | undefined; // computed
}
```

### Шаг 3: Объект страхования (транспорт)

```typescript
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
```

### Шаг 3: Объект страхования (недвижимость)

```typescript
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
```

### Шаг 3: Объект страхования (жизнь и здоровье)

```typescript
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
```

### Шаг 3: Объект страхования (путешествия)

```typescript
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
```

### Шаг 4: Водители и застрахованные лица

```typescript
interface Driver {
  fullName: string;
  birthDate: string; // YYYY-MM-DD
  licenseNumber: string;
  licenseIssueDate: string; // YYYY-MM-DD
  drivingExperience: number | undefined; // computed
  accidentsCount: number;
  isMainDriver: boolean;
}

interface Beneficiary {
  fullName: string;
  birthDate: string; // YYYY-MM-DD
  relationship: "spouse" | "child" | "parent" | "sibling" | "other";
  share: number | undefined;
  phone: string;
}
```

### Шаг 5: История и дополнительная информация

```typescript
interface Claim {
  date: string; // YYYY-MM-DD
  type: "accident" | "theft" | "damage" | "disaster" | "medical" | "other";
  description: string;
  amount: number | undefined;
  atFault: boolean;
}

interface Step5Data {
  hasPreviousInsurance: boolean;
  previousInsurer: string;
  previousPolicyNumber: string;
  previousPolicyEndDate: string; // YYYY-MM-DD
  hadClaims: boolean;
  claims: Claim[];
  promoCode: string;
  referralSource: "internet" | "friend" | "tv" | "agent" | "other";
  agentCode: string;
  additionalNotes: string;
}
```

### Шаг 6: Расчет и подтверждение

```typescript
interface Step6Data {
  // Расчетные поля
  basePremium: number | undefined; // computed
  ageCoefficient: number | undefined; // computed
  experienceCoefficient: number | undefined; // computed
  regionCoefficient: number | undefined; // computed
  claimsCoefficient: number | undefined; // computed
  deductibleDiscount: number | undefined; // computed
  promoDiscount: number | undefined; // computed
  multiPolicyDiscount: number | undefined; // computed
  totalPremium: number | undefined; // computed
  installmentAmount: number | undefined; // computed

  // Согласия
  agreePersonalData: boolean;
  agreeTerms: boolean;
  agreeElectronicPolicy: boolean;
  agreeMarketing: boolean;
  confirmAccuracy: boolean;

  // Подтверждение
  electronicSignature: string;
}
```

## Вычисляемые поля и их зависимости

### Дата окончания полиса

- Зависимости: startDate, insurancePeriod
- Формула: startDate + insurancePeriod месяцев

### Полное имя (ФИО)

- Зависимости: personalData.lastName, firstName, middleName
- Формула: Конкатенация: Фамилия Имя Отчество

### Возраст

- Зависимости: personalData.birthDate
- Формула: Разница между текущей датой и датой рождения

### Индекс массы тела (BMI)

- Зависимости: health.height, health.weight
- Формула: weight / (height / 100)²
- Только для страхования жизни

### Длительность поездки

- Зависимости: travel.departureDate, travel.returnDate
- Формула: Разница в днях между датами
- Только для путешествий

### Стаж вождения

- Зависимости: drivers[].licenseIssueDate
- Формула: Разница между текущей датой и датой выдачи ВУ
- Для каждого водителя

### Минимальный возраст водителя

- Зависимости: drivers[].birthDate
- Формула: Math.min(...drivers.map(d => calculateAge(d.birthDate)))

### Минимальный стаж водителя

- Зависимости: drivers[].drivingExperience
- Формула: Math.min(...drivers.map(d => d.drivingExperience))

### Сумма долей выгодоприобретателей

- Зависимости: beneficiaries[].share
- Формула: sum(beneficiaries.map(b => b.share))
- Должна быть равна 100%

### Базовая премия

- Зависимости: insuranceType, coverageAmount
- Формула: calculateBasePremium(insuranceType, coverageAmount)

### Итоговая премия

- Зависимости: basePremium, все коэффициенты и скидки
- Формула: basePremium _ коэффициенты _ (1 - скидки)

### Сумма платежа

- Зависимости: totalPremium, installments, paymentType
- Формула: paymentType='installments' ? totalPremium / installments \* 1.05 : totalPremium

## Условная логика отображения полей

### Зависимость от типа страхования

- При insuranceType in ['casco', 'osago'] → показывать поля транспорта
- При insuranceType='property' → показывать поля недвижимости
- При insuranceType='life' → показывать поля жизни и здоровья
- При insuranceType='travel' → показывать поля путешествий

### Зависимость от типа страхователя

- При insuredType='individual' → показывать поля персональных данных и паспорта
- При insuredType='company' → показывать поля компании

### Зависимость от способа оплаты

- При paymentType='installments' → показывать выбор количества платежей

### Зависимость от других полей

- При hasAntiTheft=true → показывать поле марки противоугонки
- При isSmoker=true → показывать поле стажа курения
- При hasChronicDiseases=true → показывать описание заболеваний
- При hadSurgeries=true → показывать описание операций
- При practicesSports=true → показывать чекбокс экстремальных видов
- При type='apartment' → показывать поле этажа
- При hasPreviousInsurance=true → показывать поля предыдущего полиса
- При hadClaims=true → показывать список страховых случаев

## Риски и возможные проблемы

1. Сложность условной логики отображения полей
2. Сложность с вычисляемыми полями и их зависимостями
3. Валидация массивов форм
4. Синхронизация состояния между шагами
5. Обработка ошибок и показ сообщений пользователю
6. Асинхронная загрузка данных (например, модели автомобилей)
7. Сложная кросс-валидация (например, сумма долей = 100%)

## Критерии успеха

- Форма успешно проходит все сценарии использования, описанные в спецификации
- Все 6 шагов функционируют корректно
- Валидация работает на каждом шаге
- Вычисляемые поля обновляются в реальном времени
- Условная логика отображения полей работает корректно
- Форма может быть отправлена с корректными данными

## Используемые паттерны

1. **Colocation** - размещение связанных файлов рядом друг с другом
2. **Type-first development** - сначала определяются типы, затем реализация
3. **Composition over inheritance** - использование композиции компонентов
4. **Reactive state management** - использование сигналов для управления состоянием
5. **Separation of concerns** - разделение логики валидации, поведения и отображения

## Важные замечания по реализации

1. Все поля формы должны соответствовать спецификации `FieldConfig<T>` из @reformer/core
2. Каждое поле должно иметь `value` и `component` свойства
3. Использовать `useFormControl` для получения состояния поля
4. Использовать `useFormControlValue` для получения значения поля без дополнительной информации
5. Для вычисляемых полей использовать `watchField` или `computeFrom` из @reformer/core/behaviors
6. Для условной логики использовать `enableWhen`/`disableWhen` из @reformer/core/behaviors
7. Для массивов использовать `ArrayNode` с шаблоном элемента
8. Все валидации должны быть реализованы с использованием валидаторов из @reformer/core/validators
