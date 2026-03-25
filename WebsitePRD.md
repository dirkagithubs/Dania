\#\# \*\*1\\) Objective and success criteria (make it measurable)\*\*

\* \*\*Primary goal:\*\* what the website must accomplish (e.g., \<generate booked calls,= \<sell product,= \<collect  
applications=).  
\* \*\*KPIs:\*\* conversion rate target, bounce rate threshold, page speed targets, time-to-publish, etc.  
\* \*\*Definition of done:\*\* \<Shippable when X pages exist, Y forms work, Lighthouse \\\> Z, analytics events  
firing&=

\#\# \*\*2\\) Audience, use cases, and user flows\*\*

\* \*\*Target personas\*\* (234 max) with intent: \<ready to buy,= \<researching,= \<existing customer,= etc.  
\* \*\*Primary flows\*\* written step-by-step:  
\* Example: Landing 3 Services 3 Case Studies 3 Book Call 3 Confirmation  
\* \*\*Edge flows:\*\* what happens if user abandons form, invalid email, slow network, etc.

\#\# \*\*3\\) Scope: pages, components, and content inventory\*\*

Be explicit:

\* \*\*Site map\*\* (all pages \\+ URLs)  
\* \*\*Page-by-page requirements\*\*:  
\* Purpose of page  
\* Sections on the page (hero, FAQ, testimonials, pricing&)  
\* Required CTAs  
\* Required modules/components (reusable)  
\* \*\*Content source\*\*: \<Use provided copy,= \<write placeholder copy,= \<pull from CMS,= etc.  
\* \*\*Assets\*\*: logos, brand colors, fonts, images, icons (and where to find them)

\#\# \*\*4\\) Functional requirements (what must work)\*\*

Examples:

\* Forms: fields, validations, error messages, spam protection, where submissions go (email/CRM/DB)  
\* Booking: Calendly/Cal.com integration, time zones, confirmation emails  
\* Auth (if needed): roles, password reset, session rules  
\* CMS: which pages editable, field schema, rich text vs blocks  
\* Search/filter (if needed): dataset, filters, sort order, empty states

\*\*Tip for Antigravity:\*\* write requirements as \*\*testable statements\*\*:

\* \<The contact form must reject emails without 8@9 and show message 8Enter a valid email.9=  
\* \<After submission, show success state \\+ send webhook to /api/lead with payload schema&=

\#\# \*\*5\\) Non-functional requirements (agents need these or they9ll guess)\*\*

\* \*\*Performance:\*\* Lighthouse targets, image optimization, caching, lazy-loading rules  
\* \*\*Accessibility:\*\* WCAG level (AA is typical), keyboard navigation, focus states, contrast rules  
\* \*\*SEO:\*\* metadata rules, canonical URLs, schema markup, sitemap/robots, OG/Twitter cards  
\* \*\*Security:\*\* CSP, rate limiting, form spam controls, auth/session requirements  
\* \*\*Compliance:\*\* cookie consent, privacy policy requirements, GDPR/CCPA if relevant

\#\# \*\*6\\) Design direction and UI system\*\*

Agents build faster with constraints:

\* \*\*Brand tokens:\*\* colors (hex), typography scale, spacing, border radius, shadows  
\* \*\*Layout rules:\*\* grid, max width, section padding, breakpoints  
\* \*\*Component library:\*\* buttons, cards, nav, footer, inputs, modals, toasts  
\* \*\*Interaction rules:\*\* hover states, transitions, scroll behavior  
\* \*\*Reference links:\*\* competitor sites you like (and what you like about them)

\#\# \*\*7\\) Technical requirements (stack \\+ architecture)\*\*

Even for a \<website,= clarify:

\* Framework/runtime (Next.js, etc.), hosting (Vercel), DB (if any), CMS choice  
\* Integrations: analytics, CRM, email, payments, booking, chat widget  
\* Environments: dev/stage/prod \\+ environment variables list  
\* Folder structure and conventions (naming, linting, formatting)  
\* API endpoints (if any) \\+ request/response examples

\#\# \*\*8\\) Analytics \\+ tracking plan (often missing)\*\*

Define events up front:

\* Page views, CTA clicks, form start/submit/success/fail, booking completed  
\* UTM handling rules  
\* Tools: GA4, PostHog, Plausible, etc.  
\* Required dashboards or reports

\#\# \*\*9\\) Delivery plan and guardrails\*\*

\* Milestones: wireframe 3 MVP 3 polish 3 launch  
\* Out of scope (explicitly)  
\* Risks/unknowns \\+ decisions needed  
\* \<If anything is ambiguous, default to X= rules (e.g., \<use placeholder copy,= \<use brand tokens,= \<prefer  
simple layouts=)

\---

\# \*\*The \<AI-friendly PRD= extras that make Antigravity WAY better\*\*

Include these and you9ll notice a big jump in build quality:

\#\#\# \*\*A) A single \<Build Spec= section\*\*

A compact block Antigravity can follow like instructions:

\* Tech stack  
\* Pages list  
\* Global components list  
\* Design tokens  
\* Integrations  
\* Must-hit acceptance criteria

\#\#\# \*\*B) Examples of inputs/outputs\*\*

\* Form payload JSON example  
\* Email confirmation template text  
\* CRM field mapping table  
\* URL structure examples

\#\#\# \*\*C) Error states \\+ empty states\*\*

Agents often forget these unless you specify:

\* \<No search results= UI  
\* \<Loading= skeletons  
\* API failure message patterns  
