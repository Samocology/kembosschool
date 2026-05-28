'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, Calendar, Clock, Upload, CheckCircle, AlertCircle,
  Search, Filter, ChevronDown, Check, X, Eye, Download,
  RefreshCw, TrendingUp, BookOpen, GraduationCap, ArrowUpRight,
  MoreHorizontal, ClipboardList, Paperclip, Send, FileUp,
  Image, File, FileArchive, Trash2, Plus, Maximize2, XCircle
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

interface UploadedFile {
  id: number
  name: string
  size: string
  type: string
  uploadedAt: string
  preview?: string
}

interface Assignment {
  id: number
  title: string
  subject: string
  dueDate: string
  daysLeft: number
  status: 'pending' | 'submitted' | 'graded' | 'overdue'
  priority: 'high' | 'medium' | 'low'
  description: string
  instructions: string
  submitted: boolean
  submittedDate?: string
  score?: number
  grade?: string
  feedback?: string
  attachments?: number
  maxScore: number
  uploadedFiles?: UploadedFile[]
  teacherName: string
  resources: { name: string; type: string; size: string }[]
}

export default function StudentAssignments() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterSubject, setFilterSubject] = useState('all')
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [showFullAssignmentDialog, setShowFullAssignmentDialog] = useState(false)
  const [showImageViewer, setShowImageViewer] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 1,
      title: 'Quadratic Equations Worksheet',
      subject: 'Mathematics',
      dueDate: '2024-05-27',
      daysLeft: 2,
      status: 'pending',
      priority: 'high',
      description: 'Solve 20 quadratic equations using factorization, completing the square, and the quadratic formula.',
      instructions: '1. Show all working steps clearly\n2. Use proper mathematical notation\n3. Double-check your answers\n4. Submit in PDF format\n5. Include your name and admission number on each page',
      submitted: false,
      maxScore: 100,
      attachments: 1,
      teacherName: 'Mr. Adeleke',
      resources: [
        { name: 'Quadratic_Equations_Guide.pdf', type: 'PDF', size: '1.2 MB' },
        { name: 'Example_Problems.docx', type: 'DOC', size: '456 KB' },
      ],
      uploadedFiles: [],
    },
    {
      id: 2,
      title: 'Essay on Environmental Conservation',
      subject: 'English Language',
      dueDate: '2024-05-30',
      daysLeft: 5,
      status: 'pending',
      priority: 'medium',
      description: 'Write a 1500-2000 word persuasive essay on the importance of environmental conservation in modern society.',
      instructions: '1. Include at least 5 credible sources\n2. Use proper citation format (APA)\n3. Structure: Introduction, Body (3-4 paragraphs), Conclusion\n4. Font: Times New Roman, Size 12, Double-spaced\n5. Submit as PDF or DOCX',
      submitted: false,
      maxScore: 100,
      attachments: 2,
      teacherName: 'Mrs. Chukwu',
      resources: [
        { name: 'Essay_Guidelines.pdf', type: 'PDF', size: '890 KB' },
        { name: 'Sample_Essay.pdf', type: 'PDF', size: '1.5 MB' },
      ],
      uploadedFiles: [],
    },
    {
      id: 3,
      title: 'Photosynthesis Lab Report',
      subject: 'Biology',
      dueDate: '2024-05-28',
      daysLeft: 3,
      status: 'pending',
      priority: 'high',
      description: 'Complete the lab report on photosynthesis experiment.',
      instructions: '1. Include hypothesis and methodology\n2. Present results with charts/diagrams\n3. Write a detailed conclusion\n4. Attach lab photos as evidence\n5. Submit as PDF with images embedded',
      submitted: false,
      maxScore: 100,
      attachments: 1,
      teacherName: 'Dr. Okonkwo',
      resources: [
        { name: 'Lab_Report_Template.docx', type: 'DOC', size: '234 KB' },
        { name: 'Photosynthesis_Diagram.png', type: 'IMG', size: '3.1 MB' },
      ],
      uploadedFiles: [],
    },
    {
      id: 4,
      title: 'Historical Timeline Project',
      subject: 'History',
      dueDate: '2024-05-25',
      daysLeft: 0,
      status: 'submitted',
      priority: 'low',
      description: 'Create a visual timeline of major historical events from 1900-2000.',
      instructions: '1. Include at least 20 major events\n2. Use images and illustrations\n3. Provide brief descriptions for each event\n4. Can be submitted as poster, presentation, or document\n5. Cite all sources used',
      submitted: true,
      submittedDate: '2024-05-24',
      maxScore: 100,
      attachments: 3,
      teacherName: 'Mr. Oluwaseun',
      resources: [
        { name: 'Timeline_Example.pdf', type: 'PDF', size: '2.8 MB' },
      ],
      uploadedFiles: [
        { id: 1, name: 'timeline_project.pdf', size: '2.4 MB', type: 'PDF', uploadedAt: 'May 24, 10:30 AM' },
        { id: 2, name: 'references.docx', size: '156 KB', type: 'DOC', uploadedAt: 'May 24, 10:31 AM' },
      ],
    },
    {
      id: 5,
      title: 'French Translation Exercise',
      subject: 'French',
      dueDate: '2024-05-29',
      daysLeft: 4,
      status: 'pending',
      priority: 'low',
      description: 'Translate 10 paragraphs from English to French.',
      instructions: '1. Focus on proper grammar and vocabulary\n2. Use appropriate verb conjugations\n3. Maintain original meaning\n4. Submit as DOCX or PDF\n5. Include both original and translated text',
      submitted: false,
      maxScore: 100,
      attachments: 1,
      teacherName: 'Mrs. Eze',
      resources: [
        { name: 'French_Grammar_Reference.pdf', type: 'PDF', size: '1.8 MB' },
      ],
      uploadedFiles: [],
    },
    {
      id: 6,
      title: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      dueDate: '2024-05-26',
      daysLeft: 1,
      status: 'graded',
      priority: 'high',
      description: 'Complete the organic chemistry reaction mechanisms worksheet.',
      instructions: '1. Draw clear reaction mechanisms\n2. Show all intermediates\n3. Label all reagents and conditions\n4. Submit as PDF with clear diagrams\n5. Use proper chemical notation',
      submitted: true,
      submittedDate: '2024-05-25',
      score: 92,
      grade: 'A',
      feedback: 'Excellent work! Very clear mechanisms. Minor error in reaction 7 - check the arrow pushing. Overall, outstanding demonstration of understanding.',
      maxScore: 100,
      attachments: 2,
      teacherName: 'Mr. Ibrahim',
      resources: [
        { name: 'Reaction_Mechanisms_Guide.pdf', type: 'PDF', size: '3.2 MB' },
        { name: 'Practice_Problems.pdf', type: 'PDF', size: '1.1 MB' },
      ],
      uploadedFiles: [
        { id: 1, name: 'chemistry_reactions.pdf', size: '3.1 MB', type: 'PDF', uploadedAt: 'May 25, 8:15 PM' },
      ],
    },
  ])

  const subjects = [...new Set(assignments.map(a => a.subject))]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800'
      case 'graded': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800'
      case 'overdue': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'
      default: return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800'
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'
      default: return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  const getFileIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case 'PDF': return <FileText className="w-5 h-5 text-red-500" />
      case 'DOC':
      case 'DOCX': return <FileText className="w-5 h-5 text-blue-500" />
      case 'JPG':
      case 'JPEG':
      case 'PNG':
      case 'GIF':
      case 'IMG': return <Image className="w-5 h-5 text-purple-500" />
      case 'ZIP':
      case 'RAR': return <FileArchive className="w-5 h-5 text-amber-500" />
      default: return <File className="w-5 h-5 text-gray-500" />
    }
  }

  const isImageFile = (type: string) => {
    return ['JPG', 'JPEG', 'PNG', 'GIF', 'IMG'].includes(type.toUpperCase())
  }

  const filteredAssignments = assignments.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         a.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || a.status === filterStatus
    const matchesSubject = filterSubject === 'all' || a.subject === filterSubject
    return matchesSearch && matchesStatus && matchesSubject
  })

  const pendingCount = assignments.filter(a => a.status === 'pending').length
  const submittedCount = assignments.filter(a => a.status === 'submitted' || a.status === 'graded').length
  const overdueCount = assignments.filter(a => a.status === 'overdue' || (a.daysLeft === 0 && a.status === 'pending')).length

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newFiles: UploadedFile[] = Array.from(files).map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        size: formatFileSize(file.size),
        type: getFileType(file.name),
        uploadedAt: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
      }))
      setUploadedFiles(prev => [...prev, ...newFiles])
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const getFileType = (filename: string): string => {
    return filename.split('.').pop()?.toUpperCase() || 'Unknown'
  }

  const handleRemoveFile = (fileId: number) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files) {
      const newFiles: UploadedFile[] = Array.from(files).map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        size: formatFileSize(file.size),
        type: getFileType(file.name),
        uploadedAt: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
      }))
      setUploadedFiles(prev => [...prev, ...newFiles])
    }
  }

  const handleSubmitAssignment = async () => {
    if (!selectedAssignment) return
    if (uploadedFiles.length === 0) {
      alert('Please upload at least one file before submitting.')
      return
    }
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setAssignments(prev => prev.map(a => 
      a.id === selectedAssignment.id 
        ? { ...a, status: 'submitted' as const, submitted: true, submittedDate: new Date().toISOString().split('T')[0], uploadedFiles: [...uploadedFiles] }
        : a
    ))
    setIsSubmitting(false)
    setShowSubmitDialog(false)
    setUploadedFiles([])
    alert('Assignment submitted successfully!')
  }

  const handleViewDetails = (assignment: Assignment) => {
    setSelectedAssignment(assignment)
    setShowDetailDialog(true)
  }

  const handleOpenSubmit = (assignment: Assignment) => {
    setSelectedAssignment(assignment)
    setUploadedFiles([])
    setShowSubmitDialog(true)
  }

  const handleViewFullAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment)
    setShowFullAssignmentDialog(true)
  }

  const handleDownloadResource = (resource: { name: string; type: string; size: string }) => {
    alert(`Downloading ${resource.name}...`)
  }

  const handleDownloadFile = (file: UploadedFile) => {
    alert(`Downloading ${file.name}...`)
  }

  const handleViewImage = (file: UploadedFile) => {
    setSelectedImage(file.name)
    setShowImageViewer(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Assignments</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage your coursework and submission deadlines • {pendingCount} pending</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total', value: assignments.length, icon: FileText, color: 'blue', filter: 'all' },
            { label: 'Pending', value: pendingCount, icon: Clock, color: 'amber', filter: 'pending' },
            { label: 'Submitted', value: submittedCount, icon: CheckCircle, color: 'emerald', filter: 'submitted' },
            { label: 'Overdue', value: overdueCount, icon: AlertCircle, color: 'red', filter: undefined },
          ].map((stat) => (
            <Card key={stat.label} className="border-0 shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition-all cursor-pointer" onClick={() => stat.filter && setFilterStatus(stat.filter)}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/30 flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Search by title or subject..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 pr-10 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white h-10 text-sm" />
                {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 text-sm font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 gap-2">
                    <Filter className="w-4 h-4" />{filterStatus === 'all' ? 'All Status' : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}<ChevronDown className="w-3.5 h-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuLabel className="text-xs font-semibold">Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {['all', 'pending', 'submitted', 'graded', 'overdue'].map(s => (
                    <DropdownMenuItem key={s} onClick={() => setFilterStatus(s)} className="cursor-pointer">
                      <Check className={`w-4 h-4 mr-2 ${filterStatus === s ? 'opacity-100 text-blue-600' : 'opacity-0'}`} />{s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 text-sm font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 gap-2">
                    <BookOpen className="w-4 h-4" />{filterSubject === 'all' ? 'All Subjects' : filterSubject}<ChevronDown className="w-3.5 h-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel className="text-xs font-semibold">Subject</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilterSubject('all')} className="cursor-pointer"><Check className={`w-4 h-4 mr-2 ${filterSubject === 'all' ? 'opacity-100 text-blue-600' : 'opacity-0'}`} />All Subjects</DropdownMenuItem>
                  {subjects.map(subject => (
                    <DropdownMenuItem key={subject} onClick={() => setFilterSubject(subject)} className="cursor-pointer"><Check className={`w-4 h-4 mr-2 ${filterSubject === subject ? 'opacity-100 text-blue-600' : 'opacity-0'}`} />{subject}</DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {filteredAssignments.map((assignment) => (
            <Card key={assignment.id} className="border-0 shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition-all group">
              <CardContent className="p-5">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${assignment.status === 'graded' ? 'bg-emerald-100 dark:bg-emerald-900/30' : assignment.status === 'submitted' ? 'bg-blue-100 dark:bg-blue-900/30' : assignment.status === 'overdue' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-amber-100 dark:bg-amber-900/30'}`}>
                      <FileText className={`w-5 h-5 ${assignment.status === 'graded' ? 'text-emerald-600 dark:text-emerald-400' : assignment.status === 'submitted' ? 'text-blue-600 dark:text-blue-400' : 'text-amber-600 dark:text-amber-400'}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 dark:text-white truncate">{assignment.title}</h3>
                        <span className={`inline-flex px-2 py-0.5 rounded-lg text-xs font-semibold border ${getStatusColor(assignment.status)}`}>{assignment.status}</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{assignment.description}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{assignment.subject}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Due: {assignment.dueDate}</span>
                        {assignment.daysLeft > 0 ? <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400"><Clock className="w-3.5 h-3.5" />{assignment.daysLeft} days left</span> : assignment.status === 'pending' && <span className="flex items-center gap-1 text-red-600 dark:text-red-400"><AlertCircle className="w-3.5 h-3.5" />Due today</span>}
                        <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5" />{assignment.teacherName}</span>
                      </div>
                    </div>
                  </div>
                  {assignment.grade && (
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="text-center px-3">
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{assignment.score}%</p>
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold border ${getStatusColor('graded')}`}>{assignment.grade}</span>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold border ${getPriorityColor(assignment.priority)}`}>{assignment.priority}</span>
                    <Button size="sm" variant="outline" className="h-9 text-xs font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 gap-1.5" onClick={() => handleViewFullAssignment(assignment)}>
                      <Eye className="w-3.5 h-3.5" />View
                    </Button>
                    {assignment.status === 'pending' ? (
                      <Button size="sm" className="h-9 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white gap-1.5 shadow-sm" onClick={() => handleOpenSubmit(assignment)}>
                        <Upload className="w-3.5 h-3.5" />Submit
                      </Button>
                    ) : assignment.status === 'graded' ? (
                      <Button size="sm" variant="outline" className="h-9 text-xs font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 gap-1.5" onClick={() => handleViewDetails(assignment)}>
                        <Eye className="w-3.5 h-3.5" />Feedback
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" className="h-9 text-xs font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600" disabled>
                        <CheckCircle className="w-3.5 h-3.5" />Submitted
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Full Assignment View Dialog */}
      <Dialog open={showFullAssignmentDialog} onOpenChange={setShowFullAssignmentDialog}>
        <DialogContent className="sm:max-w-2xl bg-white dark:bg-gray-800 border-0 max-h-[85vh] overflow-y-auto">
          {selectedAssignment && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedAssignment.status === 'graded' ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-blue-100 dark:bg-blue-900/30'}`}>
                    <FileText className={`w-5 h-5 ${selectedAssignment.status === 'graded' ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'}`} />
                  </div>
                  <div>
                    <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">{selectedAssignment.title}</DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-400">{selectedAssignment.subject} • {selectedAssignment.teacherName}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-xs text-gray-500">Due Date</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{selectedAssignment.dueDate}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-xs text-gray-500">Max Score</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{selectedAssignment.maxScore} pts</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-xs text-gray-500">Status</p>
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold border mt-1 ${getStatusColor(selectedAssignment.status)}`}>{selectedAssignment.status}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-xs text-gray-500">Priority</p>
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold border mt-1 ${getPriorityColor(selectedAssignment.priority)}`}>{selectedAssignment.priority}</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Description</h4>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{selectedAssignment.description}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Instructions</h4>
                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-900 dark:text-blue-300 whitespace-pre-wrap">{selectedAssignment.instructions}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Resources ({selectedAssignment.resources.length})</h4>
                  <div className="space-y-2">
                    {selectedAssignment.resources.map((resource, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          {getFileIcon(resource.type)}
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{resource.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{resource.size}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="h-8 text-xs text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600" onClick={() => handleDownloadResource(resource)}>
                          <Download className="w-3.5 h-3.5 mr-1" />Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                {selectedAssignment.submitted && selectedAssignment.uploadedFiles && selectedAssignment.uploadedFiles.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Your Submission ({selectedAssignment.uploadedFiles.length} files)</h4>
                    <div className="space-y-2">
                      {selectedAssignment.uploadedFiles.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                          <div className="flex items-center gap-3">
                            {getFileIcon(file.type)}
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{file.size} • {file.uploadedAt}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {isImageFile(file.type) && (
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-500 hover:text-purple-600" onClick={() => handleViewImage(file)}>
                                <Maximize2 className="w-4 h-4" />
                              </Button>
                            )}
                            <Button size="sm" variant="outline" className="h-8 text-xs text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600" onClick={() => handleDownloadFile(file)}>
                              <Download className="w-3.5 h-3.5 mr-1" />Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Submit Assignment Dialog */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent className="sm:max-w-lg bg-white dark:bg-gray-800 border-0">
          {selectedAssignment && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Upload className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white">Submit Assignment</DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-400">{selectedAssignment.title}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-gray-600 dark:text-gray-400">Subject</span><span className="font-semibold text-gray-900 dark:text-white">{selectedAssignment.subject}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-600 dark:text-gray-400">Due Date</span><span className="font-semibold text-gray-900 dark:text-white">{selectedAssignment.dueDate}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-600 dark:text-gray-400">Max Score</span><span className="font-semibold text-gray-900 dark:text-white">{selectedAssignment.maxScore} points</span></div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-1"><Paperclip className="w-4 h-4" />Upload Files <span className="text-red-500">*</span></label>
                  <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'}`}>
                    <FileUp className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">Drag and drop your files here</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-3">or click to browse from your computer</p>
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg cursor-pointer transition-colors">
                      <Plus className="w-4 h-4" />Browse Files
                      <Input type="file" multiple className="hidden" onChange={handleFileSelect} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip,.rar,.txt,.ppt,.pptx" />
                    </label>
                    <p className="text-xs text-gray-400 mt-3">Supported: PDF, DOC, DOCX, JPG, PNG, ZIP, RAR, TXT, PPT (Max 10MB each)</p>
                  </div>
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{uploadedFiles.length} file{uploadedFiles.length > 1 ? 's' : ''} selected</p>
                      <div className="space-y-1">
                        {uploadedFiles.map((file) => (
                          <div key={file.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 group">
                            <div className="flex items-center gap-3 min-w-0">
                              {getFileIcon(file.type)}
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{file.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{file.size} • {file.type}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              {isImageFile(file.type) && <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-purple-600" onClick={() => handleViewImage(file)}><Maximize2 className="w-4 h-4" /></Button>}
                              <span className="text-xs text-gray-400 mr-2">{file.uploadedAt}</span>
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-red-600 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleRemoveFile(file.id)}><Trash2 className="w-4 h-4" /></Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" className="text-xs text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600" onClick={() => setUploadedFiles([])}><Trash2 className="w-3.5 h-3.5 mr-1" />Remove All</Button>
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => { setShowSubmitDialog(false); setUploadedFiles([]); }} className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600">Cancel</Button>
                <Button onClick={handleSubmitAssignment} disabled={isSubmitting || uploadedFiles.length === 0} className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-lg shadow-blue-600/20">
                  {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}{isSubmitting ? 'Submitting...' : 'Submit Assignment'}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Image Viewer Dialog */}
      <Dialog open={showImageViewer} onOpenChange={setShowImageViewer}>
        <DialogContent className="sm:max-w-3xl bg-white dark:bg-gray-800 border-0">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white">{selectedImage}</DialogTitle>
              <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700" onClick={() => setShowImageViewer(false)}><XCircle className="w-5 h-5" /></Button>
            </div>
          </DialogHeader>
          <div className="flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 rounded-xl min-h-[300px]">
            <div className="text-center">
              <Image className="w-24 h-24 text-purple-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{selectedImage}</p>
              <p className="text-xs text-gray-500 mt-1">Image preview</p>
              <Button size="sm" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white gap-2" onClick={() => alert(`Downloading ${selectedImage}...`)}>
                <Download className="w-4 h-4" />Download Image
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}