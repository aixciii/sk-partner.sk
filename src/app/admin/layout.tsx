import type { Metadata } from 'next'
import AdminLayoutClient from './layout-client'

export const metadata: Metadata = {
  title: '⚙️ Admin Panel | DeyeSolar.sk',
  robots: 'noindex, nofollow',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>
}
