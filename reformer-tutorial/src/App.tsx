import { CreditApplicationForm } from './features/credit-application';

function App() {
  return (
    <div className="min-h-svh bg-gray-100 py-6">
      <CreditApplicationForm
        mode="create"
        onSubmitSuccess={(data) => {
          console.log('Заявка отправлена:', data);
        }}
        onSubmitError={(error) => {
          console.error('Ошибка отправки:', error);
        }}
      />
    </div>
  );
}

export default App;
