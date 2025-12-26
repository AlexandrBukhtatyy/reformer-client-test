import { z } from 'zod';

// Шаг 6: Расчет и подтверждение
export const step6Schema = z.object({
  // Вычисляемые поля (только для чтения)
  basePremium: z.number().nullable(),
  ageCoefficient: z.number().nullable(),
  experienceCoefficient: z.number().nullable(),
  regionCoefficient: z.number().nullable(),
  claimsCoefficient: z.number().nullable(),
  deductibleDiscount: z.number().nullable(),
  promoDiscount: z.number().nullable(),
  multiPolicyDiscount: z.number().nullable(),
  totalPremium: z.number().nullable(),
  installmentAmount: z.number().nullable(),

  // Согласия
  agreePersonalData: z
    .boolean()
    .refine((val) => val === true, 'Необходимо согласие на обработку персональных данных'),

  agreeTerms: z
    .boolean()
    .refine((val) => val === true, 'Необходимо согласие с правилами страхования'),

  agreeElectronicPolicy: z
    .boolean()
    .refine((val) => val === true, 'Необходимо согласие на электронный полис'),

  agreeMarketing: z.boolean(),

  confirmAccuracy: z
    .boolean()
    .refine((val) => val === true, 'Необходимо подтверждение достоверности данных'),

  electronicSignature: z
    .string()
    .min(1, 'Введите код подтверждения')
    .regex(/^\d{6}$/, 'Код должен содержать 6 цифр'),
});

export type Step6Data = z.infer<typeof step6Schema>;
