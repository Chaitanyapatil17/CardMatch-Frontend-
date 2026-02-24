import React from "react";

export const PulsatingButton = React.forwardRef(
  (
    {
      className = "",
      children,
      pulseColor = "#6366f1",
      duration = "1.5s",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`bg-primary text-primary-foreground relative flex cursor-pointer items-center justify-center rounded-lg px-6 py-3 text-center overflow-hidden ${className}`}
        style={{
          "--pulse-color": pulseColor,
          "--duration": duration,
        }}
        {...props}
      >
        <div className="relative z-10 font-medium">
          {children}
        </div>

        <div className="pulse-animation absolute inset-0 rounded-lg bg-inherit" />
      </button>
    );
  }
);

PulsatingButton.displayName = "PulsatingButton";