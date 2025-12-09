import type { ValidationSchemaFn } from "@reformer/core";
import { required, min, max, email, pattern, validate, when, minLength, maxLength } from "@reformer/core/validators";
import type { InsuranceApplicationForm } from "./types";

// Валидация шага 1: Тип страхования и основные параметры
export const step1Validation: ValidationSchemaFn<InsuranceApplicationForm> = (path) => {
  required(path.insuranceType, { message: "Выберите тип страхования" });
 required(path.insurancePeriod, { message: "Укажите срок страхования" });
 required(path.startDate, { message: "Укажите дату начала" });
  required(path.coverageAmount, { message: "Укажите страховую сумму" });
  min(path.coverageAmount, 100000, { message: "Минимум 100 000 ₽" });
 max(path.coverageAmount, 5000000, { message: "Максимум 50 000 000 ₽" });

 // Валидация даты начала (не может быть в прошлом)
  validate(path.startDate, (value) => {
    if (!value) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(value);
    selectedDate.setHours(0, 0, 0, 0);
    return selectedDate < today ? { code: 'date', message: "Дата не может быть в прошлом" } : null;
 });

  // Условная валидация installments при paymentType='installments'
  when(
    (form) => form.paymentType === 'installments',
    () => {
      required(path.installments, { message: "Укажите количество платежей" });
      min(path.installments, 2, { message: "Минимум 2 платежа" });
      max(path.installments, 12, { message: "Максимум 12 платежей" });
    }
  );
};

// Валидация шага 2: Данные страхователя
export const step2Validation: ValidationSchemaFn<InsuranceApplicationForm> = (path) => {
  required(path.insuredType, { message: "Укажите тип страхователя" });

  // Валидация для физических лиц
  when(
    (form) => form.insuredType === 'individual',
    () => {
      required(path.personalData.lastName, { message: "Укажите фамилию" });
      required(path.personalData.firstName, { message: "Укажите имя" });
      required(path.personalData.birthDate, { message: "Укажите дату рождения" });
      required(path.passportData.series, { message: "Укажите серию паспорта" });
      required(path.passportData.number, { message: "Укажите номер паспорта" });
      required(path.passportData.issueDate, { message: "Укажите дату выдачи" });
      required(path.passportData.issuedBy, { message: "Укажите кем выдан" });

      // Валидация даты рождения (18-75 лет)
      validate(path.personalData.birthDate, (value) => {
        if (!value) return null;
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
        return actualAge < 18 || actualAge > 75 
          ? { code: 'age', message: "Возраст должен быть от 18 до 75 лет" } 
          : null;
      });

      // Валидация паспорта (10 цифр)
      pattern(path.passportData.series, /^\d{2}\s\d{2}$/, { message: "Серия паспорта должна быть в формате XX XX" });
      pattern(path.passportData.number, /^\d{6}$/, { message: "Номер паспорта должен быть в формате XXXXXX" });
    }
  );

  // Валидация для юридических лиц
  when(
    (form) => form.insuredType === 'corporate',
    () => {
      required(path.companyData.name, { message: "Укажите название организации" });
      required(path.companyData.inn, { message: "Укажите ИНН" });
      required(path.companyData.ogrn, { message: "Укажите ОГРН" });
      required(path.companyData.kpp, { message: "Укажите КПП" });
      required(path.companyData.ceoName, { message: "Укажите ФИО руководителя" });

      // Валидация ИНН (10 цифр)
      pattern(path.companyData.inn, /^\d{10}$/, { message: "ИНН должен содержать 10 цифр" });
      // Валидация ОГРН (13 цифр)
      pattern(path.companyData.ogrn, /^\d{13}$/, { message: "ОГРН должен содержать 13 цифр" });
      // Валидация КПП (9 цифр)
      pattern(path.companyData.kpp, /^\d{9}$/, { message: "КПП должен содержать 9 цифр" });
    }
  );

  required(path.phone, { message: "Укажите телефон" });
  required(path.email, { message: "Укажите email" });
  email(path.email, { message: "Некорректный email" });

  // Валидация телефона (11 цифр)
  pattern(path.phone, /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/, { message: "Некорректный формат телефона" });
};

// Валидация шага 3: Объект страхования - Транспорт (КАСКО/ОСАГО)
export const step3VehicleValidation: ValidationSchemaFn<InsuranceApplicationForm> = (path) => {
  when(
    (form) => form.insuranceType === 'casco' || form.insuranceType === 'osago',
    () => {
      required(path.vehicle.vin, { message: "Укажите VIN-номер" });
      validate(path.vehicle.vin, (value) => {
        if (!value) return null;
        return value.length !== 17 
          ? { code: 'vin', message: "VIN должен содержать 17 символов" } 
          : null;
      });
      required(path.vehicle.brand, { message: "Укажите марку автомобиля" });
      required(path.vehicle.model, { message: "Укажите модель автомобиля" });
      required(path.vehicle.year, { message: "Укажите год выпуска" });
      min(path.vehicle.year, 1990, { message: "Минимальный год выпуска - 1990" });
      validate(path.vehicle.year, (value) => {
        if (!value) return null;
        const currentYear = new Date().getFullYear();
        return value > currentYear 
          ? { code: 'year', message: `Год выпуска не может быть позже ${currentYear}` } 
          : null;
      });
      required(path.vehicle.mileage, { message: "Укажите пробег" });
      min(path.vehicle.mileage, 0, { message: "Пробег не может быть отрицательным" });
      required(path.vehicle.enginePower, { message: "Укажите мощность двигателя" });
      min(path.vehicle.enginePower, 1, { message: "Мощность должна быть больше 0" });
      required(path.vehicle.bodyType, { message: "Укажите тип кузова" });
      required(path.vehicle.transmission, { message: "Укажите тип коробки передач" });
      required(path.vehicle.licensePlate, { message: "Укажите госномер" });
      required(path.vehicle.registrationCert, { message: "Укажите номер СТС" });

      // Валидация marketValue только для КАСКО
      when(
        (form) => form.insuranceType === 'casco',
        () => {
          required(path.vehicle.marketValue, { message: "Укажите рыночную стоимость" });
          min(path.vehicle.marketValue, 0, { message: "Стоимость не может быть отрицательной" });
        }
      );

      // Условная валидация марки противоугонки при hasAntiTheft=true
      when(
        (form) => form.vehicle.hasAntiTheft === true,
        () => {
          required(path.vehicle.antiTheftBrand, { message: "Укажите марку противоугонной системы" });
        }
      );
    }
  );
};

// Валидация шага 3: Объект страхования - Недвижимость
export const step3PropertyValidation: ValidationSchemaFn<InsuranceApplicationForm> = (path) => {
  when(
    (form) => form.insuranceType === 'property',
    () => {
      required(path.property.type, { message: "Укажите тип недвижимости" });
      required(path.property.address.region, { message: "Укажите регион" });
      required(path.property.address.city, { message: "Укажите город" });
      required(path.property.address.street, { message: "Укажите улицу" });
      required(path.property.address.house, { message: "Укажите дом" });
      required(path.property.area, { message: "Укажите площадь" });
      min(path.property.area, 1, { message: "Площадь должна быть больше 0" });
      required(path.property.floors, { message: "Укажите этажность здания" });
      min(path.property.floors, 1, { message: "Этажность должна быть больше 0" });
      required(path.property.yearBuilt, { message: "Укажите год постройки" });
      min(path.property.yearBuilt, 1800, { message: "Минимальный год постройки - 1800" });
      validate(path.property.yearBuilt, (value) => {
        if (!value) return null;
        const currentYear = new Date().getFullYear();
        return value > currentYear 
          ? { code: 'year', message: `Год постройки не может быть позже ${currentYear}` } 
          : null;
      });
      required(path.property.wallMaterial, { message: "Укажите материал стен" });
      required(path.property.marketValue, { message: "Укажите рыночную стоимость" });
      min(path.property.marketValue, 0, { message: "Стоимость не может быть отрицательной" });
      required(path.property.ownershipDoc, { message: "Укажите номер документа о собственности" });

      // Условная валидация этажа для квартир
      when(
        (form) => form.property.type === 'apartment',
        () => {
          required(path.property.floor, { message: "Укажите этаж квартиры" });
          min(path.property.floor, 1, { message: "Этаж должен быть больше 0" });
          validate(path.property.floor, (value, ctx) => {
            if (!value || !ctx.form.property.floors.value) return null;
            return value > ctx.form.property.floors.value 
              ? { code: 'floor', message: "Этаж не может быть выше этажности здания" } 
              : null;
          });
        }
      );

      // Валидация суммы опций покрытия (хотя бы одна должна быть выбрана)
      validate(path.propertyCoverageOptions, (_, ctx) => {
        const options = ctx.form.propertyCoverageOptions;
        if (!options.structure.value && !options.interior.value && !options.movables.value && !options.liability.value) {
          return { code: 'coverage', message: "Выберите хотя бы один вид покрытия" };
        }
        return null;
      });
    }
  );
};

// Валидация шага 3: Объект страхования - Жизнь и здоровье
export const step3HealthValidation: ValidationSchemaFn<InsuranceApplicationForm> = (path) => {
  when(
    (form) => form.insuranceType === 'life',
    () => {
      required(path.health.height, { message: "Укажите рост" });
      min(path.health.height, 100, { message: "Минимальный рост - 10 см" });
      max(path.health.height, 250, { message: "Максимальный рост - 250 см" });
      required(path.health.weight, { message: "Укажите вес" });
      min(path.health.weight, 30, { message: "Минимальный вес - 30 кг" });
      max(path.health.weight, 300, { message: "Максимальный вес - 300 кг" });
      required(path.health.occupation, { message: "Укажите род занятий" });

      // Условная валидация стажа курения при isSmoker=true
      when(
        (form) => form.health.isSmoker === true,
        () => {
          required(path.health.smokingYears, { message: "Укажите стаж курения" });
          min(path.health.smokingYears, 0, { message: "Стаж не может быть отрицательным" });
        }
      );

      // Условная валидация заболеваний при hasChronicDiseases=true
      when(
        (form) => form.health.hasChronicDiseases === true,
        () => {
          required(path.health.chronicDiseases, { message: "Укажите хронические заболевания" });
        }
      );

      // Условная валидация операций при hadSurgeries=true
      when(
        (form) => form.health.hadSurgeries === true,
        () => {
          required(path.health.surgeries, { message: "Укажите перенесенные операции" });
        }
      );

      // Условная валидация экстремальных видов при practicesSports=true
      when(
        (form) => form.health.practicesSports === true,
        () => {
          validate(path.health.extremeSports, (value) => {
            if (value === true) {
              return { code: 'extreme', message: "Экстремальные виды спорта увеличивают стоимость полиса" };
            }
            return null;
          });
        }
      );

      // Валидация суммы опций покрытия (хотя бы одна должна быть выбрана)
      validate(path.lifeCoverageOptions, (_, ctx) => {
        const options = ctx.form.lifeCoverageOptions;
        if (!options.death.value && !options.disability.value && !options.criticalIllness.value && !options.accident.value) {
          return { code: 'coverage', message: "Выберите хотя бы один вид покрытия" };
        }
        return null;
      });
    }
  );
};

// Валидация шага 3: Объект страхования - Путешествия
export const step3TravelValidation: ValidationSchemaFn<InsuranceApplicationForm> = (path) => {
  when(
    (form) => form.insuranceType === 'travel',
    () => {
      required(path.travel.destination, { message: "Укажите страну/регион назначения" });
      required(path.travel.tripPurpose, { message: "Укажите цель поездки" });
      required(path.travel.departureDate, { message: "Укажите дату отъезда" });
      required(path.travel.returnDate, { message: "Укажите дату возвращения" });

      // Валидация дат (возвращение должно быть позже отъезда)
      validate(path.travel.returnDate, (value, ctx) => {
        if (!value || !ctx.form.travel.departureDate.value) return null;
        const departure = new Date(ctx.form.travel.departureDate.value);
        const returnDate = new Date(value);
        return returnDate <= departure 
          ? { code: 'date', message: "Дата возвращения должна быть позже даты отъезда" } 
          : null;
      });

      // Валидация путешественников
      validate(path.travelers, (value) => {
        if (!value || value.length === 0) {
          return { code: 'travelers', message: "Добавьте хотя бы одного путешественника" };
        }
        return null;
      });

      // Валидация каждого путешественника
      path.travelers.forEach((travelerPath, index) => {
        required(travelerPath.fullName, { message: `Путешественник ${index + 1}: укажите ФИО` });
        required(travelerPath.birthDate, { message: `Путешественник ${index + 1}: укажите дату рождения` });
        required(travelerPath.passportNumber, { message: `Путешественник ${index + 1}: укажите номер загранпаспорта` });
      });

      // Валидация суммы опций покрытия (хотя бы одна должна быть выбрана)
      validate(path.travelCoverageOptions, (_, ctx) => {
        const options = ctx.form.travelCoverageOptions;
        if (!options.medical.value && !options.baggage.value && !options.tripCancellation.value && !options.flightDelay.value && !options.carRental.value) {
          return { code: 'coverage', message: "Выберите хотя бы один вид покрытия" };
        }
        return null;
      });
    }
  );
};

// Валидация шага 4: Водители и застрахованные лица
export const step4Validation: ValidationSchemaFn<InsuranceApplicationForm> = (path) => {
  // Валидация водителей при КАСКО/ОСАГО
  when(
    (form) => (form.insuranceType === 'casco' || form.insuranceType === 'osago') && !form.unlimitedDrivers,
    () => {
      validate(path.drivers, (value) => {
        if (!value || value.length === 0) {
          return { code: 'drivers', message: "Добавьте хотя бы одного водителя" };
        }
        return null;
      });

      path.drivers.forEach((driverPath, index) => {
        required(driverPath.fullName, { message: `Водитель ${index + 1}: укажите ФИО` });
        required(driverPath.birthDate, { message: `Водитель ${index + 1}: укажите дату рождения` });
        required(driverPath.licenseNumber, { message: `Водитель ${index + 1}: укажите номер ВУ` });
        required(driverPath.licenseIssueDate, { message: `Водитель ${index + 1}: укажите дату выдачи ВУ` });
        required(driverPath.accidentsCount, { message: `Водитель ${index + 1}: укажите количество ДТП` });
        min(driverPath.accidentsCount, 0, { message: `Водитель ${index + 1}: количество ДТП не может быть отрицательным` });
      });
    }
  );

  // Валидация выгодоприобретателей при страховании жизни
  when(
    (form) => form.insuranceType === 'life',
    () => {
      validate(path.beneficiaries, (value) => {
        if (!value || value.length === 0) {
          return { code: 'beneficiaries', message: "Добавьте хотя бы одного выгодоприобретателя" };
        }
        return null;
      });

      path.beneficiaries.forEach((beneficiaryPath, index) => {
        required(beneficiaryPath.fullName, { message: `Выгодоприобретатель ${index + 1}: укажите ФИО` });
        required(beneficiaryPath.birthDate, { message: `Выгодоприобретатель ${index + 1}: укажите дату рождения` });
        required(beneficiaryPath.relationship, { message: `Выгодоприобретатель ${index + 1}: укажите степень родства` });
        required(beneficiaryPath.share, { message: `Выгодоприобретатель ${index + 1}: укажите долю` });
        min(beneficiaryPath.share, 1, { message: `Выгодоприобретатель ${index + 1}: доля должна быть не менее 1%` });
        max(beneficiaryPath.share, 100, { message: `Выгодоприобретатель ${index + 1}: доля не может превышать 100%` });
        required(beneficiaryPath.phone, { message: `Выгодоприобретатель ${index + 1}: укажите телефон` });
        pattern(beneficiaryPath.phone, /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/, { message: `Выгодоприобретатель ${index + 1}: некорректный формат телефона` });
      });

      // Валидация суммы долей (должна быть 100%)
      validate(path.totalBeneficiaryShare, (value) => {
        if (value !== 100) {
          return { code: 'share', message: "Сумма долей выгодоприобретателей должна быть 100%" };
        }
        return null;
      });
    }
  );
};

// Валидация шага 5: История и дополнительная информация
export const step5Validation: ValidationSchemaFn<InsuranceApplicationForm> = (path) => {
  // Условная валидация предыдущего полиса при hasPreviousInsurance=true
  when(
    (form) => form.hasPreviousInsurance === true,
    () => {
      required(path.previousInsurer, { message: "Укажите предыдущего страховщика" });
      required(path.previousPolicyNumber, { message: "Укажите номер предыдущего полиса" });
      required(path.previousPolicyEndDate, { message: "Укажите дату окончания предыдущего полиса" });
    }
  );

  // Условная валидация страховых случаев при hadClaims=true
  when(
    (form) => form.hadClaims === true,
    () => {
      validate(path.claims, (value) => {
        if (!value || value.length === 0) {
          return { code: 'claims', message: "Добавьте хотя бы один страховой случай" };
        }
        return null;
      });

      path.claims.forEach((claimPath, index) => {
        required(claimPath.date, { message: `Страховой случай ${index + 1}: укажите дату` });
        required(claimPath.type, { message: `Страховой случай ${index + 1}: укажите тип события` });
        required(claimPath.description, { message: `Страховой случай ${index + 1}: опишите событие` });
        required(claimPath.amount, { message: `Страховой случай ${index + 1}: укажите сумму выплаты` });
        min(claimPath.amount, 0, { message: `Страховой случай ${index + 1}: сумма не может быть отрицательной` });
      });
    }
  );
};

// Валидация шага 6: Расчет и подтверждение
export const step6Validation: ValidationSchemaFn<InsuranceApplicationForm> = (path) => {
  required(path.agreePersonalData, { message: "Необходимо согласие на обработку персональных данных" });
  validate(path.agreePersonalData, (value) => value !== true ? { code: 'required', message: "Необходимо согласие на обработку персональных данных" } : null);

  required(path.agreeTerms, { message: "Необходимо согласие с правилами страхования" });
  validate(path.agreeTerms, (value) => value !== true ? { code: 'required', message: "Необходимо согласие с правилами страхования" } : null);

 required(path.agreeElectronicPolicy, { message: "Необходимо согласие на электронный полис" });
  validate(path.agreeElectronicPolicy, (value) => value !== true ? { code: 'required', message: "Необходимо согласие на электронный полис" } : null);

  required(path.confirmAccuracy, { message: "Подтвердите достоверность данных" });
  validate(path.confirmAccuracy, (value) => value !== true ? { code: 'required', message: "Подтвердите достоверность данных" } : null);

  required(path.electronicSignature, { message: "Введите SMS-код подтверждения" });
  pattern(path.electronicSignature, /^\d{6}$/, { message: "SMS-код должен содержать 6 цифр" });
};

// Карта валидаций для useStepForm
export const STEP_VALIDATIONS: Record<number, ValidationSchemaFn<InsuranceApplicationForm>> = {
  1: step1Validation,
  2: step2Validation,
 3: (path) => {
    // Вызов валидации в зависимости от типа страхования
    step3VehicleValidation(path);
    step3PropertyValidation(path);
    step3HealthValidation(path);
    step3TravelValidation(path);
  },
  4: step4Validation,
  5: step5Validation,
 6: step6Validation,
};

// Полная валидация (для финальной отправки)
export const validation: ValidationSchemaFn<InsuranceApplicationForm> = (path) => {
  step1Validation(path);
  step2Validation(path);
  step3VehicleValidation(path);
  step3PropertyValidation(path);
  step3HealthValidation(path);
  step3TravelValidation(path);
  step4Validation(path);
  step5Validation(path);
  step6Validation(path);
};