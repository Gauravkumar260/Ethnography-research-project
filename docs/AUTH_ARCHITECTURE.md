# Auth Architecture

## System Overview
The auth system uses a stateless REST API with RS256 JWT access tokens and stateful (Redis-backed) refresh tokens. 

## Key Components
- **Access Tokens**: Short-lived (15m), self-contained RS256 JWTs. Verified at Edge/Middleware without DB lookup.
- **Refresh Tokens**: Long-lived (30d), cryptographically random hashes stored in MongoDB and cached in Redis. Support token family tracking for reuse detection.
- **Rate Limiting**: Distributed rate limiting using Redis, configured for IPs and specific routes (e.g., login, password reset).
- **Risk Engine**: Logs geolocation, device fingerprint, and IP. Blocks/prompts MFA for high-risk logins based on past user behavior.
- **MFA**: Support for TOTP using otplib.
- **Audit Logging**: Immutable logging of all auth events (e.g., login success/failure, token generation) to MongoDB.

## Data Flow (Login)
1. Request -> CSRF & Rate Limit Checks.
2. Verify credentials (Argon2id).
3. Risk Score Evaluation.
4. Issue Session -> Generate Access Token & Refresh Token.
5. Send Access Token in response body, Refresh Token in HttpOnly cookie.
