export type TravelPurpose = 'tourism' | 'business' | 'study' | 'work' | 'sport';
export type SportType = 'none' | 'skiing' | 'diving' | 'extreme' | 'water';

export interface TravelData {
  countries: string[];
  departureDate: string;
  returnDate: string;
  tripDuration: number | undefined; // computed: returnDate - departureDate
  travelPurpose: TravelPurpose;
  sportType: SportType;
  hasMedicalConditions: boolean;
  medicalConditionsDescription: string;
  includesCancellation: boolean;
  includesLuggage: boolean;
  luggageValue: number | undefined;
  includesLiability: boolean;
}
