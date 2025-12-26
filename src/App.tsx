import { useState } from 'react';
import { InsuranceForm } from './features/insurance-form-rhf';
import type { FormMode } from './features/insurance-form-rhf';
import { Button } from './components/ui/button';

function App() {
  const [mode, setMode] = useState<FormMode>('create');

  return (
    <div className="min-h-svh bg-background">
      <div className="border-b">
        <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">React Hook Form Demo</h1>
          <div className="flex gap-2">
            <Button
              variant={mode === 'create' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMode('create')}
            >
              Создание
            </Button>
            <Button
              variant={mode === 'edit' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMode('edit')}
            >
              Редактирование
            </Button>
            <Button
              variant={mode === 'view' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMode('view')}
            >
              Просмотр
            </Button>
          </div>
        </div>
      </div>

      <InsuranceForm
        key={mode}
        mode={mode}
        onSubmit={(data) => {
          console.log('Submitted data:', data);
          alert('Форма успешно отправлена! Данные в консоли.');
        }}
      />
    </div>
  );
}

export default App;
