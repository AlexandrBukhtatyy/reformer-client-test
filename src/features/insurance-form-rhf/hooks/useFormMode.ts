import { useFormModeContext } from '../context/FormModeContext';
import type { FormMode } from '../context/FormModeContext';

export type { FormMode };

export function useFormMode() {
  return useFormModeContext();
}
