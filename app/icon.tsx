import IconMap from "@central-icons-react/round-filled-radius-3-stroke-2/IconMap"
import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

/** Favicon — IconMap with hero greens: #34C759 tint, #248A3D glyph for contrast. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(52, 199, 89, 0.22)",
          borderRadius: 9999,
        }}
      >
        <IconMap size={20} color="rgb(36, 138, 61)" ariaHidden />
      </div>
    ),
    { ...size },
  )
}
