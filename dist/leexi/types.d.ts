import { z } from "zod";
/** A Leexi internal user (owner or participating user). */
export declare const UserRefSchema: z.ZodObject<{
    uuid: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    active: z.ZodBoolean;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    uuid: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    active: z.ZodBoolean;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    uuid: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    active: z.ZodBoolean;
}, z.ZodTypeAny, "passthrough">>;
export type UserRef = z.infer<typeof UserRefSchema>;
/** A speaker on the call (external or internal). */
export declare const SpeakerSchema: z.ZodEffects<z.ZodObject<{
    uuid: z.ZodString;
    index: z.ZodNumber;
    duration: z.ZodNullable<z.ZodNumber>;
    longest_monologue: z.ZodNullable<z.ZodNumber>;
    name: z.ZodString;
    is_user: z.ZodBoolean;
    phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    uuid: z.ZodString;
    index: z.ZodNumber;
    duration: z.ZodNullable<z.ZodNumber>;
    longest_monologue: z.ZodNullable<z.ZodNumber>;
    name: z.ZodString;
    is_user: z.ZodBoolean;
    phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    uuid: z.ZodString;
    index: z.ZodNumber;
    duration: z.ZodNullable<z.ZodNumber>;
    longest_monologue: z.ZodNullable<z.ZodNumber>;
    name: z.ZodString;
    is_user: z.ZodBoolean;
    phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.ZodTypeAny, "passthrough">>, {
    uuid: string;
    index: number;
    duration: number | null;
    longestMonologue: number | null;
    name: string;
    isUser: boolean;
    phoneNumber: string | null;
    emailAddress: string | null;
}, z.objectInputType<{
    uuid: z.ZodString;
    index: z.ZodNumber;
    duration: z.ZodNullable<z.ZodNumber>;
    longest_monologue: z.ZodNullable<z.ZodNumber>;
    name: z.ZodString;
    is_user: z.ZodBoolean;
    phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.ZodTypeAny, "passthrough">>;
export type Speaker = z.infer<typeof SpeakerSchema>;
/** A chapter extracted by Leexi AI. */
export declare const ChapterSchema: z.ZodEffects<z.ZodObject<{
    uuid: z.ZodString;
    index: z.ZodNumber;
    title: z.ZodNullable<z.ZodString>;
    text: z.ZodNullable<z.ZodString>;
    start_time: z.ZodNullable<z.ZodNumber>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    uuid: z.ZodString;
    index: z.ZodNumber;
    title: z.ZodNullable<z.ZodString>;
    text: z.ZodNullable<z.ZodString>;
    start_time: z.ZodNullable<z.ZodNumber>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    uuid: z.ZodString;
    index: z.ZodNumber;
    title: z.ZodNullable<z.ZodString>;
    text: z.ZodNullable<z.ZodString>;
    start_time: z.ZodNullable<z.ZodNumber>;
}, z.ZodTypeAny, "passthrough">>, {
    uuid: string;
    index: number;
    title: string | null;
    text: string | null;
    startTime: number | null;
}, z.objectInputType<{
    uuid: z.ZodString;
    index: z.ZodNumber;
    title: z.ZodNullable<z.ZodString>;
    text: z.ZodNullable<z.ZodString>;
    start_time: z.ZodNullable<z.ZodNumber>;
}, z.ZodTypeAny, "passthrough">>;
export type Chapter = z.infer<typeof ChapterSchema>;
/** A task (action item) extracted by Leexi AI. */
export declare const TaskSchema: z.ZodEffects<z.ZodObject<{
    uuid: z.ZodString;
    active: z.ZodBoolean;
    subject: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodString;
    done: z.ZodBoolean;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    uuid: z.ZodString;
    active: z.ZodBoolean;
    subject: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodString;
    done: z.ZodBoolean;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    uuid: z.ZodString;
    active: z.ZodBoolean;
    subject: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodString;
    done: z.ZodBoolean;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, z.ZodTypeAny, "passthrough">>, {
    uuid: string;
    active: boolean;
    subject: string;
    description: string | null;
    status: string;
    done: boolean;
    createdAt: string;
    updatedAt: string;
}, z.objectInputType<{
    uuid: z.ZodString;
    active: z.ZodBoolean;
    subject: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodString;
    done: z.ZodBoolean;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, z.ZodTypeAny, "passthrough">>;
export type Task = z.infer<typeof TaskSchema>;
/** A conversation type label (e.g. sales_visio_demo). */
export declare const ConversationTypeSchema: z.ZodObject<{
    uuid: z.ZodString;
    slug: z.ZodString;
    active: z.ZodBoolean;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    uuid: z.ZodString;
    slug: z.ZodString;
    active: z.ZodBoolean;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    uuid: z.ZodString;
    slug: z.ZodString;
    active: z.ZodBoolean;
}, z.ZodTypeAny, "passthrough">>;
export type ConversationType = z.infer<typeof ConversationTypeSchema>;
/** Meeting event metadata (Google Meet / Teams / etc.). */
export declare const MeetingEventSchema: z.ZodEffects<z.ZodObject<{
    uuid: z.ZodString;
    title: z.ZodNullable<z.ZodString>;
    meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    internal: z.ZodBoolean;
    direction: z.ZodNullable<z.ZodString>;
    start_time: z.ZodNullable<z.ZodString>;
    end_time: z.ZodNullable<z.ZodString>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    uuid: z.ZodString;
    title: z.ZodNullable<z.ZodString>;
    meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    internal: z.ZodBoolean;
    direction: z.ZodNullable<z.ZodString>;
    start_time: z.ZodNullable<z.ZodString>;
    end_time: z.ZodNullable<z.ZodString>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    uuid: z.ZodString;
    title: z.ZodNullable<z.ZodString>;
    meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    internal: z.ZodBoolean;
    direction: z.ZodNullable<z.ZodString>;
    start_time: z.ZodNullable<z.ZodString>;
    end_time: z.ZodNullable<z.ZodString>;
}, z.ZodTypeAny, "passthrough">>, {
    uuid: string;
    title: string | null;
    meetingUrl: string | null;
    meetingProvider: string | null;
    internal: boolean;
    direction: string | null;
    startTime: string | null;
    endTime: string | null;
}, z.objectInputType<{
    uuid: z.ZodString;
    title: z.ZodNullable<z.ZodString>;
    meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    internal: z.ZodBoolean;
    direction: z.ZodNullable<z.ZodString>;
    start_time: z.ZodNullable<z.ZodString>;
    end_time: z.ZodNullable<z.ZodString>;
}, z.ZodTypeAny, "passthrough">>;
export type MeetingEvent = z.infer<typeof MeetingEventSchema>;
/** Prompt completion item (AI-generated text for a prompt template). */
export declare const PromptSchema: z.ZodObject<{
    uuid: z.ZodString;
    title: z.ZodString;
    category: z.ZodString;
    completions: z.ZodArray<z.ZodString, "many">;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    uuid: z.ZodString;
    title: z.ZodString;
    category: z.ZodString;
    completions: z.ZodArray<z.ZodString, "many">;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    uuid: z.ZodString;
    title: z.ZodString;
    category: z.ZodString;
    completions: z.ZodArray<z.ZodString, "many">;
}, z.ZodTypeAny, "passthrough">>;
export type Prompt = z.infer<typeof PromptSchema>;
/** A call topic (keyphrase + semantic label). */
export declare const CallTopicSchema: z.ZodEffects<z.ZodObject<{
    uuid: z.ZodString;
    start_time: z.ZodNumber;
    end_time: z.ZodNumber;
    keyphrase: z.ZodString;
    topic_name: z.ZodString;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    uuid: z.ZodString;
    start_time: z.ZodNumber;
    end_time: z.ZodNumber;
    keyphrase: z.ZodString;
    topic_name: z.ZodString;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    uuid: z.ZodString;
    start_time: z.ZodNumber;
    end_time: z.ZodNumber;
    keyphrase: z.ZodString;
    topic_name: z.ZodString;
}, z.ZodTypeAny, "passthrough">>, {
    uuid: string;
    startTime: number;
    endTime: number;
    keyphrase: string;
    topicName: string;
}, z.objectInputType<{
    uuid: z.ZodString;
    start_time: z.ZodNumber;
    end_time: z.ZodNumber;
    keyphrase: z.ZodString;
    topic_name: z.ZodString;
}, z.ZodTypeAny, "passthrough">>;
export type CallTopic = z.infer<typeof CallTopicSchema>;
/** A word-level transcript item (word + timing). */
export declare const TranscriptItemSchema: z.ZodEffects<z.ZodObject<{
    start_time: z.ZodNumber;
    end_time: z.ZodNumber;
    content: z.ZodString;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    start_time: z.ZodNumber;
    end_time: z.ZodNumber;
    content: z.ZodString;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    start_time: z.ZodNumber;
    end_time: z.ZodNumber;
    content: z.ZodString;
}, z.ZodTypeAny, "passthrough">>, {
    startTime: number;
    endTime: number;
    content: string;
}, z.objectInputType<{
    start_time: z.ZodNumber;
    end_time: z.ZodNumber;
    content: z.ZodString;
}, z.ZodTypeAny, "passthrough">>;
/** A speaker utterance in the word-level transcript. */
export declare const TranscriptUtteranceSchema: z.ZodEffects<z.ZodObject<{
    speaker_index: z.ZodNumber;
    start_time: z.ZodNumber;
    end_time: z.ZodNumber;
    items: z.ZodArray<z.ZodEffects<z.ZodObject<{
        start_time: z.ZodNumber;
        end_time: z.ZodNumber;
        content: z.ZodString;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        start_time: z.ZodNumber;
        end_time: z.ZodNumber;
        content: z.ZodString;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        start_time: z.ZodNumber;
        end_time: z.ZodNumber;
        content: z.ZodString;
    }, z.ZodTypeAny, "passthrough">>, {
        startTime: number;
        endTime: number;
        content: string;
    }, z.objectInputType<{
        start_time: z.ZodNumber;
        end_time: z.ZodNumber;
        content: z.ZodString;
    }, z.ZodTypeAny, "passthrough">>, "many">;
}, "strip", z.ZodTypeAny, {
    items: {
        startTime: number;
        endTime: number;
        content: string;
    }[];
    start_time: number;
    end_time: number;
    speaker_index: number;
}, {
    items: z.objectInputType<{
        start_time: z.ZodNumber;
        end_time: z.ZodNumber;
        content: z.ZodString;
    }, z.ZodTypeAny, "passthrough">[];
    start_time: number;
    end_time: number;
    speaker_index: number;
}>, {
    speakerIndex: number;
    startTime: number;
    endTime: number;
    items: {
        startTime: number;
        endTime: number;
        content: string;
    }[];
}, {
    items: z.objectInputType<{
        start_time: z.ZodNumber;
        end_time: z.ZodNumber;
        content: z.ZodString;
    }, z.ZodTypeAny, "passthrough">[];
    start_time: number;
    end_time: number;
    speaker_index: number;
}>;
export type TranscriptUtterance = z.infer<typeof TranscriptUtteranceSchema>;
export declare const PaginationSchema: z.ZodObject<{
    page: z.ZodNumber;
    items: z.ZodNumber;
    count: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    items: number;
    page: number;
    count: number;
}, {
    items: number;
    page: number;
    count: number;
}>;
export type Pagination = z.infer<typeof PaginationSchema>;
export declare const CallSummarySchema: z.ZodEffects<z.ZodObject<{
    uuid: z.ZodString;
    locale: z.ZodNullable<z.ZodString>;
    duration: z.ZodNullable<z.ZodNumber>;
    direction: z.ZodNullable<z.ZodString>;
    is_video: z.ZodBoolean;
    visible: z.ZodBoolean;
    title: z.ZodNullable<z.ZodString>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
    performed_at: z.ZodString;
    leexi_url: z.ZodString;
    video_archived_at: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    audio_archived_at: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    transcript_archived_at: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    completions_archived_at: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    source: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    source_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    recording_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    transcript_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    summary: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    conversation_type: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        uuid: z.ZodString;
        slug: z.ZodString;
        active: z.ZodBoolean;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        uuid: z.ZodString;
        slug: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        uuid: z.ZodString;
        slug: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">>>>;
    deal: z.ZodOptional<z.ZodNullable<z.ZodUnknown>>;
    meeting_event: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodObject<{
        uuid: z.ZodString;
        title: z.ZodNullable<z.ZodString>;
        meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        internal: z.ZodBoolean;
        direction: z.ZodNullable<z.ZodString>;
        start_time: z.ZodNullable<z.ZodString>;
        end_time: z.ZodNullable<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        uuid: z.ZodString;
        title: z.ZodNullable<z.ZodString>;
        meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        internal: z.ZodBoolean;
        direction: z.ZodNullable<z.ZodString>;
        start_time: z.ZodNullable<z.ZodString>;
        end_time: z.ZodNullable<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        uuid: z.ZodString;
        title: z.ZodNullable<z.ZodString>;
        meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        internal: z.ZodBoolean;
        direction: z.ZodNullable<z.ZodString>;
        start_time: z.ZodNullable<z.ZodString>;
        end_time: z.ZodNullable<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>, {
        uuid: string;
        title: string | null;
        meetingUrl: string | null;
        meetingProvider: string | null;
        internal: boolean;
        direction: string | null;
        startTime: string | null;
        endTime: string | null;
    }, z.objectInputType<{
        uuid: z.ZodString;
        title: z.ZodNullable<z.ZodString>;
        meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        internal: z.ZodBoolean;
        direction: z.ZodNullable<z.ZodString>;
        start_time: z.ZodNullable<z.ZodString>;
        end_time: z.ZodNullable<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>>>;
    feedbacks: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
    owner: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        uuid: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        active: z.ZodBoolean;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        uuid: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        uuid: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">>>>;
    participating_users: z.ZodOptional<z.ZodArray<z.ZodObject<{
        uuid: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        active: z.ZodBoolean;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        uuid: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        uuid: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
    customer_phone_numbers: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    customer_email_addresses: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    speakers: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
        uuid: z.ZodString;
        index: z.ZodNumber;
        duration: z.ZodNullable<z.ZodNumber>;
        longest_monologue: z.ZodNullable<z.ZodNumber>;
        name: z.ZodString;
        is_user: z.ZodBoolean;
        phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        uuid: z.ZodString;
        index: z.ZodNumber;
        duration: z.ZodNullable<z.ZodNumber>;
        longest_monologue: z.ZodNullable<z.ZodNumber>;
        name: z.ZodString;
        is_user: z.ZodBoolean;
        phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        uuid: z.ZodString;
        index: z.ZodNumber;
        duration: z.ZodNullable<z.ZodNumber>;
        longest_monologue: z.ZodNullable<z.ZodNumber>;
        name: z.ZodString;
        is_user: z.ZodBoolean;
        phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">>, {
        uuid: string;
        index: number;
        duration: number | null;
        longestMonologue: number | null;
        name: string;
        isUser: boolean;
        phoneNumber: string | null;
        emailAddress: string | null;
    }, z.objectInputType<{
        uuid: z.ZodString;
        index: z.ZodNumber;
        duration: z.ZodNullable<z.ZodNumber>;
        longest_monologue: z.ZodNullable<z.ZodNumber>;
        name: z.ZodString;
        is_user: z.ZodBoolean;
        phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
    prompts: z.ZodOptional<z.ZodArray<z.ZodObject<{
        uuid: z.ZodString;
        title: z.ZodString;
        category: z.ZodString;
        completions: z.ZodArray<z.ZodString, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        uuid: z.ZodString;
        title: z.ZodString;
        category: z.ZodString;
        completions: z.ZodArray<z.ZodString, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        uuid: z.ZodString;
        title: z.ZodString;
        category: z.ZodString;
        completions: z.ZodArray<z.ZodString, "many">;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
    chapters: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
        uuid: z.ZodString;
        index: z.ZodNumber;
        title: z.ZodNullable<z.ZodString>;
        text: z.ZodNullable<z.ZodString>;
        start_time: z.ZodNullable<z.ZodNumber>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        uuid: z.ZodString;
        index: z.ZodNumber;
        title: z.ZodNullable<z.ZodString>;
        text: z.ZodNullable<z.ZodString>;
        start_time: z.ZodNullable<z.ZodNumber>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        uuid: z.ZodString;
        index: z.ZodNumber;
        title: z.ZodNullable<z.ZodString>;
        text: z.ZodNullable<z.ZodString>;
        start_time: z.ZodNullable<z.ZodNumber>;
    }, z.ZodTypeAny, "passthrough">>, {
        uuid: string;
        index: number;
        title: string | null;
        text: string | null;
        startTime: number | null;
    }, z.objectInputType<{
        uuid: z.ZodString;
        index: z.ZodNumber;
        title: z.ZodNullable<z.ZodString>;
        text: z.ZodNullable<z.ZodString>;
        start_time: z.ZodNullable<z.ZodNumber>;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
    scorecards: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
    tags: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
    tasks: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
        uuid: z.ZodString;
        active: z.ZodBoolean;
        subject: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        status: z.ZodString;
        done: z.ZodBoolean;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        uuid: z.ZodString;
        active: z.ZodBoolean;
        subject: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        status: z.ZodString;
        done: z.ZodBoolean;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        uuid: z.ZodString;
        active: z.ZodBoolean;
        subject: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        status: z.ZodString;
        done: z.ZodBoolean;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.ZodTypeAny, "passthrough">>, {
        uuid: string;
        active: boolean;
        subject: string;
        description: string | null;
        status: string;
        done: boolean;
        createdAt: string;
        updatedAt: string;
    }, z.objectInputType<{
        uuid: z.ZodString;
        active: z.ZodBoolean;
        subject: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        status: z.ZodString;
        done: z.ZodBoolean;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
    simple_transcript: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    created_at: string;
    performed_at: string;
    updated_at: string;
    uuid: string;
    duration: number | null;
    title: string | null;
    direction: string | null;
    locale: string | null;
    is_video: boolean;
    visible: boolean;
    leexi_url: string;
    description?: string | null | undefined;
    video_archived_at?: string | null | undefined;
    audio_archived_at?: string | null | undefined;
    transcript_archived_at?: string | null | undefined;
    completions_archived_at?: string | null | undefined;
    source?: string | null | undefined;
    source_id?: string | null | undefined;
    recording_url?: string | null | undefined;
    transcript_url?: string | null | undefined;
    summary?: string | null | undefined;
    conversation_type?: z.objectOutputType<{
        uuid: z.ZodString;
        slug: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough"> | null | undefined;
    deal?: unknown;
    meeting_event?: {
        uuid: string;
        title: string | null;
        meetingUrl: string | null;
        meetingProvider: string | null;
        internal: boolean;
        direction: string | null;
        startTime: string | null;
        endTime: string | null;
    } | null | undefined;
    feedbacks?: unknown[] | undefined;
    owner?: z.objectOutputType<{
        uuid: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough"> | null | undefined;
    participating_users?: z.objectOutputType<{
        uuid: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">[] | undefined;
    customer_phone_numbers?: string[] | undefined;
    customer_email_addresses?: string[] | undefined;
    speakers?: {
        uuid: string;
        index: number;
        duration: number | null;
        longestMonologue: number | null;
        name: string;
        isUser: boolean;
        phoneNumber: string | null;
        emailAddress: string | null;
    }[] | undefined;
    prompts?: z.objectOutputType<{
        uuid: z.ZodString;
        title: z.ZodString;
        category: z.ZodString;
        completions: z.ZodArray<z.ZodString, "many">;
    }, z.ZodTypeAny, "passthrough">[] | undefined;
    chapters?: {
        uuid: string;
        index: number;
        title: string | null;
        text: string | null;
        startTime: number | null;
    }[] | undefined;
    scorecards?: unknown[] | undefined;
    tags?: unknown[] | undefined;
    tasks?: {
        uuid: string;
        active: boolean;
        subject: string;
        description: string | null;
        status: string;
        done: boolean;
        createdAt: string;
        updatedAt: string;
    }[] | undefined;
    simple_transcript?: string | null | undefined;
}, {
    created_at: string;
    performed_at: string;
    updated_at: string;
    uuid: string;
    duration: number | null;
    title: string | null;
    direction: string | null;
    locale: string | null;
    is_video: boolean;
    visible: boolean;
    leexi_url: string;
    description?: string | null | undefined;
    video_archived_at?: string | null | undefined;
    audio_archived_at?: string | null | undefined;
    transcript_archived_at?: string | null | undefined;
    completions_archived_at?: string | null | undefined;
    source?: string | null | undefined;
    source_id?: string | null | undefined;
    recording_url?: string | null | undefined;
    transcript_url?: string | null | undefined;
    summary?: string | null | undefined;
    conversation_type?: z.objectInputType<{
        uuid: z.ZodString;
        slug: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough"> | null | undefined;
    deal?: unknown;
    meeting_event?: z.objectInputType<{
        uuid: z.ZodString;
        title: z.ZodNullable<z.ZodString>;
        meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        internal: z.ZodBoolean;
        direction: z.ZodNullable<z.ZodString>;
        start_time: z.ZodNullable<z.ZodString>;
        end_time: z.ZodNullable<z.ZodString>;
    }, z.ZodTypeAny, "passthrough"> | null | undefined;
    feedbacks?: unknown[] | undefined;
    owner?: z.objectInputType<{
        uuid: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough"> | null | undefined;
    participating_users?: z.objectInputType<{
        uuid: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">[] | undefined;
    customer_phone_numbers?: string[] | undefined;
    customer_email_addresses?: string[] | undefined;
    speakers?: z.objectInputType<{
        uuid: z.ZodString;
        index: z.ZodNumber;
        duration: z.ZodNullable<z.ZodNumber>;
        longest_monologue: z.ZodNullable<z.ZodNumber>;
        name: z.ZodString;
        is_user: z.ZodBoolean;
        phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">[] | undefined;
    prompts?: z.objectInputType<{
        uuid: z.ZodString;
        title: z.ZodString;
        category: z.ZodString;
        completions: z.ZodArray<z.ZodString, "many">;
    }, z.ZodTypeAny, "passthrough">[] | undefined;
    chapters?: z.objectInputType<{
        uuid: z.ZodString;
        index: z.ZodNumber;
        title: z.ZodNullable<z.ZodString>;
        text: z.ZodNullable<z.ZodString>;
        start_time: z.ZodNullable<z.ZodNumber>;
    }, z.ZodTypeAny, "passthrough">[] | undefined;
    scorecards?: unknown[] | undefined;
    tags?: unknown[] | undefined;
    tasks?: z.objectInputType<{
        uuid: z.ZodString;
        active: z.ZodBoolean;
        subject: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        status: z.ZodString;
        done: z.ZodBoolean;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.ZodTypeAny, "passthrough">[] | undefined;
    simple_transcript?: string | null | undefined;
}>, {
    uuid: string;
    locale: string | null;
    duration: number | null;
    direction: string | null;
    isVideo: boolean;
    visible: boolean;
    title: string | null;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    performedAt: string;
    leexiUrl: string;
    videoArchivedAt: string | null;
    audioArchivedAt: string | null;
    transcriptArchivedAt: string | null;
    completionsArchivedAt: string | null;
    source: string | null;
    sourceId: string | null;
    recordingUrl: string | null;
    transcriptUrl: string | null;
    summary: string | null;
    conversationType: z.objectOutputType<{
        uuid: z.ZodString;
        slug: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough"> | null;
    deal: {} | null;
    meetingEvent: {
        uuid: string;
        title: string | null;
        meetingUrl: string | null;
        meetingProvider: string | null;
        internal: boolean;
        direction: string | null;
        startTime: string | null;
        endTime: string | null;
    } | null;
    feedbacks: unknown[];
    owner: z.objectOutputType<{
        uuid: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough"> | null;
    participatingUsers: z.objectOutputType<{
        uuid: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">[];
    customerPhoneNumbers: string[];
    customerEmailAddresses: string[];
    speakers: {
        uuid: string;
        index: number;
        duration: number | null;
        longestMonologue: number | null;
        name: string;
        isUser: boolean;
        phoneNumber: string | null;
        emailAddress: string | null;
    }[];
    prompts: z.objectOutputType<{
        uuid: z.ZodString;
        title: z.ZodString;
        category: z.ZodString;
        completions: z.ZodArray<z.ZodString, "many">;
    }, z.ZodTypeAny, "passthrough">[];
    chapters: {
        uuid: string;
        index: number;
        title: string | null;
        text: string | null;
        startTime: number | null;
    }[];
    scorecards: unknown[];
    tags: unknown[];
    tasks: {
        uuid: string;
        active: boolean;
        subject: string;
        description: string | null;
        status: string;
        done: boolean;
        createdAt: string;
        updatedAt: string;
    }[];
    simpleTranscript: string;
}, {
    created_at: string;
    performed_at: string;
    updated_at: string;
    uuid: string;
    duration: number | null;
    title: string | null;
    direction: string | null;
    locale: string | null;
    is_video: boolean;
    visible: boolean;
    leexi_url: string;
    description?: string | null | undefined;
    video_archived_at?: string | null | undefined;
    audio_archived_at?: string | null | undefined;
    transcript_archived_at?: string | null | undefined;
    completions_archived_at?: string | null | undefined;
    source?: string | null | undefined;
    source_id?: string | null | undefined;
    recording_url?: string | null | undefined;
    transcript_url?: string | null | undefined;
    summary?: string | null | undefined;
    conversation_type?: z.objectInputType<{
        uuid: z.ZodString;
        slug: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough"> | null | undefined;
    deal?: unknown;
    meeting_event?: z.objectInputType<{
        uuid: z.ZodString;
        title: z.ZodNullable<z.ZodString>;
        meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        internal: z.ZodBoolean;
        direction: z.ZodNullable<z.ZodString>;
        start_time: z.ZodNullable<z.ZodString>;
        end_time: z.ZodNullable<z.ZodString>;
    }, z.ZodTypeAny, "passthrough"> | null | undefined;
    feedbacks?: unknown[] | undefined;
    owner?: z.objectInputType<{
        uuid: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough"> | null | undefined;
    participating_users?: z.objectInputType<{
        uuid: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">[] | undefined;
    customer_phone_numbers?: string[] | undefined;
    customer_email_addresses?: string[] | undefined;
    speakers?: z.objectInputType<{
        uuid: z.ZodString;
        index: z.ZodNumber;
        duration: z.ZodNullable<z.ZodNumber>;
        longest_monologue: z.ZodNullable<z.ZodNumber>;
        name: z.ZodString;
        is_user: z.ZodBoolean;
        phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">[] | undefined;
    prompts?: z.objectInputType<{
        uuid: z.ZodString;
        title: z.ZodString;
        category: z.ZodString;
        completions: z.ZodArray<z.ZodString, "many">;
    }, z.ZodTypeAny, "passthrough">[] | undefined;
    chapters?: z.objectInputType<{
        uuid: z.ZodString;
        index: z.ZodNumber;
        title: z.ZodNullable<z.ZodString>;
        text: z.ZodNullable<z.ZodString>;
        start_time: z.ZodNullable<z.ZodNumber>;
    }, z.ZodTypeAny, "passthrough">[] | undefined;
    scorecards?: unknown[] | undefined;
    tags?: unknown[] | undefined;
    tasks?: z.objectInputType<{
        uuid: z.ZodString;
        active: z.ZodBoolean;
        subject: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        status: z.ZodString;
        done: z.ZodBoolean;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.ZodTypeAny, "passthrough">[] | undefined;
    simple_transcript?: string | null | undefined;
}>;
export type CallSummary = z.infer<typeof CallSummarySchema>;
export declare const CallDetailSchema: z.ZodEffects<z.ZodObject<{
    uuid: z.ZodString;
    locale: z.ZodNullable<z.ZodString>;
    duration: z.ZodNullable<z.ZodNumber>;
    direction: z.ZodNullable<z.ZodString>;
    is_video: z.ZodBoolean;
    visible: z.ZodBoolean;
    title: z.ZodNullable<z.ZodString>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
    performed_at: z.ZodString;
    leexi_url: z.ZodString;
    video_archived_at: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    audio_archived_at: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    transcript_archived_at: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    completions_archived_at: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    source: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    source_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    recording_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    transcript_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    summary: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    conversation_type: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        uuid: z.ZodString;
        slug: z.ZodString;
        active: z.ZodBoolean;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        uuid: z.ZodString;
        slug: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        uuid: z.ZodString;
        slug: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">>>>;
    deal: z.ZodOptional<z.ZodNullable<z.ZodUnknown>>;
    meeting_event: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodObject<{
        uuid: z.ZodString;
        title: z.ZodNullable<z.ZodString>;
        meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        internal: z.ZodBoolean;
        direction: z.ZodNullable<z.ZodString>;
        start_time: z.ZodNullable<z.ZodString>;
        end_time: z.ZodNullable<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        uuid: z.ZodString;
        title: z.ZodNullable<z.ZodString>;
        meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        internal: z.ZodBoolean;
        direction: z.ZodNullable<z.ZodString>;
        start_time: z.ZodNullable<z.ZodString>;
        end_time: z.ZodNullable<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        uuid: z.ZodString;
        title: z.ZodNullable<z.ZodString>;
        meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        internal: z.ZodBoolean;
        direction: z.ZodNullable<z.ZodString>;
        start_time: z.ZodNullable<z.ZodString>;
        end_time: z.ZodNullable<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>, {
        uuid: string;
        title: string | null;
        meetingUrl: string | null;
        meetingProvider: string | null;
        internal: boolean;
        direction: string | null;
        startTime: string | null;
        endTime: string | null;
    }, z.objectInputType<{
        uuid: z.ZodString;
        title: z.ZodNullable<z.ZodString>;
        meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        internal: z.ZodBoolean;
        direction: z.ZodNullable<z.ZodString>;
        start_time: z.ZodNullable<z.ZodString>;
        end_time: z.ZodNullable<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>>>;
    feedbacks: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
    owner: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        uuid: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        active: z.ZodBoolean;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        uuid: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        uuid: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">>>>;
    participating_users: z.ZodOptional<z.ZodArray<z.ZodObject<{
        uuid: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        active: z.ZodBoolean;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        uuid: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        uuid: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
    customer_phone_numbers: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    customer_email_addresses: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    speakers: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
        uuid: z.ZodString;
        index: z.ZodNumber;
        duration: z.ZodNullable<z.ZodNumber>;
        longest_monologue: z.ZodNullable<z.ZodNumber>;
        name: z.ZodString;
        is_user: z.ZodBoolean;
        phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        uuid: z.ZodString;
        index: z.ZodNumber;
        duration: z.ZodNullable<z.ZodNumber>;
        longest_monologue: z.ZodNullable<z.ZodNumber>;
        name: z.ZodString;
        is_user: z.ZodBoolean;
        phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        uuid: z.ZodString;
        index: z.ZodNumber;
        duration: z.ZodNullable<z.ZodNumber>;
        longest_monologue: z.ZodNullable<z.ZodNumber>;
        name: z.ZodString;
        is_user: z.ZodBoolean;
        phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">>, {
        uuid: string;
        index: number;
        duration: number | null;
        longestMonologue: number | null;
        name: string;
        isUser: boolean;
        phoneNumber: string | null;
        emailAddress: string | null;
    }, z.objectInputType<{
        uuid: z.ZodString;
        index: z.ZodNumber;
        duration: z.ZodNullable<z.ZodNumber>;
        longest_monologue: z.ZodNullable<z.ZodNumber>;
        name: z.ZodString;
        is_user: z.ZodBoolean;
        phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
    prompts: z.ZodOptional<z.ZodArray<z.ZodObject<{
        uuid: z.ZodString;
        title: z.ZodString;
        category: z.ZodString;
        completions: z.ZodArray<z.ZodString, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        uuid: z.ZodString;
        title: z.ZodString;
        category: z.ZodString;
        completions: z.ZodArray<z.ZodString, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        uuid: z.ZodString;
        title: z.ZodString;
        category: z.ZodString;
        completions: z.ZodArray<z.ZodString, "many">;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
    chapters: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
        uuid: z.ZodString;
        index: z.ZodNumber;
        title: z.ZodNullable<z.ZodString>;
        text: z.ZodNullable<z.ZodString>;
        start_time: z.ZodNullable<z.ZodNumber>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        uuid: z.ZodString;
        index: z.ZodNumber;
        title: z.ZodNullable<z.ZodString>;
        text: z.ZodNullable<z.ZodString>;
        start_time: z.ZodNullable<z.ZodNumber>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        uuid: z.ZodString;
        index: z.ZodNumber;
        title: z.ZodNullable<z.ZodString>;
        text: z.ZodNullable<z.ZodString>;
        start_time: z.ZodNullable<z.ZodNumber>;
    }, z.ZodTypeAny, "passthrough">>, {
        uuid: string;
        index: number;
        title: string | null;
        text: string | null;
        startTime: number | null;
    }, z.objectInputType<{
        uuid: z.ZodString;
        index: z.ZodNumber;
        title: z.ZodNullable<z.ZodString>;
        text: z.ZodNullable<z.ZodString>;
        start_time: z.ZodNullable<z.ZodNumber>;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
    scorecards: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
    tags: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
    tasks: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
        uuid: z.ZodString;
        active: z.ZodBoolean;
        subject: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        status: z.ZodString;
        done: z.ZodBoolean;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        uuid: z.ZodString;
        active: z.ZodBoolean;
        subject: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        status: z.ZodString;
        done: z.ZodBoolean;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        uuid: z.ZodString;
        active: z.ZodBoolean;
        subject: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        status: z.ZodString;
        done: z.ZodBoolean;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.ZodTypeAny, "passthrough">>, {
        uuid: string;
        active: boolean;
        subject: string;
        description: string | null;
        status: string;
        done: boolean;
        createdAt: string;
        updatedAt: string;
    }, z.objectInputType<{
        uuid: z.ZodString;
        active: z.ZodBoolean;
        subject: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        status: z.ZodString;
        done: z.ZodBoolean;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
    simple_transcript: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    call_topics: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodObject<{
        uuid: z.ZodString;
        start_time: z.ZodNumber;
        end_time: z.ZodNumber;
        keyphrase: z.ZodString;
        topic_name: z.ZodString;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        uuid: z.ZodString;
        start_time: z.ZodNumber;
        end_time: z.ZodNumber;
        keyphrase: z.ZodString;
        topic_name: z.ZodString;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        uuid: z.ZodString;
        start_time: z.ZodNumber;
        end_time: z.ZodNumber;
        keyphrase: z.ZodString;
        topic_name: z.ZodString;
    }, z.ZodTypeAny, "passthrough">>, {
        uuid: string;
        startTime: number;
        endTime: number;
        keyphrase: string;
        topicName: string;
    }, z.objectInputType<{
        uuid: z.ZodString;
        start_time: z.ZodNumber;
        end_time: z.ZodNumber;
        keyphrase: z.ZodString;
        topic_name: z.ZodString;
    }, z.ZodTypeAny, "passthrough">>, "many">>>;
    transcript: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodObject<{
        speaker_index: z.ZodNumber;
        start_time: z.ZodNumber;
        end_time: z.ZodNumber;
        items: z.ZodArray<z.ZodEffects<z.ZodObject<{
            start_time: z.ZodNumber;
            end_time: z.ZodNumber;
            content: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            start_time: z.ZodNumber;
            end_time: z.ZodNumber;
            content: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            start_time: z.ZodNumber;
            end_time: z.ZodNumber;
            content: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, {
            startTime: number;
            endTime: number;
            content: string;
        }, z.objectInputType<{
            start_time: z.ZodNumber;
            end_time: z.ZodNumber;
            content: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, "strip", z.ZodTypeAny, {
        items: {
            startTime: number;
            endTime: number;
            content: string;
        }[];
        start_time: number;
        end_time: number;
        speaker_index: number;
    }, {
        items: z.objectInputType<{
            start_time: z.ZodNumber;
            end_time: z.ZodNumber;
            content: z.ZodString;
        }, z.ZodTypeAny, "passthrough">[];
        start_time: number;
        end_time: number;
        speaker_index: number;
    }>, {
        speakerIndex: number;
        startTime: number;
        endTime: number;
        items: {
            startTime: number;
            endTime: number;
            content: string;
        }[];
    }, {
        items: z.objectInputType<{
            start_time: z.ZodNumber;
            end_time: z.ZodNumber;
            content: z.ZodString;
        }, z.ZodTypeAny, "passthrough">[];
        start_time: number;
        end_time: number;
        speaker_index: number;
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
    created_at: string;
    performed_at: string;
    updated_at: string;
    uuid: string;
    duration: number | null;
    title: string | null;
    direction: string | null;
    locale: string | null;
    is_video: boolean;
    visible: boolean;
    leexi_url: string;
    description?: string | null | undefined;
    video_archived_at?: string | null | undefined;
    audio_archived_at?: string | null | undefined;
    transcript_archived_at?: string | null | undefined;
    completions_archived_at?: string | null | undefined;
    source?: string | null | undefined;
    source_id?: string | null | undefined;
    recording_url?: string | null | undefined;
    transcript_url?: string | null | undefined;
    summary?: string | null | undefined;
    conversation_type?: z.objectOutputType<{
        uuid: z.ZodString;
        slug: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough"> | null | undefined;
    deal?: unknown;
    meeting_event?: {
        uuid: string;
        title: string | null;
        meetingUrl: string | null;
        meetingProvider: string | null;
        internal: boolean;
        direction: string | null;
        startTime: string | null;
        endTime: string | null;
    } | null | undefined;
    feedbacks?: unknown[] | undefined;
    owner?: z.objectOutputType<{
        uuid: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough"> | null | undefined;
    participating_users?: z.objectOutputType<{
        uuid: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">[] | undefined;
    customer_phone_numbers?: string[] | undefined;
    customer_email_addresses?: string[] | undefined;
    speakers?: {
        uuid: string;
        index: number;
        duration: number | null;
        longestMonologue: number | null;
        name: string;
        isUser: boolean;
        phoneNumber: string | null;
        emailAddress: string | null;
    }[] | undefined;
    prompts?: z.objectOutputType<{
        uuid: z.ZodString;
        title: z.ZodString;
        category: z.ZodString;
        completions: z.ZodArray<z.ZodString, "many">;
    }, z.ZodTypeAny, "passthrough">[] | undefined;
    chapters?: {
        uuid: string;
        index: number;
        title: string | null;
        text: string | null;
        startTime: number | null;
    }[] | undefined;
    scorecards?: unknown[] | undefined;
    tags?: unknown[] | undefined;
    tasks?: {
        uuid: string;
        active: boolean;
        subject: string;
        description: string | null;
        status: string;
        done: boolean;
        createdAt: string;
        updatedAt: string;
    }[] | undefined;
    simple_transcript?: string | null | undefined;
    call_topics?: {
        uuid: string;
        startTime: number;
        endTime: number;
        keyphrase: string;
        topicName: string;
    }[] | null | undefined;
    transcript?: {
        speakerIndex: number;
        startTime: number;
        endTime: number;
        items: {
            startTime: number;
            endTime: number;
            content: string;
        }[];
    }[] | null | undefined;
}, {
    created_at: string;
    performed_at: string;
    updated_at: string;
    uuid: string;
    duration: number | null;
    title: string | null;
    direction: string | null;
    locale: string | null;
    is_video: boolean;
    visible: boolean;
    leexi_url: string;
    description?: string | null | undefined;
    video_archived_at?: string | null | undefined;
    audio_archived_at?: string | null | undefined;
    transcript_archived_at?: string | null | undefined;
    completions_archived_at?: string | null | undefined;
    source?: string | null | undefined;
    source_id?: string | null | undefined;
    recording_url?: string | null | undefined;
    transcript_url?: string | null | undefined;
    summary?: string | null | undefined;
    conversation_type?: z.objectInputType<{
        uuid: z.ZodString;
        slug: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough"> | null | undefined;
    deal?: unknown;
    meeting_event?: z.objectInputType<{
        uuid: z.ZodString;
        title: z.ZodNullable<z.ZodString>;
        meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        internal: z.ZodBoolean;
        direction: z.ZodNullable<z.ZodString>;
        start_time: z.ZodNullable<z.ZodString>;
        end_time: z.ZodNullable<z.ZodString>;
    }, z.ZodTypeAny, "passthrough"> | null | undefined;
    feedbacks?: unknown[] | undefined;
    owner?: z.objectInputType<{
        uuid: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough"> | null | undefined;
    participating_users?: z.objectInputType<{
        uuid: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">[] | undefined;
    customer_phone_numbers?: string[] | undefined;
    customer_email_addresses?: string[] | undefined;
    speakers?: z.objectInputType<{
        uuid: z.ZodString;
        index: z.ZodNumber;
        duration: z.ZodNullable<z.ZodNumber>;
        longest_monologue: z.ZodNullable<z.ZodNumber>;
        name: z.ZodString;
        is_user: z.ZodBoolean;
        phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">[] | undefined;
    prompts?: z.objectInputType<{
        uuid: z.ZodString;
        title: z.ZodString;
        category: z.ZodString;
        completions: z.ZodArray<z.ZodString, "many">;
    }, z.ZodTypeAny, "passthrough">[] | undefined;
    chapters?: z.objectInputType<{
        uuid: z.ZodString;
        index: z.ZodNumber;
        title: z.ZodNullable<z.ZodString>;
        text: z.ZodNullable<z.ZodString>;
        start_time: z.ZodNullable<z.ZodNumber>;
    }, z.ZodTypeAny, "passthrough">[] | undefined;
    scorecards?: unknown[] | undefined;
    tags?: unknown[] | undefined;
    tasks?: z.objectInputType<{
        uuid: z.ZodString;
        active: z.ZodBoolean;
        subject: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        status: z.ZodString;
        done: z.ZodBoolean;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.ZodTypeAny, "passthrough">[] | undefined;
    simple_transcript?: string | null | undefined;
    call_topics?: z.objectInputType<{
        uuid: z.ZodString;
        start_time: z.ZodNumber;
        end_time: z.ZodNumber;
        keyphrase: z.ZodString;
        topic_name: z.ZodString;
    }, z.ZodTypeAny, "passthrough">[] | null | undefined;
    transcript?: {
        items: z.objectInputType<{
            start_time: z.ZodNumber;
            end_time: z.ZodNumber;
            content: z.ZodString;
        }, z.ZodTypeAny, "passthrough">[];
        start_time: number;
        end_time: number;
        speaker_index: number;
    }[] | null | undefined;
}>, {
    uuid: string;
    locale: string | null;
    duration: number | null;
    direction: string | null;
    isVideo: boolean;
    visible: boolean;
    title: string | null;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    performedAt: string;
    leexiUrl: string;
    videoArchivedAt: string | null;
    audioArchivedAt: string | null;
    transcriptArchivedAt: string | null;
    completionsArchivedAt: string | null;
    source: string | null;
    sourceId: string | null;
    recordingUrl: string | null;
    transcriptUrl: string | null;
    summary: string | null;
    conversationType: z.objectOutputType<{
        uuid: z.ZodString;
        slug: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough"> | null;
    deal: {} | null;
    meetingEvent: {
        uuid: string;
        title: string | null;
        meetingUrl: string | null;
        meetingProvider: string | null;
        internal: boolean;
        direction: string | null;
        startTime: string | null;
        endTime: string | null;
    } | null;
    feedbacks: unknown[];
    owner: z.objectOutputType<{
        uuid: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough"> | null;
    participatingUsers: z.objectOutputType<{
        uuid: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">[];
    customerPhoneNumbers: string[];
    customerEmailAddresses: string[];
    speakers: {
        uuid: string;
        index: number;
        duration: number | null;
        longestMonologue: number | null;
        name: string;
        isUser: boolean;
        phoneNumber: string | null;
        emailAddress: string | null;
    }[];
    prompts: z.objectOutputType<{
        uuid: z.ZodString;
        title: z.ZodString;
        category: z.ZodString;
        completions: z.ZodArray<z.ZodString, "many">;
    }, z.ZodTypeAny, "passthrough">[];
    chapters: {
        uuid: string;
        index: number;
        title: string | null;
        text: string | null;
        startTime: number | null;
    }[];
    scorecards: unknown[];
    tags: unknown[];
    tasks: {
        uuid: string;
        active: boolean;
        subject: string;
        description: string | null;
        status: string;
        done: boolean;
        createdAt: string;
        updatedAt: string;
    }[];
    simpleTranscript: string;
    callTopics: {
        uuid: string;
        startTime: number;
        endTime: number;
        keyphrase: string;
        topicName: string;
    }[];
    transcript: {
        speakerIndex: number;
        startTime: number;
        endTime: number;
        items: {
            startTime: number;
            endTime: number;
            content: string;
        }[];
    }[];
}, {
    created_at: string;
    performed_at: string;
    updated_at: string;
    uuid: string;
    duration: number | null;
    title: string | null;
    direction: string | null;
    locale: string | null;
    is_video: boolean;
    visible: boolean;
    leexi_url: string;
    description?: string | null | undefined;
    video_archived_at?: string | null | undefined;
    audio_archived_at?: string | null | undefined;
    transcript_archived_at?: string | null | undefined;
    completions_archived_at?: string | null | undefined;
    source?: string | null | undefined;
    source_id?: string | null | undefined;
    recording_url?: string | null | undefined;
    transcript_url?: string | null | undefined;
    summary?: string | null | undefined;
    conversation_type?: z.objectInputType<{
        uuid: z.ZodString;
        slug: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough"> | null | undefined;
    deal?: unknown;
    meeting_event?: z.objectInputType<{
        uuid: z.ZodString;
        title: z.ZodNullable<z.ZodString>;
        meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        internal: z.ZodBoolean;
        direction: z.ZodNullable<z.ZodString>;
        start_time: z.ZodNullable<z.ZodString>;
        end_time: z.ZodNullable<z.ZodString>;
    }, z.ZodTypeAny, "passthrough"> | null | undefined;
    feedbacks?: unknown[] | undefined;
    owner?: z.objectInputType<{
        uuid: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough"> | null | undefined;
    participating_users?: z.objectInputType<{
        uuid: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        active: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">[] | undefined;
    customer_phone_numbers?: string[] | undefined;
    customer_email_addresses?: string[] | undefined;
    speakers?: z.objectInputType<{
        uuid: z.ZodString;
        index: z.ZodNumber;
        duration: z.ZodNullable<z.ZodNumber>;
        longest_monologue: z.ZodNullable<z.ZodNumber>;
        name: z.ZodString;
        is_user: z.ZodBoolean;
        phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">[] | undefined;
    prompts?: z.objectInputType<{
        uuid: z.ZodString;
        title: z.ZodString;
        category: z.ZodString;
        completions: z.ZodArray<z.ZodString, "many">;
    }, z.ZodTypeAny, "passthrough">[] | undefined;
    chapters?: z.objectInputType<{
        uuid: z.ZodString;
        index: z.ZodNumber;
        title: z.ZodNullable<z.ZodString>;
        text: z.ZodNullable<z.ZodString>;
        start_time: z.ZodNullable<z.ZodNumber>;
    }, z.ZodTypeAny, "passthrough">[] | undefined;
    scorecards?: unknown[] | undefined;
    tags?: unknown[] | undefined;
    tasks?: z.objectInputType<{
        uuid: z.ZodString;
        active: z.ZodBoolean;
        subject: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        status: z.ZodString;
        done: z.ZodBoolean;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.ZodTypeAny, "passthrough">[] | undefined;
    simple_transcript?: string | null | undefined;
    call_topics?: z.objectInputType<{
        uuid: z.ZodString;
        start_time: z.ZodNumber;
        end_time: z.ZodNumber;
        keyphrase: z.ZodString;
        topic_name: z.ZodString;
    }, z.ZodTypeAny, "passthrough">[] | null | undefined;
    transcript?: {
        items: z.objectInputType<{
            start_time: z.ZodNumber;
            end_time: z.ZodNumber;
            content: z.ZodString;
        }, z.ZodTypeAny, "passthrough">[];
        start_time: number;
        end_time: number;
        speaker_index: number;
    }[] | null | undefined;
}>;
export type CallDetail = z.infer<typeof CallDetailSchema>;
/** Response shape for GET /v1/calls */
export declare const CallsListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodEffects<z.ZodObject<{
        uuid: z.ZodString;
        locale: z.ZodNullable<z.ZodString>;
        duration: z.ZodNullable<z.ZodNumber>;
        direction: z.ZodNullable<z.ZodString>;
        is_video: z.ZodBoolean;
        visible: z.ZodBoolean;
        title: z.ZodNullable<z.ZodString>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        created_at: z.ZodString;
        updated_at: z.ZodString;
        performed_at: z.ZodString;
        leexi_url: z.ZodString;
        video_archived_at: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        audio_archived_at: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        transcript_archived_at: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        completions_archived_at: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        source: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        source_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        recording_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        transcript_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        summary: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        conversation_type: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            uuid: z.ZodString;
            slug: z.ZodString;
            active: z.ZodBoolean;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            uuid: z.ZodString;
            slug: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            uuid: z.ZodString;
            slug: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough">>>>;
        deal: z.ZodOptional<z.ZodNullable<z.ZodUnknown>>;
        meeting_event: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodObject<{
            uuid: z.ZodString;
            title: z.ZodNullable<z.ZodString>;
            meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            internal: z.ZodBoolean;
            direction: z.ZodNullable<z.ZodString>;
            start_time: z.ZodNullable<z.ZodString>;
            end_time: z.ZodNullable<z.ZodString>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            uuid: z.ZodString;
            title: z.ZodNullable<z.ZodString>;
            meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            internal: z.ZodBoolean;
            direction: z.ZodNullable<z.ZodString>;
            start_time: z.ZodNullable<z.ZodString>;
            end_time: z.ZodNullable<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            uuid: z.ZodString;
            title: z.ZodNullable<z.ZodString>;
            meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            internal: z.ZodBoolean;
            direction: z.ZodNullable<z.ZodString>;
            start_time: z.ZodNullable<z.ZodString>;
            end_time: z.ZodNullable<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">>, {
            uuid: string;
            title: string | null;
            meetingUrl: string | null;
            meetingProvider: string | null;
            internal: boolean;
            direction: string | null;
            startTime: string | null;
            endTime: string | null;
        }, z.objectInputType<{
            uuid: z.ZodString;
            title: z.ZodNullable<z.ZodString>;
            meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            internal: z.ZodBoolean;
            direction: z.ZodNullable<z.ZodString>;
            start_time: z.ZodNullable<z.ZodString>;
            end_time: z.ZodNullable<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">>>>;
        feedbacks: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
        owner: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough">>>>;
        participating_users: z.ZodOptional<z.ZodArray<z.ZodObject<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough">>, "many">>;
        customer_phone_numbers: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        customer_email_addresses: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        speakers: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
            uuid: z.ZodString;
            index: z.ZodNumber;
            duration: z.ZodNullable<z.ZodNumber>;
            longest_monologue: z.ZodNullable<z.ZodNumber>;
            name: z.ZodString;
            is_user: z.ZodBoolean;
            phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            uuid: z.ZodString;
            index: z.ZodNumber;
            duration: z.ZodNullable<z.ZodNumber>;
            longest_monologue: z.ZodNullable<z.ZodNumber>;
            name: z.ZodString;
            is_user: z.ZodBoolean;
            phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            uuid: z.ZodString;
            index: z.ZodNumber;
            duration: z.ZodNullable<z.ZodNumber>;
            longest_monologue: z.ZodNullable<z.ZodNumber>;
            name: z.ZodString;
            is_user: z.ZodBoolean;
            phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.ZodTypeAny, "passthrough">>, {
            uuid: string;
            index: number;
            duration: number | null;
            longestMonologue: number | null;
            name: string;
            isUser: boolean;
            phoneNumber: string | null;
            emailAddress: string | null;
        }, z.objectInputType<{
            uuid: z.ZodString;
            index: z.ZodNumber;
            duration: z.ZodNullable<z.ZodNumber>;
            longest_monologue: z.ZodNullable<z.ZodNumber>;
            name: z.ZodString;
            is_user: z.ZodBoolean;
            phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.ZodTypeAny, "passthrough">>, "many">>;
        prompts: z.ZodOptional<z.ZodArray<z.ZodObject<{
            uuid: z.ZodString;
            title: z.ZodString;
            category: z.ZodString;
            completions: z.ZodArray<z.ZodString, "many">;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            uuid: z.ZodString;
            title: z.ZodString;
            category: z.ZodString;
            completions: z.ZodArray<z.ZodString, "many">;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            uuid: z.ZodString;
            title: z.ZodString;
            category: z.ZodString;
            completions: z.ZodArray<z.ZodString, "many">;
        }, z.ZodTypeAny, "passthrough">>, "many">>;
        chapters: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
            uuid: z.ZodString;
            index: z.ZodNumber;
            title: z.ZodNullable<z.ZodString>;
            text: z.ZodNullable<z.ZodString>;
            start_time: z.ZodNullable<z.ZodNumber>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            uuid: z.ZodString;
            index: z.ZodNumber;
            title: z.ZodNullable<z.ZodString>;
            text: z.ZodNullable<z.ZodString>;
            start_time: z.ZodNullable<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            uuid: z.ZodString;
            index: z.ZodNumber;
            title: z.ZodNullable<z.ZodString>;
            text: z.ZodNullable<z.ZodString>;
            start_time: z.ZodNullable<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">>, {
            uuid: string;
            index: number;
            title: string | null;
            text: string | null;
            startTime: number | null;
        }, z.objectInputType<{
            uuid: z.ZodString;
            index: z.ZodNumber;
            title: z.ZodNullable<z.ZodString>;
            text: z.ZodNullable<z.ZodString>;
            start_time: z.ZodNullable<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">>, "many">>;
        scorecards: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
        tags: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
        tasks: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
            uuid: z.ZodString;
            active: z.ZodBoolean;
            subject: z.ZodString;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            status: z.ZodString;
            done: z.ZodBoolean;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            uuid: z.ZodString;
            active: z.ZodBoolean;
            subject: z.ZodString;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            status: z.ZodString;
            done: z.ZodBoolean;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            uuid: z.ZodString;
            active: z.ZodBoolean;
            subject: z.ZodString;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            status: z.ZodString;
            done: z.ZodBoolean;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, {
            uuid: string;
            active: boolean;
            subject: string;
            description: string | null;
            status: string;
            done: boolean;
            createdAt: string;
            updatedAt: string;
        }, z.objectInputType<{
            uuid: z.ZodString;
            active: z.ZodBoolean;
            subject: z.ZodString;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            status: z.ZodString;
            done: z.ZodBoolean;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">>;
        simple_transcript: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        performed_at: string;
        updated_at: string;
        uuid: string;
        duration: number | null;
        title: string | null;
        direction: string | null;
        locale: string | null;
        is_video: boolean;
        visible: boolean;
        leexi_url: string;
        description?: string | null | undefined;
        video_archived_at?: string | null | undefined;
        audio_archived_at?: string | null | undefined;
        transcript_archived_at?: string | null | undefined;
        completions_archived_at?: string | null | undefined;
        source?: string | null | undefined;
        source_id?: string | null | undefined;
        recording_url?: string | null | undefined;
        transcript_url?: string | null | undefined;
        summary?: string | null | undefined;
        conversation_type?: z.objectOutputType<{
            uuid: z.ZodString;
            slug: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough"> | null | undefined;
        deal?: unknown;
        meeting_event?: {
            uuid: string;
            title: string | null;
            meetingUrl: string | null;
            meetingProvider: string | null;
            internal: boolean;
            direction: string | null;
            startTime: string | null;
            endTime: string | null;
        } | null | undefined;
        feedbacks?: unknown[] | undefined;
        owner?: z.objectOutputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough"> | null | undefined;
        participating_users?: z.objectOutputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        customer_phone_numbers?: string[] | undefined;
        customer_email_addresses?: string[] | undefined;
        speakers?: {
            uuid: string;
            index: number;
            duration: number | null;
            longestMonologue: number | null;
            name: string;
            isUser: boolean;
            phoneNumber: string | null;
            emailAddress: string | null;
        }[] | undefined;
        prompts?: z.objectOutputType<{
            uuid: z.ZodString;
            title: z.ZodString;
            category: z.ZodString;
            completions: z.ZodArray<z.ZodString, "many">;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        chapters?: {
            uuid: string;
            index: number;
            title: string | null;
            text: string | null;
            startTime: number | null;
        }[] | undefined;
        scorecards?: unknown[] | undefined;
        tags?: unknown[] | undefined;
        tasks?: {
            uuid: string;
            active: boolean;
            subject: string;
            description: string | null;
            status: string;
            done: boolean;
            createdAt: string;
            updatedAt: string;
        }[] | undefined;
        simple_transcript?: string | null | undefined;
    }, {
        created_at: string;
        performed_at: string;
        updated_at: string;
        uuid: string;
        duration: number | null;
        title: string | null;
        direction: string | null;
        locale: string | null;
        is_video: boolean;
        visible: boolean;
        leexi_url: string;
        description?: string | null | undefined;
        video_archived_at?: string | null | undefined;
        audio_archived_at?: string | null | undefined;
        transcript_archived_at?: string | null | undefined;
        completions_archived_at?: string | null | undefined;
        source?: string | null | undefined;
        source_id?: string | null | undefined;
        recording_url?: string | null | undefined;
        transcript_url?: string | null | undefined;
        summary?: string | null | undefined;
        conversation_type?: z.objectInputType<{
            uuid: z.ZodString;
            slug: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough"> | null | undefined;
        deal?: unknown;
        meeting_event?: z.objectInputType<{
            uuid: z.ZodString;
            title: z.ZodNullable<z.ZodString>;
            meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            internal: z.ZodBoolean;
            direction: z.ZodNullable<z.ZodString>;
            start_time: z.ZodNullable<z.ZodString>;
            end_time: z.ZodNullable<z.ZodString>;
        }, z.ZodTypeAny, "passthrough"> | null | undefined;
        feedbacks?: unknown[] | undefined;
        owner?: z.objectInputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough"> | null | undefined;
        participating_users?: z.objectInputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        customer_phone_numbers?: string[] | undefined;
        customer_email_addresses?: string[] | undefined;
        speakers?: z.objectInputType<{
            uuid: z.ZodString;
            index: z.ZodNumber;
            duration: z.ZodNullable<z.ZodNumber>;
            longest_monologue: z.ZodNullable<z.ZodNumber>;
            name: z.ZodString;
            is_user: z.ZodBoolean;
            phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        prompts?: z.objectInputType<{
            uuid: z.ZodString;
            title: z.ZodString;
            category: z.ZodString;
            completions: z.ZodArray<z.ZodString, "many">;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        chapters?: z.objectInputType<{
            uuid: z.ZodString;
            index: z.ZodNumber;
            title: z.ZodNullable<z.ZodString>;
            text: z.ZodNullable<z.ZodString>;
            start_time: z.ZodNullable<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        scorecards?: unknown[] | undefined;
        tags?: unknown[] | undefined;
        tasks?: z.objectInputType<{
            uuid: z.ZodString;
            active: z.ZodBoolean;
            subject: z.ZodString;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            status: z.ZodString;
            done: z.ZodBoolean;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        simple_transcript?: string | null | undefined;
    }>, {
        uuid: string;
        locale: string | null;
        duration: number | null;
        direction: string | null;
        isVideo: boolean;
        visible: boolean;
        title: string | null;
        description: string | null;
        createdAt: string;
        updatedAt: string;
        performedAt: string;
        leexiUrl: string;
        videoArchivedAt: string | null;
        audioArchivedAt: string | null;
        transcriptArchivedAt: string | null;
        completionsArchivedAt: string | null;
        source: string | null;
        sourceId: string | null;
        recordingUrl: string | null;
        transcriptUrl: string | null;
        summary: string | null;
        conversationType: z.objectOutputType<{
            uuid: z.ZodString;
            slug: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough"> | null;
        deal: {} | null;
        meetingEvent: {
            uuid: string;
            title: string | null;
            meetingUrl: string | null;
            meetingProvider: string | null;
            internal: boolean;
            direction: string | null;
            startTime: string | null;
            endTime: string | null;
        } | null;
        feedbacks: unknown[];
        owner: z.objectOutputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough"> | null;
        participatingUsers: z.objectOutputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough">[];
        customerPhoneNumbers: string[];
        customerEmailAddresses: string[];
        speakers: {
            uuid: string;
            index: number;
            duration: number | null;
            longestMonologue: number | null;
            name: string;
            isUser: boolean;
            phoneNumber: string | null;
            emailAddress: string | null;
        }[];
        prompts: z.objectOutputType<{
            uuid: z.ZodString;
            title: z.ZodString;
            category: z.ZodString;
            completions: z.ZodArray<z.ZodString, "many">;
        }, z.ZodTypeAny, "passthrough">[];
        chapters: {
            uuid: string;
            index: number;
            title: string | null;
            text: string | null;
            startTime: number | null;
        }[];
        scorecards: unknown[];
        tags: unknown[];
        tasks: {
            uuid: string;
            active: boolean;
            subject: string;
            description: string | null;
            status: string;
            done: boolean;
            createdAt: string;
            updatedAt: string;
        }[];
        simpleTranscript: string;
    }, {
        created_at: string;
        performed_at: string;
        updated_at: string;
        uuid: string;
        duration: number | null;
        title: string | null;
        direction: string | null;
        locale: string | null;
        is_video: boolean;
        visible: boolean;
        leexi_url: string;
        description?: string | null | undefined;
        video_archived_at?: string | null | undefined;
        audio_archived_at?: string | null | undefined;
        transcript_archived_at?: string | null | undefined;
        completions_archived_at?: string | null | undefined;
        source?: string | null | undefined;
        source_id?: string | null | undefined;
        recording_url?: string | null | undefined;
        transcript_url?: string | null | undefined;
        summary?: string | null | undefined;
        conversation_type?: z.objectInputType<{
            uuid: z.ZodString;
            slug: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough"> | null | undefined;
        deal?: unknown;
        meeting_event?: z.objectInputType<{
            uuid: z.ZodString;
            title: z.ZodNullable<z.ZodString>;
            meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            internal: z.ZodBoolean;
            direction: z.ZodNullable<z.ZodString>;
            start_time: z.ZodNullable<z.ZodString>;
            end_time: z.ZodNullable<z.ZodString>;
        }, z.ZodTypeAny, "passthrough"> | null | undefined;
        feedbacks?: unknown[] | undefined;
        owner?: z.objectInputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough"> | null | undefined;
        participating_users?: z.objectInputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        customer_phone_numbers?: string[] | undefined;
        customer_email_addresses?: string[] | undefined;
        speakers?: z.objectInputType<{
            uuid: z.ZodString;
            index: z.ZodNumber;
            duration: z.ZodNullable<z.ZodNumber>;
            longest_monologue: z.ZodNullable<z.ZodNumber>;
            name: z.ZodString;
            is_user: z.ZodBoolean;
            phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        prompts?: z.objectInputType<{
            uuid: z.ZodString;
            title: z.ZodString;
            category: z.ZodString;
            completions: z.ZodArray<z.ZodString, "many">;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        chapters?: z.objectInputType<{
            uuid: z.ZodString;
            index: z.ZodNumber;
            title: z.ZodNullable<z.ZodString>;
            text: z.ZodNullable<z.ZodString>;
            start_time: z.ZodNullable<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        scorecards?: unknown[] | undefined;
        tags?: unknown[] | undefined;
        tasks?: z.objectInputType<{
            uuid: z.ZodString;
            active: z.ZodBoolean;
            subject: z.ZodString;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            status: z.ZodString;
            done: z.ZodBoolean;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        simple_transcript?: string | null | undefined;
    }>, "many">;
    pagination: z.ZodObject<{
        page: z.ZodNumber;
        items: z.ZodNumber;
        count: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        items: number;
        page: number;
        count: number;
    }, {
        items: number;
        page: number;
        count: number;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        uuid: string;
        locale: string | null;
        duration: number | null;
        direction: string | null;
        isVideo: boolean;
        visible: boolean;
        title: string | null;
        description: string | null;
        createdAt: string;
        updatedAt: string;
        performedAt: string;
        leexiUrl: string;
        videoArchivedAt: string | null;
        audioArchivedAt: string | null;
        transcriptArchivedAt: string | null;
        completionsArchivedAt: string | null;
        source: string | null;
        sourceId: string | null;
        recordingUrl: string | null;
        transcriptUrl: string | null;
        summary: string | null;
        conversationType: z.objectOutputType<{
            uuid: z.ZodString;
            slug: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough"> | null;
        deal: {} | null;
        meetingEvent: {
            uuid: string;
            title: string | null;
            meetingUrl: string | null;
            meetingProvider: string | null;
            internal: boolean;
            direction: string | null;
            startTime: string | null;
            endTime: string | null;
        } | null;
        feedbacks: unknown[];
        owner: z.objectOutputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough"> | null;
        participatingUsers: z.objectOutputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough">[];
        customerPhoneNumbers: string[];
        customerEmailAddresses: string[];
        speakers: {
            uuid: string;
            index: number;
            duration: number | null;
            longestMonologue: number | null;
            name: string;
            isUser: boolean;
            phoneNumber: string | null;
            emailAddress: string | null;
        }[];
        prompts: z.objectOutputType<{
            uuid: z.ZodString;
            title: z.ZodString;
            category: z.ZodString;
            completions: z.ZodArray<z.ZodString, "many">;
        }, z.ZodTypeAny, "passthrough">[];
        chapters: {
            uuid: string;
            index: number;
            title: string | null;
            text: string | null;
            startTime: number | null;
        }[];
        scorecards: unknown[];
        tags: unknown[];
        tasks: {
            uuid: string;
            active: boolean;
            subject: string;
            description: string | null;
            status: string;
            done: boolean;
            createdAt: string;
            updatedAt: string;
        }[];
        simpleTranscript: string;
    }[];
    pagination: {
        items: number;
        page: number;
        count: number;
    };
}, {
    data: {
        created_at: string;
        performed_at: string;
        updated_at: string;
        uuid: string;
        duration: number | null;
        title: string | null;
        direction: string | null;
        locale: string | null;
        is_video: boolean;
        visible: boolean;
        leexi_url: string;
        description?: string | null | undefined;
        video_archived_at?: string | null | undefined;
        audio_archived_at?: string | null | undefined;
        transcript_archived_at?: string | null | undefined;
        completions_archived_at?: string | null | undefined;
        source?: string | null | undefined;
        source_id?: string | null | undefined;
        recording_url?: string | null | undefined;
        transcript_url?: string | null | undefined;
        summary?: string | null | undefined;
        conversation_type?: z.objectInputType<{
            uuid: z.ZodString;
            slug: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough"> | null | undefined;
        deal?: unknown;
        meeting_event?: z.objectInputType<{
            uuid: z.ZodString;
            title: z.ZodNullable<z.ZodString>;
            meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            internal: z.ZodBoolean;
            direction: z.ZodNullable<z.ZodString>;
            start_time: z.ZodNullable<z.ZodString>;
            end_time: z.ZodNullable<z.ZodString>;
        }, z.ZodTypeAny, "passthrough"> | null | undefined;
        feedbacks?: unknown[] | undefined;
        owner?: z.objectInputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough"> | null | undefined;
        participating_users?: z.objectInputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        customer_phone_numbers?: string[] | undefined;
        customer_email_addresses?: string[] | undefined;
        speakers?: z.objectInputType<{
            uuid: z.ZodString;
            index: z.ZodNumber;
            duration: z.ZodNullable<z.ZodNumber>;
            longest_monologue: z.ZodNullable<z.ZodNumber>;
            name: z.ZodString;
            is_user: z.ZodBoolean;
            phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        prompts?: z.objectInputType<{
            uuid: z.ZodString;
            title: z.ZodString;
            category: z.ZodString;
            completions: z.ZodArray<z.ZodString, "many">;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        chapters?: z.objectInputType<{
            uuid: z.ZodString;
            index: z.ZodNumber;
            title: z.ZodNullable<z.ZodString>;
            text: z.ZodNullable<z.ZodString>;
            start_time: z.ZodNullable<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        scorecards?: unknown[] | undefined;
        tags?: unknown[] | undefined;
        tasks?: z.objectInputType<{
            uuid: z.ZodString;
            active: z.ZodBoolean;
            subject: z.ZodString;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            status: z.ZodString;
            done: z.ZodBoolean;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        simple_transcript?: string | null | undefined;
    }[];
    pagination: {
        items: number;
        page: number;
        count: number;
    };
}>;
export type CallsListResponse = z.infer<typeof CallsListResponseSchema>;
/** Response shape for GET /v1/calls/{uuid} */
export declare const CallDetailResponseSchema: z.ZodObject<{
    data: z.ZodEffects<z.ZodObject<{
        uuid: z.ZodString;
        locale: z.ZodNullable<z.ZodString>;
        duration: z.ZodNullable<z.ZodNumber>;
        direction: z.ZodNullable<z.ZodString>;
        is_video: z.ZodBoolean;
        visible: z.ZodBoolean;
        title: z.ZodNullable<z.ZodString>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        created_at: z.ZodString;
        updated_at: z.ZodString;
        performed_at: z.ZodString;
        leexi_url: z.ZodString;
        video_archived_at: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        audio_archived_at: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        transcript_archived_at: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        completions_archived_at: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        source: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        source_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        recording_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        transcript_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        summary: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        conversation_type: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            uuid: z.ZodString;
            slug: z.ZodString;
            active: z.ZodBoolean;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            uuid: z.ZodString;
            slug: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            uuid: z.ZodString;
            slug: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough">>>>;
        deal: z.ZodOptional<z.ZodNullable<z.ZodUnknown>>;
        meeting_event: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodObject<{
            uuid: z.ZodString;
            title: z.ZodNullable<z.ZodString>;
            meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            internal: z.ZodBoolean;
            direction: z.ZodNullable<z.ZodString>;
            start_time: z.ZodNullable<z.ZodString>;
            end_time: z.ZodNullable<z.ZodString>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            uuid: z.ZodString;
            title: z.ZodNullable<z.ZodString>;
            meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            internal: z.ZodBoolean;
            direction: z.ZodNullable<z.ZodString>;
            start_time: z.ZodNullable<z.ZodString>;
            end_time: z.ZodNullable<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            uuid: z.ZodString;
            title: z.ZodNullable<z.ZodString>;
            meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            internal: z.ZodBoolean;
            direction: z.ZodNullable<z.ZodString>;
            start_time: z.ZodNullable<z.ZodString>;
            end_time: z.ZodNullable<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">>, {
            uuid: string;
            title: string | null;
            meetingUrl: string | null;
            meetingProvider: string | null;
            internal: boolean;
            direction: string | null;
            startTime: string | null;
            endTime: string | null;
        }, z.objectInputType<{
            uuid: z.ZodString;
            title: z.ZodNullable<z.ZodString>;
            meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            internal: z.ZodBoolean;
            direction: z.ZodNullable<z.ZodString>;
            start_time: z.ZodNullable<z.ZodString>;
            end_time: z.ZodNullable<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">>>>;
        feedbacks: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
        owner: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough">>>>;
        participating_users: z.ZodOptional<z.ZodArray<z.ZodObject<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough">>, "many">>;
        customer_phone_numbers: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        customer_email_addresses: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        speakers: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
            uuid: z.ZodString;
            index: z.ZodNumber;
            duration: z.ZodNullable<z.ZodNumber>;
            longest_monologue: z.ZodNullable<z.ZodNumber>;
            name: z.ZodString;
            is_user: z.ZodBoolean;
            phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            uuid: z.ZodString;
            index: z.ZodNumber;
            duration: z.ZodNullable<z.ZodNumber>;
            longest_monologue: z.ZodNullable<z.ZodNumber>;
            name: z.ZodString;
            is_user: z.ZodBoolean;
            phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            uuid: z.ZodString;
            index: z.ZodNumber;
            duration: z.ZodNullable<z.ZodNumber>;
            longest_monologue: z.ZodNullable<z.ZodNumber>;
            name: z.ZodString;
            is_user: z.ZodBoolean;
            phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.ZodTypeAny, "passthrough">>, {
            uuid: string;
            index: number;
            duration: number | null;
            longestMonologue: number | null;
            name: string;
            isUser: boolean;
            phoneNumber: string | null;
            emailAddress: string | null;
        }, z.objectInputType<{
            uuid: z.ZodString;
            index: z.ZodNumber;
            duration: z.ZodNullable<z.ZodNumber>;
            longest_monologue: z.ZodNullable<z.ZodNumber>;
            name: z.ZodString;
            is_user: z.ZodBoolean;
            phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.ZodTypeAny, "passthrough">>, "many">>;
        prompts: z.ZodOptional<z.ZodArray<z.ZodObject<{
            uuid: z.ZodString;
            title: z.ZodString;
            category: z.ZodString;
            completions: z.ZodArray<z.ZodString, "many">;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            uuid: z.ZodString;
            title: z.ZodString;
            category: z.ZodString;
            completions: z.ZodArray<z.ZodString, "many">;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            uuid: z.ZodString;
            title: z.ZodString;
            category: z.ZodString;
            completions: z.ZodArray<z.ZodString, "many">;
        }, z.ZodTypeAny, "passthrough">>, "many">>;
        chapters: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
            uuid: z.ZodString;
            index: z.ZodNumber;
            title: z.ZodNullable<z.ZodString>;
            text: z.ZodNullable<z.ZodString>;
            start_time: z.ZodNullable<z.ZodNumber>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            uuid: z.ZodString;
            index: z.ZodNumber;
            title: z.ZodNullable<z.ZodString>;
            text: z.ZodNullable<z.ZodString>;
            start_time: z.ZodNullable<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            uuid: z.ZodString;
            index: z.ZodNumber;
            title: z.ZodNullable<z.ZodString>;
            text: z.ZodNullable<z.ZodString>;
            start_time: z.ZodNullable<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">>, {
            uuid: string;
            index: number;
            title: string | null;
            text: string | null;
            startTime: number | null;
        }, z.objectInputType<{
            uuid: z.ZodString;
            index: z.ZodNumber;
            title: z.ZodNullable<z.ZodString>;
            text: z.ZodNullable<z.ZodString>;
            start_time: z.ZodNullable<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">>, "many">>;
        scorecards: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
        tags: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
        tasks: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
            uuid: z.ZodString;
            active: z.ZodBoolean;
            subject: z.ZodString;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            status: z.ZodString;
            done: z.ZodBoolean;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            uuid: z.ZodString;
            active: z.ZodBoolean;
            subject: z.ZodString;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            status: z.ZodString;
            done: z.ZodBoolean;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            uuid: z.ZodString;
            active: z.ZodBoolean;
            subject: z.ZodString;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            status: z.ZodString;
            done: z.ZodBoolean;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, {
            uuid: string;
            active: boolean;
            subject: string;
            description: string | null;
            status: string;
            done: boolean;
            createdAt: string;
            updatedAt: string;
        }, z.objectInputType<{
            uuid: z.ZodString;
            active: z.ZodBoolean;
            subject: z.ZodString;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            status: z.ZodString;
            done: z.ZodBoolean;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">>;
        simple_transcript: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        call_topics: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodObject<{
            uuid: z.ZodString;
            start_time: z.ZodNumber;
            end_time: z.ZodNumber;
            keyphrase: z.ZodString;
            topic_name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            uuid: z.ZodString;
            start_time: z.ZodNumber;
            end_time: z.ZodNumber;
            keyphrase: z.ZodString;
            topic_name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            uuid: z.ZodString;
            start_time: z.ZodNumber;
            end_time: z.ZodNumber;
            keyphrase: z.ZodString;
            topic_name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, {
            uuid: string;
            startTime: number;
            endTime: number;
            keyphrase: string;
            topicName: string;
        }, z.objectInputType<{
            uuid: z.ZodString;
            start_time: z.ZodNumber;
            end_time: z.ZodNumber;
            keyphrase: z.ZodString;
            topic_name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">>>;
        transcript: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodObject<{
            speaker_index: z.ZodNumber;
            start_time: z.ZodNumber;
            end_time: z.ZodNumber;
            items: z.ZodArray<z.ZodEffects<z.ZodObject<{
                start_time: z.ZodNumber;
                end_time: z.ZodNumber;
                content: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                start_time: z.ZodNumber;
                end_time: z.ZodNumber;
                content: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                start_time: z.ZodNumber;
                end_time: z.ZodNumber;
                content: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>, {
                startTime: number;
                endTime: number;
                content: string;
            }, z.objectInputType<{
                start_time: z.ZodNumber;
                end_time: z.ZodNumber;
                content: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>, "many">;
        }, "strip", z.ZodTypeAny, {
            items: {
                startTime: number;
                endTime: number;
                content: string;
            }[];
            start_time: number;
            end_time: number;
            speaker_index: number;
        }, {
            items: z.objectInputType<{
                start_time: z.ZodNumber;
                end_time: z.ZodNumber;
                content: z.ZodString;
            }, z.ZodTypeAny, "passthrough">[];
            start_time: number;
            end_time: number;
            speaker_index: number;
        }>, {
            speakerIndex: number;
            startTime: number;
            endTime: number;
            items: {
                startTime: number;
                endTime: number;
                content: string;
            }[];
        }, {
            items: z.objectInputType<{
                start_time: z.ZodNumber;
                end_time: z.ZodNumber;
                content: z.ZodString;
            }, z.ZodTypeAny, "passthrough">[];
            start_time: number;
            end_time: number;
            speaker_index: number;
        }>, "many">>>;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        performed_at: string;
        updated_at: string;
        uuid: string;
        duration: number | null;
        title: string | null;
        direction: string | null;
        locale: string | null;
        is_video: boolean;
        visible: boolean;
        leexi_url: string;
        description?: string | null | undefined;
        video_archived_at?: string | null | undefined;
        audio_archived_at?: string | null | undefined;
        transcript_archived_at?: string | null | undefined;
        completions_archived_at?: string | null | undefined;
        source?: string | null | undefined;
        source_id?: string | null | undefined;
        recording_url?: string | null | undefined;
        transcript_url?: string | null | undefined;
        summary?: string | null | undefined;
        conversation_type?: z.objectOutputType<{
            uuid: z.ZodString;
            slug: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough"> | null | undefined;
        deal?: unknown;
        meeting_event?: {
            uuid: string;
            title: string | null;
            meetingUrl: string | null;
            meetingProvider: string | null;
            internal: boolean;
            direction: string | null;
            startTime: string | null;
            endTime: string | null;
        } | null | undefined;
        feedbacks?: unknown[] | undefined;
        owner?: z.objectOutputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough"> | null | undefined;
        participating_users?: z.objectOutputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        customer_phone_numbers?: string[] | undefined;
        customer_email_addresses?: string[] | undefined;
        speakers?: {
            uuid: string;
            index: number;
            duration: number | null;
            longestMonologue: number | null;
            name: string;
            isUser: boolean;
            phoneNumber: string | null;
            emailAddress: string | null;
        }[] | undefined;
        prompts?: z.objectOutputType<{
            uuid: z.ZodString;
            title: z.ZodString;
            category: z.ZodString;
            completions: z.ZodArray<z.ZodString, "many">;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        chapters?: {
            uuid: string;
            index: number;
            title: string | null;
            text: string | null;
            startTime: number | null;
        }[] | undefined;
        scorecards?: unknown[] | undefined;
        tags?: unknown[] | undefined;
        tasks?: {
            uuid: string;
            active: boolean;
            subject: string;
            description: string | null;
            status: string;
            done: boolean;
            createdAt: string;
            updatedAt: string;
        }[] | undefined;
        simple_transcript?: string | null | undefined;
        call_topics?: {
            uuid: string;
            startTime: number;
            endTime: number;
            keyphrase: string;
            topicName: string;
        }[] | null | undefined;
        transcript?: {
            speakerIndex: number;
            startTime: number;
            endTime: number;
            items: {
                startTime: number;
                endTime: number;
                content: string;
            }[];
        }[] | null | undefined;
    }, {
        created_at: string;
        performed_at: string;
        updated_at: string;
        uuid: string;
        duration: number | null;
        title: string | null;
        direction: string | null;
        locale: string | null;
        is_video: boolean;
        visible: boolean;
        leexi_url: string;
        description?: string | null | undefined;
        video_archived_at?: string | null | undefined;
        audio_archived_at?: string | null | undefined;
        transcript_archived_at?: string | null | undefined;
        completions_archived_at?: string | null | undefined;
        source?: string | null | undefined;
        source_id?: string | null | undefined;
        recording_url?: string | null | undefined;
        transcript_url?: string | null | undefined;
        summary?: string | null | undefined;
        conversation_type?: z.objectInputType<{
            uuid: z.ZodString;
            slug: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough"> | null | undefined;
        deal?: unknown;
        meeting_event?: z.objectInputType<{
            uuid: z.ZodString;
            title: z.ZodNullable<z.ZodString>;
            meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            internal: z.ZodBoolean;
            direction: z.ZodNullable<z.ZodString>;
            start_time: z.ZodNullable<z.ZodString>;
            end_time: z.ZodNullable<z.ZodString>;
        }, z.ZodTypeAny, "passthrough"> | null | undefined;
        feedbacks?: unknown[] | undefined;
        owner?: z.objectInputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough"> | null | undefined;
        participating_users?: z.objectInputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        customer_phone_numbers?: string[] | undefined;
        customer_email_addresses?: string[] | undefined;
        speakers?: z.objectInputType<{
            uuid: z.ZodString;
            index: z.ZodNumber;
            duration: z.ZodNullable<z.ZodNumber>;
            longest_monologue: z.ZodNullable<z.ZodNumber>;
            name: z.ZodString;
            is_user: z.ZodBoolean;
            phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        prompts?: z.objectInputType<{
            uuid: z.ZodString;
            title: z.ZodString;
            category: z.ZodString;
            completions: z.ZodArray<z.ZodString, "many">;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        chapters?: z.objectInputType<{
            uuid: z.ZodString;
            index: z.ZodNumber;
            title: z.ZodNullable<z.ZodString>;
            text: z.ZodNullable<z.ZodString>;
            start_time: z.ZodNullable<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        scorecards?: unknown[] | undefined;
        tags?: unknown[] | undefined;
        tasks?: z.objectInputType<{
            uuid: z.ZodString;
            active: z.ZodBoolean;
            subject: z.ZodString;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            status: z.ZodString;
            done: z.ZodBoolean;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        simple_transcript?: string | null | undefined;
        call_topics?: z.objectInputType<{
            uuid: z.ZodString;
            start_time: z.ZodNumber;
            end_time: z.ZodNumber;
            keyphrase: z.ZodString;
            topic_name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">[] | null | undefined;
        transcript?: {
            items: z.objectInputType<{
                start_time: z.ZodNumber;
                end_time: z.ZodNumber;
                content: z.ZodString;
            }, z.ZodTypeAny, "passthrough">[];
            start_time: number;
            end_time: number;
            speaker_index: number;
        }[] | null | undefined;
    }>, {
        uuid: string;
        locale: string | null;
        duration: number | null;
        direction: string | null;
        isVideo: boolean;
        visible: boolean;
        title: string | null;
        description: string | null;
        createdAt: string;
        updatedAt: string;
        performedAt: string;
        leexiUrl: string;
        videoArchivedAt: string | null;
        audioArchivedAt: string | null;
        transcriptArchivedAt: string | null;
        completionsArchivedAt: string | null;
        source: string | null;
        sourceId: string | null;
        recordingUrl: string | null;
        transcriptUrl: string | null;
        summary: string | null;
        conversationType: z.objectOutputType<{
            uuid: z.ZodString;
            slug: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough"> | null;
        deal: {} | null;
        meetingEvent: {
            uuid: string;
            title: string | null;
            meetingUrl: string | null;
            meetingProvider: string | null;
            internal: boolean;
            direction: string | null;
            startTime: string | null;
            endTime: string | null;
        } | null;
        feedbacks: unknown[];
        owner: z.objectOutputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough"> | null;
        participatingUsers: z.objectOutputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough">[];
        customerPhoneNumbers: string[];
        customerEmailAddresses: string[];
        speakers: {
            uuid: string;
            index: number;
            duration: number | null;
            longestMonologue: number | null;
            name: string;
            isUser: boolean;
            phoneNumber: string | null;
            emailAddress: string | null;
        }[];
        prompts: z.objectOutputType<{
            uuid: z.ZodString;
            title: z.ZodString;
            category: z.ZodString;
            completions: z.ZodArray<z.ZodString, "many">;
        }, z.ZodTypeAny, "passthrough">[];
        chapters: {
            uuid: string;
            index: number;
            title: string | null;
            text: string | null;
            startTime: number | null;
        }[];
        scorecards: unknown[];
        tags: unknown[];
        tasks: {
            uuid: string;
            active: boolean;
            subject: string;
            description: string | null;
            status: string;
            done: boolean;
            createdAt: string;
            updatedAt: string;
        }[];
        simpleTranscript: string;
        callTopics: {
            uuid: string;
            startTime: number;
            endTime: number;
            keyphrase: string;
            topicName: string;
        }[];
        transcript: {
            speakerIndex: number;
            startTime: number;
            endTime: number;
            items: {
                startTime: number;
                endTime: number;
                content: string;
            }[];
        }[];
    }, {
        created_at: string;
        performed_at: string;
        updated_at: string;
        uuid: string;
        duration: number | null;
        title: string | null;
        direction: string | null;
        locale: string | null;
        is_video: boolean;
        visible: boolean;
        leexi_url: string;
        description?: string | null | undefined;
        video_archived_at?: string | null | undefined;
        audio_archived_at?: string | null | undefined;
        transcript_archived_at?: string | null | undefined;
        completions_archived_at?: string | null | undefined;
        source?: string | null | undefined;
        source_id?: string | null | undefined;
        recording_url?: string | null | undefined;
        transcript_url?: string | null | undefined;
        summary?: string | null | undefined;
        conversation_type?: z.objectInputType<{
            uuid: z.ZodString;
            slug: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough"> | null | undefined;
        deal?: unknown;
        meeting_event?: z.objectInputType<{
            uuid: z.ZodString;
            title: z.ZodNullable<z.ZodString>;
            meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            internal: z.ZodBoolean;
            direction: z.ZodNullable<z.ZodString>;
            start_time: z.ZodNullable<z.ZodString>;
            end_time: z.ZodNullable<z.ZodString>;
        }, z.ZodTypeAny, "passthrough"> | null | undefined;
        feedbacks?: unknown[] | undefined;
        owner?: z.objectInputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough"> | null | undefined;
        participating_users?: z.objectInputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        customer_phone_numbers?: string[] | undefined;
        customer_email_addresses?: string[] | undefined;
        speakers?: z.objectInputType<{
            uuid: z.ZodString;
            index: z.ZodNumber;
            duration: z.ZodNullable<z.ZodNumber>;
            longest_monologue: z.ZodNullable<z.ZodNumber>;
            name: z.ZodString;
            is_user: z.ZodBoolean;
            phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        prompts?: z.objectInputType<{
            uuid: z.ZodString;
            title: z.ZodString;
            category: z.ZodString;
            completions: z.ZodArray<z.ZodString, "many">;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        chapters?: z.objectInputType<{
            uuid: z.ZodString;
            index: z.ZodNumber;
            title: z.ZodNullable<z.ZodString>;
            text: z.ZodNullable<z.ZodString>;
            start_time: z.ZodNullable<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        scorecards?: unknown[] | undefined;
        tags?: unknown[] | undefined;
        tasks?: z.objectInputType<{
            uuid: z.ZodString;
            active: z.ZodBoolean;
            subject: z.ZodString;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            status: z.ZodString;
            done: z.ZodBoolean;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        simple_transcript?: string | null | undefined;
        call_topics?: z.objectInputType<{
            uuid: z.ZodString;
            start_time: z.ZodNumber;
            end_time: z.ZodNumber;
            keyphrase: z.ZodString;
            topic_name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">[] | null | undefined;
        transcript?: {
            items: z.objectInputType<{
                start_time: z.ZodNumber;
                end_time: z.ZodNumber;
                content: z.ZodString;
            }, z.ZodTypeAny, "passthrough">[];
            start_time: number;
            end_time: number;
            speaker_index: number;
        }[] | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        uuid: string;
        locale: string | null;
        duration: number | null;
        direction: string | null;
        isVideo: boolean;
        visible: boolean;
        title: string | null;
        description: string | null;
        createdAt: string;
        updatedAt: string;
        performedAt: string;
        leexiUrl: string;
        videoArchivedAt: string | null;
        audioArchivedAt: string | null;
        transcriptArchivedAt: string | null;
        completionsArchivedAt: string | null;
        source: string | null;
        sourceId: string | null;
        recordingUrl: string | null;
        transcriptUrl: string | null;
        summary: string | null;
        conversationType: z.objectOutputType<{
            uuid: z.ZodString;
            slug: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough"> | null;
        deal: {} | null;
        meetingEvent: {
            uuid: string;
            title: string | null;
            meetingUrl: string | null;
            meetingProvider: string | null;
            internal: boolean;
            direction: string | null;
            startTime: string | null;
            endTime: string | null;
        } | null;
        feedbacks: unknown[];
        owner: z.objectOutputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough"> | null;
        participatingUsers: z.objectOutputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough">[];
        customerPhoneNumbers: string[];
        customerEmailAddresses: string[];
        speakers: {
            uuid: string;
            index: number;
            duration: number | null;
            longestMonologue: number | null;
            name: string;
            isUser: boolean;
            phoneNumber: string | null;
            emailAddress: string | null;
        }[];
        prompts: z.objectOutputType<{
            uuid: z.ZodString;
            title: z.ZodString;
            category: z.ZodString;
            completions: z.ZodArray<z.ZodString, "many">;
        }, z.ZodTypeAny, "passthrough">[];
        chapters: {
            uuid: string;
            index: number;
            title: string | null;
            text: string | null;
            startTime: number | null;
        }[];
        scorecards: unknown[];
        tags: unknown[];
        tasks: {
            uuid: string;
            active: boolean;
            subject: string;
            description: string | null;
            status: string;
            done: boolean;
            createdAt: string;
            updatedAt: string;
        }[];
        simpleTranscript: string;
        callTopics: {
            uuid: string;
            startTime: number;
            endTime: number;
            keyphrase: string;
            topicName: string;
        }[];
        transcript: {
            speakerIndex: number;
            startTime: number;
            endTime: number;
            items: {
                startTime: number;
                endTime: number;
                content: string;
            }[];
        }[];
    };
}, {
    data: {
        created_at: string;
        performed_at: string;
        updated_at: string;
        uuid: string;
        duration: number | null;
        title: string | null;
        direction: string | null;
        locale: string | null;
        is_video: boolean;
        visible: boolean;
        leexi_url: string;
        description?: string | null | undefined;
        video_archived_at?: string | null | undefined;
        audio_archived_at?: string | null | undefined;
        transcript_archived_at?: string | null | undefined;
        completions_archived_at?: string | null | undefined;
        source?: string | null | undefined;
        source_id?: string | null | undefined;
        recording_url?: string | null | undefined;
        transcript_url?: string | null | undefined;
        summary?: string | null | undefined;
        conversation_type?: z.objectInputType<{
            uuid: z.ZodString;
            slug: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough"> | null | undefined;
        deal?: unknown;
        meeting_event?: z.objectInputType<{
            uuid: z.ZodString;
            title: z.ZodNullable<z.ZodString>;
            meeting_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            meeting_provider: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            internal: z.ZodBoolean;
            direction: z.ZodNullable<z.ZodString>;
            start_time: z.ZodNullable<z.ZodString>;
            end_time: z.ZodNullable<z.ZodString>;
        }, z.ZodTypeAny, "passthrough"> | null | undefined;
        feedbacks?: unknown[] | undefined;
        owner?: z.objectInputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough"> | null | undefined;
        participating_users?: z.objectInputType<{
            uuid: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            active: z.ZodBoolean;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        customer_phone_numbers?: string[] | undefined;
        customer_email_addresses?: string[] | undefined;
        speakers?: z.objectInputType<{
            uuid: z.ZodString;
            index: z.ZodNumber;
            duration: z.ZodNullable<z.ZodNumber>;
            longest_monologue: z.ZodNullable<z.ZodNumber>;
            name: z.ZodString;
            is_user: z.ZodBoolean;
            phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            email_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        prompts?: z.objectInputType<{
            uuid: z.ZodString;
            title: z.ZodString;
            category: z.ZodString;
            completions: z.ZodArray<z.ZodString, "many">;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        chapters?: z.objectInputType<{
            uuid: z.ZodString;
            index: z.ZodNumber;
            title: z.ZodNullable<z.ZodString>;
            text: z.ZodNullable<z.ZodString>;
            start_time: z.ZodNullable<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        scorecards?: unknown[] | undefined;
        tags?: unknown[] | undefined;
        tasks?: z.objectInputType<{
            uuid: z.ZodString;
            active: z.ZodBoolean;
            subject: z.ZodString;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            status: z.ZodString;
            done: z.ZodBoolean;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        simple_transcript?: string | null | undefined;
        call_topics?: z.objectInputType<{
            uuid: z.ZodString;
            start_time: z.ZodNumber;
            end_time: z.ZodNumber;
            keyphrase: z.ZodString;
            topic_name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">[] | null | undefined;
        transcript?: {
            items: z.objectInputType<{
                start_time: z.ZodNumber;
                end_time: z.ZodNumber;
                content: z.ZodString;
            }, z.ZodTypeAny, "passthrough">[];
            start_time: number;
            end_time: number;
            speaker_index: number;
        }[] | null | undefined;
    };
}>;
export type CallDetailResponse = z.infer<typeof CallDetailResponseSchema>;
