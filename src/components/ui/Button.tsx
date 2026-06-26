import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-button-primary hover:scale-105",
    secondary: "bg-button-secondary border border-white hover:opacity-80",
  };

  return (
    <button
      {...props}
      className={clsx(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-white font-medium transition-all duration-200 cursor-pointer",
        variants[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}
