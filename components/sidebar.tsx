'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  FileText, 
  Users, 
  Settings, 
  LogOut,
  BookOpen,
  MessageSquare,
  BarChart3,
  CreditCard,
  Clock,
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: number
}

interface SidebarProps {
  role: 'student' | 'parent' | 'staff' | 'admin'
  onLogout?: () => void
}

export function Sidebar({ role, onLogout }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const getNavItems = (): NavItem[] => {
    switch (role) {
      case 'student':
        return [
          { label: 'Dashboard', href: '/student', icon: <Home className="w-5 h-5" /> },
          { label: 'Results', href: '/student/results', icon: <Award className="w-5 h-5" /> },
          { label: 'Assignments', href: '/student/assignments', icon: <FileText className="w-5 h-5" /> },
          { label: 'Timetable', href: '/student/timetable', icon: <Clock className="w-5 h-5" /> },
          { label: 'E-Learning', href: '/student/elearning', icon: <BookOpen className="w-5 h-5" /> },
          { label: 'Attendance', href: '/student/attendance', icon: <Users className="w-5 h-5" /> },
          { label: 'CBT Exams', href: '/student/cbt', icon: <BarChart3 className="w-5 h-5" /> },
        ]
      case 'parent':
        return [
          { label: 'Dashboard', href: '/parent', icon: <Home className="w-5 h-5" /> },
          { label: 'Child Progress', href: '/parent/progress', icon: <Award className="w-5 h-5" /> },
          { label: 'Payments', href: '/parent/payments', icon: <CreditCard className="w-5 h-5" /> },
          { label: 'Attendance', href: '/parent/attendance', icon: <Clock className="w-5 h-5" /> },
          { label: 'Messages', href: '/parent/messages', icon: <MessageSquare className="w-5 h-5" /> },
          { label: 'Announcements', href: '/parent/announcements', icon: <FileText className="w-5 h-5" /> },
        ]
      case 'staff':
        return [
          { label: 'Dashboard', href: '/staff', icon: <Home className="w-5 h-5" /> },
          { label: 'Results Management', href: '/staff/results', icon: <Award className="w-5 h-5" /> },
          { label: 'Attendance', href: '/staff/attendance', icon: <Clock className="w-5 h-5" /> },
          { label: 'Assignments', href: '/staff/assignments', icon: <FileText className="w-5 h-5" /> },
          { label: 'Class Management', href: '/staff/classes', icon: <Users className="w-5 h-5" /> },
          { label: 'Messages', href: '/staff/messages', icon: <MessageSquare className="w-5 h-5" /> },
        ]
      case 'admin':
        return [
          { label: 'Dashboard', href: '/admin', icon: <Home className="w-5 h-5" /> },
          { label: 'Users', href: '/admin/users', icon: <Users className="w-5 h-5" /> },
          { label: 'Payments', href: '/admin/payments', icon: <CreditCard className="w-5 h-5" /> },
          { label: 'Reports', href: '/admin/reports', icon: <BarChart3 className="w-5 h-5" /> },
          { label: 'Announcements', href: '/admin/announcements', icon: <FileText className="w-5 h-5" /> },
          { label: 'Settings', href: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
        ]
      default:
        return []
    }
  }

  const navItems = getNavItems()

  return (
    <aside className={cn(
      "bg-card border-r border-border flex flex-col h-screen sticky top-0 transition-all duration-300",
      isCollapsed ? "w-20" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-border">
        <div className="flex items-center justify-between gap-2">
          {!isCollapsed && (
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <div className="min-w-0">
                <h1 className="font-bold text-sm text-foreground truncate">Kembos</h1>
                <p className="text-xs text-muted-foreground truncate">School Portal</p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0 mx-auto">
              <span className="text-white font-bold text-lg">K</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 flex-shrink-0"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? 'default' : 'ghost'}
              size={isCollapsed ? "icon" : "default"}
              className={cn(
                'w-full justify-start gap-3',
                isCollapsed && 'justify-center',
                pathname === item.href && 'bg-accent text-accent-foreground hover:bg-accent'
              )}
              title={isCollapsed ? item.label : undefined}
            >
              {item.icon}
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left text-sm">{item.label}</span>
                  {item.badge && (
                    <span className="bg-primary text-primary-foreground rounded-full text-xs px-2 py-1">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Button>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-2 sm:p-4 border-t border-border space-y-2">
        <Button
          onClick={onLogout}
          variant="ghost"
          size={isCollapsed ? "icon" : "default"}
          className={cn(
            'w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10',
            isCollapsed && 'justify-center'
          )}
          title={isCollapsed ? "Logout" : undefined}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </aside>
  )
}
