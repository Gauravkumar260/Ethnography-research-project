# Incident Response Plan: Auth & Security

This document outlines the procedures to follow when a security incident related to the authentication system is detected.

## 1. Mass Credential Breach Detected
**Symptoms:** High rate of `LOGIN_FAILED` followed by `LOGIN_SUCCESS` from unknown IPs.
**Action:**
1. Identify affected user accounts via `AuthEvent` logs.
2. Force `mustChangePwd = true` for all affected users.
3. Revoke all active sessions for those users using `revokeAllUserSessions(userId)`.
4. Trigger a global password reset email for affected users.

## 2. JWT Signing Key Compromised
**Symptoms:** Unauthorized access detected with valid tokens that shouldn't exist.
**Action:**
1. Generate a new RS256 key pair using `scripts/generate-keys.ts`.
2. Update environment variables in all environments (Production, Staging).
3. Restart all server instances.
4. **Impact:** All users will be logged out immediately as their current tokens will fail verification.

## 3. Redis Auth Cache Failure
**Symptoms:** Auth requests failing with 500 errors, "Redis connection refused" in logs.
**Action:**
1. Check Redis service status (Upstash/Self-hosted).
2. If Redis is unrecoverable, the system will fall back to MongoDB for session validation (ensure DB fallback logic is active).
3. Performance may degrade significantly. Scale MongoDB if necessary.

## 4. Suspicious Mass Login from Single IP
**Symptoms:** `LOGIN_ATTEMPT_IP` rate limit triggers frequently from a specific IP.
**Action:**
1. Check `AuthEvent` logs for the specific IP.
2. If confirmed malicious, block the IP at the infrastructure level (WAF / Cloudflare / Firewall).
3. The internal `rateLimit.ts` will already be blocking the IP for 15-minute windows.

## 5. Emergency Contact
- Security Lead: @security-officer
- DevOps Lead: @devops-lead
- Lead Backend Engineer: @senior-dev-username
