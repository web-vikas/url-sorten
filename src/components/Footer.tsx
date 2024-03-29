import Link from "next/link";
import {
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
export default function Footer() {
  return (
    <footer className="mt-5">
      <div className="flex justify-center items-center">
        <ul className="flex gap-5 mt-5">
          <Link href="https://twitter.com/ichanddan" target="_blank">
            <li className=" rounded-xl">
              <TwitterLogoIcon />
            </li>
          </Link>
          <Link href="https://instagram.com/ichanddan" target="_blank">
            <li>
              <InstagramLogoIcon />
            </li>
          </Link>
          <Link href="https://www.linkedin.com/in/web-vikas/" target="_blank">
            <li>
              <LinkedInLogoIcon />
            </li>
          </Link>
        </ul>
      </div>
      <div className=" flex justify-center items-center text-center mt-4">
        <ul className="sm:flex gap-5 inline-block  ">
          <Link href="/">
            <li>Home</li>
          </Link>
          <Link href="#">
            <li>Sign Up</li>
          </Link>
          <Link href="#">
            <li>Login</li>
          </Link>
          <Link href="#">
            <li>F&Q</li>
          </Link>
        </ul>
      </div>
      <div className="copyright text-center mt-5">
        <p className="p-2">Copyright © 2024 | IJKL. All rights reserved.</p>
      </div>
    </footer>
  );
}
