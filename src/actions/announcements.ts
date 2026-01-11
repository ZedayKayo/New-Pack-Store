'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createAnnouncement(formData: FormData) {
    const text = formData.get('text') as string
    if (!text) return

    await prisma.announcement.create({
        data: { text }
    })

    revalidatePath('/admin/settings')
    revalidatePath('/')
}

export async function deleteAnnouncement(formData: FormData) {
    const id = formData.get('id') as string
    if (!id) return

    await prisma.announcement.delete({
        where: { id }
    })

    revalidatePath('/admin/settings')
    revalidatePath('/')
}

export async function toggleAnnouncement(formData: FormData) {
    const id = formData.get('id') as string
    const isActive = formData.get('isActive') === 'true'

    if (!id) return

    await prisma.announcement.update({
        where: { id },
        data: { isActive }
    })

    revalidatePath('/admin/settings')
    revalidatePath('/')
}

export async function getAnnouncements() {
    return await prisma.announcement.findMany({
        orderBy: { createdAt: 'desc' }
    })
}
