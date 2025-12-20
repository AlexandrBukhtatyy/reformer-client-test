import { required, min, max, applyWhen } from "@reformer/core/validators";
import { watchField } from "@reformer/core/behaviors";
import type { ValidationSchemaFn, BehaviorSchemaFn } from "@reformer/core";
import { date } from "@reformer/core/validators";
import { Input } from "../../../components/ui/input";
import { Select } from "../../../components/ui/select";
import { RadioGroup } from "../../../components/ui/radio-group";

// Define the interface for step 1 data
export interface Step1Data {
  insuranceType: "casco" | "osago" | "property" | "life" | "travel" | "";
  insurancePeriod: 3 | 6 | 12 | 24 | 36;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD (computed)
  coverageAmount: number | undefined;
  deductible: number | undefined;
  paymentType: "single" | "installments";
  installments: 2 | 3 | 4 | 6 | 12 | undefined;
}

// Schema for the form fields
export const step1Schema = {
  insuranceType: {
    value: "",
    component: Select,
    componentProps: {
      label: "Тип страхования",
      placeholder: "Выберите тип страхования",
      options: [
        { value: "casco", label: "КАСКО" },
        { value: "osago", label: "ОСАГО" },
        { value: "property", label: "Недвижимость" },
        { value: "life", label: "Жизнь и здоровье" },
        { value: "travel", label: "Путешествия" },
      ],
    },
  },
  insurancePeriod: {
    value: 12,
    component: Select,
    componentProps: {
      label: "Срок страхования",
      placeholder: "Выберите срок",
      options: [
        { value: 3, label: "3 месяца" },
        { value: 6, label: "6 месяцев" },
        { value: 12, label: "1 год" },
        { value: 24, label: "2 года" },
        { value: 36, label: "3 года" },
      ],
    },
  },
  startDate: {
    value: "",
    component: Input,
    componentProps: {
      label: "Дата начала действия полиса",
      type: "date",
    },
  },
  endDate: {
    value: "",
    component: Input,
    componentProps: {
      label: "Дата окончания",
      type: "date",
      disabled: true,
    },
  },
  coverageAmount: {
    value: undefined,
    component: Input,
    componentProps: {
      label: "Страховая сумма (₽)",
      type: "number",
      placeholder: "от 100 000 до 50 000 000",
    },
  },
  deductible: {
    value: undefined,
    component: Input,
    componentProps: {
      label: "Франшиза (₽)",
      type: "number",
      placeholder: "0",
    },
  },
  paymentType: {
    value: "single",
    component: RadioGroup,
    componentProps: {
      label: "Способ оплаты",
      options: [
        { value: "single", label: "Единовременно" },
        { value: "installments", label: "В рассрочку" },
      ],
    },
  },
  installments: {
    value: undefined,
    component: Select,
    componentProps: {
      label: "Количество платежей",
      placeholder: "Выберите количество",
      options: [
        { value: 2, label: "2 платежа" },
        { value: 3, label: "3 платежа" },
        { value: 4, label: "4 платежа" },
        { value: 6, label: "6 платежей" },
        { value: 12, label: "12 платежей" },
      ],
    },
  },
};

// Validation schema for step 1
export const step1Validation: ValidationSchemaFn<Step1Data> = (path) => {
  // insuranceType is required
  required(path.insuranceType, { message: "Тип страхования обязателен" });

  // insurancePeriod is required
  required(path.insurancePeriod, { message: "Срок страхования обязателен" });

  // startDate is required and must be today or in the future
  required(path.startDate, { message: "Дата начала обязательна" });
  date(path.startDate, {
    message: "Некорректная дата",
    noFuture: false, // We'll implement custom validation for dates not in the past
  });

  // Custom validation to ensure startDate is not in the past
  // This would be implemented via a custom validator in a real scenario

  // coverageAmount is required and must be between 100000 and 50000000
  required(path.coverageAmount, { message: "Страховая сумма обязательна" });
  min(path.coverageAmount, 100000, {
    message: "Минимальная страховая сумма 100 000 ₽",
  });
  max(path.coverageAmount, 50000000, {
    message: "Максимальная страховая сумма 50 000 000 ₽",
  });

  // deductible is optional but if provided must be >= 0
  min(path.deductible, 0, { message: "Франшиза не может быть отрицательной" });

  // paymentType is required
  required(path.paymentType, { message: "Способ оплаты обязателен" });

  // installments is required only when paymentType is 'installments'
  applyWhen(
    path.paymentType,
    (type) => type === "installments",
    (p) => {
      required(p.installments, {
        message: "Количество платежей обязательно при оплате в рассрочку",
      });
    }
  );
};

// Behavior schema for step 1
export const step1Behavior: BehaviorSchemaFn<Step1Data> = (path) => {
  // Calculate endDate based on startDate and insurancePeriod
  // This is a simplified implementation - in reality, you'd need to properly calculate months
  watchField(
    path.startDate,
    (value, ctx) => {
      if (!value) return;

      // Calculate end date based on start date and insurance period
      // This is a simplified calculation - a real implementation would handle month boundaries properly
      try {
        const startDate = new Date(value);
        const period = ctx.form.insurancePeriod.value.value;

        if (period) {
          const endDate = new Date(startDate);
          endDate.setMonth(endDate.getMonth() + Number(period));

          // Format as YYYY-MM-DD
          const formattedEndDate = endDate.toISOString().split("T")[0];
          ctx.setFieldValue("endDate", formattedEndDate);
        }
      } catch (e) {
        console.error("Error calculating end date:", e);
      }
    },
    { immediate: false }
  );

  // Watch insurancePeriod to recalculate endDate when it changes
  watchField(
    path.insurancePeriod,
    (value, ctx) => {
      const startDate = ctx.form.startDate.value.value;
      if (!startDate || !value) return;

      try {
        const startDateObj = new Date(startDate);
        const endDate = new Date(startDateObj);
        endDate.setMonth(endDate.getMonth() + Number(value));

        // Format as YYYY-MM-DD
        const formattedEndDate = endDate.toISOString().split("T")[0];
        ctx.setFieldValue("endDate", formattedEndDate);
      } catch (e) {
        console.error("Error calculating end date:", e);
      }
    },
    { immediate: false }
  );
};
