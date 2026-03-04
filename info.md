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

## 🎨 PHASE 4 — FRONTEND UI/UX (Admin-Primary, Academic Design)

**Paste after Phase 3 is complete.**

```
Generate production-quality React components for the university research app auth UI.
Use Next.js 14 App Router, TypeScript, Tailwind CSS, shadcn/ui, react-hook-form + Zod.

════════════════════════════════════════════
DESIGN SYSTEM — READ BEFORE GENERATING ANY COMPONENT
════════════════════════════════════════════

PRIMARY USER: Department Admin / Super Admin.
These are experienced institutional staff — NOT students.
Design for efficiency, trust, and information density.
Every screen must feel like a serious academic management tool, not a consumer app.

AESTHETIC DIRECTION: "Institutional Authority"
Think: Oxford University portal meets modern government dashboard.
Serious. Dense. Reliable. Every pixel earns its place.

COLOR PALETTE (implement as CSS variables in globals.css):
  --color-primary:       #1B2A4A   /* deep institutional navy — used for headers, primary buttons */
  --color-primary-hover: #243660   /* slightly lighter navy for hover states */
  --color-accent:        #8B6914   /* antique gold — used for highlights, active states, focus rings */
  --color-accent-light:  #C9A84C   /* lighter gold for icons and decorative elements */
  --color-surface:       #FAFAF8   /* warm off-white — page background, feels like high-quality paper */
  --color-card:          #FFFFFF   /* pure white for card backgrounds */
  --color-border:        #D4CBBA   /* warm stone border — softer than grey, feels academic */
  --color-text-primary:  #1A1A1A   /* near-black for headings and critical text */
  --color-text-secondary:#4A4A4A   /* dark grey for body copy */
  --color-text-muted:    #7A7A7A   /* muted grey for labels, helper text */
  --color-error:         #8B1A1A   /* deep academic red — errors without being alarming */
  --color-warning:       #7A5C00   /* dark amber for warnings */
  --color-success:       #1A4A2E   /* deep forest green for success states */
  --color-danger-bg:     #FDF2F2   /* very light red tint for error backgrounds */
  --color-warning-bg:    #FFFBF0   /* very light amber tint for warning backgrounds */
  --color-success-bg:    #F2FAF5   /* very light green tint for success backgrounds */

TYPOGRAPHY (load from Google Fonts in layout.tsx):
  Display font: "EB Garamond" — for page titles and headings only
    (Classic, scholarly, commands authority — used by actual universities)
  Body font: "IBM Plex Sans" — for all UI text, labels, inputs
    (Clean, highly legible, professional — excellent for dense admin UIs)
  Mono font: "IBM Plex Mono" — for tokens, codes, technical strings
    (Consistent with body font family, feels intentional not accidental)

  Heading scale (Tailwind custom config):
    h1: EB Garamond, 2rem, font-weight 600, tracking-tight, color primary
    h2: EB Garamond, 1.5rem, font-weight 500, color primary
    h3: IBM Plex Sans, 1rem, font-weight 600, uppercase, letter-spacing 0.08em, color muted
        (Used for section labels — feels like form section headers in academic documents)
    body: IBM Plex Sans, 0.9375rem (15px), color text-primary, line-height 1.6
    label: IBM Plex Sans, 0.8125rem (13px), font-weight 500, uppercase, letter-spacing 0.06em
    helper: IBM Plex Sans, 0.75rem (12px), color muted

LAYOUT PRINCIPLE — AUTH PAGES:
  Split-panel layout for login/register:
    Left panel (40%): deep navy (#1B2A4A) with:
      - University crest/seal (placeholder SVG — elegant circular seal design)
      - University name in EB Garamond, large, white
      - Tagline: "Research & Thesis Management System" in gold accent
      - Subtle diagonal line texture (CSS background, no images needed)
      - Footer: "Secure Academic Portal · [Year]" in muted white
    Right panel (60%): warm off-white (#FAFAF8) with:
      - Centered form card (max-width 420px)
      - Card: white background, 1px stone border, subtle shadow
      - No rounded corners > 4px — sharp, authoritative, not playful

SPACING SYSTEM:
  Use 4px base unit. Consistent 24px internal card padding.
  Form field gap: 20px (not 16px — admin forms should breathe slightly)
  Section dividers: 1px solid --color-border with 28px vertical margin

INPUT FIELD DESIGN:
  Height: 42px (slightly taller than default — admin precision)
  Border: 1px solid --color-border
  Border-radius: 3px (minimal rounding — institutional feel)
  Focus ring: 2px solid --color-accent (gold focus = distinctive, not the blue default)
  Background: white
  Font: IBM Plex Sans 14px
  Label: uppercase, 12px, letter-spacing 0.06em, above field with 6px gap
  Error state: border-color --color-error, error message below in deep red 12px
  Disabled state: background #F5F5F3, cursor not-allowed

BUTTON DESIGN:
  Primary button:
    Background: --color-primary (navy)
    Text: white, IBM Plex Sans, 13px, font-weight 600, uppercase, letter-spacing 0.08em
    Height: 42px, border-radius: 3px
    Hover: --color-primary-hover with 150ms ease transition
    Active: scale(0.99) — subtle press effect
    Loading state: replace text with thin spinner (not a fat spinner) + "Verifying..." text
    Full width on forms

  Secondary button:
    Background: white, border: 1px solid --color-border
    Text: --color-text-primary, same sizing as primary
    Hover: background #F5F3EE (slightly warm grey)

  Danger button (for revoke session, etc.):
    Background: white, border: 1px solid --color-error
    Text: --color-error
    Hover: background --color-danger-bg

MOTION & ANIMATION:
  This is an admin tool — keep animation minimal and purposeful:
  - Form card entrance: opacity 0→1 over 200ms, translateY(8px)→0 (subtle, not dramatic)
  - Error messages: slide down 150ms ease-out (not a jarring pop)
  - Loading states: thin 2px spinner, rotation 600ms linear (faster than consumer apps)
  - Toast notifications: slide in from top-right, 180ms ease
  - NO bounce, NO spring physics, NO elaborate page transitions
  - Success states: check icon fades in, green tint 300ms ease

ADMIN-SPECIFIC UX PRINCIPLES:
  1. Information density over whitespace — admins read tables and forms constantly
  2. Never hide critical information behind tooltips — show it inline
  3. Keyboard shortcuts for power users (Tab flow must be perfect)
  4. Error messages must be precise and actionable ("Account locked until 14:32 — contact IT support")
     NOT vague consumer messages ("Something went wrong")
  5. All destructive actions require inline confirmation (not a modal — an inline expand)
  6. Status indicators always visible — never make admin guess system state
  7. Show timestamps in full format: "Mon 4 Mar 2026, 14:32 GMT+5:30" (not "2 hours ago")

════════════════════════════════════════════
COMPONENT SPECIFICATIONS
════════════════════════════════════════════

--- /app/auth/login/page.tsx + LoginForm.tsx ---

Layout: Split-panel (described above). Right panel contains:

SECTION 1 — Role indicator (above form):
  Small uppercase label: "ADMINISTRATOR PORTAL"
  Thin gold (#C9A84C) horizontal line underneath (width 40px, left-aligned)
  This immediately signals to admins they are in the right place

SECTION 2 — Page title:
  H1 in EB Garamond: "Sign In"
  Subtitle in IBM Plex Sans muted: "University Research Management System"

SECTION 3 — SSO Button (PRIMARY option for admins — show FIRST):
  Microsoft Azure AD button:
    Full width, height 44px, white background, 1px stone border
    Microsoft logo SVG (official colors) + "Sign in with University Account"
    This is the PRIMARY auth path for admins (institutional SSO)
    Hover: border color shifts to navy

  Divider: "─── or sign in with email ───" in muted 12px

SECTION 4 — Email/password form:
  Email field (label: "INSTITUTIONAL EMAIL")
    Placeholder: "admin@university.edu"
    Auto-lowercase on blur
  Password field (label: "PASSWORD")
    Show/hide toggle: eye icon, 20px, right-aligned inside input
  
  Row: "Remember this device for 30 days" checkbox (left) + "Forgot password?" link (right)
    Checkbox: custom styled — 14px square, gold checkmark on navy when checked
    "Forgot password": IBM Plex Sans 12px, --color-accent, no underline, hover underline

  Submit button: "Sign In" (full width, navy)

SECTION 5 — MFA Step (conditionally rendered, replaces form above):
  Heading: "Two-Factor Authentication"
  Subtext: "Enter the 6-digit code from your authenticator app."
  
  6 individual digit inputs:
    Each: 48px × 56px, border 1px stone, border-radius 3px, text-align center
    IBM Plex Mono 24px for the digit
    Focus: gold border 2px
    Gap between inputs: 8px, grouped as [3 inputs] [dash] [3 inputs]
    Auto-advance on digit entry, auto-backspace on delete
    Paste handler: distributes pasted 6-digit string across inputs
    Shake animation (300ms) on wrong code
  
  Below inputs: "Use a backup code instead →" link in muted 12px
  
  Backup code input (toggle):
    Single input, IBM Plex Mono, placeholder "XXXX-XXXX-XX"
    Auto-format as user types: insert hyphen after 4th and 8th chars

SECTION 6 — Risk warning banner (conditional, shown above form when riskScore >= 0.6):
  Background: --color-warning-bg
  Border-left: 3px solid #7A5C00
  Icon: warning triangle in amber
  Text: "Unusual sign-in detected from [City, Country]. A security alert has been sent to your email."
  This is NOT dismissible — admin must see it

ERROR STATES:
  "Invalid credentials" → show inline below submit button, deep red, 13px
  "Account locked until [exact time]" → show with lock icon, include "Contact IT: it@university.edu"
  "Email not verified" → show with link to resend verification
  Never show which field is wrong (security — don't confirm email exists)

--- /app/auth/register/page.tsx + RegisterForm.tsx ---

Layout: Same split-panel. Right panel:

NOTE: Self-registration is for STUDENTS and SUPERVISORS only.
Admins are created by Super Admin — show a notice:
  Banner at top of form (only shown if admin role selected):
    "Administrator accounts must be created by the Super Admin.
     Contact: superadmin@university.edu"

FORM SECTIONS (use H3 section headers — uppercase, 12px, muted, with divider):

  "PERSONAL INFORMATION"
    - Full Name (text)
    - University ID / Staff Number (text, IBM Plex Mono input)
    - Department (shadcn Select dropdown — searchable)

  "ACCOUNT ACCESS"  
    - Institutional Email (with live domain validation indicator)
      Right side of input: loading spinner → ✓ green tick → ✗ red cross
      Check: email domain matches department's institutionDomain in real-time
    - Role (shadcn Select: Student / Supervisor only — no admin options)

  "SECURITY"
    - Password with PasswordStrengthMeter (below field, always visible)
    - Confirm Password

  Terms checkbox with link to university data policy

  Submit button: "Create Account"

  POST-SUBMIT STATE (replaces form entirely):
    Icon: envelope in navy circle
    H2: "Check Your Email"
    Body: "A verification link has been sent to [email]. Click it to activate your account."
    Resend button: grey, disabled for 60s with countdown: "Resend in 58s"
    After 60s: becomes active "Resend Verification Email" button

--- PasswordStrengthMeter.tsx ---

Always visible below password input (not a tooltip, not conditional):
  
  Strength bar:
    4 segments, each 4px tall, border-radius 2px, gap 3px between
    Segment colors by score:
      0 (empty): all segments #E5E2DA
      1 (weak): 1 segment #8B1A1A (deep red)
      2 (fair): 2 segments #7A5C00 (amber)
      3 (good): 3 segments #1A4A2E (forest green)  
      4 (strong): 4 segments --color-accent (gold)
    Animate filled segments: width 0→100% over 200ms ease

  Score label (right-aligned, 11px, uppercase):
    Weak / Fair / Good / Strong — matching color of bar

  Requirements checklist below bar:
    Each requirement as a row: 12px icon (✓ green / ○ grey) + 12px IBM Plex Sans text
    - 12 or more characters
    - Uppercase letter
    - Number
    - Special character (!@#$%...)
    - Not a commonly breached password (async check — show spinner while checking)
    Requirements animate from grey→green as user types
    Do NOT show red on unmet requirements until user blurs the field

--- /app/auth/mfa/setup/page.tsx + MFASetup.tsx ---

Layout: Centered page (no split panel — this is a focused task, not a login screen)
  Max-width: 560px, centered, white card, stone border
  Progress indicator at top: 3 steps shown as numbered dots
    Step 1: Scan QR Code → Step 2: Verify Code → Step 3: Save Backup Codes

STEP 1 — SCAN QR CODE:
  H2: "Set Up Two-Factor Authentication"
  Body text (IBM Plex Sans 14px):
    "Scan the QR code below with your authenticator app (Google Authenticator, Authy, or Microsoft Authenticator)."
  
  QR code:
    White background card, 1px border, 200×200px, centered
    qrcode.react with navy foreground color (#1B2A4A), white background
    Border: 16px white padding around QR (required for scanners)
  
  Manual entry toggle: "Can't scan? Enter code manually →"
    Reveals: IBM Plex Mono input with the base32 secret
    Copy button (clipboard icon) next to the secret
    On copy: button changes to "Copied ✓" for 2 seconds

  "Next: Verify Code →" button (navy, full width)

STEP 2 — VERIFY CODE:
  H2: "Verify Your Authenticator"
  Body: "Enter the 6-digit code shown in your authenticator app to confirm setup."
  
  Same 6-digit OTP input design as login MFA step
  
  Attempt counter: "3 attempts remaining" shown after first wrong code in amber
  After 3 wrong codes: disable input 30 seconds with countdown, log MFA_ATTEMPT event

  Button: "Verify & Continue" (navy)
  Back link: "← Back to QR Code" (muted, 13px)

STEP 3 — BACKUP CODES:
  H2: "Save Your Backup Codes"
  
  Warning banner (--color-warning-bg, amber left border):
    "⚠ These 8 codes can each be used once if you lose access to your authenticator app.
     Store them somewhere safe — they will not be shown again."
  
  Backup codes display:
    2-column grid of 8 codes
    Each code: IBM Plex Mono 15px, background #F5F3EE, 8px padding, 3px border-radius
    Codes initially BLURRED (CSS filter: blur(4px)) with overlay:
      "Click to reveal your backup codes" + eye icon
    Click → blur removes with 200ms transition
  
  Action buttons row:
    "Download as .txt" (secondary button, download icon)
    "Copy All Codes" (secondary button, clipboard icon)
    Both turn to "Downloaded ✓" / "Copied ✓" for 3 seconds after action
  
  Confirmation checkbox (required before proceeding):
    "I have saved my backup codes in a secure location"
    Checkbox must be checked — "Complete Setup" button disabled until checked
  
  "Complete Setup" button (navy, full width)

--- /app/account/sessions/page.tsx + SessionsTable.tsx ---

Layout: Full-width admin panel layout (sidebar nav assumed — this is a page within admin dashboard)

PAGE HEADER:
  H1 in EB Garamond: "Active Sessions"
  Subtitle: "Devices currently signed in to your account"
  Right-aligned: "Log Out All Other Devices" button (danger style — white with red border)
    Inline confirmation on click (button expands to show: "Are you sure? [Confirm] [Cancel]")
    Does NOT use a modal — expands inline to keep context

SECURITY STATUS BANNER:
  If current session has riskScore > 0.4: show amber warning
    "⚠ Your last sign-in was flagged as unusual. Review the session below."
  If all sessions clean: show nothing (no "all clear" clutter — admins don't need reassurance)

SESSIONS TABLE (shadcn Table component):
  Columns: Device | Location | IP Address | Last Active | Status | Actions

  Device column:
    Icon (24px): laptop / phone / tablet SVG based on deviceType
    Browser name + OS in IBM Plex Sans 14px
    "Current Session" badge if isCurrent (navy background, white text, 11px uppercase, 3px border-radius)

  Location column:
    Flag emoji + "City, Country"
    If location unknown: "Unknown Location" in muted text

  IP Address column:
    IBM Plex Mono 13px
    If IP differs from user's usual country: amber triangle icon before IP

  Last Active column:
    Full timestamp: "Mon 4 Mar 2026, 14:32" (never relative time in admin tools)
    If last active > 30 days: muted color

  Status column:
    Green dot + "Active" for active sessions
    Amber dot + "Idle (8h)" if no activity in 8+ hours

  Actions column:
    "Revoke" link (--color-error, 13px, no button chrome)
    Inline confirmation: click → text changes to "[Confirm revoke] [Cancel]" inline
    On confirm: row fades out over 300ms then removes

  LOADING STATE:
    Skeleton rows: 3 rows of grey shimmer blocks matching column widths
    IBM Plex Sans skeleton shimmer uses --color-border as base color (warm, not cold grey)

  EMPTY STATE:
    Only one session (current): 
      "You have no other active sessions."
      IBM Plex Sans 14px, muted, centered in table body

--- EMAIL TEMPLATES ---

All templates in /src/lib/email/templates/ using React Email components.
Shared layout wrapper: white background, max-width 600px, centered.

DESIGN SYSTEM FOR ALL EMAILS:
  Header: navy (#1B2A4A) background, 64px tall
    University crest SVG (white, 36px) + university name in EB Garamond 18px white
  
  Body: white background, 40px horizontal padding, IBM Plex Sans
  
  Footer: #F5F3EE background (warm off-white), 1px top border stone color
    "© [Year] [University Name]. This is an automated security email."
    "If you did not request this, please contact it@university.edu immediately."
    Muted 12px IBM Plex Sans

--- email/templates/verify-email.tsx ---
  Subject: "Verify your [University] research portal account"
  
  Body:
    H1 (EB Garamond 28px navy): "Verify Your Email Address"
    Body text: "You're almost ready. Click the button below to verify your institutional email and activate your account."
    
    CTA Button:
      Navy background, white text, "Verify Email Address"
      200px wide, 44px tall, 3px border-radius, centered
      IBM Plex Sans 14px font-weight 600
    
    Security note box (background #F5F3EE, left border 3px navy, 16px padding):
      "This link expires in 24 hours. If you didn't create this account, you can safely ignore this email."
    
    Fallback link: "Or copy this URL into your browser:" + IBM Plex Mono 12px URL

--- email/templates/reset-password.tsx ---
  Subject: "Password reset request — [University] Research Portal"
  
  Amber security banner below header:
    Background: #FFFBF0, border-bottom: 1px solid #C9A84C
    Text: "⚠ Password Reset Request — Expires in 1 hour"
  
  Body: Same structure as verify-email but:
    H1: "Reset Your Password"
    Body: "We received a request to reset the password for this account. If this was you, click below."
    CTA: "Reset Password" button
    
    "NOT YOU?" section (below button, high contrast):
      Bold: "If you didn't request this:"
      - Your account is still secure — no changes have been made
      - This link will expire automatically in 1 hour
      - Contact IT security if you're concerned: security@university.edu

--- email/templates/suspicious-login.tsx ---
  Subject: "⚠ Unusual sign-in detected — [University] Research Portal"
  
  Red security banner below header:
    Background: #FDF2F2, border-bottom: 2px solid #8B1A1A
    Text: "Security Alert — Unusual Account Activity"
  
  Body:
    H1: "Unusual Sign-In Detected"
    Details table (grey background, IBM Plex Mono for values):
      Time: [exact timestamp with timezone]
      Location: [City, Country]
      Device: [browser + OS]
      IP Address: [ip address]
    
    CTA (navy): "Review My Account Activity"
    
    URGENT note box (red left border):
      "If this wasn't you, secure your account immediately:
       1. Change your password
       2. Enable two-factor authentication
       3. Contact IT Security: security@university.edu or +XX-XXXX-XXXXXX"

--- email/templates/mfa-backup-codes.tsx ---
  Subject: "Your backup codes — [University] Research Portal"
  
  Body:
    H1: "Two-Factor Authentication Backup Codes"
    Warning: "Store these codes securely. Each can be used once."
    
    Codes displayed in 2-column table:
      IBM Plex Mono 15px, #F5F3EE background per cell, navy text
    
    Security instructions (numbered list, 14px):
      1. Print this email or copy codes to a secure password manager
      2. Do not share these codes with anyone, including IT staff
      3. Generate new codes if you believe these have been compromised

════════════════════════════════════════════
GLOBAL REQUIREMENTS FOR ALL COMPONENTS
════════════════════════════════════════════

ACCESSIBILITY (WCAG 2.1 AA — non-negotiable for institutional software):
  - All interactive elements: minimum 44×44px touch target
  - Focus ring: 2px solid --color-accent (gold) — visible on ALL focusable elements
  - All form inputs: aria-label or aria-labelledby + aria-describedby for errors
  - Error messages: role="alert" so screen readers announce them immediately
  - Color is never the ONLY indicator of state (always pair with icon or text)
  - Tab order: logical, matches visual order, no tab traps
  - All icons: aria-hidden="true" if decorative, meaningful label if functional

ERROR MESSAGE TONE (admin-appropriate — precise and actionable):
  Map every API error code to a specific admin-friendly message:
  401 wrong password → "Incorrect password. [X] attempts remaining before lockout."
  401 account locked → "Account locked until [exact time, timezone]. Contact IT: it@university.edu"
  401 email unverified → "Email not verified. Check your inbox or resend verification below."
  403 wrong role → "You do not have permission to access this area."
  429 rate limited → "Too many attempts. Please wait [X] minutes before trying again."
  500 server error → "A system error occurred. Reference: [correlationId]. Contact IT if this persists."
  (Always include correlationId from response headers in server errors — admins need this for support tickets)

RESPONSIVE BEHAVIOR:
  Desktop (1280px+): Full split-panel layout
  Tablet (768–1279px): Split panel collapses — left panel becomes top banner (120px tall, navy)
  Mobile (< 768px): Left panel hidden entirely, form takes full width
  Admin sessions table: horizontal scroll on mobile, not collapsed rows

FORM STATE MANAGEMENT:
  Use react-hook-form with Zod resolver for all forms
  Validation triggers: onBlur (not onChange — reduces noise for power users)
  Never reset form on server error — preserve user's input
  Disable submit button during API call — prevent double submission
  On network error: show retry button, not silent failure
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