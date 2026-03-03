# Redis Key Schema

This document tracks all keys used in the Redis cache/store for the authentication and rate-limiting system.

| Key Pattern | Description | TTL | Value Type |
|:--- | :--- | :--- | :--- |
| `session:{sessionId}` | Serialized session object for fast lookup. | 30 Days | JSON String |
| `ratelimit:login:ip:{ip}` | Count of login attempts from a specific IP. | 15 Mins | Integer |
| `ratelimit:login:email:{email}` | Count of login attempts for a specific email. | 1 Hour | Integer |
| `ratelimit:register:ip:{ip}` | Count of registration attempts from an IP. | 1 Hour | Integer |
| `ratelimit:pwdreset:email:{email}`| Count of password reset requests for an email. | 1 Hour | Integer |
| `ratelimit:pwdreset:ip:{ip}` | Count of password reset requests from an IP. | 24 Hours | Integer |
| `ratelimit:mfa:{userId}` | Count of MFA attempts for a user. | 15 Mins | Integer |
| `ratelimit:api:{ip}` | Global API rate limit counter. | 1 Min | Integer |
| `token_blacklist:{jti}` | Blocked JWT IDs (revoked tokens). | Token Expiry | "1" |

## Naming Convention
- Use colons `:` as separators.
- Use lowercase for all keys.
- Prefix with purpose (e.g., `ratelimit:`, `session:`).
