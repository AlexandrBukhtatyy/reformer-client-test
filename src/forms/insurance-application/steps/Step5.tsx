import React from 'react';
import { FormField } from '../../../components/ui/FormField';
import type { GroupNodeWithControls } from '@reformer/core';
import type { InsuranceApplicationForm } from '../schemas/form-schema';

interface Step5Props {
  form: GroupNodeWithControls<InsuranceApplicationForm>;
}

const Step5: React.FC<Step5Props> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FormField control={form.hasPreviousInsurance} />
        {form.hasPreviousInsurance.value.value && (
          <div className="space-y-4 pl-4">
            <FormField control={form.previousInsurer} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.previousPolicyNumber} />
              <FormField control={form.previousPolicyEndDate} />
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <FormField control={form.hadClaims} />
        {form.hadClaims.value.value && (
          <div className="space-y-4 pl-4">
            <h3 className="text-lg font-medium">Страховые случаи</h3>
            {form.claims.map((claim: any, index: number) => (
              <div key={index} className="border p-4 rounded-md space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={claim.date} />
                  <FormField control={claim.type} />
                </div>
                
                <FormField control={claim.description} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={claim.amount} />
                  <FormField control={claim.atFault} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={form.promoCode} />
        <FormField control={form.referralSource} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={form.agentCode} />
      </div>
      
      <FormField control={form.additionalNotes} />
    </div>
  );
};

export default Step5;