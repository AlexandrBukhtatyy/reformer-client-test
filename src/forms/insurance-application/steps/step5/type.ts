export interface Step5Form {
  hasPreviousInsurance: boolean;
  previousInsurer: string;
  previousPolicyNumber: string;
  previousPolicyEndDate: string; // date string
  hadClaims: boolean;
  claims?: Array<{
    date: string; // date string
    type: 'accident' | 'theft' | 'damage' | 'disaster' | 'medical' | 'other';
    description: string;
    amount: number | undefined;
    atFault: boolean;
  }>;
  promoCode: string;
  referralSource: 'internet' | 'friends' | 'tv' | 'agent' | 'other';
  agentCode: string;
  additionalNotes: string;
}