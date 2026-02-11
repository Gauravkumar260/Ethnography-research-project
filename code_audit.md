# Deep Technical Audit Report

## 🔍 Hallucinations Found

**Location:** `server/controllers/docController.js` vs `client/src/app/[locale]/admin`
**Issue:** Missing "Approval" Workflow.
**Description:** The backend `getDocumentaries` endpoint filters by `status: 'approved'`, and the upload sets `status: 'pending'`. However, there is no discovered API endpoint or UI interface to actually change a documentary's status from 'pending' to 'approved'. The Admin UI seems incomplete (`login` and `upload` only).
**Impact:** Uploaded documentaries will never be visible to the public.
**Verified Fix:** Implement `PATCH /api/docs/:id/approve` in `docController.js` and a corresponding "Pending Reviews" dashboard in the Admin client.

**Location:** `server/controllers/authController.js`
**Issue:** Missing Registration Logic.
**Description:** There is no `registerUser` controller or route. Users cannot sign up. The only way to add users is likely via the seed scripts (`scripts/seedAdmin.js`). This contradicts a typical "Student Submission" workflow if students are expected to have accounts.
**Impact:** System is closed; no new users can join without database access.
**Verified Fix:** Implement `registerUser` or confirm that this is an invite-only system (and document it).

---

## 🐞 Bugs & Errors

**File/Module:** `server/models/User.js`
**Root Cause:** Critical Security Misconfiguration.
**Reproduction Steps:** Create a new user (via seed or if registration existed) without specifying a role.
**Detail:** `role: { type: String, enum: ['admin', 'editor'], default: 'admin' }`.
**Impact:** **CRITICAL**. Any user created defaults to 'admin' privileges.
**Solution:** Change default to `'editor'` or `'student'` (if added to enum), or remove default and make it required.

**File/Module:** `server/controllers/docController.js`
**Root Cause:** Input Validation Failure.
**Reproduction Steps:** Send a POST request to `/api/docs/upload` with `category` as an object or null (if not caught by other parsers).
**Detail:** `category.split(',')` assumes `category` is a string. If `FormData` sends it differently or if it's missing, this throws a runtime error.
**Solution:** `const categories = typeof category === 'string' ? category.split(',') : (Array.isArray(category) ? category : []);`

**File/Module:** `client/src/app/[locale]/documentaries/page.tsx`
**Root Cause:** Fragile URL parsing.
**Detail:** `process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')`. If the env var is `http://localhost:5000/api/` (trailing slash), this replace might fail to produce a clean base URL.
**Solution:** Use a robust URL parser or define `NEXT_PUBLIC_BASE_URL` separately.

---

## 🩹 Weak Patches

**Description:** Excessive Server Timeout.
**Location:** `server/server.js` -> `server.timeout = 3600000; // 1 hour`
**Risk:** This is a brute-force fix for large file uploads. It ties up server connections and makes the server vulnerable to Slowloris attacks.
**Proper Replacement:** Implement "Chunked Uploads" (e.g., via Tus protocol) or use Presigned URLs to upload directly to object storage (AWS S3, Google Cloud Storage), bypassing the Node.js server for the heavy lifting.

**Description:** Client-side Retry Logic for "Network Error".
**Location:** `client/src/lib/api.ts`
**Risk:** While good for UX, the retry logic simply waits 1s/2s. It doesn't handle idempotency keys. If a POST request (like upload) fails *after* server processing but *before* response (timeout), retrying might duplicate data.
**Proper Replacement:** Add Idempotency Keys to non-GET requests or restrict retries to idempotent methods (GET, PUT, DELETE).

---

## ⚡ Optimizations

**Before:**
User roles are checked via string comparison in multiple places.
**After:**
Use a shared constant/enum for roles across Client and Server (e.g., in a `shared` package or config file).
**Performance Gain:** Maintainability and Type Safety (prevents typos like 'Admin' vs 'admin').

**Before:**
`User.js` defines `matchPassword` method, but `authController.js` manually calls `bcrypt.compare`.
**After:**
`authController.js` should use `user.matchPassword(password)`.
**Performance Gain:** DRY (Don't Repeat Yourself) compliance; centralizes password logic.

---

## 🔐 Security Issues

**Vulnerability:** Default Admin Role
**Severity:** **CRITICAL**
**Fix:** Change `server/models/User.js` line 21 to `default: 'user'` (and add 'user' to enum) or remove default.

**Vulnerability:** Deprecated Security Middleware
**Severity:** Low
**Fix:** `xss-clean` is unmaintained. Replace with a modern sanitization strategy or rely on frameworks (React auto-escapes, MongoSanitize handles DB).

**Vulnerability:** Path Traversal Risk (Theoretical)
**Severity:** Medium
**Fix:** `server/controllers/docController.js` uses `req.files.video[0].path`. Ensure `multer` configuration randomly generates filenames and does not trust user input for file paths.

---

## 🏗 Architecture Improvements

**Current Problem:** Monolithic Upload Handling.
**Recommendation:** Move file storage to Cloud Object Storage (S3/R2).
**Implementation Steps:**
1. Configure AWS S3 bucket.
2. Backend generates Presigned Upload URL.
3. Frontend uploads directly to S3.
4. Backend stores the S3 key/URL.

**Current Problem:** Hardcoded Localhost Fallbacks.
**Recommendation:** Centralize configuration.
**Implementation Steps:** Ensure `client/src/lib/api.ts` and `server/server.js` rely strictly on validated environment variables (using `zod` or `dotenv-safe`) and fail fast if missing, rather than falling back to `localhost`.