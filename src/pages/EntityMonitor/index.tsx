/**
 * Task 2 — Entity Monitor
 *
 * Implement this screen based on the product requirements and API definitions below.
 * There is no design reference — layout, visual hierarchy, and UX decisions are yours to make.
 *
 * ─── Product Requirements ──────────────────────────────────────────────────────
 *
 * Analysts need a single screen to monitor a curated set of tracked entities
 * (people, organisations, locations, topics, events) for emerging threat signals.
 *
 * The screen must allow an analyst to:
 *
 *   1. Get an at-a-glance overview of monitoring activity:
 *      - Total signals detected in the current period
 *      - Number of critical signals
 *      - Newly surfaced entities
 *      - A breakdown of signals by threat level (Critical / High / Medium / Low / Informational)
 *
 *   2. Explore individual entity activity:
 *      - Select an entity from a list
 *      - See a time-series chart of mention counts and sentiment score over the last 30 days
 *
 *   3. Browse and triage signals:
 *      - View a paginated list of signals, each showing:
 *          - Entity name and type
 *          - Signal title and summary
 *          - Threat level (visually distinct — this is the primary triage dimension)
 *          - Detected date/time
 *          - Source domain and country
 *          - Number of related articles
 *      - Filter signals by: threat level, entity type
 *      - The list should update without a full page reload
 *
 * ─── API Reference ─────────────────────────────────────────────────────────────
 *
 * All functions are available in @/api/mock.ts. Their signatures are:
 *
 *   fetchEntityMonitorOverview(dateFrom: string, dateTo: string)
 *     → Promise<EntityMonitorOverview>
 *
 *   fetchEntities()
 *     → Promise<Entity[]>
 *
 *   fetchEntityTrend(entityId: string)
 *     → Promise<EntityTrendResponse>
 *
 *   fetchSignals(filters?: SignalFilters)
 *     → Promise<SignalsResponse>
 *
 * All types are defined in @/types/index.ts.
 *
 * ─── Notes ─────────────────────────────────────────────────────────────────────
 *
 * - The people using this tool operate in high-pressure environments. Clarity and
 *   information density matter more than decoration.
 * - Consider what happens when data is loading, empty, or returns an error.
 * - You do not need to implement authentication, routing, or persistence.
 */

export default function EntityMonitorPage() {
  return (
    <div>
      {/* TODO: implement */}
    </div>
  )
}
