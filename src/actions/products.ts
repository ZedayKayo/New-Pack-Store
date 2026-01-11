'use server'

import { prisma } from "@/lib/prisma"

export interface ProductFilterOptions {
    category?: string
    query?: string
    minPrice?: number
    maxPrice?: number
    sort?: string
}

export async function getProducts(options?: string | ProductFilterOptions) {
    // Backward compatibility if just string passed
    const filters: ProductFilterOptions = typeof options === 'string' ? { category: options } : (options || {})

    const { category, query, minPrice, maxPrice, sort } = filters

    const where: any = {}

    if (category) {
        where.category = { slug: category }
    }

    // Always filter by ACTIVE status for public view
    // Note: If this function is used by admin, we might need a flag. 
    // Usually admin uses direct prisma calls, so this is safe for 'shop'.
    where.status = 'ACTIVE'

    if (query) {
        where.OR = [
            { name: { contains: query } }, // Case insensitive by default in SQLite usually, or implicit
            { description: { contains: query } }
        ]
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
        where.price = {}
        if (minPrice !== undefined) where.price.gte = minPrice
        if (maxPrice !== undefined) where.price.lte = maxPrice
    }

    let orderBy: any = undefined
    if (sort === 'price_asc') orderBy = { price: 'asc' }
    else if (sort === 'price_desc') orderBy = { price: 'desc' }
    else if (sort === 'newest') orderBy = { createdAt: 'desc' }

    return await prisma.product.findMany({
        where,
        orderBy,
        include: { category: true }
    })
}

export async function getProduct(id: string) {
    return await prisma.product.findUnique({
        where: { id },
        include: { category: true }
    })
}

export async function getCategories() {
    return await prisma.category.findMany()
}

export async function getTopSellingProducts(limit = 6) {
    const products = await prisma.product.findMany({
        where: { status: 'ACTIVE' },
        orderBy: { salesCount: 'desc' },
        take: limit,
        include: { category: true }
    })
    return products
}
