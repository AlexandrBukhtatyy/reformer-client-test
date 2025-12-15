# План: Многошаговая форма заявки на страхование

## Обзор

Создание 6-шаговой формы страхования на основе спецификации `spec/insurance-application-form.md` с использованием `@reformer/ui` (FormNavigation, FormArray) и `@reformer/core`.

## Ключевые технологии

- **@reformer/core**: `createForm`, `useFormControl`, `useFormControlValue`, валидаторы, behaviors
- **@reformer/ui/form-navigation**: `FormNavigation`, `FormNavigationStep`, `useFormNavigation`
- **@reformer/ui/form-array**: `FormArray`, `FormArrayList`, `useFormArray`
- **TailwindCSS**: Стилизация

> **Примечание**: В требованиях указан `useStepForm`, но в `@reformer/ui` хук называется `useFormNavigation`

---

## Структура файлов (согласно рекомендации ReFormer)

```
src/forms/insurance-application/
├── type.ts                           # Главный тип формы (объединяет все шаги)
├── schema.ts                         # Главная схема формы (объединяет схемы шагов)
├── validators.ts                     # Полная валидация (объединяет валидации шагов)
├── behaviors.ts                      # Главные behaviors (cross-step computations)
├── constants.ts                      # Константы (опции для select, коэффициенты)
├── InsuranceApplicationForm.tsx      # Главный компонент с FormNavigation
│
├── steps/
│   ├── insurance-type/               # Шаг 1: Тип страхования
│   │   ├── type.ts                   # Тип шага
│   │   ├── schema.ts                 # Схема шага
│   │   ├── validators.ts             # Валидация шага
│   │   ├── behaviors.ts              # Behaviors шага (endDate = startDate + period)
│   │   └── InsuranceTypeStep.tsx     # Компонент шага
│   │
│   ├── insured-party/                # Шаг 2: Данные страхователя
│   │   ├── type.ts
│   │   ├── schema.ts
│   │   ├── validators.ts
│   │   ├── behaviors.ts              # fullName, age computations
│   │   └── InsuredPartyStep.tsx
│   │
│   ├── insurance-object/             # Шаг 3: Объект страхования
│   │   ├── type.ts
│   │   ├── schema.ts
│   │   ├── validators.ts
│   │   ├── behaviors.ts              # BMI, tripDuration computations
│   │   └── InsuranceObjectStep.tsx
│   │
│   ├── drivers-beneficiaries/        # Шаг 4: Водители/Выгодоприобретатели
│   │   ├── type.ts
│   │   ├── schema.ts
│   │   ├── validators.ts             # validateItems, totalShare = 100%
│   │   ├── behaviors.ts              # experience, minAge, minExperience
│   │   └── DriversBeneficiariesStep.tsx
│   │
│   ├── history/                      # Шаг 5: История и доп. информация
│   │   ├── type.ts
│   │   ├── schema.ts
│   │   ├── validators.ts
│   │   ├── behaviors.ts
│   │   └── HistoryStep.tsx
│   │
│   └── confirmation/                 # Шаг 6: Расчёт и подтверждение
│       ├── type.ts
│       ├── schema.ts
│       ├── validators.ts
│       ├── behaviors.ts              # Premium calculations
│       └── ConfirmationStep.tsx
│
└── sub-forms/                        # Переиспользуемые подформы
    ├── vehicle/                      # Подформа для авто (CASCO/OSAGO)
    │   ├── type.ts
    │   ├── schema.ts
    │   ├── validators.ts
    │   └── VehicleFields.tsx
    │
    ├── property/                     # Подформа для недвижимости
    │   ├── type.ts
    │   ├── schema.ts
    │   ├── validators.ts
    │   └── PropertyFields.tsx
    │
    ├── life-health/                  # Подформа для жизни/здоровья
    │   ├── type.ts
    │   ├── schema.ts
    │   ├── validators.ts
    │   ├── behaviors.ts              # BMI computation
    │   └── LifeHealthFields.tsx
    │
    ├── travel/                       # Подформа для путешествий
    │   ├── type.ts
    │   ├── schema.ts
    │   ├── validators.ts
    │   ├── behaviors.ts              # tripDuration computation
    │   └── TravelFields.tsx
    │
    ├── driver/                       # Подформа водителя (для массива)
    │   ├── type.ts
    │   ├── schema.ts
    │   ├── validators.ts
    │   ├── behaviors.ts              # experience computation
    │   └── DriverItem.tsx
    │
    ├── beneficiary/                  # Подформа выгодоприобретателя
    │   ├── type.ts
    │   ├── schema.ts
    │   ├── validators.ts
    │   └── BeneficiaryItem.tsx
    │
    ├── traveler/                     # Подформа путешественника
    │   ├── type.ts
    │   ├── schema.ts
    │   ├── validators.ts
    │   └── TravelerItem.tsx
    │
    └── claim/                        # Подформа страхового случая
        ├── type.ts
        ├── schema.ts
        ├── validators.ts
        └── ClaimItem.tsx
```

---

## Шаги реализации

### 1. Создать структуру типов (`type.ts`)

```typescript
// Типы страхования
type InsuranceType = 'casco' | 'osago' | 'property' | 'life' | 'travel';
type InsuredType = 'individual' | 'company';
type PaymentType = 'single' | 'installments';

// Главный тип формы
interface InsuranceApplicationForm {
  // Step 1
  insuranceType: InsuranceType;
  insurancePeriod: number;
  startDate: string;
  endDate: string; // computed
  coverageAmount: number;
  deductible: number | undefined;
  paymentType: PaymentType;
  installmentCount: number | undefined;

  // Step 2
  insuredType: InsuredType;
  individual: IndividualData;
  company: CompanyData;
  contact: ContactData;
  fullName: string; // computed
  age: number | undefined; // computed

  // Step 3 - conditional по типу страхования
  vehicle: VehicleData;
  property: PropertyData;
  lifeHealth: LifeHealthData;
  travel: TravelData;

  // Step 4
  drivers: DriverData[];
  unlimitedDrivers: boolean;
  minDriverAge: number | undefined; // computed
  minDriverExperience: number | undefined; // computed
  beneficiaries: BeneficiaryData[];
  totalBeneficiaryShare: number; // computed, должен быть 100%

  // Step 5
  hasPreviousInsurance: boolean;
  previousInsurer: string;
  previousPolicyNumber: string;
  previousPolicyEndDate: string;
  hasClaimsHistory: boolean;
  claims: ClaimData[];
  promoCode: string;
  referralSource: string;
  agentCode: string;
  additionalNotes: string;

  // Step 6
  basePremium: number; // computed
  ageCoefficient: number; // computed
  experienceCoefficient: number; // computed
  regionalCoefficient: number; // computed
  kbmCoefficient: number; // computed
  deductibleDiscount: number; // computed
  promoDiscount: number; // computed
  multiPolicyDiscount: number; // computed
  totalPremium: number; // computed
  installmentAmount: number | undefined; // computed

  agreePersonalData: boolean;
  agreeInsuranceTerms: boolean;
  agreeElectronicPolicy: boolean;
  agreeMarketing: boolean;
  confirmDataAccuracy: boolean;
  smsVerificationCode: string;
}
```

### 2. Создать константы (`constants.ts`)

- Опции для всех select полей
- Коэффициенты для расчёта премии
- Маски для полей ввода

### 3. Создать схему формы (`schema.ts`)

- Определить начальные значения для каждого поля
- Указать компоненты (Input, Select, Checkbox, InputMask)
- Настроить componentProps (label, placeholder, options)
- Определить массивы (drivers, beneficiaries, travelers, claims)

### 4. Создать behaviors (`behaviors.ts`)

**Вычисляемые поля:**
- `endDate` = startDate + insurancePeriod
- `fullName` = lastName + firstName + middleName
- `age` = today - birthDate
- `experience` = today - licenseIssueDate
- `bmi` = weight / (height/100)²
- `tripDuration` = returnDate - departureDate
- `minDriverAge` = min(drivers.map(d => d.age))
- `minDriverExperience` = min(drivers.map(d => d.experience))
- `totalBeneficiaryShare` = sum(beneficiaries.map(b => b.share))
- `totalPremium` = basePremium * coefficients - discounts
- `installmentAmount` = totalPremium / installmentCount * 1.05

**Условная видимость (enableWhen):**
- `deductible` → показывать если insuranceType !== 'osago'
- `installmentCount` → показывать если paymentType === 'installments'
- `individual.*` → показывать если insuredType === 'individual'
- `company.*` → показывать если insuredType === 'company'
- `vehicle.*` → показывать если insuranceType in ['casco', 'osago']
- `property.*` → показывать если insuranceType === 'property'
- `lifeHealth.*` → показывать если insuranceType === 'life'
- `travel.*` → показывать если insuranceType === 'travel'
- `drivers` → показывать если insuranceType in ['casco', 'osago']
- `beneficiaries` → показывать если insuranceType === 'life'
- `antiTheftBrand` → показывать если hasAntiTheft === true
- `smokingYears` → показывать если isSmoker === true
- И т.д.

### 5. Создать валидации для каждого шага

**steps/insurance-type/validators.ts:**
```typescript
import type { ValidationSchemaFn } from '@reformer/core';
import { required, min, max, applyWhen } from '@reformer/core/validators';
import type { InsuranceTypeStep } from './type';

export const insuranceTypeValidation: ValidationSchemaFn<InsuranceTypeStep> = (path) => {
  required(path.insuranceType, { message: 'Выберите тип страхования' });
  required(path.insurancePeriod, { message: 'Укажите срок страхования' });
  min(path.insurancePeriod, 3, { message: 'Минимальный срок 3 месяца' });
  max(path.insurancePeriod, 36, { message: 'Максимальный срок 36 месяцев' });
  required(path.startDate, { message: 'Укажите дату начала' });
  required(path.coverageAmount, { message: 'Укажите страховую сумму' });
  min(path.coverageAmount, 100000, { message: 'Минимум 100 000 ₽' });
  max(path.coverageAmount, 50000000, { message: 'Максимум 50 000 000 ₽' });
  required(path.paymentType, { message: 'Выберите тип оплаты' });

  applyWhen(
    path.paymentType,
    (type) => type === 'installments',
    (p) => required(p.installmentCount, { message: 'Выберите кол-во платежей' })
  );
};
```

**Корневой validators.ts (объединение):**
```typescript
import type { ValidationSchemaFn } from '@reformer/core';
import type { InsuranceApplicationForm } from './type';
import { insuranceTypeValidation } from './steps/insurance-type/validators';
import { insuredPartyValidation } from './steps/insured-party/validators';
import { insuranceObjectValidation } from './steps/insurance-object/validators';
import { driversBeneficiariesValidation } from './steps/drivers-beneficiaries/validators';
import { historyValidation } from './steps/history/validators';
import { confirmationValidation } from './steps/confirmation/validators';

// Map для FormNavigation config
export const STEP_VALIDATIONS: Record<number, ValidationSchemaFn<InsuranceApplicationForm>> = {
  1: insuranceTypeValidation,
  2: insuredPartyValidation,
  3: insuranceObjectValidation,
  4: driversBeneficiariesValidation,
  5: historyValidation,
  6: confirmationValidation,
};

// Полная валидация для submit
export const fullValidation: ValidationSchemaFn<InsuranceApplicationForm> = (path) => {
  insuranceTypeValidation(path);
  insuredPartyValidation(path);
  insuranceObjectValidation(path);
  driversBeneficiariesValidation(path);
  historyValidation(path);
  confirmationValidation(path);
};
```

### 6. Создать компоненты шагов

**steps/insurance-type/InsuranceTypeStep.tsx:**
```tsx
import { useFormControlValue } from '@reformer/core';
import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import type { InsuranceApplicationForm } from '../../type';

interface InsuranceTypeStepProps {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function InsuranceTypeStep({ control }: InsuranceTypeStepProps) {
  const paymentType = useFormControlValue(control.paymentType);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Тип страхования и параметры</h2>

      <FormField control={control.insuranceType} />
      <FormField control={control.insurancePeriod} />
      <FormField control={control.startDate} />
      <FormField control={control.endDate} /> {/* disabled, computed */}
      <FormField control={control.coverageAmount} />
      <FormField control={control.deductible} />
      <FormField control={control.paymentType} />

      {paymentType === 'installments' && (
        <FormField control={control.installmentCount} />
      )}
    </div>
  );
}
```

**steps/insurance-object/InsuranceObjectStep.tsx:**
```tsx
import { useFormControlValue } from '@reformer/core';
import type { GroupNodeWithControls } from '@reformer/core';
import { VehicleFields } from '../../sub-forms/vehicle/VehicleFields';
import { PropertyFields } from '../../sub-forms/property/PropertyFields';
import { LifeHealthFields } from '../../sub-forms/life-health/LifeHealthFields';
import { TravelFields } from '../../sub-forms/travel/TravelFields';
import type { InsuranceApplicationForm } from '../../type';

interface InsuranceObjectStepProps {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function InsuranceObjectStep({ control }: InsuranceObjectStepProps) {
  const insuranceType = useFormControlValue(control.insuranceType);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Объект страхования</h2>

      {(insuranceType === 'casco' || insuranceType === 'osago') && (
        <VehicleFields control={control.vehicle} insuranceType={insuranceType} />
      )}

      {insuranceType === 'property' && (
        <PropertyFields control={control.property} />
      )}

      {insuranceType === 'life' && (
        <LifeHealthFields control={control.lifeHealth} />
      )}

      {insuranceType === 'travel' && (
        <TravelFields control={control.travel} />
      )}
    </div>
  );
}
```

**steps/drivers-beneficiaries/DriversBeneficiariesStep.tsx:**
```tsx
import { useFormControlValue } from '@reformer/core';
import type { GroupNodeWithControls } from '@reformer/core';
import { FormArray, FormArrayList, FormArrayAddButton, FormArrayEmpty } from '@reformer/ui/form-array';
import { FormField } from '@/components/ui/FormField';
import { DriverItem } from '../../sub-forms/driver/DriverItem';
import { BeneficiaryItem } from '../../sub-forms/beneficiary/BeneficiaryItem';
import type { InsuranceApplicationForm } from '../../type';

interface DriversBeneficiariesStepProps {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function DriversBeneficiariesStep({ control }: DriversBeneficiariesStepProps) {
  const insuranceType = useFormControlValue(control.insuranceType);

  return (
    <div className="space-y-6">
      {(insuranceType === 'casco' || insuranceType === 'osago') && (
        <>
          <h2 className="text-xl font-semibold">Водители</h2>
          <FormField control={control.unlimitedDrivers} />

          <FormArray control={control.drivers}>
            <FormArrayList>
              {({ control: driverControl, remove, index }) => (
                <DriverItem control={driverControl} onRemove={remove} index={index} />
              )}
            </FormArrayList>
            <FormArrayAddButton>Добавить водителя</FormArrayAddButton>
            <FormArrayEmpty>Нет добавленных водителей</FormArrayEmpty>
          </FormArray>
        </>
      )}

      {insuranceType === 'life' && (
        <>
          <h2 className="text-xl font-semibold">Выгодоприобретатели</h2>
          <FormArray control={control.beneficiaries}>
            <FormArrayList>
              {({ control: beneficiaryControl, remove, index }) => (
                <BeneficiaryItem control={beneficiaryControl} onRemove={remove} index={index} />
              )}
            </FormArrayList>
            <FormArrayAddButton>Добавить выгодоприобретателя</FormArrayAddButton>
          </FormArray>
          {/* Показать сумму долей */}
        </>
      )}
    </div>
  );
}
```

### 7. Создать главный компонент формы (`InsuranceApplicationForm.tsx`)

```tsx
import { useRef } from 'react';
import { createForm } from '@reformer/core';
import type { FormNavigationHandle, FormNavigationConfig } from '@reformer/ui/form-navigation';
import { FormNavigation, FormNavigationStep, FormNavigationIndicator, FormNavigationActions, FormNavigationProgress } from '@reformer/ui/form-navigation';

import type { InsuranceApplicationForm as IInsuranceApplicationForm } from './type';
import { insuranceApplicationSchema } from './schema';
import { insuranceApplicationBehaviors } from './behaviors';
import { STEP_VALIDATIONS, fullValidation } from './validators';

import { InsuranceTypeStep } from './steps/insurance-type/InsuranceTypeStep';
import { InsuredPartyStep } from './steps/insured-party/InsuredPartyStep';
import { InsuranceObjectStep } from './steps/insurance-object/InsuranceObjectStep';
import { DriversBeneficiariesStep } from './steps/drivers-beneficiaries/DriversBeneficiariesStep';
import { HistoryStep } from './steps/history/HistoryStep';
import { ConfirmationStep } from './steps/confirmation/ConfirmationStep';

// Создаём форму ВНЕ компонента (singleton)
const form = createForm<IInsuranceApplicationForm>({
  form: insuranceApplicationSchema,
  behavior: insuranceApplicationBehaviors,
  validation: fullValidation,
});

// Конфиг для FormNavigation
const config: FormNavigationConfig<IInsuranceApplicationForm> = {
  stepValidations: STEP_VALIDATIONS,
  fullValidation,
};

export function InsuranceApplicationForm() {
  const navRef = useRef<FormNavigationHandle<IInsuranceApplicationForm>>(null);

  const handleSubmit = async (values: IInsuranceApplicationForm) => {
    // POST /api/insurance/applications
    console.log('Submit:', values);
  };

  return (
    <FormNavigation ref={navRef} form={form} config={config}>
      <FormNavigationIndicator />

      <FormNavigationStep component={InsuranceTypeStep} control={form} />
      <FormNavigationStep component={InsuredPartyStep} control={form} />
      <FormNavigationStep component={InsuranceObjectStep} control={form} />
      <FormNavigationStep component={DriversBeneficiariesStep} control={form} />
      <FormNavigationStep component={HistoryStep} control={form} />
      <FormNavigationStep component={ConfirmationStep} control={form} />

      <FormNavigationActions onSubmit={handleSubmit} />
      <FormNavigationProgress />
    </FormNavigation>
  );
}
```

### 8. Интегрировать в App.tsx

```tsx
import { InsuranceApplicationForm } from './forms/insurance-application/InsuranceApplicationForm';

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center py-6">
      <div className="w-full max-w-4xl px-4">
        <h1 className="text-2xl font-bold mb-6">Заявка на страхование</h1>
        <InsuranceApplicationForm />
      </div>
    </div>
  );
}
```

---

## Порядок выполнения

### Этап 1: Базовая структура
1. [ ] Создать структуру папок согласно рекомендации
2. [ ] Создать `constants.ts` с опциями для select и коэффициентами

### Этап 2: Sub-forms (подформы)
3. [ ] Создать sub-forms/vehicle/ (type, schema, validators, VehicleFields.tsx)
4. [ ] Создать sub-forms/property/ (type, schema, validators, PropertyFields.tsx)
5. [ ] Создать sub-forms/life-health/ (type, schema, validators, behaviors, LifeHealthFields.tsx)
6. [ ] Создать sub-forms/travel/ (type, schema, validators, behaviors, TravelFields.tsx)
7. [ ] Создать sub-forms/driver/ (type, schema, validators, behaviors, DriverItem.tsx)
8. [ ] Создать sub-forms/beneficiary/ (type, schema, validators, BeneficiaryItem.tsx)
9. [ ] Создать sub-forms/traveler/ (type, schema, validators, TravelerItem.tsx)
10. [ ] Создать sub-forms/claim/ (type, schema, validators, ClaimItem.tsx)

### Этап 3: Steps (шаги)
11. [ ] Создать steps/insurance-type/ (type, schema, validators, behaviors, InsuranceTypeStep.tsx)
12. [ ] Создать steps/insured-party/ (type, schema, validators, behaviors, InsuredPartyStep.tsx)
13. [ ] Создать steps/insurance-object/ (type, schema, validators, behaviors, InsuranceObjectStep.tsx)
14. [ ] Создать steps/drivers-beneficiaries/ (type, schema, validators, behaviors, DriversBeneficiariesStep.tsx)
15. [ ] Создать steps/history/ (type, schema, validators, behaviors, HistoryStep.tsx)
16. [ ] Создать steps/confirmation/ (type, schema, validators, behaviors, ConfirmationStep.tsx)

### Этап 4: Главная форма
17. [ ] Создать корневой type.ts (объединение типов шагов)
18. [ ] Создать корневой schema.ts (объединение схем шагов)
19. [ ] Создать корневой validators.ts (объединение валидаций + cross-step)
20. [ ] Создать корневой behaviors.ts (cross-step behaviors)
21. [ ] Создать InsuranceApplicationForm.tsx с FormNavigation

### Этап 5: Интеграция
22. [ ] Интегрировать в App.tsx
23. [ ] Проверить работу формы

---

## Критические файлы

| Файл | Описание |
|------|----------|
| `src/forms/insurance-application/type.ts` | Главный тип (объединяет типы шагов) |
| `src/forms/insurance-application/schema.ts` | Главная схема (объединяет схемы шагов) |
| `src/forms/insurance-application/validators.ts` | Полная валидация + STEP_VALIDATIONS map |
| `src/forms/insurance-application/behaviors.ts` | Cross-step behaviors |
| `src/forms/insurance-application/constants.ts` | Опции, коэффициенты, маски |
| `src/forms/insurance-application/InsuranceApplicationForm.tsx` | Главный компонент с FormNavigation |
| `src/forms/insurance-application/steps/*/` | 6 папок шагов (type, schema, validators, behaviors, Component) |
| `src/forms/insurance-application/sub-forms/*/` | 8 папок подформ |
| `src/components/ui/FormField.tsx` | Существующий компонент поля |

---

## Примечания

- Использовать `useFormControlValue` (НЕ деструктурировать!) для условного рендеринга
- Использовать `applyWhen` для условной валидации (3 аргумента!)
- Использовать `watchField` для cross-level computed fields
- Массивы определять в схеме как `[itemSchema]` (tuple format)
- Передавать форму через props, НЕ через context
