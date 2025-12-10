import React from 'react';
import { useFormControlValue, type GroupNodeWithControls } from '@reformer/core';
import type { InsuranceApplicationForm } from '../type';
import { FormField } from '@/components/ui/FormField';

interface Step1Props {
  control: GroupNodeWithControls<Pick<InsuranceApplicationForm, 
    'insuranceType' | 'insurancePeriod' | 'startDate' | 'endDate' | 
    'coverageAmount' | 'deductible' | 'paymentType' | 'installments'
  >>;
}

export const Step1: React.FC<Step1Props> = ({ control }) => {
  const paymentType = useFormControlValue(control.paymentType)
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Тип страхования и основные параметры</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={control.insuranceType} />
        <FormField control={control.insurancePeriod} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={control.startDate} />
        <FormField control={control.endDate} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={control.coverageAmount} />
        <FormField control={control.deductible} />
      </div>
      
      <div className="space-y-4">
        <FormField control={control.paymentType} />
        
        {paymentType === 'installments' && (
          <FormField control={control.installments} />
        )}
      </div>
    </div>
  );
};
