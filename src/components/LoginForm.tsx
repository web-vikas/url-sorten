"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { userLogin } from "@/app/action";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import useStore from "@/app/store";
import { LockClosedIcon } from "@radix-ui/react-icons";

const LoginForm = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState(String);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState(String);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome Back !</DialogTitle>
          <DialogDescription>
            Please enter credentials to login.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={async (e) => {
            setIsLoading(true);
            e.preventDefault();
            const res = await userLogin({ email, password, phone: "" });
            if (res.data.error) {
              toast({
                title: "Uh oh! Something went wrong.",
                description: res.data.error,
                variant: "destructive",
              });
            } else {
              toast({
                title: "Login Success",
                description: `Hello ${res.data.email}`,
              });
              useStore.setState({
                email: res.data.email,
                isLoggedIn: true,
                access_token: res.data.access_token,
              });
            }
            setIsLoading(false);
          }}
        >
          <div className="mb-3">
            <Label htmlFor="email">
              Email <span className="text-red-700 font-extrabold">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="my-2"
              placeholder="email@gmail.com"
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="password">
              Password <span className="text-red-700 font-extrabold">*</span>
            </Label>
            <Input
              id="password"
              type="password"
              className="my-2"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="**********"
            />
          </div>
          <div>
            <Button disabled={isLoading}>
              <LockClosedIcon className="mr-2"/>
              {isLoading ? "Logging In..." : "Login"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginForm;
