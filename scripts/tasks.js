// ============================================
// TASKS MANAGEMENT JAVASCRIPT
// ============================================

let currentEditingTaskId = null;

// Initialize tasks page
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Add task button
    const addTaskBtn = document.getElementById('addTaskBtn');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', () => openTaskModal());
    }
    
    // Modal close
    const closeModal = document.getElementById('closeModal');
    const cancelTask = document.getElementById('cancelTask');
    const taskModal = document.getElementById('taskModal');
    
    if (closeModal) {
        closeModal.addEventListener('click', () => closeTaskModal());
    }
    
    if (cancelTask) {
        cancelTask.addEventListener('click', () => closeTaskModal());
    }
    
    if (taskModal) {
        taskModal.addEventListener('click', (e) => {
            if (e.target === taskModal) closeTaskModal();
        });
    }
    
    // Task form submit
    const taskForm = document.getElementById('taskForm');
    if (taskForm) {
        taskForm.addEventListener('submit', handleTaskSubmit);
    }
    
    // Filters
    const filterCategory = document.getElementById('filterCategory');
    const filterStatus = document.getElementById('filterStatus');
    const filterPriority = document.getElementById('filterPriority');
    const clearFilters = document.getElementById('clearFilters');
    
    if (filterCategory) {
        filterCategory.addEventListener('change', loadTasks);
    }
    if (filterStatus) {
        filterStatus.addEventListener('change', loadTasks);
    }
    if (filterPriority) {
        filterPriority.addEventListener('change', loadTasks);
    }
    if (clearFilters) {
        clearFilters.addEventListener('click', () => {
            filterCategory.value = 'all';
            filterStatus.value = 'all';
            filterPriority.value = 'all';
            loadTasks();
        });
    }
}

// Load tasks
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // Filter by user
    let userTasks = tasks.filter(task => task.userId === currentUser.id);
    
    // Apply filters
    const categoryFilter = document.getElementById('filterCategory')?.value || 'all';
    const statusFilter = document.getElementById('filterStatus')?.value || 'all';
    const priorityFilter = document.getElementById('filterPriority')?.value || 'all';
    
    if (categoryFilter !== 'all') {
        userTasks = userTasks.filter(task => task.category === categoryFilter);
    }
    if (statusFilter !== 'all') {
        userTasks = userTasks.filter(task => task.status === statusFilter);
    }
    if (priorityFilter !== 'all') {
        userTasks = userTasks.filter(task => task.priority === priorityFilter);
    }
    
    // Sort by due date
    userTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    
    renderTasks(userTasks);
}

// Render tasks
function renderTasks(tasks) {
    const tasksList = document.getElementById('tasksList');
    if (!tasksList) return;
    
    if (tasks.length === 0) {
        tasksList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-tasks"></i>
                <p>No tasks found. Create your first task!</p>
            </div>
        `;
        return;
    }
    
    tasksList.innerHTML = tasks.map(task => createTaskCard(task)).join('');
    
    // Attach event listeners to task cards
    tasks.forEach(task => {
        attachTaskEventListeners(task.id);
    });
}

// Create task card HTML
function createTaskCard(task) {
    const dueDate = new Date(task.dueDate);
    const isOverdue = dueDate < new Date() && task.status !== 'completed';
    const priorityClass = task.priority || 'medium';
    
    return `
        <div class="task-card ${task.status === 'completed' ? 'completed' : ''} ${priorityClass}-priority" data-task-id="${task.id}">
            <div class="task-header">
                <div class="task-title-section">
                    <h3 class="task-title ${task.status === 'completed' ? 'completed' : ''}">${escapeHtml(task.title)}</h3>
                    <div class="task-meta">
                        ${task.course ? `<span class="task-meta-item"><i class="fas fa-book"></i> ${escapeHtml(task.course)}</span>` : ''}
                        <span class="task-meta-item"><i class="fas fa-calendar"></i> ${formatDate(task.dueDate)}</span>
                        <span class="task-meta-item"><i class="fas fa-tag"></i> ${escapeHtml(task.category)}</span>
                        ${isOverdue ? '<span class="task-meta-item" style="color: var(--accent-red);"><i class="fas fa-exclamation-triangle"></i> Overdue</span>' : ''}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="task-action-btn" onclick="toggleTaskComplete('${task.id}')" title="${task.status === 'completed' ? 'Mark as incomplete' : 'Mark as complete'}">
                        <i class="fas fa-${task.status === 'completed' ? 'undo' : 'check'}"></i>
                    </button>
                    <button class="task-action-btn" onclick="editTask('${task.id}')" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="task-action-btn delete" onclick="deleteTask('${task.id}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
            <div class="task-footer">
                <span class="task-status-badge status-${task.status || 'pending'}">${(task.status || 'pending').replace('-', ' ')}</span>
                <span class="task-category">${escapeHtml(task.category)}</span>
            </div>
        </div>
    `;
}

// Attach event listeners to task
function attachTaskEventListeners(taskId) {
    // Event listeners are attached via onclick in HTML for simplicity
}

// Open task modal
function openTaskModal(taskId = null) {
    const modal = document.getElementById('taskModal');
    const modalTitle = document.getElementById('modalTitle');
    const taskForm = document.getElementById('taskForm');
    
    if (!modal) return;
    
    currentEditingTaskId = taskId;
    
    if (taskId) {
        // Edit mode
        modalTitle.textContent = 'Edit Task';
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const task = tasks.find(t => t.id === taskId);
        
        if (task) {
            document.getElementById('taskTitle').value = task.title || '';
            document.getElementById('taskCategory').value = task.category || '';
            document.getElementById('taskPriority').value = task.priority || '';
            document.getElementById('taskCourse').value = task.course || '';
            document.getElementById('taskDueDate').value = task.dueDate || '';
            document.getElementById('taskStatus').value = task.status || 'pending';
            document.getElementById('taskDescription').value = task.description || '';
        }
    } else {
        // Add mode
        modalTitle.textContent = 'Add New Task';
        taskForm.reset();
        // Set default date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('taskDueDate').value = today;
    }
    
    modal.classList.add('active');
}

// Close task modal
function closeTaskModal() {
    const modal = document.getElementById('taskModal');
    if (modal) {
        modal.classList.remove('active');
        currentEditingTaskId = null;
        document.getElementById('taskForm').reset();
    }
}

// Handle task form submit
function handleTaskSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    const taskData = {
        id: currentEditingTaskId || Date.now().toString(),
        userId: currentUser.id,
        title: formData.get('title'),
        category: formData.get('category'),
        priority: formData.get('priority'),
        course: formData.get('course'),
        dueDate: formData.get('dueDate'),
        status: formData.get('status') || 'pending',
        description: formData.get('description'),
        createdAt: currentEditingTaskId ? 
            (JSON.parse(localStorage.getItem('tasks') || '[]').find(t => t.id === currentEditingTaskId)?.createdAt || new Date().toISOString()) :
            new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    // Save task
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    
    if (currentEditingTaskId) {
        // Update existing
        const index = tasks.findIndex(t => t.id === currentEditingTaskId);
        if (index !== -1) {
            tasks[index] = taskData;
        }
    } else {
        // Add new
        tasks.push(taskData);
    }
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    closeTaskModal();
    loadTasks();
    
    // Show success message
    showNotification(currentEditingTaskId ? 'Task updated successfully!' : 'Task created successfully!');
}

// Toggle task complete status
function toggleTaskComplete(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const task = tasks.find(t => t.id === taskId);
    
    if (task) {
        task.status = task.status === 'completed' ? 'pending' : 'completed';
        task.updatedAt = new Date().toISOString();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
        showNotification(task.status === 'completed' ? 'Task marked as completed!' : 'Task marked as pending!');
    }
}

// Edit task
function editTask(taskId) {
    openTaskModal(taskId);
}

// Delete task
function deleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks = tasks.filter(t => t.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
    showNotification('Task deleted successfully!');
}

// Utility functions
function formatDate(dateString) {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDate = new Date(date);
    taskDate.setHours(0, 0, 0, 0);
    
    if (taskDate.getTime() === today.getTime()) {
        return 'Today';
    }
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (taskDate.getTime() === tomorrow.getTime()) {
        return 'Tomorrow';
    }
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message) {
    // Simple notification (can be enhanced with a toast library)
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-green);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

