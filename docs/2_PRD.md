# Phase 2/3: Product Requirements Document (PRD)

## 1. Introduction
**Product Name:** Unheard India
**Goal:** To create a digital ethnographic research platform that documents, preserves, and shares the cultural heritage of marginalized Indian communities.
**Target Audience:** Researchers, Anthropology Students, General Public, and Community Members.

## 2. User Personas

### 2.1 The Researcher/Student
- **Needs:** Access to reliable ethnographic data, ability to submit fieldwork, reference material for studies.
- **Pain Points:** Scattered information, lack of digital archives for specific niche communities.

### 2.2 The General Public
- **Needs:** Engaging stories, visual content (photos/videos), understanding of diverse cultures.
- **Pain Points:** Academic content is often inaccessible or too dense; lack of awareness about marginalized groups.

### 2.3 The Administrator
- **Needs:** Tools to manage content, moderate submissions, and maintain system integrity.
- **Pain Points:** Manual content management is time-consuming.

## 3. Functional Requirements

### 3.1 Authentication & User Management
- **FR-01:** Users must be able to register and login using email and password.
- **FR-02:** System must support role-based access (User, Admin).
- **FR-03:** Passwords must be hashed (Bcrypt) and sessions managed via JWT.

### 3.2 Community Documentation (Core Feature)
- **FR-04:** Display a grid of documented communities with search and filter capabilities.
- **FR-05:** Individual community pages must show:
    - Overview/Description
    - Location/Region
    - Population stats
    - Traditions & Language
    - Image Gallery (Carousel)
    - Linked Documentaries

### 3.3 Research Data Management
- **FR-06:** Users can view a repository of research papers.
- **FR-07:** Students can submit research findings via a structured form (`/student-submission`).
- **FR-08:** Admins can approve or reject research submissions.

### 3.4 Media & Content
- **FR-09:** System must handle image uploads for community galleries.
- **FR-10:** System must support embedding of external video links (e.g., YouTube) for documentaries.

### 3.5 Admin Dashboard
- **FR-11:** Admin-only route to create, update, and delete community profiles.
- **FR-12:** Admin-only route to manage research data.

## 4. Non-Functional Requirements

### 4.1 Performance
- **NFR-01:** Initial page load should be under 2 seconds (leveraging Next.js SSR).
- **NFR-02:** API response time should be under 500ms for read operations.

### 4.2 Security
- **NFR-03:** All API endpoints must be protected against common attacks (XSS, NoSQL Injection, HPP).
- **NFR-04:** CORS must be configured to only allow the frontend client.

### 4.3 Scalability
- **NFR-05:** Database schema must support future addition of new fields without breaking existing data.
- **NFR-06:** Asset storage (uploads) should be decoupled from the application server (Planned for future, currently local).

## 5. UI/UX Guidelines
- **Design System:** Clean, academic yet accessible aesthetic.
- **Colors:** Earthy tones (e.g., `#99302A` Red, `#FAFAF9` Off-white) to reflect the cultural context.
- **Responsiveness:** Mobile-first design using Tailwind CSS.

---
*Status: Retroactive Draft based on v1.0.0 Implementation*
