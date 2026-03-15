# Security Checklist & Threat Model

## OWASP Top 10 (2021) Coverage

| Category | Status | Mitigations in Place |
| :--- | :--- | :--- |
| **A01: Broken Access Control** | ✅ MITIGATED | RBAC middleware with Edge-compatible JWT verification (`jose`), strict domain isolation. |
| **A02: Cryptographic Failures** | ✅ MITIGATED | Argon2id for passwords, RS256 for JWTs, AES-256-GCM for MFA secrets, TLS enforced via Helmet. |
| **A03: Injection** | ✅ MITIGATED | Mongoose strict mode, `express-mongo-sanitize`, Zod input validation, parameterized queries. |
| **A04: Insecure Design** | ✅ MITIGATED | Institutional Auth architecture, strict threat modeling, split-architecture boundaries. |
| **A05: Security Misconfiguration** | ✅ MITIGATED | Helmet.js headers, strict CORS, missing default accounts (except seeded Admin). |
| **A06: Vulnerable and Outdated Components** | 🟡 PARTIAL | Automated Snyk/Trivy scans in CI/CD, dependency pinning required. |
| **A07: Identification and Authentication Failures** | ✅ MITIGATED | Token rotation, session limits (max 3), Risk Engine scoring, HaveIBeenPwned checks, robust MFA. |
| **A08: Software and Data Integrity Failures** | 🟡 PARTIAL | Signed commits required, immutable AuthEvent logs, strict Docker image tags. |
| **A09: Security Logging and Monitoring Failures** | ✅ MITIGATED | OpenTelemetry tracing, Pino structured logging, robust audit trail (`AuthEvent`). |
| **A10: Server-Side Request Forgery (SSRF)** | ✅ MITIGATED | Network isolation in Docker, strictly controlled outbound requests (e.g., HIBP, ip-api). |

## University-Specific Threat Scenarios

1. **Mass Credential Stuffing**
   - **Mitigation:** IP-based and Email-based rate limiting via Redis Lua scripts + account lockout (escalating up to 24h).
2. **Session Hijacking / Device Theft**
   - **Mitigation:** Refresh token rotation with family reuse detection. Any reuse revokes all active sessions. Global concurrent session limits (3 max per user).
3. **Examiner Pre-Release Access**
   - **Mitigation:** Time-gated access in Next.js `middleware.ts` preventing Examiners from accessing thesis data before the official submission deadline.
4. **Data Exfiltration by Compromised Admin**
   - **Mitigation:** `AuthEvent` is immutable. Bulk downloads trigger alerts. IP geofencing and Device Fingerprinting track anomalies.
5. **Cross-Site Request Forgery (CSRF)**
   - **Mitigation:** Double-submit cookie pattern. `X-CSRF-Token` headers verified on all mutating routes via custom Redis-backed CSRF middleware and `csurf`.
