// Step 3: Insurance Object - Validation Schema
import type { ValidationSchemaFn, FieldPath } from '@reformer/core';
import { required, min, max, validate, applyWhen, validateTree } from '@reformer/core/validators';
import type { InsuranceApplicationForm } from '../types';

export const step3Validation: ValidationSchemaFn<InsuranceApplicationForm> = (
  path: FieldPath<InsuranceApplicationForm>
) => {
  const currentYear = new Date().getFullYear();

  // Vehicle fields - for CASCO and OSAGO
  applyWhen(
    path.insuranceType,
    (type) => type === 'casco' || type === 'osago',
    (p) => {
      required(p.vehicle.vin, { message: 'Укажите VIN-номер' });
      validate(p.vehicle.vin, (value) => {
        if (!value) return null;
        if (value.length !== 17) {
          return { code: 'length', message: 'VIN должен содержать 17 символов' };
        }
        return null;
      });

      required(p.vehicle.brand, { message: 'Выберите марку автомобиля' });
      required(p.vehicle.model, { message: 'Выберите модель автомобиля' });

      required(p.vehicle.year, { message: 'Укажите год выпуска' });
      min(p.vehicle.year, 1990, { message: 'Минимальный год: 1990' });
      max(p.vehicle.year, currentYear, { message: `Максимальный год: ${currentYear}` });

      required(p.vehicle.mileage, { message: 'Укажите пробег' });
      min(p.vehicle.mileage, 0, { message: 'Пробег не может быть отрицательным' });

      required(p.vehicle.enginePower, { message: 'Укажите мощность двигателя' });
      min(p.vehicle.enginePower, 1, { message: 'Минимальная мощность: 1 л.с.' });

      required(p.vehicle.bodyType, { message: 'Выберите тип кузова' });
      required(p.vehicle.transmission, { message: 'Выберите коробку передач' });
      required(p.vehicle.licensePlate, { message: 'Укажите госномер' });
      required(p.vehicle.registrationCert, { message: 'Укажите номер СТС' });
      required(p.vehicle.usagePurpose, { message: 'Выберите цель использования' });
    }
  );

  // Market value - required for CASCO only
  applyWhen(
    path.insuranceType,
    (type) => type === 'casco',
    (p) => {
      required(p.vehicle.marketValue, { message: 'Укажите рыночную стоимость' });
      min(p.vehicle.marketValue, 0, { message: 'Стоимость не может быть отрицательной' });
    }
  );

  // Anti-theft brand - required if hasAntiTheft is true (cross-field validation)
  validateTree<InsuranceApplicationForm>((ctx) => {
    const insuranceType = ctx.form.insuranceType.value.value;
    if (insuranceType !== 'casco' && insuranceType !== 'osago') return null;
    const hasAntiTheft = ctx.form.vehicle.hasAntiTheft.value.value;
    if (!hasAntiTheft) return null;
    const antiTheftBrand = ctx.form.vehicle.antiTheftBrand.value.value;
    if (!antiTheftBrand) {
      return { code: 'required', message: 'Укажите марку противоугонной системы' };
    }
    return null;
  }, { targetField: 'vehicle.antiTheftBrand' });

  // Property fields - for property insurance
  applyWhen(
    path.insuranceType,
    (type) => type === 'property',
    (p) => {
      required(p.property.type, { message: 'Выберите тип недвижимости' });
      required(p.property.address.region, { message: 'Укажите регион' });
      required(p.property.address.city, { message: 'Укажите город' });
      required(p.property.address.street, { message: 'Укажите улицу' });
      required(p.property.address.house, { message: 'Укажите дом' });

      required(p.property.area, { message: 'Укажите площадь' });
      min(p.property.area, 1, { message: 'Минимальная площадь: 1 м²' });

      required(p.property.floors, { message: 'Укажите этажность здания' });
      min(p.property.floors, 1, { message: 'Минимум 1 этаж' });

      required(p.property.yearBuilt, { message: 'Укажите год постройки' });
      min(p.property.yearBuilt, 1800, { message: 'Минимальный год: 1800' });
      max(p.property.yearBuilt, currentYear, { message: `Максимальный год: ${currentYear}` });

      required(p.property.wallMaterial, { message: 'Выберите материал стен' });

      required(p.property.marketValue, { message: 'Укажите рыночную стоимость' });
      min(p.property.marketValue, 0, { message: 'Стоимость не может быть отрицательной' });

      required(p.property.ownershipDoc, { message: 'Укажите номер документа о собственности' });
    }
  );

  // Floor - required for apartments only (cross-field)
  validateTree<InsuranceApplicationForm>((ctx) => {
    const insuranceType = ctx.form.insuranceType.value.value;
    if (insuranceType !== 'property') return null;
    const propertyType = ctx.form.property.type.value.value;
    if (propertyType !== 'apartment') return null;
    const floor = ctx.form.property.floor.value.value;
    if (floor === undefined || floor < 1) {
      return { code: 'required', message: 'Укажите этаж квартиры' };
    }
    return null;
  }, { targetField: 'property.floor' });

  // At least one property coverage option must be selected
  validateTree<InsuranceApplicationForm>((ctx) => {
    const insuranceType = ctx.form.insuranceType.value.value;
    if (insuranceType !== 'property') return null;

    const options = ctx.form.propertyCoverageOptions.value.value;
    if (!options.structure && !options.interior && !options.movables && !options.liability) {
      return { code: 'required', message: 'Выберите хотя бы один вариант покрытия' };
    }
    return null;
  }, { targetField: 'propertyCoverageOptions' });

  // Health fields - for life insurance
  applyWhen(
    path.insuranceType,
    (type) => type === 'life',
    (p) => {
      required(p.health.height, { message: 'Укажите рост' });
      min(p.health.height, 100, { message: 'Минимальный рост: 100 см' });
      max(p.health.height, 250, { message: 'Максимальный рост: 250 см' });

      required(p.health.weight, { message: 'Укажите вес' });
      min(p.health.weight, 30, { message: 'Минимальный вес: 30 кг' });
      max(p.health.weight, 300, { message: 'Максимальный вес: 300 кг' });

      required(p.health.occupation, { message: 'Укажите род занятий' });
    }
  );

  // Smoking years - required if smoker (cross-field)
  validateTree<InsuranceApplicationForm>((ctx) => {
    const insuranceType = ctx.form.insuranceType.value.value;
    if (insuranceType !== 'life') return null;
    const isSmoker = ctx.form.health.isSmoker.value.value;
    if (!isSmoker) return null;
    const smokingYears = ctx.form.health.smokingYears.value.value;
    if (smokingYears === undefined || smokingYears < 0) {
      return { code: 'required', message: 'Укажите стаж курения' };
    }
    return null;
  }, { targetField: 'health.smokingYears' });

  // Chronic diseases description - required if has chronic diseases
  validateTree<InsuranceApplicationForm>((ctx) => {
    const insuranceType = ctx.form.insuranceType.value.value;
    if (insuranceType !== 'life') return null;
    const hasChronicDiseases = ctx.form.health.hasChronicDiseases.value.value;
    if (!hasChronicDiseases) return null;
    const chronicDiseases = ctx.form.health.chronicDiseases.value.value;
    if (!chronicDiseases) {
      return { code: 'required', message: 'Опишите хронические заболевания' };
    }
    return null;
  }, { targetField: 'health.chronicDiseases' });

  // Surgeries description - required if had surgeries
  validateTree<InsuranceApplicationForm>((ctx) => {
    const insuranceType = ctx.form.insuranceType.value.value;
    if (insuranceType !== 'life') return null;
    const hadSurgeries = ctx.form.health.hadSurgeries.value.value;
    if (!hadSurgeries) return null;
    const surgeries = ctx.form.health.surgeries.value.value;
    if (!surgeries) {
      return { code: 'required', message: 'Опишите перенесенные операции' };
    }
    return null;
  }, { targetField: 'health.surgeries' });

  // At least one life coverage option must be selected
  validateTree<InsuranceApplicationForm>((ctx) => {
    const insuranceType = ctx.form.insuranceType.value.value;
    if (insuranceType !== 'life') return null;

    const options = ctx.form.lifeCoverageOptions.value.value;
    if (!options.death && !options.disability && !options.criticalIllness && !options.accident) {
      return { code: 'required', message: 'Выберите хотя бы один вариант покрытия' };
    }
    return null;
  }, { targetField: 'lifeCoverageOptions' });

  // Travel fields - for travel insurance
  applyWhen(
    path.insuranceType,
    (type) => type === 'travel',
    (p) => {
      required(p.travel.destination, { message: 'Выберите страну/регион назначения' });
      required(p.travel.tripPurpose, { message: 'Выберите цель поездки' });

      required(p.travel.departureDate, { message: 'Укажите дату отъезда' });
      validate(p.travel.departureDate, (value) => {
        if (!value) return null;
        const departureDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (departureDate < today) {
          return { code: 'minDate', message: 'Дата отъезда не может быть раньше сегодня' };
        }
        return null;
      });

      required(p.travel.returnDate, { message: 'Укажите дату возвращения' });
    }
  );

  // Return date must be after departure date
  validateTree<InsuranceApplicationForm>((ctx) => {
    const insuranceType = ctx.form.insuranceType.value.value;
    if (insuranceType !== 'travel') return null;
    const returnDate = ctx.form.travel.returnDate.value.value;
    const departureDate = ctx.form.travel.departureDate.value.value;
    if (!returnDate || !departureDate) return null;

    const returnDateObj = new Date(returnDate);
    const departureDateObj = new Date(departureDate);
    if (returnDateObj <= departureDateObj) {
      return { code: 'dateOrder', message: 'Дата возвращения должна быть позже даты отъезда' };
    }
    return null;
  }, { targetField: 'travel.returnDate' });

  // Travelers validation
  validateTree<InsuranceApplicationForm>((ctx) => {
    const insuranceType = ctx.form.insuranceType.value.value;
    if (insuranceType !== 'travel') return null;
    const travelers = ctx.form.travelers.value.value;
    if (travelers.length === 0) {
      return { code: 'required', message: 'Добавьте хотя бы одного путешественника' };
    }
    return null;
  }, { targetField: 'travelers' });

  // At least one travel coverage option must be selected
  validateTree<InsuranceApplicationForm>((ctx) => {
    const insuranceType = ctx.form.insuranceType.value.value;
    if (insuranceType !== 'travel') return null;

    const options = ctx.form.travelCoverageOptions.value.value;
    if (!options.medical && !options.baggage && !options.tripCancellation && !options.flightDelay && !options.carRental) {
      return { code: 'required', message: 'Выберите хотя бы один вариант покрытия' };
    }
    return null;
  }, { targetField: 'travelCoverageOptions' });
};
