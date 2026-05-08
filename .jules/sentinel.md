## 2025-05-14 - Multi-layered Security Hardening (Sentinel 🛡️)

**Vulnerability:** IP Spoofing, MIME Spoofing, DoS via large payloads, and Overly permissive CORS.
**Learning:**
1. The app's deployment chain (Client → Cloudflare → Render) requires `app.set('trust proxy', 1)` to prevent IP spoofing in rate limiters while still getting the real client IP.
2. Extension-only file validation is a high-risk gap; `file-type` must be used to check magic bytes, especially in research platforms where students upload various media.
3. CommonJS backends require pinning `file-type` to v16.2.0 as later versions are ESM-only.
4. CORS wildcards like `*.vercel.app` are dangerous as any preview deploy (even from other users) can bypass cross-origin restrictions.
**Prevention:** Always use `req.ip` with a correctly configured `trust proxy`, validate file magic bytes on upload, and maintain a strict CORS allowlist.
