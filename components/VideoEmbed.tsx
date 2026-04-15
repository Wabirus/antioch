"use client";

import { useEffect, useState } from "react";
import styles from "./VideoEmbed.module.css";

interface VideoEmbedProps {
  embedUrl: string;
  title?: string;
}

function VideoFrame({ embedUrl, title }: Required<VideoEmbedProps>) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasLoadError, setHasLoadError] = useState(false);

  useEffect(() => {
    if (!embedUrl || hasLoaded || hasLoadError) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setHasLoadError(true);
    }, 10000);

    return () => window.clearTimeout(timeout);
  }, [embedUrl, hasLoaded, hasLoadError]);

  if (hasLoadError) {
    return (
      <div className={styles.fallback} role="status" aria-live="polite">
        <p>Service is currently offline. Please check back during service hours.</p>
      </div>
    );
  }

  return (
    <div className="video-container">
      <iframe
        src={embedUrl}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => {
          setHasLoaded(true);
          setHasLoadError(false);
        }}
        onError={() => {
          setHasLoadError(true);
        }}
      />
    </div>
  );
}

export default function VideoEmbed({
  embedUrl,
  title = "Embedded video",
}: VideoEmbedProps) {
  const [isOffline, setIsOffline] = useState<boolean>(
    typeof navigator !== "undefined" ? !navigator.onLine : false
  );

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (!embedUrl || isOffline) {
    return (
      <div className={styles.fallback} role="status" aria-live="polite">
        <p>Service is currently offline. Please check back during service hours.</p>
      </div>
    );
  }

  return <VideoFrame key={embedUrl} embedUrl={embedUrl} title={title} />;
}
