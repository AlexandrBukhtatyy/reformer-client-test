import { required, min, max, email, pattern } from "@reformer/core/validators";
import { applyWhen } from "@reformer/core/validators";
import { watchField } from "@reformer/core/behaviors";
import type { ValidationSchemaFn, BehaviorSchemaFn } from "@reformer/core";
import { date } from "@reformer/core/validators";
import { Input } from "../../../components/ui/input";
import { Select } from "../../../components/ui/select";
import { RadioGroup } from "../../../components/ui/radio-group";
import { Checkbox } from "../../../components/ui/checkbox";
import { Textarea } from "../../../components/ui/textarea";

// Define the interface for step 6 data
export interface Step6Data {
  // Calculated fields
  basePremium: number | undefined; // computed
  ageCoefficient: number | undefined; // computed
  experienceCoefficient: number | undefined; // computed
  regionCoefficient: number | undefined; // computed
  claimsCoefficient: number | undefined; // computed
  deductibleDiscount: number | undefined; // computed
  promoDiscount: number | undefined; // computed
  multiPolicyDiscount: number | undefined; // computed
  totalPremium: number | undefined; // computed
  installmentAmount: number | undefined; // computed

  // Agreements
  agreePersonalData: boolean;
  agreeTerms: boolean;
  agreeElectronicPolicy: boolean;
  agreeMarketing: boolean;
  confirmAccuracy: boolean;

  // Confirmation
  electronicSignature: string;
}

// Schema for the form fields
export const step6Schema = {
  // Calculated fields (read-only)
  basePremium: {
    value: undefined,
    component: Input,
    componentProps: {
      label: "Базовая премия (₽)",
      type: "number",
      disabled: true,
    },
  },
  ageCoefficient: {
    value: undefined,
    component: Input,
    componentProps: {
      label: "Коэффициент возраста",
      type: "number",
      disabled: true,
    },
  },
  experienceCoefficient: {
    value: undefined,
    component: Input,
    componentProps: {
      label: "Коэффициент стажа",
      type: "number",
      disabled: true,
    },
  },
  regionCoefficient: {
    value: undefined,
    component: Input,
    componentProps: {
      label: "Региональный коэффициент",
      type: "number",
      disabled: true,
    },
  },
  claimsCoefficient: {
    value: undefined,
    component: Input,
    componentProps: {
      label: "Коэффициент аварийности (КБМ)",
      type: "number",
      disabled: true,
    },
  },
  deductibleDiscount: {
    value: undefined,
    component: Input,
    componentProps: {
      label: "Скидка за франшизу (%)",
      type: "number",
      disabled: true,
    },
  },
  promoDiscount: {
    value: undefined,
    component: Input,
    componentProps: {
      label: "Скидка по промокоду (%)",
      type: "number",
      disabled: true,
    },
  },
  multiPolicyDiscount: {
    value: undefined,
    component: Input,
    componentProps: {
      label: "Скидка за комплексное страхование (%)",
      type: "number",
      disabled: true,
    },
  },
  totalPremium: {
    value: undefined,
    component: Input,
    componentProps: {
      label: "Итоговая премия (₽)",
      type: "number",
      disabled: true,
    },
  },
  installmentAmount: {
    value: undefined,
    component: Input,
    componentProps: {
      label: "Сумма платежа (₽)",
      type: "number",
      disabled: true,
    },
  },

  // Agreements
  agreePersonalData: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: "Согласие на обработку персональных данных",
    },
  },
  agreeTerms: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: "Согласие с правилами страхования",
    },
  },
  agreeElectronicPolicy: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: "Согласие на электронный полис",
    },
  },
  agreeMarketing: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: "Согласие на рекламу",
    },
  },
  confirmAccuracy: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: "Подтверждение достоверности данных",
    },
  },

  // Confirmation
  electronicSignature: {
    value: "",
    component: Input,
    componentProps: {
      label: "SMS-код подтверждения",
      placeholder: "000000",
    },
  },
};

// Validation schema for step 6
export const step6Validation: ValidationSchemaFn<Step6Data> = (path) => {
  // All agreement checkboxes are required
  required(path.agreePersonalData, {
    message: "Необходимо согласие на обработку персональных данных",
  });
  required(path.agreeTerms, {
    message: "Необходимо согласие с правилами страхования",
  });
  required(path.agreeElectronicPolicy, {
    message: "Необходимо согласие на электронный полис",
  });
  required(path.confirmAccuracy, {
    message: "Необходимо подтверждение достоверности данных",
  });

  // Electronic signature is required and must be 6 digits
  required(path.electronicSignature, {
    message: "SMS-код подтверждения обязателен",
  });
  pattern(path.electronicSignature, /^\d{6}$/, {
    message: "SMS-код должен содержать 6 цифр",
  });
};

// Behavior schema for step 6
export const step6Behavior: BehaviorSchemaFn<Step6Data> = (path) => {
  // Behavior for calculated fields would be implemented in the main form component
  // as they depend on data from previous steps
};
