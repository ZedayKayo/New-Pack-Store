'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const items = useCartStore((state) => state.items)
    const [mounted, setMounted] = useState(false)

    // Hydration fix for zustand persist
    useEffect(() => {
        setMounted(true)
    }, [])

    const itemCount = mounted ? items.reduce((acc, item) => acc + item.quantity, 0) : 0

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold tracking-tight text-primary">New Pack</span>
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                        Home
                    </Link>
                    <Link href="/shop" className="text-sm font-medium transition-colors hover:text-primary">
                        Products
                    </Link>
                    <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
                        About
                    </Link>
                    <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
                        Contact
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/cart" className="relative group">
                        <div className="p-2 rounded-full hover:bg-muted transition-colors">
                            <ShoppingCart className="h-5 w-5 text-foreground" />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in">
                                    {itemCount}
                                </span>
                            )}
                        </div>
                    </Link>

                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t p-4 space-y-4 bg-background animate-in slide-in-from-top-5">
                    <Link href="/" onClick={() => setIsOpen(false)} className="block text-sm font-medium">
                        Home
                    </Link>
                    <Link href="/shop" onClick={() => setIsOpen(false)} className="block text-sm font-medium">
                        Shop
                    </Link>
                </div>
            )}
        </nav>
    )
}
