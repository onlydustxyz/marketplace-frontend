import { useRouter } from "next/navigation";
import { ComponentType, FC, useEffect } from "react";
import { isInMaintenanceMode } from "utils/maintenance/maintenance";

import { NEXT_ROUTER } from "constants/router";

export const withMaintenanceEnabled = <P extends object>(Component: ComponentType<P>): FC<P> => {
  return function MaintenanceHoc(props: P) {
    const router = useRouter();
    const { inMaintenance } = isInMaintenanceMode();

    useEffect(() => {
      if (!inMaintenance) {
        router.push(NEXT_ROUTER.notFound);
      }
    }, [inMaintenance]);

    return inMaintenance ? <Component {...props} /> : <></>;
  };
};
