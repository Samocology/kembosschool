'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  BarChart3, Clock, CheckCircle, Play, Search, Filter,
  Calendar, Award, TrendingUp, Eye, AlertCircle,
  ChevronDown, Check, X, RefreshCw, Target, BookOpen,
  Zap, Timer, HelpCircle, FileText, Trophy, Star,
  ArrowRight, ChevronLeft, ChevronRight
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

interface Exam {
  id: number
  name: string
  subject: string
  date: string
  time: string
  duration: number
  questions: number
  status: 'upcoming' | 'completed' | 'ongoing' | 'missed'
  marks: number | null
  percentage: number | null
  grade: string | null
  topics: string[]
  instructions: string[]
}

export default function CBTExams() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterSubject, setFilterSubject] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)
  const [showStartDialog, setShowStartDialog] = useState(false)
  const [showReviewDialog, setShowReviewDialog] = useState(false)
  const [isStarting, setIsStarting] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const exams: Exam[] = [
    {
      id: 1,
      name: 'Mathematics Mid-Term CBT',
      subject: 'Mathematics',
      date: '2024-06-05',
      time: '2:00 PM',
      duration: 120,
      questions: 50,
      status: 'upcoming',
      marks: null,
      percentage: null,
      grade: null,
      topics: ['Algebra', 'Quadratic Equations', 'Trigonometry', 'Statistics', 'Geometry'],
      instructions: [
        'Read each question carefully before answering',
        'You have 120 minutes to complete 50 questions',
        'You cannot pause the exam once started',
        'Each question carries 2 marks',
        'No negative marking for wrong answers',
        'Ensure stable internet connection throughout',
      ]
    },
    {
      id: 2,
      name: 'Physics Quiz CBT',
      subject: 'Physics',
      date: '2024-05-28',
      time: '10:00 AM',
      duration: 60,
      questions: 30,
      status: 'completed',
      marks: 45,
      percentage: 75,
      grade: 'B+',
      topics: ['Mechanics', 'Waves', 'Thermodynamics'],
      instructions: [
        'Read each question carefully before answering',
        'You have 60 minutes to complete 30 questions',
        'Each question carries 2 marks',
        'No negative marking',
      ]
    },
    {
      id: 3,
      name: 'English Language Pre-Exam',
      subject: 'English Language',
      date: '2024-06-02',
      time: '3:00 PM',
      duration: 90,
      questions: 40,
      status: 'upcoming',
      marks: null,
      percentage: null,
      grade: null,
      topics: ['Comprehension', 'Grammar', 'Vocabulary', 'Essay Writing', 'Literature'],
      instructions: [
        'Read passages carefully before answering',
        'You have 90 minutes to complete 40 questions',
        'Essay section requires minimum 250 words',
        'Spell-check is disabled during the exam',
        'Each question carries 2.5 marks',
      ]
    },
    {
      id: 4,
      name: 'Chemistry Quick Assessment',
      subject: 'Chemistry',
      date: '2024-05-26',
      time: '1:30 PM',
      duration: 45,
      questions: 20,
      status: 'completed',
      marks: 18,
      percentage: 90,
      grade: 'A',
      topics: ['Organic Chemistry', 'Periodic Table', 'Chemical Bonding'],
      instructions: [
        'Quick assessment on recent topics',
        'You have 45 minutes for 20 questions',
        'Each question carries 5 marks',
        'Calculator is allowed',
      ]
    },
    {
      id: 5,
      name: 'Biology End of Term Exam',
      subject: 'Biology',
      date: '2024-06-12',
      time: '9:00 AM',
      duration: 150,
      questions: 60,
      status: 'upcoming',
      marks: null,
      percentage: null,
      grade: null,
      topics: ['Cell Biology', 'Genetics', 'Evolution', 'Ecology', 'Human Physiology'],
      instructions: [
        'Comprehensive end of term examination',
        'You have 150 minutes for 60 questions',
        'Mix of multiple choice and short answer',
        'Diagrams must be properly labeled',
        'Each question carries varying marks',
        'Results contribute 40% to term grade',
      ]
    },
    {
      id: 6,
      name: 'History Term Paper CBT',
      subject: 'History',
      date: '2024-05-20',
      time: '11:00 AM',
      duration: 60,
      questions: 25,
      status: 'missed',
      marks: null,
      percentage: null,
      grade: null,
      topics: ['World War II', 'Nigerian Independence', 'Cold War'],
      instructions: [
        'You missed this examination',
        'Contact your teacher for a makeup exam',
      ]
    },
  ]

  const subjects = [...new Set(exams.map(e => e.subject))]

  const filteredExams = exams.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         e.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = filterSubject === 'all' || e.subject === filterSubject
    const matchesStatus = filterStatus === 'all' || e.status === filterStatus
    return matchesSearch && matchesSubject && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800'
      case 'upcoming': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'
      case 'ongoing': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800'
      case 'missed': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'
      default: return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'upcoming': return <Clock className="w-4 h-4" />
      case 'ongoing': return <Play className="w-4 h-4" />
      case 'missed': return <AlertCircle className="w-4 h-4" />
      default: return null
    }
  }

  const getGradeColor = (grade: string | null) => {
    if (!grade) return ''
    if (grade.startsWith('A')) return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400'
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400'
    if (grade.startsWith('C')) return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400'
    return 'bg-red-100 text-red-700 border-red-200'
  }

  const handleStartExam = (exam: Exam) => {
    setSelectedExam(exam)
    setShowStartDialog(true)
  }

  const handleBeginExam = async () => {
    setIsStarting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsStarting(false)
    setShowStartDialog(false)
    alert(`Starting ${selectedExam?.name}... Exam session initiated!`)
  }

  const handleReviewExam = (exam: Exam) => {
    setSelectedExam(exam)
    setShowReviewDialog(true)
  }

  const completedExams = exams.filter(e => e.status === 'completed')
  const averageScore = completedExams.length > 0 
    ? Math.round(completedExams.reduce((sum, e) => sum + (e.percentage || 0), 0) / completedExams.length)
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            CBT Exams
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Computer-Based Test assessments and quizzes • {exams.length} exams
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-xs font-semibold text-gray-500">Total Exams</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{exams.length}</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-xs font-semibold text-gray-500">Completed</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedExams.length}</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-xs font-semibold text-gray-500">Avg Score</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{averageScore}%</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-xs font-semibold text-gray-500">Upcoming</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{exams.filter(e => e.status === 'upcoming').length}</p>
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
                  placeholder="Search exams by name or subject..."
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
                    {filterSubject === 'all' ? 'All Subjects' : filterSubject}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel className="text-xs font-semibold">Subject</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilterSubject('all')} className="cursor-pointer">
                    <Check className={`w-4 h-4 mr-2 ${filterSubject === 'all' ? 'opacity-100 text-blue-600' : 'opacity-0'}`} />All
                  </DropdownMenuItem>
                  {subjects.map(s => (
                    <DropdownMenuItem key={s} onClick={() => setFilterSubject(s)} className="cursor-pointer">
                      <Check className={`w-4 h-4 mr-2 ${filterSubject === s ? 'opacity-100 text-blue-600' : 'opacity-0'}`} />{s}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 text-sm font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 gap-2">
                    <Filter className="w-4 h-4" />
                    {filterStatus === 'all' ? 'All Status' : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuLabel className="text-xs font-semibold">Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {['all', 'upcoming', 'completed', 'missed'].map(s => (
                    <DropdownMenuItem key={s} onClick={() => setFilterStatus(s)} className="cursor-pointer">
                      <Check className={`w-4 h-4 mr-2 ${filterStatus === s ? 'opacity-100 text-blue-600' : 'opacity-0'}`} />{s.charAt(0).toUpperCase() + s.slice(1)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* Exams List */}
        <div className="space-y-3">
          {filteredExams.map((exam) => (
            <Card key={exam.id} className="border-0 shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition-all group">
              <CardContent className="p-5">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Exam Info */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      exam.status === 'completed' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                      exam.status === 'upcoming' ? 'bg-blue-100 dark:bg-blue-900/30' :
                      exam.status === 'ongoing' ? 'bg-amber-100 dark:bg-amber-900/30' :
                      'bg-red-100 dark:bg-red-900/30'
                    }`}>
                      {exam.status === 'completed' ? <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> :
                       exam.status === 'upcoming' ? <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" /> :
                       exam.status === 'ongoing' ? <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" /> :
                       <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 dark:text-white truncate">{exam.name}</h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-semibold border ${getStatusColor(exam.status)}`}>
                          {getStatusIcon(exam.status)}
                          {exam.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" />{exam.subject}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />{exam.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />{exam.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <HelpCircle className="w-3.5 h-3.5" />{exam.questions} questions
                        </span>
                        <span className="flex items-center gap-1">
                          <Timer className="w-3.5 h-3.5" />{exam.duration} mins
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {exam.topics.slice(0, 4).map((topic, idx) => (
                          <span key={idx} className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                            {topic}
                          </span>
                        ))}
                        {exam.topics.length > 4 && (
                          <span className="text-[10px] text-gray-400">+{exam.topics.length - 4} more</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Score Display */}
                  {exam.status === 'completed' && exam.percentage && (
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{exam.percentage}%</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold border ${getGradeColor(exam.grade)}`}>
                            {exam.grade}
                          </span>
                          <span className="text-xs text-gray-500">{exam.marks}/{exam.questions}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {exam.status === 'upcoming' ? (
                      <Button 
                        size="sm" 
                        className="h-9 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white gap-1.5 shadow-sm"
                        onClick={() => handleStartExam(exam)}
                      >
                        <Play className="w-3.5 h-3.5" />Start Exam
                      </Button>
                    ) : exam.status === 'completed' ? (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-9 text-xs font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 gap-1.5"
                        onClick={() => handleReviewExam(exam)}
                      >
                        <Eye className="w-3.5 h-3.5" />Review
                      </Button>
                    ) : exam.status === 'missed' ? (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-9 text-xs font-medium text-red-600 border-red-300 dark:border-red-700 gap-1.5"
                      >
                        <AlertCircle className="w-3.5 h-3.5" />Request Retake
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        className="h-9 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5" />Resume
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Start Exam Dialog */}
      <Dialog open={showStartDialog} onOpenChange={setShowStartDialog}>
        <DialogContent className="sm:max-w-lg bg-white dark:bg-gray-800 border-0">
          {selectedExam && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Play className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white">Start Exam</DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-400">{selectedExam.name}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-xs text-gray-500">Questions</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedExam.questions}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedExam.duration} mins</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-xs text-gray-500">Subject</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{selectedExam.subject}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-xs text-gray-500">Date & Time</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{selectedExam.date} {selectedExam.time}</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                  <p className="text-sm font-bold text-amber-900 dark:text-amber-300 mb-2">Important Instructions:</p>
                  <ul className="space-y-1.5">
                    {selectedExam.instructions.map((instruction, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-amber-800 dark:text-amber-400">
                        <span className="text-amber-500 mt-0.5">•</span>
                        {instruction}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowStartDialog(false)} className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600">
                  Cancel
                </Button>
                <Button onClick={handleBeginExam} disabled={isStarting} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                  {isStarting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                  {isStarting ? 'Starting...' : 'Begin Exam'}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Review Exam Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent className="sm:max-w-lg bg-white dark:bg-gray-800 border-0">
          {selectedExam && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white">Exam Results</DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-400">{selectedExam.name}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="text-center p-6 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                  <p className="text-4xl font-bold text-emerald-700 dark:text-emerald-400">{selectedExam.percentage}%</p>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">Score: {selectedExam.marks}/{selectedExam.questions}</p>
                  <span className={`inline-flex px-3 py-1 rounded-lg text-lg font-bold border mt-2 ${getGradeColor(selectedExam.grade)}`}>
                    Grade: {selectedExam.grade}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-xs text-gray-500">Correct</p>
                    <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{selectedExam.marks}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-xs text-gray-500">Incorrect</p>
                    <p className="text-lg font-bold text-red-600 dark:text-red-400">{(selectedExam.questions || 0) - (selectedExam.marks || 0)}</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowReviewDialog(false)} className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600">
                  Close
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                  <Eye className="w-4 h-4" />View Full Review
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}