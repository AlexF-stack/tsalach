import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "TSALACH S.A. — Structuration, financement & infrastructures au Gabon";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b0b0b",
          color: "#fafaf8",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            height: 6,
            width: "100%",
            background: "#c69214",
            borderRadius: 999,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 4,
              fontWeight: 700,
              color: "#c69214",
              textTransform: "uppercase",
            }}
          >
            TSALACH S.A.
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 58,
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: -2,
              color: "#fafaf8",
            }}
          >
            Structure. Finance. Deliver.
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 26,
              color: "#b8b4a8",
              maxWidth: 820,
            }}
          >
            Structuration, financement & infrastructures — Libreville, Gabon
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 20,
            color: "#b8b4a8",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#c69214",
            }}
          />
          PPP · EPC · Real estate · Civil engineering
        </div>
      </div>
    ),
    { ...size },
  );
}
