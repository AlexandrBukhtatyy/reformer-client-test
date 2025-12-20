import React from 'react';
import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '../../../components/ui/FormField';
import type { InsuranceApplicationForm } from '../schemas/form-schema';

interface Step1Props {
  form: GroupNodeWithControls<InsuranceApplicationForm>;
}

const Step1: React.FC<Step1Props> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={form.insuranceType} />
        <FormField control={form.insurancePeriod} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={form.startDate} />
        <FormField control={form.endDate} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={form.coverageAmount} />
        <FormField control={form.deductible} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={form.paymentType} />
        <FormField control={form.installments} />
      </div>
    </div>
  );
};

export default Step1;