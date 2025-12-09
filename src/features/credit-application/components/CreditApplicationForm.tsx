import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { form } from "../schema";
import { STEP_VALIDATIONS, validation } from "../validation";
import { StepNavigation } from "../../../components/ui/step-navigation";
import type { StepNavigationHandle } from "../../../components/ui/step-navigation/types";
import { LoanInfoStep } from "./steps/LoanInfoStep";
import { PersonalInfoStep } from "./steps/PersonalInfoStep";
import { ContactInfoStep } from "./steps/ContactInfoStep";
import { EmploymentInfoStep } from "./steps/EmploymentInfoStep";
import { AdditionalInfoStep } from "./steps/AdditionalInfoStep";
import { ConfirmationStep } from "./steps/ConfirmationStep";
import type { CreditApplicationForm } from "../types";
import { loadApplicationData } from "../mocks";

export function CreditApplicationForm() {
  const formInstance = useMemo(() => form, []);
  const navRef = useRef<StepNavigationHandle<CreditApplicationForm>>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Функция для заполнения формы данными
  const fillFormWithData = useCallback((data: Partial<CreditApplicationForm>) => {
    // Заполняем простые поля
    if (data.loanType) formInstance.loanType.setValue(data.loanType);
    if (data.loanAmount) formInstance.loanAmount.setValue(data.loanAmount);
    if (data.loanTerm) formInstance.loanTerm.setValue(data.loanTerm);
    if (data.loanPurpose) formInstance.loanPurpose.setValue(data.loanPurpose);

    // Персональные данные
    if (data.personalData) {
      formInstance.personalData.lastName.setValue(data.personalData.lastName);
      formInstance.personalData.firstName.setValue(data.personalData.firstName);
      formInstance.personalData.middleName.setValue(data.personalData.middleName);
      formInstance.personalData.birthDate.setValue(data.personalData.birthDate);
      formInstance.personalData.gender.setValue(data.personalData.gender);
      formInstance.personalData.birthPlace.setValue(data.personalData.birthPlace);
    }

    // Паспортные данные
    if (data.passportData) {
      formInstance.passportData.series.setValue(data.passportData.series);
      formInstance.passportData.number.setValue(data.passportData.number);
      formInstance.passportData.issueDate.setValue(data.passportData.issueDate);
      formInstance.passportData.issuedBy.setValue(data.passportData.issuedBy);
      formInstance.passportData.departmentCode.setValue(data.passportData.departmentCode);
    }

    if (data.inn) formInstance.inn.setValue(data.inn);
    if (data.snils) formInstance.snils.setValue(data.snils);

    // Контактная информация
    if (data.phoneMain) formInstance.phoneMain.setValue(data.phoneMain);
    if (data.phoneAdditional) formInstance.phoneAdditional.setValue(data.phoneAdditional);
    if (data.email) formInstance.email.setValue(data.email);
    if (data.emailAdditional) formInstance.emailAdditional.setValue(data.emailAdditional);

    // Адрес регистрации
    if (data.registrationAddress) {
      formInstance.registrationAddress.region.setValue(data.registrationAddress.region);
      formInstance.registrationAddress.city.setValue(data.registrationAddress.city);
      formInstance.registrationAddress.street.setValue(data.registrationAddress.street);
      formInstance.registrationAddress.house.setValue(data.registrationAddress.house);
      formInstance.registrationAddress.apartment.setValue(data.registrationAddress.apartment);
      formInstance.registrationAddress.postalCode.setValue(data.registrationAddress.postalCode);
    }

    if (data.sameAsRegistration !== undefined) formInstance.sameAsRegistration.setValue(data.sameAsRegistration);

    // Информация о занятости
    if (data.employmentStatus) formInstance.employmentStatus.setValue(data.employmentStatus);
    if (data.companyName) formInstance.companyName.setValue(data.companyName);
    if (data.companyInn) formInstance.companyInn.setValue(data.companyInn);
    if (data.companyPhone) formInstance.companyPhone.setValue(data.companyPhone);
    if (data.companyAddress) formInstance.companyAddress.setValue(data.companyAddress);
    if (data.position) formInstance.position.setValue(data.position);
    if (data.workExperienceTotal) formInstance.workExperienceTotal.setValue(data.workExperienceTotal);
    if (data.workExperienceCurrent) formInstance.workExperienceCurrent.setValue(data.workExperienceCurrent);
    if (data.monthlyIncome) formInstance.monthlyIncome.setValue(data.monthlyIncome);
    if (data.additionalIncome) formInstance.additionalIncome.setValue(data.additionalIncome);
    if (data.additionalIncomeSource) formInstance.additionalIncomeSource.setValue(data.additionalIncomeSource);

    // Дополнительная информация
    if (data.maritalStatus) formInstance.maritalStatus.setValue(data.maritalStatus);
    if (data.dependents !== undefined) formInstance.dependents.setValue(data.dependents);
    if (data.education) formInstance.education.setValue(data.education);
    if (data.hasProperty !== undefined) formInstance.hasProperty.setValue(data.hasProperty);
    if (data.hasExistingLoans !== undefined) formInstance.hasExistingLoans.setValue(data.hasExistingLoans);
    if (data.hasCoBorrower !== undefined) formInstance.hasCoBorrower.setValue(data.hasCoBorrower);

    // Подтверждения
    if (data.agreePersonalData !== undefined) formInstance.agreePersonalData.setValue(data.agreePersonalData);
    if (data.agreeCreditHistory !== undefined) formInstance.agreeCreditHistory.setValue(data.agreeCreditHistory);
    if (data.agreeMarketing !== undefined) formInstance.agreeMarketing.setValue(data.agreeMarketing);
    if (data.agreeTerms !== undefined) formInstance.agreeTerms.setValue(data.agreeTerms);
    if (data.confirmAccuracy !== undefined) formInstance.confirmAccuracy.setValue(data.confirmAccuracy);
    if (data.electronicSignature) formInstance.electronicSignature.setValue(data.electronicSignature);
  }, [formInstance]);

  // Загрузка данных при монтировании
  useEffect(() => {
    let isCancelled = false;

    async function loadData() {
      try {
        setIsLoading(true);
        setLoadError(null);

        // Имитация загрузки данных с сервера
        const data = await loadApplicationData(1500);

        if (!isCancelled) {
          fillFormWithData(data);
          setIsLoading(false);
        }
      } catch {
        if (!isCancelled) {
          setLoadError("Ошибка загрузки данных. Пожалуйста, попробуйте позже.");
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isCancelled = true;
    };
  }, [fillFormWithData]);

  const config = useMemo(() => ({
    totalSteps: 6,
    stepValidations: STEP_VALIDATIONS,
    fullValidation: validation,
  }), []);

  // Показываем индикатор загрузки
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Заявка на кредит</h1>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Загрузка данных заявки...</p>
        </div>
      </div>
    );
  }

  // Показываем ошибку загрузки
  if (loadError) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Заявка на кредит</h1>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-red-500 text-5xl mb-4">⚠</div>
          <p className="text-red-600 mb-4">{loadError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Заявка на кредит</h1>

      <StepNavigation
        ref={navRef}
        form={formInstance}
        config={config}
      >
        {({ currentStep, isFirstStep, isLastStep, isValidating }) => (
          <>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Шаг {currentStep} из 6</span>
                <span className="text-sm text-gray-500">
                  {currentStep === 1 && "Основная информация"}
                  {currentStep === 2 && "Персональные данные"}
                  {currentStep === 3 && "Контактная информация"}
                  {currentStep === 4 && "Информация о занятости"}
                  {currentStep === 5 && "Дополнительная информация"}
                  {currentStep === 6 && "Подтверждение"}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(currentStep / 6) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mt-8">
              {currentStep === 1 && <LoanInfoStep control={formInstance} />}
              {currentStep === 2 && <PersonalInfoStep control={formInstance} />}
              {currentStep === 3 && <ContactInfoStep control={formInstance} />}
              {currentStep === 4 && <EmploymentInfoStep control={formInstance} />}
              {currentStep === 5 && <AdditionalInfoStep control={formInstance} />}
              {currentStep === 6 && <ConfirmationStep control={formInstance} />}
            </div>

            <div className="flex justify-between mt-8">
              {!isFirstStep && (
                <button
                  onClick={() => navRef.current?.goToPreviousStep()}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                  disabled={isValidating}
                >
                  Назад
                </button>
              )}
              
              {isLastStep ? (
                <button
                  onClick={async () => {
                    const result = await navRef.current?.submit((values) => {
                      console.log("Submit:", values);
                      // Здесь будет логика отправки формы
                      return values;
                    });
                    if (result) {
                      console.log("Form submitted successfully");
                    }
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors ml-auto"
                  disabled={isValidating}
                >
                  {isValidating ? "Отправка..." : "Отправить заявку"}
                </button>
              ) : (
                <button
                  onClick={() => navRef.current?.goToNextStep()}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors ml-auto"
                  disabled={isValidating}
                >
                  {isValidating ? "Проверка..." : "Далее"}
                </button>
              )}
            </div>
          </>
        )}
      </StepNavigation>
    </div>
  );
}