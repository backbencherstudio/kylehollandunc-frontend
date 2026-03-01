'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
    Bell,
    ChevronDown,
    LayoutDashboard,
    Users,
    FileText,
    ShoppingCart,
    MessageSquare,
    ClipboardList,
    Settings,
    LogOut,
    Menu,
    X,
    HelpCircle,
    AlertCircle
} from 'lucide-react'

import { useCallback } from "react";


import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { cn } from '@/lib/utils'
import ReusableModal from '../reusable/CustomModal'
import LogoutModal from './LogoutModal'
import { useAppDispatch } from '@/redux/hooks'
import { logout } from '@/redux/features/auth/authSlice'
import { removeStorageItem } from '@/utils/storage'
import Image from 'next/image'
/* ================= Layout ================= */

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <div className="flex h-screen overflow-hidden bg-[#F5F6F8]">

        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
            <Sidebar />
        </div>
    
        {/* Mobile Sidebar */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetContent side="left" className="p-0 w-[280px]">
                <Sidebar isMobile onClose={() => setIsMobileMenuOpen(false)} />
            </SheetContent>
        </Sheet>
    
        {/* Right Section */}
        <div className="flex-1 min-w-0 bg-[#FAFAFA] flex flex-col overflow-hidden">
    
            {/* Topbar (now truly fixed) */}
            <Topbar onMenuClick={() => setIsMobileMenuOpen(true)} />
    
            {/* Scrollable Content Only */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 max-w-[1680px] mx-auto w-full">
                {children}
            </main>
    
        </div>
    </div>
    )
}

/* ================= Sidebar ================= */

interface SidebarProps {
    isMobile?: boolean
    onClose?: () => void
}



const menuItems = {
    top: [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/admin-dashboard' },
        { label: 'User Management', icon: Users, href: '/admin-dashboard/user-management' },
        { label: 'Request Forms', icon: FileText, href: '/admin-dashboard/request-forms' },
        { label: 'Orders', icon: ShoppingCart, href: '/admin-dashboard/orders' },
        { label: 'Contact Forms', icon: MessageSquare, href: '/admin-dashboard/contact-forms' },
        { label: 'Report Entry', icon: ClipboardList, href: '/admin-dashboard/report-entry' },

    ],
    bottom: [
        { label: 'Settings', icon: Settings, href: '/admin-dashboard/settings' },
        // { label: 'Help & Support', icon: HelpCircle, href: '/admin-dashboard/help-support' },

    ]
};





function Sidebar({ isMobile, onClose }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [logoutOpen, setLogoutOpen] = useState(false);

    // ✅ Memoized logout handler
    const handleLogout = useCallback(() => {
        removeStorageItem("token");
        removeStorageItem("user");
        dispatch(logout());
        setLogoutOpen(false);
        router.push("/");
    }, [dispatch, router]);

    // ✅ Memoized link click
    const handleLinkClick = useCallback(() => {
        if (isMobile && onClose) {
            onClose();
        }
    }, [isMobile, onClose]);

    // ✅ Production-grade active matcher
    const isActive = useCallback(
        (href: string) => {
            if (href === "/admin-dashboard") {
                return pathname === href;
            }
            return pathname === href || pathname.startsWith(`${href}/`);
        },
        [pathname]
    );

    return (
        <aside className="w-full lg:w-[260px] h-screen bg-white border-r flex flex-col">

            {/* ================= SCROLLABLE AREA ================= */}
            <div className="flex-1 overflow-y-auto">

                {/* Logo */}
                <div className="px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="w-[200px] h-[57px] relative">
                        <Image
                            src="/images/dashboard-logo.png"
                            alt="logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </Link>

                    {isMobile && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="lg:hidden"
                        >
                            {/* Close icon here */}
                        </Button>
                    )}
                </div>

                {/* User Card */}
                <div className="px-4">
                    <div className="flex items-center gap-3 border bg-white px-3 py-3 rounded-[10px] border-[#F1F1F5]">
                        <Avatar className="h-10 w-10 shrink-0">
                            <AvatarImage src="/user-profile.webp" />
                            <AvatarFallback>AU</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-[#161618] text-base font-medium">
                                Admin User
                            </p>
                            <p className="truncate text-[#5B5A64] text-xs">
                                admin@portal.com
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Menu */}
                <div className="px-4 mt-6">
                    <p className="text-[#5B5A64] text-xs font-medium mb-2">
                        Main Menu
                    </p>

                    <nav className="space-y-2">
                        {menuItems.top.map((item) => (
                            <Link
                                key={item.href} // ✅ stable key
                                href={item.href}
                                onClick={handleLinkClick}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-[7px] text-sm font-medium transition-all",
                                    isActive(item.href)
                                        ? "bg-gradient-to-b from-[#84B6DE] to-[#1C5E96] text-white"
                                        : "text-[#5B5A64] hover:bg-gray-100"
                                )}
                            >
                                <item.icon className="w-4 h-4 shrink-0" />
                                <span className="truncate">
                                    {item.label}
                                </span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* ================= FIXED BOTTOM ================= */}
            <div className="px-4 py-4 border-t bg-white">

                <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">
                    Other
                </p>

                <div className="space-y-2">
                    {menuItems.bottom.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={handleLinkClick}
                            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                        >
                            <item.icon className="w-4 h-4 shrink-0" />
                            <span className="truncate">
                                {item.label}
                            </span>
                        </Link>
                    ))}

                    <button
                        onClick={() => setLogoutOpen(true)}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-red-500 rounded-md w-full transition-colors"
                    >
                        <LogOut className="w-4 h-4 shrink-0" />
                        <span className="truncate">Logout</span>
                    </button>
                </div>
            </div>

            {/* ================= MODAL ================= */}
            <ReusableModal
                open={logoutOpen}
                onOpenChange={setLogoutOpen}
                className="w-[500px] p-12"
                hideCloseButton
            >
                <LogoutModal
                    setLogoutOpen={setLogoutOpen}
                    handleLogout={handleLogout}
                />
            </ReusableModal>
        </aside>
    );
}


/* ================= Topbar ================= */

interface TopbarProps {
    onMenuClick: () => void
}

function Topbar({ onMenuClick }: TopbarProps) {
    return (
        <header className="h-[72px] bg-white border-b px-4 md:px-8 flex items-center justify-between sticky top-0 z-10">
            {/* Left */}
            <div className="flex items-center gap-3 min-w-0">
                {/* Mobile menu button */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onMenuClick}
                    className="lg:hidden shrink-0"
                >
                    <Menu className="h-5 w-5" />
                </Button>

                <div className="min-w-0">
                    <h2 className="text-lg font-semibold truncate">Dashboard</h2>
                    <p className="text-sm text-muted-foreground hidden sm:block truncate">
                        Welcome back! Here's what's happening today.
                    </p>
                    <p className="text-sm text-muted-foreground sm:hidden truncate">
                        Welcome back!
                    </p>
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 md:gap-4 shrink-0">
                <Button variant="ghost" size="icon" className="shrink-0">
                    <Bell className="w-5 h-5 text-gray-600" />
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2 px-2 md:px-3">
                            <Avatar className="h-8 w-8 shrink-0">
                                <AvatarImage src="/user-profile.webp" />
                                <AvatarFallback>AU</AvatarFallback>
                            </Avatar>
                            <ChevronDown className="w-4 h-4 text-gray-600 hidden sm:block" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500">
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}