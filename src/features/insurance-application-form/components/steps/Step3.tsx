import { useFormControl } from "@reformer/react";
import type { GroupNodeWithControls } from "@reformer/core";
import { FormField } from "../../../../components/ui/FormField";
import type { InsuranceApplicationForm } from "../../types";

interface StepProps {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function Step3({ control }: StepProps) {
  const insuranceType = control.insuranceType.value;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Объект страхования</h2>

      {insuranceType === 'casco' || insuranceType === 'osago' ? (
        <div className="space-y-4">
          <h3 className="font-medium">Данные транспортного средства</h3>
          
          <FormField
            control={control.vehicle.vin}
            label="VIN-номер"
            component="input"
          />
          
          <FormField
            control={control.vehicle.brand}
            label="Марка автомобиля"
            component="select"
          />
          
          <FormField
            control={control.vehicle.model}
            label="Модель автомобиля"
            component="select"
          />
          
          <FormField
            control={control.vehicle.year}
            label="Год выпуска"
            component="input"
            type="number"
          />
          
          <FormField
            control={control.vehicle.mileage}
            label="Пробег (км)"
            component="input"
            type="number"
          />
          
          <FormField
            control={control.vehicle.enginePower}
            label="Мощность двигателя (л.с.)"
            component="input"
            type="number"
          />
          
          <FormField
            control={control.vehicle.bodyType}
            label="Тип кузова"
            component="select"
            options={[
              { value: "sedan", label: "Седан" },
              { value: "hatchback", label: "Хэтчбек" },
              { value: "suv", label: "Внедорожник" },
              { value: "wagon", label: "Универсал" },
              { value: "coupe", label: "Купе" },
              { value: "minivan", label: "Минивэн" },
              { value: "pickup", label: "Пикап" },
            ]}
          />
          
          <FormField
            control={control.vehicle.transmission}
            label="Коробка передач"
            component="radio-group"
            options={[
              { value: "manual", label: "Механика" },
              { value: "automatic", label: "Автомат" },
            ]}
          />
          
          {insuranceType === 'casco' && (
            <FormField
              control={control.vehicle.marketValue}
              label="Рыночная стоимость (₽)"
              component="input"
              type="number"
            />
          )}
          
          <FormField
            control={control.vehicle.licensePlate}
            label="Госномер"
            component="input"
          />
          
          <FormField
            control={control.vehicle.registrationCert}
            label="Номер СТС"
            component="input"
          />
          
          <FormField
            control={control.vehicle.hasAntiTheft}
            label="Наличие противоугонной системы"
            component="checkbox"
          />
          
          {control.vehicle.hasAntiTheft.value && (
            <FormField
              control={control.vehicle.antiTheftBrand}
              label="Марка противоугонной системы"
              component="input"
            />
          )}
          
          <FormField
            control={control.vehicle.garageParking}
            label="Гаражное хранение"
            component="checkbox"
          />
          
          <FormField
            control={control.vehicle.usagePurpose}
            label="Цель использования"
            component="select"
            options={[
              { value: "personal", label: "Личное" },
              { value: "taxi", label: "Такси" },
              { value: "training", label: "Учебный" },
              { value: "commercial", label: "Коммерческое" },
            ]}
          />
        </div>
      ) : insuranceType === 'property' ? (
        <div className="space-y-4">
          <h3 className="font-medium">Данные недвижимости</h3>
          
          <FormField
            control={control.property.type}
            label="Тип недвижимости"
            component="select"
            options={[
              { value: "apartment", label: "Квартира" },
              { value: "house", label: "Дом" },
              { value: "townhouse", label: "Таунхаус" },
              { value: "commercial", label: "Коммерческая" },
              { value: "land", label: "Земельный участок" },
            ]}
          />
          
          <h4 className="font-medium">Адрес</h4>
          
          <FormField
            control={control.property.address.region}
            label="Регион"
            component="input"
          />
          
          <FormField
            control={control.property.address.city}
            label="Город"
            component="input"
          />
          
          <FormField
            control={control.property.address.street}
            label="Улица"
            component="input"
          />
          
          <FormField
            control={control.property.address.house}
            label="Дом"
            component="input"
          />
          
          <FormField
            control={control.property.address.apartment}
            label="Квартира"
            component="input"
          />
          
          <h4 className="font-medium">Характеристики</h4>
          
          <FormField
            control={control.property.area}
            label="Площадь (м²)"
            component="input"
            type="number"
          />
          
          <FormField
            control={control.property.floors}
            label="Этажность здания"
            component="input"
            type="number"
          />
          
          {control.property.type.value === 'apartment' && (
            <FormField
              control={control.property.floor}
              label="Этаж квартиры"
              component="input"
              type="number"
            />
          )}
          
          <FormField
            control={control.property.yearBuilt}
            label="Год постройки"
            component="input"
            type="number"
          />
          
          <FormField
            control={control.property.wallMaterial}
            label="Материал стен"
            component="select"
            options={[
              { value: "brick", label: "Кирпич" },
              { value: "concrete", label: "Бетон" },
              { value: "wood", label: "Дерево" },
              { value: "panel", label: "Панель" },
              { value: "monolithic", label: "Монолит" },
              { value: "other", label: "Другое" },
            ]}
          />
          
          <FormField
            control={control.property.marketValue}
            label="Рыночная стоимость (₽)"
            component="input"
            type="number"
          />
          
          <h4 className="font-medium">Безопасность</h4>
          
          <FormField
            control={control.property.hasAlarm}
            label="Охранная сигнализация"
            component="checkbox"
          />
          
          <FormField
            control={control.property.hasFireAlarm}
            label="Пожарная сигнализация"
            component="checkbox"
          />
          
          <FormField
            control={control.property.ownershipDoc}
            label="Номер документа о собственности"
            component="input"
          />
          
          <h4 className="font-medium">Покрытие</h4>
          
          <FormField
            control={control.propertyCoverageOptions.structure}
            label="Страхование конструктива"
            component="checkbox"
          />
          
          <FormField
            control={control.propertyCoverageOptions.interior}
            label="Страхование отделки"
            component="checkbox"
          />
          
          <FormField
            control={control.propertyCoverageOptions.movables}
            label="Страхование движимого имущества"
            component="checkbox"
          />
          
          <FormField
            control={control.propertyCoverageOptions.liability}
            label="Гражданская ответственность"
            component="checkbox"
          />
        </div>
      ) : insuranceType === 'life' ? (
        <div className="space-y-4">
          <h3 className="font-medium">Данные здоровья</h3>
          
          <FormField
            control={control.health.height}
            label="Рост (см)"
            component="input"
            type="number"
          />
          
          <FormField
            control={control.health.weight}
            label="Вес (кг)"
            component="input"
            type="number"
          />
          
          <FormField
            control={control.health.bmi}
            label="Индекс массы тела"
            component="input"
            type="number"
            disabled
          />
          
          <FormField
            control={control.health.bloodPressure}
            label="Артериальное давление"
            component="input"
          />
          
          <FormField
            control={control.health.isSmoker}
            label="Курящий"
            component="checkbox"
          />
          
          {control.health.isSmoker.value && (
            <FormField
              control={control.health.smokingYears}
              label="Стаж курения (лет)"
              component="input"
              type="number"
            />
          )}
          
          <FormField
            control={control.health.hasChronicDiseases}
            label="Хронические заболевания"
            component="checkbox"
          />
          
          {control.health.hasChronicDiseases.value && (
            <FormField
              control={control.health.chronicDiseases}
              label="Описание заболеваний"
              component="textarea"
            />
          )}
          
          <FormField
            control={control.health.hadSurgeries}
            label="Перенесенные операции"
            component="checkbox"
          />
          
          {control.health.hadSurgeries.value && (
            <FormField
              control={control.health.surgeries}
              label="Описание операций"
              component="textarea"
            />
          )}
          
          <FormField
            control={control.health.occupation}
            label="Род занятий"
            component="input"
          />
          
          <FormField
            control={control.health.isHighRiskJob}
            label="Опасная профессия"
            component="checkbox"
          />
          
          <FormField
            control={control.health.practicesSports}
            label="Занятия спортом"
            component="checkbox"
          />
          
          {control.health.practicesSports.value && (
            <FormField
              control={control.health.extremeSports}
              label="Экстремальные виды спорта"
              component="checkbox"
            />
          )}
          
          <h4 className="font-medium">Покрытие</h4>
          
          <FormField
            control={control.lifeCoverageOptions.death}
            label="Страхование на случай смерти"
            component="checkbox"
          />
          
          <FormField
            control={control.lifeCoverageOptions.disability}
            label="Страхование инвалидности"
            component="checkbox"
          />
          
          <FormField
            control={control.lifeCoverageOptions.criticalIllness}
            label="Критические заболевания"
            component="checkbox"
          />
          
          <FormField
            control={control.lifeCoverageOptions.accident}
            label="Несчастные случаи"
            component="checkbox"
          />
        </div>
      ) : insuranceType === 'travel' ? (
        <div className="space-y-4">
          <h3 className="font-medium">Данные поездки</h3>
          
          <FormField
            control={control.travel.destination}
            label="Страна/регион назначения"
            component="select"
            options={[
              { value: "europe", label: "Европа" },
              { value: "asia", label: "Азия" },
              { value: "us-canada", label: "США и Канада" },
              { value: "cis", label: "СНГ" },
              { value: "worldwide", label: "Весь мир" },
            ]}
          />
          
          <FormField
            control={control.travel.tripPurpose}
            label="Цель поездки"
            component="select"
            options={[
              { value: "tourism", label: "Туризм" },
              { value: "business", label: "Бизнес" },
              { value: "study", label: "Обучение" },
              { value: "work", label: "Работа" },
              { value: "other", label: "Другое" },
            ]}
          />
          
          <FormField
            control={control.travel.departureDate}
            label="Дата отъезда"
            component="input"
            type="date"
          />
          
          <FormField
            control={control.travel.returnDate}
            label="Дата возвращения"
            component="input"
            type="date"
          />
          
          <FormField
            control={control.travel.tripDuration}
            label="Длительность поездки (дни)"
            component="input"
            type="number"
            disabled
          />
          
          <FormField
            control={control.travel.isMultipleTrips}
            label="Мультипоездка (годовой полис)"
            component="checkbox"
          />
          
          <h4 className="font-medium">Путешественники</h4>
          
          {control.travelers.map((traveler, index) => (
            <div key={index} className="border p-4 rounded space-y-2">
              <h5 className="font-medium">Путешественник {index + 1}</h5>
              
              <FormField
                control={traveler.fullName}
                label="ФИО"
                component="input"
              />
              
              <FormField
                control={traveler.birthDate}
                label="Дата рождения"
                component="input"
                type="date"
              />
              
              <FormField
                control={traveler.passportNumber}
                label="Номер загранпаспорта"
                component="input"
              />
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => control.travelers.push({ fullName: "", birthDate: "", passportNumber: "" })}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Добавить путешественника
          </button>
          
          <h4 className="font-medium">Покрытие</h4>
          
          <FormField
            control={control.travelCoverageOptions.medical}
            label="Медицинские расходы"
            component="checkbox"
          />
          
          <FormField
            control={control.travelCoverageOptions.baggage}
            label="Багаж"
            component="checkbox"
          />
          
          <FormField
            control={control.travelCoverageOptions.tripCancellation}
            label="Отмена поездки"
            component="checkbox"
          />
          
          <FormField
            control={control.travelCoverageOptions.flightDelay}
            label="Задержка рейса"
            component="checkbox"
          />
          
          <FormField
            control={control.travelCoverageOptions.carRental}
            label="Аренда авто"
            component="checkbox"
          />
        </div>
      ) : null}
    </div>
  );
}