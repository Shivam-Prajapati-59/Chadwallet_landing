import React from "react";

export default function Container({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`w-full h-full ${className}`} {...props}>
      {children}
    </div>
  );
}
