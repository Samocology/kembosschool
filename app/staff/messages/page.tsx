'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MessageSquare, Send, Search, Plus, Clock, User } from 'lucide-react'

interface Message {
  id: number
  sender: string
  senderRole: string
  subject: string
  preview: string
  date: string
  read: boolean
  avatar: string
}

export default function StaffMessages() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('inbox')
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  
  const [messages] = useState<Message[]>([
    {
      id: 1,
      sender: 'Mrs. Grace Okonkwo',
      senderRole: 'Parent',
      subject: 'Concern about John\'s Chemistry grades',
      preview: 'Hello, I noticed John\'s chemistry score has been declining. Can we discuss this?',
      date: '2024-05-24',
      read: false,
      avatar: 'GO'
    },
    {
      id: 2,
      sender: 'Dr. Femi Adeleke',
      senderRole: 'Principal',
      subject: 'Monthly Staff Meeting - June 1st',
      preview: 'Please confirm your attendance for the monthly staff meeting scheduled for June 1st...',
      date: '2024-05-23',
      read: true,
      avatar: 'FA'
    },
    {
      id: 3,
      sender: 'Chinedu Okafor',
      senderRole: 'Student',
      subject: 'Question about Assignment 5',
      preview: 'Ma\'am, can you clarify the requirements for question 3 in Assignment 5?',
      date: '2024-05-22',
      read: true,
      avatar: 'CO'
    },
    {
      id: 4,
      sender: 'Mrs. Zainab Mohammed',
      senderRole: 'Staff',
      subject: 'Collaborative Teaching Project',
      preview: 'I\'d like to propose a collaborative project combining Science and Mathematics...',
      date: '2024-05-21',
      read: true,
      avatar: 'ZM'
    },
    {
      id: 5,
      sender: 'Blessing Eze',
      senderRole: 'Student',
      subject: 'Request for Class Revision Session',
      preview: 'Can we have a revision session before the final exams? I want to improve my score...',
      date: '2024-05-20',
      read: true,
      avatar: 'BE'
    },
  ])

  const filteredMessages = messages.filter(msg =>
    msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const unreadCount = messages.filter(m => !m.read).length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground mt-1">Communicate with parents, students, and staff</p>
        </div>
        <Button className="bg-accent hover:bg-cyan-500 text-slate-950 gap-2">
          <Plus className="w-4 h-4" />
          New Message
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="md:col-span-2 space-y-4">
          {/* Search and Tabs */}
          <Card className="border-slate-700">
            <CardContent className="pt-6 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-slate-700"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant={activeTab === 'inbox' ? 'default' : 'outline'}
                  className={activeTab === 'inbox' ? 'bg-accent text-slate-950' : 'border-slate-700 text-slate-300'}
                >
                  Inbox {unreadCount > 0 && `(${unreadCount})`}
                </Button>
                <Button
                  variant={activeTab === 'sent' ? 'default' : 'outline'}
                  className={activeTab === 'sent' ? 'bg-accent text-slate-950' : 'border-slate-700 text-slate-300'}
                >
                  Sent
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Messages */}
          <div className="space-y-2">
            {filteredMessages.map((message) => (
              <Card
                key={message.id}
                className={`border-slate-700 hover:border-accent/50 cursor-pointer transition ${
                  !message.read ? 'bg-slate-900/50' : ''
                }`}
                onClick={() => setSelectedMessage(message)}
              >
                <CardContent className="pt-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-accent">{message.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className={`font-semibold ${!message.read ? 'text-white' : 'text-slate-300'}`}>
                            {message.sender}
                          </p>
                          <p className="text-xs text-muted-foreground">{message.senderRole}</p>
                        </div>
                        {!message.read && <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-2" />}
                      </div>
                      <p className={`text-sm font-medium mt-2 ${!message.read ? 'text-white' : 'text-slate-300'}`}>
                        {message.subject}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {message.preview}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {message.date}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Message Details Panel */}
        <div>
          {selectedMessage ? (
            <Card className="border-slate-700 sticky top-20">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                  <span className="text-sm font-semibold text-accent">{selectedMessage.avatar}</span>
                </div>
                <CardTitle className="text-lg">{selectedMessage.sender}</CardTitle>
                <CardDescription>{selectedMessage.senderRole}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase mb-1">Subject</p>
                  <p className="font-semibold">{selectedMessage.subject}</p>
                </div>
                <div className="pt-4 border-t border-slate-700">
                  <p className="text-sm text-muted-foreground mb-4">{selectedMessage.preview}</p>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-accent hover:bg-cyan-500 text-slate-950 gap-2">
                    <Send className="w-4 h-4" />
                    Reply
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-slate-700">
              <CardContent className="pt-12 text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">Select a message to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
