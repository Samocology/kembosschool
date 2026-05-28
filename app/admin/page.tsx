'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Users, BookOpen, CreditCard, BarChart3, TrendingUp, 
  Activity, Server, Database, Cloud, Shield, 
  ArrowUpRight, ArrowDownRight, MoreHorizontal, Download,
  Filter, Calendar, RefreshCw, Settings, Check,
  ChevronDown, FileText, Mail, Bell, UserPlus
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AdminDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [dateFilter, setDateFilter] = useState('Last 30 days')
  const [filterOpen, setFilterOpen] = useState(false)
  const [exportLoading, setExportLoading] = useState(false)

  const stats = [
    { 
      label: 'Total Students', 
      value: '2,450', 
      icon: Users, 
      change: '+45', 
      trend: 'up',
      iconBg: 'bg-blue-600',
      iconColor: 'text-white',
      trendColor: 'text-emerald-700',
      trendBg: 'bg-emerald-100'
    },
    { 
      label: 'Total Staff', 
      value: '125', 
      icon: Users, 
      change: '+5', 
      trend: 'up',
      iconBg: 'bg-violet-600',
      iconColor: 'text-white',
      trendColor: 'text-emerald-700',
      trendBg: 'bg-emerald-100'
    },
    { 
      label: 'Active Classes', 
      value: '85', 
      icon: BookOpen, 
      change: '+3', 
      trend: 'up',
      iconBg: 'bg-indigo-600',
      iconColor: 'text-white',
      trendColor: 'text-emerald-700',
      trendBg: 'bg-emerald-100'
    },
    { 
      label: 'Revenue (MTD)', 
      value: '₦45.2M', 
      icon: CreditCard, 
      change: '+12%', 
      trend: 'up',
      iconBg: 'bg-amber-500',
      iconColor: 'text-white',
      trendColor: 'text-emerald-700',
      trendBg: 'bg-emerald-100'
    },
  ]

  const systemHealth = [
    { 
      name: 'Database', 
      status: 'Operational', 
      uptime: '99.99%',
      icon: Database,
      latency: '12ms',
    },
    { 
      name: 'Server Cluster', 
      status: 'Operational', 
      uptime: '99.95%',
      icon: Server,
      latency: '45ms',
    },
    { 
      name: 'API Services', 
      status: 'Operational', 
      uptime: '99.98%',
      icon: Cloud,
      latency: '8ms',
    },
    { 
      name: 'Backup System', 
      status: 'Operational', 
      uptime: 'Last: 2h ago',
      icon: Shield,
      latency: 'Synced',
    },
  ]

  const recentActivities = [
    { 
      action: 'New student registered',
      detail: 'John Doe - SS2 Science',
      timestamp: '10 minutes ago',
      type: 'registration',
      dotColor: 'bg-blue-600'
    },
    { 
      action: 'Staff payroll processed',
      detail: 'May 2024 - 125 staff members',
      timestamp: '2 hours ago',
      type: 'payment',
      dotColor: 'bg-emerald-600'
    },
    { 
      action: 'System backup completed',
      detail: 'Full backup - 2.4GB',
      timestamp: '4 hours ago',
      type: 'system',
      dotColor: 'bg-purple-600'
    },
    { 
      action: 'Announcement published',
      detail: 'End of term examination schedule',
      timestamp: '6 hours ago',
      type: 'notification',
      dotColor: 'bg-amber-600'
    },
    { 
      action: 'Fee payment received',
      detail: 'Bulk payment - ₦2.5M from 45 students',
      timestamp: '8 hours ago',
      type: 'payment',
      dotColor: 'bg-emerald-600'
    },
  ]

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsRefreshing(false)
  }

  const handleExport = async (format: string) => {
    setExportLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setExportLoading(false)
    alert(`Dashboard exported as ${format.toUpperCase()}`)
  }

  const handleDateFilterChange = (filter: string) => {
    setDateFilter(filter)
    setFilterOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9]">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-[28px] font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-xs sm:text-sm md:text-[15px] text-gray-600 mt-1">System overview and administrative controls</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Date Filter */}
            <DropdownMenu open={filterOpen} onOpenChange={setFilterOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 sm:h-10 text-xs sm:text-sm font-medium text-gray-700 border-gray-300 hover:bg-gray-50 bg-white">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-500" />
                  <span className="hidden sm:inline">{dateFilter}</span>
                  <span className="sm:hidden">Filter</span>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="text-gray-900 font-semibold">Filter by period</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {['Today', 'Last 7 days', 'Last 30 days', 'This year'].map((filter) => (
                  <DropdownMenuItem 
                    key={filter}
                    onClick={() => handleDateFilterChange(filter)}
                    className="text-gray-700 cursor-pointer"
                  >
                    <Check className={`w-4 h-4 mr-2 ${dateFilter === filter ? 'opacity-100 text-blue-600' : 'opacity-0'}`} />
                    {filter}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Export Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-9 sm:h-10 text-xs sm:text-sm font-medium text-gray-700 border-gray-300 hover:bg-gray-50 bg-white"
                  disabled={exportLoading}
                >
                  {exportLoading ? (
                    <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 animate-spin" />
                  ) : (
                    <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-500" />
                  )}
                  <span className="hidden sm:inline">{exportLoading ? 'Exporting...' : 'Export'}</span>
                  <span className="sm:hidden">{exportLoading ? '...' : 'Export'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="text-gray-900 font-semibold">Export format</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {[
                  { label: 'Export as PDF', icon: FileText },
                  { label: 'Export as CSV', icon: Download },
                  { label: 'Export as Excel', icon: Download },
                ].map((item) => (
                  <DropdownMenuItem 
                    key={item.label}
                    onClick={() => handleExport(item.label.split(' ')[2].toLowerCase())}
                    className="text-gray-700 cursor-pointer"
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <Button 
              variant="outline" 
              size="icon" 
              className="h-9 sm:h-10 w-9 sm:w-10 text-gray-700 border-gray-300 hover:bg-gray-50 bg-white relative"
              onClick={() => alert('Notifications panel opened')}
            >
              <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-[10px] sm:text-[11px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </Button>

            {/* Settings */}
            <Button 
              size="sm" 
              className="h-9 sm:h-10 text-xs sm:text-sm font-semibold bg-gray-900 hover:bg-gray-800 text-white px-2 sm:px-4"
              onClick={() => alert('Navigating to settings...')}
            >
              <Settings className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card 
                key={stat.label} 
                className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer bg-white"
                onClick={() => alert(`Viewing detailed report for: ${stat.label}`)}
              >
                <CardContent className="p-3 sm:p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl ${stat.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className={`inline-flex items-center gap-0.5 sm:gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-xs font-semibold ${stat.trendColor} ${stat.trendBg}`}>
                      <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1">{stat.label}</p>
                  <p className="text-xl sm:text-2xl md:text-[28px] font-bold text-gray-900 tracking-tight">{stat.value}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* System Health */}
          <Card className="lg:col-span-2 border-0 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold text-gray-900">System Health</CardTitle>
                  <CardDescription className="text-sm text-gray-600 mt-1">Infrastructure status & performance</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-9 w-9 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="space-y-3">
                {systemHealth.map((system) => {
                  const Icon = system.icon
                  return (
                    <div 
                      key={system.name} 
                      className="flex items-center justify-between p-4 rounded-xl bg-gray-50/80 border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
                      onClick={() => alert(`Viewing ${system.name} details`)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-white border border-gray-300 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-gray-700" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{system.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-gray-600">Uptime: {system.uptime}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-600">Latency: {system.latency}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                          <span className="text-sm font-semibold text-emerald-700">{system.status}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Overview */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold text-gray-900">Quick Overview</CardTitle>
              <CardDescription className="text-sm text-gray-600 mt-1">Real-time metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div 
                className="p-4 rounded-xl bg-gray-50/80 border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
                onClick={() => alert('Viewing active sessions details')}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-700">Active Sessions</p>
                  <Activity className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-[28px] font-bold text-gray-900">287</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-700">12% increase</span>
                </div>
              </div>
              
              <div 
                className="p-4 rounded-xl bg-gray-50/80 border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
                onClick={() => alert('Viewing pending payments')}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-700">Pending Payments</p>
                  <CreditCard className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-[28px] font-bold text-gray-900">₦12.5M</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowDownRight className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-sm font-semibold text-amber-700">45 pending</span>
                </div>
              </div>
              
              <div 
                className="p-4 rounded-xl bg-gray-50/80 border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
                onClick={() => alert('Viewing system load details')}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-700">System Load</p>
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[28px] font-bold text-gray-900">42%</p>
                  <div className="flex-1 max-w-[120px] ml-4">
                    <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                        style={{ width: '42%' }} 
                      />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Normal operation range</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-gray-900">Recent Activities</CardTitle>
                <CardDescription className="text-sm text-gray-600 mt-1">Latest system events and actions</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9 text-sm font-medium text-gray-700 border-gray-300 hover:bg-gray-50 bg-white">
                      <Filter className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuLabel className="text-gray-900 font-semibold">Filter activities</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {['All Activities', 'Registrations', 'Payments', 'System Events'].map((filter) => (
                      <DropdownMenuItem 
                        key={filter}
                        onClick={() => alert(`Filtering: ${filter}`)}
                        className="text-gray-700 cursor-pointer"
                      >
                        {filter}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuItem onClick={() => alert('View all activities')} className="text-gray-700 cursor-pointer">
                      View All Activities
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => alert('Clear all activities')} className="text-gray-700 cursor-pointer">
                      Clear All
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => alert('Activity settings opened')} className="text-gray-700 cursor-pointer">
                      <Settings className="w-4 h-4 mr-2" />
                      Activity Settings
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="space-y-2">
              {recentActivities.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer border border-transparent hover:border-gray-200"
                  onClick={() => alert(`Viewing details: ${item.action}`)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                      <div className={`w-2.5 h-2.5 rounded-full ${item.dotColor}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.action}</p>
                      <p className="text-sm text-gray-600 mt-0.5">{item.detail}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{item.timestamp}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-gray-600"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation()
                          alert(`Viewing details: ${item.action}`)
                        }} className="text-gray-700 cursor-pointer">
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation()
                          alert(`Notification sent for: ${item.action}`)
                        }} className="text-gray-700 cursor-pointer">
                          <Mail className="w-3.5 h-3.5 mr-2" />
                          Send Notification
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
