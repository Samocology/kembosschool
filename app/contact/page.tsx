'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Phone, Send, Sparkles, ArrowUpRight, Building2, User, AtSign } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  const [focused, setFocused] = useState(null)

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-amber-500/5 to-transparent rounded-full blur-3xl" />
        
        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {/* Floating Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-amber-400 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Trusted by 500+ schools worldwide</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4 tracking-tight">
            Let's build something
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
              amazing together
            </span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Ready to transform your school management? Our team is here to help you 
            streamline operations and elevate the learning experience.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/[0.03] backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl shadow-black/20">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Form Section */}
            <div className="lg:col-span-3 space-y-6">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="relative group">
                  <label className="block text-sm font-medium text-zinc-300 mb-2 ml-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-amber-400 transition-colors" />
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all text-sm"
                      placeholder="John Doe"
                      type="text"
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label className="block text-sm font-medium text-zinc-300 mb-2 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-amber-400 transition-colors" />
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all text-sm"
                      placeholder="john@school.edu"
                      type="email"
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                </div>
              </div>

              <div className="relative group">
                <label className="block text-sm font-medium text-zinc-300 mb-2 ml-1">
                  School Name
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-amber-400 transition-colors" />
                  <input 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all text-sm"
                    placeholder="Enter your school or organization"
                    type="text"
                    onFocus={() => setFocused('school')}
                    onBlur={() => setFocused(null)}
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="block text-sm font-medium text-zinc-300 mb-2 ml-1">
                  Message <span className="text-zinc-600 font-normal">— optional</span>
                </label>
                <textarea 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 h-36 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all resize-none text-sm"
                  placeholder="Tell us about your needs, goals, or any questions you have..."
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button className="group relative bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-semibold px-8 py-6 rounded-2xl shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-300 flex items-center gap-3 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Send Message
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Button>

                <div className="flex items-center gap-3">
                  <div className="hidden sm:block w-px h-8 bg-white/10" />
                  <Link href="mailto:sales@kembos.school">
                    <Button 
                      variant="ghost" 
                      className="text-zinc-400 hover:text-amber-400 hover:bg-amber-400/5 transition-all inline-flex items-center gap-2 group"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email Sales</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Info Sidebar */}
            <div className="lg:col-span-2 lg:border-l border-white/10 lg:pl-10 flex flex-col justify-between">
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-6">
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-amber-400 text-xs font-medium">Available 24/7</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Why reach out?
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      { title: 'Quick Setup', desc: 'Get your school onboarded within days' },
                      { title: 'Custom Solutions', desc: 'Tailored features for your needs' },
                      { title: 'Priority Support', desc: 'Dedicated team for enterprise clients' },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 group cursor-default">
                        <div className="mt-1 w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{item.title}</p>
                          <p className="text-zinc-500 text-xs mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-white/[0.02] rounded-2xl p-5 border border-white/5">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                    "Kembos transformed how we manage our entire school system. The onboarding was seamless!"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xs font-bold text-black">
                      SD
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Sarah Drasner</p>
                      <p className="text-zinc-600 text-xs">Principal, Horizon Academy</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Contact */}
              <div className="pt-6 mt-6 border-t border-white/10">
                <Link 
                  href="mailto:sales@kembos.school"
                  className="flex items-center gap-3 text-zinc-500 hover:text-amber-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-amber-500/10 group-hover:border-amber-500/20 transition-all">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Prefer a call?</p>
                    <p className="text-xs">Schedule via email →</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}