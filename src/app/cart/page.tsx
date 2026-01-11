'use client'

import { useCartStore } from '@/lib/store'
import { Trash2, Plus, Minus } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function CartPage() {
    const { items, removeItem, updateQuantity } = useCartStore()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    if (!mounted) return <div className="container py-20 text-center">Loading Cart...</div>

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

    if (items.length === 0) {
        return (
            <div className="container py-20 text-center flex flex-col items-center gap-4">
                <h1 className="text-2xl font-bold">Your cart is empty</h1>
                <Link href="/shop" className="text-primary hover:underline">
                    Go Shopping
                </Link>
            </div>
        )
    }

    return (
        <div className="container px-4 md:px-6 py-10 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="space-y-6 flex-1">
                    {items.map((item) => (
                        <div key={item.productId} className="flex items-center gap-4 border p-4 rounded-lg bg-card">
                            <div className="flex-1 space-y-1">
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-muted-foreground">{item.price.toFixed(2)} MAD</p>
                                {item.selectedSize && <p className="text-xs text-muted-foreground">Size: {item.selectedSize}</p>}
                                {item.selectedColor && <p className="text-xs text-muted-foreground">Color: {item.selectedColor}</p>}
                                {item.customNote && <p className="text-xs text-muted-foreground italic">Note: {item.customNote}</p>}
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 border rounded-md">
                                    <button className="px-2 py-1 hover:bg-muted" onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1), item.variantId)}>-</button>
                                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                                    <button className="px-2 py-1 hover:bg-muted" onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}>+</button>
                                </div>
                                <div className="font-semibold min-w-[80px] text-right">
                                    {(item.price * item.quantity).toFixed(2)} MAD
                                </div>
                                <button onClick={() => removeItem(item.productId, item.variantId)} className="text-destructive hover:bg-destructive/10 p-2 rounded">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-full lg:w-80 h-fit bg-muted/30 p-6 rounded-xl border">
                    <h2 className="text-xl font-bold mb-4">Summary</h2>
                    <div className="flex items-center justify-between mb-6 pb-6 border-b">
                        <span>Subtotal</span>
                        <div className="text-2xl font-bold">{total.toFixed(2)} MAD</div>
                    </div>
                    <Link href="/checkout" className="block w-full bg-primary text-primary-foreground text-center py-3 rounded-md hover:bg-primary/90 font-bold shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:-translate-y-0.5">
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    )
}
