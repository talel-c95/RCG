import React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={["rounded-lg border bg-card text-card-foreground shadow-sm", className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

