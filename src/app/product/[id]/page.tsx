import { getProduct } from '@/actions/products'
import { notFound } from 'next/navigation'
import ProductDetails from '@/components/shop/ProductDetails'

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const product = await getProduct(params.id)

    if (!product) {
        notFound()
    }

    return (
        <div className="container px-4 md:px-6 py-10">
            <ProductDetails product={{ ...product, price: Number(product.price) }} />
        </div>
    )
}
