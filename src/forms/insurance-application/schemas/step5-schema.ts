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

// Define the interfaces for step 5 data
interface Claim {
  date: string; // YYYY-MM-DD
  type: "accident" | "theft" | "damage" | "disaster" | "medical" | "other";
  description: string;
  amount: number | undefined;
  atFault: boolean;
}

export interface Step5Data {
  hasPreviousInsurance: boolean;
  previousInsurer: string;
  previousPolicyNumber: string;
  previousPolicyEndDate: string; // YYYY-MM-DD
  hadClaims: boolean;
  claims: Claim[];
  promoCode: string;
  referralSource: "internet" | "friend" | "tv" | "agent" | "other";
  agentCode: string;
  additionalNotes: string;
}

// Schema for the form fields
export const step5Schema = {
  hasPreviousInsurance: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: "Был ли полис ранее",
    },
  },
  previousInsurer: {
    value: "",
    component: Input,
    componentProps: {
      label: "Предыдущий страховщик",
      placeholder: "Название компании",
    },
  },
  previousPolicyNumber: {
    value: "",
    component: Input,
    componentProps: {
      label: "Номер предыдущего полиса",
      placeholder: "XXX-000000",
    },
  },
  previousPolicyEndDate: {
    value: "",
    component: Input,
    componentProps: {
      label: "Дата окончания предыдущего полиса",
      type: "date",
    },
  },
  hadClaims: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: "Были ли страховые случаи",
    },
  },
  claims: [
    {
      date: {
        value: "",
        component: Input,
        componentProps: {
          label: "Дата события",
          type: "date",
        },
      },
      type: {
        value: "accident",
        component: Select,
        componentProps: {
          label: "Тип события",
          options: [
            { value: "accident", label: "ДТП" },
            { value: "theft", label: "Угон/кража" },
            { value: "damage", label: "Повреждение" },
            { value: "disaster", label: "Стихийное бедствие" },
            { value: "medical", label: "Медицинский случай" },
            { value: "other", label: "Другое" },
          ],
        },
      },
      description: {
        value: "",
        component: Textarea,
        componentProps: {
          label: "Описание",
          placeholder: "Опишите событие",
        },
      },
      amount: {
        value: undefined,
        component: Input,
        componentProps: {
          label: "Сумма выплаты (₽)",
          type: "number",
          placeholder: "100000",
        },
      },
      atFault: {
        value: false,
        component: Checkbox,
        componentProps: {
          label: "По вине страхователя",
        },
      },
    },
  ],
  promoCode: {
    value: "",
    component: Input,
    componentProps: {
      label: "Промокод",
      placeholder: "PROMO2024",
    },
  },
  referralSource: {
    value: "internet",
    component: Select,
    componentProps: {
      label: "Откуда узнали о нас",
      options: [
        { value: "internet", label: "Интернет" },
        { value: "friend", label: "Рекомендации друзей" },
        { value: "tv", label: "Телевидение" },
        { value: "agent", label: "Страховой агент" },
        { value: "other", label: "Другое" },
      ],
    },
  },
  agentCode: {
    value: "",
    component: Input,
    componentProps: {
      label: "Код агента",
      placeholder: "AGT-000",
    },
  },
  additionalNotes: {
    value: "",
    component: Textarea,
    componentProps: {
      label: "Дополнительные комментарии",
      placeholder: "Ваши пожелания...",
    },
  },
};

// Validation schema for step 5
export const step5Validation: ValidationSchemaFn<Step5Data> = (path) => {
  // Validate previous insurance fields conditionally
  applyWhen(
    path.hasPreviousInsurance,
    (hasPrevious) => hasPrevious === true,
    (p) => {
      required(p.previousInsurer, {
        message: "Предыдущий страховщик обязателен",
      });
      required(p.previousPolicyNumber, {
        message: "Номер предыдущего полиса обязателен",
      });
      date(p.previousPolicyEndDate, {
        message: "Некорректная дата окончания предыдущего полиса",
      });
    }
  );

  // Validate claims conditionally
  applyWhen(
    path.hadClaims,
    (hadClaims) => hadClaims === true,
    (p) => {
      // Each claim in the array should be validated
      // This would require array validation which is complex in ReFormer
    }
  );

  // Validate promo code format if provided
  // Validate referral source
  // Validate agent code format if provided
};

// Behavior schema for step 5
export const step5Behavior: BehaviorSchemaFn<Step5Data> = (path) => {
  // Reset previous insurance fields when checkbox is unchecked
  watchField(
    path.hasPreviousInsurance,
    (value: boolean, ctx) => {
      if (!value) {
        ctx.setFieldValue("previousInsurer", "");
        ctx.setFieldValue("previousPolicyNumber", "");
        ctx.setFieldValue("previousPolicyEndDate", "");
      }
    },
    { immediate: false }
  );

  // Reset claims array when checkbox is unchecked
  watchField(
    path.hadClaims,
    (value: boolean, ctx) => {
      if (!value) {
        // In a real implementation, you would clear the claims array
        // This would require access to array operations
      }
    },
    { immediate: false }
  );
};
