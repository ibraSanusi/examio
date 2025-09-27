export default function Noise() {
  return (
    <svg
      className="pointer-events-none absolute top-0 left-0 z-50 block h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <filter id="noise" x="0" y="0">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feBlend mode="screen" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" opacity="0.5" />
    </svg>
  )
}
