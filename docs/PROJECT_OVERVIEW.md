# Campus Finder: Project Overview & Technical Documentation

## 1. Executive Summary
Campus Finder is an AI-powered discovery platform for Indian educational institutions. It bridges the gap between massive datasets and personalized student needs by combining **deterministic search** with **Generative AI**.

## 2. Theoretical Framework
The project operates on the principle of **Augmented Discovery**. While standard search engines provide "results," Campus Finder provides "insights."

### A. Hybrid Search Model
*   **Layer 1 (Deterministic):** Fast keyword matching for names, locations, and courses.
*   **Layer 2 (Cognitive):** LLM-based reasoning for complex queries like "affordable colleges with high placement ROI."

## 3. System Architecture
1.  **Presentation Tier:** Next.js (App Router), Tailwind CSS, ShadCN/UI.
2.  **State Management Tier:** Custom React Hooks + Browser LocalStorage for persistence.
3.  **Intelligence Tier:** Google Genkit + Gemini LLM for career guidance and comparisons.
4.  **Content Management Tier:** Admin Dashboard for database expansion.

## 4. Team Roles & Contributions
*   **Frontend & UI/UX Architect**: Responsible for visual identity, ShadCN components, and responsive layouts.
*   **Client-Side Logic & State Lead**: Developed custom hooks (`useFavorites`, `useHistory`) and local storage persistence.
*   **Backend & AI Integration Specialist**: Authored Genkit flows and optimized LLM prompts for recommendations.
*   **Search & Data Architect**: Implemented the core search algorithms and advanced filtering logic (NIRF/NAAC).

## 5. Technology Stack Rationale
*   **Next.js**: Chosen for Server Components (SEO) and optimized routing.
*   **TypeScript**: Ensures type-safety across complex institution data objects.
*   **Genkit**: Provides a structured framework for building production-ready AI features.

## 6. Conclusion
Campus Finder represents the next generation of educational discovery—transforming a static database into a dynamic, intelligent counselor that helps students build their future.
