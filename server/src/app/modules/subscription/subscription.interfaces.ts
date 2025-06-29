export interface IStripe {
  packageName: "essential" | "premium" | "advance";
  subscriptionFor: "monthly" | "yearly";
}

export interface ISuccess {
  package: "essential" | "premium" | "advance";
  amount: string;
  billingPeriod: string;
  transactionId: string;
}
