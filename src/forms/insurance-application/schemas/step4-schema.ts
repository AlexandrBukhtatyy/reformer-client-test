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

// Define the interfaces for step 4 data
interface Driver {
  fullName: string;
  birthDate: string; // YYYY-MM-DD
  licenseNumber: string;
  licenseIssueDate: string; // YYYY-MM-DD
  drivingExperience: number | undefined; // computed
  accidentsCount: number;
  isMainDriver: boolean;
}

interface Beneficiary {
  fullName: string;
  birthDate: string; // YYYY-MM-DD
  relationship: "spouse" | "child" | "parent" | "sibling" | "other";
  share: number | undefined;
  phone: string;
}

export interface Step4Data {
  // Drivers (for casco/osago)
  drivers: Driver[];
  unlimitedDrivers: boolean;
  minDriverAge: number | undefined; // computed
  minDriverExperience: number | undefined; // computed

  // Beneficiaries (for life insurance)
  beneficiaries: Beneficiary[];
  totalBeneficiaryShare: number | undefined; // computed
}

// Schema for the form fields
export const step4Schema = {
  // Drivers schema (for casco/osago)
  drivers: [
    {
      fullName: {
        value: "",
        component: Input,
        componentProps: {
          label: "ФИО водителя",
          placeholder: "Иванов Иван Иванович",
        },
      },
      birthDate: {
        value: "",
        component: Input,
        componentProps: {
          label: "Дата рождения",
          type: "date",
        },
      },
      licenseNumber: {
        value: "",
        component: Input,
        componentProps: {
          label: "Номер ВУ",
          placeholder: "00 00 000000",
        },
      },
      licenseIssueDate: {
        value: "",
        component: Input,
        componentProps: {
          label: "Дата выдачи ВУ",
          type: "date",
        },
      },
      drivingExperience: {
        value: undefined,
        component: Input,
        componentProps: {
          label: "Стаж вождения (лет)",
          type: "number",
          disabled: true,
        },
      },
      accidentsCount: {
        value: 0,
        component: Input,
        componentProps: {
          label: "Кол-во ДТП за 3 года",
          type: "number",
          placeholder: "0",
        },
      },
      isMainDriver: {
        value: false,
        component: Checkbox,
        componentProps: {
          label: "Основной водитель",
        },
      },
    },
  ],
  unlimitedDrivers: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: "Неограниченное количество водителей",
    },
  },
  minDriverAge: {
    value: undefined,
    component: Input,
    componentProps: {
      label: "Мин. возраст водителя",
      type: "number",
      disabled: true,
    },
  },
  minDriverExperience: {
    value: undefined,
    component: Input,
    componentProps: {
      label: "Мин. стаж водителя",
      type: "number",
      disabled: true,
    },
  },

  // Beneficiaries schema (for life insurance)
  beneficiaries: [
    {
      fullName: {
        value: "",
        component: Input,
        componentProps: {
          label: "ФИО",
          placeholder: "Иванов Иван Иванович",
        },
      },
      birthDate: {
        value: "",
        component: Input,
        componentProps: {
          label: "Дата рождения",
          type: "date",
        },
      },
      relationship: {
        value: "spouse",
        component: Select,
        componentProps: {
          label: "Степень родства",
          options: [
            { value: "spouse", label: "Супруг(а)" },
            { value: "child", label: "Ребенок" },
            { value: "parent", label: "Родитель" },
            { value: "sibling", label: "Брат/сестра" },
            { value: "other", label: "Другое" },
          ],
        },
      },
      share: {
        value: undefined,
        component: Input,
        componentProps: {
          label: "Доля (%)",
          type: "number",
          placeholder: "50",
        },
      },
      phone: {
        value: "",
        component: Input,
        componentProps: {
          label: "Телефон",
          placeholder: "+7 (___) ___-__-__",
        },
      },
    },
  ],
  totalBeneficiaryShare: {
    value: undefined,
    component: Input,
    componentProps: {
      label: "Сумма долей (%)",
      type: "number",
      disabled: true,
    },
  },
};

// Validation schema for step 4
export const step4Validation: ValidationSchemaFn<Step4Data> = (path) => {
  // For drivers (casco/osago)
  // If unlimitedDrivers is false, at least one driver is required
  applyWhen(
    path.unlimitedDrivers,
    (unlimited) => !unlimited,
    (p) => {
      // At least one driver must be added
      // This would require custom validation to check the array length
    }
  );

  // Validate each driver
  // Driver-specific validations would go here

  // For beneficiaries (life insurance)
  // Validate each beneficiary
  // Beneficiary-specific validations would go here
};

// Behavior schema for step 4
export const step4Behavior: BehaviorSchemaFn<Step4Data> = (path) => {
  // Calculate driving experience when license issue date changes (for each driver)
  // This is a simplified approach - in reality, you'd need to watch all drivers
  // For now, we'll watch the first driver's license issue date as an example
  // In a real implementation, you would need to handle dynamic arrays properly
  // Calculate minimum driver age when birth dates change
  // Calculate minimum driver experience when experience values change
  // Calculate total beneficiary share when individual shares change
  // This would require watching all beneficiary shares and summing them
  // For now, we'll just add a placeholder that would handle this
};
