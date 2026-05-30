'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle2, Users, BookOpen, BarChart3, MessageSquare, Shield, Zap, Star, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Navigation - Frosted Glass */}
      <nav className="sticky top-0 z-50 px-4 pt-4 pb-0">
        <div className="max-w-6xl mx-auto rounded-2xl border border-white/30 bg-white/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
          <div className="px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md shadow-blue-500/20">
                <span className="text-white font-bold text-base">K</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Kembos<span className="text-amber-500">.</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-1">
              {['Features', 'Why Kembos', 'Testimonials', 'FAQs'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="px-4 py-2 rounded-lg text-sm text-slate-600 hover:text-blue-700 hover:bg-white/60 transition-all duration-200 font-medium"
                >
                  {item}
                </a>
              ))}
            </div>
            
            <Link href="/login">
              <Button className="bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-sm rounded-lg px-4 py-2 h-9 text-sm">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/10 via-indigo-400/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-amber-400/10 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/40 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-xs font-semibold text-slate-700">
                  Premier School Management
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold leading-[1.15] text-slate-900 tracking-tight">
                Transform your school
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  with digital excellence
                </span>
              </h1>
              
              <p className="text-base text-slate-600 leading-relaxed max-w-lg">
                Empower students, engage parents, and streamline operations with the comprehensive platform trusted by leading schools across Nigeria.
              </p>
              
              <div className="flex items-center gap-3 pt-2">
                <Link href="/login">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white font-medium shadow-lg shadow-amber-500/20 rounded-xl px-5 py-2.5 h-11 text-sm gap-2">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="ghost" className="text-slate-700 hover:text-slate-900 hover:bg-white/60 font-medium rounded-xl px-5 py-2.5 h-11 text-sm gap-2">
                    <MessageSquare className="w-4 h-4" /> Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Hero Card - Glassmorphic */}
            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/10 rounded-3xl blur-2xl" />
              <div className="relative bg-white/30 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl shadow-blue-500/5 overflow-hidden">
                <div className="bg-gradient-to-br from-blue-900/95 to-indigo-900/95 p-10 text-center">
                  <div className="inline-flex p-3.5 rounded-xl bg-white/10 backdrop-blur-sm mb-5">
                    <BookOpen className="w-10 h-10 text-amber-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">Platform Preview</h3>
                  <p className="text-blue-200/80 text-sm">Experience modern school management</p>
                  
                  {/* Dashboard mock elements with real content */}
                  <div className="mt-6 space-y-3 text-left text-sm">
                    {/* Performance Metrics */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                        <div className="text-amber-300 font-bold text-base">92.5%</div>
                        <div className="text-white/70 text-xs mt-0.5">GPA Average</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                        <div className="text-blue-300 font-bold text-base">96%</div>
                        <div className="text-white/70 text-xs mt-0.5">Attendance Rate</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                        <div className="text-indigo-300 font-bold text-base">2,450</div>
                        <div className="text-white/70 text-xs mt-0.5">Active Students</div>
                      </div>
                    </div>
                    
                    {/* Recent Activities */}
                    <div className="bg-white/8 backdrop-blur-sm rounded-lg p-3 border border-white/10 space-y-2">
                      <div className="text-white/90 font-medium text-xs">Recent Activities</div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">Results published for JS2</span>
                          <span className="text-amber-300 text-xs">Today</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">3 new assignments posted</span>
                          <span className="text-blue-300 text-xs">Yesterday</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">Monthly fees updated</span>
                          <span className="text-indigo-300 text-xs">2 days ago</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Quick Stats Bar */}
                    <div className="flex gap-2 pt-1">
                      <div className="flex-1 bg-amber-500/25 backdrop-blur-sm rounded-lg border border-amber-400/40 px-2 py-1.5">
                        <div className="text-amber-200 text-xs font-medium">📊 View Reports</div>
                      </div>
                      <div className="flex-1 bg-blue-500/20 backdrop-blur-sm rounded-lg border border-blue-400/40 px-2 py-1.5">
                        <div className="text-blue-200 text-xs font-medium">📝 Grade Results</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats - Glassmorphic Row */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '2,450+', label: 'Students Managed' },
              { value: '125+', label: 'Staff Members' },
              { value: '98%', label: 'System Uptime' },
              { value: '50+', label: 'Schools Trust Us' },
            ].map((stat, idx) => (
              <div key={idx} className="relative group">
                <div className="relative bg-white/50 backdrop-blur-md rounded-2xl border border-white/40 shadow-sm hover:shadow-md transition-all duration-300 p-5 text-center">
                  <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid - Glass Cards */}
      <section id="features" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
              Four Integrated Portals
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto">
              Purpose-built interfaces for every stakeholder in your school ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                icon: BookOpen,
                title: 'Student Portal',
                description: 'Real-time access to grades, assignments, timetables, and academic progress tracking.',
                features: ['Academic results & transcripts', 'Online assignment submission', 'Attendance monitoring', 'Schedule management']
              },
              {
                icon: Users,
                title: 'Parent Portal',
                description: 'Stay connected with your child\'s education through instant updates and seamless payments.',
                features: ['Real-time performance tracking', 'Online fee payments', 'Teacher communication', 'Progress reports']
              },
              {
                icon: BarChart3,
                title: 'Staff Portal',
                description: 'Streamlined tools for grade management, attendance, and student engagement.',
                features: ['Grade submission & analytics', 'Digital attendance', 'Assignment management', 'Parent messaging']
              },
              {
                icon: Shield,
                title: 'Admin Portal',
                description: 'Complete oversight with powerful analytics, user management, and system controls.',
                features: ['User & role management', 'Payment reconciliation', 'Advanced analytics', 'System configuration']
              }
            ].map((portal, idx) => (
              <div key={idx} className="group relative">
                <div className="relative bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 shadow-sm hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <portal.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 mb-1.5">{portal.title}</h3>
                      <p className="text-sm text-slate-500 mb-4 leading-relaxed">{portal.description}</p>
                      <ul className="space-y-2">
                        {portal.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2.5 text-sm text-slate-600">
                            <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose - Elegant Glass Section */}
      <section id="why-kembos" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 to-blue-50/30" />
        
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
              Why Schools Choose Kembos
            </h2>
            <p className="text-sm text-slate-500">Built for the modern educational landscape</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Zap, title: 'Streamlined Operations', description: 'Automate administrative workflows and eliminate paperwork with intelligent digital processes.' },
              { icon: MessageSquare, title: 'Unified Communication', description: 'Connect students, parents, and staff with integrated messaging and real-time notifications.' },
              { icon: BarChart3, title: 'Actionable Insights', description: 'Make informed decisions with comprehensive analytics and customizable reporting dashboards.' },
            ].map((item, idx) => (
              <div key={idx} className="group relative">
                <div className="relative bg-white/70 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-all duration-300 p-6">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                    <item.icon className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About - Glass Panel */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/5 rounded-3xl blur-xl" />
            <div className="relative bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/50 shadow-xl shadow-blue-500/5 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8 items-center p-8">
                <div className="bg-gradient-to-br from-blue-900/95 to-indigo-900/95 rounded-2xl p-10 text-center">
                  <div className="inline-flex p-3.5 rounded-xl bg-white/10 backdrop-blur-sm mb-5">
                    <Users className="w-10 h-10 text-amber-400" />
                  </div>
                  <p className="text-white font-semibold mb-1">Join 50+ Leading Schools</p>
                  <p className="text-blue-200/70 text-sm">Growing community of forward-thinking institutions</p>
                </div>
                
                <div className="space-y-5">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Designed for modern education
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Built by educators and technologists who understand the complexities of school management. Our platform combines intuitive design with enterprise-grade reliability.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Trusted by 50+ leading schools',
                      '99.9% system uptime guarantee',
                      'Enterprise-grade security standards',
                      '24/7 dedicated support team'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Refined Glass Cards */}
      <section id="testimonials" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 to-transparent" />
        
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
              Trusted by Educators
            </h2>
            <p className="text-sm text-slate-500">Hear from schools already using Kembos</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                quote: "Kembos has completely transformed how we manage our school. The communication improvements alone are worth it.",
                author: "Dr. Femi Adeleke",
                role: "Principal, Kembos School Lagos"
              },
              {
                quote: "As a parent, I can now track my child's progress instantly. The payment system is seamless and reliable.",
                author: "Grace Okonkwo",
                role: "Parent"
              },
              {
                quote: "My teaching workflow has improved significantly. Grading and attendance are now so much faster.",
                author: "Mrs. Zainab Mohammed",
                role: "Mathematics Teacher"
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="group relative">
                <div className="relative bg-white/70 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-all duration-300 p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 mb-5 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-semibold">
                      {testimonial.author[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{testimonial.author}</p>
                      <p className="text-xs text-slate-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - Clean Glass Accordion */}
      <section id="faqs" className="py-20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-500">Everything you need to know</p>
          </div>

          <div className="space-y-3">
            {[
              { q: "How can students access their results online?", a: "Students can securely log in to their dashboard to view examination results, report cards, and academic performance records." },
              { q: "Can parents monitor their child's academic progress?", a: "Yes. Parents have access to a dedicated portal where they can track results, attendance records, assignments, and school announcements." },
              { q: "Is student information secure?", a: "Absolutely. We use secure authentication and data protection measures to ensure that all student, parent, and staff information remains confidential and protected." },
              { q: "Can the system be used on mobile phones?", a: "Yes. The platform is fully responsive and can be accessed on smartphones, tablets, laptops, and desktop computers." },
              { q: "What features are available for teachers and administrators?", a: "Teachers can manage attendance, assignments, and student records, while administrators can oversee admissions, fees, results, staff management, and school-wide operations." },
              { q: "Does the system support online learning and CBT examinations?", a: "Yes. Students can access e-learning materials, submit assignments, and participate in Computer-Based Tests (CBT) directly through the platform." },
              { q: "How are school announcements communicated?", a: "Important notices, events, and announcements are delivered through the system's notification center and can also be sent to parents and students." },
              { q: "Can report cards be downloaded and printed?", a: "Yes. Students and parents can download and print report cards and academic records whenever needed." }
            ].map((item, idx) => (
              <details key={idx} className="group">
                <summary className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-md rounded-xl border border-white/40 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer list-none">
                  <span className="text-sm font-semibold text-slate-900 pr-4">{item.q}</span>
                  <svg className="w-4 h-4 text-slate-400 transition-transform duration-300 group-open:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 pt-2">
                  <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Premium Glass */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-amber-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl p-10 space-y-6">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Ready to transform your school?
            </h2>
            <p className="text-base text-blue-100/90 max-w-md mx-auto">
              Join the growing community of schools using Kembos to deliver exceptional education experiences.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Link href="/login">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white font-medium shadow-lg shadow-amber-500/20 rounded-xl px-6 py-2.5 h-11 text-sm gap-2">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 font-medium rounded-xl px-6 py-2.5 h-11 text-sm">
                Talk to Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Subtle Glass */}
      <footer className="relative bg-slate-900">
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm" />
        <div className="max-w-6xl mx-auto px-6 py-12 relative">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">K</span>
                </div>
                <span className="text-lg font-bold text-white">
                  Kembos<span className="text-amber-500">.</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                The premier school management platform for modern education.
              </p>
            </div>
            
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Security', 'Updates'] },
              { title: 'Company', links: ['About', 'Blog', 'Contact', 'Careers'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies', 'GDPR'] }
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="text-xs font-semibold text-white/90 uppercase tracking-wider mb-3">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-xs text-slate-400 hover:text-white transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-white/10 pt-6 text-center">
            <p className="text-xs text-slate-500">&copy; 2024 Kembos Group of Schools. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}