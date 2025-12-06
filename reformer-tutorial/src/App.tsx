import { useState } from 'react';
import { CreditApplicationForm } from '@/features/credit-application';
import { Button } from '@/components/ui/button';
import type { FormMode } from '@/features/credit-application';

function App() {
  const [mode, setMode] = useState<FormMode>('create');
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true);

  const handleSuccess = (id: string) => {
    console.log('Заявка отправлена, ID:', id);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleModeChange = (newMode: FormMode, id: string | null = null) => {
    setMode(newMode);
    setApplicationId(id);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Панель управления для демонстрации */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900">
              Credit Application Demo
            </h1>
            <div className="flex gap-2">
              <Button
                variant={mode === 'create' && !applicationId ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleModeChange('create', null)}
              >
                Новая заявка
              </Button>
              <Button
                variant={mode === 'edit' && applicationId === '1' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleModeChange('edit', '1')}
              >
                Редактировать #1
              </Button>
              <Button
                variant={mode === 'view' && applicationId === '1' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleModeChange('view', '1')}
              >
                Просмотр #1
              </Button>
              <Button
                variant={mode === 'edit' && applicationId === '2' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleModeChange('edit', '2')}
              >
                Редактировать #2
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Форма */}
      <div className="py-6">
        {showForm ? (
          <CreditApplicationForm
            key={`${mode}-${applicationId}`}
            mode={mode}
            applicationId={applicationId}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        ) : (
          <div className="max-w-4xl mx-auto px-6 text-center py-12">
            <p className="text-gray-600 mb-4">Форма закрыта</p>
            <Button onClick={() => setShowForm(true)}>Показать форму</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
