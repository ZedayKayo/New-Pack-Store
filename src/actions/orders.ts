'use server'

import { prisma } from "@/lib/prisma"

export async function createOrder(data: {
    customerName: string,
    customerEmail?: string | null,
    customerPhone?: string | null,
    items: { productId: string, quantity: number }[]
}) {
    let total = 0
    const orderItemsData = []

    for (const item of data.items) {
        const product = await prisma.product.findUnique({ where: { id: item.productId } })
        if (product) {
            // Handle Decimal: fetch as number/string interaction
            // Prisma Decimal is an object with .toNumber() if imported from runtime?
            // Or just cast if using simple query.
            // Ideally use product.price.toNumber()
            const price = Number(product.price)
            total += price * item.quantity

            orderItemsData.push({
                productId: item.productId,
                quantity: item.quantity,
                price: product.price
            })
        }
    }

    const order = await prisma.order.create({
        data: {
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            customerPhone: data.customerPhone,
            totalAmount: total,
            status: 'PENDING',
            items: {
                create: orderItemsData
            }
        }
    })

    // Increment salesCount for each product
    // We do this asynchronously/independently, failures here shouldn't block order creation response ideally, 
    // but for simplicity we await it or just fire and forget. 
    // Let's await to be safe.
    for (const item of orderItemsData) {
        await prisma.product.update({
            where: { id: item.productId },
            data: { salesCount: { increment: item.quantity } }
        })
    }

    return order
}


import { revalidatePath } from "next/cache"

export async function updateOrderStatus(formData: FormData) {
    const orderId = formData.get('orderId') as string
    const status = formData.get('status') as string

    if (!orderId || !status) return

    await prisma.order.update({
        where: { id: orderId },
        data: { status }
    })

    revalidatePath('/admin/orders')
}
