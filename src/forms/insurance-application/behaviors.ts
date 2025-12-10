import type { BehaviorSchemaFn } from '@reformer/core';
import { watchField } from '@reformer/core/behaviors';
import type { InsuranceApplicationForm } from './type';

export const insuranceApplicationBehavior: BehaviorSchemaFn<InsuranceApplicationForm> = (path) => {
  // Step 1: Insurance Type and Parameters
  // Compute end date from start date and insurance period
  watchField(path.startDate, (_value, ctx) => {
    const startDate = ctx.form.startDate.value.value;
    const insurancePeriod = ctx.form.insurancePeriod.value.value;

    if (startDate && insurancePeriod) {
      const start = new Date(startDate);
      const end = new Date(start);
      end.setMonth(end.getMonth() + insurancePeriod);

      // Format date as YYYY-MM-DD
      const formattedDate = end.toISOString().split('T')[0];
      ctx.setFieldValue('endDate', formattedDate);
    }
  });

  watchField(path.insurancePeriod, (_value, ctx) => {
    const startDate = ctx.form.startDate.value.value;
    const insurancePeriod = ctx.form.insurancePeriod.value.value;

    if (startDate && insurancePeriod) {
      const start = new Date(startDate);
      const end = new Date(start);
      end.setMonth(end.getMonth() + insurancePeriod);

      // Format date as YYYY-MM-DD
      const formattedDate = end.toISOString().split('T')[0];
      ctx.setFieldValue('endDate', formattedDate);
    }
  });

  // Step 2: Insured Person Data
  // Compute full name from personal data
  if (path.personalData?.lastName) {
    watchField(path.personalData.lastName, (_value, ctx) => {
      const lastName = ctx.form.personalData.lastName.value.value;
      const firstName = ctx.form.personalData.firstName.value.value;
      const middleName = ctx.form.personalData.middleName.value.value;

      if (lastName || firstName) {
        const fullName = [lastName, firstName, middleName].filter(Boolean).join(' ');
        ctx.setFieldValue('fullName', fullName);
      }
    });
  }

  if (path.personalData?.firstName) {
    watchField(path.personalData.firstName, (_value, ctx) => {
      const lastName = ctx.form.personalData.lastName.value.value;
      const firstName = ctx.form.personalData.firstName.value.value;
      const middleName = ctx.form.personalData.middleName.value.value;

      if (lastName || firstName) {
        const fullName = [lastName, firstName, middleName].filter(Boolean).join(' ');
        ctx.setFieldValue('fullName', fullName);
      }
    });
  }

  if (path.personalData?.middleName) {
    watchField(path.personalData.middleName, (_value, ctx) => {
      const lastName = ctx.form.personalData.lastName.value.value;
      const firstName = ctx.form.personalData.firstName.value.value;
      const middleName = ctx.form.personalData.middleName.value.value;

      if (lastName || firstName) {
        const fullName = [lastName, firstName, middleName].filter(Boolean).join(' ');
        ctx.setFieldValue('fullName', fullName);
      }
    });
  }

  // Compute age from birth date
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

      ctx.setFieldValue('age', age);
    }
  });

  // Conditional fields based on insured type - clear fields when type changes
  watchField(path.insuredType, (_value, ctx) => {
    const insuredType = ctx.form.insuredType.value.value;
    if (insuredType !== 'individual') {
      ctx.setFieldValue('personalData.lastName', '');
      ctx.setFieldValue('personalData.firstName', '');
      ctx.setFieldValue('personalData.middleName', '');
      ctx.setFieldValue('personalData.birthDate', '');
      ctx.setFieldValue('personalData.gender', 'male');
      ctx.setFieldValue('passportData.series', '');
      ctx.setFieldValue('passportData.number', '');
      ctx.setFieldValue('passportData.issueDate', '');
      ctx.setFieldValue('passportData.issuedBy', '');
    }
  });

  watchField(path.insuredType, (_value, ctx) => {
    const insuredType = ctx.form.insuredType.value.value;
    if (insuredType !== 'company') {
      ctx.setFieldValue('companyData.name', '');
      ctx.setFieldValue('companyData.inn', '');
      ctx.setFieldValue('companyData.ogrn', '');
      ctx.setFieldValue('companyData.kpp', '');
      ctx.setFieldValue('companyData.ceoName', '');
    }
  });

  // Conditional fields based on payment type
  watchField(path.paymentType, (_value, ctx) => {
    const paymentType = ctx.form.paymentType.value.value;
    if (paymentType !== 'installments') {
      ctx.setFieldValue('installments', null);
    }
  });

  // Step 3: Insurance Object
  // Conditional fields based on insurance type
  watchField(path.insuranceType, (_value, ctx) => {
    const insuranceType = ctx.form.insuranceType.value.value;
    if (insuranceType !== 'casco' && insuranceType !== 'osago') {
      ctx.setFieldValue('vehicle', {
        vin: '',
        brand: '',
        model: '',
        year: null,
        mileage: null,
        enginePower: null,
        bodyType: 'sedan',
        transmission: 'manual',
        marketValue: null,
        licensePlate: '',
        registrationCert: '',
        hasAntiTheft: false,
        antiTheftBrand: '',
        garageParking: false,
        usagePurpose: 'personal'
      });
    }
  });

  watchField(path.insuranceType, (_value, ctx) => {
    const insuranceType = ctx.form.insuranceType.value.value;
    if (insuranceType !== 'property') {
      ctx.setFieldValue('property', {
        type: 'apartment',
        address: { region: '', city: '', street: '', house: '', apartment: '' },
        area: null,
        floors: null,
        floor: null,
        yearBuilt: null,
        wallMaterial: 'brick',
        marketValue: null,
        ownershipDoc: ''
      });
      ctx.setFieldValue('propertyCoverageOptions', {
        structure: true,
        interior: false,
        movables: false,
        liability: false
      });
    }
  });

  watchField(path.insuranceType, (_value, ctx) => {
    const insuranceType = ctx.form.insuranceType.value.value;
    if (insuranceType !== 'life') {
      ctx.setFieldValue('health', {
        height: null,
        weight: null,
        bmi: 0,
        bloodPressure: '',
        isSmoker: false,
        smokingYears: null,
        hasChronicDiseases: false,
        chronicDiseases: '',
        hadSurgeries: false,
        surgeries: '',
        occupation: '',
        isHighRiskJob: false,
        practicesSports: false,
        extremeSports: false
      });
      ctx.setFieldValue('lifeCoverageOptions', {
        death: true,
        disability: false,
        criticalIllness: false,
        accident: false
      });
    }
  });

  watchField(path.insuranceType, (_value, ctx) => {
    const insuranceType = ctx.form.insuranceType.value.value;
    if (insuranceType !== 'travel') {
      ctx.setFieldValue('travel', {
        destination: 'europe',
        tripPurpose: 'tourism',
        departureDate: '',
        returnDate: '',
        tripDuration: null,
        isMultipleTrips: false
      });
      ctx.setFieldValue('travelers', []);
      ctx.setFieldValue('travelCoverageOptions', {
        medical: true,
        baggage: false,
        tripCancellation: false,
        flightDelay: false,
        carRental: false
      });
    }
  });

  // Compute BMI from height and weight
  watchField(path.health.height, (_value, ctx) => {
    const height = ctx.form.health.height.value.value;
    const weight = ctx.form.health.weight.value.value;

    if (height && weight && height > 0) {
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      ctx.setFieldValue('health.bmi', Math.round(bmi * 100) / 100);
    }
  });

  watchField(path.health.weight, (_value, ctx) => {
    const height = ctx.form.health.height.value.value;
    const weight = ctx.form.health.weight.value.value;

    if (height && weight && height > 0) {
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      ctx.setFieldValue('health.bmi', Math.round(bmi * 100) / 100);
    }
  });

  // Conditional fields based on anti-theft system
  watchField(path.vehicle.hasAntiTheft, (_value, ctx) => {
    const hasAntiTheft = ctx.form.vehicle.hasAntiTheft.value.value;
    if (!hasAntiTheft) {
      ctx.setFieldValue('vehicle.antiTheftBrand', '');
    }
  });

  // Conditional fields based on smoker status
  watchField(path.health.isSmoker, (_value, ctx) => {
    const isSmoker = ctx.form.health.isSmoker.value.value;
    if (!isSmoker) {
      ctx.setFieldValue('health.smokingYears', null);
    }
  });

  // Conditional fields based on chronic diseases
  watchField(path.health.hasChronicDiseases, (_value, ctx) => {
    const hasChronicDiseases = ctx.form.health.hasChronicDiseases.value.value;
    if (!hasChronicDiseases) {
      ctx.setFieldValue('health.chronicDiseases', '');
    }
  });

  // Conditional fields based on surgeries
  watchField(path.health.hadSurgeries, (_value, ctx) => {
    const hadSurgeries = ctx.form.health.hadSurgeries.value.value;
    if (!hadSurgeries) {
      ctx.setFieldValue('health.surgeries', '');
    }
  });

  // Conditional fields based on sports
  watchField(path.health.practicesSports, (_value, ctx) => {
    const practicesSports = ctx.form.health.practicesSports.value.value;
    if (!practicesSports) {
      ctx.setFieldValue('health.extremeSports', false);
    }
  });

  // Conditional fields based on property type
  watchField(path.property.type, (_value, ctx) => {
    const propertyType = ctx.form.property.type.value.value;
    if (propertyType !== 'apartment') {
      ctx.setFieldValue('property.floor', null);
    }
  });

  // Step 4: Drivers/Beneficiaries
  // Conditional fields based on insurance type
  watchField(path.insuranceType, (_value, ctx) => {
    const insuranceType = ctx.form.insuranceType.value.value;
    if ((insuranceType !== 'casco' && insuranceType !== 'osago') || ctx.form.unlimitedDrivers.value.value) {
      ctx.setFieldValue('drivers', []);
    }
  });

  watchField(path.insuranceType, (_value, ctx) => {
    const insuranceType = ctx.form.insuranceType.value.value;
    if (insuranceType !== 'life') {
      ctx.setFieldValue('beneficiaries', []);
    }
  });

  // Compute trip duration for travel
  watchField(path.travel.departureDate, (_value, ctx) => {
    const departureDate = ctx.form.travel.departureDate.value.value;
    const returnDate = ctx.form.travel.returnDate.value.value;

    if (departureDate && returnDate) {
      const departure = new Date(departureDate);
      const returnD = new Date(returnDate);
      const diffTime = Math.abs(returnD.getTime() - departure.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 24));
      ctx.setFieldValue('travel.tripDuration', diffDays);
    }
  });

  watchField(path.travel.returnDate, (_value, ctx) => {
    const departureDate = ctx.form.travel.departureDate.value.value;
    const returnDate = ctx.form.travel.returnDate.value.value;

    if (departureDate && returnDate) {
      const departure = new Date(departureDate);
      const returnD = new Date(returnDate);
      const diffTime = Math.abs(returnD.getTime() - departure.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 24));
      ctx.setFieldValue('travel.tripDuration', diffDays);
    }
  });

  // Step 5: History and Additional Info
  // Conditional fields based on previous insurance
  watchField(path.hasPreviousInsurance, (_value, ctx) => {
    const hasPreviousInsurance = ctx.form.hasPreviousInsurance.value.value;
    if (!hasPreviousInsurance) {
      ctx.setFieldValue('previousInsurer', '');
      ctx.setFieldValue('previousPolicyNumber', '');
      ctx.setFieldValue('previousPolicyEndDate', '');
    }
  });

  // Conditional fields based on claims
  watchField(path.hadClaims, (_value, ctx) => {
    const hadClaims = ctx.form.hadClaims.value.value;
    if (!hadClaims) {
      ctx.setFieldValue('claims', []);
    }
  });

  // Step 6: Calculation and Confirmation
  // Calculate premium components based on various factors
  watchField(path.coverageAmount, (_value, ctx) => {
    const insuranceType = ctx.form.insuranceType.value.value;
    const coverageAmount = ctx.form.coverageAmount.value.value;

    if (insuranceType && coverageAmount) {
      // Base premium calculation based on insurance type and coverage amount
      let basePremium = 0;
      switch (insuranceType) {
        case 'casco':
          basePremium = coverageAmount * 0.05; // 5% for casco
          break;
        case 'osago':
          basePremium = 5000; // Fixed for osago
          break;
        case 'property':
          basePremium = coverageAmount * 0.01; // 1% for property
          break;
        case 'life':
          basePremium = coverageAmount * 0.02; // 2% for life
          break;
        case 'travel':
          basePremium = 1000; // Fixed for travel
          break;
        default:
          basePremium = coverageAmount * 0.03; // Default 3%
      }

      ctx.setFieldValue('basePremium', Math.round(basePremium));
    }
  });

  watchField(path.insuranceType, (_value, ctx) => {
    const insuranceType = ctx.form.insuranceType.value.value;
    const coverageAmount = ctx.form.coverageAmount.value.value;

    if (insuranceType && coverageAmount) {
      // Base premium calculation based on insurance type and coverage amount
      let basePremium = 0;
      switch (insuranceType) {
        case 'casco':
          basePremium = coverageAmount * 0.05; // 5% for casco
          break;
        case 'osago':
          basePremium = 5000; // Fixed for osago
          break;
        case 'property':
          basePremium = coverageAmount * 0.01; // 1% for property
          break;
        case 'life':
          basePremium = coverageAmount * 0.02; // 2% for life
          break;
        case 'travel':
          basePremium = 1000; // Fixed for travel
          break;
        default:
          basePremium = coverageAmount * 0.03; // Default 3%
      }

      ctx.setFieldValue('basePremium', Math.round(basePremium));
    }
  });

  // Calculate age coefficient
  watchField(path.age, (_value, ctx) => {
    const age = ctx.form.age.value.value;

    if (age !== undefined && age !== null) {
      let ageCoefficient = 1.0;
      if (age < 22) {
        ageCoefficient = 1.8;
      } else if (age < 30) {
        ageCoefficient = 1.5;
      } else if (age < 50) {
        ageCoefficient = 1.0;
      } else if (age <= 75) {
        ageCoefficient = 1.3;
      } else {
        ageCoefficient = 1.8;
      }

      ctx.setFieldValue('ageCoefficient', Math.round(ageCoefficient * 100) / 100);
    }
  });

  // Calculate experience coefficient (for drivers)
  // This would be more complex in a real implementation with multiple drivers
  if (path.drivers) {
    watchField(path.drivers, (_value, ctx) => {
      const drivers = ctx.form.drivers.value.value;

      if (drivers && drivers.length > 0) {
        // Calculate minimum experience among all drivers
        const experiences = drivers
          .map((driver: { licenseIssueDate?: string }) => {
            if (driver.licenseIssueDate) {
              const issueDate = new Date(driver.licenseIssueDate);
              const today = new Date();
              let experience = today.getFullYear() - issueDate.getFullYear();
              const monthDiff = today.getMonth() - issueDate.getMonth();

              if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < issueDate.getDate())) {
                experience--;
              }
              return experience;
            }
            return 0;
          })
          .filter((exp: number) => exp > 0);

        if (experiences.length > 0) {
          const minExperience = Math.min(...experiences);
          ctx.setFieldValue('minDriverExperience', minExperience);

          let experienceCoefficient = 1.0;
          if (minExperience < 2) {
            experienceCoefficient = 1.6;
          } else if (minExperience < 5) {
            experienceCoefficient = 1.4;
          } else if (minExperience < 10) {
            experienceCoefficient = 1.2;
          } else {
            experienceCoefficient = 1.0;
          }

          ctx.setFieldValue('experienceCoefficient', Math.round(experienceCoefficient * 100) / 100);
        }
      }
    });
  }

  // Calculate age for minDriverAge
  if (path.drivers) {
    watchField(path.drivers, (_value, ctx) => {
      const drivers = ctx.form.drivers.value.value;

      if (drivers && drivers.length > 0) {
        // Calculate minimum age among all drivers
        const ages = drivers
          .map((driver: { birthDate?: string }) => {
            if (driver.birthDate) {
              const birthDate = new Date(driver.birthDate);
              const today = new Date();
              let age = today.getFullYear() - birthDate.getFullYear();
              const monthDiff = today.getMonth() - birthDate.getMonth();

              if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
              }
              return age;
            }
            return 0;
          })
          .filter((age: number) => age > 0);

        if (ages.length > 0) {
          const minAge = Math.min(...ages);
          ctx.setFieldValue('minDriverAge', minAge);
        }
      }
    });
  }

  // Calculate claims coefficient
  if (path.claims) {
    watchField(path.claims, (_value, ctx) => {
      const claims = ctx.form.claims.value.value;

      if (claims) {
        // Calculate based on number of claims and fault status
        const claimsCount = claims.length;
        const atFaultClaims = claims.filter((claim: { atFault?: boolean }) => claim.atFault).length;

        let claimsCoefficient = 1.0;
        if (atFaultClaims > 0) {
          claimsCoefficient = 1 + (atFaultClaims * 0.25);
        } else if (claimsCount > 0) {
          claimsCoefficient = 1.1; // Non-at-fault claims still increase premium slightly
        } else {
          claimsCoefficient = 0.9; // No claims discount
        }

        // Cap the coefficient
        claimsCoefficient = Math.min(claimsCoefficient, 2.5);
        claimsCoefficient = Math.max(claimsCoefficient, 0.5);

        ctx.setFieldValue('claimsCoefficient', Math.round(claimsCoefficient * 100) / 100);
      }
    });
  }

  // Calculate deductible discount
  if (path.deductible) {
    watchField(path.deductible, (_value, ctx) => {
      const deductible = ctx.form.deductible.value.value;
      const coverageAmount = ctx.form.coverageAmount.value.value;

      if (deductible !== undefined && deductible !== null && coverageAmount) {
        // Calculate discount as percentage of deductible relative to coverage
        const discount = Math.min((deductible / coverageAmount) * 0.5, 0.15); // Max 15% discount
        ctx.setFieldValue('deductibleDiscount', Math.round(discount * 100) / 100);
      }
    });
  }

  // Calculate promo discount (would typically be from server response)
  watchField(path.promoCode, (_value, ctx) => {
    const promoCode = ctx.form.promoCode.value.value;

    if (promoCode) {
      // In a real app, this would be validated server-side
      // For demo, we'll apply a fixed discount for valid codes
      let discount = 0;
      if (promoCode.toLowerCase().includes('promo')) {
        discount = 0.1; // 10% discount
      } else if (promoCode.toLowerCase().includes('disc')) {
        discount = 0.05; // 5% discount
      }

      ctx.setFieldValue('promoDiscount', discount);
    } else {
      ctx.setFieldValue('promoDiscount', 0);
    }
  });

  // Calculate total premium based on all factors
  watchField(path.basePremium, (_value, ctx) => {
    const basePremium = ctx.form.basePremium.value.value || 0;
    const ageCoefficient = ctx.form.ageCoefficient.value.value || 1;
    const experienceCoefficient = ctx.form.experienceCoefficient.value.value || 1;
    const regionCoefficient = ctx.form.regionCoefficient.value.value || 1;
    const claimsCoefficient = ctx.form.claimsCoefficient.value.value || 1;
    const deductibleDiscount = ctx.form.deductibleDiscount.value.value || 0;
    const promoDiscount = ctx.form.promoDiscount.value.value || 0;
    const multiPolicyDiscount = ctx.form.multiPolicyDiscount.value.value || 0;

    const totalBeforeDiscounts = basePremium * ageCoefficient * experienceCoefficient * regionCoefficient * claimsCoefficient;
    const totalDiscount = deductibleDiscount + promoDiscount + multiPolicyDiscount;
    const totalPremium = totalBeforeDiscounts * (1 - totalDiscount);

    ctx.setFieldValue('totalPremium', Math.round(totalPremium));
  });

  // Recalculate total premium when any coefficient changes
  watchField(path.ageCoefficient, (_value, ctx) => {
    const basePremium = ctx.form.basePremium.value.value || 0;
    const ageCoefficient = ctx.form.ageCoefficient.value.value || 1;
    const experienceCoefficient = ctx.form.experienceCoefficient.value.value || 1;
    const regionCoefficient = ctx.form.regionCoefficient.value.value || 1;
    const claimsCoefficient = ctx.form.claimsCoefficient.value.value || 1;
    const deductibleDiscount = ctx.form.deductibleDiscount.value.value || 0;
    const promoDiscount = ctx.form.promoDiscount.value.value || 0;
    const multiPolicyDiscount = ctx.form.multiPolicyDiscount.value.value || 0;

    const totalBeforeDiscounts = basePremium * ageCoefficient * experienceCoefficient * regionCoefficient * claimsCoefficient;
    const totalDiscount = deductibleDiscount + promoDiscount + multiPolicyDiscount;
    const totalPremium = totalBeforeDiscounts * (1 - totalDiscount);

    ctx.setFieldValue('totalPremium', Math.round(totalPremium));
  });

  watchField(path.experienceCoefficient, (_value, ctx) => {
    const basePremium = ctx.form.basePremium.value.value || 0;
    const ageCoefficient = ctx.form.ageCoefficient.value.value || 1;
    const experienceCoefficient = ctx.form.experienceCoefficient.value.value || 1;
    const regionCoefficient = ctx.form.regionCoefficient.value.value || 1;
    const claimsCoefficient = ctx.form.claimsCoefficient.value.value || 1;
    const deductibleDiscount = ctx.form.deductibleDiscount.value.value || 0;
    const promoDiscount = ctx.form.promoDiscount.value.value || 0;
    const multiPolicyDiscount = ctx.form.multiPolicyDiscount.value.value || 0;

    const totalBeforeDiscounts = basePremium * ageCoefficient * experienceCoefficient * regionCoefficient * claimsCoefficient;
    const totalDiscount = deductibleDiscount + promoDiscount + multiPolicyDiscount;
    const totalPremium = totalBeforeDiscounts * (1 - totalDiscount);

    ctx.setFieldValue('totalPremium', Math.round(totalPremium));
  });

  watchField(path.regionCoefficient, (_value, ctx) => {
    const basePremium = ctx.form.basePremium.value.value || 0;
    const ageCoefficient = ctx.form.ageCoefficient.value.value || 1;
    const experienceCoefficient = ctx.form.experienceCoefficient.value.value || 1;
    const regionCoefficient = ctx.form.regionCoefficient.value.value || 1;
    const claimsCoefficient = ctx.form.claimsCoefficient.value.value || 1;
    const deductibleDiscount = ctx.form.deductibleDiscount.value.value || 0;
    const promoDiscount = ctx.form.promoDiscount.value.value || 0;
    const multiPolicyDiscount = ctx.form.multiPolicyDiscount.value.value || 0;

    const totalBeforeDiscounts = basePremium * ageCoefficient * experienceCoefficient * regionCoefficient * claimsCoefficient;
    const totalDiscount = deductibleDiscount + promoDiscount + multiPolicyDiscount;
    const totalPremium = totalBeforeDiscounts * (1 - totalDiscount);

    ctx.setFieldValue('totalPremium', Math.round(totalPremium));
  });

  watchField(path.claimsCoefficient, (_value, ctx) => {
    const basePremium = ctx.form.basePremium.value.value || 0;
    const ageCoefficient = ctx.form.ageCoefficient.value.value || 1;
    const experienceCoefficient = ctx.form.experienceCoefficient.value.value || 1;
    const regionCoefficient = ctx.form.regionCoefficient.value.value || 1;
    const claimsCoefficient = ctx.form.claimsCoefficient.value.value || 1;
    const deductibleDiscount = ctx.form.deductibleDiscount.value.value || 0;
    const promoDiscount = ctx.form.promoDiscount.value.value || 0;
    const multiPolicyDiscount = ctx.form.multiPolicyDiscount.value.value || 0;

    const totalBeforeDiscounts = basePremium * ageCoefficient * experienceCoefficient * regionCoefficient * claimsCoefficient;
    const totalDiscount = deductibleDiscount + promoDiscount + multiPolicyDiscount;
    const totalPremium = totalBeforeDiscounts * (1 - totalDiscount);

    ctx.setFieldValue('totalPremium', Math.round(totalPremium));
  });

  watchField(path.deductibleDiscount, (_value, ctx) => {
    const basePremium = ctx.form.basePremium.value.value || 0;
    const ageCoefficient = ctx.form.ageCoefficient.value.value || 1;
    const experienceCoefficient = ctx.form.experienceCoefficient.value.value || 1;
    const regionCoefficient = ctx.form.regionCoefficient.value.value || 1;
    const claimsCoefficient = ctx.form.claimsCoefficient.value.value || 1;
    const deductibleDiscount = ctx.form.deductibleDiscount.value.value || 0;
    const promoDiscount = ctx.form.promoDiscount.value.value || 0;
    const multiPolicyDiscount = ctx.form.multiPolicyDiscount.value.value || 0;

    const totalBeforeDiscounts = basePremium * ageCoefficient * experienceCoefficient * regionCoefficient * claimsCoefficient;
    const totalDiscount = deductibleDiscount + promoDiscount + multiPolicyDiscount;
    const totalPremium = totalBeforeDiscounts * (1 - totalDiscount);

    ctx.setFieldValue('totalPremium', Math.round(totalPremium));
  });

  watchField(path.promoDiscount, (_value, ctx) => {
    const basePremium = ctx.form.basePremium.value.value || 0;
    const ageCoefficient = ctx.form.ageCoefficient.value.value || 1;
    const experienceCoefficient = ctx.form.experienceCoefficient.value.value || 1;
    const regionCoefficient = ctx.form.regionCoefficient.value.value || 1;
    const claimsCoefficient = ctx.form.claimsCoefficient.value.value || 1;
    const deductibleDiscount = ctx.form.deductibleDiscount.value.value || 0;
    const promoDiscount = ctx.form.promoDiscount.value.value || 0;
    const multiPolicyDiscount = ctx.form.multiPolicyDiscount.value.value || 0;

    const totalBeforeDiscounts = basePremium * ageCoefficient * experienceCoefficient * regionCoefficient * claimsCoefficient;
    const totalDiscount = deductibleDiscount + promoDiscount + multiPolicyDiscount;
    const totalPremium = totalBeforeDiscounts * (1 - totalDiscount);

    ctx.setFieldValue('totalPremium', Math.round(totalPremium));
  });

  watchField(path.multiPolicyDiscount, (_value, ctx) => {
    const basePremium = ctx.form.basePremium.value.value || 0;
    const ageCoefficient = ctx.form.ageCoefficient.value.value || 1;
    const experienceCoefficient = ctx.form.experienceCoefficient.value.value || 1;
    const regionCoefficient = ctx.form.regionCoefficient.value.value || 1;
    const claimsCoefficient = ctx.form.claimsCoefficient.value.value || 1;
    const deductibleDiscount = ctx.form.deductibleDiscount.value.value || 0;
    const promoDiscount = ctx.form.promoDiscount.value.value || 0;
    const multiPolicyDiscount = ctx.form.multiPolicyDiscount.value.value || 0;

    const totalBeforeDiscounts = basePremium * ageCoefficient * experienceCoefficient * regionCoefficient * claimsCoefficient;
    const totalDiscount = deductibleDiscount + promoDiscount + multiPolicyDiscount;
    const totalPremium = totalBeforeDiscounts * (1 - totalDiscount);

    ctx.setFieldValue('totalPremium', Math.round(totalPremium));
  });

  // Calculate installment amount when payment type is installments
  watchField(path.paymentType, (_value, ctx) => {
    const paymentType = ctx.form.paymentType.value.value;
    const totalPremium = ctx.form.totalPremium.value.value || 0;
    const installments = ctx.form.installments.value.value || 1;

    if (paymentType === 'installments') {
      // Add 5% for processing fees when paying in installments
      const installmentAmount = (totalPremium * 1.05) / installments;
      ctx.setFieldValue('installmentAmount', Math.round(installmentAmount));
    } else {
      ctx.setFieldValue('installmentAmount', totalPremium);
    }
  });

  if (path.installments) {
    watchField(path.installments, (_value, ctx) => {
      const paymentType = ctx.form.paymentType.value.value;
      const totalPremium = ctx.form.totalPremium.value.value || 0;
      const installments = ctx.form.installments.value.value || 1;

      if (paymentType === 'installments' && installments > 0) {
        // Add 5% for processing fees when paying in installments
        const installmentAmount = (totalPremium * 1.05) / installments;
        ctx.setFieldValue('installmentAmount', Math.round(installmentAmount));
      } else {
        ctx.setFieldValue('installmentAmount', totalPremium);
      }
    });
  }

  watchField(path.totalPremium, (_value, ctx) => {
    const paymentType = ctx.form.paymentType.value.value;
    const totalPremium = ctx.form.totalPremium.value.value || 0;
    const installments = ctx.form.installments.value.value || 1;

    if (paymentType === 'installments' && installments > 0) {
      // Add 5% for processing fees when paying in installments
      const installmentAmount = (totalPremium * 1.05) / installments;
      ctx.setFieldValue('installmentAmount', Math.round(installmentAmount));
    } else {
      ctx.setFieldValue('installmentAmount', totalPremium);
    }
  });
};