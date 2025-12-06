# Issues Log - Credit Application Form

Этот файл содержит проблемы, обнаруженные при реализации формы заявки на кредит с использованием @reformer/core и reformer-mcp. Проблемы отмечаются для последующего улучшения библиотеки или LLMs.txt.

## Шаблон

### Issue #X: [Название]
- **Дата**: YYYY-MM-DD
- **Категория**: [Bug | Enhancement | Documentation | DX]
- **Компонент**: [@reformer/core | reformer-mcp | UI Components]
- **Серьёзность**: [Critical | Major | Minor]
- **Статус**: [Open | Resolved | Workaround Applied]

**Описание:**
[Подробное описание проблемы]

**Ожидаемое поведение:**
[Что должно происходить]

**Фактическое поведение:**
[Что происходит на самом деле]

**Workaround (если есть):**
[Шаги обхода проблемы]

**Предложение по исправлению:**
[Возможное решение]

---

## Активные проблемы

### Issue #1: Схема массивов - формат не соответствует LLMs.txt
- **Дата**: 2024-12-06
- **Категория**: Documentation
- **Компонент**: @reformer/core LLMs.txt
- **Серьёзность**: Major
- **Статус**: Resolved

**Описание:**
В LLMs.txt документация показывает формат `{ schema: ..., initialItems: [] }`, но реальный API использует формат tuple `[itemSchema]`.

**Ожидаемое поведение:**
```typescript
// В LLMs.txt:
properties: {
  schema: propertySchema,
  initialItems: [],
}
```

**Фактическое поведение:**
```typescript
// В реальности требуется:
properties: [propertySchema] as [typeof propertySchema],
```

**Workaround:**
Использовал tuple формат `[schema] as [typeof schema]` для правильной типизации.

**Предложение по исправлению:**
Обновить LLMs.txt с корректным форматом для массивов в схеме.

---

### Issue #5: Функция `when` не существует - нужна `applyWhen`
- **Дата**: 2024-12-06
- **Категория**: Documentation
- **Компонент**: @reformer/core LLMs.txt
- **Серьёзность**: Critical
- **Статус**: Resolved

**Описание:**
В LLMs.txt упоминается функция `when` для условной валидации, но эта функция не экспортируется из `@reformer/core/validators`. Реальная функция называется `applyWhen` и имеет другую сигнатуру.

**Ожидаемое поведение (по LLMs.txt):**
```typescript
when(
  (form) => form.loanType === 'mortgage',
  () => {
    required(path.propertyValue);
  }
);
```

**Фактическое поведение:**
```typescript
applyWhen(
  path.loanType,
  (loanType) => loanType === 'mortgage',
  (p) => {
    required(p.propertyValue);
  }
);
```

**Разница в API:**
- `when` принимает condition function с полной формой
- `applyWhen` принимает fieldPath, condition для значения этого поля, и validation function с новым path

**Workaround:**
Использовал `applyWhen` с правильной сигнатурой.

**Предложение по исправлению:**
Обновить LLMs.txt с корректным именем функции и сигнатурой.

---

### Issue #6: Типы для validateTree callback
- **Дата**: 2024-12-06
- **Категория**: DX
- **Компонент**: @reformer/core
- **Серьёзность**: Minor
- **Статус**: Workaround Applied

**Описание:**
`validateTree` callback не имеет типизации для параметра `ctx`, что приводит к ошибке TS7006 (implicit any).

**Ожидаемое поведение:**
```typescript
validateTree((ctx) => {
  ctx.form.someField; // should be typed
});
```

**Фактическое поведение:**
```typescript
// Error: Parameter 'ctx' implicitly has an 'any' type.
validateTree((ctx) => { ... });
```

**Workaround:**
Явная типизация параметра:
```typescript
validateTree((ctx: { form: MyFormType }) => { ... });
```

**Предложение по исправлению:**
Добавить generic тип к validateTree или документировать необходимость явной типизации.

---

### Issue #2: Неясна типизация для watchField callback context
- **Дата**: 2024-XX-XX
- **Категория**: Documentation
- **Компонент**: @reformer/core LLMs.txt
- **Серьёзность**: Minor
- **Статус**: Open

**Описание:**
В LLMs.txt показан watchField, но не описан тип второго аргумента `ctx`. Приходится угадывать интерфейс `{ form, setFieldValue }`.

**Ожидаемое поведение:**
Документация должна содержать полный интерфейс context:
```typescript
interface WatchContext {
  form: T;
  setFieldValue: (path: string, value: unknown) => void;
  // другие методы?
}
```

**Workaround:**
Использовал `as unknown` для обхода проблем с типизацией.

---

### Issue #3: Нет информации о createForm API
- **Дата**: 2024-XX-XX
- **Категория**: Documentation
- **Компонент**: @reformer/core LLMs.txt
- **Серьёзность**: Major
- **Статус**: Open

**Описание:**
В LLMs.txt нет примера использования `createForm`. Непонятно, какие параметры принимает и как правильно инициализировать форму.

**Ожидаемое поведение:**
```typescript
// В LLMs.txt должно быть:
const form = createForm<MyForm>({
  form: schema,          // Form schema
  behavior?: behaviorSchema, // Optional behavior schema
  validation?: validationSchema, // Optional validation schema
});
```

**Workaround:**
Использовал примеры из существующих компонентов проекта.

---

### Issue #4: Вложенные вычисляемые поля через computeFrom
- **Дата**: 2024-XX-XX
- **Категория**: DX
- **Компонент**: @reformer/core
- **Серьёзность**: Minor
- **Статус**: Workaround Applied

**Описание:**
computeFrom не работает для вычислений из вложенных полей в корневые (например, `personalData.lastName` -> `fullName`). Приходится использовать множество watchField.

**Ожидаемое поведение:**
computeFrom должен работать для любых уровней вложенности.

**Workaround:**
Использую несколько watchField для каждого исходного поля.

**Предложение по исправлению:**
Либо расширить computeFrom, либо добавить специальный синтаксис для cross-level вычислений.

---

### Issue #7: Неоднозначная структура каталогов для array items
- **Дата**: 2024-12-06
- **Категория**: Documentation
- **Компонент**: reformer-mcp / LLMs.txt
- **Серьёзность**: Minor
- **Статус**: Resolved

**Описание:**
При генерации структуры проекта array item компоненты (PropertyItem, ExistingLoanItem, CoBorrowerItem) были размещены в `components/`, но логичнее их хранить в `sub-forms/`, так как они являются переиспользуемыми под-формами для элементов массивов.

**Ожидаемая структура:**
```
sub-forms/
├── AddressSubForm.tsx       # Переиспользуемая группа полей
├── PersonalDataSubForm.tsx  # Переиспользуемая группа полей
├── PassportDataSubForm.tsx  # Переиспользуемая группа полей
├── PropertyItem.tsx         # Элемент массива properties
├── ExistingLoanItem.tsx     # Элемент массива existingLoans
└── CoBorrowerItem.tsx       # Элемент массива coBorrowers

components/
└── StepProgressBar.tsx      # UI компонент (не форма)
```

**Фактическая структура (до исправления):**
```
components/
├── PropertyItem.tsx
├── ExistingLoanItem.tsx
├── CoBorrowerItem.tsx
└── StepProgressBar.tsx

sub-forms/
├── AddressSubForm.tsx
├── PersonalDataSubForm.tsx
└── PassportDataSubForm.tsx
```

**Предложение по исправлению:**
Уточнить в LLMs.txt или плане, что:
- `sub-forms/` содержит переиспользуемые формы И элементы массивов
- `components/` содержит UI компоненты, не являющиеся формами (прогресс-бары, навигация и т.д.)

---

## Решённые проблемы

(Перемещать решённые проблемы сюда)

---

## Заметки для улучшения reformer-mcp

1. **Генерация схемы**: reformer-mcp мог бы автоматически генерировать схему формы из спецификации.

2. **Генерация валидации**: Автоматическая генерация валидаторов из описания полей в спецификации.

3. **Шаблоны компонентов**: Готовые шаблоны для step-компонентов и array-item компонентов.
