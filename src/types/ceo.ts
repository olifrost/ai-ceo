export interface CEO {
  id: string;
  name: string;
  company: string;
  industry: string;
  votes: number;
  approved: boolean;
  submittedAt: Date;
}

export interface CEOSubmission {
  name: string;
  company: string;
  votes: number;
  approved: boolean;
  submittedAt: Date;
}
