  import { required, number, minLength, applyWhen } from '@reformer/core/validators';
import type { ValidationSchemaFn, FieldPath } from '@reformer/core';
import type { Step6Form } from './type';

export const step6Validation: ValidationSchemaFn<Step6Form> = (path: FieldPath<Step6Form>) => {
  // Premium calculation validation
  number(path.basePremium, { message: 'Базовая премия должна быть числом' });
  number(path.ageCoefficient, { message: 'Коэффициент возраста должен быть числом' });
  number(path.experienceCoefficient, { message: 'Коэффициент стажа должен быть числом' });
  number(path.regionCoefficient, { message: 'Региональный коэффициент должен быть числом' });
  number(path.claimsCoefficient, { message: 'Коэффициент страховых случаев должен быть числом' });
  number(path.deductibleDiscount, { message: 'Скидка за франшизу должна быть числом' });
  number(path.promoDiscount, { message: 'Скидка по промокоду должна быть числом' });
  number(path.multiPolicyDiscount, { message: 'Скидка за мультиполис должна быть числом' });
  number(path.totalPremium, { message: 'Итоговая премия должна быть числом' });
  number(path.installmentAmount, { message: 'Сумма платежа должна быть числом' });

  // Confirmation and agreement validation - use required with condition
  required(path.agreePersonalData, { message: 'Необходимо согласие на обработку персональных данных' });
  required(path.agreeTerms, { message: 'Необходимо согласие с условиями страхования' });
  required(path.agreeElectronicPolicy, { message: 'Необходимо согласие на электронный полис' });
  required(path.confirmAccuracy, { message: 'Необходимо подтвердить достоверность информации' });

  // Conditional validation for electronic signature
  applyWhen(
    path.confirmAccuracy,
    (confirmed) => confirmed === true,
    (p) => {
      required(p.electronicSignature, { message: 'Электронная подпись обязательна при подтверждении' });
      minLength(p.electronicSignature, 3, { message: 'ФИО в подписи должно содержать минимум 3 символа' });
    }
  );

  // Policy data validation
  required(path.policyNumber, { message: 'Номер полиса обязателен' });
  required(path.policyStartDate, { message: 'Дата начала действия обязательна' });
  required(path.policyEndDate, { message: 'Дата окончания действия обязательна' });
};