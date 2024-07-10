export namespace TAmountCounter {
  export interface Props {
    limit?: number | null;
    isOverLimit?: boolean;
    total: number;
    isCompany?: boolean;
  }
}
