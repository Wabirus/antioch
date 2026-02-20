const YOUTUBE_EMBED_URL =
  process.env.YOUTUBE_EMBED_URL ||
  process.env.NEXT_PUBLIC_YOUTUBE_EMBED_URL ||
  "https://www.youtube.com/embed/live_stream?channel=UC-lHJZR3Gqxm24_Vd_AJ5Yw";

const SERVICE_NAME =
  process.env.SERVICE_NAME ||
  process.env.NEXT_PUBLIC_SERVICE_NAME ||
  "Sunday Worship Service";

const SERVICE_DAY =
  process.env.SERVICE_DAY ||
  process.env.NEXT_PUBLIC_SERVICE_DAY ||
  "Sunday";

const SERVICE_TIME =
  process.env.SERVICE_TIME ||
  process.env.NEXT_PUBLIC_SERVICE_TIME ||
  "10:00 AM";

export { YOUTUBE_EMBED_URL, SERVICE_NAME, SERVICE_DAY, SERVICE_TIME };

