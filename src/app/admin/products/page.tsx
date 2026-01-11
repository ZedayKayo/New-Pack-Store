import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Edit, Trash2, Copy } from 'lucide-react'
import { getProductImage } from '@/lib/utils'
// Trash2 requires client component for action? Or form action.
// I'll use a form with Server Action for delete.

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        include: { category: true },
        orderBy: { createdAt: 'desc' } // Order by newest first
    })

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Products</h1>
                <Link href="/admin/products/new" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 shadow-sm transition-all hover:shadow-md">
                    <Plus className="w-4 h-4" /> Add New
                </Link>
            </div>

            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="border-b bg-muted/30">
                        <tr>
                            <th className="h-12 px-4 text-left align-middle font-semibold text-muted-foreground w-[80px]">Image</th>
                            <th className="h-12 px-4 text-left align-middle font-semibold text-muted-foreground">Name</th>
                            <th className="h-12 px-4 text-left align-middle font-semibold text-muted-foreground">Category</th>
                            <th className="h-12 px-4 text-left align-middle font-semibold text-muted-foreground">Status</th>
                            <th className="h-12 px-4 text-right align-middle font-semibold text-muted-foreground">Price</th>
                            <th className="h-12 px-4 text-right align-middle font-semibold text-muted-foreground">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => {
                            const mainImage = getProductImage(product.images);
                            return (
                                <tr key={product.id} className="border-b hover:bg-muted/50 transition-colors">
                                    <td className="p-4">
                                        <div className="w-10 h-10 rounded overflow-hidden bg-secondary border">
                                            {mainImage && <img src={mainImage} alt="" className="w-full h-full object-cover" />}
                                        </div>
                                    </td>
                                    <td className="p-4 font-medium max-w-[200px] truncate">{product.name}</td>
                                    <td className="p-4 text-muted-foreground">{product.category.name}</td>
                                    <td className="p-4">
                                        <form action={async () => {
                                            'use server'
                                            const { toggleProductStatus } = await import('@/actions/admin')
                                            await toggleProductStatus(product.id, product.status)
                                        }}>
                                            <button className={`px-2 py-1 rounded-full text-xs font-bold border transition-all ${product.status === 'ACTIVE' ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200'}`}>
                                                {product.status}
                                            </button>
                                        </form>
                                    </td>
                                    <td className="p-4 text-right font-mono">{Number(product.price).toFixed(2)} MAD</td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-1">
                                            <form action={async () => {
                                                'use server'
                                                const { duplicateProduct } = await import('@/actions/admin')
                                                await duplicateProduct(product.id)
                                            }}>
                                                <button title="Duplicate" className="p-2 hover:bg-primary/10 text-primary rounded-md transition-colors">
                                                    <Copy className="w-4 h-4" />
                                                </button>
                                            </form>
                                            <Link href={`/admin/products/${product.id}`} className="p-2 hover:bg-muted rounded-md transition-colors" title="Edit">
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <form action={async (formData) => {
                                                'use server'
                                                const { deleteProduct } = await import('@/actions/admin')
                                                await deleteProduct(formData)
                                            }}>
                                                <input type="hidden" name="id" value={product.id} />
                                                <button className="p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors" title="Delete">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
