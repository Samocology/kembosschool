'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Award, Plus, Download, Upload, Search, Filter,
  CheckCircle, Clock, AlertCircle, Edit, Eye,
  TrendingUp, TrendingDown, BarChart3, Users,
  FileText, Save, X, ChevronDown, Check, RefreshCw,
  GraduationCap, Calculator, Printer, Mail
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

interface StudentResult {
  id: number
  name: string
  admission: string
  score: number
  grade: string
  status: 'submitted' | 'pending' | 'draft'
  previousScore?: number
  trend?: 'up' | 'down' | 'same'
}

interface Assessment {
  id: number
  name: string
  type: string
  date: string
  totalStudents: number
  submitted: number
  average: number
}

export default function StaffResults() {
  const calculateGrade = (score: number): string => {
    if (score >= 90) return 'A+'
    if (score >= 85) return 'A'
    if (score >= 80) return 'A-'
    if (score >= 75) return 'B+'
    if (score >= 70) return 'B'
    if (score >= 65) return 'B-'
    if (score >= 60) return 'C+'
    if (score >= 55) return 'C'
    if (score >= 50) return 'C-'
    if (score >= 45) return 'D'
    if (score > 0) return 'F'
    return '-'
  }

  const [selectedClass, setSelectedClass] = useState('SS3A')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedAssessment, setSelectedAssessment] = useState('Mid-Term Test')
  const [editingStudent, setEditingStudent] = useState<number | null>(null)
  const [editScore, setEditScore] = useState('')
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [showBulkEntry, setShowBulkEntry] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const classes = ['SS3A', 'SS3B', 'SS2A']
  
  const assessments = [
    { id: 1, name: 'Mid-Term Test', type: 'Test', date: '2024-05-28', totalStudents: 45, submitted: 42, average: 84.3 },
    { id: 2, name: 'First Quiz', type: 'Quiz', date: '2024-05-15', totalStudents: 45, submitted: 45, average: 78.5 },
    { id: 3, name: 'Homework Assignment 3', type: 'Assignment', date: '2024-05-10', totalStudents: 45, submitted: 43, average: 88.2 },
  ]

  const [studentResults, setStudentResults] = useState<StudentResult[]>([
    { id: 1, name: 'Chinedu Okafor', admission: 'KBS001', score: 87, grade: 'A', status: 'submitted', previousScore: 84, trend: 'up' },
    { id: 2, name: 'Blessing Eze', admission: 'KBS002', score: 82, grade: 'B+', status: 'submitted', previousScore: 79, trend: 'up' },
    { id: 3, name: 'Ngozi Adeyemi', admission: 'KBS003', score: 91, grade: 'A', status: 'submitted', previousScore: 89, trend: 'up' },
    { id: 4, name: 'Chisom Nwosu', admission: 'KBS004', score: 78, grade: 'B', status: 'submitted', previousScore: 82, trend: 'down' },
    { id: 5, name: 'Tunde Akinsanya', admission: 'KBS005', score: 85, grade: 'A-', status: 'submitted', previousScore: 83, trend: 'up' },
    { id: 6, name: 'Zainab Mohammed', admission: 'KBS006', score: 0, grade: '-', status: 'pending', previousScore: 76, trend: 'down' },
    { id: 7, name: 'Emeka Nwankwo', admission: 'KBS007', score: 0, grade: '-', status: 'pending', previousScore: 88, trend: 'down' },
    { id: 8, name: 'Amara Obi', admission: 'KBS008', score: 72, grade: 'B-', status: 'draft', previousScore: 70, trend: 'up' },
  ])

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800'
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'
    if (grade.startsWith('C')) return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800'
    if (grade.startsWith('D') || grade === 'F') return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'
    return 'bg-gray-100 text-gray-600 border-gray-200'
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400'
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400'
      case 'draft': return 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400'
      default: return ''
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return <CheckCircle className="w-3.5 h-3.5" />
      case 'pending': return <Clock className="w-3.5 h-3.5" />
      case 'draft': return <Edit className="w-3.5 h-3.5" />
      default: return null
    }
  }

  const filteredResults = studentResults.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.admission.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const classAverage = () => {
    const submitted = studentResults.filter(s => s.status === 'submitted' && s.score > 0)
    if (submitted.length === 0) return 0
    return (submitted.reduce((sum, s) => sum + s.score, 0) / submitted.length).toFixed(1)
  }

  const handleStartEdit = (student: StudentResult) => {
    setEditingStudent(student.id)
    setEditScore(student.score > 0 ? student.score.toString() : '')
  }

  const handleSaveScore = (studentId: number) => {
    const score = parseInt(editScore)
    if (isNaN(score) || score < 0 || score > 100) {
      alert('Please enter a valid score between 0 and 100')
      return
    }
    
    setStudentResults(prev => prev.map(s => {
      if (s.id === studentId) {
        const previousScore = s.score
        const trend = score > previousScore ? 'up' as const : score < previousScore ? 'down' as const : 'same' as const
        return {
          ...s,
          score,
          grade: calculateGrade(score),
          status: 'draft' as const,
          previousScore: previousScore || s.previousScore,
          trend
        }
      }
      return s
    }))
    setEditingStudent(null)
    setEditScore('')
  }

  const handleCancelEdit = () => {
    setEditingStudent(null)
    setEditScore('')
  }

  const handleSubmitResults = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setStudentResults(prev => prev.map(s => ({
      ...s,
      status: s.score > 0 ? 'submitted' as const : 'pending' as const
    })))
    setIsSaving(false)
    setShowSubmitDialog(false)
    alert('Results submitted successfully!')
  }

  const handleBulkEntry = () => {
    setShowBulkEntry(true)
  }

  const handleExport = (format: string) => {
    alert(`Exporting results as ${format.toUpperCase()}...`)
  }

  const handleImport = () => {
    alert('Opening file picker for CSV import...')
  }

  const handlePrint = () => {
    alert('Preparing print layout...')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Results Management
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
              Manage and submit student scores • Mathematics Department
            </p>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 sm:h-10 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-900 gap-1 sm:gap-2 px-2 sm:px-3"
              onClick={handlePrint}
            >
              <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Print</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 sm:h-10 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 gap-1 sm:gap-2 px-2 sm:px-3">
                  <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Export</span>
                  <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => handleExport('pdf')} className="cursor-pointer">
                  <FileText className="w-4 h-4 mr-2" /> PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('csv')} className="cursor-pointer">
                  <Download className="w-4 h-4 mr-2" /> CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('excel')} className="cursor-pointer">
                  <Download className="w-4 h-4 mr-2" /> Excel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button 
              size="sm" 
              className="h-10 text-sm font-semibold bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 px-4 gap-2"
              onClick={handleImport}
            >
              <Upload className="w-4 h-4" />
              Import CSV
            </Button>
          </div>
        </div>

        {/* Assessment Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {assessments.map((assessment) => (
            <Card 
              key={assessment.id}
              className={`border-0 shadow-sm cursor-pointer transition-all hover:shadow-md ${
                selectedAssessment === assessment.name 
                  ? 'bg-blue-50/80 dark:bg-blue-900/20 ring-2 ring-blue-500/50' 
                  : 'bg-white dark:bg-gray-800'
              }`}
              onClick={() => setSelectedAssessment(assessment.name)}
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {assessment.type}
                  </span>
                  <span className="text-xs text-gray-400">{assessment.date}</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">{assessment.name}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{assessment.average}%</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Average</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {assessment.submitted}/{assessment.totalStudents}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Submitted</p>
                  </div>
                </div>
                <div className="mt-3 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${(assessment.submitted / assessment.totalStudents) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Class Selection */}
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Select Class:</span>
              <div className="flex gap-2">
                {classes.map((cls) => (
                  <Button
                    key={cls}
                    onClick={() => setSelectedClass(cls)}
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
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-10 text-sm text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600"
                  onClick={handleBulkEntry}
                >
                  <Calculator className="w-4 h-4 mr-1.5" />
                  Bulk Entry
                </Button>
                <Button 
                  size="sm"
                  className="h-10 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white gap-1.5"
                  onClick={() => alert('Creating new assessment...')}
                >
                  <Plus className="w-4 h-4" />
                  New Assessment
                </Button>
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
                  className="pl-10 pr-10 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white h-10"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 text-sm font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 gap-2">
                    <Filter className="w-4 h-4" />
                    {filterStatus === 'all' ? 'All Status' : filterStatus}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuLabel className="text-xs font-semibold">Filter Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {[
                    { value: 'all', label: 'All' },
                    { value: 'submitted', label: 'Submitted' },
                    { value: 'pending', label: 'Pending' },
                    { value: 'draft', label: 'Draft' },
                  ].map(f => (
                    <DropdownMenuItem key={f.value} onClick={() => setFilterStatus(f.value)} className="cursor-pointer">
                      <Check className={`w-4 h-4 mr-2 ${filterStatus === f.value ? 'opacity-100 text-blue-600' : 'opacity-0'}`} />
                      {f.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* Results Table */}
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 overflow-hidden">
          <CardHeader className="pb-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  {selectedClass} - {selectedAssessment}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {filteredResults.length} students • {filteredResults.filter(s => s.status === 'submitted').length} submitted
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                    <th className="text-left py-3.5 px-5 font-semibold text-gray-900 dark:text-white text-sm">Student</th>
                    <th className="text-left py-3.5 px-4 font-semibold text-gray-900 dark:text-white text-sm">Admission No.</th>
                    <th className="text-center py-3.5 px-4 font-semibold text-gray-900 dark:text-white text-sm">Score</th>
                    <th className="text-center py-3.5 px-4 font-semibold text-gray-900 dark:text-white text-sm">Grade</th>
                    <th className="text-center py-3.5 px-4 font-semibold text-gray-900 dark:text-white text-sm">Trend</th>
                    <th className="text-center py-3.5 px-4 font-semibold text-gray-900 dark:text-white text-sm">Status</th>
                    <th className="text-center py-3.5 px-5 font-semibold text-gray-900 dark:text-white text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResults.map((student) => (
                    <tr key={student.id} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="py-3.5 px-5">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{student.name}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">{student.admission}</span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {editingStudent === student.id ? (
                          <div className="flex items-center justify-center gap-1">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={editScore}
                              onChange={(e) => setEditScore(e.target.value)}
                              className="w-20 h-9 text-center bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-sm"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveScore(student.id)
                                if (e.key === 'Escape') handleCancelEdit()
                              }}
                            />
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-emerald-600 hover:text-emerald-700" onClick={() => handleSaveScore(student.id)}>
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:text-red-700" onClick={handleCancelEdit}>
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <span className={`text-sm font-bold ${
                            student.score >= 70 ? 'text-emerald-600 dark:text-emerald-400' :
                            student.score >= 50 ? 'text-amber-600 dark:text-amber-400' :
                            student.score > 0 ? 'text-red-600 dark:text-red-400' :
                            'text-gray-400'
                          }`}>
                            {student.score > 0 ? student.score : '-'}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {student.grade !== '-' && (
                          <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-bold border ${getGradeColor(student.grade)}`}>
                            {student.grade}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {student.trend && (
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold ${
                            student.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' :
                            student.trend === 'down' ? 'text-red-600 dark:text-red-400' :
                            'text-gray-500'
                          }`}>
                            {student.trend === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
                            {student.trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
                            {student.previousScore && `${student.previousScore}%`}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${getStatusStyle(student.status)}`}>
                          {getStatusIcon(student.status)}
                          {student.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-center">
                        {editingStudent === student.id ? (
                          <span className="text-xs text-gray-400">Editing...</span>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => handleStartEdit(student)}
                          >
                            <Edit className="w-3.5 h-3.5 mr-1" />
                            {student.score > 0 ? 'Edit' : 'Enter'}
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Class Average</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{classAverage()}%</p>
                </div>
                <div className="h-10 w-px bg-gray-200 dark:bg-gray-700" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Highest</p>
                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {Math.max(...studentResults.filter(s => s.score > 0).map(s => s.score))}%
                  </p>
                </div>
                <div className="h-10 w-px bg-gray-200 dark:bg-gray-700" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Lowest</p>
                  <p className="text-lg font-bold text-red-600 dark:text-red-400">
                    {Math.min(...studentResults.filter(s => s.score > 0).map(s => s.score))}%
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="text-sm text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600" onClick={() => alert('Saving as draft...')}>
                  <Save className="w-4 h-4 mr-1.5" />
                  Save Draft
                </Button>
                <Button 
                  className="text-sm font-semibold bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 gap-1.5"
                  onClick={() => setShowSubmitDialog(true)}
                >
                  <CheckCircle className="w-4 h-4" />
                  Submit Results
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submit Confirmation Dialog */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 border-0">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white">Submit Results</DialogTitle>
            </div>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Are you sure you want to submit these results? Submitted results cannot be modified without admin approval.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Class</span>
                <span className="font-semibold text-gray-900 dark:text-white">{selectedClass}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Assessment</span>
                <span className="font-semibold text-gray-900 dark:text-white">{selectedAssessment}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Submitting</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {studentResults.filter(s => s.score > 0).length} scores
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Average</span>
                <span className="font-semibold text-gray-900 dark:text-white">{classAverage()}%</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubmitDialog(false)} className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600">
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitResults} 
              disabled={isSaving}
              className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 gap-2"
            >
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
              {isSaving ? 'Submitting...' : 'Confirm Submit'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
