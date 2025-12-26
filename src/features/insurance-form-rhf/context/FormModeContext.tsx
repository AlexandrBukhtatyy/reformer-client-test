import { createContext, useContext, ReactNode } from 'react';

export type FormMode = 'view' | 'edit' | 'create';

interface FormModeContextValue {
  mode: FormMode;
  isReadOnly: boolean;
  isCreateMode: boolean;
  isEditMode: boolean;
  isViewMode: boolean;
}

const FormModeContext = createContext<FormModeContextValue | null>(null);

interface FormModeProviderProps {
  mode: FormMode;
  children: ReactNode;
}

export function FormModeProvider({ mode, children }: FormModeProviderProps) {
  const value: FormModeContextValue = {
    mode,
    isReadOnly: mode === 'view',
    isCreateMode: mode === 'create',
    isEditMode: mode === 'edit',
    isViewMode: mode === 'view',
  };

  return (
    <FormModeContext.Provider value={value}>
      {children}
    </FormModeContext.Provider>
  );
}

export function useFormModeContext() {
  const context = useContext(FormModeContext);
  if (!context) {
    throw new Error('useFormModeContext must be used within a FormModeProvider');
  }
  return context;
}
