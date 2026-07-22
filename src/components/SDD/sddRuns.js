/**
 * Pre-recorded SDD runs.
 *
 * These are replays, not live model calls — deterministic, free to run, and
 * they work with no network. Each run is a list of stages; each stage streams
 * log lines, may emit an artifact, and may block on a human gate.
 *
 * `ms` is the dwell time per log line at 1x speed.
 */

export const RUNS = [
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "rate-limit",
    key: "KAB-2841",
    type: "Feature",
    title: "Rate limit the login endpoint",
    summary: "Brute-force protection on POST /auth/login",
    body:
      "Security review flagged that /auth/login has no throttling. An attacker can " +
      "run unlimited credential-stuffing attempts. Add rate limiting. Ops wants it " +
      "configurable without a redeploy.",
    repo: "services/auth · Node 20 · Express 4 · Redis 7",
    stages: [
      {
        id: "intake",
        name: "Intake",
        agent: "intake-agent",
        tier: "fast",
        gate: false,
        logs: [
          { t: "tool", ms: 620, text: "jira.getIssue(KAB-2841)" },
          { t: "out", ms: 420, text: "Rate limit the login endpoint · Priority: High · Reporter: Security" },
          { t: "tool", ms: 560, text: "confluence.getPage('Auth hardening — Q3')" },
          { t: "warn", ms: 640, text: "Screening external content for injected instructions… clean" },
          { t: "tool", ms: 500, text: "repo.map('services/auth')" },
          { t: "out", ms: 420, text: "Express 4 · Redis 7 already a dependency · 3 running instances behind ALB" },
          { t: "ok", ms: 460, text: "Brief assembled — 412 tokens, no ambiguity escalations" },
        ],
        artifact: "brief",
      },
      {
        id: "refine",
        name: "Refine",
        agent: "refiner-agent",
        tier: "deep",
        gate: true,
        gateLabel: "Approve the spec",
        gateNote: "Nothing gets built until a human agrees this is the right problem, stated correctly.",
        logs: [
          { t: "out", ms: 520, text: "Reading brief + team acceptance-criteria conventions" },
          { t: "warn", ms: 700, text: "Ambiguity: \"too many attempts\" is undefined in the ticket" },
          { t: "out", ms: 560, text: "Proposing 5 attempts / 15 min, per account + per IP — flagged for human confirmation" },
          { t: "warn", ms: 620, text: "Ambiguity: ticket says \"configurable\" — assuming env var, not admin UI" },
          { t: "ok", ms: 520, text: "Spec written → docs/specs/KAB-2841.md (4 acceptance criteria)" },
        ],
        artifact: "spec",
      },
      {
        id: "plan",
        name: "Plan",
        agent: "planner + architecture-simplifier",
        tier: "deep",
        gate: true,
        gateLabel: "Approve the plan",
        gateNote: "The second gate. Scope and architecture are the expensive things to get wrong.",
        logs: [
          { t: "out", ms: 560, text: "Mapping touch points across services/auth" },
          { t: "out", ms: 620, text: "3 candidate designs evaluated" },
          { t: "hand", ms: 560, text: "→ handing draft to architecture-simplifier" },
          { t: "cut", ms: 680, text: "CUT: new RateLimitService abstraction — one caller, premature" },
          { t: "cut", ms: 640, text: "CUT: per-tenant limits config table — no requirement asks for it" },
          { t: "ok", ms: 520, text: "Plan reduced: 7 files → 3 files" },
        ],
        artifact: "plan",
      },
      {
        id: "implement",
        name: "Implement",
        agent: "implementer-agent",
        tier: "deep",
        gate: false,
        logs: [
          { t: "tool", ms: 540, text: "git worktree add .wt/KAB-2841 --detach develop" },
          { t: "out", ms: 460, text: "Isolated worktree — parallel agents cannot collide" },
          { t: "edit", ms: 620, text: "+ src/middleware/rateLimit.ts (new, 74 lines)" },
          { t: "edit", ms: 460, text: "~ src/routes/auth.ts (+6 −1)" },
          { t: "edit", ms: 440, text: "~ src/config/limits.ts (+12 −0)" },
          { t: "tool", ms: 620, text: "tsc --noEmit" },
          { t: "ok", ms: 400, text: "0 type errors" },
        ],
        artifact: "diff",
      },
      {
        id: "test",
        name: "Test",
        agent: "test-author-agent",
        tier: "fast",
        gate: false,
        logs: [
          { t: "out", ms: 560, text: "Deriving cases from the spec's 4 acceptance criteria" },
          { t: "edit", ms: 600, text: "+ src/middleware/rateLimit.spec.ts (9 cases)" },
          { t: "tool", ms: 720, text: "vitest run" },
          { t: "ok", ms: 460, text: "9 passed · 0 failed · 412ms" },
        ],
        artifact: "tests",
      },
      {
        id: "review",
        name: "Review",
        agent: "code-reviewer (clean context)",
        tier: "deep",
        gate: true,
        gateLabel: "Accept the review",
        gateNote: "This agent never saw the implementer's reasoning. It has to rediscover the code — which is exactly why it finds things.",
        logs: [
          { t: "warn", ms: 640, text: "Fresh context — implementation transcript deliberately NOT loaded" },
          { t: "tool", ms: 540, text: "read diff (3 files, +92 −1)" },
          { t: "out", ms: 560, text: "Cross-checking each acceptance criterion against the diff" },
          { t: "out", ms: 500, text: "AC-1 ✓  AC-2 ✓  AC-3 ✓  AC-4 ✓" },
          { t: "out", ms: 620, text: "Probing deployment topology assumptions…" },
          { t: "bug", ms: 900, text: "BLOCKING: counter is a process-local Map — 3 instances ⇒ effective limit is 15/15min, not 5" },
          { t: "warn", ms: 560, text: "Note: 429 response omits Retry-After" },
          { t: "ok", ms: 480, text: "1 blocking · 1 note · verdict: changes requested" },
        ],
        artifact: "review",
      },
      {
        id: "ship",
        name: "Ship",
        agent: "shipper-agent",
        tier: "fast",
        gate: false,
        logs: [
          { t: "out", ms: 620, text: "Applying review fix: Map → Redis INCR + EXPIRE (atomic)" },
          { t: "edit", ms: 520, text: "~ src/middleware/rateLimit.ts (+18 −11)" },
          { t: "edit", ms: 440, text: "~ rateLimit.spec.ts (+2 cases: shared store, Retry-After)" },
          { t: "tool", ms: 700, text: "vitest run" },
          { t: "ok", ms: 440, text: "11 passed · 0 failed" },
          { t: "tool", ms: 620, text: "git push && gh pr create" },
          { t: "ok", ms: 520, text: "MR !1447 opened — spec, plan and review attached" },
        ],
        artifact: "pr",
      },
    ],
    artifacts: {
      brief: {
        label: "Brief",
        lang: "md",
        body: `# KAB-2841 — Rate limit the login endpoint

**Type** Feature · **Priority** High · **Reporter** Security

## Source material
- Jira KAB-2841
- Confluence: "Auth hardening — Q3"

## Ask
POST /auth/login has no throttling. Unlimited credential-stuffing is possible.
Limits must be changeable without a redeploy.

## Repo context
services/auth · Express 4 · Node 20
Redis 7 already a dependency (session store)
Deployment: 3 instances behind an ALB   <-- note this

## Open questions for refine
1. What counts as "too many"?
2. "Configurable" — env var, or runtime admin control?`,
      },
      spec: {
        label: "Spec",
        lang: "md",
        body: `# Spec — KAB-2841

## Problem
An attacker can issue unlimited login attempts against any account.

## Scope
IN  — throttling for POST /auth/login
OUT — password policy, MFA, account lockout emails

## Decisions (need human confirmation)
- Threshold: **5 failed attempts / 15 min**
- Keyed on **account AND source IP** (either tripping ⇒ 429)
- Successful login **resets** the account counter
- Config via env (RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_S)

## Acceptance criteria
AC-1  6th failed attempt within 15 min ⇒ 429
AC-2  Successful login resets that account's counter
AC-3  Limit is shared across ALL running instances
AC-4  Threshold and window read from env at boot

## Non-functional
- Adds < 5ms p99 to the login path
- Fails **open** if the store is unreachable (availability > strictness here)`,
      },
      plan: {
        label: "Plan",
        lang: "md",
        body: `# Plan — KAB-2841

## Approach
Express middleware in front of the login handler. Counter in Redis
(already a dependency — no new infrastructure).

## Files (3)
1. src/middleware/rateLimit.ts   NEW   middleware + store access
2. src/routes/auth.ts            EDIT  mount on POST /login
3. src/config/limits.ts          EDIT  env parsing + defaults

## Rejected by architecture-simplifier
✗ RateLimitService class
    One caller. An interface with a single implementation is not
    abstraction, it is indirection. Rejected.

✗ Per-tenant limits config table
    No acceptance criterion requires per-tenant values. Rejected —
    revisit when a requirement actually asks.

✗ Sliding-window log algorithm
    Fixed window satisfies AC-1 at a fraction of the memory. Rejected.

## Risk
Redis unavailable ⇒ fail open (per spec non-functional). Must be explicit,
not accidental.`,
      },
      diff: {
        label: "Diff",
        lang: "diff",
        body: `+++ src/middleware/rateLimit.ts
@@ -0,0 +1,74 @@
+import type { Request, Response, NextFunction } from "express";
+import { LIMITS } from "../config/limits";
+
+// Process-local counter, keyed by account and by IP.
+const hits = new Map<string, { n: number; resetAt: number }>();
+
+function bump(key: string): number {
+  const now = Date.now();
+  const cur = hits.get(key);
+  if (!cur || cur.resetAt < now) {
+    hits.set(key, { n: 1, resetAt: now + LIMITS.windowMs });
+    return 1;
+  }
+  cur.n += 1;
+  return cur.n;
+}
+
+export function loginRateLimit(
+  req: Request, res: Response, next: NextFunction,
+) {
+  const account = String(req.body?.email ?? "").toLowerCase();
+  const keys = [\`acct:\${account}\`, \`ip:\${req.ip}\`];
+
+  for (const k of keys) {
+    if (bump(k) > LIMITS.max) {
+      return res.status(429).json({ error: "too_many_attempts" });
+    }
+  }
+  next();
+}
+
+export function resetOnSuccess(account: string) {
+  hits.delete(\`acct:\${account.toLowerCase()}\`);
+}

--- src/routes/auth.ts
@@ -1,7 +1,12 @@
 import { Router } from "express";
+import { loginRateLimit, resetOnSuccess } from "../middleware/rateLimit";

 const router = Router();
-router.post("/login", async (req, res) => {
+router.post("/login", loginRateLimit, async (req, res) => {
   const user = await authenticate(req.body);
+  if (user) resetOnSuccess(req.body.email);
   return res.json({ token: sign(user) });
 });`,
      },
      tests: {
        label: "Tests",
        lang: "ts",
        body: `describe("loginRateLimit", () => {
  it("AC-1 · 429s the 6th failed attempt in the window", async () => {
    for (let i = 0; i < 5; i++) await post("/auth/login", BAD);
    const res = await post("/auth/login", BAD);
    expect(res.status).toBe(429);
  });

  it("AC-1 · allows the 5th attempt", async () => { /* … */ });

  it("AC-2 · successful login resets the account counter", async () => {
    for (let i = 0; i < 4; i++) await post("/auth/login", BAD);
    await post("/auth/login", GOOD);
    const res = await post("/auth/login", BAD);
    expect(res.status).toBe(401);   // counted from zero again
  });

  it("AC-2 · reset is scoped to that account only", async () => { /* … */ });

  it("AC-4 · reads threshold from env at boot", async () => { /* … */ });

  it("blocks by IP even across different accounts", async () => { /* … */ });

  it("fails open when the store throws", async () => { /* … */ });

  it("is case-insensitive on the account key", async () => { /* … */ });

  it("starts a fresh window after expiry", async () => { /* … */ });
});

// 9 passed · 0 failed · 412ms
//
// Note: every test traces back to an acceptance criterion in the spec.
// The spec is the contract; the tests are its executable form.`,
      },
      review: {
        label: "Review",
        lang: "md",
        body: `# Review — KAB-2841
Reviewer: clean-context agent. The implementation transcript was **not** loaded.

## BLOCKING · correctness
**The counter is process-local, so the limit does not hold in production.**

src/middleware/rateLimit.ts:5
    const hits = new Map<string, …>()

The brief records 3 instances behind an ALB. Requests distribute across them,
so each instance keeps its own count. Effective limit is 5 x 3 = **15 attempts
per 15 min**, not 5.

This directly violates AC-3 ("shared across ALL running instances"), and the
test suite passes because every test exercises a single process — the tests
cannot see this class of defect.

Redis is already a dependency. Use INCR + EXPIRE, which is atomic and
survives the multi-instance case:

    const n = await redis.incr(key);
    if (n === 1) await redis.expire(key, LIMITS.windowSec);

## Note · API surface
429 responses omit \`Retry-After\`. Clients cannot back off intelligently
and will hammer the endpoint. Low effort, worth doing now.

## Verified correct
AC-1 threshold boundary  ✓
AC-2 reset-on-success, correctly scoped  ✓
AC-4 env-driven config  ✓
Fail-open behaviour matches the spec's non-functional requirement  ✓

**Verdict — changes requested (1 blocking).**`,
      },
      pr: {
        label: "PR",
        lang: "md",
        body: `# MR !1447 — KAB-2841 Rate limit the login endpoint

**4 files · +112 −12 · 11 tests passing**

## What changed
Redis-backed fixed-window rate limiter on POST /auth/login, keyed by
account and by IP. Config from env. Fails open if Redis is unreachable.

## Attached
- docs/specs/KAB-2841.md      (approved by a human at the refine gate)
- docs/plans/KAB-2841.md      (approved at the plan gate)
- docs/reviews/KAB-2841.md    (1 blocking finding, resolved below)

## Review resolution
The clean-context reviewer caught that a process-local Map gives an
effective limit of 15/15min across 3 instances. Swapped to Redis
INCR/EXPIRE and added two tests — one covering the shared store, one
covering Retry-After.

## Human touchpoints
3 gates: spec approved, plan approved, review accepted.
Everything between those points ran unattended.`,
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ws-migration",
    key: "KAB-2903",
    type: "Architecture",
    title: "Replace incident-list polling with WebSocket push",
    summary: "Operators see stale incidents for up to 10s",
    body:
      "The operator console polls /incidents every 10s. Dispatchers report acting on " +
      "stale data during multi-unit events. Move to push.",
    repo: "apps/console (Angular 17) · services/incident (.NET 8) · RabbitMQ",
    stages: [
      {
        id: "intake",
        name: "Intake",
        agent: "intake-agent",
        tier: "fast",
        gate: false,
        logs: [
          { t: "tool", ms: 600, text: "jira.getIssue(KAB-2903)" },
          { t: "tool", ms: 560, text: "figma.getDesign('Console / Incident list v4')" },
          { t: "out", ms: 520, text: "No visual change required — data freshness only" },
          { t: "tool", ms: 540, text: "repo.map('apps/console', 'services/incident')" },
          { t: "ok", ms: 460, text: "Brief assembled · cross-repo change detected" },
        ],
        artifact: "brief",
      },
      {
        id: "refine",
        name: "Refine",
        agent: "refiner-agent",
        tier: "deep",
        gate: true,
        gateLabel: "Approve the spec",
        gateNote: "Freshness targets are a product decision, not an engineering one.",
        logs: [
          { t: "out", ms: 540, text: "Quantifying \"stale\": current p99 staleness = 10.4s" },
          { t: "warn", ms: 660, text: "Ambiguity: no target latency given — proposing < 1s p99" },
          { t: "warn", ms: 600, text: "Raising: what happens on socket loss? Proposing poll fallback" },
          { t: "ok", ms: 500, text: "Spec written · 5 acceptance criteria" },
        ],
        artifact: "spec",
      },
      {
        id: "plan",
        name: "Plan",
        agent: "architect + architecture-simplifier",
        tier: "deep",
        gate: true,
        gateLabel: "Approve the plan",
        gateNote: "Cross-service contracts are the expensive mistake. This is where a human should look hardest.",
        logs: [
          { t: "out", ms: 580, text: "Evaluating: SignalR · raw WS · SSE" },
          { t: "out", ms: 600, text: "SSE selected — one-directional, survives proxies, no new client lib" },
          { t: "hand", ms: 540, text: "→ architecture-simplifier" },
          { t: "cut", ms: 700, text: "CUT: per-client incident filtering server-side — client already filters" },
          { t: "cut", ms: 640, text: "CUT: new fan-out service — RabbitMQ topic exchange is enough" },
          { t: "ok", ms: 520, text: "Plan: 5 files across 2 repos" },
        ],
        artifact: "plan",
      },
      {
        id: "implement",
        name: "Implement",
        agent: "implementer-agent ×2 (parallel worktrees)",
        tier: "deep",
        gate: false,
        logs: [
          { t: "tool", ms: 560, text: "git worktree add .wt/KAB-2903-api" },
          { t: "tool", ms: 480, text: "git worktree add .wt/KAB-2903-console" },
          { t: "out", ms: 540, text: "Two agents, two worktrees, one shared contract — no collisions" },
          { t: "edit", ms: 560, text: "+ services/incident/Sse/IncidentStream.cs" },
          { t: "edit", ms: 480, text: "~ apps/console/src/app/incidents/incident.service.ts" },
          { t: "ok", ms: 480, text: "Both worktrees green" },
        ],
        artifact: "diff",
      },
      {
        id: "test",
        name: "Test",
        agent: "test-author-agent",
        tier: "fast",
        gate: false,
        logs: [
          { t: "out", ms: 520, text: "Deriving cases from 5 acceptance criteria" },
          { t: "edit", ms: 600, text: "+ IncidentStreamTests.cs · + incident.service.spec.ts" },
          { t: "tool", ms: 700, text: "dotnet test && ng test" },
          { t: "ok", ms: 460, text: "14 passed · 0 failed" },
        ],
        artifact: "tests",
      },
      {
        id: "review",
        name: "Review",
        agent: "code-reviewer (clean context)",
        tier: "deep",
        gate: true,
        gateLabel: "Accept the review",
        gateNote: "Fresh eyes on a cross-service contract.",
        logs: [
          { t: "warn", ms: 620, text: "Fresh context · reading both diffs" },
          { t: "out", ms: 560, text: "Contract check: server event shape vs client parser" },
          { t: "bug", ms: 880, text: "BLOCKING: reconnect has no backoff — a server restart becomes a thundering herd" },
          { t: "warn", ms: 560, text: "Note: no Last-Event-ID replay ⇒ events lost during reconnect" },
          { t: "ok", ms: 480, text: "1 blocking · 1 note" },
        ],
        artifact: "review",
      },
      {
        id: "ship",
        name: "Ship",
        agent: "shipper-agent",
        tier: "fast",
        gate: false,
        logs: [
          { t: "out", ms: 600, text: "Applying fix: exponential backoff + jitter, cap 30s" },
          { t: "out", ms: 540, text: "Applying note: Last-Event-ID replay window (60s)" },
          { t: "tool", ms: 680, text: "dotnet test && ng test" },
          { t: "ok", ms: 440, text: "17 passed" },
          { t: "ok", ms: 540, text: "2 stacked MRs opened — api first, console second" },
        ],
        artifact: "pr",
      },
    ],
    artifacts: {
      brief: {
        label: "Brief",
        lang: "md",
        body: `# KAB-2903 — Replace incident-list polling with push

**Type** Architecture · **Repos** apps/console, services/incident

## Ask
Console polls GET /incidents every 10s. Dispatchers act on stale data
during multi-unit events.

## Measured today
p50 staleness 5.1s · p99 staleness 10.4s
1,400 poll requests/min at peak, ~97% returning 304

## Design input
Figma "Console / Incident list v4" — no visual change. Data freshness only.

## Open questions for refine
1. Target staleness?
2. Behaviour when the connection drops?`,
      },
      spec: {
        label: "Spec",
        lang: "md",
        body: `# Spec — KAB-2903

## Problem
Incident data is up to 10.4s stale (p99). Dispatchers make dispatch
decisions on it.

## Scope
IN  — push transport for the incident list, reconnect behaviour
OUT — incident detail view, map markers, mobile client

## Decisions (need human confirmation)
- Target: **< 1s p99** end-to-end staleness
- Transport chosen at plan stage, not here
- On connection loss: **fall back to polling**, do not show stale data silently
- Connection state must be **visible to the operator**

## Acceptance criteria
AC-1  Incident create/update reaches an open console in < 1s (p99)
AC-2  Connection loss ⇒ automatic reconnect
AC-3  While disconnected, the console falls back to 10s polling
AC-4  Connection state is visible in the UI
AC-5  Poll traffic drops by > 90% at peak`,
      },
      plan: {
        label: "Plan",
        lang: "md",
        body: `# Plan — KAB-2903

## Transport decision
                  bidirectional   proxy-friendly   new client dep
  SignalR              yes             mostly           yes
  raw WebSocket        yes             fragile          no
  SSE  ← chosen        no              yes              no

Nothing in the spec needs client→server messages. SSE is the smallest
thing that satisfies all five criteria.

## Flow
  incident.updated → RabbitMQ topic → SSE endpoint → console EventSource

## Files (5, across 2 repos)
  services/incident/Sse/IncidentStream.cs        NEW
  services/incident/Program.cs                   EDIT  map endpoint
  apps/console/…/incident.service.ts             EDIT  EventSource + fallback
  apps/console/…/connection-badge.component.ts   NEW   AC-4
  apps/console/…/incident-list.component.html    EDIT  badge

## Rejected by architecture-simplifier
✗ Server-side per-client filtering — the client already filters by district.
✗ Dedicated fan-out service — RabbitMQ topic exchange already fans out.
✗ Protobuf event encoding — payloads are ~400 bytes. JSON is fine.`,
      },
      diff: {
        label: "Diff",
        lang: "diff",
        body: `+++ services/incident/Sse/IncidentStream.cs
@@ -0,0 +1,48 @@
+app.MapGet("/incidents/stream", async (HttpContext ctx, IBus bus) =>
+{
+    ctx.Response.Headers.ContentType = "text/event-stream";
+    ctx.Response.Headers.CacheControl = "no-cache";
+
+    await foreach (var evt in bus.Subscribe<IncidentChanged>(ctx.RequestAborted))
+    {
+        await ctx.Response.WriteAsync($"data: {JsonSerializer.Serialize(evt)}\\n\\n");
+        await ctx.Response.Body.FlushAsync();
+    }
+});

--- apps/console/src/app/incidents/incident.service.ts
@@ -14,9 +14,26 @@
-  // Poll every 10 seconds
-  private poll$ = interval(10_000).pipe(
-    switchMap(() => this.http.get<Incident[]>("/incidents")),
-  );
+  private stream$ = new Observable<Incident[]>((sub) => {
+    const es = new EventSource("/incidents/stream");
+
+    es.onmessage = (e) => sub.next(JSON.parse(e.data));
+
+    es.onerror = () => {
+      this.connected.set(false);
+      es.close();
+      this.reconnect();          // <-- reviewer flagged this
+    };
+
+    es.onopen = () => this.connected.set(true);
+    return () => es.close();
+  });
+
+  private reconnect() {
+    setTimeout(() => this.stream$.subscribe(), 1000);
+  }`,
      },
      tests: {
        label: "Tests",
        lang: "ts",
        body: `// services/incident — IncidentStreamTests.cs
[Fact] AC-1  Publishing IncidentChanged writes an SSE frame < 1s
[Fact] AC-1  Frame body is valid JSON matching the client contract
[Fact]       Client disconnect cancels the subscription (no leak)
[Fact]       Multiple subscribers each receive the event

// apps/console — incident.service.spec.ts
it("AC-2 · reconnects after the stream errors")
it("AC-3 · falls back to 10s polling while disconnected")
it("AC-3 · stops polling once the stream recovers")
it("AC-4 · connection signal flips on open and error")
it("AC-5 · issues no poll requests while connected")

// 14 passed · 0 failed
//
// AC-5 is measured in a load test, not a unit test — noted in the MR
// so the claim is not mistaken for something the suite proves.`,
      },
      review: {
        label: "Review",
        lang: "md",
        body: `# Review — KAB-2903
Reviewer: clean-context agent, both repos.

## BLOCKING · resilience
**Reconnect has no backoff. A server restart becomes a thundering herd.**

apps/console/…/incident.service.ts:38
    private reconnect() {
      setTimeout(() => this.stream$.subscribe(), 1000);
    }

Every connected console retries on a fixed 1s timer. On a deploy, all
~180 consoles disconnect simultaneously and then retry in lockstep,
once per second, indefinitely. That is a self-inflicted DDoS on the
service that just came back up.

The tests pass because they exercise a single client.

Needs exponential backoff with jitter, and a cap:

    delay = min(30_000, 2 ** attempt * 500) + random(0, 500)

## Note · correctness during reconnect
SSE supports Last-Event-ID for replay. Without it, incidents created
during the disconnect window are never delivered — the list silently
diverges from the server until the next full refresh. For a dispatch
console, silent divergence is worse than visible staleness.

## Verified correct
AC-3 poll fallback engages and disengages correctly  ✓
AC-4 connection state surfaces to the UI             ✓
Server-side subscription is cancelled on disconnect  ✓

**Verdict — changes requested (1 blocking).**`,
      },
      pr: {
        label: "PR",
        lang: "md",
        body: `# 2 stacked MRs — KAB-2903

  !1502  services/incident  · SSE endpoint            (merge first)
  !1503  apps/console       · EventSource + fallback  (depends on !1502)

**7 files · +214 −38 · 17 tests passing**

## Review resolution
- Blocking: fixed-interval reconnect ⇒ exponential backoff + jitter, 30s cap
- Note: added Last-Event-ID replay with a 60s server-side window

## Measured after
p99 staleness  10.4s → 0.6s
peak poll RPM  1,400 → 46   (fallback traffic only)

## Human touchpoints
3 gates: spec, plan, review. The transport choice was made by the
architect agent and approved by a human at the plan gate — that is the
decision worth a human's attention here.`,
      },
    },
  },
];

export const LOG_STYLES = {
  out:  { color: "#94a3b8", mark: " " },
  tool: { color: "#818cf8", mark: "$" },
  ok:   { color: "#4ade80", mark: "✓" },
  warn: { color: "#fbbf24", mark: "!" },
  bug:  { color: "#f87171", mark: "✖" },
  edit: { color: "#38bdf8", mark: "~" },
  cut:  { color: "#f472b6", mark: "−" },
  hand: { color: "#c084fc", mark: "→" },
};
