import type { ClaimData } from '../../sub-forms/claim/type';

export interface HistoryStep {
  hasPreviousInsurance: boolean;
  previousInsurer: string;
  previousPolicyNumber: string;
  previousPolicyEndDate: string;
  hasClaimsHistory: boolean;
  claims: ClaimData[];
  promoCode: string;
  referralSource: string;
  agentCode: string;
  additionalNotes: string;
}
