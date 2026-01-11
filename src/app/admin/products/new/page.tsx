import { createProduct } from '@/actions/admin'
import ProductForm from '@/components/admin/ProductForm'
import { getCategories as fetchCategories } from '@/actions/products'

export default async function NewProductPage() {
    const categories = await fetchCategories()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Create Product</h1>
            </div>

            <ProductForm
                categories={categories}
                action={createProduct}
            />
        </div>
    )
}
