import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card' // Assume mock or install shadcn card?
// I'll use basic styling to avoid dependency issues if I didn't install shadcn components.
// "Use Custom CSS or Tailwind".

export default async function AdminDashboard() {
    const productCount = await prisma.product.count()
    const orderCount = await prisma.order.count()
    // Mock revenue calculation (sum of totalAmount)
    const revenueAgg = await prisma.order.aggregate({
        _sum: { totalAmount: true }
    })
    const revenue = Number(revenueAgg._sum.totalAmount || 0)

    const recentOrders = await prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { items: true }
    })

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <div className="p-6 rounded-xl border bg-card shadow-sm">
                    <div className="text-sm font-medium text-muted-foreground mb-2">Total Revenue</div>
                    <div className="text-2xl font-bold">{revenue.toFixed(2)} MAD</div>
                </div>
                <div className="p-6 rounded-xl border bg-card shadow-sm relative">
                    <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Orders</h3>
                    <div className="text-2xl font-bold">{orderCount}</div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Products</h3>
                    <div className="text-2xl font-bold">{productCount}</div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="rounded-xl border bg-card text-card-foreground shadow">
                <div className="p-6 pb-2">
                    <h3 className="font-semibold leading-none tracking-tight">Recent Orders</h3>
                </div>
                <div className="p-6">
                    <div className="w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm text-left">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Date</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Customer</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {recentOrders.map(order => (
                                    <tr key={order.id} className="border-b transition-colors hover:bg-muted/50">
                                        <td className="p-4 align-middle">{order.createdAt.toLocaleDateString()}</td>
                                        <td className="p-4 align-middle">{order.customerName}</td>
                                        <td className="p-4 align-middle">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-4 align-middle text-right">${Number(order.totalAmount).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
