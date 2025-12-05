// ============================================
// DASHBOARD JAVASCRIPT
// ============================================

// Load dashboard data
function loadDashboard() {
    loadStats();
    loadRecentTasks();
    loadUpcomingDeadlines();
}

// Load statistics
function loadStats() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // Filter tasks for current user
    const userTasks = tasks.filter(task => task.userId === currentUser.id);
    
    const totalTasks = userTasks.length;
    const completedTasks = userTasks.filter(t => t.status === 'completed').length;
    const pendingTasks = userTasks.filter(t => t.status !== 'completed').length;
    
    // Get GPA
    const courses = JSON.parse(localStorage.getItem('courses') || '[]');
    const userCourses = courses.filter(c => c.userId === currentUser.id);
    const gpa = calculateGPA(userCourses);
    
    // Update stats
    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('completedTasks').textContent = completedTasks;
    document.getElementById('pendingTasks').textContent = pendingTasks;
    document.getElementById('currentGPA').textContent = gpa.toFixed(2);
}

// Load recent tasks
function loadRecentTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    const userTasks = tasks
        .filter(task => task.userId === currentUser.id)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
    
    const tasksList = document.getElementById('recentTasksList');
    if (!tasksList) return;
    
    if (userTasks.length === 0) {
        tasksList.innerHTML = '<div class="empty-state"><p>No tasks yet. Create your first task!</p></div>';
        return;
    }
    
    tasksList.innerHTML = userTasks.map(task => `
        <div class="task-item">
            <div class="task-info">
                <h4>${escapeHtml(task.title)}</h4>
                <p>${task.course || 'No course'} • Due: ${formatDate(task.dueDate)}</p>
            </div>
            <span class="task-badge badge-${task.priority}">${task.priority}</span>
        </div>
    `).join('');
}

// Load upcoming deadlines
function loadUpcomingDeadlines() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const upcomingTasks = tasks
        .filter(task => {
            if (task.userId !== currentUser.id || task.status === 'completed') return false;
            const dueDate = new Date(task.dueDate);
            return dueDate >= now && dueDate <= nextWeek;
        })
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 5);
    
    const deadlinesList = document.getElementById('upcomingDeadlinesList');
    if (!deadlinesList) return;
    
    if (upcomingTasks.length === 0) {
        deadlinesList.innerHTML = '<div class="empty-state"><p>No upcoming deadlines!</p></div>';
        return;
    }
    
    deadlinesList.innerHTML = upcomingTasks.map(task => `
        <div class="deadline-item">
            <div class="task-info">
                <h4>${escapeHtml(task.title)}</h4>
                <p>${task.course || 'No course'}</p>
            </div>
            <div>
                <span class="task-badge badge-${task.priority}">${task.priority}</span>
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--text-secondary);">
                    ${formatDate(task.dueDate)}
                </p>
            </div>
        </div>
    `).join('');
}

// Calculate GPA helper
function calculateGPA(courses) {
    if (!courses || courses.length === 0) return 0;
    
    let totalPoints = 0;
    let totalCredits = 0;
    
    courses.forEach(course => {
        const gradePoints = parseFloat(course.grade) || 0;
        const credits = parseFloat(course.credits) || 0;
        totalPoints += gradePoints * credits;
        totalCredits += credits;
    });
    
    return totalCredits > 0 ? totalPoints / totalCredits : 0;
}

// Utility functions
function formatDate(dateString) {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize dashboard on load
document.addEventListener('DOMContentLoaded', function() {
    loadDashboard();
});

