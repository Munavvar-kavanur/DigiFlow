"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // High performance setter using quickTo
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });

    const fxTo = gsap.quickTo(follower, "x", { duration: 0.4, ease: "power3" });
    const fyTo = gsap.quickTo(follower, "y", { duration: 0.4, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      fxTo(e.clientX);
      fyTo(e.clientY);
    };

    const handleMouseDown = () => {
      gsap.to([cursor, follower], { scale: 0.8, duration: 0.2 });
    };

    const handleMouseUp = () => {
      gsap.to([cursor, follower], { scale: 1, duration: 0.2 });
    };

    const handleLinkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .interactive-card')) {
        gsap.to(follower, {
          scale: 2.5,
          backgroundColor: "rgba(234, 75, 113, 0.15)",
          borderColor: "rgba(234, 75, 113, 0.6)",
          duration: 0.3
        });
        gsap.to(cursor, { scale: 1.5, duration: 0.3 });
      } else {
        gsap.to(follower, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "rgba(234, 75, 113, 0.4)",
          duration: 0.3
        });
        gsap.to(cursor, { scale: 1, duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleLinkHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleLinkHover);
    };
  }, []);

  return (
    <>
      {/* Center Dot - removed mix-blend-screen and added shadow for light mode visibility */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-n8n-pink rounded-full pointer-events-none z-[100001] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(234,75,113,0.3)]"
      />
      {/* Outer Ring - increased base opacity for light mode */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-9 h-9 border border-n8n-pink/40 rounded-full pointer-events-none z-[100000] -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
};
