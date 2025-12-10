# Создание формы ReFormer по спецификации

> **Задача**: Создать форму на основе спецификации с использованием MCP сервера `@reformer/mcp`

## Предусловия

1. MCP сервер reformer должен быть зарегистрирован

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
```

---

### Шаг 4: Генерация схемы формы

Используй MCP инструмент `generate_schema` для получения шаблона и маппинга компонентов.

**Критические правила:**

- Каждое поле должно иметь свойство `value`
- Для пустых числовых полей используй `null` (не `undefined`)
- Для пустых строк используй `''`
- Указывай `component` для каждого поля

---

### Шаг 5: Генерация валидации

Используй MCP инструмент `generate_validation` для получения списка валидаторов.

---

### Шаг 6: Генерация поведений

Используй MCP инструмент `generate_behavior` для получения списка поведений.

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
import { Step1Component, Step2Component } from "./steps";

export function InsuranceForm() {
  const form = useMemo(() => createInsuranceForm(), []);
  const navRef = useRef<StepNavigationHandle<MyForm>>(null);

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) navRef.current?.goToNextStep();
  };

  const handleSubmit = async () => {
    await form.validate();
    if (form.valid.value) {
      console.log("Submit:", form.value);
    }
  };

  return (
    <div>
      <StepIndicator current={currentStep} total={STEPS.length} />

      <StepNavigation ref={navRef} form={form} config={config}>
        {(currentStep) => (
          <>
            {currentStep === 1 && <Step1Component control={form} />}
            {currentStep === 2 && <Step2Component control={form} />}
          </>
        )}
      </StepNavigation>

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

**Компонент шага или переиспользуемой формы:**

```typescript
// components/steps/Step1.tsx
// imports

interface StepProps {
  control: GroupNodeWithControls<InsuranceForm>;
}

export function Step1({ control }: StepProps) {
  return (
    <div className="space-y-4">
      <h2>Шаг 1: Тип страхования</h2>
      <FormField control={control.insuranceType} />
      <FormField control={control.startDate} />
      <FormField control={control.coverageAmount} />
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
- [ ] Отсутствуют ошибки компиляции

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
7. Проверки компиляции кода (npm run build)

Форма должна:
- Быть пошаговой (6 шагов)
- Иметь отдельные файлы валидации для каждого шага
- Использовать useStepForm для навигации
- Поддерживать вычисляемые поля (endDate, age, experience)
- Иметь условную видимость полей
- Компилироваться без ошибок
```
