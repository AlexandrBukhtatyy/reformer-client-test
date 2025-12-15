import type { BehaviorSchemaFn } from '@reformer/core';
import { watchField } from '@reformer/core/behaviors';
import type { HistoryStep } from './type';

export const historyBehaviors: BehaviorSchemaFn<HistoryStep> = (path) => {
  // Очищаем массив страховых случаев при снятии галочки
  watchField(
    path.hasClaimsHistory,
    (hasClaimsHistory, ctx) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const form = ctx.form as any;
      if (!hasClaimsHistory && form?.claims?.clear) {
        form.claims.clear();
      }
    },
    { immediate: false }
  );
};
