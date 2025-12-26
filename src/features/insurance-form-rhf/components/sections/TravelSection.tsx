import { FormInput, FormSelect, FormCheckbox } from '@/components/form';
import { DESTINATION_OPTIONS, TRIP_PURPOSE_OPTIONS } from '../../constants';
import { useFormMode } from '../../hooks';
import { ComputedField } from '../ui';

export function TravelSection() {
  const { isReadOnly } = useFormMode();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Данные о путешествии</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormSelect
          name="travel.destination"
          label="Направление"
          options={DESTINATION_OPTIONS}
          disabled={isReadOnly}
        />
        <FormSelect
          name="travel.tripPurpose"
          label="Цель поездки"
          options={TRIP_PURPOSE_OPTIONS}
          disabled={isReadOnly}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormInput
          name="travel.departureDate"
          label="Дата отправления"
          type="date"
          disabled={isReadOnly}
        />
        <FormInput
          name="travel.returnDate"
          label="Дата возвращения"
          type="date"
          disabled={isReadOnly}
        />
        <div>
          <ComputedField
            name="travel.tripDuration"
            label="Длительность"
            suffix="дней"
          />
        </div>
      </div>

      <FormCheckbox
        name="travel.isMultipleTrips"
        label="Многократные поездки"
        disabled={isReadOnly}
      />

      <div className="space-y-4">
        <h4 className="font-medium">Страховое покрытие</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <FormCheckbox
            name="travelCoverageOptions.medical"
            label="Медицинские расходы"
            disabled={isReadOnly}
          />
          <FormCheckbox
            name="travelCoverageOptions.baggage"
            label="Багаж"
            disabled={isReadOnly}
          />
          <FormCheckbox
            name="travelCoverageOptions.tripCancellation"
            label="Отмена поездки"
            disabled={isReadOnly}
          />
          <FormCheckbox
            name="travelCoverageOptions.flightDelay"
            label="Задержка рейса"
            disabled={isReadOnly}
          />
          <FormCheckbox
            name="travelCoverageOptions.carRental"
            label="Аренда авто"
            disabled={isReadOnly}
          />
        </div>
      </div>
    </div>
  );
}
