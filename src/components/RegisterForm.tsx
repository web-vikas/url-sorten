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
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { userRegister } from "@/app/action";
import useStore from "@/app/store";
import { EnterIcon, PlusCircledIcon, PlusIcon } from "@radix-ui/react-icons";

const Register = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);
  const [phone, setPhone] = useState(String);
  const [confirmPassword, setConfirmPassword] = useState(String);
  const [isLoading, setIsLoading] = useState(false);

  const handelSubmit = async () => {
    setIsLoading(true);
    if (confirmPassword !== password) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Password do not match",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    const res = await userRegister({ email, password, phone });
    if (res.data.error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: res.data.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Register Success",
        description: `Hello ${res.data.email}`,
      });
      useStore.setState({
        email: res.data.email,
        isLoggedIn: true,
        access_token: res.data.access_token,
      });
    }
    setIsLoading(false);
  };
  return (
    <Dialog>
      <DialogTrigger>Sign Up</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register Here</DialogTitle>
          <DialogDescription>
            Please Enter Your Details For Register !
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label htmlFor="email">
            Email <span className="text-red-700 font-extrabold">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@gmail.com"
          />
        </div>
        <div>
          <Label htmlFor="phone">
            Phone <span className="text-red-700 font-extrabold">*</span>
          </Label>
          <Input
            id="phone"
            type="phone"
            required
            placeholder="9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="password">
            Password <span className="text-red-700 font-extrabold">*</span>
          </Label>
          <Input
            id="password"
            type="password"
            required
            placeholder="**********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="cPassword">
            Confirm Password
            <span className="text-red-700 font-extrabold">*</span>
          </Label>
          <Input
            id="cPassword"
            type="password"
            required
            placeholder="**********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <Button onClick={handelSubmit} disabled={isLoading}>
            <PlusCircledIcon className="mr-2" />
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Register;
