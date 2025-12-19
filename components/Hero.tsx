import { Button } from "@/components/ui/button";

export default function Hero() {
    return (
        <section className="hero" id="home">
            <div className="container">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
                        A Sacred Community of Faith
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed opacity-95">
                        At Antioch Independent Baptist Churches of Kenya, we guide you on your spiritual journey through Christ's teachings and fellowship.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        {/* Primary CTA */}
                        <Button size="lg" className="text-base px-8 py-6 shadow-large hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5" asChild>
                            <a href="#about">Visit Us</a>
                        </Button>
                        {/* Secondary CTA */}
                        <Button
                            variant="outline"
                            size="lg"
                            className="text-base px-8 py-6 bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300 hover:-translate-y-0.5 shadow-medium"
                            asChild
                        >
                            <a href="#live">Watch Live</a>
                        </Button>
                        {/* Tertiary CTA */}
                        <Button
                            variant="ghost"
                            size="lg"
                            className="text-base px-8 py-6 text-white hover:bg-white/20 transition-smooth"
                            asChild
                        >
                            <a href="#contact">Get In Touch</a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
