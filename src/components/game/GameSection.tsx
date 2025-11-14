import { cva, VariantProps } from "class-variance-authority";

const variants = cva(" flex flex-col gap-y-4 overflow-clip rounded-md", {
  variants: {
    bordered: {
      onlyX: "border-x-1 border-ludus-lime-500",
    },
    padding: {
      default: "p-4",
      none: "p-0",
    },
    background: {
      default: "bg-ludus-moss-700 shadow-lg shadow-black/30",
      mobileOnly: "bg-ludus-moss-700 md:bg-transparent md:shadow-none",
    },
  },
  defaultVariants: {
    background: "default",
    padding: "default",
  },
});

export type GameSectionProps = VariantProps<typeof variants> & {
  children: React.ReactNode;
};

export default function GameSection(props: GameSectionProps) {
  const { children } = props;
  return <div className={variants(props)}>{children}</div>;
}
