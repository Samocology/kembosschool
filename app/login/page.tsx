'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, User, UserCheck, Lock, ArrowLeft, Eye, EyeOff, Mail } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<'student' | 'parent' | 'staff' | 'admin' | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const roles = [
    {
      id: 'student',
      label: 'Student',
      description: 'Access results, assignments & schedules',
      icon: User,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/5',
    },
    {
      id: 'parent',
      label: 'Parent',
      description: 'Monitor progress & make payments',
      icon: Users,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/5',
    },
    {
      id: 'staff',
      label: 'Staff',
      description: 'Manage classes, grades & attendance',
      icon: UserCheck,
      gradient: 'from-emerald-500 to-green-500',
      bgGradient: 'from-emerald-500/10 to-green-500/5',
    },
    {
      id: 'admin',
      label: 'Administrator',
      description: 'Complete system management',
      icon: Lock,
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-500/10 to-orange-500/5',
    },
  ]

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedRole || !email || !password) {
      return
    }

    setIsLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 800))
    
    localStorage.setItem('userRole', selectedRole)
    localStorage.setItem('userEmail', email)
    
    router.push(`/${selectedRole}`)
  }

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/10 via-indigo-400/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-amber-400/10 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        
        <div className="w-full max-w-3xl relative">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-white font-bold text-xl">K</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
              Welcome to Kembos
            </h1>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Select your portal to access your personalized dashboard
            </p>
          </div>

          {/* Role Selection Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {roles.map((role) => {
              const Icon = role.icon
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id as any)}
                  className="group relative"
                >
                  <div className="relative bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 shadow-sm hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 p-5 text-left h-full">
                    <div className="flex items-start gap-4">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${role.gradient} flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 text-sm mb-1">{role.label}</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">{role.description}</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <span className="text-xs font-medium text-slate-400 group-hover:text-blue-600 transition-colors">
                        Continue →
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
          
          <p className="text-center text-xs text-slate-400 mt-8">
            Secure access to your school management portal
          </p>
        </div>
      </div>
    )
  }

  const selectedRoleData = roles.find(r => r.id === selectedRole)
  const Icon = selectedRoleData?.icon || User

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-transparent to-transparent" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-400/10 via-indigo-400/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      
      <div className="w-full max-w-md relative">
        {/* Back button */}
        <button
          onClick={() => setSelectedRole(null)}
          className="mb-4 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to role selection
        </button>

        <Card className="bg-white/70 backdrop-blur-xl border-white/40 shadow-xl shadow-slate-200/20 rounded-2xl overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedRoleData?.gradient} flex items-center justify-center shadow-md`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900 text-sm">Kembos Portal</h2>
                <p className="text-xs text-slate-500">{selectedRoleData?.label} Access</p>
              </div>
            </div>
            <CardTitle className="text-xl font-bold text-slate-900">
              Welcome back
            </CardTitle>
            <CardDescription className="text-sm text-slate-500">
              Sign in to your {selectedRoleData?.label.toLowerCase()} dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-medium text-slate-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@school.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/50 border-slate-200/50 focus:border-blue-500 rounded-xl h-11 text-sm"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="password" className="text-xs font-medium text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-white/50 border-slate-200/50 focus:border-blue-500 rounded-xl h-11 text-sm"
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="remember" className="text-xs text-slate-600">
                    Remember me
                  </label>
                </div>
                <button type="button" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className={`w-full bg-gradient-to-r ${selectedRoleData?.gradient} hover:opacity-90 text-white font-medium shadow-lg shadow-blue-500/20 rounded-xl h-11 text-sm transition-all duration-300`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </Button>

              <p className="text-center text-xs text-slate-400">
                Demo: Use any email and password
              </p>
            </form>
          </CardContent>
        </Card>
        
        <p className="text-center text-xs text-slate-400 mt-6">
          © 2024 Kembos Group of Schools
        </p>
      </div>
    </div>
  )
}