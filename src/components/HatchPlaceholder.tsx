type Props = {
  width: number;
  height: number;
  patternId: string;
  rotate: number;
  spacing: number;
  caption: string;
  containerWidth: number;
  containerHeight: number;
};

export default function HatchPlaceholder({
  width,
  height,
  patternId,
  rotate,
  spacing,
  caption,
  containerWidth,
  containerHeight,
}: Props) {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden border border-line-strong bg-card"
      style={{ width: containerWidth, height: containerHeight }}
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <pattern
            id={patternId}
            patternUnits="userSpaceOnUse"
            width={spacing}
            height={spacing}
            patternTransform={`rotate(${rotate})`}
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2={spacing}
              stroke="oklch(0.22 0.04 40)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width={width} height={height} fill={`url(#${patternId})`} />
        <text
          x={width / 2}
          y={height / 2}
          textAnchor="middle"
          fontFamily="monospace"
          fontSize="10"
          fill="oklch(0.35 0.03 60)"
          dominantBaseline="middle"
        >
          {caption}
        </text>
      </svg>
    </div>
  );
}
