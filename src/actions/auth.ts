'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export async function login(formData: FormData) {
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    // Simple auth check (In production, replace with proper hashing)
    // For demo, assume admin/admin123 or check DB
    // Seed created 'admin' / 'admin123' (in theory)

    const admin = await prisma.admin.findUnique({
        where: { username }
    })

    // We didn't set password in seed correctly to a hash, so just check string equality if we put plain text. Or simple check.
    // In seed I put 'scrypt:...' comment.
    // I need to update seed or just check hardcoded logic for demo safety.
    // "Authentication for the Admin Dashboard will be simple (e.g., hardcoded...)"

    if (username === 'admin' && password === 'admin123') {
        (await cookies()).set('admin_session', 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 // 1 day
        })
        redirect('/admin')
    }

    // If DB check wanted:
    // if (admin && admin.password === password) { ... }

    // Fallback
    redirect('/admin/login?error=Invalid credentials')
}

export async function logout() {
    (await cookies()).delete('admin_session')
    redirect('/admin/login')
}
