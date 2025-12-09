# Создание формы ReFormer по спецификации

> **Задача**: Создать форму на основе спецификации с использованием MCP сервера `@reformer/mcp`

## Предусловия

1. MCP сервер reformer должен быть зарегистрирован:

   ```bash
   claude mcp add --transport stdio reformer -- npx @reformer/mcp
   ```

2. Проект должен иметь установленные зависимости:
   ```bash
   npm install reformer
   npm install -D typescript
   ```

---

## Входные данные

**Спецификация формы:** `spec/insurance-application-form.md`

---

## Рабочий процесс

### Шаг 1: Анализ спецификации

Прочитай файл спецификации и извлеки:

1. **Метаданные формы:**

   - Название формы
   - Тип формы (простая / пошаговая)
   - Сценарии использования (просмотр, создание, редактирование)

2. **Структура полей:**

   - Шаги/разделы формы
   - Поля каждого шага (ключ, название, тип, значение по умолчанию)
   - Группировка полей (nested objects)

3. **Валидация:**

   - Обязательные поля
   - Валидаторы (min, max, pattern, email и т.д.)
   - Кросс-валидация между полями

4. **Поведения (behaviors):**

   - Вычисляемые поля (computeFrom)
   - Условная видимость (visibleWhen)
   - Условная активность (enableWhen/disableWhen)
   - Зависимости между полями (watchField, syncFields)

5. **Массивы:**
   - Поля с динамическим количеством элементов (водители, документы и т.д.)

---

### Шаг 2: Получение структуры проекта

Используй MCP инструмент `get_recommended_structure` для получения рекомендованной структуры файлов:

```
Сложность формы:
- simple: 3-5 полей, без шагов
- medium: 5-15 полей, может быть 1-2 шага
- complex: многошаговая форма, вложенные объекты, массивы
```

**Ожидаемая структура для complex формы:**

```
src/features/insurance-application-form/
├── types.ts                 # TypeScript интерфейсы
├── schema.ts                # createForm + FormSchema
├── validation.ts            # ValidationSchemaFn (или validation/ для шагов)
├── behaviors.ts             # BehaviorSchemaFn (опционально)
├── components/
│   ├── [FormName]Form.tsx   # Главный компонент формы
│   └── steps/               # Компоненты шагов (для пошаговых форм)
│       ├── Step1.tsx
│       ├── Step2.tsx
│       └── ...
└── hooks/                   # Кастомные хуки (опционально)
```

---

### Шаг 3: Генерация TypeScript типов

Используй MCP инструмент `generate_types` для получения правил и шаблона.

**Критические правила:**

- Используй `undefined`, а не `null` для опциональных полей
- Не используй index signatures `[key: string]: T`
- Все поля должны быть явно типизированы
- Для массивов используй `T[]`

**Пример:**

```typescript
// types.ts
export interface InsuranceForm {
  // Шаг 1: Тип страхования
  insuranceType: "casco" | "osago" | "property" | "life" | "travel";
  insurancePeriod: 3 | 6 | 12 | 24 | 36;
  startDate: string;
  endDate: string; // computed
  coverageAmount: number | undefined;

  // Шаг 2: Данные страхователя
  insuredType: "individual" | "corporate";
  personalData: PersonalData;

  // Массив
  drivers: Driver[];
}

export interface PersonalData {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
}

export interface Driver {
  lastName: string;
  firstName: string;
  licenseNumber: string;
}
```

---

### Шаг 4: Генерация схемы формы

Используй MCP инструмент `generate_schema` для получения шаблона и маппинга компонентов.

**Критические правила:**

- Каждое поле должно иметь свойство `value`
- Для пустых числовых полей используй `null` (не `undefined`)
- Для пустых строк используй `''`
- Указывай `component` для каждого поля

**Пример:**

```typescript
// schema.ts
import { createForm, type FormSchemaFn } from "@reformer/core";
import type { InsuranceForm } from "./types";
import { validation } from "./validation";
import { behaviors } from "./behaviors";

const formSchema: FormSchemaFn<InsuranceForm> = () => ({
  insuranceType: {
    value: "casco",
    component: "select",
    label: "Тип страхования",
  },
  coverageAmount: {
    value: null, // null для пустых чисел
    component: "input",
    label: "Страховая сумма",
  },
  personalData: {
    lastName: {
      value: "",
      component: "input",
      label: "Фамилия",
    },
    // ...
  },
  drivers: [
    {
      lastName: { value: "", component: "input", label: "Фамилия" },
      firstName: { value: "", component: "input", label: "Имя" },
      licenseNumber: { value: "", component: "input", label: "Номер ВУ" },
    },
  ],
});

export const form = createForm<InsuranceForm>({
  form: formSchema,
  validation,
  behavior: behaviors,
});
```

---

### Шаг 5: Генерация валидации

Используй MCP инструмент `generate_validation` для получения списка валидаторов.

**Для пошаговой формы создай отдельные схемы:**

```typescript
// validation.ts
import type { ValidationSchemaFn } from "@reformer/core";
import { required, min, max, email, pattern } from "@reformer/core/validators";
import type { InsuranceForm } from "./types";

// Валидация шага 1
export const step1Validation: ValidationSchemaFn<InsuranceForm> = (path) => {
  required(path.insuranceType, { message: "Выберите тип страхования" });
  required(path.startDate, { message: "Укажите дату начала" });
  required(path.coverageAmount, { message: "Укажите страховую сумму" });
  min(path.coverageAmount, 100000, { message: "Минимум 100 000 ₽" });
  max(path.coverageAmount, 50000000, { message: "Максимум 50 000 000 ₽" });
};

// Валидация шага 2
export const step2Validation: ValidationSchemaFn<InsuranceForm> = (path) => {
  required(path.personalData.lastName, { message: "Укажите фамилию" });
  required(path.personalData.firstName, { message: "Укажите имя" });
  required(path.personalData.birthDate, { message: "Укажите дату рождения" });
};

// Карта валидаций для useStepForm
export const STEP_VALIDATIONS: Record<
  number,
  ValidationSchemaFn<InsuranceForm>
> = {
  1: step1Validation,
  2: step2Validation,
  // ...
};

// Полная валидация (для финальной отправки)
export const validation: ValidationSchemaFn<InsuranceForm> = (path) => {
  step1Validation(path);
  step2Validation(path);
};
```

---

### Шаг 6: Генерация поведений

Используй MCP инструмент `generate_behavior` для получения списка поведений.

**Пример:**

```typescript
// behaviors.ts
import type { BehaviorSchemaFn } from "@reformer/core";
import { computeFrom, visibleWhen, watchField } from "@reformer/core/behaviors";
import type { InsuranceForm } from "./types";

export const behaviors: BehaviorSchemaFn<InsuranceForm> = (path) => {
  // Вычисляемое поле: дата окончания
  computeFrom(
    path.endDate,
    [path.startDate, path.insurancePeriod],
    ([startDate, period]) => {
      if (!startDate) return "";
      const date = new Date(startDate);
      date.setMonth(date.getMonth() + period);
      return date.toISOString().split("T")[0];
    }
  );

  // Условная видимость: рассрочка
  visibleWhen(
    path.installments,
    path.paymentType,
    (paymentType) => paymentType === "installments"
  );

  // Сброс при изменении типа страхования
  watchField(path.insuranceType, (value, form) => {
    // Сброс специфичных полей при смене типа
    form.get(path.vehicleData)?.reset();
    form.get(path.propertyData)?.reset();
  });
};
```

---

### Шаг 7: Проверка кода

Используй MCP инструмент `check_code` для проверки сгенерированного кода на ошибки.

**Что проверяется:**

- Корректность импортов
- Соответствие типов и схемы
- Правильность использования валидаторов
- Правильность использования поведений
- Инициализация значений полей

---

### Шаг 8: Создание React компонентов

**Главный компонент формы:**

```typescript
// components/InsuranceForm.tsx
import { useMemo } from "react";
import { useStepForm } from "@reformer/react";
import { createInsuranceForm } from "../schema";
import { STEP_VALIDATIONS } from "../validation";
import { Step1, Step2, Step3 } from "./steps";

const STEPS = [Step1, Step2, Step3];

export function InsuranceForm() {
  const form = useMemo(() => createInsuranceForm(), []);

  const {
    currentStep,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
    validateCurrentStep,
  } = useStepForm(form, {
    stepSchemas: STEP_VALIDATIONS,
    totalSteps: STEPS.length,
  });

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) nextStep();
  };

  const handleSubmit = async () => {
    await form.validate();
    if (form.valid.value) {
      console.log("Submit:", form.value);
    }
  };

  const StepComponent = STEPS[currentStep - 1];

  return (
    <div>
      <StepIndicator current={currentStep} total={STEPS.length} />

      <StepComponent control={form.controls} />

      <div className="flex gap-2 mt-4">
        {!isFirstStep && <Button onClick={prevStep}>Назад</Button>}
        {!isLastStep ? (
          <Button onClick={handleNext}>Далее</Button>
        ) : (
          <Button onClick={handleSubmit}>Отправить</Button>
        )}
      </div>
    </div>
  );
}
```

**Компонент шага:**

```typescript
// components/steps/Step1.tsx
import { useFormControl } from "@reformer/react";
import type { GroupNodeWithControls } from "@reformer/core";
import type { InsuranceForm } from "../../types";

interface StepProps {
  control: GroupNodeWithControls<InsuranceForm>;
}

export function Step1({ control }: StepProps) {
  return (
    <div className="space-y-4">
      <h2>Шаг 1: Тип страхования</h2>

      <FormField
        control={control.insuranceType}
        label="Тип страхования"
        options={[
          { value: "casco", label: "КАСКО" },
          { value: "osago", label: "ОСАГО" },
        ]}
      />

      <FormField control={control.startDate} label="Дата начала" type="date" />

      <FormField
        control={control.coverageAmount}
        label="Страховая сумма"
        type="number"
      />
    </div>
  );
}
```

---

## Чек-лист перед завершением

- [ ] Типы соответствуют спецификации
- [ ] Все поля схемы имеют `value`
- [ ] Валидация покрывает все обязательные поля
- [ ] Поведения реализуют все вычисляемые и условные поля
- [ ] `check_code` не показывает ошибок
- [ ] Компоненты используют `useFormControl` / `useFormControlValue`
- [ ] Пошаговая навигация работает с валидацией
- [ ] Форма создается через `useMemo` в компоненте

---

## Полезные MCP инструменты

| Инструмент                  | Когда использовать                        |
| --------------------------- | ----------------------------------------- |
| `get_recommended_structure` | В начале - получить структуру файлов      |
| `generate_types`            | Создание TypeScript интерфейсов           |
| `generate_schema`           | Создание FormSchemaFn                     |
| `generate_validation`       | Создание ValidationSchemaFn               |
| `generate_behavior`         | Создание BehaviorSchemaFn                 |
| `check_code`                | Проверка сгенерированного кода            |
| `get_pattern`               | Получить паттерн для конкретного сценария |
| `explain_error`             | Разобраться с ошибкой                     |
| `search_docs`               | Поиск по документации                     |

---

## Пример запроса к Claude Code

```
Создай форму на основе спецификации spec/insurance-application-form.md

Используй MCP сервер reformer для:
1. Получения структуры проекта (get_recommended_structure)
2. Генерации типов (generate_types)
3. Генерации схемы (generate_schema)
4. Генерации валидации (generate_validation)
5. Генерации поведений (generate_behavior)
6. Проверки кода (check_code)

Форма должна:
- Быть пошаговой (6 шагов)
- Иметь отдельные файлы валидации для каждого шага
- Использовать useStepForm для навигации
- Поддерживать вычисляемые поля (endDate, age, experience)
- Иметь условную видимость полей
```
