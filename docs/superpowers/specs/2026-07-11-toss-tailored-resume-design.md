# Toss-Tailored Resume Content Revamp

Date: 2026-07-11
Status: Approved

## Goal

Rewrite `src/content/resume.mdx` so it lands the Toss Insurance frontend JD
(job_id 4076130003) signals — legacy modernization, abstraction of
complex/repetitive problems, stability, self-directed problem definition,
build-infra work, React-Query/Next.js stack — **without naming Toss** (the
site is public).

## Interview findings (new material, user's own words)

- **Console component standardization (PortOne)**: on joining, props had no
  controlled/uncontrolled boundary (`categoryItem`/`setCategoryItem`); this
  blocks "what" abstraction (vs "how"). Standardized to
  `value`/`onChange`/`defaultValue`. Result: consistent form-writing halved
  (2x+) the time to build similarly complex forms.
- **Overlay UX guard**: sheets closed without warning during editing; applied
  edit-guard uniformly starting from the settlement-formula page (20+ inputs).
  Persuaded PM/PO via "bad UX means the product doesn't sell"; personal value:
  "B2B products raise customer productivity and move quitting time earlier."
  AEs later relayed customer feedback citing UX advantage.
- **Admin table abstraction**: sticky cells (left/right/top/bottom), bulk
  actions, nuqs-based deep links between related records (bulk-payment ID →
  its page in a new tab).
- **Build infra**: Quotabook monorepo attempt failed — 16 tightly-coupled
  domains, manual import-path splitting. At PortOne, revised strategy: split
  into design-system and application monorepos first; unified concurrency
  modules with Turbo, parallelized GitHub Actions, adopted TS 7.0 and tsdown.
  Build 3min → 50s.
- **React-Query (Quotabook)**: query-key-factory existed per-domain only;
  backend keyed on `institution` but query keys omitted it → cache bugs.
  Fixed across 400+ APIs by cross-checking backend legacy app + microservice
  implementations.
- **Next.js**: production Page Router experience at Quotabook; upstream PR
  fixed webpack `any` typing.
- **es-toolkit PRs**: low-effort day-one contributions — keep listed, don't
  spotlight.

## Structure changes

1. Summary rewritten around: abstraction of complex problems / find→define→
   propose→execute initiative / business impact; include the "퇴근시간"
   philosophy line.
2. PortOne bullets +4 (standardization, overlay UX, table abstraction, build
   infra 3min→50s).
3. Quotabook: concrete react-query story + Next.js (Page Router) named.
4. Highlights reordered to JD priorities; new highlights ①console
   standardization ③table abstraction ⑥build-infra failure→success arc;
   Salesforce+Hubspot merged into one.
5. Pre-2020 jobs compressed to one line each.
6. Everything stays in the public site voice — no Toss mention.
