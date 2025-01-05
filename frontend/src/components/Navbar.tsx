import { Link } from "react-router-dom";
import { useUser } from "../providers/UserProvider";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "aws-amplify/auth";

const Navbar = () => {
  const { user, fetchUser } = useUser();
  const nickname = user?.nickname;

  async function logout() {
    await signOut();
    fetchUser();
  }

  return (
    <nav className="sm:px-20 h-28">
      <div className="flex flex-wrap items-center justify-between px-4 h-full">
        <a href="/">
          <span className="self-center text-2xl font-semibold">
            Event Signup
          </span>
        </a>
        <ul className="flex flex-wrap items-center gap-4 text-lg">
          <li>
            {nickname ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={""} alt={nickname} />
                      <AvatarFallback>{nickname.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{nickname}</span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onSelect={logout}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                  >
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
