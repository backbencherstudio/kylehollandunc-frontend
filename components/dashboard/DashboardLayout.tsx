'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
    HelpCircle
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { cn } from '@/lib/utils'

/* ================= Layout ================= */

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <div className="flex min-h-screen bg-[#F5F6F8]">
            {/* Desktop Sidebar - hidden on mobile */}
            <div className="hidden lg:block">
                <Sidebar />
            </div>

            {/* Mobile Sidebar (Sheet) */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetContent side="left" className="p-0 w-[280px]">
                    <Sidebar isMobile onClose={() => setIsMobileMenuOpen(false)} />
                </SheetContent>
            </Sheet>

            <div className=" flex-1  bg-[#FAFAFA]">
                <Topbar onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1 p-4 md:p-6 overflow-auto max-w-[1680px] mx-auto ">
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
        { label: 'Help & Support', icon: HelpCircle, href: '/admin-dashboard/help-support' },

    ]
};

function Sidebar({ isMobile, onClose }: SidebarProps) {
    const pathname = usePathname()


    const handleLinkClick = () => {
        if (isMobile && onClose) {
            onClose()
        }
    }

    return (
        <aside className="w-full lg:w-[260px] h-full bg-white border-r flex flex-col justify-between">
            {/* Top Section */}
            <div>
                {/* Logo with close button for mobile */}
                <div className="px-4 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-semibold tracking-tight">
                            LAKE NORMAN LABS
                        </h1>
                        <p className="text-xs text-muted-foreground">
                            Verified in the Carolinas.
                        </p>
                    </div>
                    {isMobile && (
                        <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
                            {/* <X className="h-5 w-5" /> */}
                        </Button>
                    )}
                </div>

                {/* User Card */}
                <div className="px-4">
                    <div className="flex items-center gap-2 self-stretch border [background:#FFF] pl-2.5 pr-3 py-3 rounded-[10px] border-solid border-[#F1F1F5]">
                        <Avatar className="h-10 w-10 shrink-0">
                            <AvatarImage src="/user-profile.webp" />
                            <AvatarFallback>AU</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                            <p className="[display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] overflow-hidden text-[#161618] text-ellipsis  text-base font-medium leading-[150%] tracking-[-0.32px] mb-[2px]">Admin User</p>
                            <p className="[display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] self-stretch overflow-hidden text-[#5B5A64] text-ellipsis  text-xs font-normal leading-[150%] tracking-[-0.24px]">
                                admin@portal.com
                            </p>
                        </div>
                    </div>
                </div>

                {/* Menu */}
                <div className="px-4 mt-6 ">
                    <p className="flex   flex-col justify-center text-[#5B5A64] text-xs font-medium leading-[150%] tracking-[-0.24px] mb-2">
                        Main Menu
                    </p>

                    <nav className="space-y-2">
                        {menuItems.top.map((item, i) => (
                            <Link
                                key={i}
                                href={item.href}
                                onClick={handleLinkClick}
                                className={cn(
                                    'flex items-center gap-3 px-2.5 py-1.5  transition-all text-white text-sm font-medium leading-[150%] tracking-[-0.28px] self-stretch  rounded-[7px]',
                                    item.href === pathname
                                        ? ' [background:var(--gradient,linear-gradient(0deg,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.20)_100%),linear-gradient(180deg,#84B6DE_0%,#1C5E96_100%))] text-white'
                                        : 'text-[#5B5A64] hover:bg-gray-100'
                                )}
                            >
                                <item.icon className="w-4 h-4 shrink-0" />
                                <span className="truncate">{item.label}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="px-4 pb-4">
                <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">
                    Other
                </p>

                <div className="space-y-2">
                    {

                        menuItems.bottom.map((item, i) => (
                            <Link
                                key={i}
                                href={item.href}
                                onClick={handleLinkClick}
                                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md w-full"
                            >
                                <item.icon className="w-4 h-4 shrink-0" />
                                <span className="truncate">{item.label}</span>
                            </Link>
                        ))
                    }
                    <button
                        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-red-500 rounded-md w-full cursor-pointer"
                        onClick={handleLinkClick}
                    >
                        <LogOut className="w-4 h-4 shrink-0" />
                        <span className="truncate">Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    )
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