'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getStoreSettings() {
    const settings = await prisma.storeSettings.findMany()
    // Convert array to object for easier access
    return settings.reduce((acc, curr) => {
        acc[curr.key] = curr.value
        return acc
    }, {} as Record<string, string>)
}

export async function updateStoreSettings(formData: FormData) {
    // Iterate over all keys in formData
    const entries = Array.from(formData.entries())

    for (const [key, value] of entries) {
        if (typeof value === 'string' && key.startsWith('setting_')) {
            const settingKey = key.replace('setting_', '')

            // Upsert setting
            await prisma.storeSettings.upsert({
                where: { key: settingKey },
                update: { value },
                create: { key: settingKey, value }
            })
        }
    }

    revalidatePath('/')
    revalidatePath('/admin/settings')
}
