import Image from 'next/image'
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative w-full py-20 md:py-32 lg:py-48 bg-black text-white overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-40">
                    {/* Placeholder for a hero background if user adds one later */}
                    <div className="w-full h-full bg-gradient-to-r from-violet-900 to-indigo-900 animate-pulse" />
                </div>
                <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
                    <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 border-none backdrop-blur-sm">
                        Our Story
                    </Badge>
                    <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                        Redefining Quality.
                    </h1>
                    <p className="mt-6 max-w-[700px] text-lg md:text-xl text-gray-300">
                        At New Pack, we believe in contrasting the ordinary. We curate premium products that blend aesthetics with functionality.
                    </p>
                </div>
            </section>

            {/* Values Section */}
            <section className="w-full py-20 bg-background">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-12 lg:grid-cols-3">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="p-4 rounded-full bg-primary/10 mb-2">
                                <span className="text-3xl">💎</span>
                            </div>
                            <h3 className="text-xl font-bold">Premium Quality</h3>
                            <p className="text-muted-foreground">
                                We source only the finest materials and products, ensuring longevity and style in every purchase.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="p-4 rounded-full bg-primary/10 mb-2">
                                <span className="text-3xl">🚀</span>
                            </div>
                            <h3 className="text-xl font-bold">Fast Delivery</h3>
                            <p className="text-muted-foreground">
                                Our logistics network ensures your products arrive safely and quickly, wherever you are.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="p-4 rounded-full bg-primary/10 mb-2">
                                <span className="text-3xl">🤝</span>
                            </div>
                            <h3 className="text-xl font-bold">Customer First</h3>
                            <p className="text-muted-foreground">
                                Our dedicated support team is here to ensure your shopping experience is seamless from start to finish.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Text Section */}
            <section className="w-full py-20 bg-secondary/20">
                <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-4">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">From humble beginnings to your doorstep.</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            New Pack started with a simple idea: that shopping online should be an experience, not just a transaction.
                            Founded in Morocco, we sought to bridge the gap between high-end international trends and local accessibility.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Today, we are proud to serve thousands of customers, constantly expanding our catalog with products that matter.
                        </p>
                    </div>
                    <div className="flex-1 relative aspect-video rounded-xl overflow-hidden shadow-2xl bg-white">
                        {/* Placeholder for an office or team image */}
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-muted-foreground">
                            Image: Our Team
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
