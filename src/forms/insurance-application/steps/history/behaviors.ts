import type { BehaviorSchemaFn } from '@reformer/core';
import { watchField } from '@reformer/core/behaviors';
import type { HistoryStep } from './type';

export const historyBehaviors: BehaviorSchemaFn<HistoryStep> = (path) => {
  // Очищаем массив страховых случаев при снятии галочки
  watchField(
    path.hasClaimsHistory,
    (hasClaimsHistory, ctx) => {
      if (!hasClaimsHistory && ctx.form.claims) {
        ctx.form.claims.clear();
      }
    },
    { immediate: false }
  );
};
