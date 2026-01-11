'use client'

import { Button } from "@/components/ui/button" // Ensure we have a button component, or just use HTML button if not created yet. 
// I haven't created ui/button.tsx explicitly yet, but I should have (shadcn usually provided).
// I'll stick to Tailwind button or create basic ui/button below to be safe, or just html button.
// I'll use a styled HTML button for now to avoid dependency on uncreated file.
import { useCartStore } from "@/lib/store"
import { useState } from "react"
import { ShoppingCart, Check } from "lucide-react"

export default function AppAddToCart({ product }: { product: any }) {
    const addItem = useCartStore((state) => state.addItem)
    const [added, setAdded] = useState(false)

    const handleAdd = () => {
        addItem({
            productId: product.id,
            name: product.name,
            price: Number(product.price),
            quantity: 1,
            image: product.image
        })
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    return (
        <button
            onClick={handleAdd}
            className={`inline-flex items-center justify-center gap-2 px-8 py-3 rounded-md text-sm font-medium transition-all ${added
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
        >
            {added ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
            {added ? "Added to Cart" : "Add to Cart"}
        </button>
    )
}
