import React from "react";

interface SvgBackgroundProps {
  lineColor?: string;
  className?: string;
  layout?: "grid" | "wave";
}

export function SvgBackground({
  lineColor = "currentColor",
  className = "",
  layout = "grid",
}: SvgBackgroundProps) {
  const BoxShape = ({
    variant,
    className,
  }: {
    variant: "top" | "bottom" | "left" | "right";
    className?: string;
  }) => {
    const paths = {
      top: "M10 120 C80 40 220 40 290 120",
      bottom: "M10 180 C80 260 220 260 290 180",
      left: "M120 10 C40 80 40 220 120 290",
      right: "M180 10 C260 80 260 220 180 290",
    };

    return (
      <svg viewBox="0 0 300 300" className={className} fill="none">
        <rect
          x="10"
          y="10"
          width="280"
          height="280"
          rx="60"
          stroke={lineColor}
          strokeWidth="4"
        />

        <path
          d={paths[variant]}
          stroke={lineColor}
          strokeWidth={layout === "wave" ? "6" : "4"}
        />
      </svg>
    );
  };

  return (
    <div
      className={`absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden ${className}`}
    >
      {layout === "grid" ? (
        <div className="grid grid-cols-2 gap-4 md:gap-6 w-[80%] md:w-[60%] lg:w-[70%] max-w-[500px] opacity-60">
          <BoxShape variant="left" className="w-full h-auto" />
          <BoxShape variant="top" className="w-full h-auto" />
          <BoxShape variant="bottom" className="w-full h-auto" />
          <BoxShape variant="right" className="w-full h-auto" />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-1 md:gap-2 w-[95%] md:w-[85%] lg:w-[75%] max-w-5xl text-white">
          <BoxShape variant="top" className="w-full h-auto" />
          <BoxShape variant="bottom" className="w-full h-auto" />
          <BoxShape variant="top" className="w-full h-auto" />
          <BoxShape variant="bottom" className="w-full h-auto" />

          <BoxShape variant="bottom" className="w-full h-auto" />
          <BoxShape variant="top" className="w-full h-auto" />
          <BoxShape variant="bottom" className="w-full h-auto" />
          <BoxShape variant="top" className="w-full h-auto" />
        </div>
      )}
    </div>
  );
}

export default SvgBackground;
