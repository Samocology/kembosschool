'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  FileText, Plus, Eye, BarChart3, Search, Filter,
  Clock, Users, CheckCircle, AlertCircle, Edit,
  Trash2, Download, Calendar, BookOpen, MoreHorizontal,
  ChevronDown, Check, X, RefreshCw, Send, Copy,
  GraduationCap, ClipboardList, TrendingUp, MessageSquare
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

interface Assignment {
  id: number
  title: string
  class: string
  subject: string
  dueDate: string
  createdDate: string
  totalStudents: number
  submissions: number
  status: 'ongoing' | 'completed' | 'draft'
  description: string
  maxScore: number
  averageScore?: number
  type: string
}

interface Submission {
  studentName: string
  admission: string
  submitted: boolean
  date?: string
  score?: number
  grade?: string
  status: 'graded' | 'submitted' | 'pending'
}

export default function StaffAssignments() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterClass, setFilterClass] = useState('all')
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showGradeDialog, setShowGradeDialog] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [editingScore, setEditingScore] = useState<number | null>(null)
  const [editScoreValue, setEditScoreValue] = useState('')

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 1,
      title: 'Quadratic Equations Worksheet',
      class: 'SS3A',
      subject: 'Mathematics',
      dueDate: '2024-05-27',
      createdDate: '2024-05-20',
      totalStudents: 45,
      submissions: 38,
      status: 'ongoing',
      description: 'Complete all 20 questions on quadratic equations. Show all working steps.',
      maxScore: 100,
      averageScore: 78.5,
      type: 'Worksheet'
    },
    {
      id: 2,
      title: 'Trigonometry Problems',
      class: 'SS3B',
      subject: 'Mathematics',
      dueDate: '2024-05-28',
      createdDate: '2024-05-21',
      totalStudents: 43,
      submissions: 32,
      status: 'ongoing',
      description: 'Solve 15 trigonometry problems covering sine, cosine, and tangent.',
      maxScore: 100,
      type: 'Problem Set'
    },
    {
      id: 3,
      title: 'Calculus Integration Exercises',
      class: 'SS2A',
      subject: 'Mathematics',
      dueDate: '2024-05-26',
      createdDate: '2024-05-18',
      totalStudents: 42,
      submissions: 40,
      status: 'completed',
      description: 'Practice integration by parts and substitution methods.',
      maxScore: 100,
      averageScore: 85.2,
      type: 'Exercise'
    },
    {
      id: 4,
      title: 'Statistics Data Analysis',
      class: 'SS3A',
      subject: 'Mathematics',
      dueDate: '2024-06-01',
      createdDate: '2024-05-24',
      totalStudents: 45,
      submissions: 5,
      status: 'ongoing',
      description: 'Analyze the given dataset and create statistical reports.',
      maxScore: 100,
      type: 'Project'
    },
  ])

  const [submissions, setSubmissions] = useState<Record<number, Submission[]>>({
    1: [
      { studentName: 'Chinedu Okafor', admission: 'KBS001', submitted: true, date: '2024-05-25', score: 87, grade: 'A', status: 'graded' },
      { studentName: 'Blessing Eze', admission: 'KBS002', submitted: true, date: '2024-05-24', score: 82, grade: 'B+', status: 'graded' },
      { studentName: 'Ngozi Adeyemi', admission: 'KBS003', submitted: true, date: '2024-05-25', score: 91, grade: 'A', status: 'graded' },
      { studentName: 'Chisom Nwosu', admission: 'KBS004', submitted: true, date: '2024-05-23', score: 78, grade: 'B', status: 'graded' },
      { studentName: 'Tunde Akinsanya', admission: 'KBS005', submitted: false, status: 'pending' },
    ],
    2: [
      { studentName: 'John Smith', admission: 'KBS101', submitted: true, date: '2024-05-26', score: 76, grade: 'B-', status: 'graded' },
      { studentName: 'Mary Johnson', admission: 'KBS102', submitted: true, date: '2024-05-25', status: 'submitted' },
    ],
    3: [
      { studentName: 'Amara Obi', admission: 'KBS201', submitted: true, date: '2024-05-24', score: 92, grade: 'A+', status: 'graded' },
      { studentName: 'Femi Balogun', admission: 'KBS202', submitted: true, date: '2024-05-23', score: 88, grade: 'A-', status: 'graded' },
    ],
    4: [
      { studentName: 'Chinedu Okafor', admission: 'KBS001', submitted: true, date: '2024-05-25', status: 'submitted' },
    ],
  })

  const [newAssignment, setNewAssignment] = useState({
    title: '',
    class: 'SS3A',
    subject: 'Mathematics',
    dueDate: '',
    description: '',
    maxScore: '100',
    type: 'Worksheet'
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'
      case 'completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800'
      case 'draft': return 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800'
      default: return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  const getSubmissionStatusColor = (status: string) => {
    switch (status) {
      case 'graded': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
      case 'submitted': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      case 'pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const filteredAssignments = assignments.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         a.class.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || a.status === filterStatus
    const matchesClass = filterClass === 'all' || a.class === filterClass
    return matchesSearch && matchesStatus && matchesClass
  })

  const handleCreateAssignment = async () => {
    if (!newAssignment.title || !newAssignment.dueDate) {
      alert('Please fill in all required fields')
      return
    }

    setIsCreating(true)
    await new Promise(resolve => setTimeout(resolve, 1000))

    const newId = Math.max(...assignments.map(a => a.id)) + 1
    const assignment: Assignment = {
      id: newId,
      title: newAssignment.title,
      class: newAssignment.class,
      subject: newAssignment.subject,
      dueDate: newAssignment.dueDate,
      createdDate: new Date().toISOString().split('T')[0],
      totalStudents: 45,
      submissions: 0,
      status: 'ongoing',
      description: newAssignment.description,
      maxScore: parseInt(newAssignment.maxScore),
      type: newAssignment.type
    }

    setAssignments(prev => [assignment, ...prev])
    setSubmissions(prev => ({ ...prev, [newId]: [] }))
    setNewAssignment({
      title: '',
      class: 'SS3A',
      subject: 'Mathematics',
      dueDate: '',
      description: '',
      maxScore: '100',
      type: 'Worksheet'
    })
    setIsCreating(false)
    setShowCreateDialog(false)
  }

  const handleViewAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment)
    setShowViewDialog(true)
  }

  const handleGradeAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment)
    setShowGradeDialog(true)
  }

  const handleSaveGrade = (assignmentId: number, studentAdmission: string) => {
    const score = parseInt(editScoreValue)
    if (isNaN(score) || score < 0 || score > 100) {
      alert('Please enter a valid score between 0 and 100')
      return
    }

    setSubmissions(prev => ({
      ...prev,
      [assignmentId]: (prev[assignmentId] || []).map(s => {
        if (s.admission === studentAdmission) {
          return {
            ...s,
            score,
            grade: score >= 90 ? 'A+' : score >= 85 ? 'A' : score >= 80 ? 'A-' : score >= 75 ? 'B+' : score >= 70 ? 'B' : score >= 65 ? 'B-' : score >= 60 ? 'C' : score >= 50 ? 'D' : 'F',
            status: 'graded' as const
          }
        }
        return s
      })
    }))

    // Update average score
    const assignmentSubmissions = submissions[assignmentId] || []
    const gradedSubmissions = assignmentSubmissions.filter(s => s.status === 'graded')
    const average = gradedSubmissions.length > 0 
      ? gradedSubmissions.reduce((sum, s) => sum + (s.score || 0), 0) / gradedSubmissions.length 
      : 0

    setAssignments(prev => prev.map(a => 
      a.id === assignmentId ? { ...a, averageScore: parseFloat(average.toFixed(1)) } : a
    ))

    setEditingScore(null)
    setEditScoreValue('')
  }

  const handleDeleteAssignment = (assignmentId: number) => {
    if (confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(prev => prev.filter(a => a.id !== assignmentId))
      const { [assignmentId]: removed, ...rest } = submissions
      setSubmissions(rest)
    }
  }

  const handleDuplicateAssignment = (assignment: Assignment) => {
    const newId = Math.max(...assignments.map(a => a.id)) + 1
    const duplicated: Assignment = {
      ...assignment,
      id: newId,
      title: `${assignment.title} (Copy)`,
      createdDate: new Date().toISOString().split('T')[0],
      submissions: 0,
      status: 'draft'
    }
    setAssignments(prev => [duplicated, ...prev])
    setSubmissions(prev => ({ ...prev, [newId]: [] }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Assignments
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Create and manage student assignments • {assignments.length} assignments
            </p>
          </div>
          <Button 
            className="h-10 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 gap-2 shadow-lg shadow-blue-600/20"
            onClick={() => setShowCreateDialog(true)}
          >
            <Plus className="w-4 h-4" />
            Create Assignment
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{assignments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Ongoing</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{assignments.filter(a => a.status === 'ongoing').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Completed</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{assignments.filter(a => a.status === 'completed').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Avg Score</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {(assignments.filter(a => a.averageScore).reduce((sum, a) => sum + (a.averageScore || 0), 0) / assignments.filter(a => a.averageScore).length || 0).toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by title or class..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white h-10 text-sm"
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
                  <DropdownMenuLabel className="text-xs font-semibold">Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {['all', 'ongoing', 'completed', 'draft'].map(s => (
                    <DropdownMenuItem key={s} onClick={() => setFilterStatus(s)} className="cursor-pointer">
                      <Check className={`w-4 h-4 mr-2 ${filterStatus === s ? 'opacity-100 text-blue-600' : 'opacity-0'}`} />
                      {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 text-sm font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 gap-2">
                    <GraduationCap className="w-4 h-4" />
                    {filterClass === 'all' ? 'All Classes' : filterClass}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuLabel className="text-xs font-semibold">Class</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {['all', 'SS3A', 'SS3B', 'SS2A'].map(c => (
                    <DropdownMenuItem key={c} onClick={() => setFilterClass(c)} className="cursor-pointer">
                      <Check className={`w-4 h-4 mr-2 ${filterClass === c ? 'opacity-100 text-blue-600' : 'opacity-0'}`} />
                      {c === 'all' ? 'All' : c}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* Assignments List */}
        <div className="space-y-3">
          {filteredAssignments.map((assignment) => (
            <Card key={assignment.id} className="border-0 shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition-all group">
              <CardContent className="p-5">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Title & Info */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      assignment.status === 'completed' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                      assignment.status === 'ongoing' ? 'bg-blue-100 dark:bg-blue-900/30' :
                      'bg-gray-100 dark:bg-gray-900/30'
                    }`}>
                      <FileText className={`w-5 h-5 ${
                        assignment.status === 'completed' ? 'text-emerald-600 dark:text-emerald-400' :
                        assignment.status === 'ongoing' ? 'text-blue-600 dark:text-blue-400' :
                        'text-gray-600 dark:text-gray-400'
                      }`} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 dark:text-white truncate">{assignment.title}</h3>
                        <span className={`inline-flex px-2 py-0.5 rounded-lg text-xs font-semibold border ${getStatusColor(assignment.status)}`}>
                          {assignment.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <GraduationCap className="w-3.5 h-3.5" />
                          {assignment.class}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" />
                          {assignment.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          Due: {assignment.dueDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          Created: {assignment.createdDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 flex-shrink-0">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Submissions</p>
                      <div className="flex items-center gap-1">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {assignment.submissions}
                        </span>
                        <span className="text-sm text-gray-400">/ {assignment.totalStudents}</span>
                      </div>
                      <div className="mt-1 h-1.5 w-20 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    {assignment.averageScore && (
                      <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Avg Score</p>
                        <p className={`text-lg font-bold ${
                          (assignment.averageScore || 0) >= 80 ? 'text-emerald-600 dark:text-emerald-400' :
                          (assignment.averageScore || 0) >= 60 ? 'text-amber-600 dark:text-amber-400' :
                          'text-red-600 dark:text-red-400'
                        }`}>
                          {assignment.averageScore}%
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-9 text-xs font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                      onClick={() => handleViewAssignment(assignment)}
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      className="h-9 text-xs font-semibold bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 gap-1"
                      onClick={() => handleGradeAssignment(assignment)}
                    >
                      <BarChart3 className="w-3.5 h-3.5" />
                      Grade
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem onClick={() => handleViewAssignment(assignment)} className="cursor-pointer">
                          <Eye className="w-4 h-4 mr-2" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicateAssignment(assignment)} className="cursor-pointer">
                          <Copy className="w-4 h-4 mr-2" /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteAssignment(assignment.id)} className="cursor-pointer text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredAssignments.length === 0 && (
            <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
              <CardContent className="py-12 text-center">
                <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400 font-medium">No assignments found</p>
                <p className="text-sm text-gray-400">Try adjusting your search or create a new assignment</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Create Assignment Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-lg bg-white dark:bg-gray-800 border-0">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">Create Assignment</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">Create a new assignment for your class</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-900 dark:text-gray-200">Title <span className="text-red-500">*</span></label>
              <Input placeholder="Assignment title" value={newAssignment.title} onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })} className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 h-10" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-900 dark:text-gray-200">Class</label>
                <select value={newAssignment.class} onChange={(e) => setNewAssignment({ ...newAssignment, class: e.target.value })} className="w-full h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 text-sm">
                  <option>SS3A</option><option>SS3B</option><option>SS2A</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-900 dark:text-gray-200">Type</label>
                <select value={newAssignment.type} onChange={(e) => setNewAssignment({ ...newAssignment, type: e.target.value })} className="w-full h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 text-sm">
                  <option>Worksheet</option><option>Problem Set</option><option>Exercise</option><option>Project</option><option>Quiz</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-900 dark:text-gray-200">Due Date <span className="text-red-500">*</span></label>
                <Input type="date" value={newAssignment.dueDate} onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })} className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 h-10" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-900 dark:text-gray-200">Max Score</label>
                <Input type="number" value={newAssignment.maxScore} onChange={(e) => setNewAssignment({ ...newAssignment, maxScore: e.target.value })} className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 h-10" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-900 dark:text-gray-200">Description</label>
              <textarea value={newAssignment.description} onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })} rows={3} className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 text-sm resize-none" placeholder="Assignment instructions..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)} className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600">Cancel</Button>
            <Button onClick={handleCreateAssignment} disabled={isCreating} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
              {isCreating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              {isCreating ? 'Creating...' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Submissions Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="sm:max-w-2xl bg-white dark:bg-gray-800 border-0 max-h-[80vh] overflow-y-auto">
          {selectedAssignment && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">{selectedAssignment.title}</DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-400">
                  {selectedAssignment.class} • Due: {selectedAssignment.dueDate}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-700 dark:text-gray-300">{selectedAssignment.description}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Submissions ({selectedAssignment.submissions}/{selectedAssignment.totalStudents})</h4>
                  {(submissions[selectedAssignment.id] || []).map((sub, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{sub.studentName}</p>
                        <p className="text-xs text-gray-500">{sub.admission}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        {sub.score && <span className="text-sm font-bold text-gray-900 dark:text-white">{sub.score}%</span>}
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${getSubmissionStatusColor(sub.status)}`}>
                          {sub.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Grade Assignment Dialog */}
      <Dialog open={showGradeDialog} onOpenChange={setShowGradeDialog}>
        <DialogContent className="sm:max-w-2xl bg-white dark:bg-gray-800 border-0 max-h-[80vh] overflow-y-auto">
          {selectedAssignment && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">Grade: {selectedAssignment.title}</DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-400">Enter scores for submitted assignments</DialogDescription>
              </DialogHeader>
              <div className="space-y-3 py-4">
                {(submissions[selectedAssignment.id] || []).filter(s => s.submitted).map((sub, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{sub.studentName}</p>
                      <p className="text-xs text-gray-500">{sub.admission}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {editingScore === idx ? (
                        <>
                          <Input type="number" min="0" max="100" value={editScoreValue} onChange={(e) => setEditScoreValue(e.target.value)} className="w-20 h-8 text-center text-sm" autoFocus onKeyDown={(e) => { if (e.key === 'Enter') handleSaveGrade(selectedAssignment.id, sub.admission); if (e.key === 'Escape') setEditingScore(null); }} />
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-emerald-600" onClick={() => handleSaveGrade(selectedAssignment.id, sub.admission)}><Check className="w-4 h-4" /></Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600" onClick={() => setEditingScore(null)}><X className="w-4 h-4" /></Button>
                        </>
                      ) : (
                        <>
                          {sub.score ? (
                            <span className="text-sm font-bold text-gray-900 dark:text-white">{sub.score}% - {sub.grade}</span>
                          ) : (
                            <span className="text-sm text-gray-500">Not graded</span>
                          )}
                          <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => { setEditingScore(idx); setEditScoreValue(sub.score?.toString() || ''); }}>
                            {sub.score ? 'Edit' : 'Grade'}
                          </Button>
                        </>
                      )}
                    </div>
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