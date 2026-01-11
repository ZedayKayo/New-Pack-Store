import Link from 'next/link'
import { getProducts, getCategories, getTopSellingProducts } from '@/actions/products'
import TopSellingSlider from '@/components/shop/TopSellingSlider'
import { Star } from 'lucide-react'
import { getProductImage } from '@/lib/utils'

import ProductFilters from '@/components/shop/ProductFilters'

export default async function ShopPage(props: { searchParams: Promise<{ category?: string, query?: string, minPrice?: string, maxPrice?: string, sort?: string }> }) {
    const searchParams = await props.searchParams;
    const products = await getProducts({
        category: searchParams.category,
        query: searchParams.query,
        minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
        maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
        sort: searchParams.sort
    })
    const categories = await getCategories()
    const topProductsData = await getTopSellingProducts(8) // Fetch 8 for the slider (2 pages of 4)
    const topProducts = topProductsData.map(product => ({
        ...product,
        price: Number(product.price)
    }))

    return (
        <div className="container px-4 md:px-6 py-10 flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full md:w-64 space-y-8 flex-shrink-0">
                <div className="sticky top-24">
                    <div className="pb-4 mb-4 border-b">
                        <h3 className="text-xl font-bold tracking-tight">Filters</h3>
                    </div>

                    <div className="mb-8">
                        <ProductFilters />
                    </div>

                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Categories</h4>
                        <ul className="space-y-1">
                            <li>
                                <Link href="/shop" className={`block px-3 py-2 rounded-md text-sm transition-all ${!searchParams.category ? 'bg-primary/10 text-primary font-bold' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
                                    All Products
                                </Link>
                            </li>
                            {categories.map((cat: any) => (
                                <li key={cat.id}>
                                    <Link
                                        href={`/shop?category=${cat.slug}`}
                                        className={`block px-3 py-2 rounded-md text-sm transition-all ${searchParams.category === cat.slug ? 'bg-primary/10 text-primary font-bold' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
                                    >
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </aside>

            {/* Product Grid or Grouped View */}
            <div className="flex-1">
                {/* Top Selling Slider (Only on default view) */}
                {!searchParams.category && !searchParams.query && (
                    <TopSellingSlider products={topProducts} />
                )}

                {/* Header for Filtered View */}
                {(searchParams.category || searchParams.query) && (
                    <div className="mb-8 flex items-end justify-between border-b pb-6">
                        <div>
                            <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-foreground">
                                {searchParams.category ? categories.find(c => c.slug === searchParams.category)?.name : 'Search Results'}
                            </h1>
                            <p className="text-muted-foreground">{products.length} items found</p>
                        </div>
                    </div>
                )}

                {!searchParams.category && !searchParams.query ? (
                    // Grouped View (Default)
                    <div className="space-y-16">
                        {categories.map(category => {
                            const categoryProducts = products.filter((p: any) => p.categoryId === category.id)
                            if (categoryProducts.length === 0) return null

                            return (
                                <section key={category.id}>
                                    <div className="flex items-center justify-between mb-6 pb-2 border-b border-border/40">
                                        <h2 className="text-lg font-bold uppercase tracking-wider text-foreground/90">{category.name}</h2>
                                        <Link href={`/shop?category=${category.slug}`} className="text-primary hover:text-primary/80 text-xs font-semibold uppercase tracking-wide transition-colors">
                                            View All
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                        {categoryProducts.map((product: any) => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                    </div>
                                </section>
                            )
                        })}
                        {products.length === 0 && (
                            <div className="text-center py-20 text-muted-foreground">
                                No products found.
                            </div>
                        )}
                    </div>
                ) : (
                    // Filtered Grid View
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product: any) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                        {products.length === 0 && (
                            <div className="col-span-full py-24 text-center text-muted-foreground">
                                <div className="text-lg">No products found.</div>
                                <Link href="/shop" className="text-primary hover:underline mt-2 inline-block">Clear Filters</Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

function ProductCard({ product }: { product: any }) {
    const { getProductImage } = require('@/lib/utils') // Dynamic import to avoid top-level issues if any, or just safe utility usage

    return (
        <Link href={`/product/${product.id}`} className="group relative rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
            <div className="aspect-square bg-secondary/10 relative overflow-hidden">
                {(() => {
                    const mainImage = getProductImage(product.images);
                    if (mainImage) {
                        return <img src={mainImage} alt={product.name} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />
                    } else {
                        return (
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 text-xs">
                                No Image
                            </div>
                        )
                    }
                })()}
                {/* Overlay with Quick Action (Optional add to cart could go here in future) */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
            </div>
            <div className="p-4 flex-1 flex flex-col">
                <div className="mb-2">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold line-clamp-1">{product.category?.name}</p>
                    <h3 className="text-sm font-bold text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                </div>

                <div className="mt-auto pt-2 flex items-center justify-between border-t border-border/50">
                    <span className="font-bold text-base text-foreground">{Number(product.price).toFixed(2)} MAD</span>
                    {product.featured && <Star className="w-3 h-3 fill-primary text-primary" />}
                </div>
            </div>
        </Link>
    )
}
