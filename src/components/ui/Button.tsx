import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  variant: "primary" | "secondary";
};

export default function Button({ children, variant }: ButtonProps) {
  const variants = {
    primary:
      "bg-button-primary hover:bg-button-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
    secondary:
      "bg-button-secondary hover:bg-button-secondary-hover focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2",
  };

  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-md text-white font-semibold transition-colors duration-300",
        variants[variant],
      )}
    >
      {children}
    </button>
  );
}
