# Backend: Portfolio AI Chatbot Service

FastAPI service that will power an AI chatbot on marcoayuste.com. Visitors will be able to ask about projects, experience, and skills, and get concise, grounded answers sourced from the same typed data the frontend renders.

## Status

Scaffolded, not wired to the frontend yet. `GET /health` works today. `POST /chat` returns a stub response until the agent layer and the frontend widget land in a follow-up.

## Stack

- FastAPI (Python 3.11), async I/O
- Anthropic SDK (Claude) as the underlying model
- Pydantic v2 for typed request/response schemas and settings
- Uvicorn as the ASGI server
- Docker for local and deploy parity

## Layout

```
backend/
├── main.py            # FastAPI app, routes, CORS, lifespan
├── agent.py           # Claude-backed portfolio agent (stub)
├── requirements.txt   # Pinned Python dependencies
├── .env.example       # Required environment variables
├── .gitignore         # Python-specific ignores
└── Dockerfile         # Production container image
```

## Planned endpoints

| Method | Path            | Purpose                                  |
|--------|-----------------|------------------------------------------|
| GET    | `/health`       | Liveness check for platform probes       |
| POST   | `/chat`         | Send a visitor message, receive a reply  |
| GET    | `/openapi.json` | Auto-generated OpenAPI 3 specification   |

## Run locally

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # then fill in ANTHROPIC_API_KEY
uvicorn main:app --reload --port 8000
```

Hit `http://localhost:8000/health`, or open `http://localhost:8000/docs` for the interactive OpenAPI UI.

### Docker

```bash
docker build -t portfolio-chat ./backend
docker run --env-file backend/.env -p 8000:8000 portfolio-chat
```

## Integration plan

1. Deploy the service to Fly.io or Railway with `ANTHROPIC_API_KEY` set.
2. Add a chat widget to the Next.js frontend (floating button, slide-in panel).
3. Frontend posts `{ message, session_id }` to `/chat`. Backend loads the portfolio context (from `../src/data/`) into the system prompt, calls Claude, and streams the reply back.
4. Persist short conversation memory per session id (in-memory for v1, Redis if needed).
5. Rate limit per IP and per session to keep costs bounded.

## Why grounded answers

The agent only answers from the portfolio data layer (projects, experience, skills). If a visitor asks something off-topic the agent redirects back to the portfolio. That keeps the tool honest and prevents hallucinated claims about my work.
