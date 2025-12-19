'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Church, Users, Baby } from "lucide-react";

export default function Services() {
    return (
        <section className="services" id="ministries">
            <div className="container">
                <div className="section-title">
                    <h2>Service Times</h2>
                    <p>We invite you to join us for our worship services and gatherings throughout the week</p>
                </div>
                <div className="services-grid">
                    <Card className="service-card group">
                        <CardContent className="p-8">
                            <div className="service-icon-wrapper">
                                <Church className="w-12 h-12 text-primary mb-6" strokeWidth={1.5} />
                            </div>
                            <h3 className="mb-3">Sunday Worship</h3>
                            <p className="mb-4 text-muted-foreground leading-relaxed">
                                Join us every Sunday at 10:00 AM for a powerful worship experience filled with praise and biblical teachings.
                            </p>
                            <Button variant="outline" className="w-full hover:bg-primary hover:text-white transition-smooth" asChild>
                                <a href="#" onClick={(e) => e.preventDefault()}>Join Us</a>
                            </Button>
                        </CardContent>
                    </Card>
                    <Card className="service-card group">
                        <CardContent className="p-8">
                            <div className="service-icon-wrapper">
                                <Users className="w-12 h-12 text-primary mb-6" strokeWidth={1.5} />
                            </div>
                            <h3 className="mb-3">Midweek Service</h3>
                            <p className="mb-4 text-muted-foreground leading-relaxed">
                                Our midweek service takes place every Wednesday at 4:30 PM, offering a time of prayer and in-depth Bible study.
                            </p>
                            <Button variant="outline" className="w-full hover:bg-primary hover:text-white transition-smooth" asChild>
                                <a href="#" onClick={(e) => e.preventDefault()}>Learn More</a>
                            </Button>
                        </CardContent>
                    </Card>
                    <Card className="service-card group">
                        <CardContent className="p-8">
                            <div className="service-icon-wrapper">
                                <Baby className="w-12 h-12 text-primary mb-6" strokeWidth={1.5} />
                            </div>
                            <h3 className="mb-3">Children's Ministry</h3>
                            <p className="mb-4 text-muted-foreground leading-relaxed">
                                Every Sunday at 9:00 AM, our Children's Ministry provides a safe and fun environment for kids to learn about Jesus.
                            </p>
                            <Button variant="outline" className="w-full hover:bg-primary hover:text-white transition-smooth" asChild>
                                <a href="#" onClick={(e) => e.preventDefault()}>Discover More</a>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
