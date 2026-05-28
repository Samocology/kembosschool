'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  FileText, AlertCircle, CheckCircle, Megaphone, 
  Calendar, Tag, Eye, Search, Filter, X, Check,
  ChevronDown, Clock, Users, BookOpen, Bell,
  Pin, ExternalLink
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

interface Announcement {
  id: number
  title: string
  category: string
  content: string
  date: string
  time: string
  important: boolean
  author: string
  target: string
  pinned: boolean
}

export default function ParentAnnouncements() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: 'Annual Sports Day 2024',
      category: 'Event',
      content: 'The annual sports day will hold on Saturday, June 10, 2024 at the school sports complex. All students are expected to participate in at least two events. Parents are cordially invited to attend and cheer their children.\n\nKey Details:\n• Date: Saturday, June 10, 2024\n• Time: 9:00 AM - 4:00 PM\n• Venue: School Sports Complex\n• Dress Code: Sports wear\n\nLight refreshments will be served. Please confirm your child\'s participation with their form teacher by June 5th.',
      date: '2024-05-24',
      time: '11:00 AM',
      important: true,
      author: 'Dr. Okonkwo (Principal)',
      target: 'All Parents',
      pinned: true,
    },
    {
      id: 2,
      title: 'Third Term Resumption Date',
      category: 'Important',
      content: 'This is to inform all parents and guardians that the third term will commence on Monday, June 3, 2024.\n\nImportant Notes:\n• All students must resume by 7:45 AM\n• School fees for the term must be paid before resumption\n• New students should come with their admission letters\n• Boarding students can return on Sunday, June 2nd from 2:00 PM\n\nPlease ensure your child comes with all necessary school materials and textbooks.',
      date: '2024-05-23',
      time: '9:30 AM',
      important: true,
      author: 'School Administration',
      target: 'All Parents',
      pinned: true,
    },
    {
      id: 3,
      title: 'Mid-Term Exams Schedule',
      category: 'Academic',
      content: 'The mid-term examinations for the third term have been scheduled as follows:\n\nExam Dates: May 28 - June 2, 2024\nTime: 8:00 AM - 12:00 PM daily\n\nSubjects Schedule:\n• Monday 28th: Mathematics & English\n• Tuesday 29th: Sciences (Physics, Chemistry, Biology)\n• Wednesday 30th: Social Sciences & Languages\n• Thursday 31st: Arts & Technical subjects\n• Friday 1st: Commercial subjects\n\nPlease ensure your child arrives early and is well-prepared for each examination day.',
      date: '2024-05-22',
      time: '2:00 PM',
      important: false,
      author: 'Examination Committee',
      target: 'SS1 - SS3 Parents',
      pinned: false,
    },
    {
      id: 4,
      title: 'Staff Development Day - School Closure',
      category: 'Notice',
      content: 'The school will be closed on Friday, May 26, 2024 to allow all teaching and non-teaching staff to participate in a mandatory professional development workshop.\n\nKey Points:\n• No classes on Friday, May 26\n• Boarding students may remain in the hostel\n• Normal activities resume Monday, May 29\n• The workshop focuses on modern teaching methodologies\n\nWe apologize for any inconvenience this may cause.',
      date: '2024-05-20',
      time: '10:00 AM',
      important: false,
      author: 'Mrs. Chukwu (Vice Principal)',
      target: 'All Parents',
      pinned: false,
    },
    {
      id: 5,
      title: 'Parent-Teacher Conference',
      category: 'Event',
      content: 'The end-of-term parent-teacher conference will hold on Saturday, May 27, 2024.\n\nDetails:\n• Date: Saturday, May 27, 2024\n• Time: 9:00 AM - 3:00 PM\n• Venue: School Main Hall\n\nPurpose:\n• Review your child\'s academic performance\n• Discuss areas for improvement\n• Meet with subject teachers\n• Collect mid-term report cards\n\nAll parents are strongly encouraged to attend. Please book your slot with your child\'s form teacher.',
      date: '2024-05-19',
      time: '3:30 PM',
      important: false,
      author: 'Academic Department',
      target: 'All Parents',
      pinned: false,
    },
    {
      id: 6,
      title: 'New Library Hours',
      category: 'Notice',
      content: 'Effective from June 3, 2024, the school library will operate with extended hours to support students during exam preparation.\n\nNew Library Hours:\n• Monday - Friday: 7:00 AM - 6:00 PM\n• Saturday: 9:00 AM - 2:00 PM\n• Sunday: Closed\n\nAdditional study resources and past question papers have been added to the library collection.',
      date: '2024-05-18',
      time: '1:00 PM',
      important: false,
      author: 'Library Department',
      target: 'All Students & Parents',
      pinned: false,
    },
  ])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Event':
        return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800'
      case 'Important':
        return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'
      case 'Academic':
        return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'
      case 'Notice':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800'
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Event':
        return <Calendar className="w-4 h-4" />
      case 'Important':
        return <AlertCircle className="w-4 h-4" />
      case 'Academic':
        return <BookOpen className="w-4 h-4" />
      case 'Notice':
        return <Bell className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const categories = ['Event', 'Important', 'Academic', 'Notice']

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === 'all' || announcement.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const handleViewDetails = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement)
    setShowDetails(true)
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-gray-900 transition-colors duration-300">
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-[28px] font-bold text-gray-900 dark:text-white tracking-tight transition-colors">
            Announcements
          </h1>
          <p className="text-[15px] text-gray-600 dark:text-gray-400 mt-1 transition-colors">
            Stay updated with important school news and events
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Megaphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{announcements.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Important</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {announcements.filter(a => a.important).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Pin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Pinned</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {announcements.filter(a => a.pinned).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">This Month</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {announcements.filter(a => a.date.startsWith('2024-05')).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors">
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                <Input
                  placeholder="Search announcements by title or content..."
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
                    {filterCategory === 'all' ? 'All Categories' : filterCategory}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel className="text-gray-900 dark:text-white font-semibold">Filter by category</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => setFilterCategory('all')}
                    className="text-gray-700 dark:text-gray-300 cursor-pointer"
                  >
                    <Check className={`w-4 h-4 mr-2 ${filterCategory === 'all' ? 'opacity-100 text-blue-600 dark:text-blue-400' : 'opacity-0'}`} />
                    All Categories
                  </DropdownMenuItem>
                  {categories.map((category) => (
                    <DropdownMenuItem 
                      key={category}
                      onClick={() => setFilterCategory(category)}
                      className="text-gray-700 dark:text-gray-300 cursor-pointer"
                    >
                      <Check className={`w-4 h-4 mr-2 ${filterCategory === category ? 'opacity-100 text-blue-600 dark:text-blue-400' : 'opacity-0'}`} />
                      {category}
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
            <Card 
              key={announcement.id} 
              className={`border-0 shadow-sm transition-all cursor-pointer hover:shadow-md ${
                announcement.important 
                  ? 'bg-red-50/30 dark:bg-red-900/5 border-l-4 border-l-red-500' 
                  : announcement.pinned
                    ? 'bg-purple-50/30 dark:bg-purple-900/5 border-l-4 border-l-purple-500'
                    : 'bg-white dark:bg-gray-800'
              }`}
              onClick={() => handleViewDetails(announcement)}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    announcement.important
                      ? 'bg-red-100 dark:bg-red-900/30'
                      : announcement.pinned
                        ? 'bg-purple-100 dark:bg-purple-900/30'
                        : 'bg-blue-100 dark:bg-blue-900/30'
                  }`}>
                    {announcement.important ? (
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    ) : announcement.pinned ? (
                      <Pin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    ) : (
                      <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-900 dark:text-white text-base">
                            {announcement.title}
                          </h3>
                          {announcement.important && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-bold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
                              <AlertCircle className="w-3 h-3" />
                              Important
                            </span>
                          )}
                          {announcement.pinned && !announcement.important && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                              <Pin className="w-3 h-3" />
                              Pinned
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-gray-400 dark:text-gray-500">{announcement.time}</span>
                        <Eye className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed">
                      {announcement.content}
                    </p>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-medium border ${getCategoryColor(announcement.category)}`}>
                        {getCategoryIcon(announcement.category)}
                        {announcement.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <Users className="w-3 h-3" />
                        {announcement.target}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="w-3 h-3" />
                        {announcement.date}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        by {announcement.author}
                      </span>
                    </div>
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

      {/* Announcement Detail Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-2xl bg-white dark:bg-gray-800 border-0 max-h-[90vh] overflow-y-auto">
          {selectedAnnouncement && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedAnnouncement.important
                      ? 'bg-red-100 dark:bg-red-900/30'
                      : 'bg-blue-100 dark:bg-blue-900/30'
                  }`}>
                    {selectedAnnouncement.important ? (
                      <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                    ) : (
                      <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {selectedAnnouncement.pinned && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                        <Pin className="w-3 h-3" />
                        Pinned
                      </span>
                    )}
                    {selectedAnnouncement.important && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
                        <AlertCircle className="w-3 h-3" />
                        Important
                      </span>
                    )}
                  </div>
                </div>

                <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedAnnouncement.title}
                </DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-400">
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-medium border ${getCategoryColor(selectedAnnouncement.category)}`}>
                      {getCategoryIcon(selectedAnnouncement.category)}
                      {selectedAnnouncement.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm">
                      <Calendar className="w-3.5 h-3.5" />
                      {selectedAnnouncement.date} at {selectedAnnouncement.time}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm">
                      <Users className="w-3.5 h-3.5" />
                      {selectedAnnouncement.target}
                    </span>
                    <span className="text-sm">
                      by {selectedAnnouncement.author}
                    </span>
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {selectedAnnouncement.content}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}