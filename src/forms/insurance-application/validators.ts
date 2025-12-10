import type { ValidationSchemaFn } from '@reformer/core';
import { required, email, min, max, pattern, validate } from '@reformer/core/validators';
import type { InsuranceApplicationForm } from './type';

export const insuranceApplicationValidation: ValidationSchemaFn<InsuranceApplicationForm> = (path) => {
  // Step 1: Insurance Type and Parameters
  required(path.insuranceType, { message: 'Тип страхования обязателен' });
  required(path.insurancePeriod, { message: 'Срок страхования обязателен' });
  required(path.startDate, { message: 'Дата начала обязательна' });
  required(path.coverageAmount, { message: 'Страховая сумма обязательна' });
  min(path.coverageAmount, 100000, { message: 'Страховая сумма должна быть не менее 100 000 ₽' });
  max(path.coverageAmount, 5000000, { message: 'Страховая сумма должна быть не более 50 000 000 ₽' });

  // Conditional validation for installments
  validate(path.installments, (value, ctx) => {
    if (ctx.form.paymentType.value === 'installments' && !value) {
      return { code: 'required', message: 'Количество платежей обязательно при рассрочке' };
    }
    return null;
  });

  // Step 2: Insured Person Data
  required(path.insuredType, { message: 'Тип страхователя обязателен' });

  // Conditional validation for individual
 validate(path.personalData.lastName, (value, ctx) => {
    if (ctx.form.insuredType.value === 'individual' && !value) {
      return { code: 'required', message: 'Фамилия обязательна' };
    }
    return null;
  });

  validate(path.personalData.firstName, (value, ctx) => {
    if (ctx.form.insuredType.value === 'individual' && !value) {
      return { code: 'required', message: 'Имя обязательно' };
    }
    return null;
  });

  validate(path.personalData.birthDate, (value, ctx) => {
    if (ctx.form.insuredType.value === 'individual' && !value) {
      return { code: 'required', message: 'Дата рождения обязательна' };
    }
    return null;
  });

  validate(path.personalData.gender, (value, ctx) => {
    if (ctx.form.insuredType.value === 'individual' && !value) {
      return { code: 'required', message: 'Пол обязателен' };
    }
    return null;
 });

  validate(path.passportData.series, (value, ctx) => {
    if (ctx.form.insuredType.value === 'individual' && !value) {
      return { code: 'required', message: 'Серия паспорта обязательна' };
    }
    return null;
  });

  validate(path.passportData.number, (value, ctx) => {
    if (ctx.form.insuredType.value === 'individual' && !value) {
      return { code: 'required', message: 'Номер паспорта обязателен' };
    }
    return null;
 });

  validate(path.passportData.issueDate, (value, ctx) => {
    if (ctx.form.insuredType.value === 'individual' && !value) {
      return { code: 'required', message: 'Дата выдачи паспорта обязательна' };
    }
    return null;
  });

  validate(path.passportData.issuedBy, (value, ctx) => {
    if (ctx.form.insuredType.value === 'individual' && !value) {
      return { code: 'required', message: 'Кем выдан паспорт обязательно' };
    }
    return null;
  });

  // Conditional validation for company
  validate(path.companyData.name, (value, ctx) => {
    if (ctx.form.insuredType.value === 'company' && !value) {
      return { code: 'required', message: 'Название организации обязательно' };
    }
    return null;
  });

  validate(path.companyData.inn, (value, ctx) => {
    if (ctx.form.insuredType.value === 'company' && !value) {
      return { code: 'required', message: 'ИНН организации обязателен' };
    }
    return null;
  });

  validate(path.companyData.ogrn, (value, ctx) => {
    if (ctx.form.insuredType.value === 'company' && !value) {
      return { code: 'required', message: 'ОГРН обязателен' };
    }
    return null;
  });

  validate(path.companyData.kpp, (value, ctx) => {
    if (ctx.form.insuredType.value === 'company' && !value) {
      return { code: 'required', message: 'КПП обязателен' };
    }
    return null;
  });

  validate(path.companyData.ceoName, (value, ctx) => {
    if (ctx.form.insuredType.value === 'company' && !value) {
      return { code: 'required', message: 'ФИО руководителя обязательно' };
    }
    return null;
  });

  required(path.phone, { message: 'Телефон обязателен' });
 email(path.email, { message: 'Некорректный email' });

  // Step 3: Insurance Object (conditional based on insuranceType)
  // Vehicle fields (for casco/osago)
  validate(path.vehicle.vin, (value, ctx) => {
    if ((ctx.form.insuranceType.value === 'casco' || ctx.form.insuranceType.value === 'osago') && !value) {
      return { code: 'required', message: 'VIN-номер обязателен' };
    }
    return null;
  });

  validate(path.vehicle.vin, (value, ctx) => {
    if ((ctx.form.insuranceType.value === 'casco' || ctx.form.insuranceType.value === 'osago') && value && (value.length !== 17)) {
      return { code: 'length', message: 'VIN-номер должен содержать 17 символов' };
    }
    return null;
  });

  validate(path.vehicle.brand, (value, ctx) => {
    if ((ctx.form.insuranceType.value === 'casco' || ctx.form.insuranceType.value === 'osago') && !value) {
      return { code: 'required', message: 'Марка автомобиля обязательна' };
    }
    return null;
  });

  validate(path.vehicle.model, (value, ctx) => {
    if ((ctx.form.insuranceType.value === 'casco' || ctx.form.insuranceType.value === 'osago') && !value) {
      return { code: 'required', message: 'Модель автомобиля обязательна' };
    }
    return null;
  });

  validate(path.vehicle.year, (value, ctx) => {
    if ((ctx.form.insuranceType.value === 'casco' || ctx.form.insuranceType.value === 'osago') && !value) {
      return { code: 'required', message: 'Год выпуска обязателен' };
    }
    if (value && (value < 1990 || value > new Date().getFullYear())) {
      return { code: 'range', message: 'Год выпуска должен быть от 190 до текущего года' };
    }
    return null;
  });

  validate(path.vehicle.mileage, (value, ctx) => {
    if ((ctx.form.insuranceType.value === 'casco' || ctx.form.insuranceType.value === 'osago') && value === null) {
      return { code: 'required', message: 'Пробег обязателен' };
    }
    if (value && value < 0) {
      return { code: 'min', message: 'Пробег не может быть отрицательным' };
    }
    return null;
  });

  validate(path.vehicle.enginePower, (value, ctx) => {
    if ((ctx.form.insuranceType.value === 'casco' || ctx.form.insuranceType.value === 'osago') && value === null) {
      return { code: 'required', message: 'Мощность двигателя обязательна' };
    }
    if (value && value < 1) {
      return { code: 'min', message: 'Мощность двигателя должна быть положительной' };
    }
    return null;
  });

  validate(path.vehicle.bodyType, (value, ctx) => {
    if ((ctx.form.insuranceType.value === 'casco' || ctx.form.insuranceType.value === 'osago') && !value) {
      return { code: 'required', message: 'Тип кузова обязателен' };
    }
    return null;
  });

  validate(path.vehicle.transmission, (value, ctx) => {
    if ((ctx.form.insuranceType.value === 'casco' || ctx.form.insuranceType.value === 'osago') && !value) {
      return { code: 'required', message: 'Коробка передач обязательна' };
    }
    return null;
  });

  validate(path.vehicle.licensePlate, (value, ctx) => {
    if ((ctx.form.insuranceType.value === 'casco' || ctx.form.insuranceType.value === 'osago') && !value) {
      return { code: 'required', message: 'Госномер обязателен' };
    }
    return null;
  });

  validate(path.vehicle.registrationCert, (value, ctx) => {
    if ((ctx.form.insuranceType.value === 'casco' || ctx.form.insuranceType.value === 'osago') && !value) {
      return { code: 'required', message: 'Номер СТС обязателен' };
    }
    return null;
 });

  validate(path.vehicle.usagePurpose, (value, ctx) => {
    if ((ctx.form.insuranceType.value === 'casco' || ctx.form.insuranceType.value === 'osago') && !value) {
      return { code: 'required', message: 'Цель использования обязательна' };
    }
    return null;
  });

  // Conditional validation for marketValue (only for casco)
  validate(path.vehicle.marketValue, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'casco' && value === null) {
      return { code: 'required', message: 'Рыночная стоимость обязательна для КАСКО' };
    }
    if (value && value < 0) {
      return { code: 'min', message: 'Рыночная стоимость не может быть отрицательной' };
    }
    return null;
  });

  // Conditional validation for antiTheft brand
  validate(path.vehicle.antiTheftBrand, (value, ctx) => {
    if (ctx.form.vehicle.hasAntiTheft.value === true && !value) {
      return { code: 'required', message: 'Марка противоугонной системы обязательна' };
    }
    return null;
  });

  // Property fields (for property)
  validate(path.property.type, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'property' && !value) {
      return { code: 'required', message: 'Тип недвижимости обязателен' };
    }
    return null;
 });

  validate(path.property.address.region, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'property' && !value) {
      return { code: 'required', message: 'Регион обязателен' };
    }
    return null;
  });

  validate(path.property.address.city, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'property' && !value) {
      return { code: 'required', message: 'Город обязателен' };
    }
    return null;
  });

  validate(path.property.address.street, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'property' && !value) {
      return { code: 'required', message: 'Улица обязательна' };
    }
    return null;
  });

  validate(path.property.address.house, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'property' && !value) {
      return { code: 'required', message: 'Номер дома обязателен' };
    }
    return null;
  });

  validate(path.property.area, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'property' && value === null) {
      return { code: 'required', message: 'Площадь обязательна' };
    }
    if (value && value < 1) {
      return { code: 'min', message: 'Площадь должна быть положительной' };
    }
    return null;
  });

  validate(path.property.floors, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'property' && value === null) {
      return { code: 'required', message: 'Этажность здания обязательна' };
    }
    if (value && value < 1) {
      return { code: 'min', message: 'Этажность должна быть положительной' };
    }
    return null;
  });

  // Conditional validation for apartment floor
  validate(path.property.floor, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'property' && ctx.form.property.type.value === 'apartment' && value === null) {
      return { code: 'required', message: 'Этаж квартиры обязателен для квартир' };
    }
    if (value && value < 1) {
      return { code: 'min', message: 'Этаж должен быть положительным' };
    }
    return null;
  });

  validate(path.property.yearBuilt, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'property' && value === null) {
      return { code: 'required', message: 'Год постройки обязателен' };
    }
    if (value && (value < 1800 || value > new Date().getFullYear())) {
      return { code: 'range', message: 'Год постройки должен быть от 1800 до текущего года' };
    }
    return null;
  });

  validate(path.property.wallMaterial, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'property' && !value) {
      return { code: 'required', message: 'Материал стен обязателен' };
    }
    return null;
  });

  validate(path.property.marketValue, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'property' && value === null) {
      return { code: 'required', message: 'Рыночная стоимость обязательна' };
    }
    if (value && value < 0) {
      return { code: 'min', message: 'Рыночная стоимость не может быть отрицательной' };
    }
    return null;
  });

  validate(path.property.ownershipDoc, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'property' && !value) {
      return { code: 'required', message: 'Номер документа о собственности обязателен' };
    }
    return null;
  });

  // Validate at least one coverage option is selected
  validate(path.propertyCoverageOptions, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'property' && value && !value.structure && !value.interior && !value.movables && !value.liability) {
      return { code: 'noCoverage', message: 'Должен быть выбран хотя бы один вариант покрытия' };
    }
    return null;
  });

  // Health fields (for life)
  validate(path.health.height, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'life' && value === null) {
      return { code: 'required', message: 'Рост обязателен' };
    }
    if (value && (value < 100 || value > 250)) {
      return { code: 'range', message: 'Рост должен быть от 100 до 250 см' };
    }
    return null;
  });

  validate(path.health.weight, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'life' && value === null) {
      return { code: 'required', message: 'Вес обязателен' };
    }
    if (value && (value < 30 || value > 300)) {
      return { code: 'range', message: 'Вес должен быть от 30 до 300 кг' };
    }
    return null;
  });

  // Conditional validation for smoking years
  validate(path.health.smokingYears, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'life' && ctx.form.health.isSmoker.value === true && value === null) {
      return { code: 'required', message: 'Стаж курения обязателен для курящих' };
    }
    if (value && value < 0) {
      return { code: 'min', message: 'Стаж курения не может быть отрицательным' };
    }
    return null;
  });

  // Conditional validation for chronic diseases
  validate(path.health.chronicDiseases, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'life' && ctx.form.health.hasChronicDiseases.value === true && !value) {
      return { code: 'required', message: 'Описание заболеваний обязательно' };
    }
    return null;
  });

  // Conditional validation for surgeries
 validate(path.health.surgeries, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'life' && ctx.form.health.hadSurgeries.value === true && !value) {
      return { code: 'required', message: 'Описание операций обязательно' };
    }
    return null;
 });

  validate(path.health.occupation, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'life' && !value) {
      return { code: 'required', message: 'Род занятий обязателен' };
    }
    return null;
  });

  // Validate at least one coverage option is selected
  validate(path.lifeCoverageOptions, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'life' && value && !value.death && !value.disability && !value.criticalIllness && !value.accident) {
      return { code: 'noCoverage', message: 'Должен быть выбран хотя бы один вариант покрытия' };
    }
    return null;
  });

  // Travel fields (for travel)
  validate(path.travel.destination, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'travel' && !value) {
      return { code: 'required', message: 'Страна/регион назначения обязателен' };
    }
    return null;
  });

  validate(path.travel.tripPurpose, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'travel' && !value) {
      return { code: 'required', message: 'Цель поездки обязательна' };
    }
    return null;
  });

  validate(path.travel.departureDate, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'travel' && !value) {
      return { code: 'required', message: 'Дата отъезда обязательна' };
    }
    return null;
  });

  validate(path.travel.returnDate, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'travel' && !value) {
      return { code: 'required', message: 'Дата возвращения обязательна' };
    }
    if (value && ctx.form.travel.departureDate.value) {
      const departure = new Date(ctx.form.travel.departureDate.value);
      const returnDate = new Date(value);
      if (returnDate <= departure) {
        return { code: 'invalidDate', message: 'Дата возвращения должна быть позже даты отъезда' };
      }
    }
    return null;
  });

  // Validate travelers array
  validate(path.travelers, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'travel' && (!value || value.length === 0)) {
      return { code: 'noTravelers', message: 'Должен быть указан хотя бы один путешественник' };
    }
    return null;
  });

  // Validate at least one coverage option is selected
  validate(path.travelCoverageOptions, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'travel' && value && !value.medical && !value.baggage && !value.tripCancellation && !value.flightDelay && !value.carRental) {
      return { code: 'noCoverage', message: 'Должен быть выбран хотя бы один вариант покрытия' };
    }
    return null;
  });

  // Step 4: Drivers/Beneficiaries (conditional based on insuranceType)
  // Drivers (for casco/osago)
  validate(path.drivers, (value, ctx) => {
    if ((ctx.form.insuranceType.value === 'casco' || ctx.form.insuranceType.value === 'osago') && !ctx.form.unlimitedDrivers.value && (!value || value.length === 0)) {
      return { code: 'noDrivers', message: 'Должен быть указан хотя бы один водитель' };
    }
    return null;
  });

  // Beneficiaries (for life)
  validate(path.beneficiaries, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'life' && (!value || value.length === 0)) {
      return { code: 'noBeneficiaries', message: 'Должен быть указан хотя бы один выгодоприобретатель' };
    }
    return null;
  });

  // Validate total beneficiary share is 100%
  validate(path.beneficiaries, (value, ctx) => {
    if (ctx.form.insuranceType.value === 'life' && value && value.length > 0) {
      const totalShare = value.reduce((sum, _, index) => {
        const shareValue = ctx.form.beneficiaries[index].share.value;
        return sum + (shareValue || 0);
      }, 0);

      if (totalShare !== 10) {
        return { code: 'invalidShare', message: 'Сумма долей выгодоприобретателей должна быть равна 100%' };
      }
    }
    return null;
  });

  // Step 5: History and Additional Info
  // Conditional validation for previous insurance
  validate(path.previousInsurer, (value, ctx) => {
    if (ctx.form.hasPreviousInsurance.value === true && !value) {
      return { code: 'required', message: 'Предыдущий страховщик обязателен' };
    }
    return null;
  });

  validate(path.previousPolicyNumber, (value, ctx) => {
    if (ctx.form.hasPreviousInsurance.value === true && !value) {
      return { code: 'required', message: 'Номер предыдущего полиса обязателен' };
    }
    return null;
  });

  validate(path.previousPolicyEndDate, (value, ctx) => {
    if (ctx.form.hasPreviousInsurance.value === true && !value) {
      return { code: 'required', message: 'Дата окончания предыдущего полиса обязательна' };
    }
    return null;
  });

  // Conditional validation for claims
  validate(path.claims, (value, ctx) => {
    if (ctx.form.hadClaims.value === true && (!value || value.length === 0)) {
      return { code: 'noClaims', message: 'Должен быть указан хотя бы один страховой случай' };
    }
    return null;
  });

  // Step 6: Calculation and Confirmation
  // All agreement checkboxes must be checked
  validate(path.agreePersonalData, (value) => {
    if (!value) {
      return { code: 'noConsent', message: 'Необходимо согласие на обработку персональных данных' };
    }
    return null;
  });

  validate(path.agreeTerms, (value) => {
    if (!value) {
      return { code: 'noConsent', message: 'Необходимо согласие с правилами страхования' };
    }
    return null;
  });

  validate(path.agreeElectronicPolicy, (value) => {
    if (!value) {
      return { code: 'noConsent', message: 'Необходимо согласие на электронный полис' };
    }
    return null;
  });

  validate(path.confirmAccuracy, (value) => {
    if (!value) {
      return { code: 'noConsent', message: 'Необходимо подтверждение достоверности данных' };
    }
    return null;
 });

  required(path.electronicSignature, { message: 'SMS-код подтверждения обязателен' });
  pattern(path.electronicSignature, /^\d{6}$/, { message: 'SMS-код должен содержать 6 цифр' });
};