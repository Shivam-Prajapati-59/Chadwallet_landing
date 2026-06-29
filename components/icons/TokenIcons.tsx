import React from "react";

/** Official Solana logo — three-stripe brand mark with gradient */
export const SolanaIcon = () => (
  <svg
    viewBox="-2.2 0 402.1 311.7"
    width="14"
    height="11"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="sna">
        <stop offset="0" stopColor="#00ffa3" />
        <stop offset="1" stopColor="#dc1fff" />
      </linearGradient>
      <linearGradient
        id="snb"
        gradientTransform="matrix(1 0 0 -1 0 314)"
        gradientUnits="userSpaceOnUse"
        x1="360.879"
        x2="141.213"
        href="#sna"
        y1="351.455"
        y2="-69.294"
      />
      <linearGradient
        id="snc"
        gradientTransform="matrix(1 0 0 -1 0 314)"
        gradientUnits="userSpaceOnUse"
        x1="264.829"
        x2="45.163"
        href="#sna"
        y1="401.601"
        y2="-19.148"
      />
      <linearGradient
        id="snd"
        gradientTransform="matrix(1 0 0 -1 0 314)"
        gradientUnits="userSpaceOnUse"
        x1="312.548"
        x2="92.882"
        href="#sna"
        y1="376.688"
        y2="-44.061"
      />
    </defs>
    <path
      d="m64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8h-317.4c-5.8 0-8.7-7-4.6-11.1z"
      fill="url(#snb)"
    />
    <path
      d="m64.6 3.8c2.5-2.4 5.8-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8h-317.4c-5.8 0-8.7-7-4.6-11.1z"
      fill="url(#snc)"
    />
    <path
      d="m333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8h-317.4c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7-4.6-11.1z"
      fill="url(#snd)"
    />
  </svg>
);

/** Official X / Twitter logo */
export const XIcon = () => (
  <svg
    viewBox="0.254 0.25 500 451.954"
    width="10"
    height="10"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M394.033.25h76.67L303.202 191.693l197.052 260.511h-154.29L225.118 294.205 86.844 452.204H10.127l179.16-204.77L.254.25H158.46l109.234 144.417zm-26.908 406.063h42.483L135.377 43.73h-45.59z"
      fill="currentColor"
    />
  </svg>
);

/** Outline star for watchlist */
export const StarIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

/** Blue verified checkmark badge */
export const VerifiedBadge = () => (
  <div className="absolute -bottom-0.5 -right-0.5 w-[15px] h-[15px] bg-[#3B82F6] rounded-full flex items-center justify-center border-2 border-[#0C0E15]">
    <svg
      width="7"
      height="7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </div>
);
