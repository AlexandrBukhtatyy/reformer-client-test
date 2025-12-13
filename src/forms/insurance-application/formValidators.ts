import { required, email, min, max, number, date, applyWhen } from '@reformer/core/validators';
import type { ValidationSchemaFn, FieldPath } from '@reformer/core';
import type { InsuranceApplicationForm } from './type';

export const insuranceApplicationValidation: ValidationSchemaFn<InsuranceApplicationForm> = (path: FieldPath<InsuranceApplicationForm>) => {
  // Step 1: Insurance Type and Parameters
  required(path.insuranceType, { message: 'Тип страхования обязателен' });
  required(path.insurancePeriod, { message: 'Срок страхования обязателен' });
  required(path.startDate, { message: 'Дата начала обязательна' });
  date(path.startDate, { message: 'Некорректная дата начала' });
  required(path.coverageAmount, { message: 'Страховая сумма обязательна' });
  number(path.coverageAmount, { message: 'Страховая сумма должна быть числом' });
  min(path.coverageAmount, 10000, { message: 'Минимальная страховая сумма 10 000 ₽' });
  required(path.paymentType, { message: 'Тип оплаты обязателен' });

  // Conditional validation for installments
  applyWhen(
    path.paymentType,
    (type) => type === 'installments',
    (p) => {
      required(p.installments, { message: 'Количество платежей обязательно при рассрочке' });
      min(p.installments, 2, { message: 'Минимум 2 платежа' });
      max(p.installments, 12, { message: 'Максимум 12 платежей' });
    }
  );

  // Step 2: Insured Data
  required(path.insuredType, { message: 'Тип страхователя обязателен' });

  // Personal data validation (conditional on insuredType)
  applyWhen(
    path.insuredType,
    (type) => type === 'individual',
    (p) => {
      required(p.personalData.lastName, { message: 'Фамилия обязательна' });
      required(p.personalData.firstName, { message: 'Имя обязательно' });
      required(p.personalData.birthDate, { message: 'Дата рождения обязательна' });
      date(p.personalData.birthDate, { message: 'Некорректная дата рождения' });
      
      // Validate age is between 18 and 75
      // This would be implemented with custom validation that calculates age from birthDate
      
      required(p.passportData.series, { message: 'Серия паспорта обязательна' });
      required(p.passportData.number, { message: 'Номер паспорта обязателен' });
      required(p.passportData.issueDate, { message: 'Дата выдачи паспорта обязательна' });
      date(p.passportData.issueDate, { message: 'Некорректная дата выдачи' });
      required(p.passportData.issuedBy, { message: 'Кем выдан паспорт обязательно' });
    }
  );

  // Company data validation (conditional on insuredType)
  applyWhen(
    path.insuredType,
    (type) => type === 'company',
    (p) => {
      required(p.companyData.name, { message: 'Название организации обязательно' });
      required(p.companyData.inn, { message: 'ИНН обязателен' });
      required(p.companyData.ogrn, { message: 'ОГРН обязателен' });
      required(p.companyData.kpp, { message: 'КПП обязателен' });
      required(p.companyData.ceoName, { message: 'ФИО руководителя обязателен' });
    }
  );

  // Contact information
  required(path.phone, { message: 'Телефон обязателен' });
  required(path.email, { message: 'Email обязателен' });
  email(path.email, { message: 'Некорректный формат email' });

  // Step 3: Insurance Object - Vehicle (conditional on insuranceType)
  applyWhen(
    path.insuranceType,
    (type) => type === 'casco' || type === 'osago',
    (p) => {
      required(p.vehicle!.vin, { message: 'VIN-номер обязателен' });
      required(p.vehicle!.brand, { message: 'Марка автомобиля обязательна' });
      required(p.vehicle!.model, { message: 'Модель автомобиля обязательна' });
      required(p.vehicle!.year, { message: 'Год выпуска обязателен' });
      number(p.vehicle!.year, { message: 'Год должен быть числом' });
      min(p.vehicle!.year, 1990, { message: 'Минимальный год 1990' });
      max(p.vehicle!.year, new Date().getFullYear(), { message: `Максимальный год ${new Date().getFullYear()}` });
      required(p.vehicle!.mileage, { message: 'Пробег обязателен' });
      number(p.vehicle!.mileage, { message: 'Пробег должен быть числом' });
      min(p.vehicle!.mileage, 0, { message: 'Пробег не может быть отрицательным' });
      required(p.vehicle!.enginePower, { message: 'Мощность двигателя обязательна' });
      number(p.vehicle!.enginePower, { message: 'Мощность должна быть числом' });
      min(p.vehicle!.enginePower, 1, { message: 'Мощность должна быть больше 0' });
      required(p.vehicle!.licensePlate, { message: 'Госномер обязателен' });
      required(p.vehicle!.registrationCert, { message: 'Свидетельство о регистрации обязательно' });
    }
  );

  // Property validation (conditional on insuranceType)
  applyWhen(
    path.insuranceType,
    (type) => type === 'property',
    (p) => {
      required(p.property!.type, { message: 'Тип недвижимости обязателен' });
      required(p.property!.address.region, { message: 'Регион обязателен' });
      required(p.property!.address.city, { message: 'Город обязателен' });
      required(p.property!.address.street, { message: 'Улица обязательна' });
      required(p.property!.address.house, { message: 'Дом обязателен' });
      required(p.property!.area, { message: 'Площадь обязательна' });
      number(p.property!.area, { message: 'Площадь должна быть числом' });
      min(p.property!.area, 1, { message: 'Площадь должна быть больше 0' });
      required(p.property!.yearBuilt, { message: 'Год постройки обязателен' });
      number(p.property!.yearBuilt, { message: 'Год должен быть числом' });
      min(p.property!.yearBuilt, 1800, { message: 'Минимальный год 1800' });
      max(p.property!.yearBuilt, new Date().getFullYear(), { message: `Максимальный год ${new Date().getFullYear()}` });
      required(p.property!.wallMaterial, { message: 'Материал стен обязателен' });
      required(p.property!.marketValue, { message: 'Рыночная стоимость обязательна' });
      number(p.property!.marketValue, { message: 'Стоимость должна быть числом' });
      min(p.property!.marketValue, 0, { message: 'Стоимость не может быть отрицательной' });
      required(p.property!.ownershipDoc, { message: 'Документ о собственности обязателен' });
    }
  );

  // Health validation (conditional on insuranceType)
  applyWhen(
    path.insuranceType,
    (type) => type === 'life',
    (p) => {
      required(p.health!.height, { message: 'Рост обязателен' });
      number(p.health!.height, { message: 'Рост должен быть числом' });
      min(p.health!.height, 100, { message: 'Минимальный рост 100 см' });
      max(p.health!.height, 250, { message: 'Максимальный рост 250 см' });
      required(p.health!.weight, { message: 'Вес обязателен' });
      number(p.health!.weight, { message: 'Вес должен быть числом' });
      min(p.health!.weight, 30, { message: 'Минимальный вес 30 кг' });
      max(p.health!.weight, 300, { message: 'Максимальный вес 300 кг' });
      required(p.health!.occupation, { message: 'Род занятий обязателен' });
      
      // Conditional validations
      applyWhen(
        p.health!.isSmoker,
        (isSmoker) => isSmoker === true,
        (pp) => {
          required(pp.health!.smokingYears, { message: 'Стаж курения обязателен для курящих' });
          number(pp.health!.smokingYears, { message: 'Стаж должен быть числом' });
          min(pp.health!.smokingYears, 0, { message: 'Стаж не может быть отрицательным' });
        }
      );
      
      applyWhen(
        p.health!.hasChronicDiseases,
        (hasDiseases) => hasDiseases === true,
        (pp) => {
          required(pp.health!.chronicDiseases, { message: 'Описание заболеваний обязательно' });
        }
      );
      
      applyWhen(
        p.health!.hadSurgeries,
        (hadSurgeries) => hadSurgeries === true,
        (pp) => {
          required(pp.health!.surgeries, { message: 'Описание операций обязательно' });
        }
      );
    }
  );

  // Travel validation (conditional on insuranceType)
  applyWhen(
    path.insuranceType,
    (type) => type === 'travel',
    (p) => {
      required(p.travel!.destination, { message: 'Страна назначения обязательна' });
      required(p.travel!.tripPurpose, { message: 'Цель поездки обязательна' });
      required(p.travel!.departureDate, { message: 'Дата отъезда обязательна' });
      date(p.travel!.departureDate, { message: 'Некорректная дата отъезда' });
      required(p.travel!.returnDate, { message: 'Дата возвращения обязательна' });
      date(p.travel!.returnDate, { message: 'Некорректная дата возвращения' });
      
      // Validate return date is after departure date
      // This would be handled with cross-field validation
    }
  );

  // Step 4: Drivers validation (conditional on insuranceType)
  applyWhen(
    path.insuranceType,
    (type) => type === 'casco' || type === 'osago',
    (p) => {
      // If unlimited drivers is false, require at least one driver
      applyWhen(
        p.unlimitedDrivers!,
        (unlimited) => unlimited === false,
        (pp) => {
          // For array validation, we'll use a custom validation approach
          // validateItems would be used in a real implementation
        }
      );
    }
  );

  // Beneficiaries validation (conditional on insuranceType)
  applyWhen(
    path.insuranceType,
    (type) => type === 'life',
    (p) => {
      // For array validation, we'll use a custom validation approach
      // validateItems would be used in a real implementation
    }
  );

  // Travelers validation (conditional on insuranceType)
  applyWhen(
    path.insuranceType,
    (type) => type === 'travel',
    (p) => {
      // For array validation, we'll use a custom validation approach
      // validateItems would be used in a real implementation
    }
  );

  // Step 5: History and Additional Info
  applyWhen(
    path.hasPreviousInsurance,
    (hasPrev) => hasPrev === true,
    (p) => {
      required(p.previousInsurer, { message: 'Предыдущий страховщик обязателен' });
      required(p.previousPolicyNumber, { message: 'Номер предыдущего полиса обязателен' });
      required(p.previousPolicyEndDate, { message: 'Дата окончания предыдущего полиса обязательна' });
      date(p.previousPolicyEndDate, { message: 'Некорректная дата окончания' });
    }
  );

  applyWhen(
    path.hadClaims,
    (had) => had === true,
    (p) => {
      // For claims array validation, we'll use a custom validation approach
      // validateItems would be used in a real implementation
    }
  );

  // Step 6: Confirmation
  required(path.agreePersonalData, { message: 'Необходимо согласие на обработку персональных данных' });
  required(path.agreeTerms, { message: 'Необходимо согласие с условиями страхования' });
  required(path.agreeElectronicPolicy, { message: 'Необходимо согласие на электронный полис' });
  required(path.confirmAccuracy, { message: 'Необходимо подтвердить достоверность информации' });
  required(path.electronicSignature, { message: 'Электронная подпись обязательна' });
};