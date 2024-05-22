import process from "process";

interface Props {
  login: string;
  title: string;
  image: string;
}
export function ContentUser({ login, title, image }: Props) {
  const isRemoteImage = (() => {
    if (process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX && image) {
      return !image?.includes(process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX);
    }

    return false;
  })();

  const optimizeSrc = (() => {
    if (isRemoteImage) {
      return `${process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX}format=png/${image}`;
    }

    return image;
  })();

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
        src={optimizeSrc}
        alt="user-image"
        width="108"
        height="108"
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
          gap: "24px",
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
      </div>
    </div>
  );
}
