import type { ValidationSchemaFn } from "@reformer/core";
import { validate, applyWhen } from "@reformer/core/validators";
import type { DriversBeneficiariesStep } from "./type";
import type { InsuranceApplicationForm } from "../../type";

export const driversBeneficiariesValidation: ValidationSchemaFn<
  DriversBeneficiariesStep
> = (path) => {
  // Валидация водителей - только если не выбрано "неограниченное количество"
  applyWhen(
    path.unlimitedDrivers,
    (unlimited) => unlimited === false,
    (p) => {
      // Проверка минимального количества водителей через computed поле
      validate(p.minDriverAge, (_, ctx) => {
        const form = ctx.form as InsuranceApplicationForm;
        // ArrayNode.length is a number, not a FieldNode
        const driversLength = form?.drivers?.length ?? 0;
        if (driversLength === 0) {
          return {
            code: "no_drivers",
            message: "Добавьте хотя бы одного водителя",
          };
        }
        return null;
      });
      // TODO: validateItems for drivers is skipped due to ArrayNode issue
    }
  );

  // TODO: validateItems for beneficiaries is skipped due to ArrayNode issue

  // Проверка суммы долей = 100% (только для страхования жизни)
  validate(path.totalBeneficiaryShare, (totalShare, ctx) => {
    const form = ctx.form as any;
    // ArrayNode.length is a number, not a FieldNode
    const beneficiariesLength = form?.beneficiaries?.length ?? 0;
    if (beneficiariesLength > 0) {
      if (Math.abs((totalShare || 0) - 100) > 0.01) {
        return {
          code: "invalid_total_share",
          message: "Сумма долей выгодоприобретателей должна быть равна 100%",
        };
      }
    }
    return null;
  });
};
