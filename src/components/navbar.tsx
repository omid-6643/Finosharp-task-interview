"use client"; // for nextjs 13.4 users
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";
import { Toggle } from "./ui/toggle";

const Navbar = ({
  value,
  onChangeValue,
}: {
  value: boolean;
  onChangeValue: (value: boolean) => void;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { href: "#", label: "Markets" },
    { href: "#", label: "Trade" },
    { href: "#", label: "Derivatives" },
    { href: "#", label: "More" },
  ];
  return (
    <>
      <header
        className={cn(
          "sm:px-8 px-4 py-3 z-10 w-full sticky top-0  border-0 border-b border-solid border-gray-400",
          {
            "bg-black text-white border-gray-600": value,
          }
        )}
      >
        <nav className="flex justify-between items-center max-container">
          <div className="flex flex-row gap-16 items-center">
            <a href="/">
              <img src="/logo.png" alt="logo" className="w-24" />
            </a>
            <ul className="flex-1 flex justify-center items-center gap-8 max-lg:hidden">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-montserrat leading-normal text-lg text-slate-gray"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-6 items-center text-lg leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24">
            <a href="/">Register</a>
            <a href="/">Login</a>

            <Toggle
              aria-label="Toggle theme"
              variant={"default"}
              onPressedChange={(e) => onChangeValue(e.valueOf())}
              className="hover:bg-inherit selection:bg-inherit"
            >
              {!value ? (
                <Moon className="size-4" />
              ) : (
                <Sun className="size-4" />
              )}
            </Toggle>
          </div>
          <div
            className="hidden max-lg:block cursor-pointer"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <Menu className="text-4xl" />
          </div>
        </nav>
      </header>
      {isMenuOpen && (
        <div>
          <nav className="fixed top-0 right-0 left-0 bottom-0 lg:bottom-auto bg-slate-100 z-50">
            <div
              className="hidden max-lg:block fixed right-0  px-8 py-4 cursor-pointer"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              <X className="text-4xl" />
            </div>
            <ul className=" lg:hidden flex flex-col items-center justify-center h-full ">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-montserrat leading-normal text-lg text-slate-gray"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};
export default Navbar;
