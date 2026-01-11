'use client'

import { login } from '@/actions/auth'
import { useState } from 'react' // For error state handling if action returns error

export default function AdminLoginPage() {
    // Note: Using client form for simplicity with action
    // But login action is server action
    return (
        <div className="flex h-screen items-center justify-center bg-muted/40">
            <div className="w-full max-w-sm rounded-lg border bg-background p-8 shadow-sm">
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
                <form action={login} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Username</label>
                        <input name="username" className="w-full p-2 border rounded-md" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Password</label>
                        <input type="password" name="password" className="w-full p-2 border rounded-md" required />
                    </div>
                    <button className="w-full py-2 bg-primary text-primary-foreground rounded-md font-medium">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}
