import React from 'react';
import { FormField } from '../../../components/ui/FormField';
import type { GroupNodeWithControls } from '@reformer/core';
import type { InsuranceApplicationForm } from '../schemas/form-schema';

interface Step6Props {
  form: GroupNodeWithControls<InsuranceApplicationForm>;
}

const Step6: React.FC<Step6Props> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={form.basePremium} />
        <FormField control={form.totalPremium} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={form.ageCoefficient} />
        <FormField control={form.experienceCoefficient} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={form.regionCoefficient} />
        <FormField control={form.claimsCoefficient} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={form.deductibleDiscount} />
        <FormField control={form.promoDiscount} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={form.multiPolicyDiscount} />
        <FormField control={form.installmentAmount} />
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Согласия</h3>
        <FormField control={form.agreePersonalData} />
        <FormField control={form.agreeTerms} />
        <FormField control={form.agreeElectronicPolicy} />
        <FormField control={form.agreeMarketing} />
        <FormField control={form.confirmAccuracy} />
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Подтверждение</h3>
        <FormField control={form.electronicSignature} />
      </div>
    </div>
  );
};

export default Step6;