// Step 3: Insurance Object - Validators
import type { ValidationSchemaFn } from '@reformer/core';
import { required, min, max, minLength, maxLength, applyWhen, validate, validateItems } from '@reformer/core/validators';
import type { InsuranceApplicationForm } from '../type';

export const step3Validation: ValidationSchemaFn<InsuranceApplicationForm> = (path) => {
  const currentYear = new Date().getFullYear();

  // Vehicle fields - conditional for CASCO/OSAGO
  applyWhen(
    path.insuranceType,
    (type) => type === 'casco' || type === 'osago',
    (p) => {
      required(p.vehicle.vin, { message: 'Введите VIN-номер' });
      minLength(p.vehicle.vin, 17, { message: 'VIN-номер должен содержать 17 символов' });
      maxLength(p.vehicle.vin, 17, { message: 'VIN-номер должен содержать 17 символов' });

      required(p.vehicle.brand, { message: 'Выберите марку автомобиля' });
      required(p.vehicle.model, { message: 'Выберите модель автомобиля' });

      required(p.vehicle.year, { message: 'Укажите год выпуска' });
      min(p.vehicle.year, 1990, { message: 'Год выпуска должен быть не ранее 1990' });
      max(p.vehicle.year, currentYear, { message: `Год выпуска должен быть не позднее ${currentYear}` });

      required(p.vehicle.mileage, { message: 'Укажите пробег' });
      min(p.vehicle.mileage, 0, { message: 'Пробег не может быть отрицательным' });

      required(p.vehicle.enginePower, { message: 'Укажите мощность двигателя' });
      min(p.vehicle.enginePower, 1, { message: 'Мощность двигателя должна быть больше 0' });

      required(p.vehicle.bodyType, { message: 'Выберите тип кузова' });
      required(p.vehicle.transmission, { message: 'Выберите коробку передач' });
      required(p.vehicle.licensePlate, { message: 'Введите госномер' });
      required(p.vehicle.registrationCert, { message: 'Введите номер СТС' });
      required(p.vehicle.usagePurpose, { message: 'Выберите цель использования' });
    }
  );

  // Market value only for CASCO (separate applyWhen at root level)
  applyWhen(
    path.insuranceType,
    (type) => type === 'casco',
    (p) => {
      required(p.vehicle.marketValue, { message: 'Укажите рыночную стоимость' });
      min(p.vehicle.marketValue, 0, { message: 'Рыночная стоимость не может быть отрицательной' });
    }
  );

  // Anti-theft brand conditional (use validate with form context)
  validate(path.vehicle.antiTheftBrand, (value, ctx) => {
    const form = ctx.form as InsuranceApplicationForm;
    const insuranceType = form.insuranceType;
    const hasAntiTheft = form.vehicle?.hasAntiTheft;

    if ((insuranceType === 'casco' || insuranceType === 'osago') && hasAntiTheft === true && !value) {
      return { code: 'required', message: 'Укажите марку противоугонной системы' };
    }
    return null;
  });

  // Property fields - conditional for Property insurance
  applyWhen(
    path.insuranceType,
    (type) => type === 'property',
    (p) => {
      required(p.property.type, { message: 'Выберите тип недвижимости' });
      required(p.property.address.region, { message: 'Укажите регион' });
      required(p.property.address.city, { message: 'Укажите город' });
      required(p.property.address.street, { message: 'Укажите улицу' });
      required(p.property.address.house, { message: 'Укажите номер дома' });

      required(p.property.area, { message: 'Укажите площадь' });
      min(p.property.area, 1, { message: 'Площадь должна быть больше 0' });

      required(p.property.floors, { message: 'Укажите этажность здания' });
      min(p.property.floors, 1, { message: 'Этажность должна быть больше 0' });

      required(p.property.yearBuilt, { message: 'Укажите год постройки' });
      min(p.property.yearBuilt, 1800, { message: 'Год постройки должен быть не ранее 1800' });
      max(p.property.yearBuilt, currentYear, { message: `Год постройки должен быть не позднее ${currentYear}` });

      required(p.property.wallMaterial, { message: 'Выберите материал стен' });
      required(p.property.marketValue, { message: 'Укажите рыночную стоимость' });
      min(p.property.marketValue, 0, { message: 'Рыночная стоимость не может быть отрицательной' });
      required(p.property.ownershipDoc, { message: 'Введите номер документа о собственности' });

      // At least one coverage option must be selected
      validate(p.propertyCoverageOptions.structure, (_, ctx) => {
        const form = ctx.form as InsuranceApplicationForm;
        const opts = form.propertyCoverageOptions;
        if (!opts.structure && !opts.interior && !opts.movables && !opts.liability) {
          return { code: 'coverage_required', message: 'Выберите хотя бы один вариант покрытия' };
        }
        return null;
      });
    }
  );

  // Floor only for apartments (use validate with form context)
  validate(path.property.floor, (value, ctx) => {
    const form = ctx.form as InsuranceApplicationForm;
    if (form.insuranceType === 'property' && form.property?.type === 'apartment') {
      if (value === undefined || value === null) {
        return { code: 'required', message: 'Укажите этаж квартиры' };
      }
      if (value < 1) {
        return { code: 'min', message: 'Этаж должен быть больше 0' };
      }
    }
    return null;
  });

  // Health fields - conditional for Life insurance
  applyWhen(
    path.insuranceType,
    (type) => type === 'life',
    (p) => {
      required(p.health.height, { message: 'Укажите рост' });
      min(p.health.height, 100, { message: 'Рост должен быть не менее 100 см' });
      max(p.health.height, 250, { message: 'Рост должен быть не более 250 см' });

      required(p.health.weight, { message: 'Укажите вес' });
      min(p.health.weight, 30, { message: 'Вес должен быть не менее 30 кг' });
      max(p.health.weight, 300, { message: 'Вес должен быть не более 300 кг' });

      required(p.health.occupation, { message: 'Укажите род занятий' });

      // At least one life coverage option must be selected
      validate(p.lifeCoverageOptions.death, (_, ctx) => {
        const form = ctx.form as InsuranceApplicationForm;
        const opts = form.lifeCoverageOptions;
        if (!opts.death && !opts.disability && !opts.criticalIllness && !opts.accident) {
          return { code: 'coverage_required', message: 'Выберите хотя бы один вариант покрытия' };
        }
        return null;
      });
    }
  );

  // Smoking years conditional (use validate with form context)
  validate(path.health.smokingYears, (value, ctx) => {
    const form = ctx.form as InsuranceApplicationForm;
    if (form.insuranceType === 'life' && form.health?.isSmoker === true) {
      if (value === undefined || value === null) {
        return { code: 'required', message: 'Укажите стаж курения' };
      }
      if (value < 0) {
        return { code: 'min', message: 'Стаж курения не может быть отрицательным' };
      }
    }
    return null;
  });

  // Chronic diseases description conditional
  validate(path.health.chronicDiseases, (value, ctx) => {
    const form = ctx.form as InsuranceApplicationForm;
    if (form.insuranceType === 'life' && form.health?.hasChronicDiseases === true && !value) {
      return { code: 'required', message: 'Опишите хронические заболевания' };
    }
    return null;
  });

  // Surgeries description conditional
  validate(path.health.surgeries, (value, ctx) => {
    const form = ctx.form as InsuranceApplicationForm;
    if (form.insuranceType === 'life' && form.health?.hadSurgeries === true && !value) {
      return { code: 'required', message: 'Опишите перенесенные операции' };
    }
    return null;
  });

  // Travel fields - conditional for Travel insurance
  applyWhen(
    path.insuranceType,
    (type) => type === 'travel',
    (p) => {
      required(p.travel.destination, { message: 'Выберите страну/регион назначения' });
      required(p.travel.tripPurpose, { message: 'Выберите цель поездки' });

      required(p.travel.departureDate, { message: 'Укажите дату отъезда' });
      validate(p.travel.departureDate, (value) => {
        if (!value) return null;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const departure = new Date(value);
        if (departure < today) {
          return { code: 'min_date', message: 'Дата отъезда не может быть раньше сегодняшнего дня' };
        }
        return null;
      });

      required(p.travel.returnDate, { message: 'Укажите дату возвращения' });
      validate(p.travel.returnDate, (value, ctx) => {
        if (!value) return null;
        const form = ctx.form as InsuranceApplicationForm;
        const departure = form.travel.departureDate;
        if (departure && new Date(value) <= new Date(departure)) {
          return { code: 'return_after_departure', message: 'Дата возвращения должна быть позже даты отъезда' };
        }
        return null;
      });

      // At least one travel coverage option must be selected
      validate(p.travelCoverageOptions.medical, (_, ctx) => {
        const form = ctx.form as InsuranceApplicationForm;
        const opts = form.travelCoverageOptions;
        if (!opts.medical && !opts.baggage && !opts.tripCancellation && !opts.flightDelay && !opts.carRental) {
          return { code: 'coverage_required', message: 'Выберите хотя бы один вариант покрытия' };
        }
        return null;
      });

      // Travelers validation
      validateItems(p.travelers, (itemPath) => {
        required(itemPath.fullName, { message: 'Введите ФИО путешественника' });
        required(itemPath.birthDate, { message: 'Укажите дату рождения' });
        required(itemPath.passportNumber, { message: 'Введите номер загранпаспорта' });
      });
    }
  );
};
