import { updateStoreSettings, getStoreSettings } from '@/actions/settings'
import { createAnnouncement, getAnnouncements } from '@/actions/announcements'
import AnnouncementList from '@/components/admin/AnnouncementList'
import { Save, Plus } from 'lucide-react'

export default async function AdminSettingsPage() {
    const settings = await getStoreSettings()
    const announcements = await getAnnouncements()

    return (
        <div className="space-y-8 max-w-2xl">
            <h1 className="text-3xl font-bold">Store Settings</h1>

            {/* Announcement Bar Settings */}
            <div className="rounded-xl border bg-card shadow-sm p-6 space-y-6">
                <h2 className="text-lg font-semibold border-b pb-2">Announcement Bar</h2>

                {/* Global Toggle */}
                <form action={updateStoreSettings} className="flex items-end gap-4">
                    <div className="flex-1">
                        <label className="text-sm font-medium mb-1 block">Status</label>
                        <select
                            name="setting_announcement_enabled"
                            defaultValue={settings['announcement_enabled'] || 'false'}
                            className="w-full p-2 rounded-md border bg-background"
                        >
                            <option value="false">Disabled</option>
                            <option value="true">Enabled</option>
                        </select>
                    </div>
                    <button type="submit" className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
                        <Save className="w-4 h-4" /> Save Status
                    </button>
                </form>

                <div className="border-t pt-6">
                    <h3 className="text-sm font-medium mb-4">Messages</h3>

                    {/* List Existing */}
                    <AnnouncementList announcements={announcements} />

                    {/* Add New */}
                    <form action={createAnnouncement} className="mt-4 flex gap-2">
                        <input
                            name="text"
                            required
                            placeholder="Add a new announcement message..."
                            className="flex-1 p-2 rounded-md border bg-background"
                        />
                        <button type="submit" className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80 font-medium whitespace-nowrap">
                            <Plus className="w-4 h-4 inline mr-1" /> Add
                        </button>
                    </form>
                </div>
            </div>

            {/* Contact Page Settings */}
            <div className="rounded-xl border bg-card shadow-sm p-6 space-y-6">
                <h2 className="text-lg font-semibold border-b pb-2">Contact Information</h2>
                <form action={updateStoreSettings} className="space-y-6">

                    {/* Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div className="md:col-span-2">
                            <label className="text-sm font-medium mb-1 block">Phone Number</label>
                            <input
                                name="setting_contact_phone"
                                defaultValue={settings['contact_phone'] || '+212 600 000 000'}
                                className="w-full p-2 rounded-md border bg-background"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-1 block">Visibility</label>
                            <select
                                name="setting_contact_phone_visible"
                                defaultValue={settings['contact_phone_visible'] || 'true'}
                                className="w-full p-2 rounded-md border bg-background"
                            >
                                <option value="true">Visible</option>
                                <option value="false">Hidden</option>
                            </select>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div className="md:col-span-2">
                            <label className="text-sm font-medium mb-1 block">Email Address</label>
                            <input
                                name="setting_contact_email"
                                defaultValue={settings['contact_email'] || 'support@newpack.ma'}
                                className="w-full p-2 rounded-md border bg-background"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-1 block">Visibility</label>
                            <select
                                name="setting_contact_email_visible"
                                defaultValue={settings['contact_email_visible'] || 'true'}
                                className="w-full p-2 rounded-md border bg-background"
                            >
                                <option value="true">Visible</option>
                                <option value="false">Hidden</option>
                            </select>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div className="md:col-span-2">
                            <label className="text-sm font-medium mb-1 block">Office Address</label>
                            <input
                                name="setting_contact_address"
                                defaultValue={settings['contact_address'] || '123 Innovation Blvd, Casablanca'}
                                className="w-full p-2 rounded-md border bg-background"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-1 block">Visibility</label>
                            <select
                                name="setting_contact_address_visible"
                                defaultValue={settings['contact_address_visible'] || 'true'}
                                className="w-full p-2 rounded-md border bg-background"
                            >
                                <option value="true">Visible</option>
                                <option value="false">Hidden</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button type="submit" className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 w-full justify-center md:w-auto">
                            <Save className="w-4 h-4" /> Save Contact Info
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
