import type { ValidationSchemaFn } from '@reformer/core';
import { required, min, max, applyWhen } from '@reformer/core/validators';
import type { LifeHealthData } from './type';

export const lifeHealthValidation: ValidationSchemaFn<LifeHealthData> = (path) => {
  required(path.height, { message: 'Укажите рост' });
  min(path.height, 100, { message: 'Минимальный рост 100 см' });
  max(path.height, 250, { message: 'Максимальный рост 250 см' });

  required(path.weight, { message: 'Укажите вес' });
  min(path.weight, 30, { message: 'Минимальный вес 30 кг' });
  max(path.weight, 300, { message: 'Максимальный вес 300 кг' });

  min(path.bloodPressureSystolic, 80, { message: 'Некорректное значение давления' });
  max(path.bloodPressureSystolic, 200, { message: 'Некорректное значение давления' });

  min(path.bloodPressureDiastolic, 50, { message: 'Некорректное значение давления' });
  max(path.bloodPressureDiastolic, 130, { message: 'Некорректное значение давления' });

  applyWhen(
    path.hasChronicDiseases,
    (hasChronicDiseases) => hasChronicDiseases === true,
    (p) => {
      required(p.chronicDiseasesDescription, { message: 'Опишите хронические заболевания' });
    }
  );

  applyWhen(
    path.isSmoker,
    (isSmoker) => isSmoker === true,
    (p) => {
      required(p.smokingYears, { message: 'Укажите стаж курения' });
      min(p.smokingYears, 0, { message: 'Некорректный стаж курения' });
    }
  );

  applyWhen(
    path.hasAllergies,
    (hasAllergies) => hasAllergies === true,
    (p) => {
      required(p.allergiesDescription, { message: 'Опишите аллергии' });
    }
  );

  applyWhen(
    path.hasSurgeries,
    (hasSurgeries) => hasSurgeries === true,
    (p) => {
      required(p.surgeriesDescription, { message: 'Опишите операции' });
    }
  );

  required(path.occupation, { message: 'Укажите род занятий' });
};
