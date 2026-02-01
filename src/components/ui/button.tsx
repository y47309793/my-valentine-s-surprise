import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden transform hover:scale-105 hover:-translate-y-0.5 active:scale-100 active:translate-y-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30",
        destructive: "bg-gradient-to-r from-destructive to-destructive/90 text-destructive-foreground shadow-lg shadow-destructive/25 hover:shadow-xl hover:shadow-destructive/30",
        outline: "border-2 border-input bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground hover:border-accent",
        secondary: "bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground shadow-md hover:shadow-lg",
        ghost: "hover:bg-accent/80 hover:text-accent-foreground backdrop-blur-sm",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-lg px-4",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-11 w-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
