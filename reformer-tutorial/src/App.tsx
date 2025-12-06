import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreditApplicationForm } from '@/features/credit-application';
import type { FormMode } from '@/features/credit-application';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState<FormMode>('create');
  const [applicationId, setApplicationId] = useState<string | undefined>(undefined);

  const handleOpenCreate = () => {
    setMode('create');
    setApplicationId(undefined);
    setShowForm(true);
  };

  const handleOpenEdit = (id: string) => {
    setMode('edit');
    setApplicationId(id);
    setShowForm(true);
  };

  const handleOpenView = (id: string) => {
    setMode('view');
    setApplicationId(id);
    setShowForm(true);
  };

  const handleSuccess = (id: string) => {
    console.log('Заявка сохранена с ID:', id);
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <CreditApplicationForm
          mode={mode}
          applicationId={applicationId}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Заявка на кредит
        </h1>

        <p className="text-gray-600 mb-6 text-center">
          Демонстрация многошаговой формы на основе @reformer/core
        </p>

        <div className="space-y-3">
          <Button
            className="w-full"
            onClick={handleOpenCreate}
          >
            Создать новую заявку
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">или</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleOpenEdit('1')}
          >
            Редактировать заявку #1 (Ипотека)
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleOpenEdit('2')}
          >
            Редактировать заявку #2 (Автокредит)
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">просмотр</span>
            </div>
          </div>

          <Button
            variant="ghost"
            className="w-full"
            onClick={() => handleOpenView('1')}
          >
            Просмотр заявки #1
          </Button>
        </div>

        <p className="text-xs text-gray-400 mt-6 text-center">
          Данные в режимах редактирования и просмотра загружаются из mock API
        </p>
      </div>
    </div>
  );
}

export default App;
