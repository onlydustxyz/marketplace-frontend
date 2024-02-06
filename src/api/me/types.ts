export namespace MeTypes {
  export enum billingProfileType {
    Company = "COMPANY",
    Individual = "INDIVIDUAL",
  }

  export type billingProfileUnion = `${billingProfileType}`;
}
