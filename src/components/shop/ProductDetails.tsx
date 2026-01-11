'use client'

import { useState, useEffect } from 'react'
import { ShoppingCart, Check, Heart, Share2, ShieldCheck, Truck, RotateCcw, Banknote, ChevronDown } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { cn } from '@/lib/utils'

interface Variant {
    size: string
    color: string
    sku: string
    stock: number
}

interface ProductDetailsProps {
    product: any
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    // Parse JSON fields
    const images: string[] = product.images ? JSON.parse(product.images) : []
    const variants: Variant[] = product.variants ? JSON.parse(product.variants) : []
    const tags: string[] = product.tags ? JSON.parse(product.tags) : []

    // State
    const [selectedImage, setSelectedImage] = useState(images[0] || '')
    const [selectedSize, setSelectedSize] = useState<string>('')
    const [selectedColor, setSelectedColor] = useState<string>('')
    const [quantity, setQuantity] = useState(1)

    // Cart State
    const addItem = useCartStore((state) => state.addItem)
    const [added, setAdded] = useState(false)

    // Derived State
    const uniqueSizes = Array.from(new Set(variants.map(v => v.size).filter(Boolean)))
    const uniqueColors = Array.from(new Set(variants.map(v => v.color).filter(Boolean)))

    // Find selected variant object
    const currentVariant = variants.find(v =>
        (!selectedSize || v.size === selectedSize) &&
        (!selectedColor || v.color === selectedColor)
    )

    // Determine simplified stock status
    // Logic: 
    // 1. If variants exist AND one is selected -> use variant stock.
    // 2. If variants exist BUT none selected -> fallback to global inventory (or sum of variants?). 
    //    For now, let's use global inventory as "Total Available".
    // 3. If no variants -> use global inventory.

    const stockToDisplay = (variants.length > 0 && currentVariant)
        ? currentVariant.stock
        : product.inventory

    const isOutOfStock = stockToDisplay <= 0

    const canAddToCart = variants.length > 0
        ? (selectedSize && selectedColor && !isOutOfStock)
        : (!isOutOfStock)

    const handleAddToCart = () => {
        if (!canAddToCart) return

        addItem({
            productId: product.id,
            name: product.name,
            price: Number(product.price),
            quantity: quantity,
            image: selectedImage,
            variantId: currentVariant?.sku // Optional: track variant
        })
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    return (
        <div className="grid md:grid-cols-2 gap-12 animate-in fade-in duration-500">
            {/* Left Column: Gallery */}
            <div className="space-y-4">
                <div className="aspect-square bg-secondary/20 rounded-2xl overflow-hidden relative border border-border/50 shadow-sm">
                    {selectedImage ? (
                        <img
                            src={selectedImage}
                            alt={product.name}
                            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50">
                            No Image Available
                        </div>
                    )}
                    {/* Badge */}
                    {product.featured && (
                        <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                            Featured
                        </span>
                    )}
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(img)}
                                className={cn(
                                    "relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all",
                                    selectedImage === img ? "border-primary ring-2 ring-primary/20" : "border-transparent opacity-70 hover:opacity-100"
                                )}
                            >
                                <img src={img} alt={`View ${idx + 1}`} className="object-cover w-full h-full" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Right Column: Info & Actions */}
            <div className="flex flex-col h-full">
                <div className="mb-6">
                    {product.brand && (
                        <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">{product.brand}</p>
                    )}
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-2">{product.name}</h1>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h2 className="text-3xl font-bold">{Number(product.price).toFixed(2)} MAD</h2>
                            {currentVariant && (
                                <span className="text-sm font-mono text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
                                    SKU: {currentVariant.sku}
                                </span>
                            )}
                        </div>
                        {/* Status Badge */}
                        {isOutOfStock ? (
                            <span className="bg-destructive/10 text-destructive text-sm font-bold px-3 py-1 rounded-full">
                                Out of Stock
                            </span>
                        ) : (
                            <span className="bg-green-500/10 text-green-600 text-sm font-bold px-3 py-1 rounded-full">
                                In Stock
                            </span>
                        )}
                    </div>
                </div>

                {/* Variants Selection */}
                {variants.length > 0 && (
                    <div className="space-y-6 mb-8 border-y py-6 border-border/50">
                        {/* Sizes */}
                        {uniqueSizes.length > 0 && (
                            <div>
                                <label className="text-sm font-medium mb-3 block text-muted-foreground">Select Size</label>
                                <div className="flex flex-wrap gap-3">
                                    {uniqueSizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={cn(
                                                "h-10 min-w-[3rem] px-4 rounded-md border text-sm font-medium transition-all",
                                                selectedSize === size
                                                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                                                    : "bg-background hover:bg-muted border-input"
                                            )}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Colors */}
                        {uniqueColors.length > 0 && (
                            <div>
                                <label className="text-sm font-medium mb-3 block text-muted-foreground">Select Color</label>
                                <div className="flex flex-wrap gap-3">
                                    {uniqueColors.map(color => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={cn(
                                                "h-10 px-4 rounded-md border text-sm font-medium transition-all flex items-center gap-2",
                                                selectedColor === color
                                                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                                                    : "bg-background hover:bg-muted border-input"
                                            )}
                                        >
                                            {/* Color Swatch Dot (Optional, requires simplified mapping or assumption) */}
                                            <span className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: color.toLowerCase() }} />
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Description */}
                <div className="prose prose-stone dark:prose-invert max-w-none mb-8 text-muted-foreground">
                    <p className="whitespace-pre-line">{product.description}</p>
                </div>

                {/* Additional Details (Specs) */}
                <div className="bg-secondary/20 rounded-xl p-6 mb-8 border border-border/50 text-sm">
                    <h3 className="font-semibold mb-3 text-foreground">Product Specifications</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="text-muted-foreground block mb-1">SKU</span>
                            <span className="font-medium text-foreground">{product.sku || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block mb-1">Brand</span>
                            <span className="font-medium text-foreground">{product.brand || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block mb-1">Category</span>
                            <span className="font-medium text-foreground">{product.category?.name || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block mb-1">Inventory</span>
                            <span className="font-medium text-foreground">
                                {stockToDisplay} units visible
                            </span>
                        </div>
                    </div>

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-border/50">
                            <span className="text-muted-foreground block mb-2">Tags</span>
                            <div className="flex flex-wrap gap-2">
                                {tags.map(tag => (
                                    <span key={tag} className="bg-background border px-2 py-1 rounded-md text-xs font-medium text-muted-foreground">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Quantity and Actions */}
                <div className="mt-auto space-y-6">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-muted-foreground">Quantity</span>
                        <div className="flex items-center border rounded-md">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-3 py-2 hover:bg-muted text-foreground transition-colors"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-12 text-center text-sm p-2 border-0 focus:ring-0 appearance-none bg-transparent"
                            />
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-3 py-2 hover:bg-muted text-foreground transition-colors"
                            >
                                +
                            </button>
                        </div>
                        <span className="text-xs text-muted-foreground">
                            {stockToDisplay} available
                        </span>
                    </div>

                    {/* Custom Note Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Custom Note (Optional)</label>
                        <textarea
                            className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            placeholder="Enter custom requirements, measurements, or special instructions here..."
                            rows={3}
                            // We would need to store this in state and pass to cart, but for UI visual check, this is enough.
                            // Let's add state if we want it functional.
                            onChange={(e) => {
                                // Ideally update state here like `setCustomNote(e.target.value)`
                            }}
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handleAddToCart}
                            disabled={!canAddToCart}
                            className={cn(
                                "flex-1 h-12 flex items-center justify-center gap-2 rounded-full font-bold text-lg transition-all shadow-lg active:scale-95",
                                canAddToCart
                                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/25"
                                    : "bg-muted text-muted-foreground cursor-not-allowed"
                            )}
                        >
                            {added ? (
                                <>
                                    <Check className="w-5 h-5" /> Added to Cart
                                </>
                            ) : (
                                <>
                                    <ShoppingCart className="w-5 h-5" /> Add to Cart
                                </>
                            )}
                        </button>
                        <button className="h-12 w-12 flex items-center justify-center rounded-full border border-border bg-background hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                            <Heart className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-3 gap-2 py-4">
                        <div className="flex flex-col items-center text-center p-3 bg-secondary/20 rounded-lg border border-border/50">
                            <Check className="w-5 h-5 text-primary mb-1" />
                            <span className="text-xs font-medium">Quality Check</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-3 bg-secondary/20 rounded-lg border border-border/50">
                            <Truck className="w-5 h-5 text-primary mb-1" />
                            <span className="text-xs font-medium">Fast Delivery</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-3 bg-secondary/20 rounded-lg border border-border/50">
                            <ShieldCheck className="w-5 h-5 text-primary mb-1" />
                            <span className="text-xs font-medium">Secure Payment</span>
                        </div>
                    </div>

                    {/* Policy Accordions */}
                    <div className="space-y-1 border-t pt-4">
                        <PolicyAccordion title="Payment on Delivery" icon={<Banknote className="w-4 h-4" />}>
                            <p className="text-sm text-muted-foreground">We offer Cash on Delivery (COD) for ultimate convenience and trust. Pay only when you receive your order.</p>
                        </PolicyAccordion>

                        <PolicyAccordion title="Quality Guarantee" icon={<ShieldCheck className="w-4 h-4" />}>
                            <p className="text-sm text-muted-foreground">Every product undergoes a strict quality check before shipping. We ensure you receive exactly what you ordered in perfect condition.</p>
                        </PolicyAccordion>

                        <PolicyAccordion title="Shipping Information" icon={<Truck className="w-4 h-4" />}>
                            <p className="text-sm text-muted-foreground">Orders are processed within 24 hours. Express shipping available for supported locations. Tracking number provided via email.</p>
                        </PolicyAccordion>

                        <PolicyAccordion title="Return Policy" icon={<RotateCcw className="w-4 h-4" />}>
                            <p className="text-sm text-muted-foreground">Hassle-free 30-day return policy. If you are not satisfied with your purchase, simply return it for a full refund or exchange.</p>
                        </PolicyAccordion>
                    </div>
                </div>
            </div>
        </div>
    )
}

function PolicyAccordion({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="border-b last:border-0 border-border/50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-3 text-sm font-medium hover:text-primary transition-colors text-left"
            >
                <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">{icon}</span>
                    {title}
                </div>
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isOpen ? "rotate-180" : "")} />
            </button>
            <div className={cn("overflow-hidden transition-all duration-300", isOpen ? "max-h-48 pb-4 opacity-100" : "max-h-0 opacity-0")}>
                {children}
            </div>
        </div>
    )
}
