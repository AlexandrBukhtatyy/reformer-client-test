# Проблемы, выявленные при создании формы заявки на кредит

Этот документ содержит список проблем и неудобств, с которыми столкнулся при создании формы с использованием @reformer/core и reformer-mcp. Эта информация предназначена для улучшения библиотеки и LLMs.txt.

---

## 1. Документация и LLMs.txt

### 1.1 Недостаточно примеров для сложных сценариев

**Проблема:** В LLMs.txt не хватает примеров для следующих сценариев:
- Многошаговые формы с валидацией по шагам
- Работа с массивами вложенных объектов (ArrayNode с GroupNode внутри)
- Каскадные вычисляемые поля (когда одно вычисляемое поле зависит от другого)

**Рекомендация:** Добавить в LLMs.txt секцию с примерами для multi-step форм и сложных зависимостей.

### 1.2 Неясность с типами для watchField

**Проблема:** При использовании `watchField` для вычисления зависимых полей приходится явно приводить типы через `as` для получения значений других полей через `ctx.getFieldValue()`.

**Пример проблемы:**
```typescript
watchField(path.loanAmount, (loanAmount, ctx) => {
  const loanTerm = ctx.getFieldValue(path.loanTerm.toString()) as number; // Требуется as
  // ...
});
```

**Рекомендация:** Улучшить типизацию `BehaviorContext.getFieldValue()` для автоматического вывода типов.

---

## 2. Поведение (Behaviors)

### 2.1 Невозможность использования computeFrom для полей на разных уровнях вложенности

**Проблема:** `computeFrom` работает только для полей на одном уровне вложенности. Для вычисления `fullName` из `personalData.lastName`, `personalData.firstName` и `personalData.middleName` в поле на верхнем уровне (`fullName`) пришлось использовать `watchField`.

**Рекомендация:** Расширить `computeFrom` для поддержки полей на разных уровнях вложенности, либо явно документировать это ограничение.

### 2.2 Необходимость использовать path.toString() для setFieldValue

**Проблема:** При вызове `ctx.setFieldValue()` в `watchField` требуется конвертировать path в строку через `.toString()`.

**Пример:**
```typescript
ctx.setFieldValue(path.fullName.toString(), fullName);
```

**Рекомендация:** Разрешить передачу `FieldPath` напрямую в `setFieldValue`.

### 2.3 Отсутствие batch-режима для множественных обновлений

**Проблема:** При вычислении нескольких зависимых полей в одном `watchField` каждый `setFieldValue` может вызывать ререндер.

**Рекомендация:** Добавить `ctx.batch()` для группировки обновлений:
```typescript
watchField(path.source, (value, ctx) => {
  ctx.batch(() => {
    ctx.setFieldValue(path.field1, value1);
    ctx.setFieldValue(path.field2, value2);
  });
});
```

---

## 3. Валидация

### 3.1 Валидация массивов требует дублирования кода

**Проблема:** При использовании `validateItems` для валидации элементов массива приходится создавать отдельную функцию валидации для каждого типа элемента.

**Рекомендация:** Документировать паттерн переиспользования валидаторов для вложенных структур.

### 3.2 Кросс-валидация между элементами массива

**Проблема:** Нет очевидного способа валидировать один элемент массива относительно других (например, проверить уникальность значений).

**Рекомендация:** Добавить пример кросс-валидации между элементами массива в документацию.

---

## 4. Условные поля

### 4.1 enableWhen не работает с глубоко вложенными путями для групп

**Проблема:** При использовании `enableWhen` для вложенного объекта (`path.residenceAddress`) поведение отключения/включения всех вложенных полей не всегда очевидно.

**Рекомендация:** Документировать поведение `enableWhen` для GroupNode и ArrayNode.

### 4.2 resetOnDisable не всегда работает как ожидается

**Проблема:** При `resetOnDisable: true` для условных полей не всегда понятно, к каким значениям они сбрасываются (к начальным из схемы или к undefined).

**Рекомендация:** Уточнить в документации поведение `resetOnDisable` и добавить возможность указывать значение для сброса.

---

## 5. Типизация

### 5.1 Сложность типизации FormSchema для вложенных объектов

**Проблема:** При создании вложенных схем (personalDataSchema, addressSchema) TypeScript не всегда корректно выводит типы, требуя явного указания `FormSchema<Type>`.

**Рекомендация:** Улучшить type inference для вложенных схем.

### 5.2 Типы для массивов в схеме

**Проблема:** Синтаксис `[itemSchema]` для массивов не очевиден и требует изучения документации.

**Рекомендация:** Добавить более явный синтаксис или алиас типа, например `arrayOf(itemSchema)`.

---

## 6. UI компоненты

### 6.1 FormField не поддерживает все типы полей

**Проблема:** Универсальный компонент FormField требует специальной обработки для разных типов полей (checkbox, radio, select).

**Рекомендация:** Добавить в LLMs.txt примеры создания универсальных FormField компонентов для разных UI-библиотек.

### 6.2 Отсутствие встроенного компонента для отображения ошибок формы

**Проблема:** Нет стандартного способа получить и отобразить все ошибки формы сразу (например, для summary в конце формы).

**Рекомендация:** Добавить хук `useFormErrors(form)` для получения всех ошибок формы.

---

## 7. StepNavigation

### 7.1 validateForm не экспортируется из основного модуля

**Проблема:** Функция `validateForm` экспортируется из `@reformer/core/validators`, а не из основного модуля.

**Рекомендация:** Экспортировать `validateForm` из `@reformer/core` для удобства импорта.

---

## 8. Общие рекомендации для LLMs.txt

1. **Добавить секцию "Common Patterns"** с примерами:
   - Multi-step форма
   - Форма с динамическими массивами
   - Форма с вычисляемыми полями
   - Форма с условной валидацией

2. **Добавить секцию "Troubleshooting"** с частыми ошибками и их решениями

3. **Расширить примеры типизации** для сложных форм с вложенными объектами и массивами

4. **Документировать интеграцию** с популярными UI-библиотеками (shadcn/ui, Radix, MUI)

---

## 9. Предложения для reformer-mcp

### 9.1 Генерация кода для multi-step форм

**Предложение:** Добавить команду для генерации структуры multi-step формы с автоматическим разделением валидации по шагам.

### 9.2 Генерация под-форм

**Предложение:** Автоматически генерировать под-формы для вложенных объектов, когда они используются в нескольких местах (например, Address, PersonalData).

### 9.3 Предупреждения о потенциальных проблемах

**Предложение:** Добавить анализ схемы и предупреждения о:
- Циклических зависимостях в behaviors
- Несогласованности между типами и схемой
- Отсутствующих валидаторах для обязательных полей

---

## 10. Критическая ошибка в документации useFormControlValue

### 10.1 Неверный пример возвращаемого значения в LLMs.txt

**Проблема:** В LLMs.txt (секция "Type-Safe useFormControl") показан пример с деструктуризацией `{ value }`, но `useFormControlValue` возвращает значение напрямую (`T`), а не объект `{ value: T }`.

**В документации (НЕПРАВИЛЬНО):**
```typescript
const { value } = useFormControl(form.field as FieldNode<ExpectedType>);
```

**Фактическая сигнатура:**
```typescript
// useFormControlValue возвращает T напрямую
export declare function useFormControlValue<T extends FormValue>(control: FieldNode<T>): T;
```

**Правильное использование:**
```typescript
// useFormControlValue - только значение
const loanType = useFormControlValue(control.loanType); // Возвращает string напрямую

// useFormControl - полное состояние поля
const { value, errors, disabled, touched } = useFormControl(control.loanType); // Возвращает объект
```

**Последствия:** LLM генерирует код с деструктуризацией `const { value: loanType } = useFormControlValue(...)`, который компилируется без ошибок TypeScript (т.к. деструктуризация примитива возвращает undefined), но приводит к тому, что условный рендеринг не работает - значение всегда undefined.

**Рекомендация:**
1. Исправить примеры в LLMs.txt
2. Явно указать разницу между `useFormControl` и `useFormControlValue`
3. Добавить в секцию "COMMON MISTAKES":
```typescript
// ❌ WRONG - useFormControlValue returns T, not { value: T }
const { value: loanType } = useFormControlValue(control.loanType);

// ✅ CORRECT
const loanType = useFormControlValue(control.loanType);
```

---

## 11. Отсутствие getFieldValue в BehaviorContext

### 11.1 LLMs.txt документирует несуществующий метод

**Проблема:** В LLMs.txt (секция "BehaviorContext interface") документирован метод `getFieldValue`, но его нет в реальном интерфейсе `FormContext`/`BehaviorContext`.

**В документации (НЕПРАВИЛЬНО):**
```typescript
interface BehaviorContext<TForm> {
  form: GroupNodeWithControls<TForm>;
  setFieldValue: (path: string, value: any) => void;
  getFieldValue: (path: string) => unknown;  // ← НЕ СУЩЕСТВУЕТ!
}
```

**Реальный интерфейс (из form-context.d.ts):**
```typescript
export interface FormContext<TForm> {
  readonly form: GroupNodeWithControls<TForm>;
  setFieldValue(path: string, value: unknown): void;
  // getFieldValue - ОТСУТСТВУЕТ!
}
```

**Правильные способы чтения значений полей:**
```typescript
// Чтение значения поля через ctx.form
const loanType = ctx.form.loanType.value.value;

// Для вложенных полей (если watchField на вложенном пути)
// ctx.form типизирован как тип родительской группы, не корневой формы!
watchField(path.personalData.lastName, (lastName, ctx) => {
  // ctx.form здесь - это PersonalData, не CreditApplicationForm!
  const firstName = ctx.form.firstName.value.value;  // ✅ CORRECT
  const middleName = ctx.form.middleName.value.value;  // ✅ CORRECT

  // Для записи в корневое поле используем setFieldValue с полным путём
  ctx.setFieldValue('fullName', [lastName, firstName, middleName].filter(Boolean).join(' '));
});
```

**Последствия:** LLM генерирует код с `ctx.getFieldValue(path.field.toString())`, который не компилируется TypeScript.

**Рекомендация:**
1. Убрать `getFieldValue` из документации LLMs.txt
2. Документировать правильный способ чтения значений: `ctx.form.field.value.value`
3. Добавить предупреждение о типизации ctx.form для вложенных путей
