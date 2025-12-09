import type { BehaviorSchemaFn } from "@reformer/core";
import {
  watchField
} from "@reformer/core/behaviors";
import type { CreditApplicationForm } from "./types";

export const behaviors: BehaviorSchemaFn<CreditApplicationForm> = (path) => {
 // Вычисляемое поле: полное имя
  watchField(path.personalData.lastName, (value, ctx) => {
    const lastName = ctx.form.personalData.lastName.value;
    const firstName = ctx.form.personalData.firstName.value;
    const middleName = ctx.form.personalData.middleName.value;
    
    if (lastName && firstName && middleName) {
      ctx.setFieldValue("fullName", `${lastName} ${firstName} ${middleName}`);
    } else {
      ctx.setFieldValue("fullName", "");
    }
  });

  watchField(path.personalData.firstName, (value, ctx) => {
    const lastName = ctx.form.personalData.lastName.value;
    const firstName = ctx.form.personalData.firstName.value;
    const middleName = ctx.form.personalData.middleName.value;
    
    if (lastName && firstName && middleName) {
      ctx.setFieldValue("fullName", `${lastName} ${firstName} ${middleName}`);
    } else {
      ctx.setFieldValue("fullName", "");
    }
  });

  watchField(path.personalData.middleName, (value, ctx) => {
    const lastName = ctx.form.personalData.lastName.value;
    const firstName = ctx.form.personalData.firstName.value;
    const middleName = ctx.form.personalData.middleName.value;
    
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
  watchField(path.monthlyIncome, (value, ctx) => {
    const income = ctx.form.monthlyIncome.value || 0;
    const additional = ctx.form.additionalIncome.value || 0;
    ctx.setFieldValue("totalIncome", income + additional);
  });

  watchField(path.additionalIncome, (value, ctx) => {
    const income = ctx.form.monthlyIncome.value || 0;
    const additional = ctx.form.additionalIncome.value || 0;
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
    if (ctx.form.hasProperty.value) {
      baseRate -= 0.5;
    }
    
    // Региональный коэффициент (упрощенный)
    const region = ctx.form.registrationAddress.region.value;
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
    switch(ctx.form.loanType.value) {
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
    const region = ctx.form.registrationAddress.region.value;
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
    switch(ctx.form.loanType.value) {
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
    if (ctx.form.hasProperty.value) {
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
  watchField(path.loanAmount, (value, ctx) => {
    // Пересчитаем при изменении суммы кредита
    const amount = ctx.form.loanAmount.value;
    const term = ctx.form.loanTerm.value;
    const rate = ctx.form.interestRate.value;
    
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

  watchField(path.loanTerm, (value, ctx) => {
    // Пересчитаем при изменении срока кредита
    const amount = ctx.form.loanAmount.value;
    const term = ctx.form.loanTerm.value;
    const rate = ctx.form.interestRate.value;
    
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

  watchField(path.interestRate, (value, ctx) => {
    // Пересчитаем при изменении процентной ставки
    const amount = ctx.form.loanAmount.value;
    const term = ctx.form.loanTerm.value;
    const rate = ctx.form.interestRate.value;
    
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
  watchField(path.monthlyPayment, (value, ctx) => {
    // Пересчитаем при изменении ежемесячного платежа
    const payment = ctx.form.monthlyPayment.value;
    const totalIncome = ctx.form.totalIncome.value;
    const coBorrowersIncome = ctx.form.coBorrowersIncome.value;
    
    if (payment && totalIncome) {
      const combinedIncome = totalIncome + (coBorrowersIncome || 0);
      if (combinedIncome > 0) {
        const ratio = (payment / combinedIncome) * 100;
        ctx.setFieldValue("paymentToIncomeRatio", Math.round(ratio * 10) / 100); // Округление до 2 знаков
      } else {
        ctx.setFieldValue("paymentToIncomeRatio", 0);
      }
    } else {
      ctx.setFieldValue("paymentToIncomeRatio", 0);
    }
  });

  watchField(path.totalIncome, (value, ctx) => {
    // Пересчитаем при изменении общего дохода
    const payment = ctx.form.monthlyPayment.value;
    const totalIncome = ctx.form.totalIncome.value;
    const coBorrowersIncome = ctx.form.coBorrowersIncome.value;
    
    if (payment && totalIncome) {
      const combinedIncome = totalIncome + (coBorrowersIncome || 0);
      if (combinedIncome > 0) {
        const ratio = (payment / combinedIncome) * 10;
        ctx.setFieldValue("paymentToIncomeRatio", Math.round(ratio * 100) / 100); // Округление до 2 знаков
      } else {
        ctx.setFieldValue("paymentToIncomeRatio", 0);
      }
    } else {
      ctx.setFieldValue("paymentToIncomeRatio", 0);
    }
  });

  watchField(path.coBorrowersIncome, (value, ctx) => {
    // Пересчитаем при изменении дохода созаемщиков
    const payment = ctx.form.monthlyPayment.value;
    const totalIncome = ctx.form.totalIncome.value;
    const coBorrowersIncome = ctx.form.coBorrowersIncome.value;
    
    if (payment && totalIncome) {
      const combinedIncome = totalIncome + (coBorrowersIncome || 0);
      if (combinedIncome > 0) {
        const ratio = (payment / combinedIncome) * 100;
        ctx.setFieldValue("paymentToIncomeRatio", Math.round(ratio * 100) / 10); // Округление до 2 знаков
      } else {
        ctx.setFieldValue("paymentToIncomeRatio", 0);
      }
    } else {
      ctx.setFieldValue("paymentToIncomeRatio", 0);
    }
  });

 // Вычисляемое поле: первоначальный взнос для ипотеки (20% от стоимости недвижимости)
  watchField(path.propertyValue, (value, ctx) => {
    if (ctx.form.loanType.value === "mortgage" && value !== null && value !== undefined) {
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
};