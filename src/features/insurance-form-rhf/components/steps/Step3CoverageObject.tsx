import { useFormContext, useWatch } from 'react-hook-form';
import type { InsuranceFormData } from '../../types';
import {
  VehicleSection,
  PropertySection,
  HealthSection,
  TravelSection,
} from '../sections';

export function Step3CoverageObject() {
  const { control } = useFormContext<InsuranceFormData>();
  const insuranceType = useWatch({ control, name: 'insuranceType' });

  const renderObjectSection = () => {
    switch (insuranceType) {
      case 'casco':
      case 'osago':
        return <VehicleSection />;
      case 'property':
        return <PropertySection />;
      case 'life':
        return <HealthSection />;
      case 'travel':
        return <TravelSection />;
      default:
        return (
          <p className="text-muted-foreground">
            Выберите тип страхования на шаге 1
          </p>
        );
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Шаг 3: Объект страхования</h2>
      {renderObjectSection()}
    </div>
  );
}
