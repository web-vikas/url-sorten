"use client";
import useStore from "@/app/store";
import LoginForm from "./LoginForm";
import Register from "./RegisterForm";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "./ui/button";
import { Toggle } from "./ui/toggle";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export default function Header() {
  const email = useStore((state) => state.email);
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const { setTheme } = useTheme();
  return (
    <header className="flex items-center justify-between p-2 px-5">
      <div>
        <Link href="/">
          <h1 className="font-extrabold text-2xl">
            IJKL<span className="text-red-900">.</span>
          </h1>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-3">
        {!isLoggedIn ? (
          <div className="flex gap-4">
            <Register />
            <LoginForm />
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              {/* <Button variant="link" > */}
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{email?.charAt(0)}</AvatarFallback>
              </Avatar>
              {/* </Button> */}
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
