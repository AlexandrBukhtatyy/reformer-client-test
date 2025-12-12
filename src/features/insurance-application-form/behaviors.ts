import type { BehaviorSchemaFn } from "@reformer/core";
import { computeFrom, watchField, enableWhen, visibleWhen, disableWhen } from "@reformer/core/behaviors";
import type { InsuranceApplicationForm } from "./types";

export const behaviors: BehaviorSchemaFn<InsuranceApplicationForm> = (path) => {
  // Вычисляемое поле: дата окончания
  watchField(path.startDate, (_value, ctx) => {
    const startDate = ctx.form.startDate.value.value;
    const insurancePeriod = ctx.form.insurancePeriod.value.value;
    
    if (startDate && insurancePeriod) {
      const date = new Date(startDate);
      date.setMonth(date.getMonth() + insurancePeriod);
      const endDate = date.toISOString().split("T")[0];
      ctx.setFieldValue("endDate", endDate);
    }
  });

  watchField(path.insurancePeriod, (_value, ctx) => {
    const startDate = ctx.form.startDate.value.value;
    const insurancePeriod = ctx.form.insurancePeriod.value.value;
    
    if (startDate && insurancePeriod) {
      const date = new Date(startDate);
      date.setMonth(date.getMonth() + insurancePeriod);
      const endDate = date.toISOString().split("T")[0];
      ctx.setFieldValue("endDate", endDate);
    }
  });

  // Вычисляемое поле: полное имя (ФИО)
  watchField(path.personalData.lastName, (_value, ctx) => {
    const lastName = ctx.form.personalData.lastName.value.value;
    const firstName = ctx.form.personalData.firstName.value.value;
    const middleName = ctx.form.personalData.middleName.value.value;
    
    if (lastName && firstName) {
      const fullName = `${lastName} ${firstName} ${middleName || ''}`.trim();
      ctx.setFieldValue("fullName", fullName);
    }
  });

  watchField(path.personalData.firstName, (_value, ctx) => {
    const lastName = ctx.form.personalData.lastName.value.value;
    const firstName = ctx.form.personalData.firstName.value.value;
    const middleName = ctx.form.personalData.middleName.value.value;
    
    if (lastName && firstName) {
      const fullName = `${lastName} ${firstName} ${middleName || ''}`.trim();
      ctx.setFieldValue("fullName", fullName);
    }
  });

  watchField(path.personalData.middleName, (_value, ctx) => {
    const lastName = ctx.form.personalData.lastName.value.value;
    const firstName = ctx.form.personalData.firstName.value.value;
    const middleName = ctx.form.personalData.middleName.value;
    
    if (lastName && firstName) {
      const fullName = `${lastName} ${firstName} ${middleName || ''}`.trim();
      ctx.setFieldValue("fullName", fullName);
    }
  });

  // Вычисляемое поле: возраст
  watchField(path.personalData.birthDate, (_value, ctx) => {
    const birthDate = ctx.form.personalData.birthDate.value.value;
    
    if (birthDate) {
      const birth = new Date(birthDate);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      
      ctx.setFieldValue("age", age);
    }
  });

  // Вычисляемое поле: ИМТ (для страхования жизни)
  watchField(path.health.height, (_value, ctx) => {
    const height = ctx.form.health.height.value.value;
    const weight = ctx.form.health.weight.value.value;
    
    if (height && weight && height > 0) {
      const bmi = weight / Math.pow(height / 100, 2);
      ctx.setFieldValue("health.bmi", Math.round(bmi * 100) / 100);
    }
 });

  watchField(path.health.weight, (_value, ctx) => {
    const height = ctx.form.health.height.value.value;
    const weight = ctx.form.health.weight.value.value;
    
    if (height && weight && height > 0) {
      const bmi = weight / Math.pow(height / 100, 2);
      ctx.setFieldValue("health.bmi", Math.round(bmi * 100) / 100);
    }
  });

  // Вычисляемое поле: длительность поездки (для путешествий)
  watchField(path.travel.departureDate, (_value, ctx) => {
    const departureDate = ctx.form.travel.departureDate.value.value;
    const returnDate = ctx.form.travel.returnDate.value;
    
    if (departureDate && returnDate) {
      const dep = new Date(departureDate);
      const ret = new Date(returnDate);
      const diffTime = ret.getTime() - dep.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      ctx.setFieldValue("travel.tripDuration", diffDays);
    }
  });

  watchField(path.travel.returnDate, (_value, ctx) => {
    const departureDate = ctx.form.travel.departureDate.value.value;
    const returnDate = ctx.form.travel.returnDate.value.value;
    
    if (departureDate && returnDate) {
      const dep = new Date(departureDate);
      const ret = new Date(returnDate);
      const diffTime = ret.getTime() - dep.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      ctx.setFieldValue("travel.tripDuration", diffDays);
    }
  });

  // Вычисляемое поле: стаж вождения (для каждого водителя)
  // Для каждого водителя нужно отдельное слежение
  // Since we can't watch array items directly, we'll handle this differently
  // We'll watch the entire drivers array and recalculate all driving experiences
  watchField(path.drivers, (_value, ctx) => {
    const drivers = ctx.form.drivers.value.value;
    if (drivers) {
      drivers.forEach((driver, index) => {
        if (driver.licenseIssueDate) {
          const issueDate = new Date(driver.licenseIssueDate);
          const today = new Date();
          let experience = today.getFullYear() - issueDate.getFullYear();
          const monthDiff = today.getMonth() - issueDate.getMonth();
          
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < issueDate.getDate())) {
            experience--;
          }
          
          // We can't directly set values in array items from here
          // This would need to be handled differently in the UI
        }
      });
    }
  });

  // Вычисляемое поле: минимальный возраст водителя
  watchField(path.drivers, (_value, ctx) => {
    const drivers = ctx.form.drivers.value.value;
    if (drivers && drivers.length > 0) {
      const ages = drivers.map(driver => {
        if (driver.birthDate) {
          const birth = new Date(driver.birthDate);
          const today = new Date();
          let age = today.getFullYear() - birth.getFullYear();
          const monthDiff = today.getMonth() - birth.getMonth();
          
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
          }
          return age;
        }
        return Infinity;
      }).filter(age => age !== Infinity);
      
      if (ages.length > 0) {
        const minAge = Math.min(...ages);
        ctx.setFieldValue("minDriverAge", minAge);
      }
    }
  });

  // Вычисляемое поле: минимальный стаж водителя
 // This would require tracking driving experience in the form state
  // For now, we'll note that this needs special handling

  // Вычисляемое поле: сумма долей выгодоприобретателей
  watchField(path.beneficiaries, (_value, ctx) => {
    const beneficiaries = ctx.form.beneficiaries.value.value;
    if (beneficiaries) {
      const totalShare = beneficiaries.reduce((sum, beneficiary) => {
        return sum + (beneficiary.share || 0);
      }, 0);
      
      ctx.setFieldValue("totalBeneficiaryShare", totalShare);
    }
 });

  // Условная видимость: installments при paymentType='installments'
  visibleWhen(
    path.installments,
    (form) => form.paymentType.value === 'installments'
  );

  // Условная видимость: поля транспортного средства при insuranceType='casco' или 'osago'
  visibleWhen(
    path.vehicle,
    (form) => form.insuranceType.value === 'casco' || form.insuranceType.value === 'osago'
  );

  // Условная видимость: поля недвижимости при insuranceType='property'
  visibleWhen(
    path.property,
    (form) => form.insuranceType.value === 'property'
  );

  // Условная видимость: поля здоровья при insuranceType='life'
  visibleWhen(
    path.health,
    (form) => form.insuranceType.value === 'life'
  );

  // Условная видимость: поля путешествий при insuranceType='travel'
  visibleWhen(
    path.travel,
    (form) => form.insuranceType.value === 'travel'
  );

  // Условная видимость: travelers при insuranceType='travel'
  visibleWhen(
    path.travelers,
    (form) => form.insuranceType.value === 'travel'
  );

  // Условная видимость: drivers при insuranceType='casco' или 'osago'
  visibleWhen(
    path.drivers,
    (form) => form.insuranceType.value === 'casco' || form.insuranceType.value === 'osago'
  );

  // Условная видимость: unlimitedDrivers при insuranceType='casco' или 'osago'
  visibleWhen(
    path.unlimitedDrivers,
    (form) => form.insuranceType.value === 'casco' || form.insuranceType.value === 'osago'
  );

  // Условная видимость: beneficiaries при insuranceType='life'
  visibleWhen(
    path.beneficiaries,
    (form) => form.insuranceType.value === 'life'
 );

  // Условная видимость: antiTheftBrand при hasAntiTheft=true
  visibleWhen(
    path.vehicle.antiTheftBrand,
    (form) => form.vehicle.hasAntiTheft.value === true
  );

  // Условная видимость: smokingYears при isSmoker=true
  visibleWhen(
    path.health.smokingYears,
    (form) => form.health.isSmoker.value === true
  );

  // Условная видимость: chronicDiseases при hasChronicDiseases=true
  visibleWhen(
    path.health.chronicDiseases,
    (form) => form.health.hasChronicDiseases.value === true
  );

  // Условная видимость: surgeries при hadSurgeries=true
  visibleWhen(
    path.health.surgeries,
    (form) => form.health.hadSurgeries.value === true
  );

  // Условная видимость: extremeSports при practicesSports=true
  visibleWhen(
    path.health.extremeSports,
    (form) => form.health.practicesSports.value === true
  );

  // Условная видимость: floor при property.type='apartment'
  visibleWhen(
    path.property.floor,
    (form) => form.property.type.value === 'apartment'
  );

  // Условная видимость: предыдущий полис при hasPreviousInsurance=true
  visibleWhen(
    path.previousInsurer,
    (form) => form.hasPreviousInsurance.value === true
  );

  visibleWhen(
    path.previousPolicyNumber,
    (form) => form.hasPreviousInsurance.value === true
  );

  visibleWhen(
    path.previousPolicyEndDate,
    (form) => form.hasPreviousInsurance.value === true
  );

  // Условная видимость: страховые случаи при hadClaims=true
  visibleWhen(
    path.claims,
    (form) => form.hadClaims.value === true
  );

  // Условная видимость: полей персональных данных при insuredType='individual'
  visibleWhen(
    path.personalData,
    (form) => form.insuredType.value === 'individual'
  );

  visibleWhen(
    path.passportData,
    (form) => form.insuredType.value === 'individual'
  );

  // Условная видимость: полей компании при insuredType='corporate'
  visibleWhen(
    path.companyData,
    (form) => form.insuredType.value === 'corporate'
  );

  // Сброс специфичных полей при смене типа страхования
  watchField(path.insuranceType, (_value, ctx) => {
    const insuranceType = ctx.form.insuranceType.value;
    
    // Сброс специфичных полей при смене типа
    if (insuranceType !== 'casco' && insuranceType !== 'osago') {
      ctx.setFieldValue("vehicle", {
        vin: "",
        brand: "",
        model: "",
        year: null,
        mileage: null,
        enginePower: null,
        bodyType: 'sedan',
        transmission: 'manual',
        marketValue: null,
        licensePlate: "",
        registrationCert: "",
        hasAntiTheft: false,
        antiTheftBrand: "",
        garageParking: false,
        usagePurpose: 'personal'
      });
    }
    
    if (insuranceType !== 'property') {
      ctx.setFieldValue("property", {
        type: 'apartment',
        address: {
          region: "",
          city: "",
          street: "",
          house: "",
          apartment: ""
        },
        area: null,
        floors: null,
        floor: null,
        yearBuilt: null,
        wallMaterial: 'brick',
        marketValue: null,
        hasAlarm: false,
        hasFireAlarm: false,
        ownershipDoc: ""
      });
    }
    
    if (insuranceType !== 'life') {
      ctx.setFieldValue("health", {
        height: null,
        weight: null,
        bmi: null,
        bloodPressure: "",
        isSmoker: false,
        smokingYears: null,
        hasChronicDiseases: false,
        chronicDiseases: "",
        hadSurgeries: false,
        surgeries: "",
        occupation: "",
        isHighRiskJob: false,
        practicesSports: false,
        extremeSports: false
      });
    }
    
    if (insuranceType !== 'travel') {
      ctx.setFieldValue("travel", {
        destination: 'europe',
        tripPurpose: 'tourism',
        departureDate: "",
        returnDate: "",
        tripDuration: null,
        isMultipleTrips: false
      });
    }
  });

  // Сброс модели при смене марки автомобиля
  watchField(path.vehicle.brand, (_value, ctx) => {
    ctx.setFieldValue("vehicle.model", "");
  });
};