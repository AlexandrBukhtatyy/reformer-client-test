import { z } from 'zod';

// Шаг 1: Тип страхования и основные параметры
export const step1Schema = z.object({
  insuranceType: z.enum(['casco', 'osago', 'property', 'life', 'travel'], {
    required_error: 'Выберите тип страхования',
  }),

  insurancePeriod: z.number({
    required_error: 'Выберите срок страхования',
  }),

  startDate: z
    .string()
    .min(1, 'Укажите дату начала действия полиса')
    .refine((date) => {
      if (!date) return false;
      const start = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return start >= today;
    }, 'Дата начала должна быть не раньше сегодняшнего дня'),

  coverageAmount: z
    .number({
      required_error: 'Укажите страховую сумму',
      invalid_type_error: 'Укажите страховую сумму',
    })
    .min(100000, 'Минимальная страховая сумма 100 000 ₽')
    .max(50000000, 'Максимальная страховая сумма 50 000 000 ₽')
    .nullable()
    .refine((val) => val !== null, 'Укажите страховую сумму'),

  deductible: z
    .number()
    .min(0, 'Франшиза не может быть отрицательной')
    .nullable()
    .optional(),

  paymentType: z.enum(['single', 'installments'], {
    required_error: 'Выберите способ оплаты',
  }),

  installments: z.number().nullable().optional(),
}).superRefine((data, ctx) => {
  // Если выбрана рассрочка, количество платежей обязательно
  if (data.paymentType === 'installments' && !data.installments) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Выберите количество платежей',
      path: ['installments'],
    });
  }
});

export type Step1Data = z.infer<typeof step1Schema>;
