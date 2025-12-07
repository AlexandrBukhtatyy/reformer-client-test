# Plan: Multi-step Credit Application Form

## Overview
Создание 6-шаговой формы заявки на кредит с использованием @reformer/core и существующих UI компонентов.

## Key Constraints (из LLMs.txt)
- Типы (`ValidationSchemaFn`, `BehaviorSchemaFn`, `FieldNode`, etc.) импортируются из `@reformer/core`
- Валидаторы (`required`, `min`, etc.) импортируются из `@reformer/core/validators`
- Behaviors (`enableWhen`, `computeFrom`, etc.) импортируются из `@reformer/core/behaviors`
- Опциональные числа: `number | undefined` (НЕ null)
- Формат валидаторов: `required(path, { message: 'text' })` не `required(path, 'text')`
- Вычисления между уровнями: использовать `watchField`, не `computeFrom`

## File Structure

```
src/features/credit-application/
├── index.ts
├── CreditApplicationForm.tsx          # Главный контейнер формы
├── model/
│   ├── types.ts                        # Типы данных
│   ├── schema.ts                       # Схема формы
│   ├── validation.ts                   # Валидация по шагам + полная
│   ├── behavior.ts                     # Вычисляемые поля, условная логика
│   └── constants.ts                    # Опции для selects/radios
├── steps/
│   ├── Step1LoanInfo.tsx
│   ├── Step2PersonalData.tsx
│   ├── Step3ContactInfo.tsx
│   ├── Step4Employment.tsx
│   ├── Step5AdditionalInfo.tsx
│   └── Step6Confirmation.tsx
├── sub-forms/                          # Переиспользуемые под-формы
│   ├── AddressSubForm.tsx              # Группа полей адреса
│   ├── PersonalDataSubForm.tsx         # Группа персональных данных
│   ├── PassportDataSubForm.tsx         # Группа паспортных данных
│   └── index.ts
├── components/
│   ├── PropertyItem.tsx                # Элемент массива недвижимости
│   ├── ExistingLoanItem.tsx            # Элемент массива кредитов
│   ├── CoBorrowerItem.tsx              # Элемент массива созаёмщиков
│   └── StepProgressBar.tsx             # Визуальный индикатор шагов
├── hooks/
│   └── useCreditApplicationForm.ts     # Инициализация формы
├── api/
│   └── mock-api.ts                     # Mock API endpoints
└── ISSUES.md                           # Лог проблем для улучшения reformer
```

## Decisions
- **Режимы**: Create/Edit/View - все три сразу
- **Язык интерфейса**: Русский для labels и сообщений об ошибках
- **Mock данные**: Полноценные тестовые данные для режима Edit
- **Sub-forms**: Переиспользуемые группы полей вынесены в отдельный каталог

## Implementation Phases

### Phase 1: Foundation
1. Создать `model/types.ts` - все интерфейсы (CreditApplicationForm, PersonalData, Address, etc.)
2. Создать `model/constants.ts` - опции select (LOAN_TYPES, EMPLOYMENT_STATUSES, etc.)
3. Создать `api/mock-api.ts` - mock endpoints с задержкой 2s

### Phase 2: Form Schema
1. Создать переиспользуемые схемы в `model/schema.ts`:
   - `addressSchema` - для адресов регистрации/проживания
   - `personalDataSchema` - ФИО, дата рождения, пол
   - `passportDataSchema` - серия, номер, даты
   - `propertySchema`, `existingLoanSchema`, `coBorrowerSchema` - для массивов
2. Создать основную `creditApplicationSchema` со всеми 70+ полями

### Phase 3: Validation
Создать `model/validation.ts`:
- Step 1: loanType, amount, term, purpose + условные mortgage/car
- Step 2: personalData, passportData, inn, snils + проверка возраста (18-70)
- Step 3: phone, email, addresses + условный residence
- Step 4: employmentStatus, income + условные company/business поля
- Step 5: maritalStatus, dependents, education + валидация массивов
- Step 6: agreements (должны быть true), SMS код

Кросс-валидации:
- workExperienceCurrent <= workExperienceTotal
- remainingAmount <= amount (кредиты)
- initialPayment >= 20% propertyValue (ипотека)
- paymentToIncomeRatio <= 50%

### Phase 4: Behaviors
Создать `model/behavior.ts`:

**Условная видимость (enableWhen):**
- Поля ипотеки когда loanType='mortgage'
- Поля автокредита когда loanType='car'
- Поля компании когда employmentStatus='employed'
- Поля бизнеса когда employmentStatus='selfEmployed'
- Адрес проживания когда sameAsRegistration=false

**Вычисляемые поля (watchField для кросс-уровневых):**
- `fullName` = lastName + firstName + middleName
- `age` из birthDate
- `totalIncome` = monthlyIncome + additionalIncome
- `coBorrowersIncome` = сумма доходов созаёмщиков
- `interestRate` на основе loanType, region, hasProperty
- `monthlyPayment` = аннуитетная формула
- `paymentToIncomeRatio` = payment / totalIncome * 100
- `initialPayment` = 20% от propertyValue

**Копирование:**
- registrationAddress -> residenceAddress когда sameAsRegistration=true

### Phase 5: Step Components
Каждый шаг следует паттерну:
```tsx
export function StepN({ control }: { control: GroupNodeWithControls<CreditApplicationForm> }) {
  const { value } = useFormControl(control.field as FieldNode<Type>);
  return (
    <div>
      <FormField control={control.field} />
      {condition && <ConditionalFields />}
    </div>
  );
}
```

### Phase 6: Array Components
- PropertyItem, ExistingLoanItem, CoBorrowerItem
- Использовать FormArrayManager из существующих компонентов

### Phase 7: Integration
1. Создать хук `useCreditApplicationForm`
2. Создать основной `CreditApplicationForm.tsx`
3. Интегрировать с компонентом `StepNavigation`
4. Добавить поддержку режимов Create/Edit/View

## Critical Files (Reference)
- [FormField.tsx](src/components/ui/FormField.tsx) - паттерн useFormControl
- [StepNavigation.tsx](src/components/ui/step-navigation/StepNavigation.tsx) - валидация шагов
- [FormArrayManager.tsx](src/components/ui/FormArrayManager.tsx) - операции с массивами
- [spec/complex-multi-step-form.md](spec/complex-multi-step-form.md) - полная спецификация

## Issue Tracking
Файл `src/features/credit-application/ISSUES.md` для логирования проблем:
- Документировать путаницу с API
- Отмечать недостающую функциональность
- Фиксировать примененные workarounds
- Записывать проблемы с выводом типов

## Form Stats
- 6 шагов
- 70+ полей
- 8 вычисляемых полей
- 3 типа массивов (properties, loans, co-borrowers)
- 5 групп условных полей