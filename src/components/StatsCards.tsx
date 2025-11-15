import './StatsCards.css'

interface StatsCardsProps {
  stats: {
    total: number
    todo: number
    inProgress: number
    done: number
  }
}

function StatsCards({ stats }: StatsCardsProps) {
  const completionRate = stats.total > 0 
    ? Math.round((stats.done / stats.total) * 100) 
    : 0

  return (
    <div className="stats-cards">
      <div className="stat-card stat-card-primary">
        <div className="stat-icon">📊</div>
        <div className="stat-content">
          <h3>{stats.total}</h3>
          <p>Total des tâches</p>
        </div>
      </div>

      <div className="stat-card stat-card-warning">
        <div className="stat-icon">📝</div>
        <div className="stat-content">
          <h3>{stats.todo}</h3>
          <p>À faire</p>
        </div>
      </div>

      <div className="stat-card stat-card-info">
        <div className="stat-icon">⚡</div>
        <div className="stat-content">
          <h3>{stats.inProgress}</h3>
          <p>En cours</p>
        </div>
      </div>

      <div className="stat-card stat-card-success">
        <div className="stat-icon">✅</div>
        <div className="stat-content">
          <h3>{stats.done}</h3>
          <p>Terminées</p>
        </div>
        <div className="stat-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <span className="progress-text">{completionRate}%</span>
        </div>
      </div>
    </div>
  )
}

export default StatsCards

