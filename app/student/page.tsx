'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Award, Clock, FileText, BookOpen, Users, BarChart3, TrendingUp, Calendar } from 'lucide-react'

export default function StudentDashboard() {
  const stats = [
    {
      label: 'Overall Score',
      value: '85.5%',
      icon: Award,
      trend: '+2.3%',
      color: 'text-blue-500',
    },
    {
      label: 'Attendance',
      value: '94%',
      icon: Clock,
      trend: '+1.2%',
      color: 'text-green-500',
    },
    {
      label: 'Active Assignments',
      value: '5',
      icon: FileText,
      trend: '2 due soon',
      color: 'text-orange-500',
    },
    {
      label: 'Class Rank',
      value: '8/45',
      icon: TrendingUp,
      trend: 'Top 20%',
      color: 'text-purple-500',
    },
  ]

  const recentResults = [
    { subject: 'Mathematics', score: 87, grade: 'A', date: '2024-05-20' },
    { subject: 'English Language', score: 82, grade: 'B+', date: '2024-05-18' },
    { subject: 'Biology', score: 91, grade: 'A', date: '2024-05-16' },
    { subject: 'Chemistry', score: 78, grade: 'B', date: '2024-05-15' },
  ]

  const upcomingExams = [
    { name: 'Physics Practical', date: '2024-06-05', time: '2:00 PM' },
    { name: 'History Assessment', date: '2024-06-08', time: '10:00 AM' },
    { name: 'Economics Quiz', date: '2024-06-10', time: '3:30 PM' },
  ]

  const announcements = [
    { title: 'School Holiday Notice', date: '2024-05-25', content: 'School will be closed on June 1-3 for staff development.' },
    { title: 'Science Fair Registration', date: '2024-05-24', content: 'Interested students should submit project proposals by May 31.' },
    { title: 'New E-Learning Module', date: '2024-05-23', content: 'Advanced Mathematics Module 5 is now available.' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">Welcome back, Student</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Track your academic progress and stay updated with school activities</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="border-border bg-card hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-xs font-semibold text-green-600 bg-green-100/20 px-2 py-1 rounded">
                      {stat.trend}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Recent Results */}
        <Card className="lg:col-span-2 border-border">
          <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
              Recent Results
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">Your latest assessment scores</CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="space-y-3 sm:space-y-4">
              {recentResults.map((result) => (
                <div key={result.subject} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors gap-2 sm:gap-0">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm sm:text-base">{result.subject}</p>
                    <p className="text-xs text-muted-foreground">{result.date}</p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="text-right">
                      <p className="text-xl sm:text-2xl font-bold text-accent">{result.score}</p>
                      <p className="text-xs text-muted-foreground">Score</p>
                    </div>
                    <div className="px-2 sm:px-3 py-1 rounded-full bg-accent/10 text-accent font-semibold text-xs sm:text-sm">
                      {result.grade}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground text-sm sm:text-base">
              View All Results
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Exams */}
        <Card className="border-border">
          <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0" />
              Upcoming Exams
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">Next scheduled tests</CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="space-y-3 sm:space-y-4">
              {upcomingExams.map((exam) => (
                <div key={exam.name} className="p-3 sm:p-4 rounded-lg bg-muted border border-border hover:border-accent transition-colors">
                  <p className="font-semibold text-foreground text-sm sm:text-base">{exam.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{exam.date} at {exam.time}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 border-border text-foreground hover:bg-muted text-sm sm:text-base">
              View Timetable
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Announcements */}
      <Card className="border-border">
        <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
            Latest Announcements
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">Important school updates and notifications</CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="space-y-3 sm:space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.title} className="p-3 sm:p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors border border-transparent hover:border-accent">
                <p className="font-semibold text-foreground text-sm sm:text-base">{announcement.title}</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">{announcement.content}</p>
                <p className="text-xs text-muted-foreground mt-2">{announcement.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}
