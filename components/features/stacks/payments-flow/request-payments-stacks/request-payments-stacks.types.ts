export namespace TRequestPaymentsStacks {
  export interface onNextViewProps {
    to: Views | "close";
  }
  export enum Views {
    Select = "SELECT",
    Generate = "GENERATE",
    Upload = "UPLOAD",
    Mandate = "MANDATE",
  }
}
