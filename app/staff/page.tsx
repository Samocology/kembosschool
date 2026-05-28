'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Users, FileText, BarChart3, Clock, Award, BookOpen,
  TrendingUp, TrendingDown, Calendar, CheckCircle, AlertCircle, 
  MessageSquare, Settings, Bell, ChevronRight,
  Search, Plus, Eye, Edit, MoreHorizontal, ArrowUpRight,
  GraduationCap, ClipboardList, PenTool, Send, Target,
  Activity, Star, Zap, ChevronDown, X, Filter,
  Download, RefreshCw, Mail, Phone, MapPin, Menu
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Types
interface ClassItem {
  id: number
  name: string
  students: number
  subject: string
  schedule: string
  room: string
  nextTopic: string
  averageScore: number
  trend: 'up' | 'down'
  attendance: number
  pendingAssignments: number
}

interface Activity {
  id: number
  action: string
  details: string
  date: string
  time: string
  type: 'grade' | 'attendance' | 'assignment' | 'message' | 'cbt'
  icon: any
}

interface Stat {
  label: string
  value: string
  icon: any
  change: string
  trend: 'up' | 'down'
  color: string
}

export default function StaffDashboard() {
  const [greeting, setGreeting] = useState('')
  const [currentTime, setCurrentTime] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('This Term')
  const [showNewAssignment, setShowNewAssignment] = useState(false)

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 17) setGreeting('Good afternoon')
    else setGreeting('Good evening')
    
    setCurrentTime(new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    }))
  }, [])

  const [classes] = useState<ClassItem[]>([
    { 
      id: 1, 
      name: 'SS3A', 
      students: 45, 
      subject: 'Mathematics', 
      schedule: 'Mon, Wed, Fri • 8:00 - 9:30 AM', 
      room: 'Science Block - Room 101', 
      nextTopic: 'Calculus - Integration by Parts',
      averageScore: 78,
      trend: 'up',
      attendance: 94,
      pendingAssignments: 3
    },
    { 
      id: 2, 
      name: 'SS3B', 
      students: 43, 
      subject: 'Mathematics', 
      schedule: 'Tue, Thu • 10:00 - 11:30 AM', 
      room: 'Science Block - Room 102', 
      nextTopic: 'Statistics - Probability Distributions',
      averageScore: 82,
      trend: 'up',
      attendance: 96,
      pendingAssignments: 2
    },
    { 
      id: 3, 
      name: 'SS2A', 
      students: 42, 
      subject: 'Mathematics', 
      schedule: 'Mon, Wed • 2:00 - 3:30 PM', 
      room: 'Main Building - Room 201', 
      nextTopic: 'Algebra - Complex Quadratic Equations',
      averageScore: 75,
      trend: 'down',
      attendance: 91,
      pendingAssignments: 5
    },
  ])

  const stats: Stat[] = [
    { 
      label: 'Total Students', 
      value: '130', 
      icon: Users, 
      change: '+5 this term', 
      trend: 'up',
      color: 'blue'
    },
    { 
      label: 'Avg Performance', 
      value: '78.3%', 
      icon: Target, 
      change: '+2.5%', 
      trend: 'up',
      color: 'emerald'
    },
    { 
      label: 'Assignments', 
      value: '10', 
      icon: FileText, 
      change: '3 pending', 
      trend: 'down',
      color: 'amber'
    },
    { 
      label: 'Attendance Rate', 
      value: '93.7%', 
      icon: CheckCircle, 
      change: '+0.8%', 
      trend: 'up',
      color: 'purple'
    },
  ]

  const recentActivities: Activity[] = [
    { 
      id: 1, 
      action: 'Graded Mathematics Test', 
      details: 'SS3A - 45 scripts • Average: 78% • Top score: 96%',
      date: '2024-05-24', 
      time: '2:30 PM', 
      type: 'grade',
      icon: Award
    },
    { 
      id: 2, 
      action: 'Posted New Assignment', 
      details: 'SS3B - Quadratic Equations • Due: May 30, 2024 • 25 questions',
      date: '2024-05-23', 
      time: '10:15 AM', 
      type: 'assignment',
      icon: FileText
    },
    { 
      id: 3, 
      action: 'Marked Attendance', 
      details: 'SS3B - 42 present, 1 excused absence',
      date: '2024-05-23', 
      time: '8:05 AM', 
      type: 'attendance',
      icon: ClipboardList
    },
    { 
      id: 4, 
      action: 'Created CBT Quiz', 
      details: 'Physics Department • 30 questions • 45 min duration • SS2 & SS3',
      date: '2024-05-22', 
      time: '4:00 PM', 
      type: 'cbt',
      icon: BarChart3
    },
    { 
      id: 5, 
      action: 'Sent Parent Messages', 
      details: 'Progress reports sent to 88 parents of SS3A & SS3B students',
      date: '2024-05-22', 
      time: '11:00 AM', 
      type: 'message',
      icon: Send
    },
  ]

  const upcomingTasks = [
    { task: 'Grade SS2A assignments', due: 'Today by 5:00 PM', priority: 'high', completed: false },
    { task: 'Submit exam questions to HOD', due: 'Tomorrow by 12:00 PM', priority: 'high', completed: false },
    { task: 'Prepare lesson notes - Week 9', due: 'May 26 by 4:00 PM', priority: 'medium', completed: false },
    { task: 'Parent-Teacher conference prep', due: 'May 27 by 9:00 AM', priority: 'medium', completed: true },
    { task: 'Update student performance records', due: 'May 28 by 4:00 PM', priority: 'low', completed: false },
  ]

  const performanceData = [
    { class: 'SS3A', score: 78, color: 'bg-blue-500' },
    { class: 'SS3B', score: 82, color: 'bg-emerald-500' },
    { class: 'SS2A', score: 75, color: 'bg-amber-500' },
  ]

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsRefreshing(false)
  }

  const getTypeStyles = (type: string) => {
    const styles = {
      grade: { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800', dot: 'bg-blue-500', badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800' },
      attendance: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800', dot: 'bg-emerald-500', badge: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' },
      assignment: { bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800', dot: 'bg-amber-500', badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800' },
      message: { bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-800', dot: 'bg-purple-500', badge: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800' },
      cbt: { bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-200 dark:border-orange-800', dot: 'bg-orange-500', badge: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800' },
    }
    return styles[type as keyof typeof styles] || styles.grade
  }

  const getStatStyles = (color: string) => {
    const styles = {
      blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', icon: 'text-blue-600 dark:text-blue-400', badge: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800' },
      emerald: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', icon: 'text-emerald-600 dark:text-emerald-400', badge: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' },
      amber: { bg: 'bg-amber-100 dark:bg-amber-900/30', icon: 'text-amber-600 dark:text-amber-400', badge: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800' },
      purple: { bg: 'bg-purple-100 dark:bg-purple-900/30', icon: 'text-purple-600 dark:text-purple-400', badge: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800' },
    }
    return styles[color as keyof typeof styles] || styles.blue
  }

  const getPriorityStyles = (priority: string) => {
    const styles = {
      high: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
      medium: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
      low: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    }
    return styles[priority as keyof typeof styles] || styles.low
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {greeting} • {currentTime}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight mt-1">
                Mr. Adeleke
              </h1>
            </div>
            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-gray-200 dark:border-gray-700">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Mathematics Department</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-10 text-sm font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-900 gap-2 transition-all">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  {selectedPeriod}
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuLabel className="text-gray-900 dark:text-white font-semibold text-xs">Select Period</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {['This Term', 'Last Term', 'This Year', 'All Time'].map(period => (
                  <DropdownMenuItem key={period} onClick={() => setSelectedPeriod(period)} className="text-sm cursor-pointer">
                    {period}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              variant="outline" 
              size="icon" 
              className="h-10 w-10 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 relative"
              onClick={() => alert('Notifications')}
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-red-500/30">3</span>
            </Button>

            <Button 
              size="sm" 
              className="h-10 text-sm font-semibold bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 px-4 gap-2 shadow-lg shadow-gray-900/10 dark:shadow-white/5 transition-all"
              onClick={() => alert('Settings')}
            >
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            const styles = getStatStyles(stat.color)
            return (
              <Card 
                key={stat.label} 
                className="group border-0 shadow-sm hover:shadow-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-11 h-11 rounded-xl ${styles.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-5 h-5 ${styles.icon}`} />
                    </div>
                    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-semibold ${
                      stat.trend === 'up' ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' : 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
                    }`}>
                      {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {stat.change}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
                  <p className="text-[28px] font-bold text-gray-900 dark:text-white tracking-tight mt-1">{stat.value}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Classes - Left 2 Columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Class Performance Overview */}
            <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 overflow-hidden">
              <CardHeader className="pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      Class Performance
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Average scores across your classes
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
                    <RefreshCw className={`w-4 h-4 text-gray-500 ${isRefreshing ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-5">
                  {performanceData.map((item) => (
                    <div key={item.class} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${item.color}`} />
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.class}</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{item.score}%</span>
                      </div>
                      <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${item.color}`}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Class Cards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Your Classes</h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-sm text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600"
                  onClick={() => alert('View all classes')}
                >
                  View All
                </Button>
              </div>

              {classes.map((cls) => (
                <Card 
                  key={cls.id} 
                  className="group border-0 shadow-sm hover:shadow-lg bg-white dark:bg-gray-800 transition-all duration-300 overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                            {cls.name.replace('SS', '')}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{cls.name}</h3>
                              <span className={`inline-flex items-center gap-1 text-xs font-semibold ${
                                cls.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                              }`}>
                                {cls.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                {cls.averageScore}%
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{cls.subject} • {cls.room}</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => alert('Manage class')} className="cursor-pointer">
                              <Settings className="w-4 h-4 mr-2" /> Manage Class
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => alert('View students')} className="cursor-pointer">
                              <Users className="w-4 h-4 mr-2" /> Student List
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => alert('Reports')} className="cursor-pointer">
                              <BarChart3 className="w-4 h-4 mr-2" /> View Reports
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                        <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 text-center">
                          <Users className="w-4 h-4 text-gray-500 mx-auto mb-1" />
                          <p className="text-lg font-bold text-gray-900 dark:text-white">{cls.students}</p>
                          <p className="text-[10px] text-gray-500 uppercase font-semibold">Students</p>
                        </div>
                        <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 text-center">
                          <CheckCircle className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                          <p className="text-lg font-bold text-gray-900 dark:text-white">{cls.attendance}%</p>
                          <p className="text-[10px] text-gray-500 uppercase font-semibold">Attendance</p>
                        </div>
                        <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 text-center">
                          <Award className="w-4 h-4 text-purple-500 mx-auto mb-1" />
                          <p className="text-lg font-bold text-gray-900 dark:text-white">{cls.averageScore}%</p>
                          <p className="text-[10px] text-gray-500 uppercase font-semibold">Avg Score</p>
                        </div>
                        <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 text-center">
                          <FileText className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                          <p className="text-lg font-bold text-gray-900 dark:text-white">{cls.pendingAssignments}</p>
                          <p className="text-[10px] text-gray-500 uppercase font-semibold">Pending</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <Calendar className="w-4 h-4" />
                        <span>{cls.schedule}</span>
                      </div>

                      <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 mb-4">
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">Next Topic</p>
                        <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">{cls.nextTopic}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 text-xs font-semibold h-9 gap-1.5 transition-all"
                          onClick={() => alert('Enter Grades')}
                        >
                          <PenTool className="w-3.5 h-3.5" />
                          Enter Grades
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 text-xs font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 h-9 gap-1.5"
                          onClick={() => alert('Mark Attendance')}
                        >
                          <ClipboardList className="w-3.5 h-3.5" />
                          Attendance
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 text-xs font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 h-9 gap-1.5"
                          onClick={() => setShowNewAssignment(true)}
                        >
                          <FileText className="w-3.5 h-3.5" />
                          Assignment
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {[
                  { label: 'Enter Grades', icon: PenTool },
                  { label: 'Mark Attendance', icon: ClipboardList },
                  { label: 'Create Assignment', icon: FileText },
                  { label: 'Create CBT Quiz', icon: BarChart3 },
                  { label: 'Message Parents', icon: Send },
                  { label: 'View Reports', icon: BarChart3 },
                ].map((action) => (
                  <Button
                    key={action.label}
                    variant="ghost"
                    className="w-full justify-start text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 h-11 gap-3 transition-all rounded-xl group"
                    onClick={() => alert(`Opening ${action.label}...`)}
                  >
                    <action.icon className="w-4 h-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    {action.label}
                    <ChevronRight className="w-4 h-4 ml-auto text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Tasks */}
            <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    Tasks
                  </CardTitle>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {upcomingTasks.filter(t => !t.completed).length} remaining
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {upcomingTasks.map((task, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                      task.completed 
                        ? 'bg-gray-50 dark:bg-gray-900/30 border-gray-100 dark:border-gray-700 opacity-60' 
                        : 'bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <input 
                      type="checkbox" 
                      checked={task.completed}
                      onChange={() => {}}
                      className="mt-0.5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500" 
                    />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'font-medium text-gray-900 dark:text-white'}`}>
                        {task.task}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{task.due}</p>
                    </div>
                    <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold border ${getPriorityStyles(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity Feed */}
            <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-0">
                {recentActivities.map((activity) => {
                  const styles = getTypeStyles(activity.type)
                  const Icon = activity.icon
                  return (
                    <div 
                      key={activity.id} 
                      className="flex gap-3 p-3 -mx-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer group relative"
                      onClick={() => alert(`${activity.action}\n\n${activity.details}`)}
                    >
                      <div className="relative flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-lg ${styles.bg} border ${styles.border} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="w-px flex-1 bg-gray-200 dark:bg-gray-700 mt-1.5" />
                      </div>
                      <div className="flex-1 pb-3">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{activity.action}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{activity.details}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[11px] text-gray-400">{activity.date}</span>
                          <span className="text-[11px] text-gray-400">•</span>
                          <span className="text-[11px] text-gray-400">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* New Assignment Dialog */}
      <Dialog open={showNewAssignment} onOpenChange={setShowNewAssignment}>
        <DialogContent className="sm:max-w-lg bg-white dark:bg-gray-800 border-0">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">Create Assignment</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">Post a new assignment for your class</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-900 dark:text-gray-200">Class</label>
              <select className="w-full h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 text-sm">
                {classes.map(c => <option key={c.id}>{c.name} - {c.subject}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-900 dark:text-gray-200">Title</label>
              <Input placeholder="Assignment title" className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 h-10" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-900 dark:text-gray-200">Due Date</label>
              <Input type="date" className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 h-10" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewAssignment(false)} className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600">Cancel</Button>
            <Button onClick={() => { setShowNewAssignment(false); alert('Assignment created!') }} className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}