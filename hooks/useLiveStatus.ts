"use client";

import { useEffect, useMemo, useState } from "react";

interface UseLiveStatusOptions {
  apiKey?: string;
  channelId?: string;
  pollIntervalMs?: number;
}

interface UseLiveStatusResult {
  isLive: boolean;
  isOffline: boolean;
}

export function useLiveStatus(
  options: UseLiveStatusOptions = {}
): UseLiveStatusResult {
  const [isOffline, setIsOffline] = useState<boolean>(
    typeof navigator !== "undefined" ? !navigator.onLine : false
  );
  const [isLive, setIsLive] = useState(true);

  const apiKey = useMemo(
    () => options.apiKey ?? process.env.NEXT_PUBLIC_YOUTUBE_API_KEY ?? "",
    [options.apiKey]
  );
  const channelId = useMemo(
    () => options.channelId ?? process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID ?? "",
    [options.channelId]
  );
  const pollIntervalMs = options.pollIntervalMs ?? 60_000;

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

  useEffect(() => {
    // If no API key (or missing channel id), always show player.
    if (!apiKey || !channelId) {
      setIsLive(true);
      return;
    }

    let cancelled = false;

    const checkLiveStatus = async () => {
      if (isOffline) {
        return;
      }

      try {
        const params = new URLSearchParams({
          part: "id",
          channelId,
          eventType: "live",
          type: "video",
          maxResults: "1",
          key: apiKey,
        });

        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch YouTube live status");
        }

        const data = (await response.json()) as { items?: unknown[] };
        if (!cancelled) {
          setIsLive((data.items?.length ?? 0) > 0);
        }
      } catch {
        // On API failures, keep player visible rather than hard-failing the stream view.
        if (!cancelled) {
          setIsLive(true);
        }
      }
    };

    void checkLiveStatus();
    const intervalId = window.setInterval(checkLiveStatus, pollIntervalMs);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [apiKey, channelId, isOffline, pollIntervalMs]);

  return { isLive, isOffline };
}

