import { FormInput, FormSelect, FormCheckbox } from '@/components/form';
import { PROPERTY_TYPE_OPTIONS, WALL_MATERIAL_OPTIONS } from '../../constants';
import { useFormMode } from '../../hooks';

export function PropertySection() {
  const { isReadOnly } = useFormMode();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Данные объекта недвижимости</h3>

      <FormSelect
        name="property.type"
        label="Тип объекта"
        options={PROPERTY_TYPE_OPTIONS}
        disabled={isReadOnly}
      />

      <div className="space-y-4">
        <h4 className="font-medium">Адрес</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            name="property.address.region"
            label="Регион"
            placeholder="Московская область"
            disabled={isReadOnly}
          />
          <FormInput
            name="property.address.city"
            label="Город"
            placeholder="Москва"
            disabled={isReadOnly}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            name="property.address.street"
            label="Улица"
            placeholder="ул. Ленина"
            disabled={isReadOnly}
          />
          <FormInput
            name="property.address.house"
            label="Дом"
            placeholder="10"
            disabled={isReadOnly}
          />
          <FormInput
            name="property.address.apartment"
            label="Квартира"
            placeholder="25"
            disabled={isReadOnly}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FormInput
          name="property.area"
          label="Площадь (м²)"
          type="number"
          placeholder="80"
          disabled={isReadOnly}
        />
        <FormInput
          name="property.floors"
          label="Этажей в здании"
          type="number"
          placeholder="9"
          disabled={isReadOnly}
        />
        <FormInput
          name="property.floor"
          label="Этаж"
          type="number"
          placeholder="5"
          disabled={isReadOnly}
        />
        <FormInput
          name="property.yearBuilt"
          label="Год постройки"
          type="number"
          placeholder="2010"
          disabled={isReadOnly}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormSelect
          name="property.wallMaterial"
          label="Материал стен"
          options={WALL_MATERIAL_OPTIONS}
          disabled={isReadOnly}
        />
        <FormInput
          name="property.marketValue"
          label="Рыночная стоимость (руб.)"
          type="number"
          placeholder="5000000"
          disabled={isReadOnly}
        />
      </div>

      <div className="space-y-2">
        <FormCheckbox
          name="property.hasAlarm"
          label="Установлена охранная сигнализация"
          disabled={isReadOnly}
        />
        <FormCheckbox
          name="property.hasFireAlarm"
          label="Установлена пожарная сигнализация"
          disabled={isReadOnly}
        />
      </div>

      <FormInput
        name="property.ownershipDoc"
        label="Документ о праве собственности"
        placeholder="Свидетельство о праве собственности №..."
        disabled={isReadOnly}
      />

      <div className="space-y-4">
        <h4 className="font-medium">Страховое покрытие</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <FormCheckbox
            name="propertyCoverageOptions.structure"
            label="Конструктивные элементы"
            disabled={isReadOnly}
          />
          <FormCheckbox
            name="propertyCoverageOptions.interior"
            label="Внутренняя отделка"
            disabled={isReadOnly}
          />
          <FormCheckbox
            name="propertyCoverageOptions.movables"
            label="Движимое имущество"
            disabled={isReadOnly}
          />
          <FormCheckbox
            name="propertyCoverageOptions.liability"
            label="Гражданская ответственность"
            disabled={isReadOnly}
          />
        </div>
      </div>
    </div>
  );
}
