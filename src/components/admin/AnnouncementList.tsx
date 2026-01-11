'use client'

import { Trash2 } from 'lucide-react'
import { deleteAnnouncement } from '@/actions/announcements'

export default function AnnouncementList({ announcements }: { announcements: any[] }) {
    return (
        <div className="space-y-4">
            {announcements.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-md border bg-card">
                    <span className="font-medium">{item.text}</span>
                    <form action={deleteAnnouncement}>
                        <input type="hidden" name="id" value={item.id} />
                        <button className="p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            ))}
            {announcements.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No announcements added yet.</p>
            )}
        </div>
    )
}
