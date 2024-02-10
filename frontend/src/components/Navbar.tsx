const Navbar = () => {
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
            <li>
              <a href="/login">Login</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
