import { useUser } from "../providers/UserProvider";

const Navbar = () => {
  const user = useUser();
  const email = user
    ?.find((attribute) => attribute.getName() === "email")
    ?.getValue();

  return (
    <nav className="bg-indigo-500 text-white sm:px-20">
      <div className="flex flex-wrap items-center justify-between p-4">
        <a href="/">
          <span className="self-center text-2xl font-semibold">
            Event Signup
          </span>
        </a>
        <div className="text-lg">
          <ul>
            <li>{email ? <span>{email}</span> : <a href="/login">Login</a>}</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
