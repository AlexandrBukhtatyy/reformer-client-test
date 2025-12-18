import type { BehaviorSchemaFn } from "@reformer/core";
import { watchField } from "@reformer/core/behaviors";
import type { InsuranceApplicationForm } from "./type";
import { insuranceTypeBehaviors } from "./steps/insurance-type/behaviors";
import { insuredPartyBehaviors } from "./steps/insured-party/behaviors";
import { insuranceObjectBehaviors } from "./steps/insurance-object/behaviors";
import { historyBehaviors } from "./steps/history/behaviors";
import { PREMIUM_COEFFICIENTS } from "./constants";

// Хелпер для расчёта базовой премии
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const calculateBasePremium = (form: any): number => {
  const insuranceType = form?.insuranceType?.value?.value;
  const coverageAmount = form?.coverageAmount?.value?.value ?? 0;
  const vehicleMarketValue = form?.vehicle?.marketValue?.value?.value ?? 0;
  const propertyMarketValue = form?.property?.marketValue?.value?.value ?? 0;
  const tripDuration = form?.travel?.tripDuration?.value?.value ?? 7;

  switch (insuranceType) {
    case "casco":
      return vehicleMarketValue * PREMIUM_COEFFICIENTS.baseTariffs.casco;
    case "osago":
      return PREMIUM_COEFFICIENTS.baseTariffs.osago;
    case "property":
      return propertyMarketValue * PREMIUM_COEFFICIENTS.baseTariffs.property;
    case "life":
      return coverageAmount * PREMIUM_COEFFICIENTS.baseTariffs.life;
    case "travel":
      return tripDuration * PREMIUM_COEFFICIENTS.baseTariffs.travel * 90; // USD to RUB
    default:
      return coverageAmount * 0.01;
  }
};

export const insuranceApplicationBehaviors: BehaviorSchemaFn<
  InsuranceApplicationForm
> = (path) => {
  // Behaviors для шагов
  insuranceTypeBehaviors(path);
  insuredPartyBehaviors(path);
  insuranceObjectBehaviors(path);
  historyBehaviors(path); // ЛИБО: apply(path, historyBehaviors)

  // Cross-step behaviors: вычисление премии
  // Вычисление базовой премии при изменении типа страхования
  watchField(
    path.insuranceType,
    (_, ctx) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const form = ctx.form as any;
      ctx.setFieldValue("basePremium", Math.round(calculateBasePremium(form)));
    },
    { immediate: false, debounce: 300 }
  );

  // Пересчёт базовой премии при изменении рыночной стоимости автомобиля (для КАСКО)
  watchField(
    path.vehicle.marketValue,
    (_, ctx) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const form = ctx.form as any;
      // Пересчитываем только если тип страхования - КАСКО
      if (form?.insuranceType?.value?.value === "casco") {
        ctx.setFieldValue(
          "basePremium",
          Math.round(calculateBasePremium(form))
        );
      }
    },
    { immediate: false, debounce: 300 }
  );

  // Пересчёт базовой премии при изменении страховой суммы (для жизни и default)
  watchField(
    path.coverageAmount,
    (_, ctx) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const form = ctx.form as any;
      const insuranceType = form?.insuranceType?.value?.value;
      if (
        insuranceType === "life" ||
        !["casco", "osago", "property", "travel"].includes(insuranceType)
      ) {
        ctx.setFieldValue(
          "basePremium",
          Math.round(calculateBasePremium(form))
        );
      }
    },
    { immediate: false, debounce: 300 }
  );

  // Вычисление коэффициента возраста
  watchField(
    path.age,
    (age, ctx) => {
      let coefficient = 1;

      if (age !== undefined && age !== null) {
        if (age < 22) coefficient = PREMIUM_COEFFICIENTS.age.under22;
        else if (age <= 25) coefficient = PREMIUM_COEFFICIENTS.age["22-25"];
        else if (age <= 35) coefficient = PREMIUM_COEFFICIENTS.age["26-35"];
        else if (age <= 50) coefficient = PREMIUM_COEFFICIENTS.age["36-50"];
        else if (age <= 65) coefficient = PREMIUM_COEFFICIENTS.age["51-65"];
        else coefficient = PREMIUM_COEFFICIENTS.age.over65;
      }

      ctx.setFieldValue("ageCoefficient", coefficient);
    },
    { immediate: false }
  );

  // Вычисление минимального возраста и стажа водителей
  watchField(
    path.drivers,
    (drivers, ctx) => {
      if (drivers && Array.isArray(drivers) && drivers.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ages = (drivers as any[])
          .map((d) => d?.age)
          .filter((a): a is number => typeof a === "number");

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const experiences = (drivers as any[])
          .map((d) => d?.experience)
          .filter((e): e is number => typeof e === "number");

        if (ages.length > 0) {
          ctx.setFieldValue("minDriverAge", Math.min(...ages));
        }

        if (experiences.length > 0) {
          ctx.setFieldValue("minDriverExperience", Math.min(...experiences));
        }

        // Коэффициент стажа по минимальному стажу
        const minExp =
          experiences.length > 0 ? Math.min(...experiences) : undefined;
        let expCoeff = 1;
        if (minExp !== undefined) {
          if (minExp < 2) expCoeff = PREMIUM_COEFFICIENTS.experience.under2;
          else if (minExp < 5)
            expCoeff = PREMIUM_COEFFICIENTS.experience["2-5"];
          else if (minExp < 10)
            expCoeff = PREMIUM_COEFFICIENTS.experience["5-10"];
          else expCoeff = PREMIUM_COEFFICIENTS.experience.over10;
        }
        ctx.setFieldValue("experienceCoefficient", expCoeff);
      }
    },
    { immediate: false }
  );

  // Вычисление суммы долей выгодоприобретателей
  watchField(
    path.beneficiaries,
    (beneficiaries, ctx) => {
      if (beneficiaries && Array.isArray(beneficiaries)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const totalShare = (beneficiaries as any[]).reduce((sum, b) => {
          const share = b?.share || 0;
          return sum + share;
        }, 0);
        ctx.setFieldValue("totalBeneficiaryShare", totalShare);
      }
    },
    { immediate: false }
  );

  // Вычисление скидки за франшизу
  watchField(
    path.deductible,
    (deductible, ctx) => {
      let discount = 0;
      if (deductible !== undefined && deductible !== null) {
        if (deductible >= 50000)
          discount = PREMIUM_COEFFICIENTS.deductibleDiscount[50000];
        else if (deductible >= 30000)
          discount = PREMIUM_COEFFICIENTS.deductibleDiscount[30000];
        else if (deductible >= 20000)
          discount = PREMIUM_COEFFICIENTS.deductibleDiscount[20000];
        else if (deductible >= 10000)
          discount = PREMIUM_COEFFICIENTS.deductibleDiscount[10000];
      }
      ctx.setFieldValue("deductibleDiscount", discount);
    },
    { immediate: false }
  );

  // Вычисление итоговой премии
  watchField(
    path.basePremium,
    (basePremium, ctx) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const form = ctx.form as any;
      // Правильный доступ: .value.value
      const ageCoeff = form?.ageCoefficient?.value?.value ?? 1;
      const expCoeff = form?.experienceCoefficient?.value?.value ?? 1;
      const regCoeff = form?.regionalCoefficient?.value?.value ?? 1;
      const kbmCoeff = form?.kbmCoefficient?.value?.value ?? 1;
      const deductDiscount = form?.deductibleDiscount?.value?.value ?? 0;
      const promoDiscount = form?.promoDiscount?.value?.value ?? 0;

      const premium = basePremium || 0;
      const total =
        premium *
        ageCoeff *
        expCoeff *
        regCoeff *
        kbmCoeff *
        (1 - deductDiscount - promoDiscount);

      ctx.setFieldValue("totalPremium", Math.round(Math.max(total, 0)));
    },
    { immediate: false, debounce: 300 }
  );

  // Вычисление суммы платежа при рассрочке
  watchField(
    path.totalPremium,
    (totalPremium, ctx) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const form = ctx.form as any;
      // Правильный доступ: .value.value
      const paymentType = form?.paymentType?.value?.value;
      const installments = form?.installments?.value?.value;

      if (paymentType === "installments" && installments && totalPremium) {
        const installmentAmount =
          (totalPremium / Number(installments)) *
          (1 + PREMIUM_COEFFICIENTS.installmentSurcharge);
        ctx.setFieldValue("installmentAmount", Math.round(installmentAmount));
      } else {
        ctx.setFieldValue("installmentAmount", undefined);
      }
    },
    { immediate: false }
  );
};
