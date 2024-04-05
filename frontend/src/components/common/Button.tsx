import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

const Button = ({ selected, ...props }: ButtonProps) => {
  const backgroundClass = selected ? "bg-indigo-700" : "bg-indigo-500";
  return (
    <button
      className={`shadow border rounded py-2 px-3 ${backgroundClass} text-white hover:bg-indigo-600 hover:shadow-md active:bg-indigo-700 active:shadow-md transition duration-150 ease-in-out`}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
