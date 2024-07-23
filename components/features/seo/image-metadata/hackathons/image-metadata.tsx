import { HackathonInterface } from "core/domain/hackathon/models/hackathon-model";

import { OnlyDustLogo } from "components/features/seo/image-metadata/commons/onlydust-logo/onlydust-logo";
import { DateIcon } from "components/features/seo/image-metadata/hackathons/components/date-icon";
import { LocationIcon } from "components/features/seo/image-metadata/hackathons/components/location-icon";

export function HackathonImageMetadata({ hackathon }: { hackathon: HackathonInterface }) {
  const backgroundUrl = `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/hackathon-opengraph.jpg`;

  const { startDate, endDate, startTime } = hackathon.formatDates();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "black",
        color: "white",
        fontFamily: "Walsheim",
        zIndex: 1,
      }}
    >
      <img
        src={backgroundUrl}
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
          width: "70%",
          height: "66%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
          zIndex: 2,
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              margin: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <h1
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                  margin: "0",
                }}
              >
                Hackathon
              </h1>

              <h2
                style={{
                  fontSize: "42px",
                  fontFamily: "Belwe",
                  margin: "0",
                }}
              >
                {hackathon.title}
              </h2>
            </div>

            <OnlyDustLogo />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    borderRadius: "12px",
                    padding: "12px",
                    background: "#05051E",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <LocationIcon />
                </div>

                <span
                  style={{
                    fontWeight: "500",
                  }}
                >
                  {hackathon.location}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    borderRadius: "12px",
                    padding: "12px",
                    background: "#05051E",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <DateIcon />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    {startDate} - {endDate}
                  </span>

                  <span
                    style={{
                      fontSize: "14px",
                      color: "#CDCDDC",
                    }}
                  >
                    {startTime}
                  </span>
                </div>
              </div>
            </div>

            <div>Projects</div>

            {/*{projects?.length ? (*/}
            {/*  <AvatarGroup*/}
            {/*    avatars={projects.map(({ logoUrl }) => ({ src: logoUrl }))}*/}
            {/*    size="xl"*/}
            {/*    maxAvatars={4}*/}
            {/*    classNames={{ base: "hidden sm:flex" }}*/}
            {/*  />*/}
            {/*) : null}*/}
          </div>
        </div>
      </div>
    </div>
  );
}
