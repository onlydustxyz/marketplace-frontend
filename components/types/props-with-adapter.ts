import { ReactNode } from "react";

export type PropsWithAdapter<P> = P & { Adapter: (props: P) => ReactNode };
