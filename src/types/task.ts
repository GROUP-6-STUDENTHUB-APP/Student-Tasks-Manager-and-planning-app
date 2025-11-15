export interface Task {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  status: 'todo' | 'in-progress' | 'done'
  dueDate?: string
  createdAt: string
  updatedAt?: string
  userId: string
}

export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

