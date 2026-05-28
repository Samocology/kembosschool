'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Users, Plus, Edit, Trash2, Search, X, Check, AlertTriangle, ArrowUpDown } from 'lucide-react'
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

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
  joinDate: string
  linkedStudents?: number[] // Student IDs linked to parent
}

interface Student {
  id: number
  name: string
  studentId: string
}

export default function AdminUsers() {
  const [students] = useState<Student[]>([
    { id: 1, name: 'Chinedu Okafor', studentId: 'STU-001' },
    { id: 2, name: 'Blessing Eze', studentId: 'STU-002' },
    { id: 3, name: 'Ngozi Adeyemi', studentId: 'STU-003' },
    { id: 4, name: 'Emeka Nwankwo', studentId: 'STU-004' },
    { id: 5, name: 'Amara Obi', studentId: 'STU-005' },
  ])

  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Chinedu Okafor', email: 'chinedu@kembo.edu', role: 'Student', status: 'active', joinDate: '2024-01-15', linkedStudents: [] },
    { id: 2, name: 'Mrs. Chukwu', email: 'chukwu@kembo.edu', role: 'Staff', status: 'active', joinDate: '2023-08-20', linkedStudents: [] },
    { id: 3, name: 'Dr. Okonkwo', email: 'okonkwo@kembo.edu', role: 'Admin', status: 'active', joinDate: '2022-09-01', linkedStudents: [] },
    { id: 4, name: 'Blessing Eze', email: 'blessing@kembo.edu', role: 'Student', status: 'active', joinDate: '2024-02-10', linkedStudents: [] },
    { id: 5, name: 'Mr. Adeleke', email: 'adeleke@kembo.edu', role: 'Staff', status: 'inactive', joinDate: '2023-11-05', linkedStudents: [] },
    { id: 6, name: 'Ngozi Adeyemi', email: 'ngozi@kembo.edu', role: 'Student', status: 'active', joinDate: '2024-01-20', linkedStudents: [] },
    { id: 7, name: 'Grace Okonkwo', email: 'grace.okonkwo@kembo.edu', role: 'Parent', status: 'active', joinDate: '2024-01-10', linkedStudents: [1, 4] },
    { id: 8, name: 'Mrs. Adeyemi', email: 'adeyemi.parent@kembo.edu', role: 'Parent', status: 'active', joinDate: '2024-01-18', linkedStudents: [3] },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [sortField, setSortField] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [filterRole, setFilterRole] = useState<string>('all')
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Student',
    status: 'active',
    linkedStudents: [] as number[]
  })

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'Staff':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'Student':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'Parent':
        return 'bg-purple-100 text-purple-700 border-purple-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'inactive':
        return 'bg-gray-100 text-gray-600 border-gray-200'
      case 'suspended':
        return 'bg-red-100 text-red-700 border-red-200'
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const filteredUsers = users
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRole = filterRole === 'all' || user.role === filterRole
      return matchesSearch && matchesRole
    })
    .sort((a, b) => {
      if (!sortField) return 0
      const aValue = a[sortField as keyof User]
      const bValue = b[sortField as keyof User]
      
      // Handle undefined or non-comparable values
      if (aValue === undefined || bValue === undefined) return 0
      if (typeof aValue !== 'string' && typeof bValue !== 'string') return 0
      
      const aStr = String(aValue).toLowerCase()
      const bStr = String(bValue).toLowerCase()
      
      if (sortDirection === 'asc') {
        return aStr > bStr ? 1 : -1
      }
      return aStr < bStr ? 1 : -1
    })

  const handleAddUser = () => {
    const newUser: User = {
      id: users.length + 1,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: formData.status,
      joinDate: new Date().toISOString().split('T')[0],
      linkedStudents: formData.linkedStudents
    }
    setUsers([...users, newUser])
    setFormData({ name: '', email: '', role: 'Student', status: 'active', linkedStudents: [] })
    setIsAddUserOpen(false)
  }

  const handleEditUser = () => {
    if (!selectedUser) return
    setUsers(users.map(user => 
      user.id === selectedUser.id 
        ? { ...user, ...formData, linkedStudents: formData.linkedStudents }
        : user
    ))
    setSelectedUser(null)
    setIsEditUserOpen(false)
  }

  const handleDeleteUser = () => {
    if (!selectedUser) return
    setUsers(users.filter(user => user.id !== selectedUser.id))
    setSelectedUser(null)
    setIsDeleteDialogOpen(false)
  }

  const openEditDialog = (user: User) => {
    setSelectedUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      linkedStudents: user.linkedStudents || []
    })
    setIsEditUserOpen(true)
  }

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user)
    setIsDeleteDialogOpen(true)
  }

  const handleToggleStatus = (user: User) => {
    setUsers(users.map(u => 
      u.id === user.id 
        ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
        : u
    ))
  }

  const handleClearSearch = () => {
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9]">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-[28px] font-bold text-gray-900 tracking-tight">User Management</h1>
            <p className="text-xs sm:text-sm md:text-[15px] text-gray-600 mt-1">Manage system users, roles, and permissions</p>
          </div>
          <Button 
            className="h-9 sm:h-10 text-xs sm:text-sm font-semibold bg-gray-900 hover:bg-gray-800 text-white px-2 sm:px-4 gap-1 sm:gap-2 w-full sm:w-auto"
            onClick={() => {
              setFormData({ name: '', email: '', role: 'Student', status: 'active', linkedStudents: [] })
              setIsAddUserOpen(true)
            }}
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Add User</span>
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-3 sm:p-5">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 h-9 sm:h-10 text-xs sm:text-base"
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-9 sm:h-10 text-xs sm:text-sm font-medium text-gray-700 border-gray-300 hover:bg-gray-50 bg-white gap-1 sm:gap-2 px-2 sm:px-3 w-full sm:w-auto">
                    <ArrowUpDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                    <span className="truncate">{filterRole === 'all' ? 'All Roles' : filterRole}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuLabel className="text-gray-900 font-semibold">Filter by role</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => setFilterRole('all')}
                    className="text-gray-700 cursor-pointer"
                  >
                    <Check className={`w-4 h-4 mr-2 ${filterRole === 'all' ? 'opacity-100 text-blue-600' : 'opacity-0'}`} />
                    All Roles
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setFilterRole('Admin')}
                    className="text-gray-700 cursor-pointer"
                  >
                    <Check className={`w-4 h-4 mr-2 ${filterRole === 'Admin' ? 'opacity-100 text-blue-600' : 'opacity-0'}`} />
                    Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setFilterRole('Staff')}
                    className="text-gray-700 cursor-pointer"
                  >
                    <Check className={`w-4 h-4 mr-2 ${filterRole === 'Staff' ? 'opacity-100 text-blue-600' : 'opacity-0'}`} />
                    Staff
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setFilterRole('Student')}
                    className="text-gray-700 cursor-pointer"
                  >
                    <Check className={`w-4 h-4 mr-2 ${filterRole === 'Student' ? 'opacity-100 text-blue-600' : 'opacity-0'}`} />
                    Student
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setFilterRole('Parent')}
                    className="text-gray-700 cursor-pointer"
                  >
                    <Check className={`w-4 h-4 mr-2 ${filterRole === 'Parent' ? 'opacity-100 text-blue-600' : 'opacity-0'}`} />
                    Parent
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-700" />
                  All Users
                </CardTitle>
                <CardDescription className="text-sm text-gray-600 mt-1">
                  {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found
                </CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-sm text-gray-600 hover:text-gray-900"
                onClick={() => alert('Exporting user list...')}
              >
                Export List
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th 
                      className="text-left py-3 px-4 font-semibold text-gray-900 text-sm cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center gap-1">
                        Name
                        {sortField === 'name' && (
                          <ArrowUpDown className="w-3 h-3" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="text-left py-3 px-4 font-semibold text-gray-900 text-sm cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort('email')}
                    >
                      <div className="flex items-center gap-1">
                        Email
                        {sortField === 'email' && (
                          <ArrowUpDown className="w-3 h-3" />
                        )}
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Role</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 text-sm">Status</th>
                    <th 
                      className="text-left py-3 px-4 font-semibold text-gray-900 text-sm cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort('joinDate')}
                    >
                      <div className="flex items-center gap-1">
                        Join Date
                        {sortField === 'joinDate' && (
                          <ArrowUpDown className="w-3 h-3" />
                        )}
                      </div>
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr 
                      key={user.id} 
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleToggleStatus(user)}
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border cursor-pointer hover:opacity-80 transition-opacity ${getStatusColor(user.status)}`}
                        >
                          {user.status === 'active' ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="text-sm text-gray-600">{user.joinDate}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center gap-1">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            onClick={() => openEditDialog(user)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => openDeleteDialog(user)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <Users className="w-12 h-12 text-gray-300" />
                          <p className="text-gray-500 font-medium">No users found</p>
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

        {/* Add User Dialog */}
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-900">Add New User</DialogTitle>
              <DialogDescription className="text-gray-600">
                Create a new user account with specific role and permissions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Full Name</label>
                <Input
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white border-gray-300 text-gray-900 h-10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Email Address</label>
                <Input
                  type="email"
                  placeholder="user@kembo.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white border-gray-300 text-gray-900 h-10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full h-10 rounded-md border border-gray-300 bg-white text-gray-900 px-3 text-sm"
                >
                  <option value="Student">Student</option>
                  <option value="Parent">Parent</option>
                  <option value="Staff">Staff</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              {formData.role === 'Parent' && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-900">Link to Students</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2 bg-gray-50">
                    {students.map((student) => (
                      <label key={student.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={(formData.linkedStudents || []).includes(student.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                linkedStudents: [...(formData.linkedStudents || []), student.id]
                              })
                            } else {
                              setFormData({
                                ...formData,
                                linkedStudents: (formData.linkedStudents || []).filter(id => id !== student.id)
                              })
                            }
                          }}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">{student.name} ({student.studentId})</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsAddUserOpen(false)}
                className="text-gray-700 border-gray-300"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddUser}
                className="bg-gray-900 hover:bg-gray-800 text-white"
                disabled={!formData.name || !formData.email}
              >
                Add User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit User Dialog */}
        <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-900">Edit User</DialogTitle>
              <DialogDescription className="text-gray-600">
                Update user information and permissions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Full Name</label>
                <Input
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white border-gray-300 text-gray-900 h-10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Email Address</label>
                <Input
                  type="email"
                  placeholder="user@kembo.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white border-gray-300 text-gray-900 h-10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full h-10 rounded-md border border-gray-300 bg-white text-gray-900 px-3 text-sm"
                >
                  <option value="Student">Student</option>
                  <option value="Parent">Parent</option>
                  <option value="Staff">Staff</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              {formData.role === 'Parent' && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-900">Link to Students</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2 bg-gray-50">
                    {students.map((student) => (
                      <label key={student.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={(formData.linkedStudents || []).includes(student.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                linkedStudents: [...(formData.linkedStudents || []), student.id]
                              })
                            } else {
                              setFormData({
                                ...formData,
                                linkedStudents: (formData.linkedStudents || []).filter(id => id !== student.id)
                              })
                            }
                          }}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">{student.name} ({student.studentId})</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full h-10 rounded-md border border-gray-300 bg-white text-gray-900 px-3 text-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsEditUserOpen(false)}
                className="text-gray-700 border-gray-300"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleEditUser}
                className="bg-gray-900 hover:bg-gray-800 text-white"
                disabled={!formData.name || !formData.email}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <DialogTitle className="text-xl font-bold text-gray-900">Delete User</DialogTitle>
              </div>
              <DialogDescription className="text-gray-600">
                Are you sure you want to delete this user? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="py-4">
                <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                  <p className="font-semibold text-gray-900">{selectedUser.name}</p>
                  <p className="text-sm text-gray-600">{selectedUser.email}</p>
                  <p className="text-sm text-gray-500 mt-1">{selectedUser.role}</p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteDialogOpen(false)}
                className="text-gray-700 border-gray-300"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleDeleteUser}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
