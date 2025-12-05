import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import './Dashboard.css'
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import StatsCards from './StatsCards'
import { Task } from '../types/task'

function Dashboard() {
  const { user, logout } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [filter, setFilter] = useState<'all' | 'todo' | 'in-progress' | 'done'>('all')

  // Charger les tâches depuis localStorage au démarrage
  useEffect(() => {
    if (user) {
      const savedTasks = localStorage.getItem(`studenthub-tasks-${user.id}`)
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks))
      }
    }
  }, [user])

  useEffect(() => {
    if (user && tasks.length >= 0) {
      localStorage.setItem(`studenthub-tasks-${user.id}`, JSON.stringify(tasks))
    }
  }, [tasks, user])

  const addTask = (task: Omit<Task, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return
    
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      userId: user.id,
      createdAt: new Date().toISOString(),
    }
    setTasks([...tasks, newTask])
  }

  const updateTask = (id: string, updatedTask: Omit<Task, 'id' | 'userId' | 'createdAt'>) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, ...updatedTask, updatedAt: new Date().toISOString() }
        : task
    ))
    setEditingTask(null)
  }

  const deleteTask = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      setTasks(tasks.filter(task => task.id !== id))
    }
  }

  const updateTaskStatus = (id: string, status: 'todo' | 'in-progress' | 'done') => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, status, updatedAt: new Date().toISOString() }
        : task
    ))
  }

  const startEdit = (task: Task) => {
    setEditingTask(task)
  }

  const cancelEdit = () => {
    setEditingTask(null)
  }

  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === filter)

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
  }

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand">
            <h1>🎓 StudentHub</h1>
          </div>
          <div className="navbar-user">
            <span className="user-name">Bonjour, {user?.name}!</span>
            <button onClick={logout} className="btn-logout">
              Déconnexion
            </button>
          </div>
        </div>
      </nav>

      <div className="dashboard-container">
        <StatsCards stats={stats} />
        
        <div className="dashboard-content">
          <TaskForm 
            onSubmit={editingTask ? (task) => updateTask(editingTask.id, task) : addTask}
            onCancel={editingTask ? cancelEdit : undefined}
            initialTask={editingTask}
          />

          <div className="tasks-section">
            <div className="filter-tabs">
              <button
                onClick={() => setFilter('all')}
                className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
              >
                Toutes ({stats.total})
              </button>
              <button
                onClick={() => setFilter('todo')}
                className={`filter-tab ${filter === 'todo' ? 'active' : ''}`}
              >
                À faire ({stats.todo})
              </button>
              <button
                onClick={() => setFilter('in-progress')}
                className={`filter-tab ${filter === 'in-progress' ? 'active' : ''}`}
              >
                En cours ({stats.inProgress})
              </button>
              <button
                onClick={() => setFilter('done')}
                className={`filter-tab ${filter === 'done' ? 'active' : ''}`}
              >
                Terminé ({stats.done})
              </button>
            </div>

            <TaskList 
              tasks={filteredTasks}
              onEdit={startEdit}
              onDelete={deleteTask}
              onUpdateStatus={updateTaskStatus}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

