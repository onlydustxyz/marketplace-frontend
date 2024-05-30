import { PropsWithChildren } from "react";

export function Wrapper({ children }: PropsWithChildren) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "black",
        zIndex: 1,
      }}
    >
      <img
        alt="background"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 2,
          padding: 72,
        }}
      >
        {children}
      </div>
    </div>
  );
}
