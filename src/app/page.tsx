import Link from 'next/link'
import { getProducts, getCategories } from '@/actions/products'
import { ArrowRight, Star } from 'lucide-react'
import { getProductImage } from '@/lib/utils'

export default async function Home() {
  const allProducts = await getProducts()
  // Filter for featured in memory or query (mocked filter as prop logic updated in action)
  const featuredProducts = allProducts.filter((p: any) => p.featured).slice(0, 4)
  const categories = await getCategories()

  return (
    <div className="flex flex-col gap-16 pb-16">
      <section className="relative h-[700px] flex items-center justify-center overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-background">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/80 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]"></div>
        </div>

        <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center gap-8">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
            Example New Collection 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Lifestyle</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-[700px] leading-relaxed">
            Discover our curated collection of premium goods, designed for the modern aesthetic.
          </p>
          <div className="flex gap-4 mt-2">
            <Link href="/shop" className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-10 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:bg-primary/90">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight mb-10">Browse Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat: any) => (
            <Link key={cat.id} href={`/shop?category=${cat.slug}`} className="group relative overflow-hidden rounded-2xl border border-border/50 bg-white/50 backdrop-blur-sm p-8 hover:shadow-2xl hover:border-primary/20 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold tracking-tight group-hover:text-primary transition-colors">{cat.name}</h3>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <ArrowRight className="w-5 h-5 text-primary opacity-50 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight mb-10">Trending Now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product: any) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="aspect-[4/3] bg-secondary/30 relative overflow-hidden">
                {(() => {
                  const mainImage = getProductImage(product.images);
                  if (mainImage) {
                    return <img src={mainImage} alt={product.name} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
                  } else {
                    return (
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50">
                        No Image
                      </div>
                    )
                  }
                })()}
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between relative z-10">
                  <span className="font-extrabold text-xl font-heading">{Number(product.price).toFixed(2)} MAD</span>
                  <div className="bg-primary/10 p-2 rounded-full transform group-hover:scale-110 transition-transform duration-300">
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
