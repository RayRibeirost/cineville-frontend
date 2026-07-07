import clsx from "clsx";

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasIcon?: boolean;
  error?: string;
}

export default function InputForm({
  error,
  hasIcon,
  ...props
}: InputFormProps) {
  return (
    <>
      <input
        {...props}
        className={clsx(
          "w-full px-4 py-3 rounded-lg bg-grayScale-700  text-grayScale-200 placeholder-grayScale-500 text-sm focus:outline-none ",
          `${hasIcon ? "border-none" : "border border-grayScale-600 focus:border-red-cinema transition-all"}`,
        )}
      />
    </>
  );
}
