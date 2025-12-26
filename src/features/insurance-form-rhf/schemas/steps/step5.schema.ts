import { z } from 'zod';

// Страховой случай
const claimSchema = z.object({
  id: z.string(),
  date: z.string().min(1, 'Укажите дату события'),
  type: z.enum(['accident', 'theft', 'damage', 'natural_disaster', 'medical', 'other']),
  description: z.string().min(1, 'Опишите событие'),
  amount: z.number().min(0, 'Сумма не может быть отрицательной').nullable(),
  atFault: z.boolean(),
});

// Шаг 5: История и дополнительная информация
export const step5Schema = z.object({
  hasPreviousInsurance: z.boolean(),
  previousInsurer: z.string(),
  previousPolicyNumber: z.string(),
  previousPolicyEndDate: z.string(),
  hadClaims: z.boolean(),
  claims: z.array(claimSchema),
  promoCode: z.string(),
  referralSource: z.enum(['internet', 'friends', 'tv', 'agent', 'other']),
  agentCode: z.string(),
  additionalNotes: z.string(),
}).superRefine((data, ctx) => {
  // Если был предыдущий полис, требуется информация о нем
  if (data.hasPreviousInsurance) {
    if (!data.previousInsurer) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Укажите предыдущего страховщика',
        path: ['previousInsurer'],
      });
    }
    if (!data.previousPolicyNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Укажите номер предыдущего полиса',
        path: ['previousPolicyNumber'],
      });
    }
  }

  // Если были страховые случаи, требуется информация о них
  if (data.hadClaims && data.claims.length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Добавьте информацию о страховых случаях',
      path: ['claims'],
    });
  }
});

export type Step5Data = z.infer<typeof step5Schema>;
