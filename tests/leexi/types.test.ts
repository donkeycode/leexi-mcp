import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  CallDetailResponseSchema,
  CallDetailSchema,
  CallSummarySchema,
  CallsListResponseSchema,
  ChapterSchema,
  SpeakerSchema,
  TaskSchema,
} from "../../src/leexi/types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturesDir = join(__dirname, "..", "fixtures");

function loadFixture(name: string): unknown {
  return JSON.parse(readFileSync(join(fixturesDir, name), "utf8"));
}

describe("Leexi schemas", () => {
  it("parses calls list response with real pagination shape", () => {
    const raw = loadFixture("calls-list.json");
    const parsed = CallsListResponseSchema.parse(raw);
    expect(parsed.data).toHaveLength(2);
    // Real pagination: { page, items, count } — not { page, per_page, total }
    expect(parsed.pagination.page).toBe(1);
    expect(parsed.pagination.items).toBe(2);
    expect(parsed.pagination.count).toBe(864);
  });

  it("parses a full call detail response (data-wrapped)", () => {
    const raw = loadFixture("call-detail.json");
    const parsed = CallDetailResponseSchema.parse(raw);
    const call = parsed.data;
    expect(call.uuid).toBe("call-abc-123");
    // simple_transcript is a string, not an array
    expect(typeof call.simpleTranscript).toBe("string");
    expect(call.simpleTranscript).toContain("Alice Example");
    // Chapters present
    expect(call.chapters.length).toBeGreaterThan(0);
    expect(call.chapters[0]?.title).toContain("Introduction");
    // Tasks present
    expect(call.tasks.length).toBeGreaterThan(0);
    expect(call.tasks[0]?.subject).toBeTruthy();
  });

  it("simple_transcript is a string with inline timestamps", () => {
    const raw = loadFixture("call-detail.json");
    const parsed = CallDetailResponseSchema.parse(raw);
    // Must be a plain string — old schema had it as array of paragraph objects
    expect(typeof parsed.data.simpleTranscript).toBe("string");
    // Format: "Name (HH:MM:SS - HH:MM:SS)\ntext"
    expect(parsed.data.simpleTranscript).toMatch(/\(\d{2}:\d{2}:\d{2} - \d{2}:\d{2}:\d{2}\)/);
  });

  it("call detail includes chapters and call_topics", () => {
    const raw = loadFixture("call-detail.json");
    const parsed = CallDetailResponseSchema.parse(raw);
    expect(parsed.data.chapters.length).toBeGreaterThan(0);
    expect(parsed.data.callTopics.length).toBeGreaterThan(0);
    expect(parsed.data.callTopics[0]?.keyphrase).toBeTruthy();
    expect(parsed.data.callTopics[0]?.topicName).toBeTruthy();
  });

  it("call detail field names use camelCase (snake_case transforms applied)", () => {
    const raw = loadFixture("call-detail.json");
    const parsed = CallDetailResponseSchema.parse(raw);
    const call = parsed.data;
    // locale replaces language
    expect(call.locale).toBe("fr-FR");
    // duration (float) replaces duration_seconds (int)
    expect(call.duration).toBeCloseTo(3645.837);
    // performed_at replaces started_at
    expect(call.performedAt).toBe("2026-05-22T08:30:00.000Z");
    // participatingUsers replaces participants
    expect(call.participatingUsers.length).toBeGreaterThan(0);
    // leexiUrl replaces recording_url as the web link
    expect(call.leexiUrl).toContain("app.leexi.ai");
  });

  it("rejects a call summary with missing uuid", () => {
    expect(() => CallSummarySchema.parse({ title: "t" })).toThrow();
  });

  it("CallSummarySchema defaults optional arrays and nullables when fields are absent", () => {
    // Minimal valid CallSummary — only required fields
    const minimal = {
      uuid: "test-uuid",
      locale: "fr-FR",
      duration: 0,
      direction: "inbound",
      is_video: false,
      visible: true,
      title: "Test Call",
      created_at: "2026-05-25T10:00:00Z",
      updated_at: "2026-05-25T10:00:00Z",
      performed_at: "2026-05-25T10:00:00Z",
      leexi_url: "https://app.leexi.ai/calls/test-uuid",
    };
    const parsed = CallSummarySchema.parse(minimal);
    // Optional arrays default to []
    expect(parsed.participatingUsers).toEqual([]);
    expect(parsed.speakers).toEqual([]);
    expect(parsed.chapters).toEqual([]);
    expect(parsed.tasks).toEqual([]);
    expect(parsed.prompts).toEqual([]);
    expect(parsed.feedbacks).toEqual([]);
    expect(parsed.tags).toEqual([]);
    expect(parsed.scorecards).toEqual([]);
    expect(parsed.customerPhoneNumbers).toEqual([]);
    expect(parsed.customerEmailAddresses).toEqual([]);
    // Optional strings default to null or ""
    expect(parsed.description).toBeNull();
    expect(parsed.summary).toBeNull();
    expect(parsed.recordingUrl).toBeNull();
    expect(parsed.transcriptUrl).toBeNull();
    expect(parsed.deal).toBeNull();
    expect(parsed.meetingEvent).toBeNull();
    expect(parsed.conversationType).toBeNull();
    expect(parsed.owner).toBeNull();
    expect(parsed.simpleTranscript).toBe("");
  });

  it("CallDetailSchema defaults optional arrays and nullables when absent", () => {
    const minimal = {
      uuid: "detail-uuid",
      locale: "en-US",
      duration: 100.5,
      direction: "outbound",
      is_video: true,
      visible: true,
      title: "Detail Call",
      created_at: "2026-05-25T10:00:00Z",
      updated_at: "2026-05-25T10:00:00Z",
      performed_at: "2026-05-25T10:00:00Z",
      leexi_url: "https://app.leexi.ai/calls/detail-uuid",
    };
    const parsed = CallDetailSchema.parse(minimal);
    expect(parsed.callTopics).toEqual([]);
    expect(parsed.transcript).toEqual([]);
    expect(parsed.chapters).toEqual([]);
    expect(parsed.tasks).toEqual([]);
    expect(parsed.simpleTranscript).toBe("");
    expect(parsed.source).toBeNull();
    expect(parsed.sourceId).toBeNull();
    expect(parsed.videoArchivedAt).toBeNull();
    expect(parsed.audioArchivedAt).toBeNull();
    expect(parsed.transcriptArchivedAt).toBeNull();
    expect(parsed.completionsArchivedAt).toBeNull();
  });

  it("SpeakerSchema transforms snake_case fields to camelCase", () => {
    const raw = {
      uuid: "spk-1",
      index: 0,
      duration: 300.5,
      longest_monologue: 45.2,
      name: "Alice Example",
      is_user: true,
      phone_number: null,
      email_address: "alice@example.com",
    };
    const parsed = SpeakerSchema.parse(raw);
    expect(parsed.longestMonologue).toBe(45.2);
    expect(parsed.isUser).toBe(true);
    expect(parsed.phoneNumber).toBeNull();
    expect(parsed.emailAddress).toBe("alice@example.com");
  });

  it("ChapterSchema transforms start_time to startTime", () => {
    const raw = {
      uuid: "ch-1",
      index: 0,
      title: "Chapter 1",
      text: "Content here.",
      start_time: 120.5,
    };
    const parsed = ChapterSchema.parse(raw);
    expect(parsed.startTime).toBe(120.5);
    expect(parsed.title).toBe("Chapter 1");
  });

  // v0.4.9 — régression : l'API Leexi renvoie parfois chapters[].start_time
  // à null sur des calls historiques (chaptering généré sans timeline).
  // Avant v0.4.9 ces calls faisaient exploser CallSummarySchema et bloquaient
  // leexi_list_calls sur la page contenant le call corrompu.
  it("ChapterSchema accepts null on start_time (historical calls)", () => {
    const raw = {
      uuid: "ch-historical",
      index: 0,
      title: "Chapitre 1: Introduction",
      text: "Salutations entre les participants.",
      start_time: null,
    };
    const parsed = ChapterSchema.parse(raw);
    expect(parsed.startTime).toBeNull();
    expect(parsed.title).toBe("Chapitre 1: Introduction");
  });

  // v0.4.10 — régression : l'API Leexi renvoie parfois duration à null
  // sur des calls historiques (calls archivés sans recalcul, calls très
  // courts/vides). Avant v0.4.10 ces calls faisaient exploser CallSummarySchema
  // et CallDetailSchema et bloquaient leexi_list_calls sur la page contenant
  // le call corrompu. Idem pour speakers[].duration et speakers[].longest_monologue.
  it("CallSummarySchema accepts null on duration (historical calls)", () => {
    const raw = {
      uuid: "call-historical",
      locale: "fr-FR",
      duration: null,
      direction: "outbound",
      is_video: true,
      visible: true,
      title: "Call sans durée",
      created_at: "2024-05-17T09:00:00Z",
      updated_at: "2026-05-17T02:00:00Z",
      performed_at: "2024-05-17T08:00:00Z",
      leexi_url: "https://app.leexi.ai/calls/call-historical",
    };
    const parsed = CallSummarySchema.parse(raw);
    expect(parsed.duration).toBeNull();
    expect(parsed.title).toBe("Call sans durée");
  });

  it("CallDetailSchema accepts null on duration (historical calls)", () => {
    const raw = {
      uuid: "call-detail-historical",
      locale: "fr-FR",
      duration: null,
      direction: "outbound",
      is_video: true,
      visible: true,
      title: "Detail sans durée",
      created_at: "2024-05-17T09:00:00Z",
      updated_at: "2026-05-17T02:00:00Z",
      performed_at: "2024-05-17T08:00:00Z",
      leexi_url: "https://app.leexi.ai/calls/call-detail-historical",
    };
    const parsed = CallDetailSchema.parse(raw);
    expect(parsed.duration).toBeNull();
    expect(parsed.title).toBe("Detail sans durée");
  });

  it("SpeakerSchema accepts null on duration and longest_monologue (historical empty speakers)", () => {
    const raw = {
      uuid: "speaker-empty",
      index: 0,
      duration: null,
      longest_monologue: null,
      name: "Speaker 1",
      is_user: false,
    };
    const parsed = SpeakerSchema.parse(raw);
    expect(parsed.duration).toBeNull();
    expect(parsed.longestMonologue).toBeNull();
    expect(parsed.name).toBe("Speaker 1");
  });

  it("TaskSchema transforms created_at/updated_at to camelCase", () => {
    const raw = {
      uuid: "task-1",
      active: true,
      subject: "Do something",
      description: null,
      status: "not_started",
      done: false,
      created_at: "2026-05-22T10:00:00Z",
      updated_at: "2026-05-22T11:00:00Z",
    };
    const parsed = TaskSchema.parse(raw);
    expect(parsed.createdAt).toBe("2026-05-22T10:00:00Z");
    expect(parsed.updatedAt).toBe("2026-05-22T11:00:00Z");
    expect(parsed.description).toBeNull();
  });

  // v0.4.8 — régression : l'API Leexi renvoie parfois title/locale/direction
  // à null sur des calls historiques (ex: imports anciens, calls sans
  // meeting_event détecté). Avant v0.4.8 le schéma rejetait ces calls →
  // bloquait la reprise chronologique dès qu'on tombait sur un vieux call.
  it("CallSummarySchema accepts null on title/locale/direction (historical calls)", () => {
    const rawWithNulls = {
      uuid: "old-call-uuid",
      locale: null,
      duration: 1200,
      direction: null,
      is_video: false,
      visible: true,
      title: null,
      created_at: "2024-03-26T10:00:00Z",
      updated_at: "2024-03-26T10:00:00Z",
      performed_at: "2024-03-26T10:00:00Z",
      leexi_url: "https://app.leexi.ai/calls/old-call-uuid",
    };
    const parsed = CallSummarySchema.parse(rawWithNulls);
    expect(parsed.title).toBeNull();
    expect(parsed.locale).toBeNull();
    expect(parsed.direction).toBeNull();
    // The other required fields still parse correctly
    expect(parsed.uuid).toBe("old-call-uuid");
    expect(parsed.duration).toBe(1200);
    expect(parsed.performedAt).toBe("2024-03-26T10:00:00Z");
  });

  it("CallDetailSchema accepts null on title/locale/direction (historical calls)", () => {
    const rawWithNulls = {
      uuid: "old-detail-uuid",
      locale: null,
      duration: 600,
      direction: null,
      is_video: false,
      visible: true,
      title: null,
      created_at: "2024-04-01T10:00:00Z",
      updated_at: "2024-04-01T10:00:00Z",
      performed_at: "2024-04-01T10:00:00Z",
      leexi_url: "https://app.leexi.ai/calls/old-detail-uuid",
    };
    const parsed = CallDetailSchema.parse(rawWithNulls);
    expect(parsed.title).toBeNull();
    expect(parsed.locale).toBeNull();
    expect(parsed.direction).toBeNull();
  });

  it("SpeakerSchema handles absent optional phone/email fields", () => {
    const raw = {
      uuid: "spk-2",
      index: 1,
      duration: 50.0,
      longest_monologue: 20.0,
      name: "Bob Example",
      is_user: false,
    };
    const parsed = SpeakerSchema.parse(raw);
    expect(parsed.phoneNumber).toBeNull();
    expect(parsed.emailAddress).toBeNull();
  });
});
