import { SvgGradient } from "./SvgGradient";

export function GradientIcon({
  gradientId,
  gradient,
  children,
}: {
  gradientId: string;
  gradient: { x1: number; y1: number; x2: number; y2: number; stops: { color: string; offset: string }[] };
  children: React.ReactNode;
}) {
  return (
    <div style={{ stroke: `url(#${gradientId})` }}>
      <SvgGradient
        id={gradientId}
        x1={gradient.x1}
        y1={gradient.y1}
        x2={gradient.x2}
        y2={gradient.y2}
        stops={gradient.stops}
      />
      {children}
    </div>
  );
}
