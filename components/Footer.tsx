"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import TiktokIcon from "./icons/TiktokIcon";
import InstagramIcon from "./icons/InstagramIcon";
import FacebookIcon from "./icons/FacebookIcon";

export default function Footer() {
    return (
        <footer className="max-w-[1320px] mx-auto px-6 md:px-8 lg:px-0 pb-8 pt-4">

            {/* Top Section */}
            <div className="w-full flex flex-col lg:flex-row justify-between gap-12 lg:gap-0">

                {/* Left Column */}
                <div className="w-full lg:max-w-[445px]">

                    <Image
                        src="/images/footer-logo.png"
                        alt="Lake Norman Labs"
                        width={200}
                        height={60}
                        quality={100}
                    />

                    <p className="text-[#777980] text-base md:text-lg font-normal leading-[150%] tracking-[0.09px] mt-4">
                        At Lake Norman Labs, your confidence and accurate testing
                        results are our top priority. We believe lab testing should
                        be smooth, reliable.
                    </p>

                    <div className="mt-8 flex gap-[22px]">
                        <SocialIcon href="https://www.instagram.com/lakenormanlabs">
                            <InstagramIcon width={22} height={22} />
                        </SocialIcon>
                        <SocialIcon>
                            <FacebookIcon width={22} height={22} />
                        </SocialIcon>
                        <SocialIcon href="https://www.tiktok.com/@lakenormanlabs">
                            <TiktokIcon width={24} height={24} />
                        </SocialIcon>
                    </div>
                </div>

                {/* Right Columns */}
                <div className="w-full lg:max-w-[588px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12">

                    <FooterColumn title="Quick Links">
                        <FooterLink href="/">Home</FooterLink>
                        <FooterLink href="/about-us">About Us</FooterLink>
                        <FooterLink href="/#contact-us">Contact Us</FooterLink>
                        <FooterLink href="/verify-report">Verify</FooterLink>
                    </FooterColumn>

                    <FooterColumn title="Help">
                        <FooterLink href="#">Customer support</FooterLink>
                        <FooterLink href="#">Terms & Conditions</FooterLink>
                        <FooterLink href="#">Privacy Policy</FooterLink>
                    </FooterColumn>

                    <FooterColumn title="Contact Us">
                        <div className="flex flex-col gap-2">
                            <p className="text-[#1D1F2C] text-base font-normal leading-[150%] tracking-[0.08px]">
                                Email
                            </p>
                            <p className="text-[#1D1F2C] text-base font-medium leading-[150%] tracking-[0.08px] ">
                                peptides@lakenormanlabs.com
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 mt-4">
                            <p className="text-[#1D1F2C] text-base font-normal leading-[150%] tracking-[0.08px]">
                                Phone no
                            </p>
                            <p className="text-[#1D1F2C] text-base font-medium leading-[150%] tracking-[0.08px]">
                                704-314-5732
                            </p>
                        </div>
                    </FooterColumn>

                </div>

            </div>

            {/* Divider */}
            <div className="border-t border-[#E5E7EB] mt-12 pt-6 text-[#1D1F2C] text-center text-sm md:text-base font-normal leading-[150%] tracking-[0.08px]">
                2026 Lake Norman Labs. All right reserved
            </div>

        </footer>
    );
}


/* ================= Sub Components ================= */

function FooterColumn({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-4">
            <h4 className="text-[#1D1F2C] text-base md:text-lg font-medium leading-[150%] tracking-[0.09px]">
                {title}
            </h4>
            <div className="flex flex-col gap-3 text-[#1D1F2C] leading-[150%] tracking-[0.08px]">
                {children}
            </div>
        </div>
    );
}

function FooterLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <a href={href} scroll={false} className="hover:font-medium transition duration-200">
            {children}
        </a>
    );
}


// const FooterLink2: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     return (
//       <a href="/#contact-us" className="hover:font-medium transition duration-200">
//         {children}
//       </a>
//     );
//   };
  

function SocialIcon({ href="#", children }: { href?: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] rounded-full border border-[#E5E7EB] flex items-center justify-center hover:bg-white transition cursor-pointer">
            {children}
        </Link>
    );
}
