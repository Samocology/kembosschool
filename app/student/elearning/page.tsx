'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  BookOpen, Play, CheckCircle, Lock, Search, Filter,
  Clock, Award, TrendingUp, ChevronRight, Eye,
  Download, Star, BarChart3, Target, Zap, ChevronDown,
  Check, X, RefreshCw, GraduationCap, FileText, Video,
  Headphones, ClipboardList, ArrowRight, Trophy, Users, User
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

interface Lesson {
  id: number
  title: string
  duration: string
  type: 'video' | 'reading' | 'quiz' | 'audio'
  completed: boolean
  score?: number
}

interface Module {
  id: number
  subject: string
  title: string
  description: string
  progress: number
  lessons: Lesson[]
  status: 'active' | 'completed' | 'locked'
  instructor: string
  totalDuration: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  rating: number
  enrolledStudents: number
}

export default function ELearning() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterSubject, setFilterSubject] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [showModuleDetail, setShowModuleDetail] = useState(false)
  const [showLessonView, setShowLessonView] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)

  const modules: Module[] = [
    {
      id: 1,
      subject: 'Mathematics',
      title: 'Advanced Algebra Module 5',
      description: 'Master quadratic equations, polynomials, and algebraic expressions with interactive lessons and practice problems.',
      progress: 75,
      status: 'active',
      instructor: 'Mr. Adeleke',
      totalDuration: '4h 30m',
      difficulty: 'Advanced',
      rating: 4.8,
      enrolledStudents: 45,
      lessons: [
        { id: 1, title: 'Introduction to Quadratic Equations', duration: '25 min', type: 'video', completed: true, score: 90 },
        { id: 2, title: 'Factoring Methods', duration: '30 min', type: 'reading', completed: true, score: 85 },
        { id: 3, title: 'Completing the Square', duration: '20 min', type: 'video', completed: true, score: 88 },
        { id: 4, title: 'Quadratic Formula', duration: '35 min', type: 'video', completed: true, score: 92 },
        { id: 5, title: 'Practice Problems Set 1', duration: '40 min', type: 'quiz', completed: true, score: 87 },
        { id: 6, title: 'Graphing Quadratic Functions', duration: '30 min', type: 'video', completed: true, score: 85 },
        { id: 7, title: 'Real-World Applications', duration: '25 min', type: 'reading', completed: true, score: 90 },
        { id: 8, title: 'Word Problems', duration: '35 min', type: 'quiz', completed: true, score: 82 },
        { id: 9, title: 'Complex Numbers Introduction', duration: '30 min', type: 'video', completed: true, score: 88 },
        { id: 10, title: 'Mid-Module Assessment', duration: '45 min', type: 'quiz', completed: false },
        { id: 11, title: 'Advanced Factoring Techniques', duration: '25 min', type: 'reading', completed: false },
        { id: 12, title: 'Final Module Exam', duration: '60 min', type: 'quiz', completed: false },
      ]
    },
    {
      id: 2,
      subject: 'Physics',
      title: 'Quantum Mechanics Basics',
      description: 'Explore the fascinating world of quantum mechanics, wave-particle duality, and modern physics concepts.',
      progress: 45,
      status: 'active',
      instructor: 'Mrs. Adebayo',
      totalDuration: '3h 15m',
      difficulty: 'Advanced',
      rating: 4.6,
      enrolledStudents: 42,
      lessons: [
        { id: 1, title: 'What is Quantum Mechanics?', duration: '20 min', type: 'video', completed: true, score: 88 },
        { id: 2, title: 'Wave-Particle Duality', duration: '25 min', type: 'video', completed: true, score: 85 },
        { id: 3, title: 'Schrödinger Equation Basics', duration: '35 min', type: 'reading', completed: true, score: 80 },
        { id: 4, title: 'Quantum States', duration: '30 min', type: 'video', completed: true, score: 82 },
        { id: 5, title: 'Practice Quiz 1', duration: '30 min', type: 'quiz', completed: false },
        { id: 6, title: 'Uncertainty Principle', duration: '25 min', type: 'video', completed: false },
        { id: 7, title: 'Quantum Tunneling', duration: '20 min', type: 'audio', completed: false },
        { id: 8, title: 'Practice Quiz 2', duration: '30 min', type: 'quiz', completed: false },
        { id: 9, title: 'Applications in Technology', duration: '25 min', type: 'reading', completed: false },
        { id: 10, title: 'Final Assessment', duration: '45 min', type: 'quiz', completed: false },
      ]
    },
    {
      id: 3,
      subject: 'Biology',
      title: 'Cell Biology and Genetics',
      description: 'Comprehensive study of cell structure, function, DNA, genetics, and heredity with virtual lab simulations.',
      progress: 100,
      status: 'completed',
      instructor: 'Dr. Okonkwo',
      totalDuration: '3h 45m',
      difficulty: 'Intermediate',
      rating: 4.9,
      enrolledStudents: 43,
      lessons: [
        { id: 1, title: 'Cell Structure Overview', duration: '25 min', type: 'video', completed: true, score: 95 },
        { id: 2, title: 'Cell Membrane & Transport', duration: '30 min', type: 'reading', completed: true, score: 92 },
        { id: 3, title: 'Mitosis & Meiosis', duration: '35 min', type: 'video', completed: true, score: 90 },
        { id: 4, title: 'DNA Structure & Replication', duration: '30 min', type: 'video', completed: true, score: 88 },
        { id: 5, title: 'Virtual Lab: Cell Division', duration: '45 min', type: 'quiz', completed: true, score: 94 },
        { id: 6, title: 'Genetics & Heredity', duration: '25 min', type: 'reading', completed: true, score: 91 },
        { id: 7, title: 'Punnett Squares Practice', duration: '35 min', type: 'quiz', completed: true, score: 89 },
        { id: 8, title: 'Final Module Exam', duration: '40 min', type: 'quiz', completed: true, score: 93 },
      ]
    },
    {
      id: 4,
      subject: 'Chemistry',
      title: 'Organic Chemistry 201',
      description: 'Advanced organic chemistry covering reaction mechanisms, synthesis, and spectroscopy analysis.',
      progress: 0,
      status: 'locked',
      instructor: 'Mr. Ibrahim',
      totalDuration: '5h 00m',
      difficulty: 'Advanced',
      rating: 4.7,
      enrolledStudents: 38,
      lessons: [
        { id: 1, title: 'Review of Organic Chemistry Basics', duration: '25 min', type: 'video', completed: false },
        { id: 2, title: 'Reaction Mechanisms', duration: '35 min', type: 'video', completed: false },
        { id: 3, title: 'Nucleophilic Substitution', duration: '30 min', type: 'reading', completed: false },
        { id: 4, title: 'Elimination Reactions', duration: '25 min', type: 'video', completed: false },
        { id: 5, title: 'Practice Problems Set 1', duration: '40 min', type: 'quiz', completed: false },
        { id: 6, title: 'Electrophilic Addition', duration: '30 min', type: 'video', completed: false },
        { id: 7, title: 'Radical Reactions', duration: '25 min', type: 'reading', completed: false },
        { id: 8, title: 'Spectroscopy Basics', duration: '35 min', type: 'video', completed: false },
        { id: 9, title: 'NMR Spectroscopy', duration: '30 min', type: 'audio', completed: false },
        { id: 10, title: 'Practice Problems Set 2', duration: '45 min', type: 'quiz', completed: false },
        { id: 11, title: 'Synthesis Strategies', duration: '35 min', type: 'video', completed: false },
        { id: 12, title: 'Mid-Module Review', duration: '30 min', type: 'quiz', completed: false },
        { id: 13, title: 'Advanced Mechanisms', duration: '40 min', type: 'video', completed: false },
        { id: 14, title: 'Practice Problems Set 3', duration: '45 min', type: 'quiz', completed: false },
        { id: 15, title: 'Final Module Exam', duration: '60 min', type: 'quiz', completed: false },
      ]
    },
  ]

  const subjects = [...new Set(modules.map(m => m.subject))]

  const filteredModules = modules.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         m.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = filterSubject === 'all' || m.subject === filterSubject
    const matchesStatus = filterStatus === 'all' || m.status === filterStatus
    return matchesSearch && matchesSubject && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400'
      case 'completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400'
      case 'locked': return 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-400'
      default: return ''
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-emerald-600 dark:text-emerald-400'
      case 'Intermediate': return 'text-amber-600 dark:text-amber-400'
      case 'Advanced': return 'text-red-600 dark:text-red-400'
      default: return ''
    }
  }

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4 text-blue-500" />
      case 'reading': return <FileText className="w-4 h-4 text-purple-500" />
      case 'quiz': return <ClipboardList className="w-4 h-4 text-amber-500" />
      case 'audio': return <Headphones className="w-4 h-4 text-emerald-500" />
      default: return <BookOpen className="w-4 h-4" />
    }
  }

  const handleContinueLearning = (module: Module) => {
    setSelectedModule(module)
    setShowModuleDetail(true)
  }

  const handleStartLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson)
    setShowLessonView(true)
  }

  const totalCompleted = modules.reduce((sum, m) => sum + m.lessons.filter(l => l.completed).length, 0)
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0)
  const averageProgress = Math.round(modules.reduce((sum, m) => sum + m.progress, 0) / modules.length)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              E-Learning Modules
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Interactive lessons and learning materials for your courses
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-xs font-semibold text-gray-500">Modules</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{modules.length}</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-xs font-semibold text-gray-500">Lessons Done</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalCompleted}/{totalLessons}</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-xs font-semibold text-gray-500">Avg Progress</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{averageProgress}%</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-xs font-semibold text-gray-500">Total Time</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">16h 30m</p>
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
                  placeholder="Search modules by title or subject..."
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
                    <Check className={`w-4 h-4 mr-2 ${filterSubject === 'all' ? 'opacity-100 text-blue-600' : 'opacity-0'}`} />All Subjects
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
                  {['all', 'active', 'completed', 'locked'].map(s => (
                    <DropdownMenuItem key={s} onClick={() => setFilterStatus(s)} className="cursor-pointer">
                      <Check className={`w-4 h-4 mr-2 ${filterStatus === s ? 'opacity-100 text-blue-600' : 'opacity-0'}`} />{s.charAt(0).toUpperCase() + s.slice(1)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* Module Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredModules.map((module) => (
            <Card key={module.id} className="border-0 shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition-all group overflow-hidden">
              <CardContent className="p-0">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                        {module.subject}
                      </span>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(module.status)}`}>
                        {module.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{module.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{module.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{module.description}</p>

                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />{module.instructor}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />{module.totalDuration}
                    </span>
                    <span className={`flex items-center gap-1 font-medium ${getDifficultyColor(module.difficulty)}`}>
                      <Target className="w-3 h-3" />{module.difficulty}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-500">
                        {module.lessons.filter(l => l.completed).length}/{module.lessons.length} lessons
                      </span>
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{module.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          module.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                  </div>

                  {module.status === 'active' && (
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold gap-2 h-10"
                      onClick={() => handleContinueLearning(module)}
                    >
                      <Play className="w-4 h-4" />
                      Continue Learning
                    </Button>
                  )}
                  {module.status === 'completed' && (
                    <Button variant="outline" className="w-full text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700 font-semibold" disabled>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Completed
                    </Button>
                  )}
                  {module.status === 'locked' && (
                    <Button variant="outline" className="w-full text-gray-500 border-gray-300 dark:border-gray-600" disabled>
                      <Lock className="w-4 h-4 mr-2" />
                      Complete Prerequisites First
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Module Detail Dialog */}
      <Dialog open={showModuleDetail} onOpenChange={setShowModuleDetail}>
        <DialogContent className="sm:max-w-2xl bg-white dark:bg-gray-800 border-0 max-h-[85vh] overflow-y-auto">
          {selectedModule && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">{selectedModule.title}</DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-400">
                      {selectedModule.subject} • {selectedModule.instructor}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">{selectedModule.description}</p>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedModule.progress}%</p>
                    <p className="text-xs text-gray-500">Progress</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedModule.totalDuration}</p>
                    <p className="text-xs text-gray-500">Duration</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-center">
                    <p className={`text-lg font-bold ${getDifficultyColor(selectedModule.difficulty)}`}>{selectedModule.difficulty}</p>
                    <p className="text-xs text-gray-500">Level</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
                    Lessons ({selectedModule.lessons.length})
                  </h4>
                  <div className="space-y-2">
                    {selectedModule.lessons.map((lesson, idx) => (
                      <div 
                        key={lesson.id}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer ${
                          lesson.completed 
                            ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800' 
                            : 'bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                        onClick={() => !lesson.completed && selectedModule.status !== 'locked' && handleStartLesson(lesson)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-400">
                            {idx + 1}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{lesson.title}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              {getLessonIcon(lesson.type)}
                              <span className="text-xs text-gray-500">{lesson.duration}</span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-500 capitalize">{lesson.type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {lesson.completed ? (
                            <div className="flex items-center gap-2">
                              {lesson.score && (
                                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{lesson.score}%</span>
                              )}
                              <CheckCircle className="w-5 h-5 text-emerald-500" />
                            </div>
                          ) : (
                            <Play className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Lesson View Dialog */}
      <Dialog open={showLessonView} onOpenChange={setShowLessonView}>
        <DialogContent className="sm:max-w-3xl bg-white dark:bg-gray-800 border-0 min-h-[400px]">
          {selectedLesson && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white">{selectedLesson.title}</DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-400">
                  {selectedLesson.duration} • {selectedLesson.type}
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  {getLessonIcon(selectedLesson.type)}
                  <div className="w-16 h-16 mx-auto mt-4 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Play className="w-8 h-8 text-blue-600 dark:text-blue-400 ml-1" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Ready to start this lesson</p>
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white gap-2">
                    <Play className="w-4 h-4" /> Start Lesson
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}