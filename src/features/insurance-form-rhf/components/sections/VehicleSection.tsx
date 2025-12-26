import { FormInput, FormSelect, FormCheckbox, FormRadioGroup } from '@/components/form';
import {
  BODY_TYPE_OPTIONS,
  TRANSMISSION_OPTIONS,
  USAGE_PURPOSE_OPTIONS,
} from '../../constants';
import { useFormMode } from '../../hooks';
import { useWatch, useFormContext } from 'react-hook-form';
import type { InsuranceFormData } from '../../types';

export function VehicleSection() {
  const { isReadOnly } = useFormMode();
  const { control } = useFormContext<InsuranceFormData>();
  const hasAntiTheft = useWatch({ control, name: 'vehicle.hasAntiTheft' });

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Данные транспортного средства</h3>

      <div className="space-y-4">
        <FormInput
          name="vehicle.vin"
          label="VIN номер"
          placeholder="WDB1234567890123"
          disabled={isReadOnly}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            name="vehicle.brand"
            label="Марка"
            placeholder="Mercedes-Benz"
            disabled={isReadOnly}
          />
          <FormInput
            name="vehicle.model"
            label="Модель"
            placeholder="E-Class"
            disabled={isReadOnly}
          />
          <FormInput
            name="vehicle.year"
            label="Год выпуска"
            type="number"
            placeholder="2020"
            disabled={isReadOnly}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            name="vehicle.mileage"
            label="Пробег (км)"
            type="number"
            placeholder="50000"
            disabled={isReadOnly}
          />
          <FormInput
            name="vehicle.enginePower"
            label="Мощность двигателя (л.с.)"
            type="number"
            placeholder="200"
            disabled={isReadOnly}
          />
          <FormInput
            name="vehicle.marketValue"
            label="Рыночная стоимость (руб.)"
            type="number"
            placeholder="3000000"
            disabled={isReadOnly}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSelect
            name="vehicle.bodyType"
            label="Тип кузова"
            options={BODY_TYPE_OPTIONS}
            disabled={isReadOnly}
          />
          <FormRadioGroup
            name="vehicle.transmission"
            label="Коробка передач"
            options={TRANSMISSION_OPTIONS}
            disabled={isReadOnly}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            name="vehicle.licensePlate"
            label="Гос. номер"
            placeholder="А123БВ777"
            disabled={isReadOnly}
          />
          <FormInput
            name="vehicle.registrationCert"
            label="Номер СТС"
            placeholder="77 00 123456"
            disabled={isReadOnly}
          />
        </div>

        <FormSelect
          name="vehicle.usagePurpose"
          label="Цель использования"
          options={USAGE_PURPOSE_OPTIONS}
          disabled={isReadOnly}
        />

        <div className="space-y-2">
          <FormCheckbox
            name="vehicle.hasAntiTheft"
            label="Установлена противоугонная система"
            disabled={isReadOnly}
          />
          {hasAntiTheft && (
            <FormInput
              name="vehicle.antiTheftBrand"
              label="Марка противоугонной системы"
              placeholder="StarLine"
              disabled={isReadOnly}
            />
          )}
        </div>

        <FormCheckbox
          name="vehicle.garageParking"
          label="Гаражное хранение"
          disabled={isReadOnly}
        />
      </div>
    </div>
  );
}
