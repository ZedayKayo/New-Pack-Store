'use client'

import { useState } from 'react'
import { Edit, Save, X, Trash2 } from 'lucide-react'
import { updateCategory, deleteCategory } from '@/actions/admin'

interface Category {
    id: string
    name: string
    slug: string
    _count: { products: number }
}

export default function CategoryRow({ category }: { category: Category }) {
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(category.name)
    const [slug, setSlug] = useState(category.slug)

    const handleSave = async () => {
        const formData = new FormData()
        formData.append('id', category.id)
        formData.append('name', name)
        formData.append('slug', slug)

        await updateCategory(formData)
        setIsEditing(false)
    }

    if (isEditing) {
        return (
            <tr className="border-b last:border-0 bg-muted/30">
                <td className="px-4 py-3">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-1 border rounded text-sm min-w-[120px]"
                        autoFocus
                    />
                </td>
                <td className="px-4 py-3">
                    <input
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="w-full p-1 border rounded text-sm text-muted-foreground min-w-[120px]"
                    />
                </td>
                <td className="px-4 py-3 text-center text-muted-foreground">{category._count.products}</td>
                <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                        <button onClick={handleSave} className="p-2 text-primary hover:bg-primary/10 rounded-md transition-colors" title="Save">
                            <Save className="w-4 h-4" />
                        </button>
                        <button onClick={() => setIsEditing(false)} className="p-2 text-muted-foreground hover:bg-muted rounded-md transition-colors" title="Cancel">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </td>
            </tr>
        )
    }

    return (
        <tr className="border-b last:border-0 hover:bg-muted/50 transition-colors">
            <td className="px-4 py-3 font-medium">{category.name}</td>
            <td className="px-4 py-3 text-muted-foreground">{category.slug}</td>
            <td className="px-4 py-3 text-center">{category._count.products}</td>
            <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                    <button onClick={() => setIsEditing(true)} className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                    </button>

                    <form action={deleteCategory}>
                        <input type="hidden" name="id" value={category.id} />
                        <button
                            className="p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors disabled:opacity-50"
                            disabled={category._count.products > 0}
                            title={category._count.products > 0 ? "Cannot delete category with products" : "Delete Category"}
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </td>
        </tr>
    )
}
