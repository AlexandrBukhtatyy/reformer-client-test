import type { BehaviorSchemaFn } from "@reformer/core";
import {
  watchField
} from "@reformer/core/behaviors";
import type { CreditApplicationForm } from "./types";

export const behaviors: BehaviorSchemaFn<CreditApplicationForm> = (path) => {
 // Вычисляемое поле: полное имя
  watchField(path.personalData.lastName, (_value, ctx) => {
    const lastName = ctx.form.personalData.lastName.value.value;
    const firstName = ctx.form.personalData.firstName.value.value;
    const middleName = ctx.form.personalData.middleName.value.value;

    if (lastName && firstName && middleName) {
      ctx.setFieldValue("fullName", `${lastName} ${firstName} ${middleName}`);
    } else {
      ctx.setFieldValue("fullName", "");
    }
  });

  watchField(path.personalData.firstName, (_value, ctx) => {
    const lastName = ctx.form.personalData.lastName.value.value;
    const firstName = ctx.form.personalData.firstName.value.value;
    const middleName = ctx.form.personalData.middleName.value.value;

    if (lastName && firstName && middleName) {
      ctx.setFieldValue("fullName", `${lastName} ${firstName} ${middleName}`);
    } else {
      ctx.setFieldValue("fullName", "");
    }
  });

  watchField(path.personalData.middleName, (_value, ctx) => {
    const lastName = ctx.form.personalData.lastName.value.value;
    const firstName = ctx.form.personalData.firstName.value.value;
    const middleName = ctx.form.personalData.middleName.value.value;

    if (lastName && firstName && middleName) {
      ctx.setFieldValue("fullName", `${lastName} ${firstName} ${middleName}`);
    } else {
      ctx.setFieldValue("fullName", "");
    }
  });

  // Вычисляемое поле: возраст
  watchField(path.personalData.birthDate, (value, ctx) => {
    if (value) {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) 
        ? age - 1 
        : age;
      ctx.setFieldValue("age", actualAge);
    } else {
      ctx.setFieldValue("age", 0);
    }
  });

  // Вычисляемое поле: общий доход
  watchField(path.monthlyIncome, (_value, ctx) => {
    const income = ctx.form.monthlyIncome.value.value || 0;
    const additional = ctx.form.additionalIncome.value.value || 0;
    ctx.setFieldValue("totalIncome", income + additional);
  });

  watchField(path.additionalIncome, (_value, ctx) => {
    const income = ctx.form.monthlyIncome.value.value || 0;
    const additional = ctx.form.additionalIncome.value.value || 0;
    ctx.setFieldValue("totalIncome", income + additional);
  });

  // Вычисляемое поле: доход созаемщиков
  watchField(path.coBorrowers, (value, ctx) => {
    if (value && Array.isArray(value)) {
      const totalCoBorrowerIncome = value.reduce((sum, coBorrower) => sum + (coBorrower.monthlyIncome || 0), 0);
      ctx.setFieldValue("coBorrowersIncome", totalCoBorrowerIncome);
    } else {
      ctx.setFieldValue("coBorrowersIncome", 0);
    }
  });

  // Вычисляемое поле: процентная ставка (базовая логика)
  watchField(path.loanType, (value, ctx) => {
    let baseRate = 0;
    switch(value) {
      case "mortgage":
        baseRate = 8.5;
        break;
      case "car":
        baseRate = 10.5;
        break;
      case "business":
        baseRate = 12.0;
        break;
      case "refinance":
        baseRate = 9.5;
        break;
      default:
        baseRate = 11.5;
    }
    
    // Снижение ставки при наличии имущества
    if (ctx.form.hasProperty.value.value) {
      baseRate -= 0.5;
    }
    
    // Региональный коэффициент (упрощенный)
    const region = ctx.form.registrationAddress.region.value.value;
    if (region && region.toLowerCase().includes("москва")) {
      baseRate -= 0.2;
    } else if (region && region.toLowerCase().includes("спб")) {
      baseRate -= 0.1;
    }
    
    ctx.setFieldValue("interestRate", Math.max(baseRate, 5.0)); // Минимальная ставка 5%
  });

  // Также нужно реагировать на изменение других параметров, влияющих на ставку
  watchField(path.hasProperty, (value, ctx) => {
    // Пересчитаем ставку при изменении наличия имущества
    let baseRate = 0;
    switch(ctx.form.loanType.value.value) {
      case "mortgage":
        baseRate = 8.5;
        break;
      case "car":
        baseRate = 10.5;
        break;
      case "business":
        baseRate = 12.0;
        break;
      case "refinance":
        baseRate = 9.5;
        break;
      default:
        baseRate = 11.5;
    }
    
    // Снижение ставки при наличии имущества
    if (value) {
      baseRate -= 0.5;
    }
    
    // Региональный коэффициент (упрощенный)
    const region = ctx.form.registrationAddress.region.value.value;
    if (region && region.toLowerCase().includes("москва")) {
      baseRate -= 0.2;
    } else if (region && region.toLowerCase().includes("спб")) {
      baseRate -= 0.1;
    }
    
    ctx.setFieldValue("interestRate", Math.max(baseRate, 5.0)); // Минимальная ставка 5%
  });

  watchField(path.registrationAddress.region, (value, ctx) => {
    // Пересчитаем ставку при изменении региона
    let baseRate = 0;
    switch(ctx.form.loanType.value.value) {
      case "mortgage":
        baseRate = 8.5;
        break;
      case "car":
        baseRate = 10.5;
        break;
      case "business":
        baseRate = 12.0;
        break;
      case "refinance":
        baseRate = 9.5;
        break;
      default:
        baseRate = 11.5;
    }
    
    // Снижение ставки при наличии имущества
    if (ctx.form.hasProperty.value.value) {
      baseRate -= 0.5;
    }
    
    // Региональный коэффициент (упрощенный)
    const region = value;
    if (region && region.toLowerCase().includes("москва")) {
      baseRate -= 0.2;
    } else if (region && region.toLowerCase().includes("спб")) {
      baseRate -= 0.1;
    }
    
    ctx.setFieldValue("interestRate", Math.max(baseRate, 5.0)); // Минимальная ставка 5%
  });

  // Вычисляемое поле: ежемесячный платеж
  watchField(path.loanAmount, (_value, ctx) => {
    // Пересчитаем при изменении суммы кредита
    const amount = ctx.form.loanAmount.value.value;
    const term = ctx.form.loanTerm.value.value;
    const rate = ctx.form.interestRate.value.value;

    if (amount && term && rate) {
      // Аннуитетная формула: A = P * (r * (1+r)^n) / ((1+r)^n - 1)
      // где A - ежемесячный платеж, P - сумма кредита, r - месячная ставка, n - количество месяцев
      const monthlyRate = (rate / 100) / 12;
      const monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
      ctx.setFieldValue("monthlyPayment", Math.round(monthlyPayment));
    } else {
      ctx.setFieldValue("monthlyPayment", 0);
    }
  });

  watchField(path.loanTerm, (_value, ctx) => {
    // Пересчитаем при изменении срока кредита
    const amount = ctx.form.loanAmount.value.value;
    const term = ctx.form.loanTerm.value.value;
    const rate = ctx.form.interestRate.value.value;

    if (amount && term && rate) {
      // Аннуитетная формула: A = P * (r * (1+r)^n) / ((1+r)^n - 1)
      // где A - ежемесячный платеж, P - сумма кредита, r - месячная ставка, n - количество месяцев
      const monthlyRate = (rate / 100) / 12;
      const monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
      ctx.setFieldValue("monthlyPayment", Math.round(monthlyPayment));
    } else {
      ctx.setFieldValue("monthlyPayment", 0);
    }
  });

  watchField(path.interestRate, (_value, ctx) => {
    // Пересчитаем при изменении процентной ставки
    const amount = ctx.form.loanAmount.value.value;
    const term = ctx.form.loanTerm.value.value;
    const rate = ctx.form.interestRate.value.value;

    if (amount && term && rate) {
      // Аннуитетная формула: A = P * (r * (1+r)^n) / ((1+r)^n - 1)
      // где A - ежемесячный платеж, P - сумма кредита, r - месячная ставка, n - количество месяцев
      const monthlyRate = (rate / 100) / 12;
      const monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
      ctx.setFieldValue("monthlyPayment", Math.round(monthlyPayment));
    } else {
      ctx.setFieldValue("monthlyPayment", 0);
    }
  });

  // Вычисляемое поле: процент платежа от дохода
  watchField(path.monthlyPayment, (_value, ctx) => {
    // Пересчитаем при изменении ежемесячного платежа
    const payment = ctx.form.monthlyPayment.value.value;
    const totalIncome = ctx.form.totalIncome.value.value;
    const coBorrowersIncome = ctx.form.coBorrowersIncome.value.value;

    if (payment && totalIncome) {
      const combinedIncome = totalIncome + (coBorrowersIncome || 0);
      if (combinedIncome > 0) {
        const ratio = (payment / combinedIncome) * 100;
        ctx.setFieldValue("paymentToIncomeRatio", Math.round(ratio * 100) / 100); // Округление до 2 знаков
      } else {
        ctx.setFieldValue("paymentToIncomeRatio", 0);
      }
    } else {
      ctx.setFieldValue("paymentToIncomeRatio", 0);
    }
  });

  watchField(path.totalIncome, (_value, ctx) => {
    // Пересчитаем при изменении общего дохода
    const payment = ctx.form.monthlyPayment.value.value;
    const totalIncome = ctx.form.totalIncome.value.value;
    const coBorrowersIncome = ctx.form.coBorrowersIncome.value.value;

    if (payment && totalIncome) {
      const combinedIncome = totalIncome + (coBorrowersIncome || 0);
      if (combinedIncome > 0) {
        const ratio = (payment / combinedIncome) * 100;
        ctx.setFieldValue("paymentToIncomeRatio", Math.round(ratio * 100) / 100); // Округление до 2 знаков
      } else {
        ctx.setFieldValue("paymentToIncomeRatio", 0);
      }
    } else {
      ctx.setFieldValue("paymentToIncomeRatio", 0);
    }
  });

  watchField(path.coBorrowersIncome, (_value, ctx) => {
    // Пересчитаем при изменении дохода созаемщиков
    const payment = ctx.form.monthlyPayment.value.value;
    const totalIncome = ctx.form.totalIncome.value.value;
    const coBorrowersIncome = ctx.form.coBorrowersIncome.value.value;

    if (payment && totalIncome) {
      const combinedIncome = totalIncome + (coBorrowersIncome || 0);
      if (combinedIncome > 0) {
        const ratio = (payment / combinedIncome) * 100;
        ctx.setFieldValue("paymentToIncomeRatio", Math.round(ratio * 100) / 100); // Округление до 2 знаков
      } else {
        ctx.setFieldValue("paymentToIncomeRatio", 0);
      }
    } else {
      ctx.setFieldValue("paymentToIncomeRatio", 0);
    }
  });

 // Вычисляемое поле: первоначальный взнос для ипотеки (20% от стоимости недвижимости)
  watchField(path.propertyValue, (value, ctx) => {
    if (ctx.form.loanType.value.value === "mortgage" && value !== null && value !== undefined) {
      const initialPayment = value * 0.2;
      ctx.setFieldValue("initialPayment", Math.round(initialPayment));
    } else {
      ctx.setFieldValue("initialPayment", null);
    }
  });

  // Условная активация полей для ипотеки
  watchField(path.loanType, (value, ctx) => {
    if (value !== "mortgage") {
      ctx.setFieldValue("propertyValue", null);
      ctx.setFieldValue("initialPayment", null);
    }
  });

  // Условная активация полей для автокредита
  watchField(path.loanType, (value, ctx) => {
    if (value !== "car") {
      ctx.setFieldValue("carBrand", null);
      ctx.setFieldValue("carModel", null);
      ctx.setFieldValue("carYear", null);
      ctx.setFieldValue("carPrice", null);
    }
  });

  // Условная активация полей для работающих по найму
  watchField(path.employmentStatus, (value, ctx) => {
    if (value !== "employed") {
      ctx.setFieldValue("companyName", null);
      ctx.setFieldValue("companyInn", null);
      ctx.setFieldValue("companyPhone", null);
      ctx.setFieldValue("companyAddress", null);
      ctx.setFieldValue("position", null);
    }
  });

  // Условная активация полей для ИП
  watchField(path.employmentStatus, (value, ctx) => {
    if (value !== "selfEmployed") {
      ctx.setFieldValue("businessType", null);
      ctx.setFieldValue("businessInn", null);
      ctx.setFieldValue("businessActivity", null);
    }
  });

  // Очистка модели при смене марки автомобиля
  watchField(path.carBrand, (value, ctx) => {
    if (!value) {
      ctx.setFieldValue("carModel", null);
    }
  });

 // Очистка массива имущества при отключении hasProperty
 watchField(path.hasProperty, (value, ctx) => {
    if (!value) {
      ctx.setFieldValue("properties", []);
    }
  });

  // Очистка массива существующих кредитов при отключении hasExistingLoans
  watchField(path.hasExistingLoans, (value, ctx) => {
    if (!value) {
      ctx.setFieldValue("existingLoans", []);
    }
  });

  // Очистка массива созаемщиков при отключении hasCoBorrower
  watchField(path.hasCoBorrower, (value, ctx) => {
    if (!value) {
      ctx.setFieldValue("coBorrowers", []);
    }
  });

  // Копирование адреса регистрации в адрес проживания при sameAsRegistration=true
  watchField(path.sameAsRegistration, (value, ctx) => {
    if (value) {
      // Копируем все поля адреса регистрации в адрес проживания
      const regAddress = ctx.form.registrationAddress.value.value;
      if (regAddress) {
        ctx.setFieldValue("residenceAddress.region", regAddress.region || "");
        ctx.setFieldValue("residenceAddress.city", regAddress.city || "");
        ctx.setFieldValue("residenceAddress.street", regAddress.street || "");
        ctx.setFieldValue("residenceAddress.house", regAddress.house || "");
        ctx.setFieldValue("residenceAddress.apartment", regAddress.apartment || "");
        ctx.setFieldValue("residenceAddress.postalCode", regAddress.postalCode || "");
      }
    }
  });

  // Синхронизация адреса проживания при изменении адреса регистрации (если sameAsRegistration=true)
  watchField(path.registrationAddress, (value, ctx) => {
    if (ctx.form.sameAsRegistration.value.value && value) {
      ctx.setFieldValue("residenceAddress.region", value.region || "");
      ctx.setFieldValue("residenceAddress.city", value.city || "");
      ctx.setFieldValue("residenceAddress.street", value.street || "");
      ctx.setFieldValue("residenceAddress.house", value.house || "");
      ctx.setFieldValue("residenceAddress.apartment", value.apartment || "");
      ctx.setFieldValue("residenceAddress.postalCode", value.postalCode || "");
    }
  });

  // Очистка города при смене региона регистрации
  watchField(path.registrationAddress.region, (_value, ctx) => {
    ctx.setFieldValue("registrationAddress.city", "");
  });

  // Очистка города при смене региона проживания (только если адреса разные)
  watchField(path.residenceAddress.region, (_value, ctx) => {
    if (!ctx.form.sameAsRegistration.value.value) {
      ctx.setFieldValue("residenceAddress.city", "");
    }
  });

  // Очистка адреса проживания при отключении sameAsRegistration
  watchField(path.sameAsRegistration, (value, ctx) => {
    if (!value) {
      // Очищаем адрес проживания для ручного ввода
      ctx.setFieldValue("residenceAddress.region", "");
      ctx.setFieldValue("residenceAddress.city", "");
      ctx.setFieldValue("residenceAddress.street", "");
      ctx.setFieldValue("residenceAddress.house", "");
      ctx.setFieldValue("residenceAddress.apartment", "");
      ctx.setFieldValue("residenceAddress.postalCode", "");
    }
  });
};