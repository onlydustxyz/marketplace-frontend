import { tv } from "tailwind-variants";

export const flexVariants = tv({
  base: "flex",
  variants: {
    direction: {
      row: "flex-row",
      "row-reverse": "flex-row-reverse",
      col: "flex-col",
      "col-reverse": "flex-col-reverse",
    },
    wrap: {
      wrap: "flex-wrap",
      "wrap-reverse": "flex-wrap-reverse",
      nowrap: "flex-nowrap",
    },
    justifyContent: {
      normal: "justify-normal",
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
      stretch: "justify-stretch",
    },
    alignContent: {
      normal: "content-normal",
      center: "content-center",
      start: "content-start",
      end: "content-end",
      between: "content-between",
      around: "content-around",
      evenly: "content-evenly",
      baseline: "content-baseline",
      stretch: "content-stretch",
    },
    alignItems: {
      start: "items-start",
      end: "items-end",
      center: "items-center",
      baseline: "items-baseline",
      stretch: "items-stretch",
    },
    width: {
      full: "w-full",
      fit: "w-fit",
    },
  },
});
