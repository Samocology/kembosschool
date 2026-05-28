'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  MessageSquare, Send, Search, Filter, X, Check,
  Mail, MailOpen, Paperclip, Smile, MoreVertical,
  ArrowLeft, User, Clock, Star, Archive, Trash2,
  ChevronDown, Inbox, Users, GraduationCap
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

interface Message {
  id: number
  sender: string
  senderRole: string
  senderAvatar: string
  subject: string
  preview: string
  content: string
  date: string
  time: string
  unread: boolean
  starred: boolean
  category: string
}

export default function ParentMessages() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'Mrs. Chukwu',
      senderRole: 'Form Teacher',
      senderAvatar: 'MC',
      subject: "John's Academic Performance",
      preview: 'Your child is performing exceptionally well in all subjects. I wanted to share some highlights...',
      content: "Dear Parent,\n\nI am pleased to inform you that John has been performing exceptionally well in all subjects this term. His dedication to studies and active participation in class discussions have been commendable.\n\nKey highlights:\n• Mathematics: 87% (improved from 84%)\n• English: 82% (improved from 79%)\n• Biology: 91% (consistent excellence)\n\nPlease encourage him to keep up the good work. If you have any questions, feel free to reach out.\n\nBest regards,\nMrs. Chukwu\nForm Teacher, SS3A",
      date: '2024-05-23',
      time: '10:30 AM',
      unread: true,
      starred: true,
      category: 'academic'
    },
    {
      id: 2,
      sender: 'Dr. Okonkwo',
      senderRole: 'Principal',
      senderAvatar: 'DO',
      subject: 'School Closure Notice',
      preview: 'The school will be closed on June 3-5 for scheduled maintenance and staff training...',
      content: "Dear Parents,\n\nThis is to inform you that the school will be closed from June 3rd to June 5th, 2024 for scheduled maintenance work and staff training programs.\n\nKey dates:\n• Closure: June 3-5, 2024\n• Resumption: June 6, 2024\n\nAll academic activities will resume on June 6th as scheduled.\n\nThank you for your understanding.\n\nWarm regards,\nDr. Okonkwo\nPrincipal",
      date: '2024-05-22',
      time: '2:15 PM',
      unread: false,
      starred: false,
      category: 'announcement'
    },
    {
      id: 3,
      sender: 'Mathematics Department',
      senderRole: 'Department',
      senderAvatar: 'MD',
      subject: 'Extra Classes Schedule',
      preview: 'Extra classes will commence next term for students preparing for external examinations...',
      content: "Dear Parents,\n\nWe are pleased to announce that extra mathematics classes will be available next term for students preparing for WAEC and JAMB examinations.\n\nSchedule:\n• Days: Saturdays\n• Time: 9:00 AM - 12:00 PM\n• Venue: School Main Hall\n• Fee: Free for all SS3 students\n\nRegistration is mandatory. Please confirm your child's participation by Friday.\n\nMathematics Department",
      date: '2024-05-20',
      time: '11:00 AM',
      unread: false,
      starred: false,
      category: 'academic'
    },
    {
      id: 4,
      sender: 'School Administrator',
      senderRole: 'Admin',
      senderAvatar: 'SA',
      subject: 'Updated School Calendar',
      preview: 'Please find attached the updated school calendar for the remaining terms of 2024...',
      content: "Dear Parents,\n\nPlease find attached the updated school calendar for the 2024/2025 academic session.\n\nImportant dates:\n• Third Term: May 6 - August 16, 2024\n• Summer Break: August 17 - September 8, 2024\n• New Session: September 9, 2024\n\nHard copies will be distributed to students next week.\n\nRegards,\nSchool Administrator",
      date: '2024-05-18',
      time: '9:00 AM',
      unread: false,
      starred: true,
      category: 'announcement'
    },
    {
      id: 5,
      sender: 'Mrs. Adebayo',
      senderRole: 'Counselor',
      senderAvatar: 'MA',
      subject: 'Career Guidance Session',
      preview: 'We are organizing a career guidance session for SS2 and SS3 students...',
      content: "Dear Parents,\n\nWe are organizing a career guidance and counseling session for SS2 and SS3 students on Friday, May 31st, 2024.\n\nTopics to be covered:\n• Career path selection\n• University admission requirements\n• Scholarship opportunities\n• Professional mentorship\n\nWe encourage all parents to attend this important session.\n\nBest regards,\nMrs. Adebayo\nSchool Counselor",
      date: '2024-05-15',
      time: '3:45 PM',
      unread: true,
      starred: false,
      category: 'academic'
    },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [showMessageDialog, setShowMessageDialog] = useState(false)
  const [showNewMessage, setShowNewMessage] = useState(false)
  const [composeData, setComposeData] = useState({
    to: '',
    subject: '',
    message: ''
  })

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         msg.preview.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === 'all' || msg.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const unreadCount = messages.filter(m => m.unread).length
  const starredCount = messages.filter(m => m.starred).length

  const handleOpenMessage = (message: Message) => {
    setMessages(messages.map(m => 
      m.id === message.id ? { ...m, unread: false } : m
    ))
    setSelectedMessage(message)
    setShowMessageDialog(true)
  }

  const handleToggleStar = (messageId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setMessages(messages.map(m => 
      m.id === messageId ? { ...m, starred: !m.starred } : m
    ))
  }

  const handleDeleteMessage = (messageId: number) => {
    setMessages(messages.filter(m => m.id !== messageId))
    if (selectedMessage?.id === messageId) {
      setShowMessageDialog(false)
      setSelectedMessage(null)
    }
  }

  const handleArchiveMessage = (messageId: number) => {
    setMessages(messages.filter(m => m.id !== messageId))
  }

  const handleSendMessage = () => {
    alert(`Message sent to ${composeData.to}!`)
    setShowNewMessage(false)
    setComposeData({ to: '', subject: '', message: '' })
  }

  const handleMarkAllRead = () => {
    setMessages(messages.map(m => ({ ...m, unread: false })))
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic':
        return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'
      case 'announcement':
        return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800'
      case 'urgent':
        return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-gray-900 transition-colors duration-300">
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-bold text-gray-900 dark:text-white tracking-tight transition-colors">
              Messages
            </h1>
            <p className="text-[15px] text-gray-600 dark:text-gray-400 mt-1 transition-colors">
              Communicate with school staff and receive updates
            </p>
          </div>
          <Button 
            className="h-10 text-sm font-semibold bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 px-4 gap-2 transition-colors"
            onClick={() => setShowNewMessage(true)}
          >
            <Send className="w-4 h-4" />
            New Message
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors cursor-pointer" onClick={() => setFilterCategory('all')}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Inbox className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">All Messages</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{messages.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors cursor-pointer" onClick={() => setFilterCategory('all')}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Unread</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{unreadCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Starred</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{starredCount}</p>
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
                  placeholder="Search messages..."
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
                    {filterCategory === 'all' ? 'All Categories' : filterCategory.charAt(0).toUpperCase() + filterCategory.slice(1)}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel className="text-gray-900 dark:text-white font-semibold">Filter by category</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {[
                    { value: 'all', label: 'All Messages' },
                    { value: 'academic', label: 'Academic' },
                    { value: 'announcement', label: 'Announcements' },
                    { value: 'urgent', label: 'Urgent' },
                  ].map((filter) => (
                    <DropdownMenuItem 
                      key={filter.value}
                      onClick={() => setFilterCategory(filter.value)}
                      className="text-gray-700 dark:text-gray-300 cursor-pointer"
                    >
                      <Check className={`w-4 h-4 mr-2 ${filterCategory === filter.value ? 'opacity-100 text-blue-600 dark:text-blue-400' : 'opacity-0'}`} />
                      {filter.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button 
                variant="outline" 
                size="sm" 
                className="h-10 text-sm font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 transition-colors"
                onClick={handleMarkAllRead}
              >
                <MailOpen className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Messages List */}
        <div className="space-y-2">
          {filteredMessages.map((msg) => (
            <Card 
              key={msg.id} 
              className={`border-0 shadow-sm transition-all cursor-pointer hover:shadow-md ${
                msg.unread 
                  ? 'bg-blue-50/50 dark:bg-blue-900/10 border-l-4 border-l-blue-500' 
                  : 'bg-white dark:bg-gray-800'
              }`}
              onClick={() => handleOpenMessage(msg)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0">
                    {msg.senderAvatar}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className={`text-sm ${msg.unread ? 'font-bold text-gray-900 dark:text-white' : 'font-semibold text-gray-900 dark:text-white'}`}>
                            {msg.sender}
                          </p>
                          {msg.unread && (
                            <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{msg.senderRole}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-gray-400 dark:text-gray-500">{msg.time}</span>
                        <button
                          onClick={(e) => handleToggleStar(msg.id, e)}
                          className={`p-1 rounded-lg transition-colors ${
                            msg.starred 
                              ? 'text-yellow-500 hover:text-yellow-600' 
                              : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                          }`}
                        >
                          <Star className={`w-4 h-4 ${msg.starred ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>

                    <p className={`text-sm mb-1 ${msg.unread ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                      {msg.subject}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                      {msg.preview}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <span className={`inline-flex px-2 py-0.5 rounded-lg text-xs font-medium border ${getCategoryColor(msg.category)}`}>
                        {msg.category.charAt(0).toUpperCase() + msg.category.slice(1)}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">{msg.date}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredMessages.length === 0 && (
            <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
              <CardContent className="py-12 text-center">
                <div className="flex flex-col items-center gap-2">
                  <MessageSquare className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                  <p className="text-gray-500 dark:text-gray-400 font-medium">No messages found</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">Try adjusting your search or filters</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Message Detail Dialog */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent className="sm:max-w-2xl bg-white dark:bg-gray-800 border-0 max-h-[90vh] overflow-y-auto">
          {selectedMessage && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between mb-4">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    onClick={() => setShowMessageDialog(false)}
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                  </Button>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 text-gray-500 dark:text-gray-400 hover:text-yellow-500"
                      onClick={() => handleToggleStar(selectedMessage.id, {} as React.MouseEvent)}
                    >
                      <Star className={`w-4 h-4 ${selectedMessage.starred ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                      onClick={() => handleArchiveMessage(selectedMessage.id)}
                    >
                      <Archive className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 text-gray-500 dark:text-gray-400 hover:text-red-600"
                      onClick={() => handleDeleteMessage(selectedMessage.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {selectedMessage.senderAvatar}
                  </div>
                  <div>
                    <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                      {selectedMessage.subject}
                    </DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-400">
                      From: {selectedMessage.sender} ({selectedMessage.senderRole}) • {selectedMessage.date} at {selectedMessage.time}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="py-4">
                <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.content}
                  </p>
                </div>
              </div>

              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowMessageDialog(false)}
                  className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 transition-colors"
                >
                  Close
                </Button>
                <Button 
                  className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 transition-colors gap-2"
                  onClick={() => {
                    setShowMessageDialog(false)
                    setShowNewMessage(true)
                    setComposeData({
                      to: selectedMessage.sender,
                      subject: `Re: ${selectedMessage.subject}`,
                      message: ''
                    })
                  }}
                >
                  <Send className="w-4 h-4" />
                  Reply
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* New Message Dialog */}
      <Dialog open={showNewMessage} onOpenChange={setShowNewMessage}>
        <DialogContent className="sm:max-w-lg bg-white dark:bg-gray-800 border-0">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">New Message</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Compose a message to school staff or administration
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-900 dark:text-gray-200">To</label>
              <select
                value={composeData.to}
                onChange={(e) => setComposeData({ ...composeData, to: e.target.value })}
                className="w-full h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 text-sm transition-colors"
              >
                <option value="">Select recipient...</option>
                <option value="Form Teacher - Mrs. Chukwu">Form Teacher - Mrs. Chukwu</option>
                <option value="Principal - Dr. Okonkwo">Principal - Dr. Okonkwo</option>
                <option value="School Administrator">School Administrator</option>
                <option value="Mathematics Department">Mathematics Department</option>
                <option value="School Counselor">School Counselor</option>
              </select>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-900 dark:text-gray-200">Subject</label>
              <Input
                placeholder="Message subject"
                value={composeData.subject}
                onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
                className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white h-10 transition-colors"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-900 dark:text-gray-200">Message</label>
              <textarea
                placeholder="Type your message here..."
                value={composeData.message}
                onChange={(e) => setComposeData({ ...composeData, message: e.target.value })}
                rows={6}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 text-sm transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600">
                <Paperclip className="w-4 h-4 mr-1" />
                Attach File
              </Button>
              <Button variant="outline" size="sm" className="text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600">
                <Smile className="w-4 h-4 mr-1" />
                Emoji
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowNewMessage(false)}
              className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 transition-colors"
            >
              Discard
            </Button>
            <Button 
              onClick={handleSendMessage}
              disabled={!composeData.to || !composeData.subject || !composeData.message}
              className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 transition-colors gap-2"
            >
              <Send className="w-4 h-4" />
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}