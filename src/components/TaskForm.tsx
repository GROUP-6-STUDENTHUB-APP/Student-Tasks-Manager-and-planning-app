import { useState, useEffect } from 'react'
import { Task } from '../types/task'
import './TaskForm.css'

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void
  onCancel?: () => void
  initialTask?: Task | null
}

function TaskForm({ onSubmit, onCancel, initialTask }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [status, setStatus] = useState<'todo' | 'in-progress' | 'done'>('todo')
  const [dueDate, setDueDate] = useState('')

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title)
      setDescription(initialTask.description)
      setPriority(initialTask.priority)
      setStatus(initialTask.status)
      setDueDate(initialTask.dueDate || '')
    } else {
      resetForm()
    }
  }, [initialTask])

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setPriority('medium')
    setStatus('todo')
    setDueDate('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      alert('Veuillez saisir un titre pour la tâche')
      return
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      dueDate: dueDate || undefined,
    })

    if (!initialTask) {
      resetForm()
    }
  }

  return (
    <div className="task-form-container">
      <h2>{initialTask ? 'Modifier la Tâche' : 'Nouvelle Tâche'}</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Titre *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Réviser les mathématiques"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Détails de la tâche..."
            rows={3}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status">Statut</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as 'todo' | 'in-progress' | 'done')}
            >
              <option value="todo">À faire</option>
              <option value="in-progress">En cours</option>
              <option value="done">Terminé</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priorité</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            >
              <option value="low">Basse</option>
              <option value="medium">Moyenne</option>
              <option value="high">Haute</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Date limite</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {initialTask ? 'Mettre à jour' : 'Ajouter'}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Annuler
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default TaskForm

