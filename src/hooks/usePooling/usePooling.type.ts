export interface UsePoolingFeedbackProps {
  isRefetching: boolean;
  isLoading: boolean;
  fetch: () => void;
  onForcePooling: () => void;
  ui: {
    label: string;
    customComponents?: React.ReactElement;
  };
}
export interface UsePoolingProps {
  delays: number;
  limites: number;
}

export interface UsePoolingReturn {
  refetchOnWindowFocus: () => boolean;
  refetchInterval: () => number;
  onRefetching: (isRefetching: boolean) => void;
  onForcePooling: () => void;
  count: number;
}

export type UsePoolingFeedbackReturn = React.ReactElement;
