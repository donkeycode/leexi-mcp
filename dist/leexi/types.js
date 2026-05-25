// Leexi domain types as Zod schemas with snake_case → camelCase transforms.
// Leexi API returns snake_case; our TS code prefers camelCase throughout.
import { z } from "zod";
// ---------------------------------------------------------------------------
// Sub-schemas
// ---------------------------------------------------------------------------
export const ParticipantSchema = z.object({
    name: z.string(),
    email: z.string().email().nullable().optional(),
    role: z.enum(["host", "guest", "unknown"]).default("unknown"),
});
export const TranscriptParagraphSchema = z.object({
    speaker: z.string(),
    start: z.number(),
    end: z.number(),
    text: z.string(),
});
export const TranscriptWordSchema = z.object({
    text: z.string(),
    start: z.number(),
    end: z.number(),
});
export const TranscriptUtteranceSchema = z.object({
    speaker: z.string(),
    start: z.number(),
    words: z.array(TranscriptWordSchema),
});
// ---------------------------------------------------------------------------
// Call summary (used in list responses)
// ---------------------------------------------------------------------------
export const CallSummarySchema = z
    .object({
    uuid: z.string().min(1),
    title: z.string(),
    created_at: z.string(),
    duration_seconds: z.number().nonnegative(),
    language: z.string(),
    status: z.string(),
    recording_url: z.string().url(),
    participants: z.array(ParticipantSchema),
})
    .transform((raw) => ({
    uuid: raw.uuid,
    title: raw.title,
    createdAt: raw.created_at,
    durationSeconds: raw.duration_seconds,
    language: raw.language,
    status: raw.status,
    recordingUrl: raw.recording_url,
    participants: raw.participants,
}));
// ---------------------------------------------------------------------------
// Full call detail (single-call endpoint)
// ---------------------------------------------------------------------------
export const CallDetailSchema = z
    .object({
    uuid: z.string().min(1),
    title: z.string(),
    created_at: z.string(),
    started_at: z.string().optional(),
    ended_at: z.string().optional(),
    duration_seconds: z.number().nonnegative(),
    language: z.string(),
    status: z.string(),
    recording_url: z.string().url(),
    participants: z.array(ParticipantSchema),
    topics: z.array(z.string()).default([]),
    summary: z.string().optional(),
    simple_transcript: z.array(TranscriptParagraphSchema).default([]),
    transcript: z.array(TranscriptUtteranceSchema).default([]),
})
    .transform((raw) => ({
    uuid: raw.uuid,
    title: raw.title,
    createdAt: raw.created_at,
    startedAt: raw.started_at,
    endedAt: raw.ended_at,
    durationSeconds: raw.duration_seconds,
    language: raw.language,
    status: raw.status,
    recordingUrl: raw.recording_url,
    participants: raw.participants,
    topics: raw.topics,
    summary: raw.summary,
    simpleTranscript: raw.simple_transcript,
    transcript: raw.transcript,
}));
// ---------------------------------------------------------------------------
// Paginated calls list
// ---------------------------------------------------------------------------
export const CallsListSchema = z.object({
    data: z.array(CallSummarySchema),
    meta: z.object({
        page: z.number().int().positive(),
        per_page: z.number().int().positive(),
        total: z.number().int().nonnegative(),
    }),
});
//# sourceMappingURL=types.js.map