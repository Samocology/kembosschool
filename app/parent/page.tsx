'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Award, Clock, CreditCard, TrendingUp, Bell, MessageSquare,
  GraduationCap, Users, BookOpen, Calendar, ArrowUpRight,
  Check, AlertCircle, Eye, ChevronRight, Mail, Phone
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ParentDashboard() {
  const [selectedChild, setSelectedChild] = useState<any>(null)
  const [showChildDetails, setShowChildDetails] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  // Mock parent session - in real app, would come from auth
  const currentParentId = 7 // Grace Okonkwo with linked students [1, 4]
  const parentStudentMap: Record<number, number[]> = {
    7: [1, 4], // Grace Okonkwo linked to students 1 and 4
    8: [3],    // Mrs. Adeyemi linked to student 3
  }

  // All available student data
  const allStudentsData = [
    {
      id: 1,
      name: 'Chinedu Okafor',
      class: 'SS3A',
      studentId: 'STU-001',
      score: '85.5%',
      rank: '8/45',
      attendance: '94%',
      pending_fees: 'No',
      avatar: 'CO',
      subjects: [
        { name: 'Mathematics', grade: 'A', score: 92 },
        { name: 'English', grade: 'B+', score: 85 },
        { name: 'Physics', grade: 'A-', score: 88 },
        { name: 'Chemistry', grade: 'B', score: 82 },
        { name: 'Biology', grade: 'A', score: 90 },
      ]
    },
    {
      id: 2,
      name: 'Blessing Eze',
      class: 'SS3B',
      studentId: 'STU-002',
      score: '88.2%',
      rank: '5/42',
      attendance: '96%',
      pending_fees: 'No',
      avatar: 'BE',
      subjects: [
        { name: 'Mathematics', grade: 'A', score: 89 },
        { name: 'English', grade: 'A', score: 91 },
        { name: 'Physics', grade: 'A-', score: 87 },
        { name: 'Chemistry', grade: 'A', score: 90 },
        { name: 'Biology', grade: 'A', score: 92 },
      ]
    },
    {
      id: 3,
      name: 'Ngozi Adeyemi',
      class: 'SS3A',
      studentId: 'STU-003',
      score: '91.3%',
      rank: '3/45',
      attendance: '98%',
      pending_fees: 'No',
      avatar: 'NA',
      subjects: [
        { name: 'Mathematics', grade: 'A+', score: 98 },
        { name: 'English', grade: 'A', score: 93 },
        { name: 'Physics', grade: 'A', score: 91 },
        { name: 'Chemistry', grade: 'A-', score: 89 },
        { name: 'Biology', grade: 'A', score: 92 },
      ]
    },
    {
      id: 4,
      name: 'Emeka Nwankwo',
      class: 'SS2A',
      studentId: 'STU-004',
      score: '79.6%',
      rank: '18/48',
      attendance: '87%',
      pending_fees: 'Yes',
      avatar: 'EN',
      subjects: [
        { name: 'Mathematics', grade: 'B', score: 81 },
        { name: 'English', grade: 'B-', score: 78 },
        { name: 'Physics', grade: 'B', score: 80 },
        { name: 'Chemistry', grade: 'C+', score: 75 },
        { name: 'Biology', grade: 'B', score: 81 },
      ]
    },
  ]

  // Get only the students linked to the current parent
  const linkedStudentIds = parentStudentMap[currentParentId] || []
  const childrenData = allStudentsData.filter(student => linkedStudentIds.includes(student.id))

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Low Attendance Alert',
      message: "John's attendance is below 95%. Current: 94%",
      date: '2024-05-23',
      icon: AlertCircle,
    },
    {
      id: 2,
      type: 'success',
      title: 'Excellent Performance',
      message: 'Jane achieved an A grade in Mathematics',
      date: '2024-05-22',
      icon: Award,
    },
    {
      id: 3,
      type: 'info',
      title: 'School Event',
      message: 'Annual sports day is scheduled for June 10, 2024',
      date: '2024-05-21',
      icon: Calendar,
    },
  ]

  const payments = [
    { term: 'Second Term 2024', amount: '₦150,000', due_date: '2024-05-31', status: 'paid', paidDate: '2024-05-15' },
    { term: 'Third Term 2024', amount: '₦150,000', due_date: '2024-08-31', status: 'pending', paidDate: null },
  ]

  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'warning':
        return {
          bg: 'bg-amber-50 dark:bg-amber-900/20',
          border: 'border-amber-200 dark:border-amber-800',
          dot: 'bg-amber-500',
          iconBg: 'bg-amber-100 dark:bg-amber-900/30',
          iconColor: 'text-amber-600 dark:text-amber-400'
        }
      case 'success':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-900/20',
          border: 'border-emerald-200 dark:border-emerald-800',
          dot: 'bg-emerald-500',
          iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
          iconColor: 'text-emerald-600 dark:text-emerald-400'
        }
      case 'info':
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          border: 'border-blue-200 dark:border-blue-800',
          dot: 'bg-blue-500',
          iconBg: 'bg-blue-100 dark:bg-blue-900/30',
          iconColor: 'text-blue-600 dark:text-blue-400'
        }
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-900/20',
          border: 'border-gray-200 dark:border-gray-800',
          dot: 'bg-gray-500',
          iconBg: 'bg-gray-100 dark:bg-gray-900/30',
          iconColor: 'text-gray-600 dark:text-gray-400'
        }
    }
  }

  const handleViewDetails = (child: any) => {
    setSelectedChild(child)
    setShowChildDetails(true)
  }

  const handleMakePayment = () => {
    setShowPaymentDialog(true)
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-gray-900 transition-colors duration-300">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl sm:text-2xl md:text-[28px] font-bold text-gray-900 dark:text-white tracking-tight transition-colors">
            Welcome, Parent
          </h1>
          <p className="text-xs sm:text-sm md:text-[15px] text-gray-600 dark:text-gray-400 mt-1 transition-colors">
            Monitor your children's academic progress and school activities
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Children</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{childrenData.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Avg Score</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">88.9%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Attendance</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">96%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Pending Fees</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">₦150K</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Children Cards */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 transition-colors">Your Children</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {childrenData.map((child) => (
              <Card key={child.id} className="border-0 shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition-all group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
                        {child.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg transition-colors">{child.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{child.class} • {child.studentId}</p>
                      </div>
                    </div>
                    <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                      child.pending_fees === 'No' 
                        ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                        : 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                    }`}>
                      {child.pending_fees === 'No' ? '✓ No Fees Due' : 'Fees Pending'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{child.score}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">Overall</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
                      <p className="text-xl font-bold text-gray-900 dark:text-white">{child.rank}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">Rank</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
                      <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{child.attendance}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">Attendance</p>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-semibold gap-2 h-10 transition-colors"
                    onClick={() => handleViewDetails(child)}
                  >
                    <Eye className="w-4 h-4" />
                    View Full Details
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Alerts and Payments Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Alerts */}
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                </div>
                Alerts & Notifications
              </CardTitle>
              <CardDescription className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
                Important updates about your children
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert) => {
                  const styles = getAlertStyles(alert.type)
                  const Icon = alert.icon
                  return (
                    <div 
                      key={alert.id} 
                      className={`p-4 rounded-xl border ${styles.bg} ${styles.border} transition-colors cursor-pointer hover:shadow-sm`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-lg ${styles.iconBg} flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-4 h-4 ${styles.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">{alert.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{alert.message}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{alert.date}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Payment Status */}
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                Payment Status
              </CardTitle>
              <CardDescription className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
                Tuition and fees payment schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {payments.map((payment, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">{payment.term}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Due: {payment.due_date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 dark:text-white">{payment.amount}</p>
                        <span className={`inline-flex px-2 py-0.5 rounded-lg text-xs font-semibold border mt-1 ${
                          payment.status === 'paid'
                            ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                            : 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                        }`}>
                          {payment.status === 'paid' ? '✓ Paid' : 'Pending'}
                        </span>
                      </div>
                    </div>
                    {payment.paidDate && (
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        Paid on: {payment.paidDate}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <Button 
                className="w-full mt-4 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-semibold gap-2 h-10 transition-colors"
                onClick={handleMakePayment}
              >
                <CreditCard className="w-4 h-4" />
                Make Payment
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Messages */}
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              Recent Messages
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
              Communication with school staff
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { sender: 'Form Teacher', role: 'Mrs. Chukwu', message: 'Your child is doing well in class. Keep up the good work!', time: '2024-05-23', unread: true },
                { sender: 'Principal', role: 'Dr. Okonkwo', message: 'School resumption date has been updated to June 3, 2024', time: '2024-05-22', unread: true },
                { sender: 'Math Teacher', role: 'Mr. Adeleke', message: 'Extra classes will be held on Saturdays starting June 1', time: '2024-05-20', unread: false },
              ].map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-xl border transition-colors cursor-pointer hover:shadow-sm ${
                    msg.unread 
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                      : 'bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        {msg.sender}
                        {msg.unread && (
                          <span className="inline-flex ml-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white">
                            NEW
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{msg.role}</p>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{msg.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{msg.message}</p>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold gap-2 h-10 transition-colors"
              onClick={() => alert('Opening all messages...')}
            >
              <Mail className="w-4 h-4" />
              View All Messages
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Child Details Dialog */}
      <Dialog open={showChildDetails} onOpenChange={setShowChildDetails}>
        <DialogContent className="sm:max-w-2xl bg-white dark:bg-gray-800 border-0 max-h-[90vh] overflow-y-auto">
          {selectedChild && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
                    {selectedChild.avatar}
                  </div>
                  <div>
                    <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                      {selectedChild.name}
                    </DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-400">
                      {selectedChild.class} • {selectedChild.studentId}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                {/* Performance Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-center">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{selectedChild.score}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Overall Score</p>
                  </div>
                  <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 text-center">
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{selectedChild.rank}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Class Rank</p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-center">
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{selectedChild.attendance}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Attendance</p>
                  </div>
                </div>

                {/* Subject Grades */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Subject Performance</h4>
                  <div className="space-y-2">
                    {selectedChild.subjects.map((subject: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{subject.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-bold text-gray-900 dark:text-white">{subject.score}%</span>
                          <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold ${
                            subject.grade.startsWith('A') 
                              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                          }`}>
                            {subject.grade}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button 
                  onClick={() => setShowChildDetails(false)}
                  className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 transition-colors"
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 border-0">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">Make Payment</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Pay school fees securely online
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Term</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">Third Term 2024</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Amount</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">₦150,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Due Date</span>
                <span className="text-sm text-gray-900 dark:text-white">August 31, 2024</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900 dark:text-gray-200">Payment Method</label>
              <select className="w-full h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 text-sm transition-colors">
                <option>Bank Transfer</option>
                <option>Credit/Debit Card</option>
                <option>USSD</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowPaymentDialog(false)}
              className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 transition-colors"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                setShowPaymentDialog(false)
                alert('Payment initiated successfully!')
              }}
              className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 transition-colors gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Pay ₦150,000
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
