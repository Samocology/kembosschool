'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, CheckCircle, XCircle } from 'lucide-react'

export default function StudentAttendance() {
  const attendanceData = [
    { month: 'May 2024', present: 18, absent: 2, percentage: 90 },
    { month: 'April 2024', present: 19, absent: 1, percentage: 95 },
    { month: 'March 2024', present: 17, absent: 3, percentage: 85 },
    { month: 'February 2024', present: 20, absent: 0, percentage: 100 },
    { month: 'January 2024', present: 18, absent: 2, percentage: 90 },
  ]

  const dailyAttendance = [
    { date: '2024-05-24', status: 'present', subject: 'All Day' },
    { date: '2024-05-23', status: 'present', subject: 'All Day' },
    { date: '2024-05-22', status: 'absent', subject: 'Mathematics' },
    { date: '2024-05-21', status: 'present', subject: 'All Day' },
    { date: '2024-05-20', status: 'present', subject: 'All Day' },
    { date: '2024-05-19', status: 'absent', subject: 'Biology' },
    { date: '2024-05-18', status: 'present', subject: 'All Day' },
    { date: '2024-05-17', status: 'present', subject: 'All Day' },
  ]

  const overallPercentage = Math.round(
    attendanceData.reduce((sum, m) => sum + m.percentage, 0) / attendanceData.length
  )

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Attendance Record</h1>
        <p className="text-muted-foreground">Track your attendance across all classes</p>
      </div>

      {/* Overall Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-green-500/10">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Overall Attendance</p>
            <p className="text-3xl font-bold text-foreground">{overallPercentage}%</p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-green-500/10">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Present (This Month)</p>
            <p className="text-3xl font-bold text-foreground">18</p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-red-500/10">
                <XCircle className="w-6 h-6 text-red-500" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Absent (This Month)</p>
            <p className="text-3xl font-bold text-foreground">2</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Breakdown */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Monthly Attendance</CardTitle>
          <CardDescription>Your attendance percentage by month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {attendanceData.map((month) => (
              <div key={month.month} className="flex items-center gap-4 p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                <div className="flex-1">
                  <p className="font-semibold text-foreground mb-2">{month.month}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {month.present} Present
                    </span>
                    <span className="flex items-center gap-1">
                      <XCircle className="w-4 h-4 text-red-500" />
                      {month.absent} Absent
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-accent">{month.percentage}%</p>
                  <div className="w-24 h-2 bg-border rounded-full overflow-hidden mt-2">
                    <div
                      className="h-full bg-accent rounded-full transition-all"
                      style={{ width: `${month.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Attendance */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent" />
            Recent Attendance
          </CardTitle>
          <CardDescription>Last 8 school days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {dailyAttendance.map((day) => (
              <div key={day.date} className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                <div className="flex items-center gap-3">
                  {day.status === 'present' ? (
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                      <XCircle className="w-5 h-5 text-red-500" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-foreground">{day.date}</p>
                    <p className="text-xs text-muted-foreground">{day.subject}</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    day.status === 'present'
                      ? 'bg-green-500/10 text-green-700'
                      : 'bg-red-500/10 text-red-700'
                  }`}
                >
                  {day.status.charAt(0).toUpperCase() + day.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
