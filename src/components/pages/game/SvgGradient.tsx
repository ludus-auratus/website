export function SvgGradient({
  id,
  x1,
  y1,
  x2,
  y2,
  stops,
}: {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stops: {
    color: string;
    offset: string;
  }[];
}) {
  return (
    <svg className="" width={0} height={0}>
      <linearGradient id={id} x1={x1} y1={y1} x2={x2} y2={y2}>
        {stops.map((stop, index) => (
          <stop key={index} stopColor={stop.color} offset={stop.offset} />
        ))}
      </linearGradient>
    </svg>
  );
}
