export namespace MeTypes {
  export enum billingProfileType {
    Company = "COMPANY",
    Individual = "INDIVIDUAL",
    SelfEmployed = "SELF_EMPLOYED",
  }

  export type billingProfileUnion = `${billingProfileType}`;
}
