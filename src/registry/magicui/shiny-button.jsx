import React from "react";
import { motion } from "framer-motion";

export const ShinyButton = React.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        initial={{ "--x": "100%", scale: 0.8 }}
        animate={{ "--x": "-100%", scale: 1 }}
        whileTap={{ scale: 0.95 }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 1,
          type: "spring",
          stiffness: 20,
          damping: 15,
          mass: 2,
          scale: {
            type: "spring",
            stiffness: 200,
            damping: 5,
            mass: 0.5,
          },
        }}
        className={`relative cursor-pointer rounded-lg border px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow dark:hover:shadow-[0_0_20px_var(--primary)/20%] ${className}`}
        {...props}
      >
        <span
          className="relative block w-full text-sm tracking-wide uppercase text-black/70 dark:text-white/90"
          style={{
            maskImage:
              "linear-gradient(-75deg,var(--primary) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),var(--primary) calc(var(--x) + 100%))",
          }}
        >
          {children}
        </span>

        <span
          style={{
            mask:
              "linear-gradient(#000,#000) content-box exclude,linear-gradient(#000,#000)",
            WebkitMask:
              "linear-gradient(#000,#000) content-box exclude,linear-gradient(#000,#000)",
            backgroundImage:
              "linear-gradient(-75deg,rgba(99,102,241,0.2) calc(var(--x)+20%),rgba(99,102,241,0.6) calc(var(--x)+25%),rgba(99,102,241,0.2) calc(var(--x)+100%))",
          }}
          className="absolute inset-0 z-10 block rounded-[inherit] p-px"
        />
      </motion.button>
    );
  }
);

ShinyButton.displayName = "ShinyButton";