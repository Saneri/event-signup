import { Link } from "react-router-dom";
import { signOut } from "../auth/auth";
import { useUser } from "../providers/UserProvider";
import Button from "./common/Button";

const Navbar = () => {
  const { user, clearUser } = useUser();
  const email = user
    ?.find((attribute) => attribute.getName() === "email")
    ?.getValue();

  function logout() {
    signOut();
    clearUser();
  }

  return (
    <nav className="bg-indigo-500 text-white sm:px-20">
      <div className="flex flex-wrap items-center justify-between p-4">
        <a href="/">
          <span className="self-center text-2xl font-semibold">
            Event Signup
          </span>
        </a>
        <ul className="flex flex-wrap items-center gap-4 text-lg">
          {email && <li>{email}</li>}
          <li>
            {email ? (
              <Button onClick={logout}>Logout</Button>
            ) : (
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
