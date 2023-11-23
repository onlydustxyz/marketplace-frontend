import { useMemo, useRef, useState } from "react";
import {
  UsePoolingFeedbackProps,
  UsePoolingFeedbackReturn,
  UsePoolingProps,
  UsePoolingReturn,
} from "./usePooling.type";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import SyncLine from "src/icons/SyncLine";
import { cn } from "src/utils/cn";

export const usePooling = ({ limites, delays }: UsePoolingProps): UsePoolingReturn => {
  const poolingCount = useRef(0);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const refetchOnWindowFocus = () => {
    poolingCount.current = 0;
    setShouldRefetch(true);
    return true;
  };

  const refetchInterval = () => {
    if (poolingCount.current < limites || shouldRefetch) {
      setShouldRefetch(false);
      return delays;
    }
    return 0;
  };

  return {
    refetchOnWindowFocus,
    refetchInterval,
    count: poolingCount.current,
    onRefetching: (isRefetching: boolean) => {
      if (isRefetching) {
        poolingCount.current = poolingCount.current + 1;
      }
    },
    onForcePooling: () => {
      poolingCount.current = limites;
    },
  };
};

export const usePoolingFeedback = ({
  isRefetching,
  isLoading,
  onForcePooling,
  fetch,
  ui,
}: UsePoolingFeedbackProps): UsePoolingFeedbackReturn => {
  const onTriggerRefecth = () => {
    if (!isLoading && !isRefetching) {
      onForcePooling();
      fetch();
    }
  };
  const Ui = useMemo(() => {
    if (ui.customComponents) {
      return ui.customComponents;
    }

    return (
      <Button
        type={ButtonType.Ternary}
        size={ButtonSize.Sm}
        className={cn(isRefetching || isLoading ? "text-spacePurple-300" : "")}
        onClick={onTriggerRefecth}
      >
        <SyncLine className={cn(isRefetching || isLoading ? "animate-spin text-spacePurple-300" : "")} />
        {ui.label}
      </Button>
    );
  }, [isRefetching, isLoading, fetch]);

  return Ui;
};
