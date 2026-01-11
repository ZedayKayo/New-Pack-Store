import { getStoreSettings } from '@/actions/settings'
import ContactForm from '@/components/shop/ContactForm' // We need to extract the client form
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin } from "lucide-react"

export default async function ContactPage() {
    const settings = await getStoreSettings()

    // Defaults
    const phone = settings['contact_phone'] || '+212 600 000 000'
    const email = settings['contact_email'] || 'support@newpack.ma'
    const address = settings['contact_address'] || '123 Innovation Blvd, Casablanca'

    const showPhone = settings['contact_phone_visible'] !== 'false'
    const showEmail = settings['contact_email_visible'] !== 'false'
    const showAddress = settings['contact_address_visible'] !== 'false'

    return (
        <div className="min-h-screen py-20 bg-secondary/20">
            <div className="container px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <Badge className="mb-4 bg-primary text-primary-foreground hover:bg-primary/90">
                                Get in Touch
                            </Badge>
                            <h1 className="text-4xl font-extrabold tracking-tight mb-4">We'd love to hear from you.</h1>
                            <p className="text-muted-foreground text-lg">
                                Have a question about an order, a product, or just want to say hi? Fill out the form or reach us directly.
                            </p>
                        </div>

                        <div className="grid gap-6">
                            {showPhone && (
                                <Card className="border-none shadow-md">
                                    <CardContent className="p-6 flex items-start gap-4">
                                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">Phone</h3>
                                            <p className="text-muted-foreground">{phone}</p>
                                            <p className="text-xs text-muted-foreground mt-1">Mon-Fri 9am-6pm</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {showEmail && (
                                <Card className="border-none shadow-md">
                                    <CardContent className="p-6 flex items-start gap-4">
                                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">Email</h3>
                                            <p className="text-muted-foreground">{email}</p>
                                            <p className="text-xs text-muted-foreground mt-1">We reply within 24h</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {showAddress && (
                                <Card className="border-none shadow-md">
                                    <CardContent className="p-6 flex items-start gap-4">
                                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">Office</h3>
                                            <p className="text-muted-foreground">{address}</p>
                                            <p className="text-xs text-muted-foreground mt-1">Morocco</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <ContactForm />

                </div>
            </div>
        </div>
    )
}
