import { getStoreSettings } from '@/actions/settings'
import { getAnnouncements } from '@/actions/announcements'

export default async function AnnouncementBar() {
    const settings = await getStoreSettings()
    const announcements = await getAnnouncements()

    // Only show if globally enabled
    const isEnabled = settings['announcement_enabled'] === 'true'
    if (!isEnabled || announcements.length === 0) return null

    return (
        <div className="bg-foreground text-background py-2 overflow-hidden relative z-50 flex">
            {/* First Copy */}
            <div className="animate-marquee flex whitespace-nowrap shrink-0 min-w-full items-center justify-around">
                {announcements.map((a) => (
                    <span key={a.id} className="mx-20 text-xs font-bold tracking-widest uppercase">
                        {a.text}
                    </span>
                ))}
            </div>

            {/* Second Copy (Duplicate for seamless loop) */}
            <div className="animate-marquee flex whitespace-nowrap shrink-0 min-w-full items-center justify-around">
                {announcements.map((a) => (
                    <span key={`dup-${a.id}`} className="mx-20 text-xs font-bold tracking-widest uppercase">
                        {a.text}
                    </span>
                ))}
            </div>
        </div>
    )
}
