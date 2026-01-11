'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProduct(formData: FormData) {
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const price = formData.get('price') as string
    // const imageUrl = formData.get('imageUrl') as string // Deprecated
    const imagesJSON = formData.get('images') as string || '[]'
    const categoryId = formData.get('categoryId') as string
    const featured = formData.get('featured') === 'on'

    // New Fields
    const status = formData.get('status') as string || 'ACTIVE'
    const inventory = parseInt(formData.get('inventory') as string || '0')
    const sku = formData.get('sku') as string
    const brand = formData.get('brand') as string
    const tags = formData.get('tags') as string || '[]'
    const variants = formData.get('variants') as string || '[]'

    await prisma.product.create({
        data: {
            name,
            description,
            price: parseFloat(price),
            images: imagesJSON, // Store the JSON string directly
            category: { connect: { id: categoryId } },
            featured,
            status,
            inventory,
            sku,
            brand,
            tags,
            variants
        }
    })

    revalidatePath('/admin/products')
    revalidatePath('/shop')
    redirect('/admin/products')
}

export async function deleteProduct(formData: FormData) {
    const id = formData.get('id') as string // Using form action with hidden input
    if (!id) return

    await prisma.product.delete({
        where: { id }
    })

    revalidatePath('/admin/products')
    revalidatePath('/shop')
}

export async function updateProduct(formData: FormData) {
    const id = formData.get('id') as string
    const name = formData.get('name') as string

    // Debug Logging
    console.log("--- UPDATE PRODUCT DEBUG ---")
    const imagesRaw = formData.get('images') as string
    console.log("Images Raw from Form:", imagesRaw)

    const description = formData.get('description') as string
    const price = formData.get('price') as string
    // const imageUrl = formData.get('imageUrl') as string // Deprecated
    const imagesJSON = formData.get('images') as string || '[]'
    console.log("Images JSON to Save:", imagesJSON)

    const categoryId = formData.get('categoryId') as string
    const featured = formData.get('featured') === 'on'

    // New Fields
    const status = formData.get('status') as string
    const inventory = parseInt(formData.get('inventory') as string || '0')
    const sku = formData.get('sku') as string
    const brand = formData.get('brand') as string
    const tags = formData.get('tags') as string
    const variants = formData.get('variants') as string

    await prisma.product.update({
        where: { id },
        data: {
            name,
            description,
            price: parseFloat(price),
            images: imagesJSON,
            category: { connect: { id: categoryId } },
            featured,
            status,
            inventory,
            sku,
            brand,
            tags,
            variants
        }
    })

    revalidatePath('/admin/products')
    revalidatePath(`/admin/products/${id}`)
    revalidatePath('/shop')
    redirect('/admin/products')
}

export async function updateOrderStatus(formData: FormData) {
    const id = formData.get('id') as string // Order ID
    const status = formData.get('status') as string

    await prisma.order.update({
        where: { id },
        data: { status }
    })

    revalidatePath('/admin/orders')
}

export async function duplicateProduct(id: string) {
    const product = await prisma.product.findUnique({
        where: { id }
    })

    if (!product) return

    await prisma.product.create({
        data: {
            name: `${product.name} (Copy)`,
            description: product.description,
            price: product.price,
            images: product.images,
            categoryId: product.categoryId,
            featured: false, // Don't feature duplicates by default
            status: 'DRAFT', // Set duplicate to draft for safety
            inventory: product.inventory,
            sku: `${product.sku || ''}-COPY`,
            brand: product.brand,
            tags: product.tags,
            variants: product.variants
        }
    })

    revalidatePath('/admin/products')
    revalidatePath('/shop')
}

export async function toggleProductStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === 'ACTIVE' ? 'DRAFT' : 'ACTIVE'

    await prisma.product.update({
        where: { id },
        data: { status: newStatus }
    })

    revalidatePath('/admin/products')
    revalidatePath('/shop')
}

export async function createCategory(formData: FormData) {
    const name = formData.get('name') as string
    const slug = formData.get('slug') as string

    if (!name || !slug) return

    await prisma.category.create({
        data: { name, slug: slug.toLowerCase().replace(/\s+/g, '-') }
    })

    revalidatePath('/admin/categories')
    revalidatePath('/shop')
    revalidatePath('/admin/products/new')
}

export async function deleteCategory(formData: FormData) {
    const id = formData.get('id') as string
    if (!id) return

    // Check if category has products? Optional constraint handling.
    // For now, let's assume if it fails due to FK, it throws.
    // Or we rely on prisma cascade if configured, or just error.
    try {
        await prisma.category.delete({
            where: { id }
        })
        revalidatePath('/admin/categories')
        revalidatePath('/shop')
        revalidatePath('/admin/products/new')
    } catch (e) {
        console.error("Failed to delete category", e)
        // Could return error state but server actions are tricky with simple forms.
    }
}

export async function updateCategory(formData: FormData) {
    const id = formData.get('id') as string
    const name = formData.get('name') as string
    const slug = formData.get('slug') as string

    if (!id || !name || !slug) return

    await prisma.category.update({
        where: { id },
        data: { name, slug: slug.toLowerCase().replace(/\s+/g, '-') }
    })

    revalidatePath('/admin/categories')
    revalidatePath('/shop')
    revalidatePath('/admin/products/new')
}
