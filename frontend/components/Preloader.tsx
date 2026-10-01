"use client";
import { useEffect, useRef, useState } from "react";

/**
 * PGI Realtors - Preloader
 * Site theme: dark green + blueprint grid + mint accent, logo draw-in animation.
 *
 * Usage:
 *   <Preloader />                       // dark theme (default, site se match)
 *   <Preloader theme="light" />         // light theme
 *   <Preloader minDuration={5000} />    // kam se kam 5s dikhao
 *   <Preloader tagline={null} />        // neeche ka pill hatao
 *
 * Props (sab optional):
 *   theme       - "dark" | "light"                       (default "dark")
 *   name        - brand naam, pehla word mint color me   (default "PGI Realtors")
 *   tagline     - naam ke neeche pill text, null = hide  (default "Premium Land Locator")
 *   minDuration - minimum dikhne ka time, ms me          (default 4000)
 *   onFinish    - preloader hatne ke baad call hota hai
 */

interface PreloaderProps {
  theme?: "dark" | "light";
  name?: string;
  tagline?: string | null;
  minDuration?: number;
  onFinish?: () => void;
}

type Tone = "green" | "slate" | "ink";

type ShapeDef =
  | { tag: "path"; tone: Tone; d: string }
  | { tag: "rect"; tone: Tone; x: number; y: number; width: number; height: number };

const SHAPES: ShapeDef[] = [
  { tag: "path", tone: "green", d: "M0 225 L149 142 L149 174 L0 256 Z" },
  { tag: "path", tone: "slate", d: "M149 142 L296 225 L296 256 L149 174 Z" },
  { tag: "path", tone: "slate", d: "M59 105 L93 83 L93 157 L59 177 Z" },
  { tag: "path", tone: "slate", d: "M203 82 L237 106 L237 177 L203 157 Z" },
  { tag: "path", tone: "green", d: "M105 29 L148 0 L148 128 L105 151 Z" },
  { tag: "path", tone: "green", d: "M161 33 L191 51 L191 151 L161 134 Z" },
  { tag: "rect", tone: "ink", x: 131, y: 210, width: 15, height: 17 },
  { tag: "rect", tone: "ink", x: 151, y: 210, width: 15, height: 17 },
  { tag: "rect", tone: "ink", x: 131, y: 231, width: 15, height: 17 },
  { tag: "rect", tone: "ink", x: 151, y: 231, width: 15, height: 17 },
];

// Har shape ka timing (% of 6.5s loop): [start, outline-poora, fill-start, fill-poora]
const TIMINGS: [number, number, number, number][] = [
  [0, 16, 44, 58],
  [0, 16, 45, 59],
  [8, 26, 48, 62],
  [12, 30, 50, 64],
  [20, 40, 54, 70],
  [26, 46, 58, 74],
  [38, 46, 62, 70],
  [40, 48, 64, 72],
  [42, 50, 66, 74],
  [44, 52, 68, 76],
];

const KEYFRAMES = TIMINGS.map(([start, draw, fillStart, fillEnd], i) => {
  const steps = [
    `0% { opacity: 1; stroke-dashoffset: 1; fill-opacity: 0; }`,
    start > 0 ? `${start}% { stroke-dashoffset: 1; fill-opacity: 0; }` : "",
    `${draw}% { stroke-dashoffset: 0; fill-opacity: 0; }`,
    `${fillStart}% { stroke-dashoffset: 0; fill-opacity: 0; }`,
    `${fillEnd}% { stroke-dashoffset: 0; fill-opacity: 1; }`,
    `88% { opacity: 1; stroke-dashoffset: 0; fill-opacity: 1; }`,
    `97% { opacity: 0; stroke-dashoffset: 0; fill-opacity: 1; }`,
    `100% { opacity: 0; stroke-dashoffset: 1; fill-opacity: 0; }`,
  ]
    .filter(Boolean)
    .join("\n  ");
  return `.pgi-s${i} { animation-name: pgi-k${i}; }\n@keyframes pgi-k${i} {\n  ${steps}\n}`;
}).join("\n");

const STYLES = `
/* ---------- themes ---------- */
.pgi-preloader.pgi-dark {
  --pgi-bg-a: #112a1f; --pgi-bg-b: #0b1812; --pgi-bg-c: #09130e;
  --pgi-grid: rgba(110,231,160,.07); --pgi-hatch: rgba(110,231,160,.035);
  --pgi-glow: rgba(38,150,86,.34); --pgi-glow2: rgba(38,150,86,.16);
  --pgi-accent: #7EE0A3; --pgi-text: #F2F7F4;
  --pgi-green: #2FBF6A; --pgi-slate: #8E9BA4; --pgi-ink: #D5E4DA;
}
.pgi-preloader.pgi-light {
  --pgi-bg-a: #F3F8F4; --pgi-bg-b: #EAF3ED; --pgi-bg-c: #E4EFE8;
  --pgi-grid: rgba(15,129,60,.10); --pgi-hatch: rgba(15,129,60,.04);
  --pgi-glow: rgba(15,129,60,.14); --pgi-glow2: rgba(15,129,60,.07);
  --pgi-accent: #0F813C; --pgi-text: #1E2A24;
  --pgi-green: #0F813C; --pgi-slate: #424B52; --pgi-ink: #171A1C;
}

/* ---------- overlay ---------- */
.pgi-preloader {
  position: fixed; inset: 0; z-index: 9999; overflow: hidden;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 1.25rem;
  background:
    radial-gradient(ellipse 55% 60% at 12% 55%, var(--pgi-glow) 0%, transparent 70%),
    radial-gradient(ellipse 45% 50% at 90% 85%, var(--pgi-glow2) 0%, transparent 70%),
    linear-gradient(160deg, var(--pgi-bg-a) 0%, var(--pgi-bg-b) 55%, var(--pgi-bg-c) 100%);
  opacity: 1; visibility: visible;
  transition: opacity .8s ease, visibility .8s ease;
}
.pgi-preloader.pgi-hide { opacity: 0; visibility: hidden; pointer-events: none; }

/* blueprint grid + diagonal hatch */
.pgi-preloader::before {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(var(--pgi-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--pgi-grid) 1px, transparent 1px),
    repeating-linear-gradient(45deg, var(--pgi-hatch) 0 1px, transparent 1px 14px);
  background-size: 54px 54px, 54px 54px, auto;
  -webkit-mask-image: radial-gradient(ellipse 85% 80% at 50% 50%, #000 40%, transparent 100%);
          mask-image: radial-gradient(ellipse 85% 80% at 50% 50%, #000 40%, transparent 100%);
  animation: pgi-fade 1.4s ease both;
}
/* logo ke peeche center glow */
.pgi-preloader::after {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(circle at 50% 44%, var(--pgi-glow) 0%, transparent 38%);
  animation: pgi-fade 1.6s ease both;
}

/* corner brackets */
.pgi-corner {
  position: absolute; width: 36px; height: 36px; pointer-events: none;
  border: 0 solid var(--pgi-accent); opacity: .55;
  animation: pgi-fade 1.8s ease both;
}
.pgi-corner.tl { left: 28px;  top: 28px;    border-left-width: 2px;  border-top-width: 2px; }
.pgi-corner.tr { right: 28px; top: 28px;    border-right-width: 2px; border-top-width: 2px; }
.pgi-corner.bl { left: 28px;  bottom: 28px; border-left-width: 2px;  border-bottom-width: 2px; }
.pgi-corner.br { right: 28px; bottom: 28px; border-right-width: 2px; border-bottom-width: 2px; }
@keyframes pgi-fade { from { opacity: 0; } }

/* ---------- content ---------- */
.pgi-logo {
  position: relative; z-index: 1; width: clamp(100px, 16vw, 160px); height: auto; overflow: visible;
  filter: drop-shadow(0 0 22px var(--pgi-glow));
}
.pgi-name {
  position: relative; z-index: 1; margin: 0;
  font-size: clamp(1.2rem, 2.8vw, 1.7rem); font-weight: 700; letter-spacing: .14em;
  color: var(--pgi-text); opacity: 0;
  animation: pgi-name 6.5s cubic-bezier(.45,0,.15,1) infinite;
}
.pgi-name b { font-weight: 700; color: var(--pgi-accent); }
.pgi-tag {
  position: relative; z-index: 1; display: inline-flex; align-items: center; gap: .6rem;
  padding: .45rem 1.1rem; border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--pgi-accent) 35%, transparent);
  background: color-mix(in srgb, var(--pgi-accent) 7%, transparent);
  color: var(--pgi-accent); font-size: .68rem; font-weight: 600;
  letter-spacing: .32em; text-transform: uppercase;
  animation: pgi-fade 1s ease 1.4s both;
}
.pgi-tag i {
  width: 6px; height: 6px; border-radius: 50%; background: var(--pgi-accent);
  animation: pgi-pulse 1.6s ease-in-out infinite;
}
@keyframes pgi-pulse { 50% { opacity: .3; transform: scale(.7); } }

.pgi-s {
  stroke-width: 2; stroke-linejoin: round; stroke-dasharray: 1 1; stroke-dashoffset: 1;
  fill-opacity: 0; animation: 6.5s cubic-bezier(.45,0,.15,1) infinite;
}
.pgi-t-green { fill: var(--pgi-green); stroke: var(--pgi-green); }
.pgi-t-slate { fill: var(--pgi-slate); stroke: var(--pgi-slate); }
.pgi-t-ink   { fill: var(--pgi-ink);   stroke: var(--pgi-ink); }
@keyframes pgi-name {
  0%, 52% { opacity: 0; transform: translateY(6px); }
  68%, 88% { opacity: 1; transform: translateY(0); }
  97%, 100% { opacity: 0; transform: translateY(0); }
}
${KEYFRAMES}
@media (prefers-reduced-motion: reduce) {
  .pgi-s { animation: none; stroke-dashoffset: 0; fill-opacity: 1; }
  .pgi-name { animation: none; opacity: 1; }
  .pgi-tag, .pgi-tag i, .pgi-corner,
  .pgi-preloader::before, .pgi-preloader::after { animation: none; }
}
`;

export default function Preloader({
  theme = "dark",
  name = "PGI Realtors",
  tagline = "",
  minDuration = 4000,
  onFinish,
}: PreloaderProps) {
  const [mounted, setMounted] = useState(true);
  const [hiding, setHiding] = useState(false);

  // onFinish ko ref me rakha taaki parent re-render hone par timer restart na ho
  const onFinishRef = useRef(onFinish);
  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    const startedAt = Date.now();
    let t1: ReturnType<typeof setTimeout> | undefined;
    let t2: ReturnType<typeof setTimeout> | undefined;

    const finish = () => {
      const wait = Math.max(0, minDuration - (Date.now() - startedAt));
      t1 = setTimeout(() => {
        setHiding(true);
        t2 = setTimeout(() => {
          setMounted(false);
          onFinishRef.current?.();
        }, 850);
      }, wait);
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });

    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [minDuration]);

  // preloader dikhte waqt page scroll band
  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mounted]);

  if (!mounted) return null;

  const [first, ...rest] = name.split(" ");

  return (
    <div
      className={
        "pgi-preloader " + (theme === "light" ? "pgi-light" : "pgi-dark") + (hiding ? " pgi-hide" : "")
      }
      role="status"
      aria-live="polite"
      aria-label={"Loading " + name}
    >
      {/* dangerouslySetInnerHTML: CSS ke `"` ko React escape na kare (hydration mismatch fix) */}
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <span className="pgi-corner tl" />
      <span className="pgi-corner tr" />
      <span className="pgi-corner bl" />
      <span className="pgi-corner br" />

      <svg className="pgi-logo" viewBox="0 0 296 256" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {SHAPES.map((s, i) => {
          const cls = "pgi-s pgi-t-" + s.tone + " pgi-s" + i;
          return s.tag === "path" ? (
            <path key={i} className={cls} pathLength={1} d={s.d} />
          ) : (
            <rect key={i} className={cls} pathLength={1} x={s.x} y={s.y} width={s.width} height={s.height} />
          );
        })}
      </svg>

      <p className="pgi-name">
        <b>{first}</b>
        {rest.length ? " " + rest.join(" ") : ""}
      </p>

      {tagline && (
        <span className="pgi-tag">
          <i />
          {tagline}
        </span>
      )}
    </div>
  );
}