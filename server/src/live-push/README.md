# XMRPod live push

This module broadcasts public live-start events to anonymous UnifiedPush registrations. Podcast subscriptions and enabled bells remain on the Android device. The live rows are replaced on every scan, so each page's current broadcast is kept in `xmrpod_live_push_states`; a stream that drops out of one scan and comes back is still the same broadcast. When a new broadcast is committed, one fanout job per session goes straight onto the BullMQ queue, keyed by its session ID; retries reuse the same job IDs and expiry. The first server snapshot creates a baseline without announcing existing streams.

Run the migration before deploying this server version. Configure `XMRPOD_PUSH_VAPID_PUBLIC_KEY`, `XMRPOD_PUSH_VAPID_PRIVATE_KEY`, and `XMRPOD_PUSH_VAPID_SUBJECT` (an HTTPS contact URL or mailto address). Generate a key pair once with the Web Push CLI and store its private key in the server's secret configuration. Keep the pair stable across deployments. Without these settings, registration reports unavailable and the app uses its hourly fallback; `/live-streams` still carries the same `notificationSessionId` values.

The app fetches `/live-streams/push/key`, registers an endpoint and RFC8291 public keys with PUT `/live-streams/push/subscriptions/:id`, and keeps its randomly generated authorization token locally. The server sends an encrypted challenge before enabling event fanout. The app returns it to `/ack`; `/test` exercises the same delivery path with a visible notification. DELETE removes a registration. Expired subscriptions are cleaned up automatically.

Only public HTTPS endpoints on port 443 are accepted. DNS answers are checked again on each send, and the actual request uses the checked address while preserving HTTPS hostname verification. Redirects are not followed. Endpoint secrets and authorization tokens must not be logged.

Deploy this backend and migration before releasing the Android push settings. Configure a real Sunup and a second provider on test devices and verify registration, background delivery, provider replacement, disabled bells, and a later distinct broadcast. Successful local builds do not establish production delivery.
