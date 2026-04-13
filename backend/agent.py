"""Claude-backed portfolio agent. Wires to the Anthropic SDK in a follow-up."""
from __future__ import annotations

from typing import Literal

Role = Literal["user", "assistant"]


class PortfolioAgent:
    """Answers visitor questions grounded on Marco's portfolio data.

    v1 loads project, experience, and skill context into the system prompt at
    construction time. Replies are constrained to that context. Off-topic
    questions are redirected back to portfolio content.
    """

    SYSTEM_PROMPT = (
        "You are a concise assistant for Marco Ayuste's portfolio site. "
        "Answer strictly from the provided project, experience, and skill context. "
        "If a visitor asks something unrelated, redirect them back to the portfolio. "
        "Prefer two or three short sentences over a wall of text."
    )

    def __init__(self) -> None:
        self._ready = False

    async def reply(
        self,
        message: str,
        history: list[tuple[Role, str]] | None = None,
    ) -> str:
        """Respond to a visitor message. Anthropic SDK wiring lands in a follow-up."""
        return "Agent is scaffolded but not yet wired to the Anthropic SDK."
