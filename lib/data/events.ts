export interface Event {
    id: string;
    title: string;
    date: string;
    time?: string;
    img: string;
    desc: string;
    action: string;
    location?: string;
    category?: string;
    month?: string;
}

export const events: Event[] = [
    {
        id: "1",
        title: "Family Fun Day",
        date: "March 15, 2025",
        time: "10:00 AM - 4:00 PM",
        img: "https://images.unsplash.com/photo-1609234656388-0aa3635261d3?auto=format&fit=crop&q=80&w=1000",
        desc: "Join us for a day filled with fun activities, games, and fellowship. Bring your family and enjoy a wonderful time together!",
        action: "Details",
        category: "Family",
        month: "March",
        location: "Church Grounds"
    },
    {
        id: "2",
        title: "Worship Night",
        date: "March 28, 2025",
        time: "7:00 PM - 9:00 PM",
        img: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&q=80&w=1000",
        desc: "An evening of extended praise and worship. Come expecting to encounter God's presence in an atmosphere of prayer and music.",
        action: "Join Us",
        category: "Worship",
        month: "March",
        location: "Main Sanctuary"
    },
    {
        id: "3",
        title: "Youth Camp 2025",
        date: "April 10-14, 2025",
        time: "All Day",
        img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1000",
        desc: "Sign up for our annual youth camp where young hearts can grow in faith and friendship through engaging activities and teachings.",
        action: "Sign Up",
        category: "Youth",
        month: "April",
        location: "Camp Retreat Center"
    },
    {
        id: "4",
        title: "Good Friday Service",
        date: "April 18, 2025",
        time: "6:30 PM - 8:00 PM",
        img: "https://images.unsplash.com/photo-1552981452-c9cbb31e8d9e?auto=format&fit=crop&q=80&w=1000",
        desc: "Commemorate the crucifixion of Christ with special music, Scripture readings, and powerful messages of redemption.",
        action: "Register",
        category: "Holiday",
        month: "April",
        location: "Main Sanctuary"
    },
    {
        id: "5",
        title: "Community Outreach Day",
        date: "May 3, 2025",
        time: "8:00 AM - 12:00 PM",
        img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
        desc: "Help us serve our community through various volunteer opportunities. Make a real difference in people's lives today.",
        action: "Volunteer",
        category: "Community",
        month: "May",
        location: "Downtown Area"
    },
    {
        id: "6",
        title: "Marriage Enrichment Seminar",
        date: "May 17-18, 2025",
        time: "9:00 AM - 5:00 PM",
        img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000",
        desc: "Strengthen your marriage with biblical principles and practical tools. Bring your spouse for a transformative weekend retreat.",
        action: "Reserve",
        category: "Marriage",
        month: "May",
        location: "Conference Hall"
    },
    {
        id: "7",
        title: "Missionary Conference",
        date: "June 7-9, 2025",
        time: "7:00 PM - 9:00 PM",
        img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
        desc: "Hear inspiring testimonies from missionaries around the world. Discover how you can be part of global ministry.",
        action: "Learn More",
        category: "Missions",
        month: "June",
        location: "Main Sanctuary"
    },
    {
        id: "8",
        title: "Summer Kids Camp",
        date: "June 23-27, 2025",
        time: "9:00 AM - 3:00 PM",
        img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
        desc: "A week of fun, learning, and spiritual growth for children ages 5-12. Games, crafts, music, and Bible stories await!",
        action: "Enroll",
        category: "Kids",
        month: "June",
        location: "Fellowship Hall"
    }
];

export function getAllEvents(): Event[] {
    return events;
}

export function getUpcomingEvents(limit: number = 3): Event[] {
    return events.slice(0, limit);
}
