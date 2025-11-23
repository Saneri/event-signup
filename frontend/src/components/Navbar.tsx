import { signOut } from "aws-amplify/auth";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "../providers/UserProvider";

const Navbar = () => {
  const { user, fetchUser } = useUser();

  async function logout() {
    await signOut();
    await fetchUser();
  }

  return (
    <nav className="h-28">
      <div className="flex flex-wrap items-center justify-between h-full">
        <a href="/">
          <span className="self-center text-2xl font-semibold">Event Signup</span>
        </a>
        <ul className="flex flex-wrap items-center gap-4 text-lg">
          <li>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user.picture} alt={user.nickname} />
                      <AvatarFallback className="text-black">{user.nickname?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline">{user.nickname}</span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={logout} className="cursor-pointer p-2 hover:bg-gray-100">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
