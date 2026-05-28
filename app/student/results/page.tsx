'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Award, TrendingUp, TrendingDown, Download, Filter, Printer,
  Search, Eye, BarChart3, Target, Star, BookOpen, Share2,
  Calendar, ChevronDown, Check, X, RefreshCw, Trophy,
  ArrowUpRight, ArrowDownRight, Clock, GraduationCap
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

interface Subject {
  name: string
  score: number
  grade: string
  credit: number
  gpa: number
  previousScore?: number
  trend?: 'up' | 'down' | 'same'
  rank?: string
  teacher?: string
}

interface TermResult {
  term: string
  academicYear: string
  subjects: Subject[]
  gpa: number
  position: string
  totalStudents: number
  averageScore: number
  attendance: number
  remarks: string
}

export default function StudentResults() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterGrade, setFilterGrade] = useState('all')
  const [showSubjectDetail, setShowSubjectDetail] = useState<Subject | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isPrinting, setIsPrinting] = useState(false)
  const [expandedTerm, setExpandedTerm] = useState<string>('Second Term 2024')

  const termResults: TermResult[] = [
    {
      term: 'Second Term 2024',
      academicYear: '2024/2025',
      subjects: [
        { name: 'Mathematics', score: 87, grade: 'A', credit: 4, gpa: 4.0, previousScore: 84, trend: 'up', rank: '5th', teacher: 'Mr. Adeleke' },
        { name: 'English Language', score: 82, grade: 'B+', credit: 4, gpa: 3.5, previousScore: 79, trend: 'up', rank: '12th', teacher: 'Mrs. Chukwu' },
        { name: 'Biology', score: 91, grade: 'A', credit: 4, gpa: 4.0, previousScore: 89, trend: 'up', rank: '3rd', teacher: 'Dr. Okonkwo' },
        { name: 'Chemistry', score: 78, grade: 'B', credit: 4, gpa: 3.0, previousScore: 82, trend: 'down', rank: '15th', teacher: 'Mr. Ibrahim' },
        { name: 'Physics', score: 85, grade: 'A-', credit: 4, gpa: 3.7, previousScore: 83, trend: 'up', rank: '8th', teacher: 'Mrs. Adebayo' },
        { name: 'History', score: 88, grade: 'A', credit: 3, gpa: 4.0, previousScore: 86, trend: 'up', rank: '4th', teacher: 'Mr. Oluwaseun' },
        { name: 'Geography', score: 80, grade: 'B+', credit: 3, gpa: 3.5, previousScore: 78, trend: 'up', rank: '10th', teacher: 'Mrs. Eze' },
        { name: 'Economics', score: 83, grade: 'B+', credit: 3, gpa: 3.5, previousScore: 85, trend: 'down', rank: '9th', teacher: 'Dr. Nwachukwu' },
      ],
      gpa: 3.77,
      position: '8/45',
      totalStudents: 45,
      averageScore: 84.3,
      attendance: 94,
      remarks: 'Excellent performance. Shows consistent improvement across most subjects. Keep up the great work!',
    },
    {
      term: 'First Term 2024',
      academicYear: '2024/2025',
      subjects: [
        { name: 'Mathematics', score: 84, grade: 'B+', credit: 4, gpa: 3.5, previousScore: 80, trend: 'up', rank: '10th', teacher: 'Mr. Adeleke' },
        { name: 'English Language', score: 79, grade: 'B', credit: 4, gpa: 3.0, previousScore: 82, trend: 'down', rank: '18th', teacher: 'Mrs. Chukwu' },
        { name: 'Biology', score: 89, grade: 'A', credit: 4, gpa: 4.0, previousScore: 86, trend: 'up', rank: '4th', teacher: 'Dr. Okonkwo' },
        { name: 'Chemistry', score: 76, grade: 'B', credit: 4, gpa: 3.0, previousScore: 74, trend: 'up', rank: '16th', teacher: 'Mr. Ibrahim' },
        { name: 'Physics', score: 82, grade: 'B+', credit: 4, gpa: 3.5, previousScore: 85, trend: 'down', rank: '12th', teacher: 'Mrs. Adebayo' },
      ],
      gpa: 3.6,
      position: '10/45',
      totalStudents: 45,
      averageScore: 82.0,
      attendance: 92,
      remarks: 'Good performance overall. Needs improvement in English and Physics.',
    },
  ]

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800'
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'
    if (grade.startsWith('C')) return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800'
    return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 dark:text-emerald-400'
    if (score >= 80) return 'text-blue-600 dark:text-blue-400'
    if (score >= 70) return 'text-amber-600 dark:text-amber-400'
    return 'text-red-600 dark:text-red-400'
  }

  const latestTerm = termResults[0]
  const previousTerm = termResults[1]
  const gpaChange = latestTerm.gpa - previousTerm.gpa
  const rankChange = parseInt(previousTerm.position.split('/')[0]) - parseInt(latestTerm.position.split('/')[0])

  const handleDownload = async () => {
    setIsDownloading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsDownloading(false)
    alert('Academic report downloaded successfully!')
  }

  const handlePrint = async () => {
    setIsPrinting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsPrinting(false)
    alert('Preparing print layout...')
  }

  const handleShare = () => {
    alert('Share link copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Academic Results
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
              View your scores, grades, and academic progress • John Doe • SS3A
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 sm:h-10 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 gap-1 sm:gap-2 px-2 sm:px-3"
              onClick={handlePrint}
              disabled={isPrinting}
            >
              {isPrinting ? <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" /> : <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              <span className="hidden sm:inline">{isPrinting ? 'Printing...' : 'Print'}</span>
              <span className="sm:hidden">{isPrinting ? '...' : 'Print'}</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 sm:h-10 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 gap-1 sm:gap-2 px-2 sm:px-3"
              onClick={handleShare}
            >
              <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button 
              size="sm" 
              className="h-8 sm:h-10 text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-4 gap-1 sm:gap-2 shadow-lg shadow-blue-600/20"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" /> : <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              <span className="hidden sm:inline">{isDownloading ? 'Downloading...' : 'Download Report'}</span>
              <span className="sm:hidden">{isDownloading ? '...' : 'Download'}</span>
            </Button>
          </div>
        </div>

        {/* Overall Performance Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition-all cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-semibold ${
                  gpaChange >= 0 ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' : 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
                }`}>
                  {gpaChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {gpaChange >= 0 ? '+' : ''}{gpaChange.toFixed(2)}
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Current GPA</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{latestTerm.gpa}</p>
              <p className="text-xs text-gray-400 mt-2">Out of 4.0 scale</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition-all cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-11 h-11 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-semibold ${
                  rankChange >= 0 ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' : 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
                }`}>
                  {rankChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {rankChange >= 0 ? '+' : ''}{rankChange}
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Class Ranking</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{latestTerm.position}</p>
              <p className="text-xs text-gray-400 mt-2">Top {Math.round((8/45)*100)}% of class</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition-all cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Average Score</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{latestTerm.averageScore}%</p>
              <p className="text-xs text-gray-400 mt-2">Across {latestTerm.subjects.length} subjects</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition-all cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-11 h-11 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Attendance</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{latestTerm.attendance}%</p>
              <p className="text-xs text-gray-400 mt-2">This term</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 overflow-hidden">
          <CardHeader className="pb-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Subject Performance Overview
                </CardTitle>
                <CardDescription className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Current term scores with progress indicators
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {latestTerm.subjects.map((subject) => (
                <div key={subject.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{subject.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{subject.teacher}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-bold ${getScoreColor(subject.score)}`}>{subject.score}%</span>
                      <span className={`inline-flex px-2 py-0.5 rounded-lg text-xs font-bold border ${getGradeColor(subject.grade)}`}>
                        {subject.grade}
                      </span>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowSubjectDetail(subject)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        subject.score >= 90 ? 'bg-emerald-500' :
                        subject.score >= 80 ? 'bg-blue-500' :
                        subject.score >= 70 ? 'bg-amber-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${subject.score}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">
                      Previous: {subject.previousScore}%
                    </span>
                    <span className={`flex items-center gap-1 font-medium ${
                      subject.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 
                      subject.trend === 'down' ? 'text-red-600 dark:text-red-400' : 
                      'text-gray-500'
                    }`}>
                      {subject.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : 
                       subject.trend === 'down' ? <ArrowDownRight className="w-3 h-3" /> : '−'}
                      {subject.score - (subject.previousScore || 0) > 0 ? '+' : ''}
                      {subject.score - (subject.previousScore || 0)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Term Results Tables */}
        {termResults.map((term) => (
          <Card key={term.term} className={`border-0 shadow-sm bg-white dark:bg-gray-800 overflow-hidden transition-all ${
            expandedTerm === term.term ? 'ring-2 ring-blue-500/30' : ''
          }`}>
            <CardHeader 
              className="pb-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750/50 transition-colors"
              onClick={() => setExpandedTerm(expandedTerm === term.term ? '' : term.term)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    {term.term}
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedTerm === term.term ? 'rotate-180' : ''}`} />
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {term.academicYear} • GPA: {term.gpa} • Position: {term.position} • {term.totalStudents} students
                  </CardDescription>
                </div>
                {term.remarks && (
                  <div className="hidden sm:block p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 max-w-xs">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Remarks</p>
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-300 mt-0.5">{term.remarks}</p>
                  </div>
                )}
              </div>
            </CardHeader>
            
            {expandedTerm === term.term && (
              <CardContent className="p-0 animate-in slide-in-from-top-2 duration-300">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                        <th className="text-left py-3.5 px-5 font-semibold text-gray-900 dark:text-white text-sm">Subject</th>
                        <th className="text-center py-3.5 px-4 font-semibold text-gray-900 dark:text-white text-sm">Score</th>
                        <th className="text-center py-3.5 px-4 font-semibold text-gray-900 dark:text-white text-sm">Grade</th>
                        <th className="text-center py-3.5 px-4 font-semibold text-gray-900 dark:text-white text-sm">Credits</th>
                        <th className="text-center py-3.5 px-4 font-semibold text-gray-900 dark:text-white text-sm">GPA</th>
                        <th className="text-center py-3.5 px-4 font-semibold text-gray-900 dark:text-white text-sm">Rank</th>
                        <th className="text-center py-3.5 px-4 font-semibold text-gray-900 dark:text-white text-sm">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {term.subjects.map((subject, idx) => (
                        <tr key={idx} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer" onClick={() => setShowSubjectDetail(subject)}>
                          <td className="py-3.5 px-5">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{subject.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{subject.teacher}</p>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span className={`text-sm font-bold ${getScoreColor(subject.score)}`}>{subject.score}%</span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-bold border ${getGradeColor(subject.grade)}`}>
                              {subject.grade}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center text-sm text-gray-600 dark:text-gray-400">{subject.credit}</td>
                          <td className="py-3.5 px-4 text-center">
                            <span className="text-sm font-bold text-gray-900 dark:text-white">{subject.gpa.toFixed(1)}</span>
                          </td>
                          <td className="py-3.5 px-4 text-center text-sm text-gray-600 dark:text-gray-400">{subject.rank || '-'}</td>
                          <td className="py-3.5 px-4 text-center">
                            {subject.trend && (
                              <span className={`inline-flex items-center gap-1 text-xs font-semibold ${
                                subject.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 
                                subject.trend === 'down' ? 'text-red-600 dark:text-red-400' : 
                                'text-gray-500'
                              }`}>
                                {subject.trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : 
                                 subject.trend === 'down' ? <ArrowDownRight className="w-3.5 h-3.5" /> : '−'}
                                {subject.score - (subject.previousScore || 0) > 0 ? '+' : ''}
                                {subject.score - (subject.previousScore || 0)}%
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Subject Detail Dialog */}
      <Dialog open={!!showSubjectDetail} onOpenChange={() => setShowSubjectDetail(null)}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 border-0">
          {showSubjectDetail && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">{showSubjectDetail.name}</DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-400">{showSubjectDetail.teacher || 'Teacher'}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{showSubjectDetail.score}%</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Score</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-center">
                    <span className={`inline-flex px-3 py-1 rounded-lg text-lg font-bold border ${getGradeColor(showSubjectDetail.grade)}`}>
                      {showSubjectDetail.grade}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Grade</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{showSubjectDetail.credit}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Credits</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{showSubjectDetail.gpa.toFixed(1)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">GPA Points</p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Class Rank</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{showSubjectDetail.rank || 'N/A'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Previous Score</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{showSubjectDetail.previousScore}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Change</span>
                    <span className={`text-sm font-bold flex items-center gap-1 ${
                      showSubjectDetail.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' :
                      showSubjectDetail.trend === 'down' ? 'text-red-600 dark:text-red-400' :
                      'text-gray-600 dark:text-gray-400'
                    }`}>
                      {showSubjectDetail.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : 
                       showSubjectDetail.trend === 'down' ? <ArrowDownRight className="w-4 h-4" /> : '−'}
                      {showSubjectDetail.score - (showSubjectDetail.previousScore || 0) > 0 ? '+' : ''}
                      {showSubjectDetail.score - (showSubjectDetail.previousScore || 0)}%
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
