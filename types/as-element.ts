import { ComponentPropsWithoutRef, ElementType } from "react";

export type AsProps<T extends ElementType> = Omit<ComponentPropsWithoutRef<T>, "translate" | "className">;
