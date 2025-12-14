import { InsuranceApplicationForm } from './forms/insurance-application';
import type { InsuranceApplicationFormType } from './forms/insurance-application';

function App() {
  const handleSubmit = (data: InsuranceApplicationFormType) => {
    console.log('Form data submitted:', data);
    // Here you would typically send the data to your API
  };

  return (
    <div className="min-h-svh bg-gray-50 py-6">
      <InsuranceApplicationForm onSubmit={handleSubmit} />
    </div>
  );
}

export default App