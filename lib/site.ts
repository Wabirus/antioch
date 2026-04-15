export const siteConfig = {
  name: "Antioch Independent Baptist Churches of Kenya",
  shortName: "Antioch Baptist",
  description:
    "A Christ-centered church community in Kenya focused on Bible teaching, discipleship, prayer, and compassionate outreach.",
  location: "Karatina, Kenya",
  email: "info@antiochbaptist.ke",
  phone: "+254 700 000 000",
  livestreamPath: "/live",
  serviceTimes: [
    {
      name: "Sunday Worship",
      time: "10:00 AM",
      detail: "Corporate worship, prayer, and Bible preaching.",
    },
    {
      name: "Midweek Prayer",
      time: "4:30 PM",
      detail: "A focused evening for prayer and Scripture study.",
    },
    {
      name: "Children Ministry",
      time: "9:00 AM",
      detail: "Age-appropriate discipleship for children and families.",
    },
  ],
  nav: {
    main: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      {
        label: "Ministries",
        href: "/ministries",
        children: [
          { label: "All Ministries", href: "/ministries" },
          { label: "Youth", href: "/ministries/youth" },
          { label: "Worship", href: "/ministries/worship" },
        ],
      },
      { label: "Sermons", href: "/sermons" },
      { label: "Events", href: "/events" },
      { label: "Live", href: "/live" },
      { label: "Contact", href: "/contact" },
    ],
    actions: [
      { label: "Plan a Visit", href: "/new-here" },
      { label: "Prayer", href: "/prayer" },
      { label: "Give", href: "/give", variant: "cta" },
    ],
  },
  primaryNav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/ministries", label: "Ministries" },
    { href: "/sermons", label: "Sermons" },
    { href: "/events", label: "Events" },
    { href: "/live", label: "Live" },
    { href: "/contact", label: "Contact" },
  ],
  secondaryNav: [
    { href: "/new-here", label: "Plan a Visit" },
    { href: "/prayer", label: "Prayer" },
    { href: "/give", label: "Give" },
  ],
};
