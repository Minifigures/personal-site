"use client";

// Profile photo lives at public/profile.png.
// If the file is absent or fails to load, a coral->teal gradient with "MA" initials is shown instead.

import { useState } from "react";

export function ProfilePhoto() {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        aria-label="Marco Anthony Ayuste initials avatar"
        style={{
          width: 108,
          height: 108,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #E8735A 0%, #2A9D8F 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 0 3px rgba(232,115,90,0.5), 0 4px 24px rgba(0,0,0,0.35)",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "inherit",
            fontWeight: 700,
            fontSize: "2rem",
            color: "#FDF6EC",
            letterSpacing: "0.04em",
            userSelect: "none",
          }}
        >
          MA
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/profile.png"
      alt="Marco Anthony Ayuste"
      width={108}
      height={108}
      onError={() => setErrored(true)}
      style={{
        width: 108,
        height: 108,
        borderRadius: "50%",
        objectFit: "cover",
        boxShadow: "0 0 0 3px rgba(232,115,90,0.5), 0 4px 24px rgba(0,0,0,0.35)",
        flexShrink: 0,
        display: "block",
      }}
    />
  );
}
