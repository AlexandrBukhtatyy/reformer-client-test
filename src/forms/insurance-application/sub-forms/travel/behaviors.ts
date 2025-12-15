import type { BehaviorSchemaFn } from '@reformer/core';
import { computeFrom } from '@reformer/core/behaviors';
import type { TravelData } from './type';

export const travelBehaviors: BehaviorSchemaFn<TravelData> = (path) => {
  // Вычисление длительности поездки в днях
  computeFrom(
    [path.departureDate, path.returnDate],
    path.tripDuration,
    ({ departureDate, returnDate }) => {
      if (departureDate && returnDate) {
        const departure = new Date(departureDate);
        const returnD = new Date(returnDate);
        const diffTime = returnD.getTime() - departure.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : undefined;
      }
      return undefined;
    }
  );
};
