import React from 'react';
import { FormField } from '../../../components/ui/FormField';
import type { GroupNodeWithControls } from '@reformer/core';
import type { InsuranceApplicationForm } from '../schemas/form-schema';

interface Step4Props {
  form: GroupNodeWithControls<InsuranceApplicationForm>;
}

const Step4: React.FC<Step4Props> = ({ form }) => {
  const insuranceType = form.insuranceType.value.value;
  
  return (
    <div className="space-y-6">
      {insuranceType === 'casco' || insuranceType === 'osago' ? (
        <div className="space-y-6">
          <FormField control={form.unlimitedDrivers} />
          
          {!form.unlimitedDrivers.value.value && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Водители</h3>
              {form.drivers.map((driver: any, index: number) => (
                <div key={index} className="border p-4 rounded-md space-y-4">
                  <FormField control={driver.fullName} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={driver.birthDate} />
                    <FormField control={driver.licenseNumber} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={driver.licenseIssueDate} />
                    <FormField control={driver.drivingExperience} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={driver.accidentsCount} />
                    <FormField control={driver.isMainDriver} />
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.minDriverAge} />
            <FormField control={form.minDriverExperience} />
          </div>
        </div>
      ) : insuranceType === 'life' ? (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Выгодоприобретатели</h3>
          {form.beneficiaries.map((beneficiary: any, index: number) => (
            <div key={index} className="border p-4 rounded-md space-y-4">
              <FormField control={beneficiary.fullName} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={beneficiary.birthDate} />
                <FormField control={beneficiary.relationship} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={beneficiary.share} />
                <FormField control={beneficiary.phone} />
              </div>
            </div>
          ))}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.totalBeneficiaryShare} />
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          Пожалуйста, выберите тип страхования на первом шаге
        </div>
      )}
    </div>
  );
};

export default Step4;