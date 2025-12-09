import { createForm, type FormSchema } from "@reformer/core";
import { Input } from "../../components/ui/input";
import { InputMask } from "../../components/ui/input-mask";
import { Textarea } from "../../components/ui/textarea";
import { Select } from "../../components/ui/select";
import { Checkbox } from "../../components/ui/checkbox";
import { RadioGroup } from "../../components/ui/radio-group";
import { validation } from "./validation";
import { behaviors } from "./behaviors";
import type { CreditApplicationForm } from "./types";

const formSchema: FormSchema<CreditApplicationForm> = {
  // Step 1: Loan Info
  loanType: {
    value: "consumer",
    component: Select,
    componentProps: {
      label: "Тип кредита",
      placeholder: "Выберите тип кредита",
      options: [
        { value: "consumer", label: "Потребительский" },
        { value: "mortgage", label: "Ипотека" },
        { value: "car", label: "Автокредит" },
        { value: "business", label: "Бизнес" },
        { value: "refinance", label: "Рефинансирование" },
      ],
    },
  },
  loanAmount: {
    value: null,
    component: Input,
    componentProps: {
      label: "Сумма кредита (₽)",
      type: "number",
      placeholder: "Введите сумму",
      step: 1000,
      min: 50000,
      max: 10000000,
    },
  },
  loanTerm: {
    value: 12,
    component: Input,
    componentProps: {
      label: "Срок кредита (месяцев)",
      type: "number",
      placeholder: "Введите срок",
      min: 6,
      max: 240,
    },
  },
  loanPurpose: {
    value: "",
    component: Textarea,
    componentProps: {
      label: "Цель кредита",
      placeholder: "Опишите, на что планируете потратить средства",
      rows: 4,
      maxLength: 500,
    },
  },
  propertyValue: {
    value: null,
    component: Input,
    componentProps: {
      label: "Стоимость недвижимости (₽)",
      type: "number",
      placeholder: "Введите стоимость",
      min: 1000000,
    },
  },
  initialPayment: {
    value: null,
    component: Input,
    componentProps: {
      label: "Первоначальный взнос (₽)",
      type: "number",
      placeholder: "Введите сумму",
      disabled: true,
      readonly: true,
    },
  },
  carBrand: {
    value: null,
    component: Input,
    componentProps: {
      label: "Марка автомобиля",
      placeholder: "Например: Toyota",
      maxLength: 50,
    },
  },
  carModel: {
    value: null,
    component: Input,
    componentProps: {
      label: "Модель автомобиля",
      placeholder: "Например: Camry",
      maxLength: 50,
    },
 },
  carYear: {
    value: null,
    component: Input,
    componentProps: {
      label: "Год выпуска",
      type: "number",
      placeholder: "2020",
      min: 2000,
      max: new Date().getFullYear() + 1,
    },
  },
 carPrice: {
    value: null,
    component: Input,
    componentProps: {
      label: "Стоимость автомобиля (₽)",
      type: "number",
      placeholder: "Введите стоимость",
      min: 300000,
      max: 10000000,
    },
  },

  // Step 2: Personal Data
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
    birthPlace: {
      value: "",
      component: Input,
      componentProps: {
        label: "Место рождения",
        placeholder: "Введите место рождения",
      },
    },
  },
  passportData: {
    series: {
      value: "",
      component: InputMask,
      componentProps: {
        label: "Серия паспорта",
        mask: "99 99",
        placeholder: "12 34",
      },
    },
    number: {
      value: "",
      component: InputMask,
      componentProps: {
        label: "Номер паспорта",
        mask: "999999",
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
        placeholder: "Введите название органа",
      },
    },
    departmentCode: {
      value: "",
      component: InputMask,
      componentProps: {
        label: "Код подразделения",
        mask: "999-999",
        placeholder: "123-456",
      },
    },
  },
  inn: {
    value: "",
    component: InputMask,
    componentProps: {
      label: "ИНН",
      mask: "999999999999",
      placeholder: "123456789012",
    },
  },
  snils: {
    value: "",
    component: InputMask,
    componentProps: {
      label: "СНИЛС",
      mask: "999-999-999 99",
      placeholder: "123-456-789 00",
    },
  },

  // Step 3: Contact Info
  phoneMain: {
    value: "",
    component: InputMask,
    componentProps: {
      label: "Основной телефон",
      mask: "+7 (999) 999-99-99",
      placeholder: "+7 (___) ___-__-__",
    },
  },
  phoneAdditional: {
    value: null,
    component: InputMask,
    componentProps: {
      label: "Дополнительный телефон",
      mask: "+7 (999) 999-99-99",
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
  emailAdditional: {
    value: null,
    component: Input,
    componentProps: {
      label: "Дополнительный email",
      type: "email",
      placeholder: "example@mail.com",
    },
  },
  registrationAddress: {
    region: {
      value: "",
      component: Input,
      componentProps: {
        label: "Регион",
        placeholder: "Введите регион",
      },
    },
    city: {
      value: "",
      component: Input,
      componentProps: {
        label: "Город",
        placeholder: "Введите город",
      },
    },
    street: {
      value: "",
      component: Input,
      componentProps: {
        label: "Улица",
        placeholder: "Введите улицу",
      },
    },
    house: {
      value: "",
      component: Input,
      componentProps: {
        label: "Дом",
        placeholder: "№",
      },
    },
    apartment: {
      value: "",
      component: Input,
      componentProps: {
        label: "Квартира",
        placeholder: "№",
      },
    },
    postalCode: {
      value: "",
      component: InputMask,
      componentProps: {
        label: "Индекс",
        mask: "999999",
        placeholder: "000000",
      },
    },
  },
  sameAsRegistration: {
    value: true,
    component: Checkbox,
    componentProps: {
      label: "Адрес проживания совпадает с адресом регистрации",
    },
  },
  residenceAddress: {
    region: {
      value: "",
      component: Input,
      componentProps: {
        label: "Регион",
        placeholder: "Введите регион",
      },
    },
    city: {
      value: "",
      component: Input,
      componentProps: {
        label: "Город",
        placeholder: "Введите город",
      },
    },
    street: {
      value: "",
      component: Input,
      componentProps: {
        label: "Улица",
        placeholder: "Введите улицу",
      },
    },
    house: {
      value: "",
      component: Input,
      componentProps: {
        label: "Дом",
        placeholder: "№",
      },
    },
    apartment: {
      value: "",
      component: Input,
      componentProps: {
        label: "Квартира",
        placeholder: "№",
      },
    },
    postalCode: {
      value: "",
      component: InputMask,
      componentProps: {
        label: "Индекс",
        mask: "999999",
        placeholder: "000000",
      },
    },
  },

  // Step 4: Employment Info
  employmentStatus: {
    value: "employed",
    component: RadioGroup,
    componentProps: {
      label: "Статус занятости",
      options: [
        { value: "employed", label: "Работаю по найму" },
        { value: "selfEmployed", label: "ИП/Самозанятый" },
        { value: "unemployed", label: "Безработный" },
        { value: "retired", label: "Пенсионер" },
        { value: "student", label: "Студент" },
      ],
    },
  },
  companyName: {
    value: null,
    component: Input,
    componentProps: {
      label: "Название компании",
      placeholder: "Введите название",
    },
  },
  companyInn: {
    value: null,
    component: InputMask,
    componentProps: {
      label: "ИНН компании",
      mask: "9999999999",
      placeholder: "1234567890",
    },
  },
 companyPhone: {
    value: null,
    component: InputMask,
    componentProps: {
      label: "Телефон компании",
      mask: "+7 (999) 999-99-99",
      placeholder: "+7 (___) ___-__-__",
    },
  },
  companyAddress: {
    value: null,
    component: Input,
    componentProps: {
      label: "Адрес компании",
      placeholder: "Полный адрес",
    },
  },
 position: {
    value: null,
    component: Input,
    componentProps: {
      label: "Должность",
      placeholder: "Ваша должность",
    },
  },
 workExperienceTotal: {
    value: null,
    component: Input,
    componentProps: {
      label: "Общий стаж работы (месяцев)",
      type: "number",
      placeholder: "0",
      min: 0,
    },
  },
  workExperienceCurrent: {
    value: null,
    component: Input,
    componentProps: {
      label: "Стаж на текущем месте (месяцев)",
      type: "number",
      placeholder: "0",
      min: 0,
    },
  },
  monthlyIncome: {
    value: null,
    component: Input,
    componentProps: {
      label: "Ежемесячный доход (₽)",
      type: "number",
      placeholder: "0",
      min: 100,
    },
  },
  additionalIncome: {
    value: null,
    component: Input,
    componentProps: {
      label: "Дополнительный доход (₽)",
      type: "number",
      placeholder: "0",
      min: 0,
    },
  },
  additionalIncomeSource: {
    value: null,
    component: Input,
    componentProps: {
      label: "Источник дополнительного дохода",
      placeholder: "Опишите источник",
    },
  },
  businessType: {
    value: null,
    component: Input,
    componentProps: {
      label: "Тип бизнеса",
      placeholder: "ИП, ООО и т.д.",
    },
  },
  businessInn: {
    value: null,
    component: InputMask,
    componentProps: {
      label: "ИНН ИП",
      mask: "999999999999",
      placeholder: "123456789012",
    },
  },
 businessActivity: {
    value: null,
    component: Textarea,
    componentProps: {
      label: "Вид деятельности",
      placeholder: "Опишите вид деятельности",
      rows: 3,
    },
  },

  // Step 5: Additional Info
  maritalStatus: {
    value: "single",
    component: RadioGroup,
    componentProps: {
      label: "Семейное положение",
      options: [
        { value: "single", label: "Не женат/не замужем" },
        { value: "married", label: "Женат/замужем" },
        { value: "divorced", label: "Разведен(а)" },
        { value: "widowed", label: "Вдовец/вдова" },
      ],
    },
  },
  dependents: {
    value: 0,
    component: Input,
    componentProps: {
      label: "Количество иждивенцев",
      type: "number",
      placeholder: "0",
      min: 0,
      max: 10,
    },
  },
 education: {
    value: "higher",
    component: Select,
    componentProps: {
      label: "Образование",
      placeholder: "Выберите уровень образования",
      options: [
        { value: "secondary", label: "Среднее" },
        { value: "specialized", label: "Среднее специальное" },
        { value: "higher", label: "Высшее" },
        { value: "postgraduate", label: "Послеуниверситетское" },
      ],
    },
  },
  hasProperty: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: "У меня есть имущество",
    },
  },
  properties: [{
    type: {
      value: "apartment",
      component: Select,
      componentProps: {
        label: "Тип имущества",
        options: [
          { value: "apartment", label: "Квартира" },
          { value: "house", label: "Дом" },
          { value: "land", label: "Земля" },
          { value: "car", label: "Автомобиль" },
          { value: "other", label: "Другое" },
        ],
      },
    },
    description: {
      value: "",
      component: Textarea,
      componentProps: {
        label: "Описание",
        placeholder: "Опишите имущество",
        rows: 3,
      },
    },
    estimatedValue: {
      value: 0,
      component: Input,
      componentProps: {
        label: "Оценочная стоимость",
        type: "number",
        placeholder: "0",
        min: 0,
      },
    },
    hasEncumbrance: {
      value: false,
      component: Checkbox,
      componentProps: {
        label: "Имеется обременение (залог)",
      },
    },
  }],
  hasExistingLoans: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: "У меня есть другие кредиты",
    },
  },
  existingLoans: [{
    bank: {
      value: "",
      component: Input,
      componentProps: {
        label: "Банк",
        placeholder: "Название банка",
      },
    },
    type: {
      value: "",
      component: Input,
      componentProps: {
        label: "Тип кредита",
        placeholder: "Тип кредита",
      },
    },
    amount: {
      value: 0,
      component: Input,
      componentProps: {
        label: "Сумма кредита",
        type: "number",
        placeholder: "0",
        min: 0,
      },
    },
    remainingAmount: {
      value: 0,
      component: Input,
      componentProps: {
        label: "Остаток задолженности",
        type: "number",
        placeholder: "0",
        min: 0,
      },
    },
    monthlyPayment: {
      value: 0,
      component: Input,
      componentProps: {
        label: "Ежемесячный платеж",
        type: "number",
        placeholder: "0",
        min: 0,
      },
    },
    maturityDate: {
      value: "",
      component: Input,
      componentProps: {
        label: "Дата погашения",
        type: "date",
      },
    },
  }],
  hasCoBorrower: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: "Добавить созаемщика",
    },
  },
  coBorrowers: [{
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
      birthPlace: {
        value: "",
        component: Input,
        componentProps: {
          label: "Место рождения",
          placeholder: "Введите место рождения",
        },
      },
    },
    phone: {
      value: "",
      component: InputMask,
      componentProps: {
        label: "Телефон",
        mask: "+7 (999) 999-99-99",
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
    relationship: {
      value: "",
      component: Input,
      componentProps: {
        label: "Родство",
        placeholder: "Укажите родство",
      },
    },
    monthlyIncome: {
      value: 0,
      component: Input,
      componentProps: {
        label: "Ежемесячный доход",
        type: "number",
        placeholder: "0",
        min: 0,
      },
    },
  }],

  // Step 6: Confirmation
  agreePersonalData: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: "Согласие на обработку персональных данных",
    },
  },
  agreeCreditHistory: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: "Согласие на проверку кредитной истории",
    },
  },
  agreeMarketing: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: "Согласие на получение маркетинговых материалов",
    },
  },
  agreeTerms: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: "Согласие с условиями кредитования",
    },
  },
  confirmAccuracy: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: "Подтверждаю точность введенных данных",
    },
  },
   electronicSignature: {
    value: "",
    component: InputMask,
    componentProps: {
      label: "Код подтверждения из СМС",
      mask: "999999",
      placeholder: "123456",
    },
  },

  // Computed fields
  interestRate: {
    value: 0,
    component: Input,
    componentProps: {
      label: "Процентная ставка (%)",
      type: "number",
      disabled: true,
      readonly: true,
    },
  },
  monthlyPayment: {
    value: 0,
    component: Input,
    componentProps: {
      label: "Ежемесячный платеж (₽)",
      type: "number",
      disabled: true,
      readonly: true,
    },
  },
  fullName: {
    value: "",
    component: Input,
    componentProps: {
      label: "Полное имя",
      disabled: true,
      readonly: true,
    },
  },
  age: {
    value: 0,
    component: Input,
    componentProps: {
      label: "Возраст (лет)",
      type: "number",
      disabled: true,
      readonly: true,
    },
  },
  totalIncome: {
    value: 0,
    component: Input,
    componentProps: {
      label: "Общий доход (₽)",
      type: "number",
      disabled: true,
      readonly: true,
    },
  },
  paymentToIncomeRatio: {
    value: 0,
    component: Input,
    componentProps: {
      label: "Процент платежа от дохода (%)",
      type: "number",
      disabled: true,
      readonly: true,
    },
  },
  coBorrowersIncome: {
    value: 0,
    component: Input,
    componentProps: {
      label: "Доход созаемщиков (₽)",
      type: "number",
      disabled: true,
      readonly: true,
    },
  },
};

export const form = createForm<CreditApplicationForm>({
  form: formSchema,
  validation: validation,
  behavior: behaviors,
});