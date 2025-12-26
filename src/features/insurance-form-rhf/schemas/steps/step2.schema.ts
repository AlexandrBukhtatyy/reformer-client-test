import { z } from 'zod';

// Персональные данные
const personalDataSchema = z.object({
  lastName: z.string().min(1, 'Укажите фамилию'),
  firstName: z.string().min(1, 'Укажите имя'),
  middleName: z.string().optional(),
  birthDate: z.string().min(1, 'Укажите дату рождения'),
  gender: z.enum(['male', 'female']),
});

// Данные компании
const companyDataSchema = z.object({
  name: z.string().min(1, 'Укажите название организации'),
  inn: z
    .string()
    .min(1, 'Укажите ИНН')
    .regex(/^\d{10}$/, 'ИНН должен содержать 10 цифр'),
  ogrn: z
    .string()
    .min(1, 'Укажите ОГРН')
    .regex(/^\d{13}$/, 'ОГРН должен содержать 13 цифр'),
  kpp: z
    .string()
    .min(1, 'Укажите КПП')
    .regex(/^\d{9}$/, 'КПП должен содержать 9 цифр'),
  ceoName: z.string().min(1, 'Укажите ФИО руководителя'),
});

// Паспортные данные
const passportDataSchema = z.object({
  series: z
    .string()
    .min(1, 'Укажите серию паспорта')
    .regex(/^\d{2}\s?\d{2}$/, 'Формат серии: 00 00'),
  number: z
    .string()
    .min(1, 'Укажите номер паспорта')
    .regex(/^\d{6}$/, 'Номер должен содержать 6 цифр'),
  issueDate: z.string().min(1, 'Укажите дату выдачи'),
  issuedBy: z.string().min(1, 'Укажите кем выдан паспорт'),
});

// Шаг 2: Данные страхователя
export const step2Schema = z.object({
  insuredType: z.enum(['individual', 'corporate'], {
    required_error: 'Выберите тип страхователя',
  }),

  personalData: personalDataSchema.optional(),
  companyData: companyDataSchema.optional(),
  passportData: passportDataSchema.optional(),

  phone: z
    .string()
    .min(1, 'Укажите телефон')
    .regex(/^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/, 'Формат: +7 (000) 000-00-00'),

  email: z
    .string()
    .min(1, 'Укажите email')
    .email('Некорректный email'),
}).superRefine((data, ctx) => {
  // Валидация для физического лица
  if (data.insuredType === 'individual') {
    if (!data.personalData?.lastName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Укажите фамилию',
        path: ['personalData', 'lastName'],
      });
    }
    if (!data.personalData?.firstName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Укажите имя',
        path: ['personalData', 'firstName'],
      });
    }
    if (!data.personalData?.birthDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Укажите дату рождения',
        path: ['personalData', 'birthDate'],
      });
    }
    if (!data.passportData?.series) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Укажите серию паспорта',
        path: ['passportData', 'series'],
      });
    }
    if (!data.passportData?.number) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Укажите номер паспорта',
        path: ['passportData', 'number'],
      });
    }
  }

  // Валидация для юридического лица
  if (data.insuredType === 'corporate') {
    if (!data.companyData?.name) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Укажите название организации',
        path: ['companyData', 'name'],
      });
    }
    if (!data.companyData?.inn) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Укажите ИНН',
        path: ['companyData', 'inn'],
      });
    }
  }
});

export type Step2Data = z.infer<typeof step2Schema>;
