import styles from "./LiveStreamPlayer.module.css";

interface LiveStreamPlayerProps {
  embedUrl?: string | null;
}

function toYouTubeEmbedUrl(rawUrl?: string | null): string | null {
  if (!rawUrl) {
    return null;
  }

  try {
    const parsed = new URL(rawUrl);
    const host = parsed.hostname.replace("www.", "");

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.toString();
      }

      const videoId = parsed.searchParams.get("v");
      if (parsed.pathname === "/watch" && videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      if (parsed.pathname.startsWith("/live/")) {
        const liveId = parsed.pathname.split("/")[2];
        if (liveId) {
          return `https://www.youtube.com/embed/${liveId}`;
        }
      }
    }

    if (host === "youtu.be") {
      const videoId = parsed.pathname.replace("/", "");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
  } catch {
    return null;
  }

  return null;
}

export default function LiveStreamPlayer({ embedUrl }: LiveStreamPlayerProps) {
  const safeEmbedUrl = toYouTubeEmbedUrl(embedUrl);

  if (!safeEmbedUrl) {
    return (
      <div className={styles.fallback}>
        <h2>No live stream is available right now.</h2>
        <p>Please check back during our scheduled service time.</p>
      </div>
    );
  }

  return (
    <div className={styles.playerShell}>
      <div className={styles.videoWrap}>
        <iframe
          src={safeEmbedUrl}
          title="YouTube live stream"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}
