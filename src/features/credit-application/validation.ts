import type { ValidationSchemaFn } from "@reformer/core";
import { 
  required, 
 email, 
  min, 
  max, 
  minLength, 
  maxLength, 
  pattern, 
  validate 
} from "@reformer/core/validators";
import type { CreditApplicationForm } from "./types";

// Валидация шага 1: Основная информация о кредите
export const step1Validation: ValidationSchemaFn<CreditApplicationForm> = (path) => {
  // Обязательные поля
  required(path.loanType, { message: "Выберите тип кредита" });
  required(path.loanAmount, { message: "Укажите сумму кредита" });
  required(path.loanTerm, { message: "Укажите срок кредита" });
  required(path.loanPurpose, { message: "Укажите цель кредита" });

  // Валидация диапазонов для числовых полей
  min(path.loanAmount, 50000, { message: "Минимальная сумма кредита 50 000 ₽" });
  max(path.loanAmount, 10000000, { message: "Максимальная сумма кредита 10 000 000 ₽" });
  min(path.loanTerm, 6, { message: "Минимальный срок кредита 6 месяцев" });
  max(path.loanTerm, 240, { message: "Максимальный срок кредита 240 месяцев" });

  // Валидация текста цели кредита
  minLength(path.loanPurpose, 10, { message: "Цель кредита должна содержать минимум 10 символов" });
  maxLength(path.loanPurpose, 500, { message: "Цель кредита не должна превышать 500 символов" });

  // Валидация для ипотеки
  validate(path.loanType, (value, ctx) => {
    if (value === "mortgage") {
      const propertyValue = ctx.form.propertyValue.value;
      if (propertyValue === null || propertyValue === undefined) {
        return { code: "required", message: "Укажите стоимость недвижимости" };
      }
      if (propertyValue < 1000000) {
        return { code: "minPropertyValue", message: "Стоимость недвижимости должна быть не менее 1 000 000 ₽" };
      }

      // Валидация первоначального взноса (20% от стоимости недвижимости)
      const initialPayment = ctx.form.initialPayment.value;
      if (initialPayment === null || initialPayment === undefined) {
        return { code: "required", message: "Первоначальный взнос обязателен" };
      }
      if (propertyValue && initialPayment < propertyValue * 0.2) {
        return { code: "minInitialPayment", message: "Первоначальный взнос должен быть не менее 20% от стоимости недвижимости" };
      }
    }
    return null;
  });

  // Валидация для автокредита
  validate(path.loanType, (value, ctx) => {
    if (value === "car") {
      const carBrand = ctx.form.carBrand.value;
      const carModel = ctx.form.carModel.value;
      const carYear = ctx.form.carYear.value;
      const carPrice = ctx.form.carPrice.value;

      if (!carBrand) {
        return { code: "required", message: "Укажите марку автомобиля" };
      }
      if (!carModel) {
        return { code: "required", message: "Укажите модель автомобиля" };
      }
      if (!carYear) {
        return { code: "required", message: "Укажите год выпуска" };
      }
      if (!carPrice) {
        return { code: "required", message: "Укажите стоимость автомобиля" };
      }

      if (carYear && (carYear < 2000 || carYear > new Date().getFullYear() + 1)) {
        return { code: "invalidCarYear", message: "Год выпуска должен быть от 2000 до " + (new Date().getFullYear() + 1) };
      }

      if (carPrice && (carPrice < 300000 || carPrice > 10000000)) {
        return { code: "invalidCarPrice", message: "Стоимость автомобиля должна быть от 300 000 до 10 000 000 ₽" };
      }

      if (carBrand && (carBrand.length < 2 || carBrand.length > 50)) {
        return { code: "invalidCarBrand", message: "Марка автомобиля должна содержать от 2 до 50 символов" };
      }

      if (carModel && (carModel.length < 1 || carModel.length > 50)) {
        return { code: "invalidCarModel", message: "Модель автомобиля должна содержать от 1 до 50 символов" };
      }
    }
    return null;
  });
};

// Валидация шага 2: Персональные данные
export const step2Validation: ValidationSchemaFn<CreditApplicationForm> = (path) => {
  // Валидация личных данных
  required(path.personalData.lastName, { message: "Укажите фамилию" });
 required(path.personalData.firstName, { message: "Укажите имя" });
  required(path.personalData.middleName, { message: "Укажите отчество" });
  required(path.personalData.birthDate, { message: "Укажите дату рождения" });
 required(path.personalData.gender, { message: "Укажите пол" });
  required(path.personalData.birthPlace, { message: "Укажите место рождения" });

  // Валидация паспортных данных
  required(path.passportData.series, { message: "Укажите серию паспорта" });
  required(path.passportData.number, { message: "Укажите номер паспорта" });
  required(path.passportData.issueDate, { message: "Укажите дату выдачи паспорта" });
  required(path.passportData.issuedBy, { message: "Укажите кем выдан паспорт" });
  required(path.passportData.departmentCode, { message: "Укажите код подразделения" });

  // Валидация документов
  required(path.inn, { message: "Укажите ИНН" });
 required(path.snils, { message: "Укажите СНИЛС" });

 // Валидация даты рождения (18-70 лет)
  validate(path.personalData.birthDate, (value) => {
    if (!value) return null;
    const birthDate = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) 
      ? age - 1 
      : age;

    if (actualAge < 18) {
      return { code: "tooYoung", message: "Возраст должен быть не менее 18 лет" };
    }
    if (actualAge > 70) {
      return { code: "tooOld", message: "Возраст должен быть не более 70 лет" };
    }
    return null;
  });
};

// Валидация шага 3: Контактная информация
export const step3Validation: ValidationSchemaFn<CreditApplicationForm> = (path) => {
  required(path.phoneMain, { message: "Укажите основной телефон" });
  required(path.email, { message: "Укажите email" });
  required(path.registrationAddress.region, { message: "Укажите регион" });
  required(path.registrationAddress.city, { message: "Укажите город" });
  required(path.registrationAddress.street, { message: "Укажите улицу" });
  required(path.registrationAddress.house, { message: "Укажите дом" });
  required(path.registrationAddress.postalCode, { message: "Укажите почтовый индекс" });

  email(path.email, { message: "Некорректный формат email" });

 // Валидация дополнительного email, если он заполнен
  validate(path.emailAdditional, (value) => {
    if (value && value !== null && value !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return { code: "invalidEmail", message: "Некорректный формат дополнительного email" };
      }
    }
    return null;
  });

  // Валидация адреса проживания, если он отличается от регистрации
  validate(path.sameAsRegistration, (value, ctx) => {
    if (!value) {
      if (!ctx.form.residenceAddress.region.value) {
        return { code: "required", message: "Укажите регион проживания" };
      }
      if (!ctx.form.residenceAddress.city.value) {
        return { code: "required", message: "Укажите город проживания" };
      }
      if (!ctx.form.residenceAddress.street.value) {
        return { code: "required", message: "Укажите улицу проживания" };
      }
      if (!ctx.form.residenceAddress.house.value) {
        return { code: "required", message: "Укажите дом проживания" };
      }
      if (!ctx.form.residenceAddress.postalCode.value) {
        return { code: "required", message: "Укажите почтовый индекс проживания" };
      }
    }
    return null;
  });
};

// Валидация шага 4: Информация о занятости
export const step4Validation: ValidationSchemaFn<CreditApplicationForm> = (path) => {
  required(path.employmentStatus, { message: "Укажите статус занятости" });
 required(path.workExperienceTotal, { message: "Укажите общий стаж работы" });
  required(path.workExperienceCurrent, { message: "Укажите стаж на текущем месте" });
  required(path.monthlyIncome, { message: "Укажите ежемесячный доход" });

 min(path.workExperienceTotal, 0, { message: "Общий стаж не может быть отрицательным" });
  min(path.workExperienceCurrent, 0, { message: "Стаж на текущем месте не может быть отрицательным" });
  min(path.monthlyIncome, 10000, { message: "Минимальный доход 10 000 ₽" });

 // Кросс-валидация: стаж на текущем месте не может быть больше общего стажа
  validate(path.workExperienceCurrent, (value, ctx) => {
    const totalExperience = ctx.form.workExperienceTotal.value;
    if (value !== null && totalExperience !== null && value !== undefined && totalExperience !== undefined && value > totalExperience) {
      return { code: "invalidExperience", message: "Стаж на текущем месте не может быть больше общего стажа" };
    }
    return null;
  });

  // Валидация для работающих по найму
  validate(path.employmentStatus, (value, ctx) => {
    if (value === "employed") {
      if (!ctx.form.companyName.value) {
        return { code: "required", message: "Укажите название компании" };
      }
      if (!ctx.form.companyInn.value) {
        return { code: "required", message: "Укажите ИНН компании" };
      }
      if (!ctx.form.position.value) {
        return { code: "required", message: "Укажите должность" };
      }
    }
    return null;
  });

  // Валидация для ИП
  validate(path.employmentStatus, (value, ctx) => {
    if (value === "selfEmployed") {
      if (!ctx.form.businessType.value) {
        return { code: "required", message: "Укажите тип бизнеса" };
      }
      if (!ctx.form.businessInn.value) {
        return { code: "required", message: "Укажите ИНН ИП" };
      }
      if (!ctx.form.businessActivity.value) {
        return { code: "required", message: "Опишите вид деятельности" };
      }
    }
    return null;
  });

  // Валидация для дополнительного дохода
  validate(path.additionalIncome, (value, ctx) => {
    if (value && value > 0 && !ctx.form.additionalIncomeSource.value) {
      return { code: "required", message: "Укажите источник дополнительного дохода" };
    }
    return null;
  });
};

// Валидация шага 5: Дополнительная информация
export const step5Validation: ValidationSchemaFn<CreditApplicationForm> = (path) => {
  required(path.maritalStatus, { message: "Укажите семейное положение" });
 required(path.dependents, { message: "Укажите количество иждивенцев" });
  required(path.education, { message: "Укажите уровень образования" });

  min(path.dependents, 0, { message: "Количество иждивенцев не может быть отрицательным" });
  max(path.dependents, 10, { message: "Количество иждивенцев не может быть больше 10" });

  // Валидация массива имущества, если отмечено
  validate(path.hasProperty, (value, ctx) => {
    const properties = ctx.form.properties.value;
    if (value && (!properties || properties.length === 0)) {
      return { code: "required", message: "Добавьте хотя бы один объект имущества" };
    }
    return null;
  });

  // Валидация массива существующих кредитов, если отмечено
  validate(path.hasExistingLoans, (value, ctx) => {
    const existingLoans = ctx.form.existingLoans.value;
    if (value && (!existingLoans || existingLoans.length === 0)) {
      return { code: "required", message: "Добавьте хотя бы один существующий кредит" };
    }
    return null;
  });

  // Валидация массива созаемщиков, если отмечено
  validate(path.hasCoBorrower, (value, ctx) => {
    const coBorrowers = ctx.form.coBorrowers.value;
    if (value && (!coBorrowers || coBorrowers.length === 0)) {
      return { code: "required", message: "Добавьте хотя бы одного созаемщика" };
    }
    return null;
  });

  // Валидация отдельных элементов массивов
  validate(path.properties, (value) => {
    if (!value) return null;
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      if (!item.description || item.description.trim() === "") {
        return { code: "invalidProperty", message: `Описание имущества в строке ${i + 1} обязательно` };
      }
      if (item.estimatedValue < 0) {
        return { code: "invalidProperty", message: `Оценочная стоимость в строке ${i + 1} не может быть отрицательной` };
      }
    }
    return null;
  });

  validate(path.existingLoans, (value) => {
    if (!value) return null;
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      if (!item.bank || item.bank.trim() === "") {
        return { code: "invalidLoan", message: `Название банка в строке ${i + 1} обязательно` };
      }
      if (item.amount < 0) {
        return { code: "invalidLoan", message: `Сумма кредита в строке ${i + 1} не может быть отрицательной` };
      }
      if (item.remainingAmount < 0) {
        return { code: "invalidLoan", message: `Остаток задолженности в строке ${i + 1} не может быть отрицательным` };
      }
      if (item.monthlyPayment < 0) {
        return { code: "invalidLoan", message: `Ежемесячный платеж в строке ${i + 1} не может быть отрицательным` };
      }
      // Кросс-валидация: остаток не может быть больше суммы кредита
      if (item.remainingAmount > item.amount) {
        return { code: "invalidLoan", message: `Остаток задолженности в строке ${i + 1} не может превышать сумму кредита` };
      }
    }
    return null;
  });

  validate(path.coBorrowers, (value) => {
    if (!value) return null;
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      if (!item.personalData.lastName || item.personalData.lastName.trim() === "") {
        return { code: "invalidCoBorrower", message: `Фамилия созаемщика в строке ${i + 1} обязательна` };
      }
      if (!item.personalData.firstName || item.personalData.firstName.trim() === "") {
        return { code: "invalidCoBorrower", message: `Имя созаемщика в строке ${i + 1} обязательно` };
      }
      if (!item.personalData.middleName || item.personalData.middleName.trim() === "") {
        return { code: "invalidCoBorrower", message: `Отчество созаемщика в строке ${i + 1} обязательно` };
      }
      if (!item.phone || item.phone.trim() === "") {
        return { code: "invalidCoBorrower", message: `Телефон созаемщика в строке ${i + 1} обязателен` };
      }
      if (!item.email || item.email.trim() === "") {
        return { code: "invalidCoBorrower", message: `Email созаемщика в строке ${i + 1} обязателен` };
      }
      if (!item.relationship || item.relationship.trim() === "") {
        return { code: "invalidCoBorrower", message: `Родство созаемщика в строке ${i + 1} обязательно` };
      }
      if (item.monthlyIncome < 0) {
        return { code: "invalidCoBorrower", message: `Доход созаемщика в строке ${i + 1} не может быть отрицательным` };
      }
      // Проверка формата email для созаемщика
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(item.email)) {
        return { code: "invalidEmail", message: `Некорректный email созаемщика в строке ${i + 1}` };
      }
    }
    return null;
  });
};

// Валидация шага 6: Подтверждение и согласия
export const step6Validation: ValidationSchemaFn<CreditApplicationForm> = (path) => {
  required(path.agreePersonalData, { message: "Необходимо согласие на обработку персональных данных" });
  required(path.agreeCreditHistory, { message: "Необходимо согласие на проверку кредитной истории" });
 required(path.agreeTerms, { message: "Необходимо согласие с условиями кредитования" });
  required(path.confirmAccuracy, { message: "Необходимо подтверждение точности введенных данных" });
  required(path.electronicSignature, { message: "Введите код подтверждения из СМС" });

  // Проверка, что все обязательные согласия отмечены
  validate(path.agreePersonalData, (value) => {
    if (!value) {
      return { code: "required", message: "Необходимо согласие на обработку персональных данных" };
    }
    return null;
  });

  validate(path.agreeCreditHistory, (value) => {
    if (!value) {
      return { code: "required", message: "Необходимо согласие на проверку кредитной истории" };
    }
    return null;
  });

  validate(path.agreeTerms, (value) => {
    if (!value) {
      return { code: "required", message: "Необходимо согласие с условиями кредитования" };
    }
    return null;
  });

  validate(path.confirmAccuracy, (value) => {
    if (!value) {
      return { code: "required", message: "Необходимо подтверждение точности введенных данных" };
    }
    return null;
  });

  // Валидация кода подтверждения
  pattern(path.electronicSignature, /^\d{6}$/, { message: "Код подтверждения должен состоять из 6 цифр" });
};

// Карта валидаций для useStepForm
export const STEP_VALIDATIONS: Record<number, ValidationSchemaFn<CreditApplicationForm>> = {
 1: step1Validation,
  2: step2Validation,
  3: step3Validation,
  4: step4Validation,
  5: step5Validation,
 6: step6Validation,
};

// Полная валидация (для финальной отправки)
export const validation: ValidationSchemaFn<CreditApplicationForm> = (path) => {
  step1Validation(path);
 step2Validation(path);
  step3Validation(path);
  step4Validation(path);
  step5Validation(path);
  step6Validation(path);
};