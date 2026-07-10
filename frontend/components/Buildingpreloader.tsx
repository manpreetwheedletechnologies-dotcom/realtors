'use client';

import React from 'react';

/**
 * BuildingPreloader
 *
 * A looping "buildings under construction" preloader animation.
 * Drop this component anywhere (e.g. a loading.tsx route, a modal,
 * or a full-screen splash) to show it.
 *
 * Usage:
 *   import BuildingPreloader from '@/components/BuildingPreloader';
 *   export default function Loading() {
 *     return <BuildingPreloader />;
 *   }
 *
 * Props let you drop it inline instead of full-screen, and customize
 * the loading label.
 */

interface BuildingPreloaderProps {
  /** Render full-screen and centered. Default: true */
  fullScreen?: boolean;
  /** Text shown under the animation. Default: "Building" */
  label?: string;
}

export default function BuildingPreloader({
  fullScreen = true,
  label = 'Building',
}: BuildingPreloaderProps) {
  return (
    <div className={fullScreen ? 'bp-screen' : 'bp-inline'}>
      <div className="bp-stage">
        <div className="bp-grid" />
        <div className="bp-sweep" />

        <svg width="360" height="220" viewBox="0 0 360 220">
          <line x1="10" y1="190" x2="350" y2="190" className="bp-baseline" />

          {/* crane */}
          <g className="bp-crane">
            <rect x="60" y="40" width="4" height="150" fill="var(--bp-line-cyan)" />
            <polyline
              points="14,44 64,40 130,50"
              fill="none"
              stroke="var(--bp-amber)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line x1="20" y1="44" x2="20" y2="70" stroke="var(--bp-amber)" strokeWidth="2" className="bp-hook" />
            <rect x="12" y="70" width="16" height="12" fill="var(--bp-amber)" className="bp-hook" />
          </g>

          {/* buildings, staggered heights */}
          <g className="bp-building bp-b1">
            <rect className="bp-body" x="20" y="110" width="34" height="80" />
            <rect className="bp-window" x="28" y="122" width="6" height="6" />
            <rect className="bp-window" x="40" y="122" width="6" height="6" />
            <rect className="bp-window" x="28" y="140" width="6" height="6" />
            <rect className="bp-window" x="40" y="140" width="6" height="6" />
            <rect className="bp-window" x="28" y="158" width="6" height="6" />
            <rect className="bp-window" x="40" y="158" width="6" height="6" />
          </g>

          <g className="bp-building bp-b2">
            <rect className="bp-body" x="66" y="70" width="40" height="120" />
            <rect className="bp-window" x="75" y="84" width="6" height="6" />
            <rect className="bp-window" x="90" y="84" width="6" height="6" />
            <rect className="bp-window" x="75" y="102" width="6" height="6" />
            <rect className="bp-window" x="90" y="102" width="6" height="6" />
            <rect className="bp-window" x="75" y="120" width="6" height="6" />
            <rect className="bp-window" x="90" y="120" width="6" height="6" />
            <rect className="bp-window" x="75" y="138" width="6" height="6" />
            <rect className="bp-window" x="90" y="138" width="6" height="6" />
            <rect className="bp-window" x="75" y="156" width="6" height="6" />
            <rect className="bp-window" x="90" y="156" width="6" height="6" />
          </g>

          <g className="bp-building bp-b3">
            <rect className="bp-body" x="118" y="30" width="46" height="160" />
            <rect className="bp-window" x="128" y="44" width="7" height="7" />
            <rect className="bp-window" x="146" y="44" width="7" height="7" />
            <rect className="bp-window" x="128" y="64" width="7" height="7" />
            <rect className="bp-window" x="146" y="64" width="7" height="7" />
            <rect className="bp-window" x="128" y="84" width="7" height="7" />
            <rect className="bp-window" x="146" y="84" width="7" height="7" />
            <rect className="bp-window" x="128" y="104" width="7" height="7" />
            <rect className="bp-window" x="146" y="104" width="7" height="7" />
            <rect className="bp-window" x="128" y="124" width="7" height="7" />
            <rect className="bp-window" x="146" y="124" width="7" height="7" />
            <rect className="bp-window" x="128" y="144" width="7" height="7" />
            <rect className="bp-window" x="146" y="144" width="7" height="7" />
            <rect className="bp-window" x="128" y="164" width="7" height="7" />
            <rect className="bp-window" x="146" y="164" width="7" height="7" />
          </g>

          <g className="bp-building bp-b4">
            <rect className="bp-body" x="172" y="94" width="38" height="96" />
            <rect className="bp-window" x="181" y="106" width="6" height="6" />
            <rect className="bp-window" x="195" y="106" width="6" height="6" />
            <rect className="bp-window" x="181" y="124" width="6" height="6" />
            <rect className="bp-window" x="195" y="124" width="6" height="6" />
            <rect className="bp-window" x="181" y="142" width="6" height="6" />
            <rect className="bp-window" x="195" y="142" width="6" height="6" />
            <rect className="bp-window" x="181" y="160" width="6" height="6" />
            <rect className="bp-window" x="195" y="160" width="6" height="6" />
          </g>

          <g className="bp-building bp-b5">
            <rect className="bp-body" x="216" y="130" width="30" height="60" />
            <rect className="bp-window" x="223" y="140" width="5" height="5" />
            <rect className="bp-window" x="234" y="140" width="5" height="5" />
            <rect className="bp-window" x="223" y="154" width="5" height="5" />
            <rect className="bp-window" x="234" y="154" width="5" height="5" />
            <rect className="bp-window" x="223" y="168" width="5" height="5" />
            <rect className="bp-window" x="234" y="168" width="5" height="5" />
          </g>
        </svg>

        <div className="bp-label">
          <span>{label}</span>
          <span className="bp-dot">.</span>
          <span className="bp-dot">.</span>
          <span className="bp-dot">.</span>
        </div>
      </div>

      <style jsx>{`
        .bp-screen {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bp-bg-deep);
          z-index: 9999;
        }
        .bp-inline {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: var(--bp-bg-deep);
          border-radius: 12px;
        }

        .bp-stage {
          --bp-bg-deep: #0b1d33;
          --bp-bg-panel: #0f2440;
          --bp-line-cyan: #7dd3fc;
          --bp-line-cyan-dim: #3e6e96;
          --bp-amber: #f5a623;
          --bp-ink: #e8f4ff;
          --bp-muted: #6b8cae;

          position: relative;
          width: 420px;
          max-width: 100%;
          height: 340px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', system-ui, sans-serif;
        }

        .bp-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(var(--bp-line-cyan-dim) 1px, transparent 1px),
            linear-gradient(90deg, var(--bp-line-cyan-dim) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.12;
          mask-image: radial-gradient(ellipse at center, black 55%, transparent 90%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 55%, transparent 90%);
        }

        svg {
          position: relative;
          z-index: 2;
          overflow: visible;
        }

        :global(.bp-building) {
          transform-box: fill-box;
          transform-origin: bottom center;
          animation: bp-rise 2.4s cubic-bezier(0.34, 1.4, 0.4, 1) infinite;
        }
        :global(.bp-body) {
          fill: var(--bp-bg-panel);
          stroke: var(--bp-line-cyan);
          stroke-width: 1.5;
        }
        :global(.bp-window) {
          fill: var(--bp-line-cyan);
          opacity: 0;
          animation: bp-blink 2.4s ease infinite;
        }

        :global(.bp-b1) {
          animation-delay: 0s;
        }
        :global(.bp-b2) {
          animation-delay: 0.15s;
        }
        :global(.bp-b3) {
          animation-delay: 0.3s;
        }
        :global(.bp-b4) {
          animation-delay: 0.45s;
        }
        :global(.bp-b5) {
          animation-delay: 0.6s;
        }

        :global(.bp-b1 .bp-window) {
          animation-delay: 1.05s;
        }
        :global(.bp-b2 .bp-window) {
          animation-delay: 1.2s;
        }
        :global(.bp-b3 .bp-window) {
          animation-delay: 1.35s;
        }
        :global(.bp-b4 .bp-window) {
          animation-delay: 1.5s;
        }
        :global(.bp-b5 .bp-window) {
          animation-delay: 1.65s;
        }

        @keyframes bp-rise {
          0% {
            transform: scaleY(0);
            opacity: 0;
          }
          28% {
            transform: scaleY(1.08);
            opacity: 1;
          }
          38% {
            transform: scaleY(1);
          }
          82% {
            transform: scaleY(1);
            opacity: 1;
          }
          92% {
            transform: scaleY(1);
            opacity: 0;
          }
          100% {
            transform: scaleY(0);
            opacity: 0;
          }
        }

        @keyframes bp-blink {
          0% {
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          82% {
            opacity: 0;
          }
          100% {
            opacity: 0;
          }
        }

        .bp-crane {
          animation: bp-swing 2.4s ease-in-out infinite;
          transform-origin: 64px 40px;
        }
        @keyframes bp-swing {
          0%,
          100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(6deg);
          }
        }
        .bp-hook {
          animation: bp-hoist 2.4s ease-in-out infinite;
        }
        @keyframes bp-hoist {
          0%,
          100% {
            transform: translateY(0);
          }
          45% {
            transform: translateY(18px);
          }
          55% {
            transform: translateY(18px);
          }
          85% {
            transform: translateY(0);
          }
        }

        .bp-sweep {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--bp-amber), transparent);
          opacity: 0.8;
          animation: bp-sweep 2.4s linear infinite;
        }
        @keyframes bp-sweep {
          0% {
            top: 6%;
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          90% {
            opacity: 0.9;
          }
          100% {
            top: 88%;
            opacity: 0;
          }
        }

        .bp-label {
          position: relative;
          z-index: 2;
          margin-top: 22px;
          font-family: 'IBM Plex Mono', ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--bp-muted);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .bp-dot {
          color: var(--bp-amber);
          animation: bp-dotfade 1.4s steps(1) infinite;
        }
        .bp-dot:nth-child(2) {
          animation-delay: 0.25s;
        }
        .bp-dot:nth-child(3) {
          animation-delay: 0.5s;
        }
        .bp-dot:nth-child(4) {
          animation-delay: 0.75s;
        }
        @keyframes bp-dotfade {
          0%,
          20% {
            opacity: 0.15;
          }
          40% {
            opacity: 1;
          }
          100% {
            opacity: 0.15;
          }
        }

        .bp-baseline {
          stroke: var(--bp-line-cyan);
          stroke-width: 1.5;
          opacity: 0.6;
        }

        @media (prefers-reduced-motion: reduce) {
          :global(.bp-building),
          :global(.bp-window),
          .bp-crane,
          .bp-hook,
          .bp-sweep,
          .bp-dot {
            animation: none !important;
          }
          :global(.bp-building) {
            transform: scaleY(1) !important;
            opacity: 1 !important;
          }
          :global(.bp-window) {
            opacity: 0.8 !important;
          }
        }
      `}</style>
    </div>
  );
}