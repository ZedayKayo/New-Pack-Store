import Link from 'next/link'
import { LayoutDashboard, Package, ShoppingBag, LogOut, Tags, Settings } from 'lucide-react'
// Logout component logic will be client side or form action
import { logout } from '@/actions/auth'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-muted/40">
            {/* Sidebar */}
            <aside className="hidden w-64 flex-col border-r bg-background md:flex">
                <div className="flex h-14 items-center border-b px-6 font-bold text-lg">
                    Bard Admin
                </div>
                <nav className="flex-1 space-y-1 p-4">
                    <Link href="/admin" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted transition-colors">
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </Link>
                    <Link href="/admin/products" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted transition-colors">
                        <Package className="h-4 w-4" />
                        Products
                    </Link>
                    <Link href="/admin/orders" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted transition-colors">
                        <ShoppingBag className="h-4 w-4" />
                        Orders
                    </Link>
                    <Link href="/admin/categories" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted transition-colors">
                        <Tags className="h-4 w-4" />
                        Categories
                    </Link>
                    <Link href="/admin/settings" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted transition-colors">
                        <Settings className="h-4 w-4" />
                        Settings
                    </Link>
                </nav>
                <div className="border-t p-4">
                    <form action={logout}>
                        <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </form>
                </div>
            </aside>

            {/* Mobile Sidebar (omitted due to complexity limit, but could be added) */}

            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    )
}
