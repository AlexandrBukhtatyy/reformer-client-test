import React from 'react';
import { FormField } from '@/components/ui/FormField';
import type { GroupNodeWithControls } from '@reformer/core';
import type { InsuranceApplicationForm } from '../type';

interface Step5Props {
  control: GroupNodeWithControls<Pick<InsuranceApplicationForm, 
    'hasPreviousInsurance' | 'previousInsurer' | 'previousPolicyNumber' | 
    'previousPolicyEndDate' | 'hadClaims' | 'claims' | 'promoCode' | 
    'referralSource' | 'agentCode' | 'additionalNotes'
  >>;
}

export const Step5: React.FC<Step5Props> = ({ control }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">История и дополнительная информация</h2>
      
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <FormField control={control.hasPreviousInsurance} />
        </div>
        
        {control.hasPreviousInsurance.value.value && (
          <div className="space-y-6 pl-6">
            <FormField control={control.previousInsurer} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={control.previousPolicyNumber} />
              <FormField control={control.previousPolicyEndDate} />
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <FormField control={control.hadClaims} />
        </div>
        
        {control.hadClaims.value.value && (
          <div className="space-y-6 pl-6">
            {control.claims?.map((claimControl: GroupNodeWithControls<Claim>, index: number) => (
              <div key={index} className="border p-4 rounded space-y-4">
                <h4 className="font-medium">Страховой случай #{index + 1}</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={claimControl?.date} />
                  <FormField control={claimControl?.type} />
                </div>
                
                <FormField control={claimControl?.description} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={claimControl?.amount} />
                  <FormField control={claimControl?.atFault} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Дополнительная информация</h3>
        <FormField control={control.promoCode} />
        <FormField control={control.referralSource} />
        <FormField control={control.agentCode} />
        <FormField control={control.additionalNotes} />
      </div>
    </div>
  );
};