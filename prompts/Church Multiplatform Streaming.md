# Church Multi-Platform Streaming System

## Goal
Implement a production-ready streaming management feature for an existing church website.

## Context
- OBS Studio sends the broadcast to Restream externally.
- Restream distributes the stream to YouTube, Facebook, and TikTok.
- The application does not handle RTMP ingestion, stream keys, transcoding, or any custom streaming server logic.
- The application only manages stream metadata, controls which stream is active, and embeds the selected live player on `/live`.

## First Step
Inspect the current codebase and follow the repository's existing patterns for:
- Prisma models and migrations
- data fetching and mutations
- server actions or API routes
- UI components and styling
- page revalidation and cache invalidation

Do not introduce new architectural patterns unless the repo already uses them.

## Data Model
Add a `Stream` model in Prisma with these fields:
- `id`
- `title`
- `description`
- `youtubeUrl`
- `facebookUrl`
- `tiktokUrl`
- `embedUrl`
- `status`
- `isActive`
- `scheduledAt`
- `createdAt`
- `updatedAt`

Rules:
- `status` must support only `offline`, `live`, and `scheduled`.
- Only one stream may have `isActive = true` at any time.
- If a stream is activated, deactivate all other streams in the same transaction.
- `embedUrl` is required before a stream can be activated.
- If `status = scheduled`, `scheduledAt` must be present.
- If `status = live`, the stream is eligible to appear on `/live`.
- If `status = offline`, the stream must not be shown on `/live`.
- Platform URLs are optional, but if provided they must be valid URLs and belong to the expected platform domains.

## Admin Routes
Implement these pages:
- `/admin/streams` for listing streams
- `/admin/streams/create` for creating a stream
- `/admin/streams/[id]/edit` for editing a stream

## Required Data Functions
Implement:
- `getStreams()`
- `getStreamById(id)`
- `createStream(data)`
- `updateStream(id, data)`
- `deleteStream(id)`

For each mutation:
- Validate input before saving.
- Enforce the single-active-stream rule.
- Revalidate affected pages after success.
- Fail gracefully on invalid or missing data.

## Admin UI
Build a simple, non-technical admin experience with these fields:
- Title
- Description
- YouTube URL
- Facebook URL
- TikTok URL
- Embed URL
- Status dropdown: `offline`, `live`, `scheduled`
- Scheduled date, shown only when status is `scheduled`
- Active toggle

UX requirements:
- Keep the interface easy for non-technical staff.
- Do not expose RTMP URLs or stream keys.
- Add helper text such as:
  - "Paste your YouTube Live link"
  - "Choose which platform to display on your website"

## `/live` Page
Load the currently active stream and display it only when:
- `isActive = true`
- `status = live`
- `embedUrl` is present

Behavior:
- If a valid active live stream exists, render the embedded player from `embedUrl`.
- If no valid live stream exists, show:
  "No live stream is currently available. Please check back later."
- Optionally show buttons linking out to the configured platforms:
  - Watch on YouTube
  - Watch on Facebook
  - Watch on TikTok
- Optionally show a status badge:
  - `LIVE`
  - `Scheduled`
  - `Offline`

## External Setup
OBS Studio and Restream are external services and should not be implemented in the app.
- OBS Studio streams to Restream using RTMP details.
- Restream distributes to YouTube, Facebook, and TikTok.

## Validation
Enforce the following:
- `embedUrl` must be a valid URL.
- Platform URLs must be valid and match the correct domains.
- An active stream cannot be saved without a valid `embedUrl`.
- Invalid or empty active streams must be rejected.
- Missing data should be handled gracefully.

## Verification Checklist
Confirm that:
- Prisma migration runs successfully.
- Admin CRUD works end to end.
- Only one active stream can exist at a time.
- Status behavior is correct:
  - `offline` is not shown
  - `scheduled` is not shown until it becomes live
  - `live` is displayed on `/live`
- The `/live` page renders the correct stream.
- The fallback state renders correctly.

## Final Outcome
Deliver a clean, production-ready implementation that:
- Uses OBS Studio for stream input
- Uses Restream for multi-platform distribution
- Lets admins manage stream metadata from the dashboard
- Displays the correct live stream dynamically on `/live`
- Supports the stream states `offline`, `live`, and `scheduled`
