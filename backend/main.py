"""FastAPI entry point for the portfolio AI chatbot service."""
from __future__ import annotations

import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from agent import PortfolioAgent

agent: PortfolioAgent | None = None


@asynccontextmanager
async def lifespan(_: FastAPI):
    global agent
    agent = PortfolioAgent()
    yield
    agent = None


app = FastAPI(
    title="Marco Ayuste Portfolio Chat",
    version="0.1.0",
    description="Grounded AI assistant for marcoayuste.com visitors.",
    lifespan=lifespan,
)


def _cors_origins() -> list[str]:
    raw = os.getenv("CORS_ORIGINS", "https://marcoayuste.com,http://localhost:3000")
    return [origin.strip() for origin in raw.split(",") if origin.strip()]


app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins(),
    allow_methods=["GET", "POST"],
    allow_headers=["content-type"],
)


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)
    session_id: str | None = None


class ChatResponse(BaseModel):
    reply: str
    session_id: str | None = None


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    reply = await agent.reply(request.message) if agent else "Agent not initialised."
    return ChatResponse(reply=reply, session_id=request.session_id)
