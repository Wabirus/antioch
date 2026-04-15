import { cn } from "@/lib/utils";

interface SiteSectionProps {
  id?: string;
  title: string;
  description?: string;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

export function SiteSection({
  id,
  title,
  description,
  className,
  contentClassName,
  children,
}: SiteSectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div className="container">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Antioch
          </p>
          <h2 className="text-balance text-3xl font-bold text-slate-950 md:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-pretty text-base leading-7 text-slate-600 md:text-lg">
              {description}
            </p>
          ) : null}
        </div>
        <div className={contentClassName}>{children}</div>
      </div>
    </section>
  );
}

