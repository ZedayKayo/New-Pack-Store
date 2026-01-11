'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { useDebounce } from '@/lib/hooks' // We might need to create this hook or implement inline

export default function ProductFilters() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [query, setQuery] = useState(searchParams.get('query') || '')
    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
    const [sort, setSort] = useState(searchParams.get('sort') || '')

    // Inline debounce or similar logic to avoid too many refreshes
    // ideally I'd use a hook, but for simplicity I'll just push on enter or blur for inputs
    // and immediately for changes if I add a 'Apply' button?
    // Let's do: Auto-update on debounce for query, auto for sort, manual/blur for price.

    useEffect(() => {
        const timeout = setTimeout(() => {
            applyFilters()
        }, 500)
        return () => clearTimeout(timeout)
    }, [query, sort, minPrice, maxPrice])

    const applyFilters = () => {
        const params = new URLSearchParams(searchParams.toString())

        if (query) params.set('query', query)
        else params.delete('query')

        if (minPrice) params.set('minPrice', minPrice)
        else params.delete('minPrice')

        if (maxPrice) params.set('maxPrice', maxPrice)
        else params.delete('maxPrice')

        if (sort) params.set('sort', sort)
        else params.delete('sort')

        router.push(`/shop?${params.toString()}`)
    }

    return (
        <div className="space-y-6">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 rounded-md border text-sm bg-background"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            {/* Sort */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Sort By</label>
                <select
                    className="w-full p-2 rounded-md border text-sm bg-background"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="">Featured</option>
                    <option value="newest">Newest Arrivals</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                </select>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Price Range</label>
                <div className="flex items-center gap-2">
                    <input
                        type="number" placeholder="Min"
                        className="w-full p-2 rounded-md border text-sm bg-background"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <span className="text-muted-foreground">-</span>
                    <input
                        type="number" placeholder="Max"
                        className="w-full p-2 rounded-md border text-sm bg-background"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}
