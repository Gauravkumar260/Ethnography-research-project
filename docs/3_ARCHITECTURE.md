# Phase 4: System Architecture

## 1. System Overview
**Unheard India** follows a **Client-Server Architecture** (Monorepo structure) decoupling the user interface from the data management logic.

- **Frontend:** Next.js (Server-Side Rendering & Client Components)
- **Backend:** Node.js / Express (REST API)
- **Database:** MongoDB (NoSQL)

## 2. Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Frontend** | Next.js 16.1 (App Router) | SEO optimization, SSR performance, and file-based routing. |
| **Styling** | Tailwind CSS + Radix UI | Rapid UI development with accessible primitives. |
| **Backend** | Express.js 4.22 | Robust, flexible framework for handling API requests. |
| **Database** | MongoDB + Mongoose | Flexible schema for varying ethnographic data structures. |
| **Auth** | JWT (JSON Web Tokens) | Stateless authentication suitable for scalable APIs. |

## 3. High-Level Architecture Diagram

```mermaid
graph TD
    Client[Next.js Client] <-->|HTTP/JSON| API[Express API Server]
    API <-->|Mongoose| DB[(MongoDB)]
    API <-->|Multer| FS[Local File Storage]

    subgraph Frontend
        Pages[App Router Pages]
        Comps[UI Components]
        Hooks[Custom Hooks]
    end

    subgraph Backend
        Controllers[Controllers]
        Services[Services (Planned)]
        Routes[API Routes]
        Models[Data Models]
    end
```

## 4. Directory Structure Strategy

### 4.1 Frontend (`/client`)
- **`src/app/`**: Route definitions. Follows Next.js conventions.
- **`src/components/ui/`**: Reusable "dumb" components (buttons, cards).
- **`src/lib/`**: Utilities (e.g., Axios instance configuration).
- **`src/hooks/`**: (New) Custom hooks for data fetching logic.

### 4.2 Backend (`/server`)
- **`controllers/`**: Handles HTTP requests, validation, and sending responses.
- **`routes/`**: Definitions of API endpoints mapping to controllers.
- **`models/`**: Mongoose schemas defining data structure.
- **`middlewares/`**: Cross-cutting concerns (Auth, Uploads, Error Handling).
- **`services/`**: (New) Business logic layer to decouple logic from controllers.

## 5. Key Architectural Decisions (ADRs)

### ADR-001: Separation of Concerns (Frontend)
- **Decision:** Move direct `api.get()` calls from UI components into custom hooks.
- **Benefit:** Improves testability and allows components to focus solely on rendering.

### ADR-002: Service Layer Pattern (Backend)
- **Decision:** Introduce a Service Layer between Controllers and Models.
- **Benefit:** Keeps controllers "skinny"; allows business logic to be reused and tested independently of HTTP context.

### ADR-003: Authentication Strategy
- **Decision:** Use JWT stored in HttpOnly cookies (recommended) or LocalStorage.
- **Current State:** JWT token based implementation.

## 6. Data Flow
1. **User Action:** User requests "Community Profile".
2. **Frontend:** `useCommunity(slug)` hook is triggered.
3. **API Call:** Axios sends `GET /api/communities/:slug`.
4. **Route:** Express `communityRoutes` maps URL to `communityController`.
5. **Controller:** Calls `CommunityService.getCommunityBySlug()`.
6. **Service:** Queries MongoDB via `Community` model.
7. **Response:** Data flows back up the chain to the UI for rendering.
