import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "md" | "lg";
  block?: boolean;
  variant?: "outline" | "primary" | "inverted";
}

// Mapped onto the shared .btn styles in globals.css
const sizes = {
  md: "",
  lg: "text-lg",
};

const variants = {
  primary: "btn",
  outline: "btn btn-outline",
  inverted: "btn bg-white",
};

export function Button({ size = "md", variant = "primary", block, className, children, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={[block && "btn-block", sizes[size], variants[variant], className].filter(Boolean).join(" ")}
    >
      {children}
    </button>
  );
}
