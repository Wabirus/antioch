import { PageHero } from "@/components/ui/PageHero";
import { getStaffMembers } from "@/app/actions/staff";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Mail } from "lucide-react";

export const metadata = {
    title: "Leadership & Staff | Antioch Independent Baptist Churches of Kenya",
    description: "Meet the dedicated team serving at Antioch. We are here to serve you and help you grow in your faith.",
};

export default async function LeadershipPage() {
    const result = await getStaffMembers();
    const staff = result.success && result.data ? result.data : [];

    return (
        <div className="bg-gradient-to-b from-white to-slate-50/50 min-h-screen">
            {/* Hero Section */}
            <PageHero
                title="Our Team"
                description="Meet the dedicated pastors, directors, and staff who serve the Antioch community with love and integrity."
                gradient="blue"
            />

            {/* Main Content */}
            <section className="py-20">
                <div className="container">
                    {staff.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-xl border">
                            <h3 className="text-lg font-medium text-muted-foreground">No staff members found.</h3>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {staff.map((member) => (
                                <Card key={member.id} className="border-none shadow-soft hover:shadow-medium transition-all duration-300 bg-white">
                                    <div className="relative aspect-[4/5] overflow-hidden rounded-t-xl">
                                        {/* Grayscale to color on hover effect */}
                                        <img
                                            src={member.image || "/placeholder.jpg"}
                                            alt={member.name}
                                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                                        <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                                            <p className="text-sm font-semibold text-primary-foreground/80 uppercase tracking-widest mb-1">
                                                {member.position}
                                            </p>
                                            <h3 className="text-2xl font-bold">{member.name}</h3>
                                        </div>
                                    </div>
                                    <CardContent className="p-6 pt-8 relative">
                                        {/* Decorative quote element */}
                                        <div className="absolute -top-6 right-6 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                                            <Mail className="w-5 h-5 text-white" />
                                        </div>

                                        <p className="text-muted-foreground leading-relaxed mb-6">
                                            {member.bio}
                                        </p>

                                        {member.email && (
                                            <a
                                                href={`mailto:${member.email}`}
                                                className="inline-flex items-center gap-2 text-primary font-medium hover:text-secondary transition-colors"
                                            >
                                                {member.email}
                                            </a>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Join the Team CTA */}
            <section className="py-20 bg-primary/5">
                <div className="container text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6">Called to Serve?</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        We are always looking for passionate individuals to join our team, whether as volunteers or staff.
                        If you feel called to serve at Antioch, we'd love to connect with you.
                    </p>
                    {/* Fallback using native button style since typical button component might want variants */}
                    <a
                        href="/#contact"
                        className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                        Contact Us
                    </a>
                </div>
            </section>
        </div>
    );
}
