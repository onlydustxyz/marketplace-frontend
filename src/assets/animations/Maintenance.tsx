import Lottie from "react-lottie";
import animationData from "./animation.json";

export default function MaintenanceAnimation() {
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      }}
    />
  );
}
