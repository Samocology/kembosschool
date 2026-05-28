'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  FileText, Plus, Edit, Trash2, Search, X, Check,
  Send, Eye, Calendar, Users, Megaphone, Clock,
  Filter, ArrowUpDown, AlertTriangle, MoreHorizontal
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

interface Announcement {
  id: number
  title: string
  content: string
  date: string
  target: string
  status: string
  author: string
}

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    { id: 1, title: 'Annual Sports Day 2024', content: 'Join us for the annual sports day event...', date: '2024-05-24', target: 'All', status: 'published', author: 'Dr. Okonkwo' },
    { id: 2, title: 'Third Term Resumption Date', content: 'Third term begins on Monday, 6th May 2024...', date: '2024-05-23', target: 'All', status: 'published', author: 'Admin' },
    { id: 3, title: 'Mid-Term Exams Schedule', content: 'Mid-term examinations will commence on...', date: '2024-05-22', target: 'Students & Staff', status: 'published', author: 'Mrs. Chukwu' },
    { id: 4, title: 'Staff Meeting on Friday', content: 'There will be a staff meeting this Friday...', date: '2024-05-24', target: 'Staff Only', status: 'draft', author: 'Admin' },
    { id: 5, title: 'PTA Meeting Announcement', content: 'Parent-Teacher Association meeting scheduled for...', date: '2024-05-20', target: 'Parents', status: 'published', author: 'Dr. Okonkwo' },
    { id: 6, title: 'School Holiday Notice', content: 'School will be closed on Wednesday for...', date: '2024-05-18', target: 'All', status: 'draft', author: 'Admin' },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterTarget, setFilterTarget] = useState('all')
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)
  const [isPublishing, setIsPublishing] = useState<number | null>(null)

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    target: 'All',
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800'
      case 'draft':
        return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800'
      case 'archived':
        return 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800'
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  const getTargetColor = (target: string) => {
    switch (target) {
      case 'All':
        return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'
      case 'Students & Staff':
        return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800'
      case 'Staff Only':
        return 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800'
      case 'Parents':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800'
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  const filteredAnnouncements = announcements
    .filter(announcement => {
      const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          announcement.content.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = filterStatus === 'all' || announcement.status === filterStatus
      const matchesTarget = filterTarget === 'all' || announcement.target === filterTarget
      return matchesSearch && matchesStatus && matchesTarget
    })

  const handleCreateAnnouncement = () => {
    const newAnnouncement: Announcement = {
      id: announcements.length + 1,
      title: formData.title,
      content: formData.content,
      target: formData.target,
      date: new Date().toISOString().split('T')[0],
      status: 'draft',
      author: 'Admin'
    }
    setAnnouncements([newAnnouncement, ...announcements])
    setFormData({ title: '', content: '', target: 'All' })
    setIsCreateOpen(false)
  }

  const handleEditAnnouncement = () => {
    if (!selectedAnnouncement) return
    setAnnouncements(announcements.map(announcement => 
      announcement.id === selectedAnnouncement.id 
        ? { ...announcement, ...formData }
        : announcement
    ))
    setSelectedAnnouncement(null)
    setIsEditOpen(false)
  }

  const handleDeleteAnnouncement = () => {
    if (!selectedAnnouncement) return
    setAnnouncements(announcements.filter(a => a.id !== selectedAnnouncement.id))
    setSelectedAnnouncement(null)
    setIsDeleteDialogOpen(false)
  }

  const handlePublish = async (id: number) => {
    setIsPublishing(id)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setAnnouncements(announcements.map(a => 
      a.id === id ? { ...a, status: 'published' } : a
    ))
    setIsPublishing(null)
  }

  const handleUnpublish = (id: number) => {
    setAnnouncements(announcements.map(a => 
      a.id === id ? { ...a, status: 'draft' } : a
    ))
  }

  const openEditDialog = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement)
    setFormData({
      title: announcement.title,
      content: announcement.content,
      target: announcement.target,
    })
    setIsEditOpen(true)
  }

  const openDeleteDialog = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement)
    setIsDeleteDialogOpen(true)
  }

  const targets = ['All', 'Students & Staff', 'Staff Only', 'Parents']

  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-gray-900 transition-colors duration-300">
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-bold text-gray-900 dark:text-white tracking-tight transition-colors">Announcements</h1>
            <p className="text-[15px] text-gray-600 dark:text-gray-400 mt-1 transition-colors">Post and manage school announcements</p>
          </div>
          <Button 
            className="h-10 text-sm font-semibold bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 px-4 gap-2 transition-colors"
            onClick={() => {
              setFormData({ title: '', content: '', target: 'All' })
              setIsCreateOpen(true)
            }}
          >
            <Plus className="w-4 h-4" />
            Create Announcement
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Megaphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{announcements.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <Send className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Published</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {announcements.filter(a => a.status === 'published').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Drafts</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {announcements.filter(a => a.status === 'draft').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors">
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                <Input
                  placeholder="Search announcements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 h-10 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 text-sm font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 gap-2 transition-colors">
                    <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    {filterStatus === 'all' ? 'All Status' : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuLabel className="text-gray-900 dark:text-white font-semibold">Filter by status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {[
                    { value: 'all', label: 'All' },
                    { value: 'published', label: 'Published' },
                    { value: 'draft', label: 'Draft' },
                  ].map((filter) => (
                    <DropdownMenuItem 
                      key={filter.value}
                      onClick={() => setFilterStatus(filter.value)}
                      className="text-gray-700 dark:text-gray-300 cursor-pointer"
                    >
                      <Check className={`w-4 h-4 mr-2 ${filterStatus === filter.value ? 'opacity-100 text-blue-600 dark:text-blue-400' : 'opacity-0'}`} />
                      {filter.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 text-sm font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 gap-2 transition-colors">
                    <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    {filterTarget === 'all' ? 'All Targets' : filterTarget}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel className="text-gray-900 dark:text-white font-semibold">Filter by target</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => setFilterTarget('all')}
                    className="text-gray-700 dark:text-gray-300 cursor-pointer"
                  >
                    <Check className={`w-4 h-4 mr-2 ${filterTarget === 'all' ? 'opacity-100 text-blue-600 dark:text-blue-400' : 'opacity-0'}`} />
                    All Targets
                  </DropdownMenuItem>
                  {targets.map((target) => (
                    <DropdownMenuItem 
                      key={target}
                      onClick={() => setFilterTarget(target)}
                      className="text-gray-700 dark:text-gray-300 cursor-pointer"
                    >
                      <Check className={`w-4 h-4 mr-2 ${filterTarget === target ? 'opacity-100 text-blue-600 dark:text-blue-400' : 'opacity-0'}`} />
                      {target}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* Announcements List */}
        <div className="space-y-3">
          {filteredAnnouncements.map((announcement) => (
            <Card key={announcement.id} className="border-0 shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition-all group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      announcement.status === 'published' 
                        ? 'bg-emerald-100 dark:bg-emerald-900/30' 
                        : 'bg-amber-100 dark:bg-amber-900/30'
                    }`}>
                      <FileText className={`w-5 h-5 ${
                        announcement.status === 'published' 
                          ? 'text-emerald-600 dark:text-emerald-400' 
                          : 'text-amber-600 dark:text-amber-400'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1 truncate transition-colors">
                        {announcement.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 transition-colors">
                        {announcement.content}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="w-3 h-3" />
                          {announcement.date}
                        </span>
                        <span className={`inline-flex px-2 py-0.5 rounded-lg text-xs font-semibold border ${getTargetColor(announcement.target)}`}>
                          {announcement.target}
                        </span>
                        <span className={`inline-flex px-2 py-0.5 rounded-lg text-xs font-semibold border ${getStatusColor(announcement.status)}`}>
                          {announcement.status === 'published' ? 'Published' : 'Draft'}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          by {announcement.author}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {announcement.status === 'draft' ? (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 gap-1"
                        onClick={() => handlePublish(announcement.id)}
                        disabled={isPublishing === announcement.id}
                      >
                        {isPublishing === announcement.id ? (
                          <Clock className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Send className="w-3.5 h-3.5" />
                        )}
                        {isPublishing === announcement.id ? 'Publishing...' : 'Publish'}
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 gap-1"
                        onClick={() => handleUnpublish(announcement.id)}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        Unpublish
                      </Button>
                    )}
                    
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => openEditDialog(announcement)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={() => openDeleteDialog(announcement)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredAnnouncements.length === 0 && (
            <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
              <CardContent className="py-12 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Megaphone className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                  <p className="text-gray-500 dark:text-gray-400 font-medium">No announcements found</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">Try adjusting your search or filters</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Create Announcement Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-lg bg-white dark:bg-gray-800 border-0">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">Create Announcement</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Post a new announcement to the school community
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-900 dark:text-gray-200">Title</label>
              <Input
                placeholder="Enter announcement title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white h-10 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-900 dark:text-gray-200">Content</label>
              <textarea
                placeholder="Write your announcement content..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={4}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 text-sm transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-900 dark:text-gray-200">Target Audience</label>
              <select
                value={formData.target}
                onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                className="w-full h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 text-sm transition-colors"
              >
                {targets.map((target) => (
                  <option key={target} value={target}>{target}</option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsCreateOpen(false)}
              className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 transition-colors"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateAnnouncement}
              className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 transition-colors"
              disabled={!formData.title || !formData.content}
            >
              Create Announcement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Announcement Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-lg bg-white dark:bg-gray-800 border-0">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">Edit Announcement</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Update the announcement details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-900 dark:text-gray-200">Title</label>
              <Input
                placeholder="Enter announcement title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white h-10 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-900 dark:text-gray-200">Content</label>
              <textarea
                placeholder="Write your announcement content..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={4}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 text-sm transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-900 dark:text-gray-200">Target Audience</label>
              <select
                value={formData.target}
                onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                className="w-full h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 text-sm transition-colors"
              >
                {targets.map((target) => (
                  <option key={target} value={target}>{target}</option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditOpen(false)}
              className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 transition-colors"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleEditAnnouncement}
              className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 transition-colors"
              disabled={!formData.title || !formData.content}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 border-0">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">Delete Announcement</DialogTitle>
            </div>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Are you sure you want to delete this announcement? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedAnnouncement && (
            <div className="py-4">
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
                <p className="font-semibold text-gray-900 dark:text-white">{selectedAnnouncement.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{selectedAnnouncement.target}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 transition-colors"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDeleteAnnouncement}
              className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white transition-colors gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Announcement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}