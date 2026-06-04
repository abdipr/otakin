import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "brand";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold transition-all duration-150 ease-out focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-orange/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
          // Variants
          variant === "default" &&
            "bg-neutral-900 text-neutral-50 hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 shadow-[0_4px_0_0_rgba(0,0,0,0.4)] dark:shadow-[0_4px_0_0_rgba(255,255,255,0.3)] active:shadow-[0_0px_0_0_rgba(0,0,0,0.4)] dark:active:shadow-[0_0px_0_0_rgba(255,255,255,0.3)] active:translate-y-[4px]",
          variant === "destructive" &&
            "bg-red-500 text-white hover:bg-red-600 shadow-[0_4px_0_0_rgba(153,27,27,0.8)] active:shadow-[0_0px_0_0_rgba(153,27,27,0.8)] active:translate-y-[4px]",
          variant === "outline" &&
            "border-2 border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-900 shadow-[0_4px_0_0_#d4d4d4] dark:shadow-[0_4px_0_0_#171717] active:shadow-[0_0px_0_0_#d4d4d4] dark:active:shadow-[0_0px_0_0_#171717] active:translate-y-[4px]",
          variant === "secondary" &&
            "bg-neutral-100 text-neutral-950 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-700 shadow-[0_4px_0_0_rgba(0,0,0,0.1)] dark:shadow-[0_4px_0_0_rgba(0,0,0,0.5)] active:shadow-[0_0px_0_0_rgba(0,0,0,0.1)] dark:active:shadow-[0_0px_0_0_rgba(0,0,0,0.5)] active:translate-y-[4px]",
          variant === "ghost" &&
            "hover:bg-neutral-100 text-neutral-700 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-50 active:scale-[0.97]",
          variant === "link" &&
            "text-brand-orange underline-offset-4 hover:underline active:scale-[0.97]",
          variant === "brand" &&
            "bg-linear-to-r from-brand-orange-light via-brand-orange to-brand-rose text-white shadow-[0_4px_0_0_rgba(180,50,30,0.6)] hover:brightness-105 active:shadow-[0_0px_0_0_rgba(180,50,30,0.6)] active:translate-y-[4px]",
          // Sizes
          size === "default" && "h-11 px-5 py-2.5",
          size === "sm" && "h-9 px-3 rounded-lg text-xs",
          size === "lg" && "h-12 px-8 rounded-xl",
          size === "icon" && "h-10 w-10",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
