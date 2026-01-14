import { PageHero } from "@/components/ui/PageHero";
import { getMinistries } from "@/app/actions/ministries";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User } from "lucide-react";

export const metadata = {
    title: "Ministries | Antioch Independent Baptist Churches of Kenya",
    description: "Find your place to belong and serve at Antioch. Explore our various ministries for all ages.",
};

export default async function MinistriesPage() {
    const result = await getMinistries();
    const ministries = result.success && result.data ? result.data : [];

    return (
        <div className="bg-gradient-to-b from-white to-slate-50/50 min-h-screen">
            {/* Hero Section */}
            <PageHero
                title="Ministries"
                description="There is a place for everyone at Antioch. Connect with others, grow in your faith, and serve the community."
                gradient="blue"
            />

            {/* Main Content */}
            <section className="py-20">
                <div className="container">
                    {ministries.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-xl border">
                            <h3 className="text-lg font-medium text-muted-foreground">No ministries found. Please check back later.</h3>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {ministries.map((ministry) => (
                                <Card key={ministry.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={ministry.image || "/placeholder.jpg"}
                                            alt={ministry.name}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                        <div className="absolute top-2 right-2">
                                            <span className="bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                                {ministry.category}
                                            </span>
                                        </div>
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="text-xl font-bold">{ministry.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground mb-4 h-20 overflow-hidden text-ellipsis">
                                            {ministry.description}
                                        </p>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-primary" />
                                                <span className="font-medium">Led by:</span> {ministry.leader}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-primary" />
                                                <span className="font-medium">Meets:</span> {ministry.meetingSchedule}
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full" variant="secondary">
                                            Get Involved
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-slate-50 border-t border-slate-100">
                <div className="container text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4 text-secondary">Don't see what you're looking for?</h2>
                    <p className="text-muted-foreground mb-8">
                        We are always starting new groups and initiatives. If you have a passion or idea for a new ministry, we'd love to hear from you.
                    </p>
                    <Button variant="outline" size="lg">contact Us</Button>
                </div>
            </section>
        </div>
    );
}
