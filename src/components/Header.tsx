"use client";
import useStore from "@/app/store";
import LoginForm from "./LoginForm";
import Register from "./RegisterForm";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function Header() {
  const email = useStore((state) => state.email);
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  return (
    <header className="flex items-center justify-between p-2 px-5">
      <div>
        <Link href="/">
          <h1 className="font-extrabold text-2xl">
            IJKL.<span className="text-red-900">fun</span>
          </h1>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-3">
        {!isLoggedIn ? (
          <div className="flex gap-4">
            <LoginForm />
            <Register />
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{email?.charAt(0)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <Link href="/my-urls">My URLs</Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel
                onClick={() =>
                  useStore.setState({
                    email: null,
                    isLoggedIn: false,
                    access_token: null,
                  })
                }
              >
                Logout
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
