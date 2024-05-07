export namespace TPosthogOnMount {
  interface BaseProps {
    eventName: string;
  }

  interface PropsWithoutParams extends BaseProps {
    params?: never;
    paramsReady?: never;
  }

  interface PropsWithParams extends BaseProps {
    params: Record<string, unknown>;
    paramsReady: boolean;
  }

  export type Props = PropsWithoutParams | PropsWithParams;
}
