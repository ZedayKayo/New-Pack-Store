import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    // Create Admin
    const admin = await prisma.admin.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            password: 'scrypt:...' // Simplified hash for demo or plaintext if simple auth used. 
            // Actually, plan said "Simple Auth". I'll store a mock hash or plain text and handle it in login.
            // Let's use simple plaintext for demo safety? No, "Professional".
            // I'll simulate a hash: "admin123"
        },
    })

    // Actually, I'll put "admin123" as password for now and implement simple check.

    // Categories
    const catElectronics = await prisma.category.create({
        data: { name: 'Electronics', slug: 'electronics' }
    })
    const catClothing = await prisma.category.create({
        data: { name: 'Clothing', slug: 'clothing' }
    })

    // Products
    await prisma.product.create({
        data: {
            name: 'Ultra Book Pro',
            description: 'A powerful laptop for professionals.',
            price: 1299.99,
            images: JSON.stringify(['https://placehold.co/600x400/png']),
            categoryId: catElectronics.id,
            featured: true
        }
    })

    await prisma.product.create({
        data: {
            name: 'Wireless Headphones',
            description: 'Noise cancelling headphones.',
            price: 199.99,
            images: JSON.stringify(['https://placehold.co/600x400/png']),
            categoryId: catElectronics.id
        }
    })

    await prisma.product.create({
        data: {
            name: 'Classic T-Shirt',
            description: '100% Cotton t-shirt.',
            price: 29.99,
            images: JSON.stringify(['https://placehold.co/600x400/png']),
            categoryId: catClothing.id
        }
    })

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
