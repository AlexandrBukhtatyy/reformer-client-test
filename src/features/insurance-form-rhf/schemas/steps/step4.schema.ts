import { z } from 'zod';

// Водитель
const driverSchema = z.object({
  id: z.string(),
  fullName: z.string().min(1, 'Укажите ФИО водителя'),
  birthDate: z.string().min(1, 'Укажите дату рождения'),
  licenseNumber: z.string().min(1, 'Укажите номер ВУ'),
  licenseIssueDate: z.string().min(1, 'Укажите дату выдачи ВУ'),
  drivingExperience: z.number().nullable(),
  accidentsCount: z.number().min(0, 'Количество ДТП не может быть отрицательным'),
  isMainDriver: z.boolean(),
});

// Выгодоприобретатель
const beneficiarySchema = z.object({
  id: z.string(),
  fullName: z.string().min(1, 'Укажите ФИО'),
  birthDate: z.string().min(1, 'Укажите дату рождения'),
  relationship: z.enum(['spouse', 'child', 'parent', 'sibling', 'other']),
  share: z
    .number()
    .min(1, 'Доля должна быть от 1 до 100%')
    .max(100, 'Доля должна быть от 1 до 100%')
    .nullable()
    .refine((val) => val !== null, 'Укажите долю'),
  phone: z.string().min(1, 'Укажите телефон'),
});

// Шаг 4: Водители и выгодоприобретатели
export const step4Schema = z.object({
  drivers: z.array(driverSchema),
  unlimitedDrivers: z.boolean(),
  minDriverAge: z.number().nullable(),
  minDriverExperience: z.number().nullable(),
  beneficiaries: z.array(beneficiarySchema),
  totalBeneficiaryShare: z.number().nullable(),
  // Для контекстной валидации
  insuranceType: z.enum(['casco', 'osago', 'property', 'life', 'travel']).optional(),
}).superRefine((data, ctx) => {
  const type = data.insuranceType;

  // Валидация для КАСКО/ОСАГО
  if ((type === 'casco' || type === 'osago') && !data.unlimitedDrivers) {
    if (data.drivers.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Добавьте хотя бы одного водителя или выберите неограниченное количество',
        path: ['drivers'],
      });
    }

    // Проверка возраста водителей
    data.drivers.forEach((driver, index) => {
      if (driver.birthDate) {
        const birth = new Date(driver.birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
          age--;
        }
        if (age < 18) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Водитель должен быть старше 18 лет',
            path: ['drivers', index, 'birthDate'],
          });
        }
      }
    });
  }

  // Валидация для страхования жизни
  if (type === 'life') {
    if (data.beneficiaries.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Добавьте хотя бы одного выгодоприобретателя',
        path: ['beneficiaries'],
      });
    }

    // Проверка суммы долей
    const totalShare = data.beneficiaries.reduce((sum, b) => sum + (b.share || 0), 0);
    if (data.beneficiaries.length > 0 && totalShare !== 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Сумма долей должна быть равна 100% (сейчас ${totalShare}%)`,
        path: ['totalBeneficiaryShare'],
      });
    }
  }
});

export type Step4Data = z.infer<typeof step4Schema>;
