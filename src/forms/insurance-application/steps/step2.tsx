import React from 'react';
import { FormField } from '@/components/ui/FormField';
import type { GroupNodeWithControls } from '@reformer/core';
import type { InsuranceApplicationForm } from '../type';

interface Step2Props {
  control: GroupNodeWithControls<Pick<InsuranceApplicationForm, 
    'insuredType' | 'personalData' | 'companyData' | 'passportData' | 
    'phone' | 'email' | 'fullName' | 'age'
  >>;
}

export const Step2: React.FC<Step2Props> = ({ control }) => {
  const insuredType = control.insuredType.value.value;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Данные страхователя</h2>
      
      <FormField control={control.insuredType} />
      
      {insuredType === 'individual' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField control={control.personalData.lastName} />
            <FormField control={control.personalData.firstName} />
            <FormField control={control.personalData.middleName} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={control.personalData.birthDate} />
            <FormField control={control.personalData.gender} />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Паспортные данные</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={control.passportData.series} />
              <FormField control={control.passportData.number} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={control.passportData.issueDate} />
              <FormField control={control.passportData.issuedBy} />
            </div>
          </div>
        </div>
      )}
      
      {insuredType === 'company' && (
        <div className="space-y-6">
          <FormField control={control.companyData.name} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={control.companyData.inn} />
            <FormField control={control.companyData.ogrn} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={control.companyData.kpp} />
            <FormField control={control.companyData.ceoName} />
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={control.phone} />
        <FormField control={control.email} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={control.fullName} />
        <FormField control={control.age} />
      </div>
    </div>
  );
};