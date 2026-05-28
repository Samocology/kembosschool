'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  CheckCircle, XCircle, Clock, Search, Filter, Calendar,
  ChevronDown, Check, RefreshCw, Download, Save, Users,
  AlertCircle, TrendingUp, TrendingDown, Eye, MoreHorizontal,
  ClipboardList, UserCheck, UserX, AlarmClockCheck
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

interface Student {
  id: number
  name: string
  admission: string
  status: 'present' | 'absent' | 'late'
  time?: string
  remark?: string
}

interface AttendanceRecord {
  date: string
  class: string
  present: number
  absent: number
  late: number
  total: number
  submitted: boolean
  students: Student[]
}

export default function StaffAttendance() {
  const today = new Date().toISOString().split('T')[0]
  
  const [selectedClass, setSelectedClass] = useState('SS3A')
  const [selectedDate, setSelectedDate] = useState(today)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [isSaving, setIsSaving] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [showStudentDetail, setShowStudentDetail] = useState<Student | null>(null)
  const [attendanceMarked, setAttendanceMarked] = useState(false)

  const classes = ['SS3A', 'SS3B', 'SS2A']

  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'Chinedu Okafor', admission: 'KBS001', status: 'present', time: '7:45 AM' },
    { id: 2, name: 'Blessing Eze', admission: 'KBS002', status: 'present', time: '7:50 AM' },
    { id: 3, name: 'Ngozi Adeyemi', admission: 'KBS003', status: 'absent', remark: 'Sick' },
    { id: 4, name: 'Chisom Nwosu', admission: 'KBS004', status: 'present', time: '7:40 AM' },
    { id: 5, name: 'Tunde Akinsanya', admission: 'KBS005', status: 'present', time: '7:55 AM' },
    { id: 6, name: 'Zainab Mohammed', admission: 'KBS006', status: 'absent', remark: 'Medical' },
    { id: 7, name: 'Emeka Nwankwo', admission: 'KBS007', status: 'late', time: '8:15 AM', remark: 'Traffic' },
    { id: 8, name: 'Amara Obi', admission: 'KBS008', status: 'present', time: '7:48 AM' },
    { id: 9, name: 'Femi Balogun', admission: 'KBS009', status: 'present', time: '7:42 AM' },
    { id: 10, name: 'Aisha Ibrahim', admission: 'KBS010', status: 'late', time: '8:20 AM', remark: 'Rain' },
  ])

  // Past attendance records
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>([
    { 
      date: '2024-05-23', class: 'SS3A', present: 8, absent: 1, late: 1, total: 10, submitted: true,
      students: students.map(s => ({ ...s, id: s.id + 100, status: s.status === 'absent' ? 'present' : s.status }))
    },
    { 
      date: '2024-05-22', class: 'SS3A', present: 9, absent: 0, late: 1, total: 10, submitted: true,
      students: students.map(s => ({ ...s, id: s.id + 200, status: 'present' }))
    },
    { 
      date: '2024-05-21', class: 'SS3A', present: 7, absent: 2, late: 1, total: 10, submitted: true,
      students: students.map(s => ({ ...s, id: s.id + 300, status: Math.random() > 0.2 ? 'present' : 'absent' }))
    },
  ])

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.admission.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const presentCount = students.filter(s => s.status === 'present').length
  const absentCount = students.filter(s => s.status === 'absent').length
  const lateCount = students.filter(s => s.status === 'late').length
  const attendanceRate = ((presentCount + lateCount) / students.length * 100).toFixed(1)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800'
      case 'absent': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'
      case 'late': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800'
      default: return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4" />
      case 'absent': return <XCircle className="w-4 h-4" />
      case 'late': return <Clock className="w-4 h-4" />
      default: return null
    }
  }

  const handleMarkAttendance = (studentId: number, status: 'present' | 'absent' | 'late') => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          status,
          time: status === 'present' ? '7:50 AM' : status === 'late' ? '8:15 AM' : undefined,
          remark: status === 'absent' ? 'No reason given' : undefined
        }
      }
      return s
    }))
    setAttendanceMarked(true)
  }

  const handleMarkAllPresent = () => {
    setStudents(prev => prev.map(s => ({
      ...s,
      status: 'present' as const,
      time: '7:50 AM',
      remark: undefined
    })))
    setAttendanceMarked(true)
  }

  const handleSaveAttendance = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const newRecord: AttendanceRecord = {
      date: selectedDate,
      class: selectedClass,
      present: presentCount,
      absent: absentCount,
      late: lateCount,
      total: students.length,
      submitted: true,
      students: [...students]
    }
    
    setAttendanceHistory(prev => [newRecord, ...prev])
    setIsSaving(false)
    setAttendanceMarked(false)
    alert(`Attendance for ${selectedClass} saved successfully!`)
  }

  const handleViewHistory = () => {
    setShowHistory(true)
  }

  const handleExport = (format: string) => {
    alert(`Exporting attendance as ${format.toUpperCase()}...`)
  }

  const handleClassChange = (cls: string) => {
    setSelectedClass(cls)
    setAttendanceMarked(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Mark Attendance
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Record daily class attendance • Mathematics Department
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="h-10 text-sm font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-900 gap-2"
              onClick={handleViewHistory}
            >
              <Eye className="w-4 h-4" />
              View History
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-10 text-sm font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 gap-2">
                  <Download className="w-4 h-4" />
                  Export
                  <ChevronDown className="w-3.5 h-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => handleExport('pdf')} className="cursor-pointer">PDF</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('csv')} className="cursor-pointer">CSV</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('excel')} className="cursor-pointer">Excel</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-all hover:shadow-md cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{attendanceRate}%</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Present</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{presentCount}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-all hover:shadow-md cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <UserX className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Absent</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{absentCount}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-all hover:shadow-md cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <AlarmClockCheck className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Late</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{lateCount}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-all hover:shadow-md cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{students.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Class Selection & Date */}
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Select Class:</span>
              <div className="flex gap-2">
                {classes.map((cls) => (
                  <Button
                    key={cls}
                    onClick={() => handleClassChange(cls)}
                    className={`h-10 px-5 text-sm font-semibold transition-all ${
                      selectedClass === cls
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg shadow-gray-900/20'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {cls}
                  </Button>
                ))}
              </div>
              <div className="sm:ml-auto flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-44 h-10 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name or admission number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white h-10 text-sm"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 text-sm font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 gap-2">
                    <Filter className="w-4 h-4" />
                    {filterStatus === 'all' ? 'All Status' : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuLabel className="text-xs font-semibold">Filter</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {['all', 'present', 'absent', 'late'].map(s => (
                    <DropdownMenuItem key={s} onClick={() => setFilterStatus(s)} className="cursor-pointer">
                      <Check className={`w-4 h-4 mr-2 ${filterStatus === s ? 'opacity-100 text-blue-600' : 'opacity-0'}`} />
                      {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button 
                variant="outline"
                size="sm"
                className="h-10 text-sm font-medium text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 bg-white dark:bg-gray-900 gap-2"
                onClick={handleMarkAllPresent}
              >
                <CheckCircle className="w-4 h-4" />
                Mark All Present
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Student List */}
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 overflow-hidden">
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredStudents.map((student) => (
                <div 
                  key={student.id} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors gap-3"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      student.status === 'present' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                      student.status === 'absent' ? 'bg-red-100 dark:bg-red-900/30' :
                      'bg-amber-100 dark:bg-amber-900/30'
                    }`}>
                      {getStatusIcon(student.status)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{student.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{student.admission}</p>
                      {student.remark && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 italic">{student.remark}</p>
                      )}
                    </div>
                    {student.time && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="w-3 h-3" />
                        {student.time}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(student.status)}`}>
                      {getStatusIcon(student.status)}
                      {student.status}
                    </span>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant={student.status === 'present' ? 'default' : 'outline'}
                        className={`h-8 text-xs font-medium gap-1 transition-all ${
                          student.status === 'present'
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                            : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        onClick={() => handleMarkAttendance(student.id, 'present')}
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Present
                      </Button>
                      <Button
                        size="sm"
                        variant={student.status === 'absent' ? 'default' : 'outline'}
                        className={`h-8 text-xs font-medium gap-1 transition-all ${
                          student.status === 'absent'
                            ? 'bg-red-600 hover:bg-red-700 text-white shadow-sm'
                            : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        onClick={() => handleMarkAttendance(student.id, 'absent')}
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Absent
                      </Button>
                      <Button
                        size="sm"
                        variant={student.status === 'late' ? 'default' : 'outline'}
                        className={`h-8 text-xs font-medium gap-1 transition-all ${
                          student.status === 'late'
                            ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm'
                            : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        onClick={() => handleMarkAttendance(student.id, 'late')}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        Late
                      </Button>
                    </div>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-8 w-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      onClick={() => setShowStudentDetail(student)}
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {filteredStudents.length === 0 && (
                <div className="py-12 text-center">
                  <ClipboardList className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400 font-medium">No students found</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">Try adjusting your search</p>
                </div>
              )}
            </div>

            {/* Summary Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Present: <strong className="text-gray-900 dark:text-white">{presentCount}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Absent: <strong className="text-gray-900 dark:text-white">{absentCount}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Late: <strong className="text-gray-900 dark:text-white">{lateCount}</strong></span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="text-sm text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 h-10" onClick={() => alert('Resetting...')}>
                  Reset
                </Button>
                <Button 
                  className="text-sm font-semibold bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 h-10 gap-1.5"
                  onClick={handleSaveAttendance}
                  disabled={isSaving || !attendanceMarked}
                >
                  {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {isSaving ? 'Saving...' : 'Save Attendance'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Detail Dialog */}
      <Dialog open={!!showStudentDetail} onOpenChange={() => setShowStudentDetail(null)}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 border-0">
          {showStudentDetail && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    showStudentDetail.status === 'present' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                    showStudentDetail.status === 'absent' ? 'bg-red-100 dark:bg-red-900/30' :
                    'bg-amber-100 dark:bg-amber-900/30'
                  }`}>
                    {getStatusIcon(showStudentDetail.status)}
                  </div>
                  <div>
                    <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white">{showStudentDetail.name}</DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-400">{showStudentDetail.admission}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white mt-1 capitalize">{showStudentDetail.status}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Time</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">{showStudentDetail.time || 'N/A'}</p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Remark</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{showStudentDetail.remark || 'No remarks'}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* History Dialog */}
      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent className="sm:max-w-2xl bg-white dark:bg-gray-800 border-0 max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">Attendance History</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">Past attendance records for {selectedClass}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            {attendanceHistory.map((record, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-900 dark:text-white">{record.date}</span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Submitted</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                    <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">{record.present}</p>
                    <p className="text-xs text-gray-500">Present</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-red-50 dark:bg-red-900/20">
                    <p className="text-lg font-bold text-red-700 dark:text-red-400">{record.absent}</p>
                    <p className="text-xs text-gray-500">Absent</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                    <p className="text-lg font-bold text-amber-700 dark:text-amber-400">{record.late}</p>
                    <p className="text-xs text-gray-500">Late</p>
                  </div>
                </div>
              </div>
            ))}
            {attendanceHistory.length === 0 && (
              <p className="text-center text-gray-500 py-8">No history records yet</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}