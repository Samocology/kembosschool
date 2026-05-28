'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Award, TrendingUp, TrendingDown, BookOpen, 
  BarChart3, Target, Star, ArrowUp, ArrowDown,
  GraduationCap, Download, Filter, Calendar,
  Eye, ChevronDown, Check
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface SubjectResult {
  subject: string
  score: number
  previousScore: number
  trend: 'up' | 'down'
  grade?: string
  remarks?: string
}

interface Child {
  id: number
  name: string
  class: string
  avatar: string
  studentId: string
  results: SubjectResult[]
}

export default function ChildProgress() {
  const [selectedChild, setSelectedChild] = useState<Child | null>(null)
  const [showSubjectDetails, setShowSubjectDetails] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<SubjectResult | null>(null)
  const [filterPeriod, setFilterPeriod] = useState('Second Term 2024')

  const children: Child[] = [
    {
      id: 1,
      name: 'John Doe',
      class: 'SS3A',
      avatar: 'JD',
      studentId: 'STU-2024-001',
      results: [
        { subject: 'Mathematics', score: 87, previousScore: 84, trend: 'up', grade: 'A', remarks: 'Excellent improvement in algebra' },
        { subject: 'English Language', score: 82, previousScore: 79, trend: 'up', grade: 'B+', remarks: 'Good progress in comprehension' },
        { subject: 'Biology', score: 91, previousScore: 89, trend: 'up', grade: 'A', remarks: 'Outstanding practical work' },
        { subject: 'Chemistry', score: 78, previousScore: 82, trend: 'down', grade: 'B', remarks: 'Needs to focus on organic chemistry' },
        { subject: 'Physics', score: 85, previousScore: 83, trend: 'up', grade: 'A-', remarks: 'Consistent performance' },
      ],
    },
    {
      id: 2,
      name: 'Jane Doe',
      class: 'SS2B',
      avatar: 'JD',
      studentId: 'STU-2024-002',
      results: [
        { subject: 'Mathematics', score: 95, previousScore: 93, trend: 'up', grade: 'A+', remarks: 'Exceptional problem-solving skills' },
        { subject: 'English Language', score: 88, previousScore: 85, trend: 'up', grade: 'A', remarks: 'Strong essay writing' },
        { subject: 'Biology', score: 92, previousScore: 90, trend: 'up', grade: 'A', remarks: 'Excellent lab work' },
        { subject: 'Chemistry', score: 90, previousScore: 88, trend: 'up', grade: 'A', remarks: 'Great understanding of concepts' },
      ],
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

  const handleSubjectClick = (subject: SubjectResult) => {
    setSelectedSubject(subject)
    setShowSubjectDetails(true)
  }

  const calculateAverage = (results: SubjectResult[]) => {
    const total = results.reduce((sum, r) => sum + r.score, 0)
    return (total / results.length).toFixed(1)
  }

  const calculateTrend = (results: SubjectResult[]) => {
    const improved = results.filter(r => r.trend === 'up').length
    return improved >= results.length / 2 ? 'up' : 'down'
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-gray-900 transition-colors duration-300">
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-bold text-gray-900 dark:text-white tracking-tight transition-colors">
              Child's Progress
            </h1>
            <p className="text-[15px] text-gray-600 dark:text-gray-400 mt-1 transition-colors">
              Track academic performance and improvement trends
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-10 text-sm font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 gap-2 transition-colors">
                  <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  {filterPeriod}
                  <ChevronDown className="w-3.5 h-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="text-gray-900 dark:text-white font-semibold">Select Term</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {['Second Term 2024', 'First Term 2024', 'Third Term 2023'].map((term) => (
                  <DropdownMenuItem 
                    key={term}
                    onClick={() => setFilterPeriod(term)}
                    className="text-gray-700 dark:text-gray-300 cursor-pointer"
                  >
                    <Check className={`w-4 h-4 mr-2 ${filterPeriod === term ? 'opacity-100 text-blue-600 dark:text-blue-400' : 'opacity-0'}`} />
                    {term}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              variant="outline" 
              size="sm" 
              className="h-10 text-sm font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 gap-2 transition-colors"
              onClick={() => alert('Downloading progress report...')}
            >
              <Download className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              Download
            </Button>
          </div>
        </div>

        {/* Children Progress Cards */}
        {children.map((child) => {
          const average = calculateAverage(child.results)
          const trend = calculateTrend(child.results)
          
          return (
            <Card key={child.id} className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors overflow-hidden">
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
                  
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{average}%</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Average Score</p>
                    </div>
                    <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold ${
                      trend === 'up' 
                        ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' 
                        : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}>
                      {trend === 'up' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {trend === 'up' ? 'Improving' : 'Declining'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Summary */}
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Subjects</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{child.results.length}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800">
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Improved</p>
                    <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                      {child.results.filter(r => r.trend === 'up').length}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800">
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Highest</p>
                    <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {Math.max(...child.results.map(r => r.score))}%
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800">
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Needs Focus</p>
                    <p className="text-lg font-bold text-amber-600 dark:text-amber-400">
                      {child.results.filter(r => r.trend === 'down').length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Results Table */}
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-700">
                        <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white text-sm">Subject</th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white text-sm">Grade</th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white text-sm">Score</th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white text-sm">Previous</th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white text-sm">Change</th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white text-sm">Progress</th>
                        <th className="text-center py-4 px-6 font-semibold text-gray-900 dark:text-white text-sm">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {child.results.map((result, idx) => (
                        <tr 
                          key={result.subject} 
                          className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                <BookOpen className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                              </div>
                              <span className="text-sm font-semibold text-gray-900 dark:text-white">{result.subject}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-bold border ${getGradeColor(result.grade || '')}`}>
                              {result.grade}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`text-sm font-bold ${getScoreColor(result.score)}`}>
                              {result.score}%
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400">{result.previousScore}%</span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              {result.trend === 'up' ? (
                                <ArrowUp className="w-4 h-4 text-emerald-500" />
                              ) : (
                                <ArrowDown className="w-4 h-4 text-red-500" />
                              )}
                              <span className={`text-sm font-semibold ${
                                result.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                              }`}>
                                {Math.abs(result.score - result.previousScore)}%
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex justify-center">
                              <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    result.score >= 90 ? 'bg-emerald-500' :
                                    result.score >= 80 ? 'bg-blue-500' :
                                    result.score >= 70 ? 'bg-amber-500' :
                                    'bg-red-500'
                                  }`}
                                  style={{ width: `${result.score}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-8 w-8 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                              onClick={() => handleSubjectClick(result)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Subject Details Dialog */}
      <Dialog open={showSubjectDetails} onOpenChange={setShowSubjectDetails}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 border-0">
          {selectedSubject && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white">
                    {selectedSubject.subject}
                  </DialogTitle>
                </div>
                <DialogDescription className="text-gray-600 dark:text-gray-400">
                  Detailed performance breakdown
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedSubject.score}%</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Current Score</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {selectedSubject.trend === 'up' ? (
                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-500" />
                      )}
                      <span className={`text-lg font-bold ${
                        selectedSubject.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {Math.abs(selectedSubject.score - selectedSubject.previousScore)}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Change</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Progress Bar</p>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        selectedSubject.score >= 90 ? 'bg-emerald-500' :
                        selectedSubject.score >= 80 ? 'bg-blue-500' :
                        selectedSubject.score >= 70 ? 'bg-amber-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${selectedSubject.score}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Teacher's Remarks</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{selectedSubject.remarks}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}