import { prisma } from '@/lib/prisma'
import { Plus } from 'lucide-react'
import CategoryRow from '@/components/admin/CategoryRow'

export default async function AdminCategoriesPage() {
    const categories = await prisma.category.findMany({
        include: { _count: { select: { products: true } } }
    })

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Categories</h1>

            <div className="grid gap-8 md:grid-cols-2">
                {/* List Categories */}
                <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                    <div className="p-6 border-b">
                        <h2 className="font-semibold text-lg">Existing Categories</h2>
                    </div>
                    <table className="w-full text-sm">
                        <thead className="bg-muted/30 border-b">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">Name</th>
                                <th className="px-4 py-3 text-left font-medium">Slug</th>
                                <th className="px-4 py-3 text-center font-medium">Products</th>
                                <th className="px-4 py-3 text-right font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat) => (
                                <CategoryRow key={cat.id} category={cat} />
                            ))}
                            {categories.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-muted-foreground">No categories found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Create Category Form */}
                <div className="h-fit rounded-xl border bg-card shadow-sm p-6">
                    <h2 className="font-semibold text-lg mb-4">Add New Category</h2>
                    <form action={async (formData) => {
                        'use server'
                        const { createCategory } = await import('@/actions/admin')
                        await createCategory(formData)
                    }} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium mb-1 block">Category Name</label>
                            <input
                                name="name"
                                required
                                className="w-full p-2 rounded-md border bg-background"
                                placeholder="e.g. Headphones"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-1 block">Slug (URL)</label>
                            <input
                                name="slug"
                                required
                                className="w-full p-2 rounded-md border bg-background"
                                placeholder="e.g. headphones-audio"
                            />
                            <p className="text-xs text-muted-foreground mt-1">Unique identifier for URL.</p>
                        </div>
                        <button type="submit" className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 font-medium">
                            <Plus className="w-4 h-4" /> Create Category
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
