import type { GroupNodeWithControls } from "@reformer/core";
import type { CreditApplicationForm } from "../../types";
import { FormField } from "../../../../components/ui/FormField";

interface StepProps {
  control: GroupNodeWithControls<CreditApplicationForm>;
}

export function ContactInfoStep({ control }: StepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Контактная информация</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.phoneMain} />
        <FormField control={control.phoneAdditional} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.email} />
        <FormField control={control.emailAdditional} />
      </div>

      <h3 className="text-lg font-medium mt-6">Адрес регистрации</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.registrationAddress.region} />
        <FormField control={control.registrationAddress.city} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField control={control.registrationAddress.street} />
        <FormField control={control.registrationAddress.house} />
        <FormField control={control.registrationAddress.apartment} />
      </div>

      <FormField control={control.registrationAddress.postalCode} />

      <div className="mt-4">
        <FormField control={control.sameAsRegistration} />
      </div>

      {!control.sameAsRegistration.value && (
        <div className="mt-6">
          <h3 className="text-lg font-medium">Адрес проживания</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.residenceAddress.region} />
            <FormField control={control.residenceAddress.city} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField control={control.residenceAddress.street} />
            <FormField control={control.residenceAddress.house} />
            <FormField control={control.residenceAddress.apartment} />
          </div>

          <FormField control={control.residenceAddress.postalCode} />
        </div>
      )}
    </div>
  );
}