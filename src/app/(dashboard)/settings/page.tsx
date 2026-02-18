import { redirect } from "next/navigation"

export default function SettingsPage() {
    // Default redirect to the first setting page
    redirect("/settings/company")
}
