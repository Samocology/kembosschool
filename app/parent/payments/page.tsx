'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  CreditCard, CheckCircle, Clock, AlertCircle, Download,
  Search, Filter, Eye, Receipt, Shield, Calendar,
  ArrowUpRight, ArrowDownRight, Wallet, Building,
  ChevronDown, Check, X, RefreshCw
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

interface Payment {
  id: number
  term: string
  amount: string
  dueDate: string
  paidDate: string | null
  status: string
  child: string
  childClass: string
  method: string
  reference: string
  receipt: string
}

export default function ParentPayments() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [showReceiptDialog, setShowReceiptDialog] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('bank')

  const paymentHistory: Payment[] = [
    {
      id: 1,
      term: 'Second Term 2024',
      amount: '₦150,000',
      dueDate: '2024-05-31',
      paidDate: '2024-05-25',
      status: 'paid',
      child: 'John Doe',
      childClass: 'SS3A',
      method: 'Bank Transfer',
      reference: 'REF-2024-001',
      receipt: 'RCP-2024-001'
    },
    {
      id: 2,
      term: 'Second Term 2024',
      amount: '₦150,000',
      dueDate: '2024-05-31',
      paidDate: '2024-05-24',
      status: 'paid',
      child: 'Jane Doe',
      childClass: 'SS2B',
      method: 'Online Payment',
      reference: 'REF-2024-002',
      receipt: 'RCP-2024-002'
    },
    {
      id: 3,
      term: 'First Term 2024',
      amount: '₦150,000',
      dueDate: '2024-02-29',
      paidDate: '2024-02-28',
      status: 'paid',
      child: 'John Doe',
      childClass: 'SS3A',
      method: 'Bank Transfer',
      reference: 'REF-2024-003',
      receipt: 'RCP-2024-003'
    },
    {
      id: 4,
      term: 'Third Term 2024',
      amount: '₦150,000',
      dueDate: '2024-08-31',
      paidDate: null,
      status: 'pending',
      child: 'John Doe',
      childClass: 'SS3A',
      method: '-',
      reference: '-',
      receipt: '-'
    },
    {
      id: 5,
      term: 'Third Term 2024',
      amount: '₦150,000',
      dueDate: '2024-08-31',
      paidDate: null,
      status: 'pending',
      child: 'Jane Doe',
      childClass: 'SS2B',
      method: '-',
      reference: '-',
      receipt: '-'
    },
  ]

  const summary = {
    totalPaid: '₦450,000',
    pending: '₦300,000',
    dueCount: 2,
    paidCount: 3,
    nextDueDate: '2024-08-31'
  }

  const filteredPayments = paymentHistory.filter(payment => {
    const matchesSearch = payment.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.child.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.reference.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handlePayNow = (payment: Payment) => {
    setSelectedPayment(payment)
    setShowPaymentDialog(true)
  }

  const handleViewReceipt = (payment: Payment) => {
    setSelectedPayment(payment)
    setShowReceiptDialog(true)
  }

  const handleProcessPayment = async () => {
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setShowPaymentDialog(false)
    alert('Payment processed successfully! Receipt has been sent to your email.')
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-900/30',
          text: 'text-emerald-700 dark:text-emerald-400',
          border: 'border-emerald-200 dark:border-emerald-800',
          icon: CheckCircle,
          label: 'Paid'
        }
      case 'pending':
        return {
          bg: 'bg-amber-50 dark:bg-amber-900/30',
          text: 'text-amber-700 dark:text-amber-400',
          border: 'border-amber-200 dark:border-amber-800',
          icon: Clock,
          label: 'Pending'
        }
      case 'overdue':
        return {
          bg: 'bg-red-50 dark:bg-red-900/30',
          text: 'text-red-700 dark:text-red-400',
          border: 'border-red-200 dark:border-red-800',
          icon: AlertCircle,
          label: 'Overdue'
        }
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-900/30',
          text: 'text-gray-700 dark:text-gray-400',
          border: 'border-gray-200 dark:border-gray-800',
          icon: Clock,
          label: status
        }
    }
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-gray-900 transition-colors duration-300">
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-bold text-gray-900 dark:text-white tracking-tight transition-colors">
              Payment Management
            </h1>
            <p className="text-[15px] text-gray-600 dark:text-gray-400 mt-1 transition-colors">
              Manage school fees and payment history
            </p>
          </div>
          <Button 
            className="h-10 text-sm font-semibold bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 px-4 gap-2 transition-colors"
            onClick={() => alert('Downloading all receipts...')}
          >
            <Download className="w-4 h-4" />
            Download All Receipts
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition-all cursor-pointer" onClick={() => setFilterStatus('paid')}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Paid</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{summary.totalPaid}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{summary.paidCount} payments completed</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition-all cursor-pointer" onClick={() => setFilterStatus('pending')}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <ArrowDownRight className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{summary.pending}</p>
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">{summary.dueCount} payments due</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-all">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Next Due Date</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{summary.nextDueDate}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Third Term 2024</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-all">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Account Status</p>
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-1">In Good Standing</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">All payments up to date</p>
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
                  placeholder="Search by term, child name, or reference..."
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
                    {filterStatus === 'all' ? 'All Payments' : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuLabel className="text-gray-900 dark:text-white font-semibold">Filter by status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {[
                    { value: 'all', label: 'All Payments' },
                    { value: 'paid', label: 'Paid' },
                    { value: 'pending', label: 'Pending' },
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
            </div>
          </CardContent>
        </Card>

        {/* Payment History Table */}
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-gray-900 dark:text-white transition-colors">Payment History</CardTitle>
                <CardDescription className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
                  Complete record of all school fee payments
                </CardDescription>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {filteredPayments.length} {filteredPayments.length === 1 ? 'payment' : 'payments'}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white text-sm">Term</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white text-sm">Child</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white text-sm">Amount</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white text-sm">Due Date</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white text-sm">Paid Date</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white text-sm">Method</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white text-sm">Status</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => {
                    const statusStyle = getStatusBadge(payment.status)
                    const StatusIcon = statusStyle.icon
                    return (
                      <tr 
                        key={payment.id} 
                        className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                      >
                        <td className="py-3.5 px-4">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{payment.term}</p>
                        </td>
                        <td className="py-3.5 px-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{payment.child}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{payment.childClass}</p>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <p className="text-sm font-bold text-gray-900 dark:text-white">{payment.amount}</p>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <p className="text-sm text-gray-600 dark:text-gray-400">{payment.dueDate}</p>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {payment.paidDate || '-'}
                          </p>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="text-xs text-gray-500 dark:text-gray-400">{payment.method}</span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusStyle.label}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {payment.status === 'pending' ? (
                            <Button 
                              size="sm" 
                              className="h-8 text-xs font-semibold bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 transition-colors"
                              onClick={() => handlePayNow(payment)}
                            >
                              <CreditCard className="w-3.5 h-3.5 mr-1.5" />
                              Pay Now
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="h-8 text-xs font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                              onClick={() => handleViewReceipt(payment)}
                            >
                              <Eye className="w-3.5 h-3.5 mr-1.5" />
                              Receipt
                            </Button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                  {filteredPayments.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-12 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <CreditCard className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                          <p className="text-gray-500 dark:text-gray-400 font-medium">No payments found</p>
                          <p className="text-sm text-gray-400 dark:text-gray-500">Try adjusting your search or filters</p>
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

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 border-0">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">Make Payment</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Complete your school fee payment securely
            </DialogDescription>
          </DialogHeader>
          
          {selectedPayment && (
            <div className="space-y-4 py-4">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Child</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{selectedPayment.child}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Term</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{selectedPayment.term}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Amount</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{selectedPayment.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Due Date</span>
                  <span className="text-sm text-gray-900 dark:text-white">{selectedPayment.dueDate}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900 dark:text-gray-200">Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'bank', label: 'Bank Transfer', icon: Building },
                    { id: 'card', label: 'Card', icon: CreditCard },
                    { id: 'wallet', label: 'Wallet', icon: Wallet },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-3 rounded-xl border-2 transition-all text-center ${
                        paymentMethod === method.id
                          ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-700'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                    >
                      <method.icon className={`w-5 h-5 mx-auto mb-1 ${
                        paymentMethod === method.id ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                      }`} />
                      <span className={`text-xs font-medium ${
                        paymentMethod === method.id ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {method.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowPaymentDialog(false)}
              className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 transition-colors"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleProcessPayment}
              disabled={isProcessing}
              className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 transition-colors gap-2"
            >
              {isProcessing ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <CreditCard className="w-4 h-4" />
              )}
              {isProcessing ? 'Processing...' : `Pay ${selectedPayment?.amount}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Receipt Dialog */}
      <Dialog open={showReceiptDialog} onOpenChange={setShowReceiptDialog}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 border-0">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <Receipt className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white">Payment Receipt</DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-400">
                  Receipt #{selectedPayment?.receipt}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          
          {selectedPayment && (
            <div className="space-y-4 py-4">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Child</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{selectedPayment.child}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Term</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{selectedPayment.term}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Amount Paid</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{selectedPayment.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Payment Method</span>
                  <span className="text-sm text-gray-900 dark:text-white">{selectedPayment.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Reference</span>
                  <span className="text-sm text-gray-900 dark:text-white">{selectedPayment.reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Paid Date</span>
                  <span className="text-sm text-gray-900 dark:text-white">{selectedPayment.paidDate}</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">Payment verified and confirmed</span>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowReceiptDialog(false)}
              className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 transition-colors"
            >
              Close
            </Button>
            <Button 
              onClick={() => {
                setShowReceiptDialog(false)
                alert('Receipt downloaded successfully!')
              }}
              className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 transition-colors gap-2"
            >
              <Download className="w-4 h-4" />
              Download Receipt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}