import React from 'react';
import { FormField } from '@/components/ui/FormField';
import type { GroupNodeWithControls } from '@reformer/core';
import type { Driver, InsuranceApplicationForm } from '../type';

interface Step4Props {
  control: GroupNodeWithControls<Pick<InsuranceApplicationForm, 
    'insuranceType' | 'drivers' | 'unlimitedDrivers' | 'minDriverAge' | 'minDriverExperience' | 
    'beneficiaries' | 'totalBeneficiaryShare'
  >>;
}

export const Step4: React.FC<Step4Props> = ({ control }) => {
  const insuranceType = control.insuranceType.value.value;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Водители и выгодоприобретатели</h2>
      
      {(insuranceType === 'casco' || insuranceType === 'osago') && (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <FormField control={control.unlimitedDrivers} />
          </div>
          
          {!control.unlimitedDrivers.value.value && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Водители</h3>
              
              {control.drivers?.map((driverControl: GroupNodeWithControls<Driver>, index: number) => (
                <div key={index} className="border p-4 rounded space-y-4">
                  <h4 className="font-medium">Водитель #{index + 1}</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={driverControl?.fullName} />
                    <FormField control={driverControl?.birthDate} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={driverControl?.licenseNumber} />
                    <FormField control={driverControl?.licenseIssueDate} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={driverControl?.drivingExperience} />
                    <FormField control={driverControl?.accidentsCount} />
                  </div>
                  
                  <FormField control={driverControl?.isMainDriver} />
                </div>
              ))}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={control.minDriverAge} />
                <FormField control={control.minDriverExperience} />
              </div>
            </div>
          )}
        </div>
      )}
      
      {insuranceType === 'life' && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Выгодоприобретатели</h3>
          
          {control.beneficiaries.value.value?.map((_: unknown, index: number) => (
            <div key={index} className="border p-4 rounded space-y-4">
              <h4 className="font-medium">Выгодоприобретатель #{index + 1}</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={control.beneficiaries[index]?.fullName} />
                <FormField control={control.beneficiaries[index]?.birthDate} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={control.beneficiaries[index]?.relationship} />
                <FormField control={control.beneficiaries[index]?.share} />
              </div>
              
              <FormField control={control.beneficiaries[index]?.phone} />
            </div>
          ))}
          
          <FormField control={control.totalBeneficiaryShare} />
        </div>
      )}
    </div>
  );
};