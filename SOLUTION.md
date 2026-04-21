# Solution Notes

## 1) Approach

I implemented both assignment routes using the provided API/type contracts as immutable backend interfaces:

- Task 1: `/news-analytics`
- Task 2: `/entity-monitor`

Core implementation strategy:

- Build page-level orchestration first (loading/error/empty, filters, pagination, selections).
- Extract UI into feature-local components for readability and reuse.
- Keep data-fetching logic in feature-local hooks where practical.
- Preserve contract discipline: no modifications to `src/api/mock.ts` or `src/types/index.ts`.

For Task 2 specifically, I evolved the structure to support maintainability:

- `EntityMonitor/_components/OverviewPanel/*`
- `EntityMonitor/_components/EntityActivity/*`
- `EntityMonitor/_components/SignalFeed/*`
- `EntityMonitor/hooks/*`
- `EntityMonitor/constants/*`

This keeps display logic, interaction controls, and data hooks separated by concern.

## 2) Requirement Check

### Task 1 — News Analytics

- Top bar controls implemented (country + mode).
- Summary generation flow implemented with loading handling.
- Influential countries chart implemented.
- Source country/language Sankey implemented.
- Search/filter/pagination for articles implemented with empty/loading/error states.

### Task 2 — Entity Monitor

- **Overview panel**
  - Total signals, critical signals, new entities surfaced.
  - Visual threat-level breakdown (Critical/High/Medium/Low/Informational).
- **Entity activity**
  - Selectable entity list with clear selected state.
  - Time-series visualization includes **both mentions and sentiment** across 30 days.
  - Trend loading/error handled locally so list remains stable during trend reloads.
- **Signal feed**
  - Paginated, filterable signal list (threat level + entity type).
  - Required fields rendered: entity/type, title/summary, threat level, detected datetime, source domain/country, related articles.
  - Threat level is visually prominent (badge + severity left border accent).
  - Updates happen in-place without full page reload.
- Loading/error/empty states are handled for each panel, with min-height placeholders to reduce layout shift.

## 3) Trade-offs

What I prioritized:

- Functional completeness against assignment requirements.
- Clear feature-level structure and component extraction.
- Faster iteration for UI hierarchy and analyst-oriented readability.

What remains light:

- No dedicated automated test suite was added.
- Accessibility can be improved further (keyboard pass, screen reader UX details).
- Chart rendering is intentionally pragmatic (custom SVG lines) rather than introducing additional chart dependencies for Task 2.

## 4) If I had more time

- Add tests for hooks and critical interactions:
  - signal filter + pagination behavior
  - entity selection + trend reload behavior
  - loading/error transitions
- Improve responsive behavior in dense feed rows at narrow widths.
- Add URL-sync for feed filters/page for shareable analyst views.
- Strengthen accessibility (aria labeling, focus states, keyboard traversal).
