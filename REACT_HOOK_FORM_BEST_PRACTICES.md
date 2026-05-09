# React Hook Form: Лучшие практики, паттерны и архитектурные решения

> Полное руководство по работе с React Hook Form (2025-2026)

## Содержание

1. [Основные принципы](#основные-принципы)
2. [Архитектура и структура](#архитектура-и-структура)
3. [Валидация со схемами (Zod/Yup)](#валидация-со-схемами-zodyup)
4. [Многошаговые формы (Wizard)](#многошаговые-формы-wizard)
5. [Переиспользуемые компоненты с TypeScript](#переиспользуемые-компоненты-с-typescript)
6. [Оптимизация производительности](#оптимизация-производительности)
7. [Динамические формы (useFieldArray)](#динамические-формы-usefieldarray)
8. [Обработка ошибок и серверная валидация](#обработка-ошибок-и-серверная-валидация)
9. [Тестирование](#тестирование)
10. [React 19 и Server Components](#react-19-и-server-components)

---

## Основные принципы

### Почему React Hook Form?

React Hook Form — это производительная и гибкая библиотека форм, которая использует React Hooks API для создания форм с минимальным количеством перерендеров. Ключевые преимущества:

- **Минимальные перерендеры** — изолированная подписка на изменения инпутов
- **Неконтролируемые компоненты** — использование `ref` вместо `state`
- **Простой API** — хуки `useForm`, `Controller`, `useWatch`, `useFormContext`
- **Интеграция с валидаторами** — Zod, Yup, Joi, Vest и другие

### Базовая настройка

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(8, 'Минимум 8 символов'),
});

type FormData = z.infer<typeof schema>;

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur', // Валидация при потере фокуса
  });

  const onSubmit = async (data: FormData) => {
    // Отправка данных
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        Войти
      </button>
    </form>
  );
}
```

---

## Архитектура и структура

### Паттерн MVC для форм

Разделение логики на слои для масштабируемости:

```
src/
├── features/
│   └── user-profile/
│       ├── components/
│       │   ├── UserProfileForm.tsx      # View
│       │   └── fields/
│       │       ├── EmailField.tsx
│       │       └── NameField.tsx
│       ├── hooks/
│       │   └── useUserProfileForm.ts    # Controller (логика формы)
│       ├── schemas/
│       │   └── userProfile.schema.ts    # Model (валидация)
│       └── types/
│           └── userProfile.types.ts
```

### Кастомный хук для логики формы

```tsx
// hooks/useUserProfileForm.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userProfileSchema, UserProfileData } from '../schemas/userProfile.schema';
import { useUpdateProfile } from '../api/useUpdateProfile';

export function useUserProfileForm(defaultValues?: Partial<UserProfileData>) {
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();

  const form = useForm<UserProfileData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      ...defaultValues,
    },
    mode: 'onBlur',
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await updateProfile(data);
  });

  return {
    ...form,
    onSubmit,
    isLoading: isPending,
  };
}
```

### Использование FormProvider и useFormContext

Для глубоко вложенных компонентов используйте контекст:

```tsx
// components/UserProfileForm.tsx
import { FormProvider } from 'react-hook-form';
import { useUserProfileForm } from '../hooks/useUserProfileForm';
import { EmailField } from './fields/EmailField';
import { NameField } from './fields/NameField';

export function UserProfileForm() {
  const form = useUserProfileForm();

  return (
    <FormProvider {...form}>
      <form onSubmit={form.onSubmit}>
        <NameField />
        <EmailField />
        <button type="submit" disabled={form.isLoading}>
          Сохранить
        </button>
      </form>
    </FormProvider>
  );
}

// components/fields/EmailField.tsx
import { useFormContext } from 'react-hook-form';
import { UserProfileData } from '../../types/userProfile.types';

export function EmailField() {
  const { register, formState: { errors } } = useFormContext<UserProfileData>();

  return (
    <div>
      <label htmlFor="email">Email</label>
      <input id="email" {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
    </div>
  );
}
```

---

## Валидация со схемами (Zod/Yup)

### Zod — рекомендуемый выбор для TypeScript

```tsx
import { z } from 'zod';

// Базовая схема
export const userSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z
    .string()
    .min(8, 'Минимум 8 символов')
    .regex(/[A-Z]/, 'Должна быть хотя бы одна заглавная буква')
    .regex(/[0-9]/, 'Должна быть хотя бы одна цифра'),
  age: z.coerce.number().min(18, 'Должно быть 18+'),
});

// Кросс-валидация полей
export const registrationSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

// Условная валидация
export const addressSchema = z.object({
  country: z.string(),
  zipCode: z.string(),
}).refine(
  (data) => {
    if (data.country === 'US') {
      return /^\d{5}(-\d{4})?$/.test(data.zipCode);
    }
    return true;
  },
  { message: 'Некорректный ZIP код', path: ['zipCode'] }
);

// Асинхронная валидация
export const usernameSchema = z.object({
  username: z
    .string()
    .min(3)
    .refine(async (username) => {
      const response = await fetch(`/api/check-username?username=${username}`);
      const { available } = await response.json();
      return available;
    }, 'Имя пользователя занято'),
});
```

### Yup — альтернатива

```tsx
import * as yup from 'yup';

export const userSchema = yup.object({
  email: yup.string().email('Некорректный email').required('Обязательное поле'),
  password: yup
    .string()
    .min(8, 'Минимум 8 символов')
    .required('Обязательное поле'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});
```

### Интеграция с React Hook Form

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// или
import { yupResolver } from '@hookform/resolvers/yup';

const form = useForm({
  resolver: zodResolver(schema),
  // или
  // resolver: yupResolver(schema),
});
```

---

## Многошаговые формы (Wizard)

### Паттерн с единым FormProvider

```tsx
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

// Схемы для каждого шага
const step1Schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

const step2Schema = z.object({
  email: z.string().email(),
  phone: z.string().min(10),
});

const step3Schema = z.object({
  address: z.string().min(1),
  city: z.string().min(1),
});

// Полная схема
const fullSchema = step1Schema.merge(step2Schema).merge(step3Schema);

type FormData = z.infer<typeof fullSchema>;

// Компонент Wizard
export function RegistrationWizard() {
  const [step, setStep] = useState(1);

  const methods = useForm<FormData>({
    resolver: zodResolver(fullSchema),
    mode: 'onChange',
    shouldUnregister: false, // Важно! Сохраняет данные между шагами
  });

  const schemas = [step1Schema, step2Schema, step3Schema];

  const validateStep = async () => {
    const currentSchema = schemas[step - 1];
    const fields = Object.keys(currentSchema.shape) as (keyof FormData)[];

    const isValid = await methods.trigger(fields);
    return isValid;
  };

  const nextStep = async () => {
    const isValid = await validateStep();
    if (isValid && step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const onSubmit = methods.handleSubmit(async (data) => {
    console.log('Финальные данные:', data);
    // Отправка на сервер
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}

        <div>
          {step > 1 && (
            <button type="button" onClick={prevStep}>
              Назад
            </button>
          )}
          {step < 3 ? (
            <button type="button" onClick={nextStep}>
              Далее
            </button>
          ) : (
            <button type="submit">Отправить</button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}

// Компоненты шагов используют useFormContext
function Step1() {
  const { register, formState: { errors } } = useFormContext<FormData>();

  return (
    <div>
      <h2>Шаг 1: Личные данные</h2>
      <input {...register('firstName')} placeholder="Имя" />
      {errors.firstName && <span>{errors.firstName.message}</span>}

      <input {...register('lastName')} placeholder="Фамилия" />
      {errors.lastName && <span>{errors.lastName.message}</span>}
    </div>
  );
}
```

### Альтернатива: Отдельные формы для каждого шага

```tsx
import { create } from 'zustand';

// Хранилище для данных между шагами
interface WizardStore {
  data: Partial<FormData>;
  setData: (data: Partial<FormData>) => void;
}

const useWizardStore = create<WizardStore>((set) => ({
  data: {},
  setData: (newData) => set((state) => ({ data: { ...state.data, ...newData } })),
}));

// Каждый шаг — отдельная форма
function Step1Form({ onNext }: { onNext: () => void }) {
  const { data, setData } = useWizardStore();

  const form = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: data,
  });

  const onSubmit = form.handleSubmit((stepData) => {
    setData(stepData);
    onNext();
  });

  return (
    <form onSubmit={onSubmit}>
      {/* поля */}
      <button type="submit">Далее</button>
    </form>
  );
}
```

---

## Переиспользуемые компоненты с TypeScript

### Проблема типизации

React Hook Form использует сложные типы, которые затрудняют создание универсальных компонентов.

### Решение: Generic-компоненты

```tsx
import {
  useFormContext,
  Controller,
  FieldValues,
  Path,
  ControllerProps,
} from 'react-hook-form';

// Универсальный текстовый инпут
interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number';
}

export function FormInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  type = 'text',
}: FormInputProps<T>) {
  const { register, formState: { errors } } = useFormContext<T>();
  const error = errors[name];

  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />
      {error && <span className="error">{error.message as string}</span>}
    </div>
  );
}

// Использование
function MyForm() {
  // Автодополнение работает!
  return (
    <FormInput<UserFormData> name="email" label="Email" type="email" />
  );
}
```

### Универсальный Controller для UI-библиотек

```tsx
import { Controller, FieldValues, Path, Control } from 'react-hook-form';

interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: { value: string; label: string }[];
}

export function FormSelect<T extends FieldValues>({
  name,
  control,
  label,
  options,
}: FormSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <label>{label}</label>
          <select {...field}>
            <option value="">Выберите...</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {error && <span>{error.message}</span>}
        </div>
      )}
    />
  );
}
```

### Интеграция с UI-библиотеками (MUI, Ant Design)

```tsx
import { TextField } from '@mui/material';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

interface MuiTextFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
}

export function MuiTextField<T extends FieldValues>({
  name,
  control,
  label,
}: MuiTextFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          error={!!error}
          helperText={error?.message}
          fullWidth
        />
      )}
    />
  );
}
```

---

## Оптимизация производительности

### `watch` vs `useWatch`

| Метод | Перерендер | Когда использовать |
|-------|-----------|-------------------|
| `watch` | Весь компонент с формой | Простые формы, нужны данные в корне |
| `useWatch` | Только компонент с хуком | Сложные формы, изолированные обновления |
| `getValues` | Без перерендера | Получение значений без подписки |

```tsx
// ❌ Плохо: перерендер всей формы
function BadForm() {
  const { watch } = useForm();
  const email = watch('email'); // Триггерит перерендер всей формы

  return <div>{email}</div>;
}

// ✅ Хорошо: изолированный перерендер
function EmailPreview() {
  const email = useWatch({ name: 'email' });
  return <div>Preview: {email}</div>;
}

function GoodForm() {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form>
        <input {...methods.register('email')} />
        <EmailPreview /> {/* Только этот компонент перерендерится */}
      </form>
    </FormProvider>
  );
}
```

### Оптимизация с `useFormState`

```tsx
import { useFormState } from 'react-hook-form';

// Подписка только на нужные части состояния
function SubmitButton() {
  const { isSubmitting, isDirty, isValid } = useFormState();

  return (
    <button
      type="submit"
      disabled={isSubmitting || !isDirty || !isValid}
    >
      {isSubmitting ? 'Отправка...' : 'Отправить'}
    </button>
  );
}
```

### Правила оптимизации

1. **Подписывайтесь глубже** — используйте `useWatch` в дочерних компонентах, а не в корне
2. **Избегайте watch без аргументов** — `watch()` подписывается на ВСЕ поля
3. **Используйте `register` вместо `Controller`** — когда возможно, для меньшего количества перерендеров
4. **Мемоизируйте колбеки** — оборачивайте `onSubmit` в `useCallback`

```tsx
// ❌ Плохо
const allValues = watch(); // Подписка на все поля

// ✅ Хорошо
const specificField = watch('email'); // Только одно поле
// или
const specificFields = watch(['email', 'password']); // Несколько полей
```

---

## Динамические формы (useFieldArray)

### Базовое использование

```tsx
import { useForm, useFieldArray } from 'react-hook-form';

interface FormData {
  users: {
    name: string;
    email: string;
  }[];
}

function DynamicForm() {
  const { control, register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      users: [{ name: '', email: '' }],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'users',
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      {fields.map((field, index) => (
        // ⚠️ Важно: используйте field.id, а не index как key!
        <div key={field.id}>
          <input {...register(`users.${index}.name`)} />
          <input {...register(`users.${index}.email`)} />
          <button type="button" onClick={() => remove(index)}>
            Удалить
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ name: '', email: '' })}
      >
        Добавить пользователя
      </button>

      <button type="submit">Отправить</button>
    </form>
  );
}
```

### Важные правила useFieldArray

1. **Используйте `field.id` как `key`**, а не `index` — предотвращает баги при перерендере
2. **Передавайте defaultValues при append** — объект не может быть пустым
3. **Уникальные имена** — каждый `useFieldArray` должен иметь уникальное имя

### Вложенные массивы

```tsx
interface FormData {
  projects: {
    name: string;
    tasks: {
      title: string;
      done: boolean;
    }[];
  }[];
}

function NestedArrayForm() {
  const { control, register } = useForm<FormData>();

  const { fields: projectFields, append: appendProject } = useFieldArray({
    control,
    name: 'projects',
  });

  return (
    <form>
      {projectFields.map((project, projectIndex) => (
        <ProjectItem
          key={project.id}
          index={projectIndex}
          control={control}
          register={register}
        />
      ))}
    </form>
  );
}

function ProjectItem({ index, control, register }) {
  const { fields: taskFields, append: appendTask } = useFieldArray({
    control,
    name: `projects.${index}.tasks`,
  });

  return (
    <div>
      <input {...register(`projects.${index}.name`)} />

      {taskFields.map((task, taskIndex) => (
        <div key={task.id}>
          <input {...register(`projects.${index}.tasks.${taskIndex}.title`)} />
        </div>
      ))}

      <button onClick={() => appendTask({ title: '', done: false })}>
        Добавить задачу
      </button>
    </div>
  );
}
```

---

## Обработка ошибок и серверная валидация

### Использование setError для серверных ошибок

```tsx
import { useForm } from 'react-hook-form';

function RegistrationForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();

        // Ошибка конкретного поля
        if (errorData.field === 'email') {
          setError('email', {
            type: 'server',
            message: errorData.message,
          });
        }

        // Глобальная ошибка формы
        setError('root.serverError', {
          type: 'server',
          message: 'Произошла ошибка при регистрации',
        });

        return;
      }

      // Успех
    } catch (error) {
      setError('root.serverError', {
        type: 'network',
        message: 'Ошибка сети. Попробуйте позже.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errors.root?.serverError && (
        <div className="error-banner">
          {errors.root.serverError.message}
        </div>
      )}

      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}
```

### Утилита для маппинга серверных ошибок

```tsx
import { UseFormSetError, FieldValues, Path } from 'react-hook-form';

interface ServerError {
  field: string;
  message: string;
}

export function mapServerErrors<T extends FieldValues>(
  errors: ServerError[],
  setError: UseFormSetError<T>
) {
  errors.forEach(({ field, message }) => {
    setError(field as Path<T>, {
      type: 'server',
      message,
    });
  });
}

// Использование
const onSubmit = async (data) => {
  const response = await submitForm(data);

  if (response.errors) {
    mapServerErrors(response.errors, setError);
  }
};
```

### Асинхронная валидация поля

```tsx
// Вариант 1: В схеме Zod
const schema = z.object({
  username: z.string().refine(
    async (username) => {
      const response = await checkUsername(username);
      return response.available;
    },
    { message: 'Имя пользователя занято' }
  ),
});

// Вариант 2: В register
<input
  {...register('username', {
    validate: async (value) => {
      const response = await checkUsername(value);
      return response.available || 'Имя пользователя занято';
    },
  })}
/>
```

---

## Тестирование

### Настройка окружения

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### Тестирование формы

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('should show validation errors', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    // Отправляем пустую форму
    await user.click(screen.getByRole('button', { name: /войти/i }));

    // Проверяем ошибки валидации
    await waitFor(() => {
      expect(screen.getByText(/обязательное поле/i)).toBeInTheDocument();
    });
  });

  it('should submit valid data', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/пароль/i), 'password123');
    await user.click(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('should show server error', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn().mockRejectedValue(new Error('Invalid credentials'));
    render(<LoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/пароль/i), 'wrongpassword');
    await user.click(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(screen.getByText(/неверные данные/i)).toBeInTheDocument();
    });
  });
});
```

### Рекомендации по тестированию

- Используйте `@testing-library/react` — рекомендовано официальной документацией
- Тестируйте поведение пользователя, а не внутреннюю реализацию
- Используйте `waitFor` для асинхронных операций
- Установите `eslint-plugin-testing-library` для лучших практик

---

## React 19 и Server Components

### Новые хуки React 19

React 19 представил новые хуки для работы с формами:

- `useActionState` — состояние действий формы
- `useFormStatus` — статус отправки формы
- `useOptimistic` — оптимистичные обновления

### Интеграция с Server Components

```tsx
// Серверный компонент для статичной части формы
// app/profile/page.tsx (Server Component)
import { ProfileForm } from './ProfileForm';
import { getUser } from '@/lib/db';

export default async function ProfilePage() {
  const user = await getUser();

  return (
    <div>
      <h1>Профиль</h1>
      <ProfileForm defaultValues={user} />
    </div>
  );
}

// Клиентский компонент для интерактивной формы
// app/profile/ProfileForm.tsx
'use client';

import { useForm } from 'react-hook-form';

export function ProfileForm({ defaultValues }) {
  const form = useForm({ defaultValues });
  // ...
}
```

### Совместимость с `useWatch`

В React 19 рекомендуется использовать `useWatch` вместо `watch` для значений, которые должны триггерить обновления UI.

---

## Чек-лист лучших практик

### Архитектура
- [ ] Выделять логику формы в кастомные хуки
- [ ] Использовать `FormProvider` для глубоко вложенных компонентов
- [ ] Группировать связанные поля в отдельные компоненты
- [ ] Хранить схемы валидации отдельно от компонентов

### Валидация
- [ ] Использовать схемную валидацию (Zod/Yup) вместо inline-правил
- [ ] Выбирать правильный `mode`: `onBlur` для UX, `onChange` для real-time
- [ ] Централизовать схемы для переиспользования

### Производительность
- [ ] Использовать `useWatch` вместо `watch` в дочерних компонентах
- [ ] Подписываться на конкретные поля, а не на всю форму
- [ ] Использовать `register` вместо `Controller` где возможно
- [ ] Добавить `shouldUnregister: false` для wizard-форм

### TypeScript
- [ ] Использовать `z.infer<typeof schema>` для типизации
- [ ] Создавать generic-компоненты для переиспользования
- [ ] Типизировать `Path<T>` для имён полей

### Обработка ошибок
- [ ] Использовать `setError('root.serverError', ...)` для глобальных ошибок
- [ ] Создать утилиту для маппинга серверных ошибок
- [ ] Обрабатывать сетевые ошибки отдельно

---

## Источники

- [React Hook Form — официальная документация](https://react-hook-form.com/)
- [React Hook Form — Advanced Usage](https://react-hook-form.com/advanced-usage)
- [GitHub — @hookform/resolvers](https://github.com/react-hook-form/resolvers)
- [Best Practices for Handling Forms in React (2025)](https://medium.com/@farzanekazemi8517/best-practices-for-handling-forms-in-react-2025-edition-62572b14452f)
- [Composable Form Handling in 2025](https://makersden.io/blog/composable-form-handling-in-2025-react-hook-form-tanstack-form-and-beyond)
- [Building Type-Safe Forms with React Hook Form](https://medium.com/@Yasirgaji/building-type-safe-forms-with-react-hook-form-a-pattern-based-approach-6a1ec37cf8f4)
- [The #1 Best Design Pattern for Managing Forms in React](https://dev.to/spencerpauly/the-1-best-design-pattern-for-managing-forms-in-react-4215)
- [How to create reusable form components with React Hook Forms and TypeScript](https://www.thisdot.co/blog/how-to-create-reusable-form-components-with-react-hook-forms-and-typescript)
- [React Hook Form: Understanding watch vs useWatch](https://dev.to/kcsujeet/react-hook-form-understanding-watch-vs-usewatch-l54)
- [Build a Multistep Form With React Hook Form](https://claritydev.net/blog/build-a-multistep-form-with-react-hook-form)
- [Building a reusable multi-step form with React Hook Form and Zod](https://blog.logrocket.com/building-reusable-multi-step-form-react-hook-form-zod/)
- [React Hook Form Server-side Validation](https://carlrippon.com/react-hook-form-server-validation/)
- [How to Validate Forms with Zod and React-Hook-Form](https://www.freecodecamp.org/news/react-form-validation-zod-react-hook-form/)
- [Zod validation with React Hook Form](https://www.contentful.com/blog/react-hook-form-validation-zod/)
- [shadcn/ui — React Hook Form](https://ui.shadcn.com/docs/forms/react-hook-form)
