import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: "primary" | "secondary";
}

export default function Button({ children, variant, ...props }: ButtonProps) {
  const variants = {
    primary: "bg-button-primary hover:bg-button-primary-hover cursor-pointer ",
    secondary:
      "bg-button-secondary hover:bg-button-secondary-hover cursor-pointer border border-white hover:border-button-primary",
  };

  return (
    <button
      {...props}
      className={clsx(
        "px-4 py-2 rounded-md text-white font-semibold transition-colors duration-200",
        variants[variant],
      )}
    >
      {children}
    </button>
  );
}
