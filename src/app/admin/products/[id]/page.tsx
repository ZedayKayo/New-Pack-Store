import { updateProduct } from '@/actions/admin'
import { getProduct, getCategories } from '@/actions/products'
import ProductForm from '@/components/admin/ProductForm'
import { notFound } from 'next/navigation'

export default async function EditProductPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const product = await getProduct(params.id)
    const categories = await getCategories()

    if (!product) {
        notFound()
    }

    // Convert Decimal to number safely
    const plainProduct = {
        ...product,
        price: Number(product.price)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
            </div>

            <ProductForm
                categories={categories}
                initialData={plainProduct}
                action={updateProduct}
            />
        </div>
    )
}


