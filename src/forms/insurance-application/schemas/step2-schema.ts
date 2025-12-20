import { required, email, pattern } from "@reformer/core/validators";
import { applyWhen } from "@reformer/core/validators";
import { watchField } from "@reformer/core/behaviors";
import type { ValidationSchemaFn, BehaviorSchemaFn } from "@reformer/core";
import { date } from "@reformer/core/validators";
import { Input } from "../../../components/ui/input";
import { Select } from "../../../components/ui/select";
import { RadioGroup } from "../../../components/ui/radio-group";
import { Checkbox } from "../../../components/ui/checkbox";
import { Textarea } from "../../../components/ui/textarea";

// Define the interfaces for step 2 data
interface PersonalData {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string; // YYYY-MM-DD
  gender: "male" | "female";
}

interface CompanyData {
  name: string;
  inn: string;
  ogrn: string;
  kpp: string;
  ceoName: string;
}

interface PassportData {
  series: string;
  number: string;
  issueDate: string; // YYYY-MM-DD
  issuedBy: string;
}

export interface Step2Data {
  insuredType: "individual" | "company";
  personalData: PersonalData;
  companyData: CompanyData;
  passportData: PassportData;
  phone: string;
  email: string;
  fullName: string; // computed
  age: number | undefined; // computed
}

// Schema for the form fields
export const step2Schema = {
  insuredType: {
    value: "individual",
    component: RadioGroup,
    componentProps: {
      label: "Тип страхователя",
      options: [
        { value: "individual", label: "Физическое лицо" },
        { value: "company", label: "Юридическое лицо" },
      ],
    },
  },
  personalData: {
    lastName: {
      value: "",
      component: Input,
      componentProps: {
        label: "Фамилия",
        placeholder: "Введите фамилию",
      },
    },
    firstName: {
      value: "",
      component: Input,
      componentProps: {
        label: "Имя",
        placeholder: "Введите имя",
      },
    },
    middleName: {
      value: "",
      component: Input,
      componentProps: {
        label: "Отчество",
        placeholder: "Введите отчество",
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
    gender: {
      value: "male",
      component: RadioGroup,
      componentProps: {
        label: "Пол",
        options: [
          { value: "male", label: "Мужской" },
          { value: "female", label: "Женский" },
        ],
      },
    },
  },
  companyData: {
    name: {
      value: "",
      component: Input,
      componentProps: {
        label: "Название организации",
        placeholder: 'ООО "Компания"',
      },
    },
    inn: {
      value: "",
      component: Input,
      componentProps: {
        label: "ИНН организации",
        placeholder: "1234567890",
      },
    },
    ogrn: {
      value: "",
      component: Input,
      componentProps: {
        label: "ОГРН",
        placeholder: "1234567890123",
      },
    },
    kpp: {
      value: "",
      component: Input,
      componentProps: {
        label: "КПП",
        placeholder: "123456789",
      },
    },
    ceoName: {
      value: "",
      component: Input,
      componentProps: {
        label: "ФИО руководителя",
        placeholder: "Иванов Иван Иванович",
      },
    },
  },
  passportData: {
    series: {
      value: "",
      component: Input,
      componentProps: {
        label: "Серия паспорта",
        placeholder: "12 34",
      },
    },
    number: {
      value: "",
      component: Input,
      componentProps: {
        label: "Номер паспорта",
        placeholder: "123456",
      },
    },
    issueDate: {
      value: "",
      component: Input,
      componentProps: {
        label: "Дата выдачи",
        type: "date",
      },
    },
    issuedBy: {
      value: "",
      component: Input,
      componentProps: {
        label: "Кем выдан",
        placeholder: "Отделением УФМС...",
      },
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
  email: {
    value: "",
    component: Input,
    componentProps: {
      label: "Email",
      type: "email",
      placeholder: "example@mail.com",
    },
  },
  fullName: {
    value: "",
    component: Input,
    componentProps: {
      label: "Полное имя (ФИО)",
      disabled: true,
    },
  },
  age: {
    value: undefined,
    component: Input,
    componentProps: {
      label: "Возраст",
      type: "number",
      disabled: true,
    },
  },
};

// Validation schema for step 2
export const step2Validation: ValidationSchemaFn<Step2Data> = (path) => {
  // insuredType is required
  required(path.insuredType, { message: "Тип страхователя обязателен" });

  // Conditional validation based on insuredType
  // For individual
  applyWhen(
    path.insuredType,
    (type) => type === "individual",
    (p) => {
      // Personal data validation
      required(p.personalData.lastName, {
        message: "Фамилия обязательна для физического лица",
      });
      required(p.personalData.firstName, {
        message: "Имя обязательно для физического лица",
      });
      date(p.personalData.birthDate, { message: "Некорректная дата рождения" });
      required(p.personalData.gender, { message: "Пол обязателен" });

      // Passport data validation
      required(p.passportData.series, {
        message: "Серия паспорта обязательна",
      });
      required(p.passportData.number, { message: "Номер паспорта обязателен" });
      date(p.passportData.issueDate, {
        message: "Некорректная дата выдачи паспорта",
      });
      required(p.passportData.issuedBy, {
        message: "Кем выдан паспорт обязателен",
      });
    }
  );

  // For company
  applyWhen(
    path.insuredType,
    (type) => type === "company",
    (p) => {
      // Company data validation
      required(p.companyData.name, {
        message: "Название организации обязательно",
      });
      required(p.companyData.inn, { message: "ИНН обязателен" });
      pattern(p.companyData.inn, /^\d{10}$/, {
        message: "ИНН должен содержать 10 цифр",
      });
      required(p.companyData.ogrn, { message: "ОГРН обязателен" });
      pattern(p.companyData.ogrn, /^\d{13}$/, {
        message: "ОГРН должен содержать 13 цифр",
      });
      required(p.companyData.kpp, { message: "КПП обязателен" });
      pattern(p.companyData.kpp, /^\d{9}$/, {
        message: "КПП должен содержать 9 цифр",
      });
      required(p.companyData.ceoName, {
        message: "ФИО руководителя обязательно",
      });
    }
  );

  // Common validations regardless of insuredType
  required(path.phone, { message: "Телефон обязателен" });
  pattern(path.phone, /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, {
    message: "Некорректный формат телефона",
  });
  required(path.email, { message: "Email обязателен" });
  email(path.email, { message: "Некорректный формат email" });
};

// Behavior schema for step 2
export const step2Behavior: BehaviorSchemaFn<Step2Data> = (path) => {
  // Calculate full name when personal data changes
  watchField(
    path.personalData.lastName,
    (value: string, ctx) => {
      const firstName = ctx.form.personalData.firstName.value.value;
      const middleName = ctx.form.personalData.middleName.value.value;

      if (value || firstName || middleName) {
        const fullName = [value, firstName, middleName]
          .filter(Boolean)
          .join(" ");
        ctx.setFieldValue("fullName", fullName);
      }
    },
    { immediate: false }
  );

  watchField(
    path.personalData.firstName,
    (value: string, ctx) => {
      const lastName = ctx.form.personalData.lastName.value.value;
      const middleName = ctx.form.personalData.middleName.value.value;

      if (lastName || value || middleName) {
        const fullName = [lastName, value, middleName]
          .filter(Boolean)
          .join(" ");
        ctx.setFieldValue("fullName", fullName);
      }
    },
    { immediate: false }
  );

  watchField(
    path.personalData.middleName,
    (value: string, ctx) => {
      const lastName = ctx.form.personalData.lastName.value.value;
      const firstName = ctx.form.personalData.firstName.value.value;

      if (lastName || firstName || value) {
        const fullName = [lastName, firstName, value].filter(Boolean).join(" ");
        ctx.setFieldValue("fullName", fullName);
      }
    },
    { immediate: false }
  );

  // Calculate age when birth date changes
  watchField(
    path.personalData.birthDate,
    (value: string, ctx) => {
      if (!value) {
        ctx.setFieldValue("age", undefined);
        return;
      }

      try {
        const birthDate = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }

        ctx.setFieldValue("age", age);
      } catch (e) {
        console.error("Error calculating age:", e);
        ctx.setFieldValue("age", undefined);
      }
    },
    { immediate: false }
  );
};
