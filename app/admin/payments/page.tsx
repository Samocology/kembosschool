'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  CreditCard, TrendingUp, TrendingDown, AlertCircle, 
  Search, Filter, Download, Check, X, ArrowUpDown,
  Calendar, DollarSign, Users, Percent, Eye
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Payment {
  id: number
  student: string
  term: string
  amount: string
  date: string
  status: string
  method?: string
  reference?: string
}

export default function AdminPayments() {
  const [payments, setPayments] = useState<Payment[]>([
    { id: 1, student: 'Chinedu Okafor', term: 'Second Term 2024', amount: '₦150,000', date: '2024-05-25', status: 'completed', method: 'Bank Transfer', reference: 'REF001' },
    { id: 2, student: 'Blessing Eze', term: 'Second Term 2024', amount: '₦150,000', date: '2024-05-24', status: 'completed', method: 'Online Payment', reference: 'REF002' },
    { id: 3, student: 'Ngozi Adeyemi', term: 'Second Term 2024', amount: '₦150,000', date: '2024-05-23', status: 'pending', method: 'Bank Transfer', reference: 'REF003' },
    { id: 4, student: 'Chisom Nwosu', term: 'First Term 2024', amount: '₦150,000', date: '2024-02-28', status: 'completed', method: 'Cash', reference: 'REF004' },
    { id: 5, student: 'Tunde Akinsanya', term: 'Second Term 2024', amount: '₦150,000', date: '2024-05-20', status: 'failed', method: 'Online Payment', reference: 'REF005' },
    { id: 6, student: 'Amara Obi', term: 'Second Term 2024', amount: '₦75,000', date: '2024-05-19', status: 'pending', method: 'Bank Transfer', reference: 'REF006' },
    { id: 7, student: 'Emeka Nwankwo', term: 'Second Term 2024', amount: '₦150,000', date: '2024-05-18', status: 'completed', method: 'Online Payment', reference: 'REF007' },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortField, setSortField] = useState('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const summary = {
    totalCollected: '₦45.2M',
    monthlyTarget: '₦50M',
    pending: '₦12.5M',
    percentage: '90.4%',
    totalTransactions: 287,
    failedPayments: '₦2.1M',
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const filteredPayments = payments
    .filter(payment => {
      const matchesSearch = payment.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          payment.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          payment.reference?.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = filterStatus === 'all' || payment.status === filterStatus
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (!sortField) return 0
      const aValue = a[sortField as keyof Payment] || ''
      const bValue = b[sortField as keyof Payment] || ''
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1
      }
      return aValue < bValue ? 1 : -1
    })

  const handleViewDetails = (payment: Payment) => {
    alert(`Payment Details:\n\nStudent: ${payment.student}\nAmount: ${payment.amount}\nMethod: ${payment.method}\nReference: ${payment.reference}\nDate: ${payment.date}`)
  }

  const handleStatusChange = (paymentId: number, newStatus: string) => {
    setPayments(payments.map(p => 
      p.id === paymentId ? { ...p, status: newStatus } : p
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-200'
      case 'failed':
        return 'bg-red-100 text-red-700 border-red-200'
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9]">
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Payment Management</h1>
            <p className="text-[15px] text-gray-600 mt-1">Monitor school fees and payment collections</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-10 text-sm font-medium text-gray-700 border-gray-300 hover:bg-gray-50 bg-white"
              onClick={() => alert('Generating payment report...')}
            >
              <Download className="w-4 h-4 mr-2 text-gray-500" />
              Export Report
            </Button>
            <Button 
              size="sm" 
              className="h-10 text-sm font-semibold bg-gray-900 hover:bg-gray-800 text-white px-4"
              onClick={() => alert('Opening record payment form...')}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Record Payment
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow cursor-pointer" onClick={() => alert('Viewing collection details')}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Collected</p>
              <p className="text-[28px] font-bold text-gray-900 tracking-tight">{summary.totalCollected}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-700">+12.5% from last term</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow cursor-pointer" onClick={() => alert('Viewing monthly target')}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">Monthly Target</p>
              <p className="text-[28px] font-bold text-gray-900 tracking-tight">{summary.monthlyTarget}</p>
              <div className="flex items-center gap-1 mt-2">
                <Percent className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-xs font-semibold text-blue-700">{summary.percentage} achieved</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow cursor-pointer" onClick={() => alert('Viewing pending payments')}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">Pending Payments</p>
              <p className="text-[28px] font-bold text-gray-900 tracking-tight">{summary.pending}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-xs font-semibold text-amber-700">45 invoices unpaid</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow cursor-pointer" onClick={() => alert('Viewing failed transactions')}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">Failed Transactions</p>
              <p className="text-[28px] font-bold text-gray-900 tracking-tight">{summary.failedPayments}</p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-xs font-semibold text-red-700">8 transactions failed</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by student name, term, or reference..."
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
                    {filterStatus === 'all' ? 'All Status' : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuLabel className="text-gray-900 font-semibold">Filter by status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {[
                    { value: 'all', label: 'All Payments' },
                    { value: 'completed', label: 'Completed' },
                    { value: 'pending', label: 'Pending' },
                    { value: 'failed', label: 'Failed' },
                  ].map((filter) => (
                    <DropdownMenuItem 
                      key={filter.value}
                      onClick={() => setFilterStatus(filter.value)}
                      className="text-gray-700 cursor-pointer"
                    >
                      <Check className={`w-4 h-4 mr-2 ${filterStatus === filter.value ? 'opacity-100 text-blue-600' : 'opacity-0'}`} />
                      {filter.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* Payments Table */}
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-gray-900">Recent Payments</CardTitle>
                <CardDescription className="text-sm text-gray-600 mt-1">
                  {filteredPayments.length} {filteredPayments.length === 1 ? 'transaction' : 'transactions'} found
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th 
                      className="text-left py-3 px-4 font-semibold text-gray-900 text-sm cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort('student')}
                    >
                      <div className="flex items-center gap-1">
                        Student
                        {sortField === 'student' && <ArrowUpDown className="w-3 h-3" />}
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Term</th>
                    <th 
                      className="text-center py-3 px-4 font-semibold text-gray-900 text-sm cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort('amount')}
                    >
                      <div className="flex items-center justify-center gap-1">
                        Amount
                        {sortField === 'amount' && <ArrowUpDown className="w-3 h-3" />}
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Method</th>
                    <th 
                      className="text-left py-3 px-4 font-semibold text-gray-900 text-sm cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort('date')}
                    >
                      <div className="flex items-center gap-1">
                        Date
                        {sortField === 'date' && <ArrowUpDown className="w-3 h-3" />}
                      </div>
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 text-sm">Status</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr 
                      key={payment.id} 
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <p className="text-sm font-semibold text-gray-900">{payment.student}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="text-sm text-gray-600">{payment.term}</p>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <p className="text-sm font-bold text-gray-900">{payment.amount}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="text-sm text-gray-600">{payment.method}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="text-sm text-gray-600">{payment.date}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex justify-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border cursor-pointer hover:opacity-80 transition-opacity ${getStatusColor(payment.status)}`}>
                                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center" className="w-36">
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(payment.id, 'completed')}
                                className="text-emerald-700 cursor-pointer"
                              >
                                <Check className="w-3.5 h-3.5 mr-2" />
                                Completed
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(payment.id, 'pending')}
                                className="text-amber-700 cursor-pointer"
                              >
                                <AlertCircle className="w-3.5 h-3.5 mr-2" />
                                Pending
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(payment.id, 'failed')}
                                className="text-red-700 cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5 mr-2" />
                                Failed
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center gap-1">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            onClick={() => handleViewDetails(payment)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredPayments.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-12 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <CreditCard className="w-12 h-12 text-gray-300" />
                          <p className="text-gray-500 font-medium">No payments found</p>
                          <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}