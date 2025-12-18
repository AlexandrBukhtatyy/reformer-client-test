import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import type { PropertyData } from './type';

interface PropertyFieldsProps {
  control: GroupNodeWithControls<PropertyData>;
}

export function PropertyFields({ control }: PropertyFieldsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Данные объекта недвижимости</h3>

      <FormField control={control.propertyType} />

      <div className="space-y-4">
        <h4 className="font-medium">Адрес</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={control.address.region} />
          <FormField control={control.address.city} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField control={control.address.street} />
          <FormField control={control.address.house} />
          <FormField control={control.address.apartment} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField control={control.area} />
        <FormField control={control.floor} />
        <FormField control={control.totalFloors} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.buildYear} />
        <FormField control={control.wallMaterial} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.marketValue} />
        <FormField control={control.cadastralNumber} />
      </div>

      <div className="space-y-2">
        <FormField control={control.hasAlarm} />
        <FormField control={control.hasSprinkler} />
        <FormField control={control.isRented} />
      </div>
    </div>
  );
}
