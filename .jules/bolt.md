## 2026-03-24 - [Backend Read-Side Mutability]
**Learning:** Found a side-effect in `getCommunityBySlug` that was updating the database (`researchCount`) on a GET request. This violates the principle of read-only GET requests and can cause race conditions or cache invalidation issues.
**Action:** Move all aggregation/count updates to the service layer methods that actually mutate the data (create/update/delete/status change).

## 2026-03-24 - [Compound vs Single Field Indexes]
**Learning:** MongoDB can only use one index per query stage. For `FieldData`, separate indexes on `community` and `type` were less efficient than a single compound index `{ community: 1, type: 1 }`, as the compound index also covers prefix matches (community-only).
**Action:** Use compound indexes for multi-field filtering and always include `{ background: true }` in migration scripts for safe deployment.
