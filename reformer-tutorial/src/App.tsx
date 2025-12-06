import { CreditApplicationForm } from '@/features/credit-application';

function App() {
  return (
    <div className="min-h-svh bg-gray-100 py-6">
      <CreditApplicationForm
        applicationId="1"
        mode="edit"
        onSuccess={(message) => {
          console.log('Success:', message);
        }}
        onCancel={() => {
          console.log('Cancelled');
        }}
      />
    </div>
  );
}

export default App;
