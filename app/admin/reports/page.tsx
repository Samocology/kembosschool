'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  BarChart3, Download, Filter, Search, X, Check, 
  FileText, FileSpreadsheet, TrendingUp, Users,
  GraduationCap, DollarSign, Calendar, Clock,
  RefreshCw, Eye, ChevronDown, Plus
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Report {
  id: number
  name: string
  type: string
  category: string
  generated: string
  size: string
  author: string
}

export default function AdminReports() {
  const [reports, setReports] = useState<Report[]>([
    { id: 1, name: 'Academic Performance Report', type: 'PDF', category: 'Academic', generated: '2024-05-24', size: '2.4 MB', author: 'Dr. Okonkwo' },
    { id: 2, name: 'Student Attendance Summary', type: 'Excel', category: 'Attendance', generated: '2024-05-23', size: '1.8 MB', author: 'Mrs. Chukwu' },
    { id: 3, name: 'Finance & Payment Report', type: 'Excel', category: 'Finance', generated: '2024-05-20', size: '3.2 MB', author: 'Admin' },
    { id: 4, name: 'Staff Payroll Report', type: 'PDF', category: 'Finance', generated: '2024-05-15', size: '1.1 MB', author: 'Admin' },
    { id: 5, name: 'Enrollment Statistics', type: 'Excel', category: 'Academic', generated: '2024-05-10', size: '892 KB', author: 'Dr. Okonkwo' },
    { id: 6, name: 'Parent-Teacher Meeting Summary', type: 'PDF', category: 'Communication', generated: '2024-05-08', size: '1.5 MB', author: 'Mrs. Chukwu' },
    { id: 7, name: 'Infrastructure Assessment', type: 'PDF', category: 'Administrative', generated: '2024-05-05', size: '4.1 MB', author: 'Admin' },
    { id: 8, name: 'Student Health Records', type: 'Excel', category: 'Health', generated: '2024-05-01', size: '2.9 MB', author: 'Admin' },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [isGenerateOpen, setIsGenerateOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState<number | null>(null)
  
  // Generate report form
  const [generateForm, setGenerateForm] = useState({
    name: '',
    type: 'PDF',
    category: 'Academic'
  })

  const categories = ['Academic', 'Attendance', 'Finance', 'Communication', 'Administrative', 'Health']
  const types = ['PDF', 'Excel', 'CSV']

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <FileText className="w-4 h-4" />
      case 'Excel':
        return <FileSpreadsheet className="w-4 h-4" />
      case 'CSV':
        return <FileSpreadsheet className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Academic':
        return <GraduationCap className="w-4 h-4" />
      case 'Attendance':
        return <Users className="w-4 h-4" />
      case 'Finance':
        return <DollarSign className="w-4 h-4" />
      case 'Communication':
        return <TrendingUp className="w-4 h-4" />
      default:
        return <BarChart3 className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PDF':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'Excel':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'CSV':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === 'all' || report.category === filterCategory
    const matchesType = filterType === 'all' || report.type === filterType
    return matchesSearch && matchesCategory && matchesType
  })

  const handleDownload = async (reportId: number) => {
    setIsDownloading(reportId)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsDownloading(null)
    const report = reports.find(r => r.id === reportId)
    alert(`Downloading: ${report?.name}.${report?.type?.toLowerCase()}`)
  }

  const handleGenerateReport = () => {
    const newReport: Report = {
      id: reports.length + 1,
      name: generateForm.name,
      type: generateForm.type,
      category: generateForm.category,
      generated: new Date().toISOString().split('T')[0],
      size: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
      author: 'Admin'
    }
    setReports([newReport, ...reports])
    setGenerateForm({ name: '', type: 'PDF', category: 'Academic' })
    setIsGenerateOpen(false)
    alert('Report generated successfully!')
  }

  const handleViewReport = (report: Report) => {
    alert(`Viewing: ${report.name}\n\nType: ${report.type}\nCategory: ${report.category}\nGenerated: ${report.generated}\nSize: ${report.size}\nAuthor: ${report.author}`)
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9]">
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Reports</h1>
            <p className="text-[15px] text-gray-600 mt-1">Generate and download system reports</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-10 text-sm font-medium text-gray-700 border-gray-300 hover:bg-gray-50 bg-white gap-2"
              onClick={() => {
                setSearchQuery('')
                setFilterCategory('all')
                setFilterType('all')
              }}
            >
              <RefreshCw className="w-4 h-4 text-gray-500" />
              Reset
            </Button>
            <Button 
              size="sm" 
              className="h-10 text-sm font-semibold bg-gray-900 hover:bg-gray-800 text-white px-4 gap-2"
              onClick={() => setIsGenerateOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reports</p>
                  <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Download className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Downloads</p>
                  <p className="text-2xl font-bold text-gray-900">156</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search reports by name or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 h-10"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 text-sm font-medium text-gray-700 border-gray-300 hover:bg-gray-50 bg-white gap-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    {filterCategory === 'all' ? 'All Categories' : filterCategory}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel className="text-gray-900 font-semibold">Filter by category</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => setFilterCategory('all')}
                    className="text-gray-700 cursor-pointer"
                  >
                    <Check className={`w-4 h-4 mr-2 ${filterCategory === 'all' ? 'opacity-100 text-blue-600' : 'opacity-0'}`} />
                    All Categories
                  </DropdownMenuItem>
                  {categories.map((category) => (
                    <DropdownMenuItem 
                      key={category}
                      onClick={() => setFilterCategory(category)}
                      className="text-gray-700 cursor-pointer"
                    >
                      <Check className={`w-4 h-4 mr-2 ${filterCategory === category ? 'opacity-100 text-blue-600' : 'opacity-0'}`} />
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 text-sm font-medium text-gray-700 border-gray-300 hover:bg-gray-50 bg-white gap-2">
                    {getTypeIcon(filterType === 'all' ? 'PDF' : filterType)}
                    {filterType === 'all' ? 'All Types' : filterType}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuLabel className="text-gray-900 font-semibold">Filter by type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => setFilterType('all')}
                    className="text-gray-700 cursor-pointer"
                  >
                    <Check className={`w-4 h-4 mr-2 ${filterType === 'all' ? 'opacity-100 text-blue-600' : 'opacity-0'}`} />
                    All Types
                  </DropdownMenuItem>
                  {types.map((type) => (
                    <DropdownMenuItem 
                      key={type}
                      onClick={() => setFilterType(type)}
                      className="text-gray-700 cursor-pointer"
                    >
                      <Check className={`w-4 h-4 mr-2 ${filterType === type ? 'opacity-100 text-blue-600' : 'opacity-0'}`} />
                      {type}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* Reports Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredReports.map((report) => (
            <Card 
              key={report.id} 
              className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow group"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${report.type === 'PDF' ? 'bg-red-100' : report.type === 'Excel' ? 'bg-emerald-100' : 'bg-blue-100'}`}>
                      {getTypeIcon(report.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1 truncate">{report.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {report.generated}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {report.size}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold border ${getTypeColor(report.type)}`}>
                      {report.type}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                      {getCategoryIcon(report.category)}
                      {report.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                      onClick={() => handleViewReport(report)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      className="h-8 text-xs font-semibold bg-gray-900 hover:bg-gray-800 text-white gap-1.5"
                      onClick={() => handleDownload(report.id)}
                      disabled={isDownloading === report.id}
                    >
                      {isDownloading === report.id ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Download className="w-3.5 h-3.5" />
                      )}
                      {isDownloading === report.id ? 'Downloading...' : 'Download'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredReports.length === 0 && (
            <div className="col-span-2 py-12 text-center">
              <div className="flex flex-col items-center gap-2">
                <FileText className="w-12 h-12 text-gray-300" />
                <p className="text-gray-500 font-medium">No reports found</p>
                <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Generate Report Dialog */}
      <Dialog open={isGenerateOpen} onOpenChange={setIsGenerateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">Generate New Report</DialogTitle>
            <DialogDescription className="text-gray-600">
              Create a new system report with specific parameters
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">Report Name</label>
              <Input
                placeholder="Enter report name"
                value={generateForm.name}
                onChange={(e) => setGenerateForm({ ...generateForm, name: e.target.value })}
                className="bg-white border-gray-300 text-gray-900 h-10"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Type</label>
                <select
                  value={generateForm.type}
                  onChange={(e) => setGenerateForm({ ...generateForm, type: e.target.value })}
                  className="w-full h-10 rounded-md border border-gray-300 bg-white text-gray-900 px-3 text-sm"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Category</label>
                <select
                  value={generateForm.category}
                  onChange={(e) => setGenerateForm({ ...generateForm, category: e.target.value })}
                  className="w-full h-10 rounded-md border border-gray-300 bg-white text-gray-900 px-3 text-sm"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsGenerateOpen(false)}
              className="text-gray-700 border-gray-300"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleGenerateReport}
              className="bg-gray-900 hover:bg-gray-800 text-white"
              disabled={!generateForm.name}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}