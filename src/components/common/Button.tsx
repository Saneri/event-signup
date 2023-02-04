type Props = {
  children: string;
  type?: string;
};

const Button = (props: Props) => {
  return (
    <button className="shadow border rounded py-2 px-3 bg-indigo-500 text-white hover:bg-indigo-600 hover:shadow-md active:bg-indigo-700 active:shadow-md transition duration-150 ease-in-out">
      {props.children}
    </button>
  );
};

export default Button;
