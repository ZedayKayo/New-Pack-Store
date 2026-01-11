'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Types
type Product = {
    id: string
    name: string
    price: number | string
    images: string // JSON string
    category: { name: string }
    salesCount: number
}

export default function TopSellingSlider({ products }: { products: any[] }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    if (!products || products.length === 0) return null

    // Configuration
    const itemsPerPage = 4
    const totalPages = Math.ceil(products.length / itemsPerPage)

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % totalPages)
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
    }

    // Get current products
    const visibleProducts = products.slice(
        currentIndex * itemsPerPage,
        currentIndex * itemsPerPage + itemsPerPage
    )

    // If not enough products to fill the page, we might want to pad or just show what we have.
    // The requirement was "4 appear". 

    return (
        <section className="py-10 bg-secondary/20 mb-8 select-none">
            <div className="container px-4 md:px-6 relative group">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Best Sellers</h2>
                        <p className="text-muted-foreground text-sm">Top rated products from last week</p>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={prevSlide}
                            className="p-2 rounded-full border bg-background hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50"
                            disabled={totalPages <= 1}
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="p-2 rounded-full border bg-background hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50"
                            disabled={totalPages <= 1}
                        >
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Slider Window */}
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {/* We render ALL products in chunks/pages or just long list? 
                            A true slide usually keeps DOM simple or transforms the whole strip.
                            Let's transform the whole strip of ALL products, but sized to fit 4 per view.
                        */}
                        {Array.from({ length: totalPages }).map((_, pageIndex) => (
                            <div key={pageIndex} className="min-w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-1">
                                {products.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).map((product) => {
                                    // Parse images
                                    let imageUrl = '/placeholder.svg'
                                    try {
                                        const parsedImages = typeof product.images === 'string'
                                            ? JSON.parse(product.images)
                                            : product.images
                                        if (Array.isArray(parsedImages) && parsedImages.length > 0) {
                                            imageUrl = parsedImages[0]
                                        }
                                    } catch (e) { }

                                    const price = Number(product.price).toFixed(2)

                                    return (
                                        <Link
                                            key={product.id}
                                            href={`/product/${product.id}`}
                                            className="group/card block h-full"
                                        >
                                            <Card className="h-full border-none shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                                <div className="relative aspect-square overflow-hidden rounded-t-xl bg-gray-100">
                                                    <Image
                                                        src={imageUrl}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover/card:scale-110"
                                                    />
                                                    <Badge className="absolute top-2 left-2 bg-yellow-500 text-white border-none shadow-sm">
                                                        #{products.indexOf(product) + 1} Best Seller
                                                    </Badge>
                                                </div>
                                                <CardContent className="p-4">
                                                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">
                                                        {product.category?.name}
                                                    </p>
                                                    <h3 className="font-bold text-sm truncate mb-2 text-foreground group-hover/card:text-primary transition-colors">
                                                        {product.name}
                                                    </h3>
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-extrabold text-primary">{price} MAD</span>
                                                        <span className="text-[10px] text-muted-foreground px-2 py-1 bg-muted rounded-full">
                                                            {product.salesCount} sold
                                                        </span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    )
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
