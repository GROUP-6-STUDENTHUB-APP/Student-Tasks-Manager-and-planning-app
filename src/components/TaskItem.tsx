import { Task } from '../types/task'
import './TaskItem.css'

interface TaskItemProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onUpdateStatus: (id: string, status: 'todo' | 'in-progress' | 'done') => void
}

function TaskItem({ task, onEdit, onDelete, onUpdateStatus }: TaskItemProps) {
  const getPriorityLabel = (priority: string) => {
    const labels = {
      low: 'Basse',
      medium: 'Moyenne',
      high: 'Haute',
    }
    return labels[priority as keyof typeof labels] || priority
  }

  const getPriorityClass = (priority: string) => {
    return `priority-${priority}`
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const isOverdue = task.dueDate && task.status !== 'done' && new Date(task.dueDate) < new Date()

  const getStatusLabel = (status: string) => {
    const labels = {
      'todo': 'À faire',
      'in-progress': 'En cours',
      'done': 'Terminé',
    }
    return labels[status as keyof typeof labels] || status
  }

  return (
    <div className={`task-item task-status-${task.status} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-status-selector">
        <select
          value={task.status}
          onChange={(e) => onUpdateStatus(task.id, e.target.value as 'todo' | 'in-progress' | 'done')}
          className="status-select"
          aria-label="Changer le statut"
        >
          <option value="todo">À faire</option>
          <option value="in-progress">En cours</option>
          <option value="done">Terminé</option>
        </select>
      </div>

      <div className="task-content">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <span className={`status-badge status-${task.status}`}>
            {getStatusLabel(task.status)}
          </span>
        </div>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        <div className="task-meta">
          <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
            {getPriorityLabel(task.priority)}
          </span>
          {task.dueDate && (
            <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
              📅 {formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button
          onClick={() => onEdit(task)}
          className="btn-icon"
          aria-label="Modifier"
          title="Modifier"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="btn-icon btn-delete"
          aria-label="Supprimer"
          title="Supprimer"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}

export default TaskItem

