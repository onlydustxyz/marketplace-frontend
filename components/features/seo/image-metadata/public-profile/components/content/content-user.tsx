import { bootstrap } from "core/bootstrap";
import { getOrdinalSuffix } from "utils/profile/ordinal-position-suffix";

interface Props {
  login: string;
  title: string;
  image: string;
  rank: number;
  rankPercentile: number;
}
export function ContentUser({ login, title, image, rank, rankPercentile }: Props) {
  const imageHelper = bootstrap.getImageHelperPort();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "20px",
      }}
    >
      <img
        src={imageHelper.optimizeSrc(image, { format: "png" })}
        alt="user-image"
        width="196"
        height="196"
        style={{
          objectFit: "cover",
          border: "6px solid #232338",
          borderRadius: 100,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: "20px",
        }}
      >
        <div
          style={{
            fontSize: "48px",
            fontFamily: "Belwe",
            color: "#F3F0EE",
          }}
        >
          {login.slice(0, 20)}
        </div>
        <div
          style={{
            fontSize: "36px",
            fontFamily: "Walsheim",
            color: "#F3F0EE",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "36px",
            fontFamily: "Walsheim",
            color: "#F3F0EE",
            padding: "12px 24px",
            borderRadius: 100,
            display: "flex",
            alignItems: "center",
            border: "2px solid #F3F0EE33",
            backgroundColor: "#FFFFFF0D",
          }}
        >
          {getOrdinalSuffix(rank)} • Top {rankPercentile}%
        </div>
      </div>
    </div>
  );
}
