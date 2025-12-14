import { InsuranceApplicationForm } from './forms/insurance-application/Form';
import type { InsuranceApplicationForm as InsuranceFormType } from './forms/insurance-application/type';

function App() {
  const handleSubmit = (data: InsuranceFormType) => {
    console.log('Form submitted:', data);
    alert('Заявление успешно подано!');
  };

  return (
    <div className="App">
      <InsuranceApplicationForm 
        onSubmit={handleSubmit} 
      />
    </div>
  );
}

export default App;