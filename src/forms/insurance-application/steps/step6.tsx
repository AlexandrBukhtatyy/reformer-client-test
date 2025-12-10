import React from 'react';
import { FormField } from '@/components/ui/FormField';
import { useFormControlValue, type GroupNodeWithControls } from '@reformer/core';
import type { InsuranceApplicationForm } from '../type';

interface Step6Props {
  control: GroupNodeWithControls<Pick<InsuranceApplicationForm, 
    'basePremium' | 'ageCoefficient' | 'experienceCoefficient' | 'regionCoefficient' | 
    'claimsCoefficient' | 'deductibleDiscount' | 'promoDiscount' | 'multiPolicyDiscount' | 
    'totalPremium' | 'installmentAmount' | 'agreePersonalData' | 'agreeTerms' | 
    'agreeElectronicPolicy' | 'agreeMarketing' | 'confirmAccuracy' | 'electronicSignature' | 'paymentType'
  >>;
}

export const Step6: React.FC<Step6Props> = ({ control }) => {
  const paymentType = useFormControlValue(control.paymentType);
  const totalPremium = useFormControlValue(control.totalPremium);
  const installmentAmount = useFormControlValue(control.installmentAmount);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Расчет и подтверждение</h2>
      
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Расчет страховой премии</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField control={control.basePremium} />
          <FormField control={control.ageCoefficient} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField control={control.experienceCoefficient} />
          <FormField control={control.regionCoefficient} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField control={control.claimsCoefficient} />
          <FormField control={control.deductibleDiscount} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField control={control.promoDiscount} />
          <FormField control={control.multiPolicyDiscount} />
        </div>
        
        <div className="bg-gray-100 p-6 rounded-lg">
          <div className="text-lg font-semibold">Итоговая премия: {totalPremium?.toLocaleString()} ₽</div>
          {paymentType === 'installments' && (
            <div className="text-md mt-2">Сумма платежа: {installmentAmount?.toLocaleString()} ₽</div>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Подтверждение и согласия</h3>
        <FormField control={control.agreePersonalData} />
        <FormField control={control.agreeTerms} />
        <FormField control={control.agreeElectronicPolicy} />
        <FormField control={control.agreeMarketing} />
        <FormField control={control.confirmAccuracy} />
        <div className="pt-4">
          <FormField control={control.electronicSignature} />
          <p className="text-sm text-gray-500 mt-1">Введите SMS-код для подтверждения</p>
        </div>
      </div>
    </div>
  );
};