"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import CartIcon from "./icons/CartIcon";

const Navbar = () => {
    return (
        <header className="absolute top-0 left-0 w-full z-50">
            <div className="max-w-[1320px] mx-auto px-4 md:px-0  flex items-center justify-between text-white">

                {/* Logo */}
                <div className="w-40 h-15 relative ">
                    <Image src="/images/site-logo.png" alt="Logo" fill className="w-full h-full object-contain object-center" />
                </div>

                {/* Center Links */}
                <nav className="hidden md:flex items-center gap-8 md:text-lg text-sm py-6">
                    <Link href="/">Home</Link>
                    <Link href="/services">Our services</Link>
                    <Link href="/about">About us</Link>
                    <Link href="/verify">Verify</Link>
                </nav>

                {/* Right Side */}
                <div className="flex items-end gap-6">
                    {/* shopping cart */}
                    <div className=" relative">
                        <CartIcon width={24} height={24} />
                        <span className="text-xs flex w-4 h-4 flex-col justify-center items-center [background:var(--White,#FFF)] rounded-[9.999999778196308e+22px] text-[#171717] absolute top-[-12px] right-[-12px]">0</span>
                    </div>
                    {/* sign up */}
                    <Link
                        href="/contact"
                        className="px-5 py-2 rounded-full border border-white/50 hover:bg-white/10 transition"
                    >
                        <span className="text-[#FFFFFF] font-medium leading-[150%] tracking-[0.09px]">Sign Up</span>
                    </Link>
                </div>

            </div>
        </header>
    );
};

export default Navbar;
