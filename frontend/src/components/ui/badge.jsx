import * as React from "react";
import { cn } from "@/lib/utils";

const Badge = React.forwardRef(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-black text-white hover:bg-black/80",
      secondary: "bg-gray-100 text-black hover:bg-gray-200",
      outline: "border border-black text-black",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
