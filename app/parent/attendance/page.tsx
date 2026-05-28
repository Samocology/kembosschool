'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle, XCircle, Calendar, Clock, TrendingUp, 
  TrendingDown, AlertTriangle, Download, Filter, Eye,
  ChevronDown, Check, ChevronLeft, ChevronRight
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

interface AttendanceRecord {
  date: string
  day: string
  status: 'present' | 'absent' | 'late' | 'excused'
  checkIn?: string
  checkOut?: string
  remarks?: string
}

interface ChildAttendance {
  name: string
  class: string
  studentId: string
  avatar: string
  attendance: number
  present: number
  absent: number
  late: number
  excused: number
  daysMarked: number
  trend: 'up' | 'down'
  records: AttendanceRecord[]
}

export default function ParentAttendance() {
  const [selectedChild, setSelectedChild] = useState<ChildAttendance | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [filterMonth, setFilterMonth] = useState('May 2024')
  const [currentMonth, setCurrentMonth] = useState('May 2024')

  const childrenAttendance: ChildAttendance[] = [
    {
      name: 'John Doe',
      class: 'SS3A',
      studentId: 'STU-2024-001',
      avatar: 'JD',
      attendance: 94,
      present: 18,
      absent: 2,
      late: 1,
      excused: 1,
      daysMarked: 22,
      trend: 'down',
      records: [
        { date: '2024-05-24', day: 'Mon', status: 'present', checkIn: '7:45 AM', checkOut: '3:00 PM' },
        { date: '2024-05-23', day: 'Fri', status: 'present', checkIn: '7:50 AM', checkOut: '3:00 PM' },
        { date: '2024-05-22', day: 'Thu', status: 'late', checkIn: '8:15 AM', checkOut: '3:00 PM', remarks: 'Arrived 15 minutes late' },
        { date: '2024-05-21', day: 'Wed', status: 'absent', remarks: 'Medical leave' },
        { date: '2024-05-20', day: 'Tue', status: 'present', checkIn: '7:40 AM', checkOut: '3:00 PM' },
        { date: '2024-05-17', day: 'Sat', status: 'present', checkIn: '7:55 AM', checkOut: '2:00 PM' },
        { date: '2024-05-16', day: 'Fri', status: 'excused', checkIn: '8:00 AM', checkOut: '1:00 PM', remarks: 'Dentist appointment' },
        { date: '2024-05-15', day: 'Thu', status: 'present', checkIn: '7:45 AM', checkOut: '3:00 PM' },
        { date: '2024-05-14', day: 'Wed', status: 'present', checkIn: '7:50 AM', checkOut: '3:00 PM' },
        { date: '2024-05-13', day: 'Tue', status: 'absent', remarks: 'Sick' },
      ]
    },
    {
      name: 'Jane Doe',
      class: 'SS2B',
      studentId: 'STU-2024-002',
      avatar: 'JD',
      attendance: 98,
      present: 20,
      absent: 0,
      late: 1,
      excused: 0,
      daysMarked: 21,
      trend: 'up',
      records: [
        { date: '2024-05-24', day: 'Mon', status: 'present', checkIn: '7:40 AM', checkOut: '3:00 PM' },
        { date: '2024-05-23', day: 'Fri', status: 'present', checkIn: '7:45 AM', checkOut: '3:00 PM' },
        { date: '2024-05-22', day: 'Thu', status: 'present', checkIn: '7:35 AM', checkOut: '3:00 PM' },
        { date: '2024-05-21', day: 'Wed', status: 'present', checkIn: '7:50 AM', checkOut: '3:00 PM' },
        { date: '2024-05-20', day: 'Tue', status: 'late', checkIn: '8:10 AM', checkOut: '3:00 PM', remarks: 'Traffic delay' },
        { date: '2024-05-17', day: 'Sat', status: 'present', checkIn: '7:55 AM', checkOut: '2:00 PM' },
        { date: '2024-05-16', day: 'Fri', status: 'present', checkIn: '7:45 AM', checkOut: '3:00 PM' },
        { date: '2024-05-15', day: 'Thu', status: 'present', checkIn: '7:40 AM', checkOut: '3:00 PM' },
        { date: '2024-05-14', day: 'Wed', status: 'present', checkIn: '7:50 AM', checkOut: '3:00 PM' },
        { date: '2024-05-13', day: 'Tue', status: 'present', checkIn: '7:45 AM', checkOut: '3:00 PM' },
      ]
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800'
      case 'absent':
        return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'
      case 'late':
        return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800'
      case 'excused':
        return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />
      case 'absent':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'late':
        return <Clock className="w-4 h-4 text-amber-500" />
      case 'excused':
        return <AlertTriangle className="w-4 h-4 text-blue-500" />
      default:
        return null
    }
  }

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 95) return 'text-emerald-600 dark:text-emerald-400'
    if (percentage >= 90) return 'text-amber-600 dark:text-amber-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 95) return 'bg-emerald-500'
    if (percentage >= 90) return 'bg-amber-500'
    return 'bg-red-500'
  }

  const handleViewDetails = (child: ChildAttendance) => {
    setSelectedChild(child)
    setShowDetails(true)
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-gray-900 transition-colors duration-300">
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-bold text-gray-900 dark:text-white tracking-tight transition-colors">
              Attendance Records
            </h1>
            <p className="text-[15px] text-gray-600 dark:text-gray-400 mt-1 transition-colors">
              Monitor your children's school attendance
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-10 text-sm font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 gap-2 transition-colors">
                  <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  {filterMonth}
                  <ChevronDown className="w-3.5 h-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="text-gray-900 dark:text-white font-semibold">Select Month</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {['May 2024', 'April 2024', 'March 2024', 'February 2024'].map((month) => (
                  <DropdownMenuItem 
                    key={month}
                    onClick={() => setFilterMonth(month)}
                    className="text-gray-700 dark:text-gray-300 cursor-pointer"
                  >
                    <Check className={`w-4 h-4 mr-2 ${filterMonth === month ? 'opacity-100 text-blue-600 dark:text-blue-400' : 'opacity-0'}`} />
                    {month}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              variant="outline" 
              size="sm" 
              className="h-10 text-sm font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 gap-2 transition-colors"
              onClick={() => alert('Downloading attendance report...')}
            >
              <Download className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              Download Report
            </Button>
          </div>
        </div>

        {/* Attendance Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Average Attendance</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">96%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">School Days</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">22</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Times Late</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">2</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Absences</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Children Attendance Cards */}
        {childrenAttendance.map((child) => (
          <Card key={child.name} className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors overflow-hidden">
            {/* Child Header */}
            <div className="p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
                    {child.avatar}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{child.name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{child.class} • {child.studentId}</p>
                  </div>
                </div>
                
                <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold ${
                  child.trend === 'up' 
                    ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' 
                    : 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                }`}>
                  {child.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {child.trend === 'up' ? 'Improving' : 'Needs Attention'}
                </div>
              </div>
            </div>

            <CardContent className="p-6 space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-center">
                  <p className={`text-2xl font-bold ${getAttendanceColor(child.attendance)}`}>
                    {child.attendance}%
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">Rate</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{child.present}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">Present</p>
                </div>
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span className="text-2xl font-bold text-red-700 dark:text-red-400">{child.absent}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">Absent</p>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span className="text-2xl font-bold text-amber-700 dark:text-amber-400">{child.late}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">Late</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Attendance Progress</span>
                  <span className={`text-sm font-bold ${getAttendanceColor(child.attendance)}`}>
                    {child.attendance}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${getProgressColor(child.attendance)}`}
                    style={{ width: `${child.attendance}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">0%</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">50%</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">100%</span>
                </div>
              </div>

              {/* Recent Records Preview */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Recent Attendance</h4>
                <div className="space-y-2">
                  {child.records.slice(0, 5).map((record, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center gap-3">
                        {getStatusIcon(record.status)}
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{record.day}, {record.date}</p>
                          {record.remarks && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">{record.remarks}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {record.checkIn && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {record.checkIn} - {record.checkOut}
                          </span>
                        )}
                        <span className={`inline-flex px-2 py-0.5 rounded-lg text-xs font-semibold border ${getStatusColor(record.status)}`}>
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                className="w-full bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-semibold gap-2 h-10 transition-colors"
                onClick={() => handleViewDetails(child)}
              >
                <Eye className="w-4 h-4" />
                View Full Attendance Record
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Attendance Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-3xl bg-white dark:bg-gray-800 border-0 max-h-[90vh] overflow-y-auto">
          {selectedChild && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
                    {selectedChild.avatar}
                  </div>
                  <div>
                    <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                      {selectedChild.name} - Attendance Record
                    </DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-400">
                      {selectedChild.class} • {filterMonth}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4 py-4">
                {/* Month Navigation */}
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm" className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{currentMonth}</span>
                  <Button variant="outline" size="sm" className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600">
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-center">
                    <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">{selectedChild.present}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Present</p>
                  </div>
                  <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-center">
                    <p className="text-lg font-bold text-red-700 dark:text-red-400">{selectedChild.absent}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Absent</p>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-center">
                    <p className="text-lg font-bold text-amber-700 dark:text-amber-400">{selectedChild.late}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Late</p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-center">
                    <p className="text-lg font-bold text-blue-700 dark:text-blue-400">{selectedChild.excused}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Excused</p>
                  </div>
                </div>

                {/* Full Records Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white text-sm">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white text-sm">Day</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white text-sm">Status</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white text-sm">Check In</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white text-sm">Check Out</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white text-sm">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedChild.records.map((record, idx) => (
                        <tr key={idx} className="border-b border-gray-100 dark:border-gray-700/50">
                          <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">{record.date}</td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{record.day}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(record.status)}`}>
                              {getStatusIcon(record.status)}
                              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center text-sm text-gray-600 dark:text-gray-400">
                            {record.checkIn || '-'}
                          </td>
                          <td className="py-3 px-4 text-center text-sm text-gray-600 dark:text-gray-400">
                            {record.checkOut || '-'}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                            {record.remarks || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}