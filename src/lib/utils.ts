import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getProductImage(imagesJson: string | null | undefined): string | null {
    if (!imagesJson) return null;
    try {
        const images = JSON.parse(imagesJson);
        if (Array.isArray(images) && images.length > 0) {
            return images[0];
        }
    } catch (e) {
        // Fallback if it's not valid JSON or other error, though we expect valid JSON.
        // If it was stored as a plain string in legacy (unlikely with our schema), handle it? 
        // Our schema says String @default("[]"), so parsing should be safe-ish.
        console.error("Failed to parse product images", e);
    }
    return null;
}
