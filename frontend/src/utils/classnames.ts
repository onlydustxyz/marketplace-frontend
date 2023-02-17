import classNames from "classnames";

export const onePxBorderPosition = classNames(
  "before:absolute before:content-['']", // https://medium.com/@jeandesravines/use-border-radius-and-outline-simultaneously-on-safari-14ce92889e1f
  "before:-top-px before:-left-px before:-right-px before:-bottom-px",
  "before:-z-10",
  "before:border"
);
