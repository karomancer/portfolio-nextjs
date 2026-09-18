import { GOLD_TEXTURE_SIZE } from "./constants";
const goldTexture = "/optimized/portfolio/materia-magica/clock/gold-texture.png";

/**
 * Hidden SVG containing pattern, clipPath, and filter definitions
 * used by the LunarClock component via CSS references.
 *
 * Includes: slider knob shape, metal textures, etc.
 * See usage in LunarClock.module.css and index.tsx
 */

interface SvgDefsProps {
  currentDataIndex: number;
  sliderDataLength: number;
}

const SvgDefs = ({ currentDataIndex, sliderDataLength }: SvgDefsProps) => {
  // Calculate rotation for the knob clip path based on slider position
  const clipRotation = (currentDataIndex / (sliderDataLength - 1)) * 360;

  return (
    <svg width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        {/* Gold texture pattern for progress bar and knob */}
        <pattern
          id="gold-texture-pattern"
          patternUnits="userSpaceOnUse"
          width={GOLD_TEXTURE_SIZE}
          height={GOLD_TEXTURE_SIZE}
        >
          <image
            href={goldTexture}
            width={GOLD_TEXTURE_SIZE}
            height={GOLD_TEXTURE_SIZE}
          />
        </pattern>
        {/* Blue texture pattern for track (base color + texture overlay) */}
        <pattern
          id="blue-texture-pattern"
          patternUnits="userSpaceOnUse"
          width={GOLD_TEXTURE_SIZE}
          height={GOLD_TEXTURE_SIZE}
        >
          <rect
            width={GOLD_TEXTURE_SIZE}
            height={GOLD_TEXTURE_SIZE}
            fill="#0f193d"
          />
          <image
            href={goldTexture}
            width={GOLD_TEXTURE_SIZE}
            height={GOLD_TEXTURE_SIZE}
            style={{ mixBlendMode: "overlay" }}
          />
        </pattern>
        {/* Clipping mask for knob shape - rotates with slider position */}
        {/* Triangle pointing outward, with top edge extended past bounding box */}
        <clipPath id="knob-clip" clipPathUnits="objectBoundingBox">
          <polygon
            points="0.5,1 0,-0.15 1,-0.15"
            transform={`rotate(${clipRotation} 0.5 0.5)`}
          />
        </clipPath>
        {/* Clipping mask for stopwatch crown button */}
        <clipPath id="crown-clip" clipPathUnits="objectBoundingBox">
          <path
            transform="scale(0.00746, 0.00690)"
            d="M133.8,70.24l-1.63-18.73C129.63,22.37,105.22,0,75.96,0h-17.96C28.74,0,4.34,22.37,1.79,51.52L.16,70.24c-1.91,21.88,13.72,40.94,34.79,44.01v30.41h64.07v-30.41c21.06-3.07,36.7-22.13,34.79-44.01Z"
          />
        </clipPath>
        {/* Clipping mask for parchment info panel shape */}
        <clipPath id="parchment-clip" clipPathUnits="objectBoundingBox">
          <path
            transform="scale(0.001488, 0.004115)"
            d="M11.94,131.15C19.05,58.3,0,0,0,0h41.18l15.06,18.43L72.05,0h15.08l8.84,10.61L106.08.56s398.76,34.81,486.02,11.4l13.72,9.12,13.72-9.12,49.25-11.96-.42,22.68-7.45,38.24-14.14,3.68,13.15,12.43-1.03,16.09-13.47,11.04,12.43,19.78,11.69,119.9-51.86-1.12-13.47-19.92-5.39,19.92-30.82,4.23-13.63-6.14-10.78,6.14c-328.48-35.59-539.14,0-539.14,0,.38-7.47.91-18.91,1.41-31.3,1.14-28.22,3.32-56.39,6.06-84.5Z"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SvgDefs;
