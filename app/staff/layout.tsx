'use client'

import { Sidebar } from '@/components/sidebar'

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const handleLogout = () => {
    localStorage.removeItem('userRole')
    localStorage.removeItem('userEmail')
    window.location.href = '/login'
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="staff" onLogout={handleLogout} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
