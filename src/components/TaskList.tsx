import { Task } from '../types/task'
import TaskItem from './TaskItem'
import './TaskList.css'

interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onUpdateStatus: (id: string, status: 'todo' | 'in-progress' | 'done') => void
}

function TaskList({ tasks, onEdit, onDelete, onUpdateStatus }: TaskListProps) {
  const sortedTasks = [...tasks].sort((a, b) => {
    // Trier par statut (todo -> in-progress -> done), puis par priorité, puis par date
    const statusOrder = { 'todo': 1, 'in-progress': 2, 'done': 3 }
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status]
    }
    
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    }
    
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    }
    return 0
  })

  if (tasks.length === 0) {
    return (
      <div className="task-list-container">
        <div className="empty-state">
          <p>📝 Aucune tâche pour le moment</p>
          <p className="empty-subtitle">Ajoutez votre première tâche ci-dessus !</p>
        </div>
      </div>
    )
  }

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>Mes Tâches</h2>
        <span className="task-count">
          {tasks.length} {tasks.length === 1 ? 'tâche' : 'tâches'}
        </span>
      </div>

      <div className="task-list">
        {sortedTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onUpdateStatus={onUpdateStatus}
          />
        ))}
      </div>
    </div>
  )
}

export default TaskList

