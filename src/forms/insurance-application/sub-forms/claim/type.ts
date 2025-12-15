export type ClaimType = 'accident' | 'theft' | 'damage' | 'fire' | 'flood' | 'other';

export interface ClaimData {
  date: string;
  claimType: ClaimType;
  description: string;
  amount: number | undefined;
  wasCompensated: boolean;
  compensationAmount: number | undefined;
}
