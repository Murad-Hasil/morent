import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FEATURES = ["Easy Booking", "Safe & Reliable", "Low Price", "Wide Selection"];

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0d1321",
          display: "flex",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Blue glow — left */}
        <div
          style={{
            position: "absolute",
            left: -80,
            top: -60,
            width: 500,
            height: 500,
            background: "radial-gradient(circle, rgba(53,99,233,0.25) 0%, transparent 65%)",
            borderRadius: "50%",
            display: "flex",
          }}
        />

        {/* Blue glow — right */}
        <div
          style={{
            position: "absolute",
            right: -40,
            bottom: -80,
            width: 420,
            height: 420,
            background: "radial-gradient(circle, rgba(28,63,168,0.2) 0%, transparent 65%)",
            borderRadius: "50%",
            display: "flex",
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #1C3FA8, #3563E9, #54A6D4)",
            display: "flex",
          }}
        />

        {/* ── LEFT CONTENT ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 0 0 80px",
            width: 680,
            height: 630,
            position: "relative",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 36,
            }}
          >
            {/* M icon */}
            <div
              style={{
                width: 48,
                height: 48,
                background: "#3563E9",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                fontWeight: 900,
                color: "#ffffff",
              }}
            >
              M
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: "#3563E9",
                letterSpacing: 3,
              }}
            >
              MORENT
            </div>
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: 62,
              fontWeight: 800,
              color: "#f1f5f9",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            The Best Platform
          </div>
          <div
            style={{
              fontSize: 62,
              fontWeight: 800,
              color: "#3563E9",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: 24,
              display: "flex",
            }}
          >
            for Car Rental
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 20,
              color: "#94a3b8",
              marginBottom: 40,
              letterSpacing: "0.02em",
              display: "flex",
            }}
          >
            Ease of doing a car rental safely and reliably at a low price.
          </div>

          {/* Feature badges */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {FEATURES.map((f) => (
              <div
                key={f}
                style={{
                  padding: "7px 16px",
                  background: "rgba(53,99,233,0.12)",
                  border: "1px solid rgba(53,99,233,0.35)",
                  borderRadius: 20,
                  color: "#93b4f9",
                  fontSize: 14,
                  fontWeight: 600,
                  display: "flex",
                }}
              >
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: CAR VISUAL ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            position: "relative",
          }}
        >
          {/* Outer ring */}
          <div
            style={{
              position: "absolute",
              width: 380,
              height: 380,
              border: "1px solid rgba(53,99,233,0.1)",
              borderRadius: "50%",
              display: "flex",
            }}
          />
          {/* Middle ring */}
          <div
            style={{
              position: "absolute",
              width: 270,
              height: 270,
              border: "1px solid rgba(53,99,233,0.16)",
              borderRadius: "50%",
              display: "flex",
            }}
          />
          {/* Inner ring */}
          <div
            style={{
              position: "absolute",
              width: 170,
              height: 170,
              border: "1px solid rgba(53,99,233,0.25)",
              borderRadius: "50%",
              display: "flex",
            }}
          />

          {/* Car SVG silhouette */}
          <svg
            width="280"
            height="140"
            viewBox="0 0 280 140"
            style={{ position: "relative" }}
          >
            {/* Car body */}
            <rect x="20" y="65" width="240" height="50" rx="10" fill="#3563E9" />
            {/* Car roof / cabin */}
            <path d="M60 65 L80 30 L200 30 L220 65 Z" fill="#2a52c9" />
            {/* Windshield */}
            <path d="M90 60 L105 38 L175 38 L190 60 Z" fill="rgba(147,180,249,0.3)" />
            {/* Left wheel */}
            <circle cx="75" cy="118" r="22" fill="#0d1321" stroke="#3563E9" strokeWidth="5" />
            <circle cx="75" cy="118" r="10" fill="#1e293b" />
            {/* Right wheel */}
            <circle cx="205" cy="118" r="22" fill="#0d1321" stroke="#3563E9" strokeWidth="5" />
            <circle cx="205" cy="118" r="10" fill="#1e293b" />
            {/* Headlight */}
            <rect x="245" y="75" width="14" height="8" rx="3" fill="#fbbf24" />
            {/* Taillight */}
            <rect x="21" y="75" width="14" height="8" rx="3" fill="#ef4444" />
            {/* Door line */}
            <line x1="140" y1="68" x2="140" y2="112" stroke="rgba(147,180,249,0.25)" strokeWidth="2" />
            {/* Door handle 1 */}
            <rect x="108" y="87" width="18" height="5" rx="2.5" fill="rgba(147,180,249,0.4)" />
            {/* Door handle 2 */}
            <rect x="154" y="87" width="18" height="5" rx="2.5" fill="rgba(147,180,249,0.4)" />
            {/* Speed lines */}
            <line x1="0" y1="80" x2="18" y2="80" stroke="rgba(53,99,233,0.5)" strokeWidth="2" />
            <line x1="0" y1="90" x2="12" y2="90" stroke="rgba(53,99,233,0.3)" strokeWidth="1.5" />
            <line x1="0" y1="100" x2="16" y2="100" stroke="rgba(53,99,233,0.4)" strokeWidth="1" />
          </svg>

          {/* Floating stat cards */}
          <div
            style={{
              position: "absolute",
              top: 55,
              right: 18,
              padding: "8px 14px",
              background: "rgba(53,99,233,0.15)",
              border: "1px solid rgba(53,99,233,0.3)",
              borderRadius: 10,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <div style={{ fontSize: 11, color: "#64748b", display: "flex" }}>Available Cars</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9", display: "flex" }}>12+</div>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 62,
              right: 22,
              padding: "8px 14px",
              background: "rgba(53,99,233,0.15)",
              border: "1px solid rgba(53,99,233,0.3)",
              borderRadius: 10,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <div style={{ fontSize: 11, color: "#64748b", display: "flex" }}>Starting From</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#3563E9", display: "flex" }}>$29/day</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
