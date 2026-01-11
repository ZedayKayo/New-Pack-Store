'use client'

import { useCartStore } from '@/lib/store'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
    const { items, clearCart } = useCartStore()
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        notes: ''
    })

    // Hydration check
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
        if (items.length === 0) router.push('/cart')
    }, [items, router])

    if (!mounted) return null

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

    const handleWhatsApp = () => {
        // Generate Message
        let message = `*New Order Request*\n\n*Name:* ${formData.name}\n`
        if (formData.phone) message += `*Phone:* ${formData.phone}\n`
        if (formData.address) message += `*Address:* ${formData.address}\n`

        // WhatsApp Format
        // Cart Items
        const itemsList = items.map(i => `- ${i.quantity}x ${i.name} (${i.price} MAD)`).join('\n')
        message += `\n*Order Details:*\n${itemsList}\n`

        message += `\n*Total:* ${total.toFixed(2)} MAD\n`
        if (formData.notes) message += `\n*Notes:* ${formData.notes}`

        const url = `https://wa.me/?text=${encodeURIComponent(message)}`

        // OR Mailto
        /*
        let body = `New Order Request\n\nName: ${formData.name}\n`
        if (formData.phone) body += `Phone: ${formData.phone}\n`
        const itemsList = items.map(i => `- ${i.quantity}x ${i.name} (${i.price} MAD)`).join('\n')
        body += `\nOrder Details:\n${itemsList}\n\nTotal: ${total.toFixed(2)} MAD\n\nNotes: ${formData.notes}`
        const url = `mailto:store@example.com?subject=New Order from ${formData.name}&body=${encodeURIComponent(body)}`
        */

        window.open(url, '_blank')
        // Ideally create order in DB via API before redirecting?
        // User requirement: "Order request system". 
        // "Customers should not pay online; instead, they must be able to contact... to complete".
        // "Also develop admin dashboard... order management".
        // So YES, I MUST SAVE the order to DB first, THEN redirect.
        // I will call createOrder action here.
        submitOrderAndRedirect(url)
    }

    const handleEmail = () => {
        let body = `New Order Request\n\nName: ${formData.name}\n`
        // ... similar logic
        const itemsList = items.map(i => `- ${i.quantity}x ${i.name} ($${i.price})`).join('\n')
        body += `\nOrder Details:\n${itemsList}\n\nTotal: $${total.toFixed(2)}\n\nNotes: ${formData.notes}`

        const url = `mailto:store@example.com?subject=New Order from ${formData.name}&body=${encodeURIComponent(body)}`
        submitOrderAndRedirect(url)
    }

    const submitOrderAndRedirect = async (url: string) => {
        // Call Server Action
        const { createOrder } = await import('@/actions/orders')
        try {
            await createOrder({
                customerName: formData.name,
                customerEmail: formData.email,
                customerPhone: formData.phone,
                items: items.map(i => ({ productId: i.productId, quantity: i.quantity }))
            })
            clearCart()
            window.location.href = url // or window.open
        } catch (e) {
            alert('Failed to save order. Redirecting anyway.')
            window.open(url, '_blank')
        }
    }

    return (
        <div className="container px-4 md:px-6 py-10 max-w-2xl">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="space-y-6 bg-card p-6 rounded-lg border">
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <label className="font-medium">Full Name</label>
                        <input
                            className="w-full p-2 rounded-md border text-background"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <label className="font-medium">Phone (for WhatsApp)</label>
                        <input
                            className="w-full p-2 rounded-md border text-background"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <label className="font-medium">Email</label>
                        <input
                            className="w-full p-2 rounded-md border text-background"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <label className="font-medium">Address</label>
                        <textarea
                            className="w-full p-2 rounded-md border text-background"
                            rows={2}
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <label className="font-medium">Notes</label>
                        <textarea
                            className="w-full p-2 rounded-md border text-background"
                            rows={2}
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        />
                    </div>
                </div>

                <div className="pt-6 space-y-4">
                    <button
                        onClick={handleWhatsApp}
                        disabled={!formData.name}
                        className="w-full py-3 rounded-md bg-green-500 text-white font-bold hover:bg-green-600 transition-colors disabled:opacity-50"
                    >
                        Complete Order via WhatsApp
                    </button>
                    <button
                        onClick={handleEmail}
                        disabled={!formData.name}
                        className="w-full py-3 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                        Complete Order via Email
                    </button>
                </div>
            </div>
        </div>
    )
}
