'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Users, Clock, BookOpen, Plus, Search } from 'lucide-react'

interface Class {
  id: number
  name: string
  level: string
  students: number
  form_teacher: string
  schedule: string
  time: string
}

export default function StaffClasses() {
  const [searchQuery, setSearchQuery] = useState('')
  
  const [classes] = useState<Class[]>([
    {
      id: 1,
      name: 'SS3A',
      level: 'Senior School 3',
      students: 45,
      form_teacher: 'Mrs. Chukwu',
      schedule: 'Mon - Fri',
      time: '8:00 AM - 3:30 PM'
    },
    {
      id: 2,
      name: 'SS3B',
      level: 'Senior School 3',
      students: 42,
      form_teacher: 'Mr. Adeleke',
      schedule: 'Mon - Fri',
      time: '8:00 AM - 3:30 PM'
    },
    {
      id: 3,
      name: 'SS2A',
      level: 'Senior School 2',
      students: 48,
      form_teacher: 'Mrs. Zainab',
      schedule: 'Mon - Fri',
      time: '8:00 AM - 3:30 PM'
    },
    {
      id: 4,
      name: 'SS2B',
      level: 'Senior School 2',
      students: 46,
      form_teacher: 'Mr. Femi',
      schedule: 'Mon - Fri',
      time: '8:00 AM - 3:30 PM'
    },
    {
      id: 5,
      name: 'SS1A',
      level: 'Senior School 1',
      students: 50,
      form_teacher: 'Mrs. Grace',
      schedule: 'Mon - Fri',
      time: '8:00 AM - 3:30 PM'
    },
  ])

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.form_teacher.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Classes</h1>
          <p className="text-muted-foreground mt-1">Manage and view your assigned classes</p>
        </div>
        <Button className="bg-accent hover:bg-cyan-500 text-slate-950 gap-2">
          <Plus className="w-4 h-4" />
          New Class
        </Button>
      </div>

      {/* Search Bar */}
      <Card className="border-slate-700">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search classes or form teachers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-slate-700"
            />
          </div>
        </CardContent>
      </Card>

      {/* Classes Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredClasses.map((cls) => (
          <Card key={cls.id} className="border-slate-700 hover:border-accent/50 transition">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl text-accent">{cls.name}</CardTitle>
                  <CardDescription>{cls.level}</CardDescription>
                </div>
                <div className="bg-slate-800 rounded-full p-3">
                  <BookOpen className="w-5 h-5 text-accent" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Students</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Users className="w-4 h-4 text-accent" />
                    <span className="text-lg font-semibold">{cls.students}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Form Teacher</p>
                  <p className="text-sm font-medium mt-1">{cls.form_teacher}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Clock className="w-4 h-4" />
                  <span>{cls.schedule}</span>
                </div>
                <p className="text-sm font-medium">{cls.time}</p>
              </div>

              <div className="pt-4 flex gap-2">
                <Button variant="outline" className="flex-1 border-slate-700 text-slate-300 hover:text-white">
                  View Students
                </Button>
                <Button variant="outline" className="flex-1 border-slate-700 text-slate-300 hover:text-white">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <Card className="border-slate-700">
          <CardContent className="pt-12 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">No classes found</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
