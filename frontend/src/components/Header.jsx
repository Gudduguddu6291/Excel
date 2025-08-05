import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {SignIn,SignUp,SignedIn,SignedOut,SignInButton, UserButton,} from "@clerk/clerk-react";
import {NavigationMenu,NavigationMenuList,NavigationMenuItem,navigationMenuTriggerStyle,} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";


function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const drawerRef = useRef();

  // Close drawer if click outside it
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        mobileMenuOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <header className=" top-0 z-50 w-full bg-background/30 backdrop-blur-sm">
      <motion.div
        className="flex items-center justify-between px-4 py-2 md:py-1 w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 flex items-center">
          <motion.img
            src="/generated-image (1).png"
            alt="Logo"
            className="h-20 w-auto"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-4">
              <NavigationMenuItem>
                <Link to="/" className={navigationMenuTriggerStyle()}>
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/dashboard" className={navigationMenuTriggerStyle()}>
                  Dashboard
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="" className={navigationMenuTriggerStyle()}>
                  About Us
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <SignedOut>
            <SignInButton navigate="/dashboard">
              <span className={buttonVariants() + " text-sm"}>Sign In</span>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile: Profile Icon BESIDE Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <SignedIn navigate="/dashboard">
            <UserButton />
          </SignedIn>
          <button
            className="p-2"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            ref={drawerRef}
            className="md:hidden bg-background/90 backdrop-blur-md fixed inset-0 z-50 flex flex-col gap-8 pt-24 px-4"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0.2 }}
            onClick={(e) => e.stopPropagation()} // Stop clicks inside drawer from bubbling
          >
            <nav className="flex flex-col items-center gap-6">
              <Link
                to="/"
                className={navigationMenuTriggerStyle() + " text-lg"}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/dashboard/:id"
                className={navigationMenuTriggerStyle() + " text-lg"}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/about"
                className={navigationMenuTriggerStyle() + " text-lg"}
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <div className="flex flex-col gap-2 w-full items-center">
                <SignedOut>
                  <SignInButton redirectUrl="/sign-in">
                    <span className={buttonVariants() + " w-full text-center"}>
                      Sign In
                    </span>
                  </SignInButton>
                </SignedOut>
                {/* UserButton removed here per your previous request */}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;