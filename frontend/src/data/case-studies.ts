import type { CaseStudy } from "@/types";

export const caseStudies: CaseStudy[] = [
  {
    "slug": "locatr",
    "title": "LOCATR",
    "oneLiner": "A 6-node LangGraph decision-support agent that turns a natural-language venue request into a ranked, map-pinned shortlist in under 3 seconds, with Auth0-gated booking dispatch.",
    "problem": "Finding the right venue for a group, balancing vibe, budget, and local risk signals, means manually cross-referencing multiple sources and then still guessing. LOCATR collapses that research into a single query and streams back a ranked, explainable shortlist.",
    "role": "Full-stack and AI engineer, top GitHub contributor on a team of 4, owning the LangGraph graph design, asyncio fan-out, Snowflake integration, and WebSocket streaming layer.",
    "approach": [
      "Designed a 6-node LangGraph graph: Commander parses intent and pulls Auth0 preference weights; Scout discovers candidates via Google Places and deduplicates with Haversine distance, pulling historical risk events from Snowflake; Vibe Matcher, Cost Analyst, and Critic run as a parallel asyncio fan-out for multimodal, deterministic, and risk scoring respectively; Synthesiser produces a composite ranked shortlist with why/watch-out text.",
      "Streamed live agent state to the Next.js frontend over WebSockets so users see the pipeline reasoning in real time rather than waiting for a final answer.",
      "Integrated Auth0 CIBA (Client-Initiated Backchannel Authentication) as a human-approval gate before any Gmail booking dispatch, keeping real-world side effects under explicit user control.",
      "Used Snowflake as the structured data store for historical venue risk events, giving the Critic agent a queryable signal rather than relying solely on LLM inference."
    ],
    "keyDecisions": [
      "Running the three analyst agents (Vibe Matcher, Cost Analyst, Critic) concurrently with asyncio instead of sequentially was the single biggest latency lever. Each agent is independent given the Scout output, so there was no correctness reason to serialize them, parallelizing dropped pipeline time from about 9 seconds to under 3 seconds. The lesson generalized: in any LangGraph pipeline, map your dependency graph before wiring edges, because sequential wiring of independent nodes is an invisible tax.",
      "Choosing a deterministic scoring layer (Haversine deduplication in Scout, price/value arithmetic in Cost Analyst) alongside LLM calls (Gemini multimodal in Vibe Matcher) kept the system inspectable and debuggable. When the shortlist ranked unexpectedly, I could isolate whether the fault was in the embedding score or the rule, which is much harder in an all-LLM pipeline.",
      "Auth0 CIBA for the booking action, rather than a simple confirmation modal, was a deliberate trust boundary: the agent can recommend freely, but dispatching a real email requires an explicit out-of-band approval push. That pattern, modular, observable agents with human approval for consequential actions, is what separates a demo from a deployable system."
    ],
    "impact": [
      "Won DeerHacks V (1 of 9 prizes, 164 participants) as the top GitHub contributor on a team of 4.",
      "Asyncio fan-out across the three parallel analyst agents cut pipeline latency from approximately 9 seconds to under 3 seconds (roughly 70% reduction).",
      "Shipped 45,000+ lines across the full stack in a 36-hour hackathon window, covering the LangGraph backend, FastAPI service layer, Snowflake integration, WebSocket streaming, and Next.js/Mapbox frontend."
    ],
    "learned": [
      "Agent orchestration discipline matters more than model choice. The biggest performance win was not a better prompt, it was drawing the dependency graph correctly and parallelizing independent nodes with asyncio. I would apply that analysis upfront on any future multi-agent system before writing a single edge.",
      "Streaming intermediate agent state over WebSockets changed how the product felt: users stopped perceiving the wait as a black box and started reading it as progress. Explainability is not just a safety feature; it is a UX feature, and building it in from the start is cheaper than retrofitting it.",
      "Mixing deterministic scoring with LLM inference, rather than delegating everything to the model, made the system far easier to debug and audit. Knowing which layer produced a surprising ranking is the difference between fixing a bug in minutes versus hours."
    ],
    "stack": [
      "LangGraph",
      "FastAPI",
      "Python",
      "asyncio",
      "Next.js 14",
      "Snowflake",
      "Gemini 2.5",
      "Mapbox",
      "Auth0",
      "WebSockets",
      "Google Places API"
    ],
    "links": {
      "github": "https://github.com/Lushenwar/LOCATR",
      "liveUrl": "",
      "devpost": "https://devpost.com/software/pathfinder-6h8y1v"
    },
    "award": "DeerHacks V 2026 Winner"
  },
  {
    "slug": "canopy",
    "title": "CANOPY",
    "oneLiner": "An elderly remote-care platform that won the Health and Humanity track at Hack the Globe by making AI work for a 75-year-old patient and a clinician at the same time.",
    "problem": "Elderly patients at home have no structured way to flag deteriorating vitals to caregivers and clinical staff before a crisis. Existing tools either overwhelm non-technical users or lack the clinical depth that care teams need to act on.",
    "role": "Full-stack and AI engineer, number-one GitHub contributor on a team of four, owning the LangGraph pipeline, the Three.js Garden interface, and the real-time Supabase integration.",
    "approach": [
      "Built a four-node LangGraph StateGraph (Ingest, Assess Risk, Communicate, Plan Discharge) on a FastAPI backend: the Ingest node normalizes patient vitals and computes baselines, Assess Risk combines a deterministic rules engine with a Groq/Llama 3.3 70B narrative to produce a 0-100 risk score, Communicate fans out caregiver summaries and clinical alerts, and Plan Discharge emits a structured recovery plan.",
      "Designed three role-specific Next.js 15 interfaces: a zero-literacy 3D Garden for patients (hand-coded vanilla Three.js with procedural geometry, cel-shaded outlines, animated clouds, birds, swaying plants, and a pulsing lighthouse), a Nest traffic-light dashboard for family caregivers, and a Clinic risk-stratification view for healthcare staff.",
      "Wired Supabase Realtime so that every vitals submission by the patient propagates live to the caregiver and clinical dashboards without polling.",
      "Built a 300-plus-response chat fallback system across 80-plus intent categories so the patient interface remained empathetic and functional when the Groq LLM was unavailable."
    ],
    "keyDecisions": [
      "Chose vanilla Three.js over a model-loader approach for the Garden scene because procedural geometry with no GLTF assets meant zero load-time dependency and full control over the cel-shaded, accessible aesthetic required for a zero-literacy patient interface.",
      "Used a mutable ref bridge between React state and the Three.js animation loop inside a useEffect closure to implement a fly-to camera transition system, decoupling React's render cycle from the imperative animation loop without triggering unnecessary re-renders.",
      "Invested heavily in the fallback chat layer (300-plus hand-authored responses, 80-plus intent categories) rather than treating the LLM as always-available infrastructure, because a care platform that fails silently for an elderly user is worse than no AI at all."
    ],
    "impact": [
      "Won the Health and Humanity track at Hack the Globe 2026 (BCG Toronto, 232 participants), with judges flagging the triple-interface design as the strongest clinical workflow in the track.",
      "117 commits shipped in 36 hours across a team of four, with the platform covering patient check-in, live caregiver alerts, clinical risk stratification, and structured discharge planning end-to-end."
    ],
    "learned": [
      "The hardest part of AI is not always the model: in CANOPY the real engineering work was making the interface disappear so a patient with no digital literacy could safely act on the output, which forced every design and technical decision through an accessibility lens.",
      "A deterministic rules engine paired with an LLM narrative is a better pattern for risk-stratification than an LLM alone, because the rules give auditable, reproducible scores while the LLM adds the plain-language explanation that a caregiver or patient can actually act on.",
      "Building a robust fallback system before the demo saved us during the live judging session, and reinforced that any AI feature meant for a vulnerable population needs a graceful degradation path that is as thoughtfully engineered as the happy path."
    ],
    "stack": [
      "Next.js 15",
      "TypeScript",
      "Three.js",
      "Framer Motion",
      "Tailwind CSS",
      "FastAPI",
      "LangGraph",
      "Groq / Llama 3.3 70B",
      "Supabase Realtime",
      "Docker"
    ],
    "links": {
      "github": "https://github.com/Minifigures/hacktheglobe",
      "liveUrl": "https://hacktheglobe.vercel.app",
      "devpost": "https://devpost.com/software/canopy-a0qp35"
    },
    "award": "Hack the Globe 2026 - Health and Humanity Track Winner (BCG Toronto, 232 participants)"
  },
  {
    "slug": "vigil",
    "title": "VIGIL",
    "oneLiner": "A 14-agent, five-layer LangGraph system that turns a healthcare receipt photo into auditable insurance-billing fraud detection, with deterministic Python scoring and mandatory human approval before any action.",
    "problem": "Insurance billing fraud is hard to catch because claim documents are messy, unstructured images and PDFs, and existing tools either hand the consequential fraud decision to an LLM (opaque, undefendable) or require manual auditor review of every claim (slow, expensive). The system needed to be both accurate and legally defensible in a regulated environment.",
    "role": "Full-stack and AI engineer, #1 GitHub contributor on a team of 4 at GenAI Genesis 2026 (1,000+ participants).",
    "approach": [
      "Built a five-layer LangGraph pipeline (Perception, Reasoning, Planning, Action, Reflection) with 14 specialized agents, each with typed input/output contracts, so every stage is independently testable and auditable.",
      "Implemented the fraud scoring engine as pure deterministic Python (fee deviation, procedure-code risk, provider history), driven by a YAML policy file, so no LLM ever owns the consequential 0-100 fraud score, the model only handles messy OCR extraction and plain-language summarization.",
      "Added a compliance and bias gate (with optional IBM watsonx.ai validation), an immutable audit log, and a mandatory human approval step before any high-risk action is taken, mirroring financial-services governance patterns.",
      "Validated the full user-facing flow with a 26-test Playwright E2E suite and stored state in Supabase PostgreSQL behind a FastAPI backend with JWT auth and a structured-logging metrics endpoint."
    ],
    "keyDecisions": [
      "Chose a multi-agent graph over a single large prompt specifically because fraud detection requires transparency: each agent has a bounded responsibility, the fraud path, benefits path, compliance path, and audit path are decoupled, and the graph is easier to explain to a regulator than an opaque chain-of-thought answer.",
      "Kept the consequential scoring deterministic and outside the LLM, the LLM extracts and summarizes, but weighted Python components produce the score. This means the system can always produce a human-readable breakdown of why a claim was flagged, which is non-negotiable in a regulated or legal context.",
      "Migrated from Snowflake to Supabase PostgreSQL mid-hackathon by isolating storage behind an abstraction layer, which let us rewire the persistence implementation without touching the agent pipeline, proving the value of interface-driven design under pressure."
    ],
    "impact": [
      "Received a GKE Turns 10 Honourable Mention at GenAI Genesis 2026, competing against 1,000+ participants.",
      "Shipped 21,000+ lines of code and a 26-test Playwright E2E suite covering the full receipt-to-fraud-decision flow within the hackathon window.",
      "Demonstrated that a governance-first, human-in-the-loop architecture (deterministic scoring, immutable audit log, compliance gate, mandatory human approval) is achievable at hackathon speed and directly transferable to regulated financial-services AI."
    ],
    "learned": [
      "Building VIGIL convinced me that the right boundary for LLMs in high-stakes systems is language-heavy perception and explanation, not consequential decisions, the moment a fraud score came out of a prompt, it became unauditable, and that tradeoff was not worth the simplicity gain.",
      "The mid-hackathon Snowflake-to-Supabase migration taught me that isolation matters more than you think: because we had abstracted the storage layer early, the rewrite was a contained two-hour task rather than a pipeline-wide refactor under deadline pressure.",
      "Orchestration complexity is the real cost of multi-agent design, not LLM latency, coordinating 14 agents with typed contracts and parallel execution paths required careful graph design and explicit error boundaries, which is the engineering discipline I would carry into any production agentic system."
    ],
    "stack": [
      "Python",
      "LangGraph",
      "FastAPI",
      "Pydantic",
      "Gemini 2.0 Flash",
      "IBM watsonx.ai",
      "Supabase",
      "Moorcheh SDK",
      "Next.js 14",
      "Playwright"
    ],
    "links": {
      "github": "https://github.com/Minifigures/genaihack",
      "liveUrl": "",
      "devpost": "https://devpost.com/software/vigil-mj3y0x"
    },
    "award": "GenAI Genesis 2026 - GKE Turns 10 Honourable Mention"
  },
  {
    "slug": "utmbc",
    "title": "UTM Billiards Club Platform",
    "oneLiner": "Sole-built the official club platform from scratch, replacing a static Linktree with a production Next.js app serving 320+ members, complete with live Elo rankings, computer-vision match-sheet parsing, and a 2v2 bracket generator.",
    "problem": "The UTM Billiards Club had no digital infrastructure beyond a Linktree. Execs spent 1-2 hours manually transcribing paper match sheets into ranking spreadsheets, tournament brackets were managed ad hoc, and there was no central place for members to check standings, sign up for events, or get club information.",
    "role": "Founding sole developer and club tech lead, owning product, architecture, roadmap, and weekly delivery end-to-end from May 2025 to present.",
    "approach": [
      "Built a Next.js 15 / React / TypeScript platform across 12 routes (about 6,500 lines of hand-written app code, 80 commits), with a Google Sheets CSV ETL pipeline that parses, filters, privacy-masks member data, and caches results in localStorage with a 10-minute TTL so execs can update rankings without touching code.",
      "Engineered a computer-vision image-to-data pipeline that ingests photos of paper match sheets, extracts player names, student IDs, and the declared winner, validates the winner against the two players listed, and uses student ID lookup to reduce OCR misreads, then writes structured records into the ranking workflow.",
      "Built tournament tooling including a 2v2 bracket generator with team/player modes, randomization, BYE handling, and save/load state, plus an embedded AI chatbot and a scalable JSON-driven event architecture with date-based rendering that auto-splits upcoming and past events.",
      "Designed a 5-tier live Elo ranking system on top of the ETL pipeline, giving members a real-time leaderboard that updates each term without any manual developer intervention."
    ],
    "keyDecisions": [
      "Chose Google Sheets as the data source rather than a custom database because club execs already managed rankings there, so a CSV ETL pull with localStorage TTL caching let the non-technical exec team remain the source of truth without a backend migration or login system.",
      "Built the computer-vision pipeline with explicit validation (winner must be one of the two named players, student ID cross-lookup to correct OCR drift) rather than trusting raw model output directly, because a ranking system is only useful if members trust its accuracy.",
      "Kept the entire stack on a single Next.js deployment with no separate backend service, which trades some architectural separation for zero DevOps overhead for a club project with no budget and a single developer on call."
    ],
    "impact": [
      "Computer-vision match-sheet pipeline cut a 1-2 hour manual transcription task to under 3 minutes with zero errors in the scoped workflow.",
      "Platform serves 320+ members (club users) across 12 routes, handling live leaderboard updates and tournament sign-ups each term.",
      "Replaced the club's static Linktree with a production platform the club runs on week-to-week, with no developer involvement needed for routine ranking updates."
    ],
    "learned": [
      "Owning a product with real users sharpens prioritisation instincts in a way side projects don't: when 320 people check your leaderboard each week, a ranking bug is an urgent fix, not a backlog item, and that accountability changes how carefully you design validation logic.",
      "I learned that raw git contribution numbers (line counts, file counts) can be misleading and that the defensible, trustworthy number to present is the hand-written app code, about 6,500 lines of TypeScript/React, not raw git stats that include generated files and churn.",
      "If I were starting over I would introduce a lightweight Supabase backend earlier to decouple the data pipeline from the client-side ETL, which would make the privacy-masking layer server-enforced rather than client-enforced and open the door to richer analytics without changing the exec workflow."
    ],
    "stack": [
      "Next.js 15",
      "TypeScript",
      "React",
      "Tailwind v4",
      "Google Sheets API",
      "React Three Fiber",
      "p5.js",
      "Vercel"
    ],
    "links": {
      "github": "https://github.com/UTM-Billiards-Club/utm-billiards-site",
      "liveUrl": "https://utmbc.vercel.app",
      "devpost": ""
    },
    "award": ""
  },
  {
    "slug": "claimflow",
    "title": "ClaimFlow",
    "oneLiner": "A human-in-the-loop AI medical insurance claims platform that routes every claim through imaging, medical, and adjudication review stages with full audit accountability, keeping humans responsible for every consequential decision.",
    "problem": "Medical insurance claims processing is high-stakes and document-heavy, yet most AI tooling either automates final decisions (introducing unaccountable risk) or offers no structured auditability. The gap is a system that uses AI for extraction, classification, retrieval, and summarization while enforcing human approval at every transition and logging every model call and decision in a tamper-evident chain.",
    "role": "Sole engineer: designed and built the full-stack architecture, trained and fine-tuned the EfficientNet-B0 classifier, implemented the provider-pluggable LLM layer and ChromaDB RAG pipeline, wrote the hash-chained audit log, and authored the 253-test validation suite.",
    "approach": [
      "Built a three-stage workflow (imaging specialist review, medical specialist review, insurance agent adjudication) in FastAPI with SQLAlchemy, each stage gated by human approval before the claim can advance, enforcing a state-machine that prevents out-of-order transitions.",
      "Fine-tuned an EfficientNet-B0 classifier on 15,000 ROCOv2 radiology images to 94.2% test accuracy (ECE 0.016) and fused it with deterministic tampering forensics (DICOM/metadata consistency, ELA, frequency analysis, copy-move detection) so the imaging layer is not wholly dependent on any single generative model.",
      "Built a provider-pluggable LLM client with Claude as primary and Gemini as fallback, structured outputs, stop-reason guardrails, per-call cost audit, and prompt-injection defences that treat uploaded documents as untrusted data rather than instructions.",
      "Implemented per-claimant ChromaDB RAG retrieval with namespace isolation and an anonymizer for cross-claimant precedent lookup, then enforced a hash-chained, actor-aware audit log across every workflow transition, model call, retrieval, and email action, validated by a 253-test backend suite covering state-machine, audit-tamper, PII, prompt-injection, real-CNN serving, and full lifecycle E2E."
    ],
    "keyDecisions": [
      "Chose a fine-tuned EfficientNet-B0 over a vision LLM for modality classification because the classifier is cheap, fast, repeatable, and independently testable, while the LLM handles language-heavy summarization where deterministic alternatives are weaker, mixing the two gives auditability without sacrificing capability.",
      "Made the provider-pluggable LLM layer swappable behind one client interface so the demo runs Claude and Gemini while the documented production path points to Bedrock-style controlled deployment, avoiding vendor lock-in at the workflow level.",
      "Treated uploaded claim documents as untrusted data throughout: structured outputs, role separation, retrieval namespace isolation, and injection tests in the test suite, because the failure mode in a high-trust environment is not wrong answers, it is uncontrolled instruction execution from adversarial document content."
    ],
    "impact": [
      "94.2% test accuracy (ECE 0.016) on the EfficientNet-B0 imaging classifier trained on 15,000 ROCOv2 radiology images, with deterministic tampering forensics fused in for robustness beyond the CNN alone.",
      "253-test backend suite covering state-machine transitions, audit-tamper detection, PII handling, prompt-injection cases, real-CNN serving, and full lifecycle E2E, giving confidence that the governance layer holds under adversarial inputs.",
      "Hash-chained, actor-aware audit log records every model call, retrieval, workflow transition, and email action, providing a tamper-evident trace that satisfies the auditability bar required in regulated decision-support contexts."
    ],
    "learned": [
      "Building the test suite around adversarial cases (prompt injection, audit tamper, PII leakage) rather than only happy-path flows surfaced design gaps I would not have caught through manual testing, the discipline of writing injection tests forced me to harden the document-ingestion boundary before it was obviously broken.",
      "Fusing deterministic forensic signals with the CNN classifier taught me that model accuracy metrics alone are insufficient for high-trust pipelines: the ECE and accuracy numbers matter, but what the system does when the model is wrong or the input is manipulated matters more, which is why the fallback and audit layers exist independently of the classifier.",
      "I would add PHI redaction at the ingestion boundary and production-grade RBAC earlier in the design rather than as post-MVP concerns, both are architectural constraints that affect schema, API surface, and retrieval isolation decisions, and retrofitting them cleanly is more work than building them in."
    ],
    "stack": [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "PyTorch",
      "EfficientNet-B0",
      "ChromaDB",
      "sentence-transformers",
      "Anthropic Claude",
      "Gemini",
      "Next.js",
      "TypeScript",
      "Docker"
    ],
    "links": {
      "github": "https://github.com/Minifigures/claimflow",
      "liveUrl": "",
      "devpost": ""
    },
    "award": ""
  },
  {
    "slug": "pandexis",
    "title": "Pandexis",
    "oneLiner": "IBM x UNSA two-track winning epidemic simulator that pairs a four-layer SEIR/Monte Carlo engine with a fault-tolerant RAG LLM explainer, proving that scientific models can be honest about uncertainty at demo time.",
    "problem": "During an outbreak scenario, public-health responders and non-technical stakeholders need region-level spread forecasts with explicit uncertainty, not black-box predictions. Existing tools either skip the uncertainty quantification or require an epidemiologist to interpret the output.",
    "role": "Project lead and #1 of 5 contributors. Owned the pandemic modelling core: the vectorized SEIR simulation, mobility-driven spread formulas implemented from research papers, and the polar-view visualisation.",
    "approach": [
      "Built a four-layer simulation stack: a region-indexed SEIR model with mobility coupling, Monte Carlo uncertainty bands for 30-60 day forecasts, and a RAG retrieval layer over epidemiology papers backing every /lookup call.",
      "Designed a fault-tolerant 3-provider LLM fallback chain (IBM watsonx Granite chat -> Claude Haiku -> deterministic template) so the /explain endpoint never fails open during a live demo or real query.",
      "Deployed the FastAPI backend on IBM Cloud VPC/VSI (Toronto region) using IBM Z/LinuxONE infrastructure, with Granite embeddings powering the RAG index and a MapLibre GL JS + Next.js frontend surfacing the country/region risk map.",
      "Shipped 104 automated tests (73 backend, 31 frontend) wired to CI/CD auto-deploy, enforcing regression coverage across the simulation math, the fallback chain, and the API surface."
    ],
    "keyDecisions": [
      "Chose a deterministic SEIR + Monte Carlo approach over a pure ML model so uncertainty bands are traceable to actual parameters (transmission rate, mobility weight) rather than opaque learned weights, which made the output defensible to judges and stakeholders.",
      "Built the 3-provider fallback (Granite -> Claude -> template) rather than a single LLM dependency because IBM watsonx Granite was a new-to-me enterprise stack under a hackathon timeline. The template fallback guaranteed a coherent explanation even if both cloud providers rate-limited, which is the same defensive design I would apply to any production AI system.",
      "Reported uncertainty bands explicitly in the UI instead of surfacing a single point forecast, accepting that wider bands look less confident in exchange for being honest about model limits. That trade-off is the same one that matters in financial or risk-modelling contexts where overconfidence has a real cost."
    ],
    "impact": [
      "Won two tracks as project lead against 600+ participants from a 10,000+ applicant pool at IBM x UNSA.",
      "104 automated tests (73 backend + 31 frontend) on CI/CD gave the team a regression net across the simulation math and LLM fallback chain throughout the build."
    ],
    "learned": [
      "Ramping on IBM Z/LinuxONE and watsonx Granite from zero during a hackathon sprint taught me that the fastest way to learn an unfamiliar enterprise stack is to wire it behind an abstraction (the fallback chain) so the rest of the system can keep moving while I figure out the new API.",
      "Writing 104 tests during a hackathon felt like overhead at first, but it actually let me refactor the SEIR core mid-sprint without breaking the API contract. I would make that call again on any project where the simulation math is load-bearing.",
      "The polar-view section I owned showed me that communicating uncertainty visually, uncertainty bands on a map, is a product decision as much as a technical one. A correct forecast that users cannot read is not useful."
    ],
    "stack": [
      "Python",
      "FastAPI",
      "Next.js",
      "MapLibre GL JS",
      "IBM watsonx Granite",
      "Granite Embeddings",
      "Claude Haiku",
      "RAG",
      "IBM Cloud VPC/VSI",
      "IBM Z/LinuxONE",
      "CI/CD (GitHub Actions)"
    ],
    "links": {
      "github": "",
      "liveUrl": "",
      "devpost": "https://devpost.com/software/disease-outflow-forecaster"
    },
    "award": "IBM x UNSA Two-Track Winner (1 of 5, vs 600+ participants)"
  },
  {
    "slug": "personal-site",
    "title": "This Portfolio",
    "oneLiner": "A single-page WebGL portfolio that gates visitors through a cinematic 'Human + AI' intro before handing off into a scroll-driven 3D beach at sunset, built to be the strongest project on the site rather than just the frame around it.",
    "problem": "A resume lists what you have done; it does not show how you think or build. I wanted a portfolio that a recruiter remembers, that holds 60fps, and that proves I can ship a polished, performant, interactive experience end to end, not only CRUD apps and notebooks.",
    "role": "Designer and developer, solo. Owned the concept, the 3D scene, interaction design, the performance budget, the content architecture, and deployment.",
    "approach": [
      "Built the experience as two distinct acts: a dark, gated 'Human + AI' intro (a robotic hand and a human hand reaching toward a glowing spark) and, once the visitor clicks Enter, a scroll-driven 3D beach at sunset rendered with React Three Fiber.",
      "Drove the camera and the section reveals from scroll position with GSAP ScrollTrigger, with the R3F Canvas fixed full-screen behind HTML sections layered by z-index, so the 3D scene and the content scroll as one composition.",
      "Kept all content (projects, experience, skills, and these case studies) in typed data files, so the site is data-driven and every card, including this case-study system, is generated from one source of truth and statically rendered at build time.",
      "Designed an Apple-style 'liquid glass' UI layer, translucent panels with specular highlights, tuned for readability over the bright beach, and ran the whole thing on a single live WebGL context so only one act renders at a time."
    ],
    "keyDecisions": [
      "Modelling the intro and the beach as two phases that never run at once (a small Zustand state machine: idle, entering, entered) kept exactly one WebGL context alive, which protected the frame budget on mid-range and mobile GPUs. Running both scenes at once was the obvious shortcut and the wrong one.",
      "Rendering the intro backdrop as a video layer instead of a second live 3D scene removed an entire GPU context during gating and made the intro deterministic across devices, after an earlier all-procedural 3D version proved fragile to render reliably.",
      "Driving the liquid-glass tokens dark instead of light was the fix for readability: an early version inherited a light glass treatment that washed out over the bright sunset, so I made the glass fill dark navy and added specular pseudo-elements for the gloss, which held contrast without losing the effect.",
      "Budgeting for performance up front (AdaptiveDpr, AdaptiveEvents, a PerformanceMonitor that degrades gracefully, and Draco-compressed GLTF) rather than optimizing after the fact kept the build at 60fps on a mid-range laptop and Lighthouse 90+ across categories."
    ],
    "impact": [
      "Holds 60fps on a mid-range laptop and degrades gracefully on mobile via AdaptiveDpr, AdaptiveEvents, and a PerformanceMonitor.",
      "Lighthouse 90+ across performance, accessibility, best practices, and SEO, with reduced-motion visitors served a static, no-canvas path.",
      "Every project case study, including this one, is statically generated from typed data at build time, keeping the content layer a single source of truth.",
      "Live at marcoayuste.com on Vercel."
    ],
    "learned": [
      "The concept came from gated 'enter the experience' sites like messenger.abeto.co and from the Creation of Adam as a metaphor for a human and an AI reaching toward each other, which became the intro. Committing to one strong central metaphor early made every later design call easier to judge.",
      "Compositing is a feature, not an afterthought: a bright bloom on a transparent canvas blanks out, so the canvas has to be opaque with the scene drawing its own background. That bug taught me to read the renderer's compositing model rather than fight it.",
      "Performance is a design constraint, not a cleanup step. Setting the frame budget and the single-context rule before building meant I never had to tear the architecture apart to claw frames back later."
    ],
    "stack": [
      "Next.js 15",
      "React Three Fiber",
      "Three.js",
      "@react-three/postprocessing",
      "Tailwind CSS v4",
      "Framer Motion",
      "GSAP ScrollTrigger",
      "Zustand",
      "TypeScript",
      "Vercel"
    ],
    "links": {
      "github": "https://github.com/Minifigures/personal-site",
      "liveUrl": "https://marcoayuste.com",
      "devpost": ""
    },
    "award": "Live at marcoayuste.com"
  }
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
