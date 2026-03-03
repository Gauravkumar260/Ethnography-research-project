# 🎓🔐 ELITE AUTH SYSTEM PROMPT
### University Research & Thesis Web App
### Optimized for: Cursor / GitHub Copilot — Paste & Execute

---

> **HOW TO USE THIS PROMPT IN CURSOR:**
> Open a new project → open Composer (Cmd+I) → paste each PHASE block one at a time.
> Each phase is self-contained and builds on the last. Do NOT paste all phases at once.
>
> 👋 **New to the team?** Start with `docs/ONBOARDING.md` after Phase 7 is generated.
> It gives you a 5-minute local setup guide with test accounts ready to use.
>
> 🔰 **Junior devs:** Every non-obvious line of code and config has an inline comment explaining *why* it exists — not just what it does. If something is unclear, check `docs/AUTH_ARCHITECTURE.md` first.

---

## 🗂️ PROJECT CONTEXT (Read before generating anything)

This is a **university research and thesis management web application**.

**Users:**
- `student` — submits thesis drafts, tracks progress, uploads documents
- `supervisor` — reviews/approves student submissions, provides feedback
- `examiner` — reads final submissions, submits evaluations (external, limited access)
- `department_admin` — manages users, deadlines, and department settings
- `super_admin` — university-wide control, full audit access

**Security threat profile:**
- Unpublished academic research (IP sensitivity — treat like trade secrets)
- External examiners accessing from unknown networks
- Long academic sessions (semester = ~4 months active)
- Shared university lab computers (session hijack risk)
- Target for academic fraud (impersonation, unauthorized access to peer submissions)

**Architecture goals:**
- Handle 10,000+ concurrent users during submission deadlines
- Horizontally scalable — stateless API, Redis-backed sessions
- Zero single point of failure on auth
- Sub-200ms login response at p99

---

## ⚙️ TECH STACK (Generate all code using this stack — do not deviate)

```
Frontend:   Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui
Backend:    Next.js API Routes (or separate Express if preferred)
Database:   MongoDB (Atlas or self-hosted) via Mongoose ODM
Cache:      Redis (Upstash or self-hosted) via ioredis
Auth:       Custom JWT (DO NOT use NextAuth — build from scratch for full control)
Email:      Resend (resend.com) with React Email templates
SMS/OTP:    Twilio Verify API
Password:   argon2id
Validation: Zod (all inputs — frontend AND backend)
Security:   Helmet.js, express-rate-limit, csurf or custom CSRF
Testing:    Vitest + Supertest + Playwright
Monitoring: Pino logger + OpenTelemetry traces
```

> ⚠️ **MongoDB-only rule**: No PostgreSQL, no Prisma, no SQL of any kind.
> Use Mongoose models with TypeScript interfaces for all data.
> Use MongoDB transactions (replica set required) for multi-document atomic operations.
> Use MongoDB Atlas Search for any audit log querying features.

---

## 📁 EXACT FILE STRUCTURE TO GENERATE

```
/src
  /app
    /auth
      /login/page.tsx
      /register/page.tsx
      /verify-email/page.tsx
      /forgot-password/page.tsx
      /reset-password/page.tsx
      /mfa/page.tsx
      /magic-link/page.tsx
      /sso/page.tsx
    /dashboard/page.tsx
  /api
    /auth
      /register/route.ts
      /login/route.ts
      /logout/route.ts
      /refresh/route.ts
      /verify-email/route.ts
      /forgot-password/route.ts
      /reset-password/route.ts
      /mfa/enable/route.ts
      /mfa/verify/route.ts
      /mfa/backup-codes/route.ts
      /sessions/route.ts
      /sessions/[id]/route.ts
      /oauth/[provider]/route.ts
      /magic-link/route.ts
      /me/route.ts
  /lib
    /auth
      tokens.ts
      passwords.ts
      sessions.ts
      rateLimit.ts
      csrf.ts
      mfa.ts
      oauth.ts
      audit.ts
      fingerprint.ts
      riskEngine.ts
      REDIS_KEYS.md          ← documents every Redis key used (team reference)
    /email
      templates/
        verify-email.tsx
        reset-password.tsx
        magic-link.tsx
        suspicious-login.tsx
        mfa-backup-codes.tsx
      sender.ts
    /db
      mongoose.ts
      models/
        User.ts
        Department.ts
        Session.ts
        OAuthAccount.ts
        MfaConfig.ts
        EmailVerification.ts
        PasswordReset.ts
        AuthEvent.ts
        index.ts
      seed.ts
  /middleware.ts
  /hooks
    useAuth.ts
    useSession.ts
  /components/auth
    LoginForm.tsx
    RegisterForm.tsx
    MFAInput.tsx
    PasswordStrengthMeter.tsx
    SessionsTable.tsx
    OAuthButtons.tsx
    SSOButton.tsx
/scripts
  seed.ts
  generate-keys.ts           ← generates RS256 key pair, prints to console
  check-env.ts               ← validates all required env vars on startup
/tests
  /unit
    tokens.test.ts
    passwords.test.ts
    rateLimit.test.ts
  /integration
    auth-flows.test.ts
    mfa-flows.test.ts
    session-management.test.ts
  /security
    brute-force.test.ts
    token-reuse.test.ts
    csrf.test.ts
  /e2e
    login.spec.ts
    register.spec.ts
    mfa.spec.ts
  /load
    auth-load.js             ← k6 load test script

# Docker & Infrastructure
docker-compose.yml           ← local dev (app + MongoDB + Redis + mongo-express)
docker-compose.prod.yml      ← production (no mongo-express, with health checks)
Dockerfile                   ← multi-stage build (deps → builder → runner)
.dockerignore

# CI/CD
.github/
  workflows/
    ci.yml                   ← runs on every PR: lint + typecheck + test
    security-audit.yml       ← runs on every PR: npm audit + snyk + secrets scan
    deploy-staging.yml       ← auto-deploy to staging on merge to develop
    deploy-production.yml    ← manual trigger deploy to production
  CODEOWNERS                 ← auth/* requires senior dev review
  pull_request_template.md   ← PR checklist including security sign-off

# Docs (critical for mixed teams)
docs/
  AUTH_ARCHITECTURE.md       ← system overview with diagrams
  ONBOARDING.md              ← new dev setup guide (5-minute quickstart)
  INCIDENT_RESPONSE.md       ← what to do when auth breaks
  SECURITY_CHECKLIST.md      ← OWASP compliance status
  REDIS_KEYS.md              ← all Redis keys documented

# Config
.env.example                 ← all env vars with descriptions (commit this)
.env.local                   ← actual secrets (never commit — in .gitignore)
```

---

## 🗄️ PHASE 1 — MONGODB SCHEMAS (Mongoose)

**Paste this into Cursor Composer first.**

```
Generate complete Mongoose ODM models for a university research app auth system.
Use TypeScript interfaces + Mongoose Schema for every model.
Create src/lib/db/models/ directory with one file per model.
Create src/lib/db/mongoose.ts as the singleton connection file (handles Next.js hot reload).

--- mongoose.ts ---
- Singleton pattern safe for Next.js (check mongoose.connection.readyState)
- Connect using MONGODB_URI env var
- Enable Mongoose strict mode globally
- Log connection events with Pino

--- models/User.ts ---
interface IUser:
  _id: ObjectId
  email: string (unique, lowercase, trim)
  passwordHash: string | null (null for OAuth-only users)
  emailVerified: boolean (default: false)
  emailVerifiedAt: Date | null
  role: 'STUDENT' | 'SUPERVISOR' | 'EXAMINER' | 'DEPARTMENT_ADMIN' | 'SUPER_ADMIN'
  departmentId: ObjectId (ref: 'Department')
  studentId: string | null (unique sparse — only for students)
  fullName: string
  avatarUrl: string | null
  isActive: boolean (default: true)
  isBanned: boolean (default: false)
  bannedReason: string | null
  failedLoginAttempts: number (default: 0)
  lockedUntil: Date | null
  mustChangePwd: boolean (default: false)
  lastLoginAt: Date | null
  lastLoginIp: string | null
  createdAt: Date
  updatedAt: Date

Schema options: { timestamps: true }
Indexes: email (unique), departmentId, role, studentId (sparse unique)
Methods:
  isLocked(): boolean — checks lockedUntil > now
  incrementFailedAttempts(): Promise<void> — increment + auto-lock at 5/10
  resetFailedAttempts(): Promise<void>
  toSafeObject(): object — strips passwordHash, sensitive fields

--- models/Department.ts ---
interface IDepartment:
  _id: ObjectId
  name: string
  code: string (unique, uppercase)
  institutionDomain: string (e.g. "university.edu")
  isActive: boolean (default: true)
  createdAt: Date, updatedAt: Date
Indexes: code (unique), institutionDomain

--- models/Session.ts ---
interface ISession:
  _id: ObjectId
  userId: ObjectId (ref: 'User')
  refreshTokenHash: string (unique)
  tokenFamily: string (for reuse detection — group related refresh tokens)
  deviceInfo: {
    browser: string, os: string, deviceType: 'mobile'|'desktop'|'tablet'
  }
  ipAddress: string
  userAgent: string
  location: { country: string, city: string, region: string } | null
  isActive: boolean (default: true)
  createdAt: Date
  expiresAt: Date (TTL index — MongoDB auto-deletes expired sessions)
  lastUsedAt: Date
  revokedAt: Date | null

Indexes: userId, refreshTokenHash (unique), tokenFamily, expiresAt (TTL index: expireAfterSeconds: 0)

--- models/OAuthAccount.ts ---
interface IOAuthAccount:
  _id: ObjectId
  userId: ObjectId (ref: 'User')
  provider: 'GOOGLE' | 'MICROSOFT' | 'GITHUB'
  providerUserId: string
  accessToken: string (encrypted with AES-256-GCM before storage)
  refreshToken: string | null (encrypted)
  expiresAt: Date | null
  createdAt: Date, updatedAt: Date

Indexes: { provider, providerUserId } (unique compound), userId

--- models/MfaConfig.ts ---
interface IMfaConfig:
  _id: ObjectId
  userId: ObjectId (ref: 'User', unique)
  method: 'TOTP' | 'SMS'
  secret: string (encrypted AES-256-GCM)
  isEnabled: boolean (default: false)
  enabledAt: Date | null
  phoneNumber: string | null (encrypted, for SMS method)
  backupCodes: Array<{
    codeHash: string,
    isUsed: boolean,
    usedAt: Date | null
  }>
  lastUsedAt: Date | null
  createdAt: Date, updatedAt: Date

Index: userId (unique)

--- models/EmailVerification.ts ---
interface IEmailVerification:
  _id: ObjectId
  userId: ObjectId (ref: 'User')
  tokenHash: string (unique)
  expiresAt: Date (TTL index)
  createdAt: Date
  usedAt: Date | null

Indexes: tokenHash (unique), userId, expiresAt (TTL)

--- models/PasswordReset.ts ---
interface IPasswordReset:
  _id: ObjectId
  userId: ObjectId (ref: 'User')
  tokenHash: string (unique)
  expiresAt: Date (TTL index)
  createdAt: Date
  usedAt: Date | null
  ipAddress: string

Indexes: tokenHash (unique), userId, expiresAt (TTL)

--- models/AuthEvent.ts ---
IMMUTABLE — disable all update/delete operations at schema level using pre hooks.
interface IAuthEvent:
  _id: ObjectId
  userId: ObjectId | null (ref: 'User', null for pre-auth events like failed login on unknown email)
  eventType: enum (REGISTER | LOGIN_SUCCESS | LOGIN_FAILED | LOGOUT |
    TOKEN_REFRESHED | PASSWORD_CHANGED | PASSWORD_RESET | EMAIL_VERIFIED |
    MFA_ENABLED | MFA_DISABLED | MFA_USED | MFA_BACKUP_USED |
    SESSION_REVOKED | ACCOUNT_LOCKED | ACCOUNT_UNLOCKED |
    OAUTH_LINKED | SUSPICIOUS_ACTIVITY | ROLE_CHANGED | ACCOUNT_DELETED)
  ipAddress: string
  userAgent: string
  metadata: Record<string, unknown> (flexible extra data)
  success: boolean
  riskScore: number | null
  createdAt: Date (no updatedAt — immutable)

Schema options: { timestamps: { createdAt: true, updatedAt: false } }
Indexes: userId, eventType, createdAt (descending for recent-first queries)
Compound index: { userId: 1, createdAt: -1 } for per-user audit history

--- models/index.ts ---
Export all models cleanly. Guard against Next.js model re-registration:
  const User = mongoose.models.User || mongoose.model('User', UserSchema)

After all models, generate src/lib/db/seed.ts:
- Creates default departments (Computer Science, Engineering, Arts)
- Creates one SUPER_ADMIN test user
- Safe to run multiple times (upsert pattern)
```

---

## 🔑 PHASE 2 — CORE AUTH LIBRARY

**Paste after Phase 1 is complete.**

```
Using the Mongoose models from Phase 1, generate these auth library files:

--- src/lib/auth/passwords.ts ---
- hashPassword(password: string): Promise<string> using argon2id
  with memoryCost: 65536, timeCost: 3, parallelism: 4
- verifyPassword(hash: string, password: string): Promise<boolean>
- checkPasswordStrength(password: string): { score: 0-4, feedback: string[] }
  using zxcvbn library
- checkBreachedPassword(password: string): Promise<boolean>
  using HaveIBeenPwned k-anonymity API (SHA-1 prefix method)
- Minimum password rules: 12 chars, 1 upper, 1 lower, 1 digit, 1 special

--- src/lib/auth/tokens.ts ---
- generateAccessToken(payload: AccessTokenPayload): string
  JWT signed with RS256 (asymmetric), expires 15 minutes
  Payload: { sub: userId, role, sessionId, jti (unique token id) }
- generateRefreshToken(): { token: string, hash: string }
  cryptographically random 64-byte hex, returns raw + bcrypt hash for storage
- verifyAccessToken(token: string): AccessTokenPayload | null
- generateEmailToken(): { token: string, hash: string }
  32-byte random hex for email verification and password reset
- generateOtpSecret(): string using otplib
- verifyOtp(secret: string, token: string): boolean
- generateBackupCodes(count = 8): { codes: string[], hashes: string[] }
  each code is random 10-char alphanumeric, returned with argon2id hashes
- Store RSA key pair loading from env (RS256_PRIVATE_KEY, RS256_PUBLIC_KEY)

--- src/lib/auth/sessions.ts ---
Redis-backed session management:
- createSession(userId, deviceInfo, ip, userAgent): Promise<Session>
  Store session in DB + cache session lookup in Redis (key: session:{id})
- getSession(sessionId): Promise<Session | null> — Redis first, DB fallback
- refreshSession(oldRefreshToken, deviceInfo, ip): Promise<{ accessToken, refreshToken } | null>
  Implement REFRESH TOKEN ROTATION with REUSE DETECTION:
  - If reuse detected → revoke ENTIRE session family → log SUSPICIOUS_ACTIVITY event
- revokeSession(sessionId): Promise<void>
- revokeAllUserSessions(userId, exceptSessionId?): Promise<void>
- getUserActiveSessions(userId): Promise<SessionInfo[]>
- cleanExpiredSessions(): Promise<void> — for cron job

--- src/lib/auth/rateLimit.ts ---
- checkRateLimit(key: string, maxAttempts: number, windowSeconds: number): Promise<{ allowed: boolean, remaining: number, resetAt: Date }>
  Use Redis INCR + EXPIRE pattern for atomic operations
- recordFailedAttempt(key: string): Promise<void>
- resetRateLimit(key: string): Promise<void>
- Rate limit profiles:
  LOGIN_ATTEMPT: 5 per 15 minutes per IP, 10 per hour per email
  REGISTER: 3 per hour per IP
  PASSWORD_RESET: 3 per hour per email, 10 per day per IP
  EMAIL_VERIFY_RESEND: 3 per hour per user
  MFA_ATTEMPT: 5 per 15 minutes per user
  API_GLOBAL: 100 per minute per IP

--- src/lib/auth/riskEngine.ts ---
- scoreLoginRisk(userId, ip, userAgent, deviceFingerprint): Promise<RiskScore>
  Returns score 0.0-1.0 based on:
  - New device/browser (never seen before): +0.3
  - New country/region (from IP geolocation): +0.4
  - Failed attempts in last hour: +0.1 per attempt
  - Login at unusual hour (compare to user's historical pattern): +0.2
  - Known malicious IP (check against AbuseIPDB): +0.5
  - Score >= 0.6: require MFA even if not enrolled → send email alert
  - Score >= 0.8: block + send suspicious activity email + log event
- getIpGeoLocation(ip: string): Promise<GeoLocation> using ip-api.com

--- src/lib/auth/audit.ts ---
- logAuthEvent(event: AuthEventInput): Promise<void>
  Writes to DB AuthEvent table, never throws (fire-and-forget with error logging)
- getAuthEvents(userId, filters): Promise<AuthEvent[]>
- getFailedLoginAttempts(userId, since: Date): Promise<number>
```

---

## 🌐 PHASE 3 — API ROUTES

**Paste after Phase 2 is complete.**

```
Generate all Next.js 14 App Router API route handlers for the auth system.
Use the library functions from Phase 2. Follow this exact pattern for every route:
1. Parse + validate input with Zod
2. Check rate limit
3. Execute logic
4. Log auth event
5. Return typed response

Generate these routes:

--- POST /api/auth/register ---
- Validate: email (must match institutionDomain in any Department), password, fullName, studentId, departmentId, role (only STUDENT/SUPERVISOR allowed on self-register)
- Check email not already registered
- Check breached password
- Hash password with argon2id
- Create user (emailVerified: false)
- Generate email verification token, store hash in EmailVerification table
- Send verification email (React Email template)
- Log REGISTER event
- Return: { message: "Verification email sent" } — do NOT auto-login until verified
- Rate limit: REGISTER profile

--- POST /api/auth/login ---
- Validate: email, password, mfaToken? (optional), deviceFingerprint
- Find user by email — if not found, still run verifyPassword on dummy hash (timing attack prevention)
- Check account not banned or locked (lockedUntil)
- Check rate limit (LOGIN_ATTEMPT for both IP and email)
- Verify password
- On fail: increment failedLoginAttempts, lock if >= 5 (lockedUntil = now + 15min), log LOGIN_FAILED
- On success: reset failedLoginAttempts
- Check emailVerified — if false, return specific error with resend option
- Run risk engine scoring
- If user has MFA enabled: validate mfaToken (TOTP or backup code), if missing return { requiresMfa: true }
- If risk score >= 0.6 and no MFA: send alert email, return { requiresAdditionalVerification: true }
- Create session (createSession)
- Generate access token + refresh token
- Set refresh token in HttpOnly, Secure, SameSite=Strict cookie (named __rt)
- Log LOGIN_SUCCESS event with riskScore
- Return: { accessToken, user: { id, email, role, fullName } }

--- POST /api/auth/logout ---
- Require valid access token
- Revoke current session
- Clear __rt cookie
- Log LOGOUT event

--- POST /api/auth/refresh ---
- Read __rt cookie (refresh token)
- Call refreshSession() — handles rotation + reuse detection
- Set new __rt cookie
- Return new accessToken
- On failure: clear cookie, return 401

--- POST /api/auth/verify-email ---
- Validate: token (from email link)
- Find EmailVerification by token hash, check not expired, not used
- Mark emailVerified = true on user, mark token used
- Log EMAIL_VERIFIED event
- Return: { message: "Email verified" }

--- POST /api/auth/forgot-password ---
- Validate: email
- Rate limit: PASSWORD_RESET profile
- Find user (do not reveal if email exists — always return same message)
- Generate reset token, store hash in PasswordReset (expires 1 hour)
- Invalidate any previous unused reset tokens for this user
- Send reset email
- Return: { message: "If that email exists, a reset link was sent" }

--- POST /api/auth/reset-password ---
- Validate: token, newPassword (+ strength check)
- Find PasswordReset by hash, check not expired, not used
- Check new password not same as current
- Check breached password
- Hash new password
- Update user, mark mustChangePwd = false
- Mark token used
- Revoke ALL existing sessions (security: log out everywhere)
- Log PASSWORD_RESET event
- Return: { message: "Password updated. Please log in." }

--- POST /api/auth/mfa/enable ---
- Require authenticated user
- Generate TOTP secret with otplib
- Return: { secret, qrCodeUrl (otpauth:// URI for QR code), backupCodes }
- Do NOT save yet — save only when user verifies with /mfa/verify

--- POST /api/auth/mfa/verify ---
- Require authenticated user
- Validate: totp code
- If MFA not yet saved (enabling flow): save secret to MfaConfig, save backup code hashes, log MFA_ENABLED
- If MFA already active (login flow): handled in login route
- Return: { success: true }

--- GET /api/auth/sessions ---
- Require authenticated user
- Return all active sessions for user with: deviceInfo, ip, location, lastUsedAt, isCurrent (boolean)

--- DELETE /api/auth/sessions/:id ---
- Require authenticated user
- Verify session belongs to user
- Revoke session
- Log SESSION_REVOKED

--- DELETE /api/auth/sessions ---
- Revoke ALL sessions except current
- Log SESSION_REVOKED for each

--- GET /api/auth/me ---
- Require valid access token
- Return user profile (no sensitive fields)

Add middleware for:
- CSRF validation on all mutating routes (POST/DELETE)
- Helmet security headers on all routes
- Request logging with Pino
- Global error handler that never leaks stack traces to client
```

---

## 🎨 PHASE 4 — FRONTEND UI

**Paste after Phase 3 is complete.**

```
Generate production-quality React components for the university research app auth UI.
Use Next.js 14 App Router, TypeScript, Tailwind CSS, shadcn/ui, react-hook-form + Zod.

Design direction: Clean academic/institutional aesthetic. Dark navy + white + gold accent.
Font: Playfair Display for headings, Source Sans Pro for body. Subtle parchment texture on cards.
Feels like: a prestigious university portal — trustworthy, serious, scholarly.

--- LoginForm.tsx ---
- Email + password fields with react-hook-form
- Show/hide password toggle
- "Remember this device" checkbox
- Social login buttons: Google (institutional), Microsoft (university SSO)
- Magic link option: "Email me a login link instead"
- TOTP MFA step (conditionally shown after password if requiresMfa returned)
  - 6 individual digit input boxes with auto-advance on type
  - Backup code toggle link
- Link to forgot password
- Real-time Zod validation (onBlur)
- Loading spinner on submit
- Error toast (react-hot-toast) for failed login
- On risk alert: show "Unusual login detected" warning banner with email sent notice

--- RegisterForm.tsx ---
- Full name, student/staff ID, email (validate @university.edu domain live), department selector, role selector
- Password field with live PasswordStrengthMeter component (0-4 score, color-coded, feedback list)
- Confirm password
- Terms acceptance checkbox
- Submit → show "Check your inbox" confirmation screen with resend button (60s cooldown)

--- PasswordStrengthMeter.tsx ---
- Accepts password string, shows animated bar (red→orange→yellow→green)
- Lists specific requirements: length, uppercase, number, special char, breach check (async)
- Uses zxcvbn for overall score

--- MFASetup.tsx ---
- QR code display (using qrcode.react)
- Manual entry key option
- 6-digit verification input
- Backup codes reveal (blurred by default, click to show, download as .txt)
- Confirmation checkbox before completing setup

--- SessionsTable.tsx ---
- Table of active sessions: device icon (mobile/desktop/tablet), browser, OS, location, last active, "Current" badge
- Revoke button per row
- "Log out all other devices" button at top
- Skeleton loading state

--- SSOButton.tsx ---
- Microsoft Azure AD button styled with university branding
- "Sign in with [University Name] Account" text
- Handles redirect flow

All forms must:
- Be fully keyboard navigable
- Have proper aria-labels and aria-describedby for errors
- Work on mobile (responsive)
- Never show raw error messages from server in UI — map to user-friendly strings
```

---

## 🛡️ PHASE 5 — SECURITY HARDENING

**Paste after Phase 4 is complete.**

```
Harden the university research auth system to pen-test level security.

1. NEXT.JS MIDDLEWARE (src/middleware.ts)
   - Protect all routes under /dashboard, /thesis, /research, /admin
   - Verify access token (RS256) at Edge — reject expired/invalid tokens immediately
   - Role-based path enforcement:
     /admin/** → DEPARTMENT_ADMIN, SUPER_ADMIN only
     /supervisor/** → SUPERVISOR, DEPARTMENT_ADMIN, SUPER_ADMIN only
     /examiner/** → EXAMINER only (time-gated: only accessible after submission deadline)
   - Add security headers to ALL responses:
     Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
     X-Frame-Options: DENY
     X-Content-Type-Options: nosniff
     Referrer-Policy: strict-origin-when-cross-origin
     Permissions-Policy: camera=(), microphone=(), geolocation=()
     Content-Security-Policy: (strict policy — allow only own origin + resend CDN)
   - Block requests with missing or invalid Origin header on API routes

2. CSRF PROTECTION
   - Generate CSRF token on session creation, store in Redis
   - Set as non-HttpOnly cookie (readable by JS for header injection)
   - Validate X-CSRF-Token header on all POST/PUT/DELETE requests
   - Double-submit cookie pattern

3. TOKEN SECURITY
   - Access token: RS256 asymmetric JWT, 15min expiry, jti claim for revocation
   - Maintain a Redis blacklist for revoked jtis (only active tokens, auto-expire)
   - Refresh token: random 64-byte hex, stored hashed in DB, rotated on every use
   - Detect refresh token reuse → revoke entire session family → alert user by email

4. ACCOUNT SECURITY POLICIES
   - Auto-lock after 5 failed logins: 15min → 1hr → 24hr (escalating)
   - Permanent lock after 10 lifetime bans (requires admin to unlock)
   - Force password change if mustChangePwd flag set (e.g. admin-created accounts)
   - Session timeout: 8 hours idle → show countdown modal at 7h45m → auto logout
   - Concurrent session limit: 3 active sessions per user (oldest revoked on 4th login)

5. INPUT SECURITY
   - All API inputs validated with Zod (reject unknown fields with .strict())
   - Email normalized: lowercase + trim before any DB operation
   - All DB queries via Mongoose (no raw MongoDB queries in auth routes — use Model methods)
   - Use MongoDB transactions (session.withTransaction) for multi-document operations (e.g. create user + email verification atomically)
   - DOMPurify on any user-provided string rendered in React components
   - File uploads (thesis docs) NOT handled in auth routes — separate service

6. DEPENDENCY SECURITY
   Generate:
   - .snyk policy file
   - GitHub Actions workflow: security-audit.yml
     - Runs on every PR
     - npm audit --audit-level=high (fail on high/critical)
     - Snyk scan
     - Semgrep SAST scan for auth-specific rules
     - Gitleaks secrets scan
     - Trivy container scan

7. PENETRATION TEST CHECKLIST
   Generate a file SECURITY_CHECKLIST.md covering:
   - OWASP Top 10 (2021) — mark each as MITIGATED/PARTIAL/NOT_APPLICABLE with how
   - OWASP ASVS Level 2 auth requirements checklist
   - Specific university threat model:
     - Thesis content unauthorized access
     - Student impersonating supervisor
     - Examiner accessing submissions before deadline
     - Credential stuffing from breached student email lists
     - Session hijack on shared lab computers
   - Recommended pen test scenarios with expected behavior
```

---

## 📈 PHASE 6 — SCALABILITY & OBSERVABILITY

**Paste last.**

```
Add production scalability and observability to the auth system.

1. HORIZONTAL SCALING
   - Ensure auth service is fully STATELESS (all state in Redis/DB — no in-memory)
   - Redis connection pooling with ioredis cluster mode support
   - MongoDB connection pooling: set maxPoolSize: 50 in Mongoose connect options
   - Use MongoDB Atlas connection string with retryWrites=true&w=majority
   - Enable MongoDB Atlas auto-scaling (M10+ cluster recommended for production)
   - Use MongoDB change streams for real-time session revocation propagation across instances
   - Verify no file system writes in auth paths (use object storage for any assets)

2. REDIS ARCHITECTURE
   - Key schema documentation in src/lib/auth/REDIS_KEYS.md:
     session:{sessionId} → session data (TTL = refresh token expiry)
     ratelimit:{key} → count (TTL = window)
     token_blacklist:{jti} → "1" (TTL = token expiry)
     csrf:{sessionId} → csrf token (TTL = session)
     otp_attempt:{userId} → count (TTL = 15min)
   - Redis Lua scripts for atomic rate limit increment+check
   - Cache invalidation strategy on user role change and account lock

3. PERFORMANCE TARGETS
   Add load test script using k6 (tests/load/auth-load.js):
   - Simulate 500 concurrent logins
   - Simulate deadline rush: 2000 concurrent requests over 5 minutes
   - Assert: p95 login < 300ms, p99 < 500ms, error rate < 0.1%

4. LOGGING & TRACING
   - Pino structured JSON logging (no PII in logs — hash userId, mask email)
   - OpenTelemetry traces for every auth operation with span attributes:
     auth.operation, auth.userId (hashed), auth.risk_score, auth.mfa_used
   - Correlation ID (X-Request-ID) propagated through all logs and responses
   - Log levels: ERROR for security events, WARN for rate limits, INFO for success

5. MONITORING ALERTS (generate Grafana dashboard JSON + alert rules)
   Alert on:
   - Login failure rate > 10% over 5 minutes → possible credential stuffing
   - Rate limit triggers > 100/minute → possible DDoS on auth
   - Token reuse detections > 0 in 1 hour → active session hijack attempt
   - Auth service p99 latency > 500ms → performance degradation
   - DB connection pool exhaustion → scale event

6. DISASTER RECOVERY
   - Document token rotation procedure if JWT signing key is compromised
   - Redis flush recovery plan (auth continues via DB fallback)
   - Generate runbook: INCIDENT_RESPONSE.md covering:
     "Mass credential breach detected"
     "JWT signing key compromised"
     "Redis auth cache failure"
     "Suspicious mass login from single IP"
```

---

## 🐳 PHASE 7 — DOCKER & CI/CD PIPELINE

**Paste after Phase 6 is complete. This is the final infrastructure phase.**

```
Generate all Docker and CI/CD configuration for the university research auth system.
This team is mixed experience — add clear inline comments on every non-obvious line
so junior developers can understand what each part does.

--- Dockerfile ---
Generate a multi-stage production Dockerfile:

Stage 1 (deps): node:20-alpine — install only production dependencies
Stage 2 (builder): copy source, run next build
Stage 3 (runner): node:20-alpine — copy only built output + prod node_modules
  - Run as non-root user (uid 1001) — never run as root in production
  - EXPOSE 3000
  - Set NODE_ENV=production
  - Add HEALTHCHECK: curl -f http://localhost:3000/api/health || exit 1
  - Comment every FROM, COPY, RUN line explaining why it's there

--- .dockerignore ---
node_modules, .next, .env*, *.test.ts, tests/, docs/, .git

--- docker-compose.yml (LOCAL DEV — for all team members) ---
Services:
  app:
    build: . (with target: deps for fast dev rebuilds)
    volumes: mount src/ for hot reload
    ports: 3000:3000
    env_file: .env.local
    depends_on: mongodb (with condition: service_healthy), redis
    command: npm run dev

  mongodb:
    image: mongo:7
    ports: 27017:27017
    environment: MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD
    volumes: mongo_data:/data/db (named volume for persistence)
    healthcheck: mongosh --eval "db.adminCommand('ping')" every 10s
    # WHY replica set? MongoDB transactions require a replica set.
    # Even in local dev we run a single-node replica set.
    command: mongod --replSet rs0 --bind_ip_all
    # Init script to initiate the replica set on first start:

  mongo-init:
    image: mongo:7
    depends_on: [mongodb]
    restart: on-failure
    command: >
      mongosh --host mongodb:27017 -u admin -p password --authenticationDatabase admin
      --eval "rs.initiate({_id:'rs0', members:[{_id:0,host:'mongodb:27017'}]})"
    # This only needs to run once — after that MongoDB remembers the replica set config

  redis:
    image: redis:7-alpine
    ports: 6379:6379
    volumes: redis_data:/data
    command: redis-server --appendonly yes  # persist data to disk
    healthcheck: redis-cli ping every 10s

  mongo-express:
    image: mongo-express:latest
    ports: 8081:8081  # Visit localhost:8081 to browse your MongoDB data
    environment: ME_CONFIG_MONGODB_* (connect to mongodb service)
    depends_on: [mongodb]
    # ⚠️ NEVER include mongo-express in production — dev only!

volumes:
  mongo_data:
  redis_data:

Add a comment block at top of docker-compose.yml:
  # HOW TO START: docker compose up -d
  # HOW TO SEED DB: docker compose exec app npm run seed
  # HOW TO VIEW LOGS: docker compose logs -f app
  # HOW TO RESET ALL DATA: docker compose down -v && docker compose up -d

--- docker-compose.prod.yml (PRODUCTION OVERRIDES) ---
Override for production deployment:
  app:
    image: ghcr.io/${GITHUB_REPOSITORY}:${IMAGE_TAG}  # use pre-built image
    deploy:
      replicas: 3
      restart_policy: condition: on-failure
      resources: limits (cpu: 1, memory: 1G)
    healthcheck configured
    no volume mounts (immutable containers in prod)

  mongodb: (remove — use MongoDB Atlas in production, not self-hosted)
  redis: (keep — or swap for Upstash via REDIS_URL env var)
  mongo-express: (remove — never in production)

Add comment: "Use with: docker compose -f docker-compose.yml -f docker-compose.prod.yml up"

--- scripts/generate-keys.ts ---
Script any team member can run to generate RS256 key pair:
  npx ts-node scripts/generate-keys.ts
  → generates private.pem + public.pem
  → prints base64-encoded versions ready to paste into .env.local
  → prints instructions for setting in Vercel/Railway/Render secrets

--- scripts/check-env.ts ---
Validates all required environment variables on startup:
  - Runs before server starts (add to package.json predev and prestart scripts)
  - Lists missing variables with descriptions of what each is for
  - Warns if using default/insecure values (e.g. CSRF_SECRET=changeme)
  - Exits process with clear error if critical vars missing
  This is especially helpful for new team members setting up for the first time.

--- .github/workflows/ci.yml ---
Name: CI — Lint, Type Check & Test
Triggers: push to any branch, pull_request to main and develop

Jobs:
  lint-and-typecheck:
    runs-on: ubuntu-latest
    steps:
      - checkout
      - setup node 20 with npm cache
      - npm ci (faster than npm install in CI)
      - npm run lint (ESLint)
      - npm run type-check (tsc --noEmit)

  test:
    runs-on: ubuntu-latest
    services:
      mongodb:
        image: mongo:7
        options: >-
          --health-cmd "mongosh --eval \"db.adminCommand('ping')\""
          --health-interval 10s
        ports: 27017:27017
      redis:
        image: redis:7-alpine
        options: --health-cmd "redis-cli ping"
        ports: 6379:6379
    env:
      MONGODB_URI: mongodb://localhost:27017/thesis_auth_test
      REDIS_URL: redis://localhost:6379
      (all other required test env vars with safe dummy values)
    steps:
      - checkout
      - setup node 20
      - npm ci
      - npm run test:unit (Vitest)
      - npm run test:integration
      - npm run test:security
      - Upload coverage report to Codecov
    # Tests must pass before any PR can be merged

  build:
    runs-on: ubuntu-latest
    needs: [lint-and-typecheck, test]
    steps:
      - checkout
      - setup node 20
      - npm ci
      - npm run build
      - Build Docker image (docker build .)
      - Confirm image builds successfully

--- .github/workflows/security-audit.yml ---
Name: Security Audit
Triggers: pull_request to main and develop, schedule: weekly Monday 9am

Jobs:
  dependency-audit:
    - npm audit --audit-level=high (fail on high/critical vulnerabilities)
    - npx snyk test (requires SNYK_TOKEN secret)

  secrets-scan:
    - uses: gitleaks/gitleaks-action@v2
    - Scans entire git history for accidentally committed secrets
    - Add comment explaining: "This catches if anyone commits .env files or API keys"

  sast:
    - uses: github/codeql-action/analyze (JavaScript/TypeScript)
    - Semgrep scan with auth-specific ruleset (semgrep --config=p/jwt semgrep --config=p/nodejs)
    - Add comment: "Static analysis catches common auth vulnerabilities like JWT algorithm confusion"

  container-scan:
    - Build Docker image
    - Scan with Trivy: trivy image --exit-code 1 --severity HIGH,CRITICAL
    - Upload results as GitHub Security tab findings

--- .github/workflows/deploy-staging.yml ---
Name: Deploy to Staging
Triggers: push to develop branch (auto-deploy)

Jobs:
  deploy:
    - Build and push Docker image to GHCR (GitHub Container Registry)
    - Tag: ghcr.io/{repo}:staging-{sha}
    - Deploy to staging environment (Railway/Render/Fly.io — add your platform)
    - Run smoke tests after deploy:
      - POST /api/auth/register (expect 200)
      - POST /api/auth/login with wrong password (expect 401, not 500)
      - GET /api/auth/me without token (expect 401)
    - Notify team Slack channel on success/failure
    # Staging uses a separate MongoDB Atlas cluster and Redis instance

--- .github/workflows/deploy-production.yml ---
Name: Deploy to Production
Triggers: MANUAL ONLY (workflow_dispatch) with required input: confirm_deploy = "yes"
  # WHY manual? Prevents accidental production deploys.
  # A senior dev must consciously trigger this.

Jobs:
  pre-deploy-checks:
    - Verify all CI checks passed on this commit
    - Run npm audit one final time
    - Require approval from CODEOWNERS (set up branch protection rules)

  deploy:
    - Build and push Docker image: ghcr.io/{repo}:{git-tag}
    - Blue-green deployment (deploy new version alongside old, switch traffic, keep old for 10min rollback window)
    - Run same smoke tests as staging
    - On failure: automatic rollback to previous image
    - Notify team on success with deploy summary (who deployed, what commit, when)

--- .github/CODEOWNERS ---
# Auth code requires review from a senior/security-aware team member
/src/lib/auth/          @senior-dev-username
/src/api/auth/          @senior-dev-username
/.github/workflows/     @senior-dev-username
Dockerfile              @senior-dev-username

--- .github/pull_request_template.md ---
Generate a PR template with sections:
  ## What changed
  ## How to test
  ## Security checklist (checkboxes):
    - [ ] No secrets or credentials committed
    - [ ] Input validation added for any new fields
    - [ ] Auth events logged for any new auth operations
    - [ ] Rate limiting applied if this is a public endpoint
    - [ ] Tests added/updated
  ## Breaking changes

--- docs/ONBOARDING.md ---
Generate a friendly onboarding guide for new developers:

  # Getting Started in 5 Minutes

  ## Prerequisites
  - Node.js 20+, Docker Desktop, Git

  ## First-time setup
  1. Clone the repo
  2. cp .env.example .env.local
  3. npx ts-node scripts/generate-keys.ts  (generates your RS256 keys)
  4. Fill in the remaining .env.local values (the script tells you which ones)
  5. docker compose up -d  (starts MongoDB + Redis + your app)
  6. npm run seed  (creates test departments + admin user)
  7. Visit http://localhost:3000/auth/login

  ## Test accounts (after seeding)
  - Student: student@university.edu / TestPass123!
  - Admin: admin@university.edu / AdminPass123!
  - (MFA not enabled on test accounts)

  ## Useful commands
  - docker compose logs -f app  → live app logs
  - localhost:8081  → MongoDB browser (mongo-express)
  - npm run test  → run all tests
  - npm run test:watch  → tests in watch mode during development

  ## Auth system overview
  [Link to AUTH_ARCHITECTURE.md]

  ## Who to ask
  - Auth questions → @senior-dev-username
  - MongoDB questions → @senior-dev-username
  - Deployment → @devops-username
```

---

After all phases, generate:
```
All test files covering:
- Unit: argon2id hash/verify, JWT sign/verify, rate limit logic, risk scoring
- Integration: full register→verify→login→MFA→refresh→logout flow
- Security: brute force lockout, refresh token reuse detection, CSRF bypass
- Role: each role can only access their permitted routes
- E2E (Playwright): login form, MFA setup, session management page
Target: 90%+ coverage on /src/lib/auth and /src/api/auth
```

---

## 📋 ENVIRONMENT VARIABLES

```bash
# Database (MongoDB)
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/thesis_auth?retryWrites=true&w=majority
REDIS_URL=redis://localhost:6379       # or Upstash REDIS_URL for serverless

# JWT (RS256 — generate with: openssl genrsa -out private.pem 4096)
RS256_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----..."
RS256_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----..."

# Auth config
ACCESS_TOKEN_EXPIRY=900          # 15 minutes in seconds
REFRESH_TOKEN_EXPIRY=2592000     # 30 days in seconds
SESSION_IDLE_TIMEOUT=28800       # 8 hours in seconds
MAX_CONCURRENT_SESSIONS=3

# Email (Resend)
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@university.edu

# SMS MFA (Twilio)
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_VERIFY_SID=...

# OAuth
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
MICROSOFT_CLIENT_ID=...         # Azure AD for university SSO
MICROSOFT_TENANT_ID=...         # University's Azure tenant

# Security
CSRF_SECRET=...                 # 32-byte random hex
ABUSEIPDB_API_KEY=...           # For malicious IP checking

# University config
INSTITUTION_EMAIL_DOMAIN=university.edu
APP_URL=https://thesis.university.edu
```

---

*Build order: Phase 1 → 2 → 3 → 4 → 5 → 6 → 7. Each phase = one Cursor Composer session.*
*Estimated generation time: ~60–100 minutes across all phases.*

**After generation, run this to verify everything works:**
```bash
docker compose up -d
npm run seed
npm run test
npm run build
# All should pass with zero errors before you write a single line of app code.
```