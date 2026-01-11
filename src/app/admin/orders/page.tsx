import { prisma } from '@/lib/prisma'
import { updateOrderStatus } from '@/actions/orders'

export default async function AdminOrdersPage() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Order Management</h1>

            <div className="rounded-md border">
                <table className="w-full text-sm">
                    <thead className="border-b bg-muted/50">
                        <tr>
                            <th className="h-12 px-4 text-left align-middle font-medium">Order ID</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Customer</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Contact</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                            <th className="h-12 px-4 text-right align-middle font-medium">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} className="border-b hover:bg-muted/50">
                                <td className="p-4 font-mono">#{order.id.slice(0, 8)}</td>
                                <td className="p-4">{order.customerName}</td>
                                <td className="p-4 text-right">{Number(order.totalAmount).toFixed(2)} MAD</td>
                                <td className="p-4">
                                    <form action={updateOrderStatus} className="flex gap-2 justify-end">
                                        <input type="hidden" name="orderId" value={order.id} />
                                        <select
                                            name="status"
                                            defaultValue={order.status}
                                            className="h-8 rounded-md border text-xs"
                                        >
                                            <option value="PENDING">PENDING</option>
                                            <option value="PROCESSING">PROCESSING</option>
                                            <option value="SHIPPED">SHIPPED</option>
                                            <option value="DELIVERED">DELIVERED</option>
                                            <option value="CANCELLED">CANCELLED</option>
                                        </select>
                                        <button className="h-8 px-2 bg-primary text-primary-foreground rounded-md text-xs">
                                            Update
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
