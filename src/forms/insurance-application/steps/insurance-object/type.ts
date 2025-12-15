import type { VehicleData } from '../../sub-forms/vehicle/type';
import type { PropertyData } from '../../sub-forms/property/type';
import type { LifeHealthData } from '../../sub-forms/life-health/type';
import type { TravelData } from '../../sub-forms/travel/type';
import type { TravelerData } from '../../sub-forms/traveler/type';

export interface InsuranceObjectStep {
  vehicle: VehicleData;
  property: PropertyData;
  lifeHealth: LifeHealthData;
  travel: TravelData;
  travelers: TravelerData[];
}
