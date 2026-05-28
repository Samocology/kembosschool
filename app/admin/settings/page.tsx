'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Settings, Save, School, BookOpen, CreditCard, 
  Shield, Bell, Database, Globe, Lock, Moon,
  Sun, Check, AlertTriangle, RefreshCw, Clock,
  HardDrive, Mail, Phone, MapPin, Calendar, Monitor
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function AdminSettings() {
  const [isSaving, setIsSaving] = useState<string | null>(null)
  const [isBackupRunning, setIsBackupRunning] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light')
  
  // School Information
  const [schoolInfo, setSchoolInfo] = useState({
    name: 'Kembos Group of Schools',
    email: 'info@kembosgroup.edu',
    phone: '+234 XXX XXX XXXX',
    address: '123 School Avenue, Lagos',
    website: 'www.kembosgroup.edu',
    motto: 'Excellence in Education'
  })

  // Academic Settings
  const [academicSettings, setAcademicSettings] = useState({
    currentTerm: 'Second Term 2024',
    academicYear: '2024/2025',
    gradingSystem: 'A-F',
    maxStudentsPerClass: '30',
    schoolHours: '8:00 AM - 3:00 PM'
  })

  // Fee Settings
  const [feeSettings, setFeeSettings] = useState({
    primaryTuition: '₦120,000',
    secondaryTuition: '₦150,000',
    latePaymentFee: '₦5,000',
    paymentDeadline: '2 weeks before term',
    acceptedMethods: 'Bank Transfer, Online, Cash'
  })

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    paymentReminders: true,
    attendanceAlerts: true,
    systemUpdates: true
  })

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: '30 minutes',
    passwordExpiry: '90 days',
    maxLoginAttempts: '5'
  })

  useEffect(() => {
    // Apply theme on mount and when theme changes
    const root = document.documentElement
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.toggle('dark', systemTheme === 'dark')
    } else {
      root.classList.toggle('dark', theme === 'dark')
    }
    
    // Save theme preference
    localStorage.setItem('theme', theme)
  }, [theme])

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  const handleSave = async (section: string) => {
    setIsSaving(section)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(null)
    setSuccessMessage(`${section} settings saved successfully!`)
    setShowSuccessDialog(true)
  }

  const handleBackup = async () => {
    setIsBackupRunning(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsBackupRunning(false)
    setSuccessMessage('System backup completed successfully!')
    setShowSuccessDialog(true)
  }

  const toggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-4 h-4" />
      case 'dark':
        return <Moon className="w-4 h-4" />
      case 'system':
        return <Monitor className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-gray-900 transition-colors duration-300">
      <div className="p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-bold text-gray-900 dark:text-white tracking-tight transition-colors">Settings</h1>
            <p className="text-[15px] text-gray-600 dark:text-gray-400 mt-1 transition-colors">Manage school information and system configuration</p>
          </div>
          
          {/* Theme Switcher */}
          <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <button
              onClick={() => setTheme('light')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                theme === 'light' 
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Sun className="w-4 h-4" />
              Light
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                theme === 'dark' 
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Moon className="w-4 h-4" />
              Dark
            </button>
            <button
              onClick={() => setTheme('system')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                theme === 'system' 
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Monitor className="w-4 h-4" />
              System
            </button>
          </div>
        </div>

        {/* Appearance Settings Card */}
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                {getThemeIcon()}
              </div>
              Appearance
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
              Customize how the dashboard looks and feels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Light Mode Preview */}
              <button
                onClick={() => setTheme('light')}
                className={`relative p-4 rounded-xl border-2 transition-all ${
                  theme === 'light' 
                    ? 'border-gray-900 dark:border-white shadow-md' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
              >
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <div className="flex-1 h-2 bg-gray-100 rounded"></div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-1.5 bg-gray-100 rounded w-full"></div>
                    <div className="h-1.5 bg-gray-100 rounded w-3/4"></div>
                    <div className="h-1.5 bg-gray-100 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Sun className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Light</span>
                </div>
                {theme === 'light' && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center">
                    <Check className="w-3 h-3 text-white dark:text-gray-900" />
                  </div>
                )}
              </button>

              {/* Dark Mode Preview */}
              <button
                onClick={() => setTheme('dark')}
                className={`relative p-4 rounded-xl border-2 transition-all ${
                  theme === 'dark' 
                    ? 'border-gray-900 dark:border-white shadow-md' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
              >
                <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-3 mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                    <div className="flex-1 h-2 bg-gray-800 rounded"></div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-1.5 bg-gray-800 rounded w-full"></div>
                    <div className="h-1.5 bg-gray-800 rounded w-3/4"></div>
                    <div className="h-1.5 bg-gray-800 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Moon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Dark</span>
                </div>
                {theme === 'dark' && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center">
                    <Check className="w-3 h-3 text-white dark:text-gray-900" />
                  </div>
                )}
              </button>

              {/* System Mode Preview */}
              <button
                onClick={() => setTheme('system')}
                className={`relative p-4 rounded-xl border-2 transition-all ${
                  theme === 'system' 
                    ? 'border-gray-900 dark:border-white shadow-md' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
              >
                <div className="bg-gradient-to-br from-white to-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    <div className="flex-1 h-2 bg-gray-300 rounded"></div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-1.5 bg-gray-300 rounded w-full"></div>
                    <div className="h-1.5 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-1.5 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Monitor className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">System</span>
                </div>
                {theme === 'system' && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center">
                    <Check className="w-3 h-3 text-white dark:text-gray-900" />
                  </div>
                )}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {theme === 'system' 
                      ? 'Using system preference' 
                      : `Currently using ${theme} mode`}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {theme === 'system' 
                      ? 'Theme will automatically switch based on your device settings' 
                      : theme === 'dark'
                        ? 'Dark mode reduces eye strain in low-light environments'
                        : 'Light mode provides maximum readability in bright environments'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* School Information */}
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <School className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              School Information
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
              Basic school details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-1.5 transition-colors">
                  <School className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                  School Name
                </label>
                <Input
                  value={schoolInfo.name}
                  onChange={(e) => setSchoolInfo({ ...schoolInfo, name: e.target.value })}
                  className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white h-10 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-1.5 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                  Email Address
                </label>
                <Input
                  type="email"
                  value={schoolInfo.email}
                  onChange={(e) => setSchoolInfo({ ...schoolInfo, email: e.target.value })}
                  className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white h-10 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-1.5 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                  Phone Number
                </label>
                <Input
                  value={schoolInfo.phone}
                  onChange={(e) => setSchoolInfo({ ...schoolInfo, phone: e.target.value })}
                  className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white h-10 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-1.5 transition-colors">
                  <Globe className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                  Website
                </label>
                <Input
                  value={schoolInfo.website}
                  onChange={(e) => setSchoolInfo({ ...schoolInfo, website: e.target.value })}
                  className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white h-10 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-1.5 transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                  Address
                </label>
                <Input
                  value={schoolInfo.address}
                  onChange={(e) => setSchoolInfo({ ...schoolInfo, address: e.target.value })}
                  className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white h-10 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-1.5 transition-colors">
                  <BookOpen className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                  School Motto
                </label>
                <Input
                  value={schoolInfo.motto}
                  onChange={(e) => setSchoolInfo({ ...schoolInfo, motto: e.target.value })}
                  className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white h-10 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>
            </div>
            <Button 
              onClick={() => handleSave('School Information')}
              disabled={isSaving === 'School Information'}
              className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-semibold gap-2 h-10 transition-colors"
            >
              {isSaving === 'School Information' ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving === 'School Information' ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardContent>
        </Card>

        {/* Academic Settings */}
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              Academic Settings
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
              Configure academic terms, grading, and class settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-1.5 transition-colors">
                  <Calendar className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                  Current Term
                </label>
                <Input
                  value={academicSettings.currentTerm}
                  onChange={(e) => setAcademicSettings({ ...academicSettings, currentTerm: e.target.value })}
                  className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white h-10 transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-900 dark:text-gray-200 transition-colors">Academic Year</label>
                <Input
                  value={academicSettings.academicYear}
                  onChange={(e) => setAcademicSettings({ ...academicSettings, academicYear: e.target.value })}
                  className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white h-10 transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-900 dark:text-gray-200 transition-colors">Grading System</label>
                <select
                  value={academicSettings.gradingSystem}
                  onChange={(e) => setAcademicSettings({ ...academicSettings, gradingSystem: e.target.value })}
                  className="w-full h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 text-sm transition-colors"
                >
                  <option value="A-F">A-F Grading</option>
                  <option value="1-100">Percentage (1-100)</option>
                  <option value="GPA">GPA (0-4.0)</option>
                  <option value="Pass/Fail">Pass/Fail</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-900 dark:text-gray-200 transition-colors">Max Students Per Class</label>
                <Input
                  value={academicSettings.maxStudentsPerClass}
                  onChange={(e) => setAcademicSettings({ ...academicSettings, maxStudentsPerClass: e.target.value })}
                  className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white h-10 transition-colors"
                />
              </div>
            </div>
            <Button 
              onClick={() => handleSave('Academic Settings')}
              disabled={isSaving === 'Academic Settings'}
              className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-semibold gap-2 h-10 transition-colors"
            >
              {isSaving === 'Academic Settings' ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving === 'Academic Settings' ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardContent>
        </Card>

        {/* Fee Settings */}
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              Fee Settings
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
              Configure school fees, payment terms, and methods
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-900 dark:text-gray-200 transition-colors">Tuition Fee (Primary)</label>
                <Input
                  value={feeSettings.primaryTuition}
                  onChange={(e) => setFeeSettings({ ...feeSettings, primaryTuition: e.target.value })}
                  className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white h-10 transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-900 dark:text-gray-200 transition-colors">Tuition Fee (Secondary)</label>
                <Input
                  value={feeSettings.secondaryTuition}
                  onChange={(e) => setFeeSettings({ ...feeSettings, secondaryTuition: e.target.value })}
                  className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white h-10 transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-900 dark:text-gray-200 transition-colors">Late Payment Fee</label>
                <Input
                  value={feeSettings.latePaymentFee}
                  onChange={(e) => setFeeSettings({ ...feeSettings, latePaymentFee: e.target.value })}
                  className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white h-10 transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-900 dark:text-gray-200 transition-colors">Payment Deadline</label>
                <Input
                  value={feeSettings.paymentDeadline}
                  onChange={(e) => setFeeSettings({ ...feeSettings, paymentDeadline: e.target.value })}
                  className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white h-10 transition-colors"
                />
              </div>
            </div>
            <Button 
              onClick={() => handleSave('Fee Settings')}
              disabled={isSaving === 'Fee Settings'}
              className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-semibold gap-2 h-10 transition-colors"
            >
              {isSaving === 'Fee Settings' ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving === 'Fee Settings' ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Bell className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              Notification Preferences
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
              Manage how you receive notifications and alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: 'emailNotifications' as const, label: 'Email Notifications', description: 'Receive notifications via email' },
              { key: 'smsNotifications' as const, label: 'SMS Notifications', description: 'Receive notifications via text message' },
              { key: 'paymentReminders' as const, label: 'Payment Reminders', description: 'Get alerted about upcoming and overdue payments' },
              { key: 'attendanceAlerts' as const, label: 'Attendance Alerts', description: 'Receive alerts for student attendance issues' },
              { key: 'systemUpdates' as const, label: 'System Updates', description: 'Stay informed about system maintenance and updates' },
            ].map((item) => (
              <div 
                key={item.key}
                className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white transition-colors">{item.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 transition-colors">{item.description}</p>
                </div>
                <button
                  onClick={() => toggleNotification(item.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationSettings[item.key] ? 'bg-gray-900 dark:bg-white' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                      notificationSettings[item.key] 
                        ? 'translate-x-6 bg-white dark:bg-gray-900' 
                        : 'translate-x-1 bg-white dark:bg-gray-300'
                    }`}
                  />
                </button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Shield className="w-4 h-4 text-red-600 dark:text-red-400" />
              </div>
              Security Settings
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
              Configure security and access control settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-900 dark:text-gray-200 transition-colors">Session Timeout</label>
                <select
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                  className="w-full h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 text-sm transition-colors"
                >
                  <option value="15 minutes">15 minutes</option>
                  <option value="30 minutes">30 minutes</option>
                  <option value="1 hour">1 hour</option>
                  <option value="4 hours">4 hours</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-900 dark:text-gray-200 transition-colors">Password Expiry</label>
                <select
                  value={securitySettings.passwordExpiry}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, passwordExpiry: e.target.value })}
                  className="w-full h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 text-sm transition-colors"
                >
                  <option value="30 days">30 days</option>
                  <option value="60 days">60 days</option>
                  <option value="90 days">90 days</option>
                  <option value="Never">Never</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white transition-colors">Two-Factor Authentication</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 transition-colors">Add an extra layer of security to your account</p>
              </div>
              <button
                onClick={() => setSecuritySettings({ ...securitySettings, twoFactorAuth: !securitySettings.twoFactorAuth })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  securitySettings.twoFactorAuth ? 'bg-gray-900 dark:bg-white' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                    securitySettings.twoFactorAuth 
                      ? 'translate-x-6 bg-white dark:bg-gray-900' 
                      : 'translate-x-1 bg-white dark:bg-gray-300'
                  }`}
                />
              </button>
            </div>

            <Button 
              onClick={() => handleSave('Security Settings')}
              disabled={isSaving === 'Security Settings'}
              className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-semibold gap-2 h-10 transition-colors"
            >
              {isSaving === 'Security Settings' ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving === 'Security Settings' ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 transition-colors">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <Database className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </div>
              System Information
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
              System status, backups, and maintenance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <p className="text-sm font-semibold text-gray-900 dark:text-white transition-colors">System Version</p>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">v1.0.0</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 transition-colors">Latest stable release</p>
              </div>
              
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <HardDrive className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <p className="text-sm font-semibold text-gray-900 dark:text-white transition-colors">Last Backup</p>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">2:00 AM</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 transition-colors">May 24, 2024</p>
              </div>
              
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <p className="text-sm font-semibold text-gray-900 dark:text-white transition-colors">Uptime</p>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">99.9%</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 transition-colors">Last 30 days</p>
              </div>
              
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <p className="text-sm font-semibold text-gray-900 dark:text-white transition-colors">Security Status</p>
                </div>
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 transition-colors">Secure</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 transition-colors">All systems protected</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={handleBackup}
                disabled={isBackupRunning}
                className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-semibold gap-2 h-10 transition-colors"
              >
                {isBackupRunning ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Database className="w-4 h-4" />
                )}
                {isBackupRunning ? 'Running Backup...' : 'Run Backup Now'}
              </Button>
              <Button 
                variant="outline" 
                className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold gap-2 h-10 transition-colors"
                onClick={() => alert('System check initiated...')}
              >
                <Shield className="w-4 h-4" />
                System Check
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-sm bg-white dark:bg-gray-800 border-0">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white">Success!</DialogTitle>
            </div>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              {successMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              onClick={() => setShowSuccessDialog(false)}
              className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 w-full transition-colors"
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}