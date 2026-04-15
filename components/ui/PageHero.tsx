import { cn } from "@/lib/utils";

interface PageHeroProps {
    title: string;
    description?: string;
    children?: React.ReactNode;
    className?: string;
    gradient?: "blue" | "gold" | "default";
}

export function PageHero({
    title,
    description,
    children,
    className,
    gradient = "default"
}: PageHeroProps) {

    const gradients = {
        default: "from-primary/90 to-secondary/90",
        blue: "from-primary/90 to-secondary/90",
        gold: "from-accent/90 to-primary/90",
    };

    return (
        <section className={cn(
            "relative mt-20 overflow-hidden py-24 text-white",
            "bg-gradient-to-r",
            gradients[gradient],
            className
        )}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),_transparent_45%)]" />
            <div className="container relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white animate-fade-in-up">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-xl md:text-2xl mb-8 opacity-95 leading-relaxed animate-fade-in-up delay-100">
                            {description}
                        </p>
                    )}
                    {children && (
                        <div className="animate-fade-in-up delay-200">
                            {children}
                        </div>
                    )}
                </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/10 to-transparent" />
        </section>
    );
}
