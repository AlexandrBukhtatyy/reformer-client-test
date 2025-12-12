import { useMemo } from "react";
import { useStepForm } from "@reformer/react";
import { insuranceForm } from "../schema";
import { STEP_VALIDATIONS } from "../validation";
import { Step1 } from "./steps/Step1";
import { Step2 } from "./steps/Step2";
import { Step3 } from "./steps/Step3";
import { Step4 } from "./steps/Step4";
import { Step5 } from "./steps/Step5";
import { Step6 } from "./steps/Step6";
import { StepNavigation } from "../../../components/ui/step-navigation";

const STEPS = [Step1, Step2, Step3, Step4, Step5, Step6];

export function InsuranceForm() {
  const form = useMemo(() => insuranceForm, []);

  const {
    currentStep,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
    validateCurrentStep,
    stepErrors,
  } = useStepForm(form, {
    stepSchemas: STEP_VALIDATIONS,
    totalSteps: STEPS.length,
  });

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) nextStep();
  };

  const handleSubmit = async () => {
    await form.validate();
    if (form.valid.value) {
      console.log("Submit:", form.value);
      // Here you would typically send the form data to your backend
      // await submitForm(form.value);
    }
  };

  const StepComponent = STEPS[currentStep - 1];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Страховая форма</h1>
      
      <StepNavigation 
        currentStep={currentStep} 
        totalSteps={STEPS.length} 
        stepErrors={stepErrors}
      />

      <div className="mt-8">
        <StepComponent control={form} />
      </div>

      <div className="flex gap-4 mt-8 justify-between">
        {!isFirstStep && (
          <button
            onClick={prevStep}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Назад
          </button>
        )}
        
        {isLastStep ? (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ml-auto"
          >
            Отправить
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ml-auto"
          >
            Далее
          </button>
        )}
      </div>
    </div>
  );
}