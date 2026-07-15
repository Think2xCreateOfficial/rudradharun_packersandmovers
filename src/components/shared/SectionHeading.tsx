import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h2" | "h3";
  eyebrowClassName?: string;
  titleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  as: Component = "h2",
  eyebrowClassName,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center"
          ? "items-center text-center mx-auto"
          : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-xs font-bold uppercase tracking-widest text-brand-blue",
            eyebrowClassName
          )}
        >
          {eyebrow}
        </p>
      )}
      <Component
        className={cn(
          "text-3xl sm:text-4xl font-extrabold font-serif text-gray-900 tracking-tight",
          titleClassName
        )}
      >
        {title}
      </Component>
      {subtitle && (
        <p className="text-gray-600 max-w-2xl text-base sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
