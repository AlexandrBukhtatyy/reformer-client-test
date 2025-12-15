import type { BehaviorSchemaFn } from '@reformer/core';
import { watchField } from '@reformer/core/behaviors';
import type { VehicleData } from './type';
import { CAR_MODELS } from '../../constants';

export const vehicleBehaviors: BehaviorSchemaFn<VehicleData> = (path) => {
  // При смене марки обновляем опции модели через схему
  watchField(
    path.brand,
    (brand, ctx) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const form = ctx.form as any;
      const currentModel = form?.model?.value?.value;

      // Получаем модели для выбранной марки
      const models = brand ? (CAR_MODELS[brand] || CAR_MODELS.default) : [];

      // Обновляем опции для поля model через updateComponentProps
      form?.model?.updateComponentProps?.({ options: models });

      // Если текущая модель не входит в список моделей новой марки - сбрасываем
      const modelExists = models.some((m: { value: string }) => m.value === currentModel);
      if (!modelExists && currentModel) {
        ctx.setFieldValue('model', '');
      }
    },
    { immediate: true }
  );
};
