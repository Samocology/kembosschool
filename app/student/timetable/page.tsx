'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Clock, Calendar, MapPin, User, BookOpen, Bell,
  ChevronLeft, ChevronRight, Download, Printer, Filter,
  Search, Eye, Coffee, Sunrise, Sunset, Moon, Zap,
  GraduationCap, School, Home, ChevronDown, Check,
  ArrowLeft, ArrowRight, RefreshCw, Star, Users
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

interface ClassItem {
  time: string
  subject: string
  teacher: string
  room: string
  type: 'lecture' | 'lab' | 'tutorial' | 'break'
  color: string
  icon: any
}

interface DaySchedule {
  day: string
  date: string
  classes: ClassItem[]
}

export default function Timetable() {
  const [currentWeek, setCurrentWeek] = useState('May 20-24, 2024')
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [showDayDetail, setShowDayDetail] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'weekly' | 'daily'>('weekly')
  const [activeDay, setActiveDay] = useState('Monday')

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  const today = 'Wednesday'

  const fullTimetable: DaySchedule[] = [
    {
      day: 'Monday',
      date: 'May 20',
      classes: [
        { time: '8:00-9:00 AM', subject: 'Mathematics', teacher: 'Mr. Adeleke', room: 'Science Block - Room 101', type: 'lecture', color: 'blue', icon: BookOpen },
        { time: '9:00-9:15 AM', subject: 'Short Break', teacher: '', room: '', type: 'break', color: 'gray', icon: Coffee },
        { time: '9:15-10:15 AM', subject: 'English Language', teacher: 'Mrs. Chukwu', room: 'Main Building - Room 202', type: 'lecture', color: 'purple', icon: BookOpen },
        { time: '10:15-10:30 AM', subject: 'Short Break', teacher: '', room: '', type: 'break', color: 'gray', icon: Coffee },
        { time: '10:30-11:30 AM', subject: 'Biology', teacher: 'Dr. Okonkwo', room: 'Science Block - Lab 303', type: 'lab', color: 'emerald', icon: Zap },
        { time: '11:30-12:00 PM', subject: 'Long Break', teacher: '', room: '', type: 'break', color: 'gray', icon: Coffee },
        { time: '12:00-1:00 PM', subject: 'Physics', teacher: 'Mrs. Adebayo', room: 'Science Block - Room 101', type: 'lecture', color: 'amber', icon: BookOpen },
        { time: '1:00-2:00 PM', subject: 'Geography', teacher: 'Mrs. Eze', room: 'Main Building - Room 305', type: 'tutorial', color: 'orange', icon: MapPin },
      ]
    },
    {
      day: 'Tuesday',
      date: 'May 21',
      classes: [
        { time: '8:00-9:00 AM', subject: 'Chemistry', teacher: 'Mr. Ibrahim', room: 'Science Block - Lab 404', type: 'lab', color: 'red', icon: Zap },
        { time: '9:00-9:15 AM', subject: 'Short Break', teacher: '', room: '', type: 'break', color: 'gray', icon: Coffee },
        { time: '9:15-10:15 AM', subject: 'History', teacher: 'Mr. Oluwaseun', room: 'Main Building - Room 505', type: 'lecture', color: 'indigo', icon: BookOpen },
        { time: '10:15-10:30 AM', subject: 'Short Break', teacher: '', room: '', type: 'break', color: 'gray', icon: Coffee },
        { time: '10:30-11:30 AM', subject: 'Economics', teacher: 'Dr. Nwachukwu', room: 'Main Building - Room 202', type: 'lecture', color: 'pink', icon: BookOpen },
        { time: '11:30-12:00 PM', subject: 'Long Break', teacher: '', room: '', type: 'break', color: 'gray', icon: Coffee },
        { time: '12:00-1:00 PM', subject: 'French', teacher: 'Mrs. Eze', room: 'Language Lab - Room 606', type: 'tutorial', color: 'teal', icon: GraduationCap },
        { time: '1:00-2:00 PM', subject: 'Mathematics Tutorial', teacher: 'Mr. Adeleke', room: 'Science Block - Room 101', type: 'tutorial', color: 'blue', icon: BookOpen },
      ]
    },
    {
      day: 'Wednesday',
      date: 'May 22',
      classes: [
        { time: '8:00-9:00 AM', subject: 'Physics Practical', teacher: 'Mrs. Adebayo', room: 'Science Block - Lab 404', type: 'lab', color: 'amber', icon: Zap },
        { time: '9:00-9:15 AM', subject: 'Short Break', teacher: '', room: '', type: 'break', color: 'gray', icon: Coffee },
        { time: '9:15-10:15 AM', subject: 'English Literature', teacher: 'Mrs. Chukwu', room: 'Main Building - Room 202', type: 'lecture', color: 'purple', icon: BookOpen },
        { time: '10:15-10:30 AM', subject: 'Short Break', teacher: '', room: '', type: 'break', color: 'gray', icon: Coffee },
        { time: '10:30-11:30 AM', subject: 'Civic Education', teacher: 'Mr. Bello', room: 'Main Building - Room 305', type: 'lecture', color: 'cyan', icon: School },
        { time: '11:30-12:00 PM', subject: 'Long Break', teacher: '', room: '', type: 'break', color: 'gray', icon: Coffee },
        { time: '12:00-1:00 PM', subject: 'Computer Science', teacher: 'Mr. Chukwudi', room: 'ICT Lab - Room 707', type: 'lab', color: 'emerald', icon: Zap },
        { time: '1:00-2:00 PM', subject: 'Physical Education', teacher: 'Coach Musa', room: 'Sports Field', type: 'tutorial', color: 'green', icon: Home },
      ]
    },
    {
      day: 'Thursday',
      date: 'May 23',
      classes: [
        { time: '8:00-9:00 AM', subject: 'Mathematics', teacher: 'Mr. Adeleke', room: 'Science Block - Room 101', type: 'lecture', color: 'blue', icon: BookOpen },
        { time: '9:00-9:15 AM', subject: 'Short Break', teacher: '', room: '', type: 'break', color: 'gray', icon: Coffee },
        { time: '9:15-10:15 AM', subject: 'Biology', teacher: 'Dr. Okonkwo', room: 'Science Block - Lab 303', type: 'lab', color: 'emerald', icon: Zap },
        { time: '10:15-10:30 AM', subject: 'Short Break', teacher: '', room: '', type: 'break', color: 'gray', icon: Coffee },
        { time: '10:30-11:30 AM', subject: 'Chemistry Tutorial', teacher: 'Mr. Ibrahim', room: 'Science Block - Lab 404', type: 'tutorial', color: 'red', icon: BookOpen },
        { time: '11:30-12:00 PM', subject: 'Long Break', teacher: '', room: '', type: 'break', color: 'gray', icon: Coffee },
        { time: '12:00-1:00 PM', subject: 'Technical Drawing', teacher: 'Mr. Okpara', room: 'Technical Lab - Room 808', type: 'lab', color: 'slate', icon: Zap },
        { time: '1:00-2:00 PM', subject: 'Music', teacher: 'Mrs. Adeola', room: 'Music Room - Room 909', type: 'tutorial', color: 'pink', icon: Bell },
      ]
    },
    {
      day: 'Friday',
      date: 'May 24',
      classes: [
        { time: '8:00-9:00 AM', subject: 'Chemistry', teacher: 'Mr. Ibrahim', room: 'Science Block - Lab 404', type: 'lab', color: 'red', icon: Zap },
        { time: '9:00-9:15 AM', subject: 'Short Break', teacher: '', room: '', type: 'break', color: 'gray', icon: Coffee },
        { time: '9:15-10:15 AM', subject: 'History', teacher: 'Mr. Oluwaseun', room: 'Main Building - Room 505', type: 'lecture', color: 'indigo', icon: BookOpen },
        { time: '10:15-10:30 AM', subject: 'Short Break', teacher: '', room: '', type: 'break', color: 'gray', icon: Coffee },
        { time: '10:30-11:30 AM', subject: 'Economics', teacher: 'Dr. Nwachukwu', room: 'Main Building - Room 202', type: 'lecture', color: 'pink', icon: BookOpen },
        { time: '11:30-12:00 PM', subject: 'Long Break', teacher: '', room: '', type: 'break', color: 'gray', icon: Coffee },
        { time: '12:00-12:30 PM', subject: 'Assembly', teacher: 'Dr. Okonkwo', room: 'School Hall', type: 'lecture', color: 'blue', icon: Users },
        { time: '12:30-1:30 PM', subject: 'Club Activities', teacher: 'Various', room: 'Various', type: 'tutorial', color: 'orange', icon: Star },
      ]
    },
  ]

  const currentDaySchedule = fullTimetable.find(d => d.day === activeDay)

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture': return 'border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-900/10'
      case 'lab': return 'border-l-4 border-l-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10'
      case 'tutorial': return 'border-l-4 border-l-amber-500 bg-amber-50/50 dark:bg-amber-900/10'
      case 'break': return 'border-l-4 border-l-gray-300 bg-gray-50/30 dark:bg-gray-800/30'
      default: return ''
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'lecture': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'
      case 'lab': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800'
      case 'tutorial': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800'
      default: return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  const handleDownload = () => {
    alert('Downloading timetable as PDF...')
  }

  const handlePrint = () => {
    alert('Preparing print layout...')
  }

  const handleDayClick = (day: DaySchedule) => {
    setSelectedDay(day.day)
    setShowDayDetail(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Class Timetable
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              SS3A • {currentWeek} • {fullTimetable.length} school days
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
              <Button
                size="sm"
                variant={viewMode === 'weekly' ? 'default' : 'ghost'}
                className={`h-8 text-xs font-medium ${viewMode === 'weekly' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
                onClick={() => setViewMode('weekly')}
              >
                Weekly
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'daily' ? 'default' : 'ghost'}
                className={`h-8 text-xs font-medium ${viewMode === 'daily' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
                onClick={() => setViewMode('daily')}
              >
                Daily
              </Button>
            </div>
            <Button variant="outline" size="sm" className="h-10 text-sm font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 gap-2" onClick={handlePrint}>
              <Printer className="w-4 h-4" /> Print
            </Button>
            <Button size="sm" className="h-10 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 gap-2 shadow-lg shadow-blue-600/20" onClick={handleDownload}>
              <Download className="w-4 h-4" /> Download
            </Button>
          </div>
        </div>

        {/* Week Navigation */}
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{currentWeek}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Day Tabs */}
        {viewMode === 'daily' && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {weekDays.map((day) => (
              <Button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`h-10 px-5 text-sm font-semibold whitespace-nowrap transition-all ${
                  activeDay === day
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                } ${day === today ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900' : ''}`}
              >
                {day.slice(0, 3)}
                {day === today && <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-blue-500" />}
              </Button>
            ))}
          </div>
        )}

        {/* Daily View */}
        {viewMode === 'daily' && currentDaySchedule && (
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 overflow-hidden">
            <CardHeader className="pb-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    {currentDaySchedule.day}
                    {currentDaySchedule.day === today && (
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">Today</span>
                    )}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {currentDaySchedule.date} • {currentDaySchedule.classes.filter(c => c.type !== 'break').length} classes
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {currentDaySchedule.classes.map((cls, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors ${getTypeColor(cls.type)} ${cls.type === 'break' ? 'opacity-60' : ''}`}
                  >
                    <div className="w-24 sm:w-32 flex-shrink-0">
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-white">
                        <Clock className="w-3.5 h-3.5 text-gray-500" />
                        {cls.time.split('-')[0]}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">to {cls.time.split('-')[1]}</p>
                    </div>

                    {cls.type !== 'break' ? (
                      <>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-900 dark:text-white">{cls.subject}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {cls.teacher}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {cls.room}
                            </span>
                          </div>
                        </div>
                        <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold border ${getTypeBadge(cls.type)}`}>
                          {cls.type}
                        </span>
                      </>
                    ) : (
                      <div className="flex-1 flex items-center gap-2">
                        <Coffee className="w-4 h-4 text-gray-400" />
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{cls.subject}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Weekly View */}
        {viewMode === 'weekly' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {fullTimetable.map((day) => (
              <Card 
                key={day.day} 
                className={`border-0 shadow-sm bg-white dark:bg-gray-800 overflow-hidden hover:shadow-md transition-all cursor-pointer ${
                  day.day === today ? 'ring-2 ring-blue-500/50' : ''
                }`}
                onClick={() => handleDayClick(day)}
              >
                <CardHeader className={`pb-3 border-b border-gray-100 dark:border-gray-700 ${
                  day.day === today ? 'bg-blue-50/50 dark:bg-blue-900/20' : 'bg-gray-50/50 dark:bg-gray-800/50'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-bold text-gray-900 dark:text-white">{day.day}</CardTitle>
                      <CardDescription className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{day.date}</CardDescription>
                    </div>
                    {day.day === today && (
                      <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                        Today
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="space-y-2">
                    {day.classes.filter(c => c.type !== 'break').slice(0, 6).map((cls, idx) => (
                      <div key={idx} className={`p-2.5 rounded-lg border ${getTypeColor(cls.type)} group`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />{cls.time}
                          </span>
                          <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold border ${getTypeBadge(cls.type)}`}>
                            {cls.type}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{cls.subject}</p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate mt-0.5">{cls.teacher} • {cls.room}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Legend */}
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Legend:</span>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-blue-500" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Lecture</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-emerald-500" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Lab</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-amber-500" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Tutorial</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-gray-300" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Break</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Day Detail Dialog */}
      <Dialog open={showDayDetail} onOpenChange={setShowDayDetail}>
        <DialogContent className="sm:max-w-lg bg-white dark:bg-gray-800 border-0 max-h-[80vh] overflow-y-auto">
          {selectedDay && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    selectedDay === today ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    <Calendar className={`w-5 h-5 ${
                      selectedDay === today ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
                    }`} />
                  </div>
                  <div>
                    <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white">{selectedDay}</DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-400">
                      {fullTimetable.find(d => d.day === selectedDay)?.date} • Full Schedule
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-3 py-4">
                {fullTimetable.find(d => d.day === selectedDay)?.classes.map((cls, idx) => (
                  <div key={idx} className={`p-4 rounded-xl border ${getTypeColor(cls.type)}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{cls.time}</span>
                      </div>
                      {cls.type !== 'break' && (
                        <span className={`inline-flex px-2 py-0.5 rounded-lg text-xs font-semibold border ${getTypeBadge(cls.type)}`}>
                          {cls.type}
                        </span>
                      )}
                    </div>
                    {cls.type !== 'break' ? (
                      <>
                        <p className="text-base font-bold text-gray-900 dark:text-white mb-2">{cls.subject}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {cls.teacher}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {cls.room}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Coffee className="w-4 h-4 text-gray-400" />
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{cls.subject}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}