import { ReactNode } from "react";

interface Props {
  name: string;
  image: string;
  icon: ReactNode;
  label: string;
}
export function ContentHighlight({ name, image, label, icon }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: "20px",
        background: "#FFFFFF0D",
        border: "2px solid #F3F0EE33",
        borderRadius: 16,
        padding: 24,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        {icon}
        <p
          style={{
            fontSize: "30px",
            fontFamily: "Walsheim",
            color: "#F3F0EE",
            margin: 0,
          }}
        >
          {label}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        {image ? (
          <img
            src={image}
            alt="highlight-image"
            width="40"
            height="40"
            style={{
              objectFit: "contain",
            }}
          />
        ) : null}
        <p
          style={{
            fontSize: "32px",
            fontFamily: "Walsheim",
            color: "#F3F0EE",
            margin: 0,
          }}
        >
          {name}
        </p>
      </div>
    </div>
  );
}
