# Security Checklist

## OWASP Top 10 (2021) Compliance
- [x] **A01:2021-Broken Access Control** (MITIGATED): Role-based middleware, explicit checks for object ownership.
- [x] **A02:2021-Cryptographic Failures** (MITIGATED): argon2id for passwords, RS256 for JWTs, HTTPS enforced via HSTS.
- [x] **A03:2021-Injection** (MITIGATED): Mongoose ODM prevents NoSQL injection, input validation via Zod.
- [x] **A04:2021-Insecure Design** (MITIGATED): Stateless architecture, minimal trust boundaries.
- [x] **A05:2021-Security Misconfiguration** (MITIGATED): Helmet security headers, cookie properties (HttpOnly, Secure, SameSite).
- [x] **A06:2021-Vulnerable and Outdated Components** (MITIGATED): Snyk & npm audit CI steps.
- [x] **A07:2021-Identification and Authentication Failures** (MITIGATED): 15m account lockout after 5 failed attempts, breached password checks.
- [x] **A08:2021-Software and Data Integrity Failures** (MITIGATED): Dependencies locked, Trivy scans.
- [x] **A09:2021-Security Logging and Monitoring Failures** (MITIGATED): Comprehensive auth event logging via Pino.
- [x] **A10:2021-Server-Side Request Forgery (SSRF)** (NOT_APPLICABLE): No external fetching from user input in auth paths.

## Threat Model (University Context)
- **Thesis unauthorized access**: Access tokens bound to specific roles and validated strictly.
- **Impersonation**: Risk engine + MFA + anomaly detection.
- **Session Hijack on shared computers**: Refresh token reuse detection revokes entire token family automatically. 
