'use client'

import { useState } from 'react'
import { Send, X, MessageCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface WhatsAppButtonProps {
    phoneNumber?: string
}

export default function WhatsAppButton({ phoneNumber = '+212600000000' }: WhatsAppButtonProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState('')

    const handleSend = () => {
        if (!message.trim()) return

        // Format phone number: remove spaces, ensure it starts with correct prefix if needed
        // For now, assuming the admin enters a valid format or we strip non-digits
        const cleanPhone = phoneNumber.replace(/[^\d+]/g, '')

        const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
        window.open(url, '_blank')
        setIsOpen(false)
        setMessage('')
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            {/* Chat Popup */}
            <div className={cn(
                "transition-all duration-300 ease-in-out origin-bottom-right transform",
                isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4 pointer-events-none"
            )}>
                <Card className="w-80 shadow-2xl border-none overflow-hidden">
                    <div className="bg-[#25D366] p-4 text-white flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-lg">Chat with us</h3>
                            <p className="text-xs opacity-90">Usually replies in minutes</p>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="p-4 bg-secondary/10">
                        <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm text-sm mb-4 inline-block max-w-[85%]">
                            Hi there! 👋<br />How can we help you today?
                        </div>
                        <textarea
                            className="w-full p-3 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]/50 min-h-[100px] resize-none"
                            placeholder="Type your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault()
                                    handleSend()
                                }
                            }}
                        />
                        <Button
                            className="w-full mt-3 bg-[#25D366] hover:bg-[#128C7E] text-white transition-colors"
                            onClick={handleSend}
                        >
                            <Send size={16} className="mr-2" /> Start Chat
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center group"
                aria-label="Chat on WhatsApp"
            >
                {/* Custom WhatsApp SVG Icon or Lucide */}
                <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={cn("w-8 h-8 transition-transform duration-300", isOpen ? "scale-0 opacity-0 absolute" : "scale-100 opacity-100")}
                >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <X
                    className={cn("w-8 h-8 absolute transition-transform duration-300", isOpen ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 -rotate-90")}
                />
            </button>
        </div>
    )
}
