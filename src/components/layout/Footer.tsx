import Link from 'next/link'

export function Footer() {
    return (
        <footer className="w-full border-t bg-background py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    © {new Date().getFullYear()} New Pack. All rights reserved.
                </p>
                <div className="flex gap-4">
                    <Link href="/admin" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                        Admin
                    </Link>
                </div>
            </div>
        </footer>
    )
}
