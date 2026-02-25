"use client";

import Link from "next/link";
import Image from "next/image";
import CartIcon from "./icons/CartIcon";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAppSelector , useAppDispatch} from "@/redux/hooks";
import { logout, selectCurrentUser, selectIsLoading } from "@/redux/features/auth/authSlice";
import { removeStorageItem } from "@/utils/storage";

const Navbar = () => {
    const pathname = usePathname();
    const isHome = pathname === '/';
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
   const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectIsLoading);
    const user = useAppSelector(selectCurrentUser);

    console.log(isLoading, user);
    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 50) {
            setScrolled(true);
          } else {
            setScrolled(false);
          }
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const navLinks = [
        { label: 'Home', href: '/' },
        { label: 'Our services', href: '/services' },
        { label: 'About us', href: '/about-us' },
        { label: 'COA', href: '/coa-doc' },
        { label: 'Verify', href: '/verify-report' },
        { label: 'Order', href: '/order' },
    ];

    const isActive = (href: string) => pathname === href;

    const handleLogout = () => {

        dispatch(logout());
    }   

    return (
        <>
       <header
  className={`fixed top-0 left-0 w-full z-99 transition-all duration-300 ${
    scrolled
      ? "bg-[#023347] shadow-md"
      : isHome
      ? "bg-transparent"
      : "bg-[#023347]"
  }`}
>

                <div className="max-w-[1320px] mx-auto px-4 md:px-0 flex items-center justify-between text-white py-2.5">

                    {/* Logo */}
                    <div className="w-40 h-15 relative">
                        <Link href="/">
                            <Image
                                src="/images/site-logo.png"
                                alt="Logo"
                                fill
                                className="w-full h-full object-contain object-center"
                            />
                        </Link>
                    </div>

                    {/* Center Links — desktop only */}
                    <nav className="hidden md:flex items-center gap-8 md:text-lg text-sm py-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`${isActive(link.href) ? 'underline underline-offset-4 font-medium' : ''} leading-[150%] tracking-[0.09px]`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side */}
                    <div className="flex items-center gap-4 md:gap-6">
                        {/* Shopping Cart */}
                        <div className="relative">
                            <CartIcon width={24} height={24} />
                            <span className="text-xs flex w-4 h-4 flex-col justify-center items-center [background:var(--White,#FFF)] rounded-[9.999999778196308e+22px] text-[#171717] absolute top-[-12px] right-[-12px]">
                                0
                            </span>
                        </div>

                        {/* Sign Up — desktop only */}
                     {
                        !isLoading && !user ? (
                            <Link
                                href="/register"
                                className="hidden md:inline-flex px-5 py-2 rounded-full border border-white/50 hover:bg-white/10 transition"
                            >
                                <span className="text-[#FFFFFF] font-medium leading-[150%] tracking-[0.09px]">Sign Up</span>
                            </Link>
                        ) : (
                            <button onClick={handleLogout} className="hidden md:inline-flex px-5 py-2 rounded-full border border-white/50 hover:bg-white/10 transition">
                                <span className="text-[#FFFFFF] font-medium leading-[150%] tracking-[0.09px]">Log out</span>
                            </button>
                        )
                     }

                        {/* Hamburger — mobile only */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={menuOpen}
                            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] focus:outline-none"
                        >
                            {/* Top bar */}
                            <span
                                className={`block h-[2px] w-6 bg-white rounded-full origin-center transition-all duration-300 ease-in-out ${
                                    menuOpen ? 'translate-y-[7px] rotate-45' : ''
                                }`}
                            />
                            {/* Middle bar */}
                            <span
                                className={`block h-[2px] w-6 bg-white rounded-full transition-all duration-300 ease-in-out ${
                                    menuOpen ? 'opacity-0 scale-x-0' : ''
                                }`}
                            />
                            {/* Bottom bar */}
                            <span
                                className={`block h-[2px] w-6 bg-white rounded-full origin-center transition-all duration-300 ease-in-out ${
                                    menuOpen ? '-translate-y-[7px] -rotate-45' : ''
                                }`}
                            />
                        </button>
                    </div>

                </div>
            </header>

            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 z-60 md:hidden transition-all duration-300 ease-in-out ${
                    menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setMenuOpen(false)}
                aria-hidden="true"
            >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            </div>

            {/* Mobile Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-72 max-w-[85vw] z-80 md:hidden bg-[#023347] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
                    menuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                aria-hidden={!menuOpen}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <div className="w-32 h-12 relative">
                        <Image
                            src="/images/site-logo.png"
                            alt="Logo"
                            fill
                            className="w-full h-full object-contain object-left"
                        />
                    </div>
                    <button
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close menu"
                        className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition"
                    >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* Drawer Nav Links */}
                <nav className="flex flex-col px-6 py-6 gap-1 flex-1">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className={`flex items-center text-white text-base py-3 px-2 rounded-lg leading-[150%] tracking-[0.09px] transition-all duration-200
                                ${isActive(link.href)
                                    ? 'font-medium bg-white/10 underline underline-offset-4'
                                    : 'hover:bg-white/5'
                                }
                                ${menuOpen
                                    ? 'translate-x-0 opacity-100'
                                    : 'translate-x-4 opacity-0'
                                }
                            `}
                            style={{
                                transitionDelay: menuOpen ? `${index * 50 + 100}ms` : '0ms',
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Drawer Footer — Sign Up */}
                <div
                    className={`px-6 py-6 border-t border-white/10 transition-all duration-300 ${
                        menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: menuOpen ? '350ms' : '0ms' }}
                >
                    <Link
                        href="/register"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-center w-full px-5 py-2.5 rounded-full border border-white/50 hover:bg-white/10 transition"
                    >
                        <span className="text-[#FFFFFF] font-medium leading-[150%] tracking-[0.09px]">Sign Up</span>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Navbar;