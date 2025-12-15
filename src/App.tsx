import { InsuranceApplicationForm } from './forms/insurance-application/InsuranceApplicationForm';

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center py-6 bg-gray-100">
      <div className="w-full max-w-4xl px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Заявка на страхование</h1>
          <p className="text-gray-600 mt-2">Заполните форму для оформления страхового полиса</p>
        </div>
        <InsuranceApplicationForm />
      </div>
    </div>
  );
}

export default App;
