import { Button } from "@/components/ui/button";

export default function Mission() {
    return (
        <section className="mission" id="about">
            <div className="container">
                <div className="section-title">
                    <h2>Our Mission</h2>
                    <p>Discover your purpose and commitment to serving God and community</p>
                </div>
                <div className="mission-content">
                    <div className="mission-text">
                        <h3 className="text-2xl md:text-3xl mb-4">Transforming Lives Through Christ's Love</h3>
                        <p className="text-base md:text-lg mb-4 leading-relaxed">
                            At Antioch Independent Baptist Churches of Kenya, we are dedicated to Bible-based teaching and generous outreach, transforming lives through Christ's love and service.
                        </p>
                        <p className="text-base md:text-lg mb-6 leading-relaxed">
                            We operate church gatherings, a church school, youth camps, outreach programs, and philanthropy initiatives that support vulnerable families and communities in Kenya.
                        </p>
                        <Button size="lg" className="shadow-medium hover:shadow-large transition-smooth" asChild>
                            <a href="#contact">Become a Member</a>
                        </Button>
                    </div>
                    <div className="mission-image">
                        <img src="https://source.unsplash.com/random/600x400/?community,kenya" alt="Church Community" />
                    </div>
                </div>
            </div>
        </section>
    );
}
