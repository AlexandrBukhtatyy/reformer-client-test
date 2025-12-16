export type TravelPurpose = 'tourism' | 'business' | 'study' | 'work' | 'sport';
export type SportType = 'none' | 'skiing' | 'diving' | 'extreme' | 'water';

export interface TravelCoverageOptions {
  medical: boolean;         // Медицинские расходы
  baggage: boolean;         // Багаж
  tripCancellation: boolean;// Отмена поездки
  flightDelay: boolean;     // Задержка рейса
  carRental: boolean;       // Аренда авто
}

export type TravelDestination = 'europe' | 'asia' | 'america' | 'africa' | 'worldwide';

export interface TravelData {
  destination: TravelDestination;
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
  isMultipleTrips: boolean;
  coverageOptions: TravelCoverageOptions;
}
