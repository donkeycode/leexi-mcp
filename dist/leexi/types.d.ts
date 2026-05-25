import { z } from "zod";
export declare const ParticipantSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    role: z.ZodDefault<z.ZodEnum<["host", "guest", "unknown"]>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    role: "host" | "guest" | "unknown";
    email?: string | null | undefined;
}, {
    name: string;
    email?: string | null | undefined;
    role?: "host" | "guest" | "unknown" | undefined;
}>;
export declare const TranscriptParagraphSchema: z.ZodObject<{
    speaker: z.ZodString;
    start: z.ZodNumber;
    end: z.ZodNumber;
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    speaker: string;
    start: number;
    end: number;
    text: string;
}, {
    speaker: string;
    start: number;
    end: number;
    text: string;
}>;
export declare const TranscriptWordSchema: z.ZodObject<{
    text: z.ZodString;
    start: z.ZodNumber;
    end: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    start: number;
    end: number;
    text: string;
}, {
    start: number;
    end: number;
    text: string;
}>;
export declare const TranscriptUtteranceSchema: z.ZodObject<{
    speaker: z.ZodString;
    start: z.ZodNumber;
    words: z.ZodArray<z.ZodObject<{
        text: z.ZodString;
        start: z.ZodNumber;
        end: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        start: number;
        end: number;
        text: string;
    }, {
        start: number;
        end: number;
        text: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    speaker: string;
    start: number;
    words: {
        start: number;
        end: number;
        text: string;
    }[];
}, {
    speaker: string;
    start: number;
    words: {
        start: number;
        end: number;
        text: string;
    }[];
}>;
export declare const CallSummarySchema: z.ZodEffects<z.ZodObject<{
    uuid: z.ZodString;
    title: z.ZodString;
    created_at: z.ZodString;
    duration_seconds: z.ZodNumber;
    language: z.ZodString;
    status: z.ZodString;
    recording_url: z.ZodString;
    participants: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        role: z.ZodDefault<z.ZodEnum<["host", "guest", "unknown"]>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        role: "host" | "guest" | "unknown";
        email?: string | null | undefined;
    }, {
        name: string;
        email?: string | null | undefined;
        role?: "host" | "guest" | "unknown" | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    status: string;
    uuid: string;
    title: string;
    created_at: string;
    duration_seconds: number;
    language: string;
    recording_url: string;
    participants: {
        name: string;
        role: "host" | "guest" | "unknown";
        email?: string | null | undefined;
    }[];
}, {
    status: string;
    uuid: string;
    title: string;
    created_at: string;
    duration_seconds: number;
    language: string;
    recording_url: string;
    participants: {
        name: string;
        email?: string | null | undefined;
        role?: "host" | "guest" | "unknown" | undefined;
    }[];
}>, {
    uuid: string;
    title: string;
    createdAt: string;
    durationSeconds: number;
    language: string;
    status: string;
    recordingUrl: string;
    participants: {
        name: string;
        role: "host" | "guest" | "unknown";
        email?: string | null | undefined;
    }[];
}, {
    status: string;
    uuid: string;
    title: string;
    created_at: string;
    duration_seconds: number;
    language: string;
    recording_url: string;
    participants: {
        name: string;
        email?: string | null | undefined;
        role?: "host" | "guest" | "unknown" | undefined;
    }[];
}>;
export declare const CallDetailSchema: z.ZodEffects<z.ZodObject<{
    uuid: z.ZodString;
    title: z.ZodString;
    created_at: z.ZodString;
    started_at: z.ZodOptional<z.ZodString>;
    ended_at: z.ZodOptional<z.ZodString>;
    duration_seconds: z.ZodNumber;
    language: z.ZodString;
    status: z.ZodString;
    recording_url: z.ZodString;
    participants: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        role: z.ZodDefault<z.ZodEnum<["host", "guest", "unknown"]>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        role: "host" | "guest" | "unknown";
        email?: string | null | undefined;
    }, {
        name: string;
        email?: string | null | undefined;
        role?: "host" | "guest" | "unknown" | undefined;
    }>, "many">;
    topics: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    summary: z.ZodOptional<z.ZodString>;
    simple_transcript: z.ZodDefault<z.ZodArray<z.ZodObject<{
        speaker: z.ZodString;
        start: z.ZodNumber;
        end: z.ZodNumber;
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        speaker: string;
        start: number;
        end: number;
        text: string;
    }, {
        speaker: string;
        start: number;
        end: number;
        text: string;
    }>, "many">>;
    transcript: z.ZodDefault<z.ZodArray<z.ZodObject<{
        speaker: z.ZodString;
        start: z.ZodNumber;
        words: z.ZodArray<z.ZodObject<{
            text: z.ZodString;
            start: z.ZodNumber;
            end: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            start: number;
            end: number;
            text: string;
        }, {
            start: number;
            end: number;
            text: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        speaker: string;
        start: number;
        words: {
            start: number;
            end: number;
            text: string;
        }[];
    }, {
        speaker: string;
        start: number;
        words: {
            start: number;
            end: number;
            text: string;
        }[];
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    status: string;
    uuid: string;
    title: string;
    created_at: string;
    duration_seconds: number;
    language: string;
    recording_url: string;
    participants: {
        name: string;
        role: "host" | "guest" | "unknown";
        email?: string | null | undefined;
    }[];
    topics: string[];
    simple_transcript: {
        speaker: string;
        start: number;
        end: number;
        text: string;
    }[];
    transcript: {
        speaker: string;
        start: number;
        words: {
            start: number;
            end: number;
            text: string;
        }[];
    }[];
    started_at?: string | undefined;
    ended_at?: string | undefined;
    summary?: string | undefined;
}, {
    status: string;
    uuid: string;
    title: string;
    created_at: string;
    duration_seconds: number;
    language: string;
    recording_url: string;
    participants: {
        name: string;
        email?: string | null | undefined;
        role?: "host" | "guest" | "unknown" | undefined;
    }[];
    started_at?: string | undefined;
    ended_at?: string | undefined;
    topics?: string[] | undefined;
    summary?: string | undefined;
    simple_transcript?: {
        speaker: string;
        start: number;
        end: number;
        text: string;
    }[] | undefined;
    transcript?: {
        speaker: string;
        start: number;
        words: {
            start: number;
            end: number;
            text: string;
        }[];
    }[] | undefined;
}>, {
    uuid: string;
    title: string;
    createdAt: string;
    startedAt: string | undefined;
    endedAt: string | undefined;
    durationSeconds: number;
    language: string;
    status: string;
    recordingUrl: string;
    participants: {
        name: string;
        role: "host" | "guest" | "unknown";
        email?: string | null | undefined;
    }[];
    topics: string[];
    summary: string | undefined;
    simpleTranscript: {
        speaker: string;
        start: number;
        end: number;
        text: string;
    }[];
    transcript: {
        speaker: string;
        start: number;
        words: {
            start: number;
            end: number;
            text: string;
        }[];
    }[];
}, {
    status: string;
    uuid: string;
    title: string;
    created_at: string;
    duration_seconds: number;
    language: string;
    recording_url: string;
    participants: {
        name: string;
        email?: string | null | undefined;
        role?: "host" | "guest" | "unknown" | undefined;
    }[];
    started_at?: string | undefined;
    ended_at?: string | undefined;
    topics?: string[] | undefined;
    summary?: string | undefined;
    simple_transcript?: {
        speaker: string;
        start: number;
        end: number;
        text: string;
    }[] | undefined;
    transcript?: {
        speaker: string;
        start: number;
        words: {
            start: number;
            end: number;
            text: string;
        }[];
    }[] | undefined;
}>;
export declare const CallsListSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodEffects<z.ZodObject<{
        uuid: z.ZodString;
        title: z.ZodString;
        created_at: z.ZodString;
        duration_seconds: z.ZodNumber;
        language: z.ZodString;
        status: z.ZodString;
        recording_url: z.ZodString;
        participants: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            role: z.ZodDefault<z.ZodEnum<["host", "guest", "unknown"]>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            role: "host" | "guest" | "unknown";
            email?: string | null | undefined;
        }, {
            name: string;
            email?: string | null | undefined;
            role?: "host" | "guest" | "unknown" | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        status: string;
        uuid: string;
        title: string;
        created_at: string;
        duration_seconds: number;
        language: string;
        recording_url: string;
        participants: {
            name: string;
            role: "host" | "guest" | "unknown";
            email?: string | null | undefined;
        }[];
    }, {
        status: string;
        uuid: string;
        title: string;
        created_at: string;
        duration_seconds: number;
        language: string;
        recording_url: string;
        participants: {
            name: string;
            email?: string | null | undefined;
            role?: "host" | "guest" | "unknown" | undefined;
        }[];
    }>, {
        uuid: string;
        title: string;
        createdAt: string;
        durationSeconds: number;
        language: string;
        status: string;
        recordingUrl: string;
        participants: {
            name: string;
            role: "host" | "guest" | "unknown";
            email?: string | null | undefined;
        }[];
    }, {
        status: string;
        uuid: string;
        title: string;
        created_at: string;
        duration_seconds: number;
        language: string;
        recording_url: string;
        participants: {
            name: string;
            email?: string | null | undefined;
            role?: "host" | "guest" | "unknown" | undefined;
        }[];
    }>, "many">;
    meta: z.ZodObject<{
        page: z.ZodNumber;
        per_page: z.ZodNumber;
        total: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        per_page: number;
        page: number;
        total: number;
    }, {
        per_page: number;
        page: number;
        total: number;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        uuid: string;
        title: string;
        createdAt: string;
        durationSeconds: number;
        language: string;
        status: string;
        recordingUrl: string;
        participants: {
            name: string;
            role: "host" | "guest" | "unknown";
            email?: string | null | undefined;
        }[];
    }[];
    meta: {
        per_page: number;
        page: number;
        total: number;
    };
}, {
    data: {
        status: string;
        uuid: string;
        title: string;
        created_at: string;
        duration_seconds: number;
        language: string;
        recording_url: string;
        participants: {
            name: string;
            email?: string | null | undefined;
            role?: "host" | "guest" | "unknown" | undefined;
        }[];
    }[];
    meta: {
        per_page: number;
        page: number;
        total: number;
    };
}>;
export type Participant = z.infer<typeof ParticipantSchema>;
export type CallSummary = z.infer<typeof CallSummarySchema>;
export type CallDetail = z.infer<typeof CallDetailSchema>;
export type CallsList = z.infer<typeof CallsListSchema>;
