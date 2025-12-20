import React from 'react';
import { FormField } from '../../../components/ui/FormField';
import type { GroupNodeWithControls } from '@reformer/core';
import type { InsuranceApplicationForm } from '../schemas/form-schema';

interface Step2Props {
  form: GroupNodeWithControls<InsuranceApplicationForm>;
}

const Step2: React.FC<Step2Props> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={form.insuredType} />
      </div>
      
      {form.insuredType.value.value === 'individual' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField control={form.personalData.lastName} />
            <FormField control={form.personalData.firstName} />
            <FormField control={form.personalData.middleName} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.personalData.birthDate} />
            <FormField control={form.personalData.gender} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.passportData.series} />
            <FormField control={form.passportData.number} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.passportData.issueDate} />
            <FormField control={form.passportData.issuedBy} />
          </div>
        </div>
      )}
      
      {form.insuredType.value.value === 'company' && (
        <div className="space-y-6">
          <FormField control={form.companyData.name} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.companyData.inn} />
            <FormField control={form.companyData.ogrn} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.companyData.kpp} />
            <FormField control={form.companyData.ceoName} />
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={form.phone} />
        <FormField control={form.email} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={form.fullName} />
        <FormField control={form.age} />
      </div>
    </div>
  );
};

export default Step2;