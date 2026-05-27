// Leexi domain types as Zod schemas, rebuilt from live API responses.
// Ground truth: /tmp/leexi-real/list-raw.json + /tmp/leexi-real/detail-raw.json
// Convention: schemas parse snake_case API fields; transforms produce camelCase TS types.
import { z } from "zod";
// ---------------------------------------------------------------------------
// Shared sub-schemas (used in both list and detail contexts)
// ---------------------------------------------------------------------------
/** A Leexi internal user (owner or participating user). */
export const UserRefSchema = z
    .object({
    uuid: z.string(),
    name: z.string(),
    email: z.string(),
    active: z.boolean(),
})
    .passthrough();
/** A speaker on the call (external or internal). */
export const SpeakerSchema = z
    .object({
    uuid: z.string(),
    index: z.number().int(),
    // v0.4.10 — l'API renvoie null sur certains calls historiques (speakers
    // génériques "Speaker 1/2/3" sans parole détectée, ou calls avec audio
    // archivé sans recalcul des durées par speaker). Avant v0.4.10 ces calls
    // faisaient exploser CallSummarySchema/CallDetailSchema et bloquaient
    // leexi_list_calls sur la page contenant le call corrompu (régression
    // identique à title/locale/direction v0.4.8 et chapters.start_time v0.4.9).
    duration: z.number().nullable(),
    longest_monologue: z.number().nullable(),
    name: z.string(),
    is_user: z.boolean(),
    phone_number: z.string().nullable().optional(),
    email_address: z.string().nullable().optional(),
})
    .passthrough()
    .transform((raw) => ({
    uuid: raw.uuid,
    index: raw.index,
    duration: raw.duration ?? null,
    longestMonologue: raw.longest_monologue ?? null,
    name: raw.name,
    isUser: raw.is_user,
    phoneNumber: raw.phone_number ?? null,
    emailAddress: raw.email_address ?? null,
}));
/** A chapter extracted by Leexi AI. */
export const ChapterSchema = z
    .object({
    uuid: z.string(),
    index: z.number().int(),
    // v0.4.12 — l'API renvoie title=null sur des calls historiques (chaptering
    // généré sans titre dérivé). Avant v0.4.12 ces calls faisaient exploser
    // leexi_list_calls (cf. note start_time ci-dessous). text passe préventif.
    title: z.string().nullable(),
    text: z.string().nullable(),
    // v0.4.9 — l'API renvoie null sur des calls historiques (chaptering
    // généré sans timeline). Avant v0.4.9 ces calls faisaient exploser
    // CallSummarySchema/CallDetailSchema et bloquaient leexi_list_calls
    // sur la page contenant le call corrompu.
    start_time: z.number().nullable(),
})
    .passthrough()
    .transform((raw) => ({
    uuid: raw.uuid,
    index: raw.index,
    title: raw.title ?? null,
    text: raw.text ?? null,
    startTime: raw.start_time ?? null,
}));
/** A task (action item) extracted by Leexi AI. */
export const TaskSchema = z
    .object({
    uuid: z.string(),
    active: z.boolean(),
    subject: z.string(),
    description: z.string().nullable().optional(),
    status: z.string(),
    done: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
})
    .passthrough()
    .transform((raw) => ({
    uuid: raw.uuid,
    active: raw.active,
    subject: raw.subject,
    description: raw.description ?? null,
    status: raw.status,
    done: raw.done,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
}));
/** A conversation type label (e.g. sales_visio_demo). */
export const ConversationTypeSchema = z
    .object({
    uuid: z.string(),
    slug: z.string(),
    active: z.boolean(),
})
    .passthrough();
/** Meeting event metadata (Google Meet / Teams / etc.). */
export const MeetingEventSchema = z
    .object({
    uuid: z.string(),
    // v0.4.12 — l'API renvoie meeting_event avec title/direction/end_time/start_time
    // null sur des calls historiques (meeting metadata partielle, événements supprimés,
    // calls non liés à un meeting structuré côté Google/Teams). Avant v0.4.12 ces calls
    // faisaient exploser leexi_list_calls sur la page contenant le call corrompu.
    title: z.string().nullable(),
    meeting_url: z.string().nullable().optional(),
    meeting_provider: z.string().nullable().optional(),
    internal: z.boolean(),
    direction: z.string().nullable(),
    start_time: z.string().nullable(),
    end_time: z.string().nullable(),
})
    .passthrough()
    .transform((raw) => ({
    uuid: raw.uuid,
    title: raw.title ?? null,
    meetingUrl: raw.meeting_url ?? null,
    meetingProvider: raw.meeting_provider ?? null,
    internal: raw.internal,
    direction: raw.direction ?? null,
    startTime: raw.start_time ?? null,
    endTime: raw.end_time ?? null,
}));
/** Prompt completion item (AI-generated text for a prompt template). */
export const PromptSchema = z
    .object({
    uuid: z.string(),
    title: z.string(),
    category: z.string(),
    completions: z.array(z.string()),
})
    .passthrough();
/** A call topic (keyphrase + semantic label). */
export const CallTopicSchema = z
    .object({
    uuid: z.string(),
    start_time: z.number(),
    end_time: z.number(),
    keyphrase: z.string(),
    topic_name: z.string(),
})
    .passthrough()
    .transform((raw) => ({
    uuid: raw.uuid,
    startTime: raw.start_time,
    endTime: raw.end_time,
    keyphrase: raw.keyphrase,
    topicName: raw.topic_name,
}));
/** A word-level transcript item (word + timing). */
export const TranscriptItemSchema = z
    .object({
    start_time: z.number(),
    end_time: z.number(),
    content: z.string(),
})
    .passthrough()
    .transform((raw) => ({
    startTime: raw.start_time,
    endTime: raw.end_time,
    content: raw.content,
}));
/** A speaker utterance in the word-level transcript. */
export const TranscriptUtteranceSchema = z
    .object({
    speaker_index: z.number().int(),
    start_time: z.number(),
    end_time: z.number(),
    items: z.array(TranscriptItemSchema),
})
    .transform((raw) => ({
    speakerIndex: raw.speaker_index,
    startTime: raw.start_time,
    endTime: raw.end_time,
    items: raw.items,
}));
// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------
export const PaginationSchema = z.object({
    page: z.number().int().nonnegative(),
    items: z.number().int().nonnegative(),
    count: z.number().int().nonnegative(),
});
// ---------------------------------------------------------------------------
// CallSummary — shape returned by GET /v1/calls (list endpoint)
// The list endpoint returns all fields including nested objects; we surface the
// most useful ones and pass through the rest.
// ---------------------------------------------------------------------------
export const CallSummarySchema = z
    .object({
    uuid: z.string().min(1),
    // v0.4.8 — l'API renvoie null sur certains calls historiques (anciens
    // imports, calls sans meeting_event). Avant v0.4.8 ces calls faisaient
    // exploser le schéma et bloquaient toute reprise chronologique.
    locale: z.string().nullable(),
    // v0.4.10 — l'API renvoie null sur certains calls historiques (calls
    // archivés sans recalcul de durée, calls très courts/vides). Avant v0.4.10
    // ces calls bloquaient leexi_list_calls sur la page contenant le call
    // corrompu (régression identique à title/locale/direction v0.4.8 et
    // chapters.start_time v0.4.9).
    duration: z.number().nullable(),
    direction: z.string().nullable(),
    is_video: z.boolean(),
    visible: z.boolean(),
    title: z.string().nullable(),
    description: z.string().nullable().optional(),
    created_at: z.string(),
    updated_at: z.string(),
    performed_at: z.string(),
    leexi_url: z.string(),
    video_archived_at: z.string().nullable().optional(),
    audio_archived_at: z.string().nullable().optional(),
    transcript_archived_at: z.string().nullable().optional(),
    completions_archived_at: z.string().nullable().optional(),
    source: z.string().nullable().optional(),
    source_id: z.string().nullable().optional(),
    recording_url: z.string().nullable().optional(),
    transcript_url: z.string().nullable().optional(),
    summary: z.string().nullable().optional(),
    conversation_type: ConversationTypeSchema.nullable().optional(),
    deal: z.unknown().nullable().optional(),
    meeting_event: MeetingEventSchema.nullable().optional(),
    feedbacks: z.array(z.unknown()).optional(),
    owner: UserRefSchema.nullable().optional(),
    participating_users: z.array(UserRefSchema).optional(),
    customer_phone_numbers: z.array(z.string()).optional(),
    customer_email_addresses: z.array(z.string()).optional(),
    speakers: z.array(SpeakerSchema).optional(),
    prompts: z.array(PromptSchema).optional(),
    chapters: z.array(ChapterSchema).optional(),
    scorecards: z.array(z.unknown()).optional(),
    tags: z.array(z.unknown()).optional(),
    tasks: z.array(TaskSchema).optional(),
    simple_transcript: z.string().nullish(),
})
    .transform((raw) => ({
    uuid: raw.uuid,
    // v0.4.8 — passer null tel quel ; les consommateurs (routine, fiches
    // Obsidian) doivent gérer les fallbacks d'affichage eux-mêmes (ex:
    // title null → "(Sans titre — <uuid>)" dans le nom de fichier).
    locale: raw.locale ?? null,
    duration: raw.duration ?? null,
    direction: raw.direction ?? null,
    isVideo: raw.is_video,
    visible: raw.visible,
    title: raw.title ?? null,
    description: raw.description ?? null,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
    performedAt: raw.performed_at,
    leexiUrl: raw.leexi_url,
    videoArchivedAt: raw.video_archived_at ?? null,
    audioArchivedAt: raw.audio_archived_at ?? null,
    transcriptArchivedAt: raw.transcript_archived_at ?? null,
    completionsArchivedAt: raw.completions_archived_at ?? null,
    source: raw.source ?? null,
    sourceId: raw.source_id ?? null,
    recordingUrl: raw.recording_url ?? null,
    transcriptUrl: raw.transcript_url ?? null,
    summary: raw.summary ?? null,
    conversationType: raw.conversation_type ?? null,
    deal: raw.deal ?? null,
    meetingEvent: raw.meeting_event ?? null,
    feedbacks: raw.feedbacks ?? [],
    owner: raw.owner ?? null,
    participatingUsers: raw.participating_users ?? [],
    customerPhoneNumbers: raw.customer_phone_numbers ?? [],
    customerEmailAddresses: raw.customer_email_addresses ?? [],
    speakers: raw.speakers ?? [],
    prompts: raw.prompts ?? [],
    chapters: raw.chapters ?? [],
    scorecards: raw.scorecards ?? [],
    tags: raw.tags ?? [],
    tasks: raw.tasks ?? [],
    simpleTranscript: raw.simple_transcript ?? "",
}));
// ---------------------------------------------------------------------------
// CallDetail — shape returned by GET /v1/calls/{uuid}
// Extends the list shape with word-level transcript and call_topics.
// ---------------------------------------------------------------------------
export const CallDetailSchema = z
    .object({
    uuid: z.string().min(1),
    // v0.4.8 — cf. CallSummarySchema : nullable pour les calls historiques.
    locale: z.string().nullable(),
    // v0.4.10 — cf. CallSummarySchema : nullable pour les calls historiques.
    duration: z.number().nullable(),
    direction: z.string().nullable(),
    is_video: z.boolean(),
    visible: z.boolean(),
    title: z.string().nullable(),
    description: z.string().nullable().optional(),
    created_at: z.string(),
    updated_at: z.string(),
    performed_at: z.string(),
    leexi_url: z.string(),
    video_archived_at: z.string().nullable().optional(),
    audio_archived_at: z.string().nullable().optional(),
    transcript_archived_at: z.string().nullable().optional(),
    completions_archived_at: z.string().nullable().optional(),
    source: z.string().nullable().optional(),
    source_id: z.string().nullable().optional(),
    recording_url: z.string().nullable().optional(),
    transcript_url: z.string().nullable().optional(),
    summary: z.string().nullable().optional(),
    conversation_type: ConversationTypeSchema.nullable().optional(),
    deal: z.unknown().nullable().optional(),
    meeting_event: MeetingEventSchema.nullable().optional(),
    feedbacks: z.array(z.unknown()).optional(),
    owner: UserRefSchema.nullable().optional(),
    participating_users: z.array(UserRefSchema).optional(),
    customer_phone_numbers: z.array(z.string()).optional(),
    customer_email_addresses: z.array(z.string()).optional(),
    speakers: z.array(SpeakerSchema).optional(),
    prompts: z.array(PromptSchema).optional(),
    chapters: z.array(ChapterSchema).optional(),
    scorecards: z.array(z.unknown()).optional(),
    tags: z.array(z.unknown()).optional(),
    tasks: z.array(TaskSchema).optional(),
    // simple_transcript: full call text with inline "(HH:MM:SS - HH:MM:SS)" timestamps.
    // Format: "Speaker Name (HH:MM:SS - HH:MM:SS)\nText...\n\n"
    // v0.4.11 — nullish() : certains calls historiques renvoient null (pas que undefined).
    simple_transcript: z.string().nullish(),
    // call_topics: detail-only. Semantic keyphrases with timestamps.
    call_topics: z.array(CallTopicSchema).nullish(),
    // transcript: detail-only. Word-level utterance array.
    // v0.4.11 — nullish() : certains calls historiques renvoient null.
    transcript: z.array(TranscriptUtteranceSchema).nullish(),
})
    .transform((raw) => ({
    uuid: raw.uuid,
    // v0.4.8 — cf. CallSummarySchema : null passé tel quel.
    locale: raw.locale ?? null,
    duration: raw.duration ?? null,
    direction: raw.direction ?? null,
    isVideo: raw.is_video,
    visible: raw.visible,
    title: raw.title ?? null,
    description: raw.description ?? null,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
    performedAt: raw.performed_at,
    leexiUrl: raw.leexi_url,
    videoArchivedAt: raw.video_archived_at ?? null,
    audioArchivedAt: raw.audio_archived_at ?? null,
    transcriptArchivedAt: raw.transcript_archived_at ?? null,
    completionsArchivedAt: raw.completions_archived_at ?? null,
    source: raw.source ?? null,
    sourceId: raw.source_id ?? null,
    recordingUrl: raw.recording_url ?? null,
    transcriptUrl: raw.transcript_url ?? null,
    summary: raw.summary ?? null,
    conversationType: raw.conversation_type ?? null,
    deal: raw.deal ?? null,
    meetingEvent: raw.meeting_event ?? null,
    feedbacks: raw.feedbacks ?? [],
    owner: raw.owner ?? null,
    participatingUsers: raw.participating_users ?? [],
    customerPhoneNumbers: raw.customer_phone_numbers ?? [],
    customerEmailAddresses: raw.customer_email_addresses ?? [],
    speakers: raw.speakers ?? [],
    prompts: raw.prompts ?? [],
    chapters: raw.chapters ?? [],
    scorecards: raw.scorecards ?? [],
    tags: raw.tags ?? [],
    tasks: raw.tasks ?? [],
    simpleTranscript: raw.simple_transcript ?? "",
    callTopics: raw.call_topics ?? [],
    transcript: raw.transcript ?? [],
}));
// ---------------------------------------------------------------------------
// Response wrappers
// ---------------------------------------------------------------------------
/** Response shape for GET /v1/calls */
export const CallsListResponseSchema = z.object({
    data: z.array(CallSummarySchema),
    pagination: PaginationSchema,
});
/** Response shape for GET /v1/calls/{uuid} */
export const CallDetailResponseSchema = z.object({
    data: CallDetailSchema,
});
//# sourceMappingURL=types.js.map