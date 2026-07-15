import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/utils";

// Variants
const buttonVariants = cva(
  "font-outfit inline-flex w-fit cursor-pointer items-center justify-center text-center font-medium transition-all duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-ui-3 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      intent: {
        primary: "bg-tx text-bg border-tx border hover:bg-bg hover:text-tx",
        secondary:
          "bg-bg-2 text-tx border-ui-2 border hover:border-ui-3 hover:bg-ui",
        star: "corner-scoop hover:corner-bevel border-yellow bg-red text-paper hover:bg-black dark:bg-red-light dark:hover:bg-base-950 cursor-pointer rounded-full border font-semibold duration-500 hover:border-x-12",
        copy: "text-tx-2 hover:text-tx p-0 font-light underline",
      },
      size: {
        xs: "p-1 px-6 text-xs",
        sm: "p-2 px-9 text-sm",
        md: "p-3 px-10 text-base",
        lg: "p-3 px-12 text-lg",
        xl: "p-9 px-16 text-xl",
        copy: "px-3 text-base",
        circle: "aspect-square min-h-3 min-w-3 rounded-full p-6",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  }
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

// Button
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ intent, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
