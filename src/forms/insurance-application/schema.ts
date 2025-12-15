import type { FormSchema } from '@reformer/core';
import type { InsuranceApplicationForm } from './type';
import { insuranceTypeSchema } from './steps/insurance-type/schema';
import { insuredPartySchema } from './steps/insured-party/schema';
import { insuranceObjectSchema } from './steps/insurance-object/schema';
import { driversBeneficiariesSchema } from './steps/drivers-beneficiaries/schema';
import { historySchema } from './steps/history/schema';
import { confirmationSchema } from './steps/confirmation/schema';

export const insuranceApplicationSchema: FormSchema<InsuranceApplicationForm> = {
  // Шаг 1: Тип страхования
  ...insuranceTypeSchema,

  // Шаг 2: Данные страхователя
  ...insuredPartySchema,

  // Шаг 3: Объект страхования
  ...insuranceObjectSchema,

  // Шаг 4: Водители/Выгодоприобретатели
  ...driversBeneficiariesSchema,

  // Шаг 5: История
  ...historySchema,

  // Шаг 6: Подтверждение
  ...confirmationSchema,
};
