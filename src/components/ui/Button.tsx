import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: "primary" | "secondary";
}

export default function Button({ children, variant, ...props }: ButtonProps) {
  const variants = {
    primary: "bg-button-primary  hover:scale-105 cursor-pointer ",
    secondary:
      "bg-button-secondary hover:opacity-80 cursor-pointer border border-white",
  };

  return (
    <button
      {...props}
      className={clsx(
        "px-4 py-2 rounded-md text-white font-medium transition-all duration-200",
        variants[variant],
      )}
    >
      {children}
    </button>
  );
}
