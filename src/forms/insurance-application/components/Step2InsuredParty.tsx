// Step 2: Insured Party Data
import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/input';
import { InputMask } from '@/components/ui/input-mask';
import { RadioGroup } from '@/components/ui/radio-group';
import type { InsuranceApplicationForm } from '../types';

interface Step2Props {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

const insuredTypeOptions = [
  { value: 'individual', label: 'Физическое лицо' },
  { value: 'company', label: 'Юридическое лицо' },
];

const genderOptions = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
];

export function Step2InsuredParty({ control }: Step2Props) {
  const isIndividual = control.controls.insuredType.value === 'individual';
  const isCompany = control.controls.insuredType.value === 'company';

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Шаг 2: Данные страхователя</h2>

      {/* Insured Type */}
      <FormField
        control={control.controls.insuredType.withComponent(RadioGroup, {
          label: 'Тип страхователя',
          options: insuredTypeOptions,
          testId: 'insuredType',
        })}
        testId="insuredType"
      />

      {/* Personal Data - for individuals */}
      {isIndividual && control.controls.personalData.enabled && (
        <div className="border-t pt-4 mt-4">
          <h3 className="text-lg font-medium mb-4">Личные данные</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={control.controls.personalData.controls.lastName.withComponent(Input, {
                label: 'Фамилия',
                placeholder: 'Введите фамилию',
                testId: 'lastName',
              })}
              testId="lastName"
            />
            <FormField
              control={control.controls.personalData.controls.firstName.withComponent(Input, {
                label: 'Имя',
                placeholder: 'Введите имя',
                testId: 'firstName',
              })}
              testId="firstName"
            />
            <FormField
              control={control.controls.personalData.controls.middleName.withComponent(Input, {
                label: 'Отчество',
                placeholder: 'Введите отчество',
                testId: 'middleName',
              })}
              testId="middleName"
            />
            <FormField
              control={control.controls.personalData.controls.birthDate.withComponent(Input, {
                label: 'Дата рождения',
                type: 'date',
                testId: 'birthDate',
              })}
              testId="birthDate"
            />
            <FormField
              control={control.controls.personalData.controls.gender.withComponent(RadioGroup, {
                label: 'Пол',
                options: genderOptions,
                testId: 'gender',
              })}
              testId="gender"
            />
          </div>
        </div>
      )}

      {/* Passport Data - for individuals */}
      {isIndividual && control.controls.passportData.enabled && (
        <div className="border-t pt-4 mt-4">
          <h3 className="text-lg font-medium mb-4">Паспортные данные</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control.controls.passportData.controls.series.withComponent(InputMask, {
                label: 'Серия паспорта',
                mask: '99 99',
                placeholder: '12 34',
                testId: 'passportSeries',
              })}
              testId="passportSeries"
            />
            <FormField
              control={control.controls.passportData.controls.number.withComponent(InputMask, {
                label: 'Номер паспорта',
                mask: '999999',
                placeholder: '123456',
                testId: 'passportNumber',
              })}
              testId="passportNumber"
            />
            <FormField
              control={control.controls.passportData.controls.issueDate.withComponent(Input, {
                label: 'Дата выдачи',
                type: 'date',
                testId: 'passportIssueDate',
              })}
              testId="passportIssueDate"
            />
            <FormField
              control={control.controls.passportData.controls.issuedBy.withComponent(Input, {
                label: 'Кем выдан',
                placeholder: 'Отделением УФМС...',
                testId: 'passportIssuedBy',
              })}
              testId="passportIssuedBy"
            />
          </div>
        </div>
      )}

      {/* Company Data - for companies */}
      {isCompany && control.controls.companyData.enabled && (
        <div className="border-t pt-4 mt-4">
          <h3 className="text-lg font-medium mb-4">Данные организации</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control.controls.companyData.controls.name.withComponent(Input, {
                label: 'Название организации',
                placeholder: 'ООО "Компания"',
                testId: 'companyName',
              })}
              testId="companyName"
            />
            <FormField
              control={control.controls.companyData.controls.inn.withComponent(InputMask, {
                label: 'ИНН организации',
                mask: '9999999999',
                placeholder: '1234567890',
                testId: 'companyInn',
              })}
              testId="companyInn"
            />
            <FormField
              control={control.controls.companyData.controls.ogrn.withComponent(InputMask, {
                label: 'ОГРН',
                mask: '9999999999999',
                placeholder: '1234567890123',
                testId: 'companyOgrn',
              })}
              testId="companyOgrn"
            />
            <FormField
              control={control.controls.companyData.controls.kpp.withComponent(InputMask, {
                label: 'КПП',
                mask: '999999999',
                placeholder: '123456789',
                testId: 'companyKpp',
              })}
              testId="companyKpp"
            />
            <FormField
              control={control.controls.companyData.controls.ceoName.withComponent(Input, {
                label: 'ФИО руководителя',
                placeholder: 'Иванов Иван Иванович',
                testId: 'companyCeoName',
              })}
              className="md:col-span-2"
              testId="companyCeoName"
            />
          </div>
        </div>
      )}

      {/* Contact Information */}
      <div className="border-t pt-4 mt-4">
        <h3 className="text-lg font-medium mb-4">Контактная информация</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control.controls.phone.withComponent(InputMask, {
              label: 'Телефон',
              mask: '+7 (999) 999-99-99',
              placeholder: '+7 (___) ___-__-__',
              testId: 'phone',
            })}
            testId="phone"
          />
          <FormField
            control={control.controls.email.withComponent(Input, {
              label: 'Email',
              type: 'email',
              placeholder: 'example@mail.com',
              testId: 'email',
            })}
            testId="email"
          />
        </div>
      </div>

      {/* Computed Fields */}
      {isIndividual && (
        <div className="border-t pt-4 mt-4">
          <h3 className="text-lg font-medium mb-4">Вычисляемые поля</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control.controls.fullName.withComponent(Input, {
                label: 'Полное имя (ФИО)',
                disabled: true,
                testId: 'fullName',
              })}
              testId="fullName"
            />
            <FormField
              control={control.controls.age.withComponent(Input, {
                label: 'Возраст',
                type: 'number',
                disabled: true,
                testId: 'age',
              })}
              testId="age"
            />
          </div>
        </div>
      )}
    </div>
  );
}
