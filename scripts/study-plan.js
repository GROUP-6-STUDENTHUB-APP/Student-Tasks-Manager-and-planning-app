// ============================================
// STUDY PLAN JAVASCRIPT
// ============================================

let currentWeek = 0;
let currentView = 'week';
let currentEditingSessionId = null;

// Initialize study plan page
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    loadStudySessions();
    renderCalendar();
});

// Setup event listeners
function setupEventListeners() {
    // Add session button
    const addStudySessionBtn = document.getElementById('addStudySessionBtn');
    if (addStudySessionBtn) {
        addStudySessionBtn.addEventListener('click', () => openSessionModal());
    }
    
    // Week navigation
    const prevWeek = document.getElementById('prevWeek');
    const nextWeek = document.getElementById('nextWeek');
    
    if (prevWeek) {
        prevWeek.addEventListener('click', () => {
            currentWeek--;
            updateWeekDisplay();
            renderCalendar();
        });
    }
    
    if (nextWeek) {
        nextWeek.addEventListener('click', () => {
            currentWeek++;
            updateWeekDisplay();
            renderCalendar();
        });
    }
    
    // View toggle
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentView = btn.dataset.view;
            renderCalendar();
        });
    });
    
    // Modal close
    const closeModal = document.getElementById('closeModal');
    const cancelSession = document.getElementById('cancelSession');
    const sessionModal = document.getElementById('sessionModal');
    
    if (closeModal) {
        closeModal.addEventListener('click', () => closeSessionModal());
    }
    
    if (cancelSession) {
        cancelSession.addEventListener('click', () => closeSessionModal());
    }
    
    if (sessionModal) {
        sessionModal.addEventListener('click', (e) => {
            if (e.target === sessionModal) closeSessionModal();
        });
    }
    
    // Session form submit
    const sessionForm = document.getElementById('sessionForm');
    if (sessionForm) {
        sessionForm.addEventListener('submit', handleSessionSubmit);
    }
}

// Update week display
function updateWeekDisplay() {
    const currentWeekElement = document.getElementById('currentWeek');
    if (currentWeekElement) {
        const today = new Date();
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay() + (currentWeek * 7));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        
        if (currentWeek === 0) {
            currentWeekElement.textContent = 'This Week';
        } else if (currentWeek === 1) {
            currentWeekElement.textContent = 'Next Week';
        } else if (currentWeek === -1) {
            currentWeekElement.textContent = 'Last Week';
        } else {
            currentWeekElement.textContent = `Week ${currentWeek > 0 ? '+' : ''}${currentWeek}`;
        }
    }
}

// Render calendar
function renderCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    if (!calendarGrid) return;
    
    if (currentView === 'week') {
        renderWeekView(calendarGrid);
    } else {
        renderMonthView(calendarGrid);
    }
}

// Render week view
function renderWeekView(container) {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() + (currentWeek * 7));
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const sessions = getSessionsForWeek(weekStart);
    
    let html = '<div class="calendar-header">';
    days.forEach(day => {
        html += `<div class="calendar-day-header">${day}</div>`;
    });
    html += '</div>';
    
    html += '<div class="calendar-week">';
    for (let i = 0; i < 7; i++) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + i);
        const daySessions = sessions.filter(s => {
            const sessionDate = new Date(s.date);
            return sessionDate.toDateString() === date.toDateString();
        });
        
        const isToday = date.toDateString() === today.toDateString();
        
        html += `
            <div class="calendar-day ${isToday ? 'today' : ''}">
                <div class="calendar-day-number">${date.getDate()}</div>
                <div class="calendar-sessions">
                    ${daySessions.map(session => `
                        <div class="calendar-session" onclick="viewSession('${session.id}')" title="${session.title}">
                            ${session.title.substring(0, 15)}${session.title.length > 15 ? '...' : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    html += '</div>';
    
    container.innerHTML = html;
}

// Render month view (simplified)
function renderMonthView(container) {
    container.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
            <i class="fas fa-calendar-alt" style="font-size: 3rem; margin-bottom: 1rem;"></i>
            <p>Month view coming soon! Please use week view for now.</p>
        </div>
    `;
}

// Get sessions for week
function getSessionsForWeek(weekStart) {
    const sessions = JSON.parse(localStorage.getItem('studySessions') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);
    
    return sessions.filter(session => {
        if (session.userId !== currentUser.id) return false;
        const sessionDate = new Date(session.date);
        return sessionDate >= weekStart && sessionDate < weekEnd;
    });
}

// Load study sessions
function loadStudySessions() {
    const sessions = JSON.parse(localStorage.getItem('studySessions') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    const userSessions = sessions
        .filter(session => session.userId === currentUser.id)
        .sort((a, b) => {
            const dateA = new Date(a.date + ' ' + a.startTime);
            const dateB = new Date(b.date + ' ' + b.startTime);
            return dateA - dateB;
        });
    
    renderStudySessions(userSessions);
}

// Render study sessions
function renderStudySessions(sessions) {
    const sessionsList = document.getElementById('studySessionsList');
    const sessionCount = document.getElementById('sessionCount');
    
    if (sessionCount) {
        sessionCount.textContent = `${sessions.length} ${sessions.length === 1 ? 'session' : 'sessions'}`;
    }
    
    if (!sessionsList) return;
    
    if (sessions.length === 0) {
        sessionsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-calendar-plus"></i>
                <p>No study sessions scheduled. Create your first study plan!</p>
            </div>
        `;
        return;
    }
    
    sessionsList.innerHTML = sessions.map(session => createSessionCard(session)).join('');
}

// Create session card HTML
function createSessionCard(session) {
    const startTime = formatTime(session.startTime);
    const endTime = formatTime(session.endTime);
    const date = formatDate(session.date);
    const typeClass = `type-${session.type || 'study'}`;
    
    return `
        <div class="session-item" data-session-id="${session.id}">
            <div class="session-header">
                <div class="session-info">
                    <h4>${escapeHtml(session.title)}</h4>
                    <p>${escapeHtml(session.subject)} • <span class="session-type-badge ${typeClass}">${(session.type || 'study').replace('-', ' ')}</span></p>
                </div>
                <div class="session-time">
                    <div class="session-time-display">${startTime} - ${endTime}</div>
                    <div class="session-date">${date}</div>
                </div>
            </div>
            ${session.description ? `<div style="margin-top: 1rem; color: var(--text-secondary);">${escapeHtml(session.description)}</div>` : ''}
            <div class="session-details">
                <div class="session-detail-item">
                    <span class="session-detail-label">Duration</span>
                    <span class="session-detail-value">${calculateDuration(session.startTime, session.endTime)}</span>
                </div>
                <div class="session-detail-item">
                    <span class="session-detail-label">Subject</span>
                    <span class="session-detail-value">${escapeHtml(session.subject)}</span>
                </div>
            </div>
            <div class="session-actions">
                <button class="session-action-btn edit" onclick="editSession('${session.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="session-action-btn delete" onclick="deleteSession('${session.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `;
}

// Open session modal
function openSessionModal(sessionId = null) {
    const modal = document.getElementById('sessionModal');
    const modalTitle = document.getElementById('modalTitle');
    const sessionForm = document.getElementById('sessionForm');
    
    if (!modal) return;
    
    currentEditingSessionId = sessionId;
    
    if (sessionId) {
        // Edit mode
        modalTitle.textContent = 'Edit Study Session';
        const sessions = JSON.parse(localStorage.getItem('studySessions') || '[]');
        const session = sessions.find(s => s.id === sessionId);
        
        if (session) {
            document.getElementById('sessionTitle').value = session.title || '';
            document.getElementById('sessionSubject').value = session.subject || '';
            document.getElementById('sessionDate').value = session.date || '';
            document.getElementById('sessionStartTime').value = session.startTime || '';
            document.getElementById('sessionEndTime').value = session.endTime || '';
            document.getElementById('sessionType').value = session.type || 'study';
            document.getElementById('sessionDescription').value = session.description || '';
            document.getElementById('sessionReminder').checked = session.reminder || false;
        }
    } else {
        // Add mode
        modalTitle.textContent = 'Add Study Session';
        sessionForm.reset();
        // Set default date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('sessionDate').value = today;
    }
    
    modal.classList.add('active');
}

// Close session modal
function closeSessionModal() {
    const modal = document.getElementById('sessionModal');
    if (modal) {
        modal.classList.remove('active');
        currentEditingSessionId = null;
        document.getElementById('sessionForm').reset();
    }
}

// Handle session form submit
function handleSessionSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    const startTime = formData.get('startTime');
    const endTime = formData.get('endTime');
    
    // Validate time
    if (startTime >= endTime) {
        alert('End time must be after start time!');
        return;
    }
    
    const sessionData = {
        id: currentEditingSessionId || Date.now().toString(),
        userId: currentUser.id,
        title: formData.get('title'),
        subject: formData.get('subject'),
        date: formData.get('date'),
        startTime: startTime,
        endTime: endTime,
        type: formData.get('type') || 'study',
        description: formData.get('description'),
        reminder: formData.get('reminder') === 'on',
        createdAt: currentEditingSessionId ?
            (JSON.parse(localStorage.getItem('studySessions') || '[]').find(s => s.id === currentEditingSessionId)?.createdAt || new Date().toISOString()) :
            new Date().toISOString()
    };
    
    // Save session
    let sessions = JSON.parse(localStorage.getItem('studySessions') || '[]');
    
    if (currentEditingSessionId) {
        // Update existing
        const index = sessions.findIndex(s => s.id === currentEditingSessionId);
        if (index !== -1) {
            sessions[index] = sessionData;
        }
    } else {
        // Add new
        sessions.push(sessionData);
    }
    
    localStorage.setItem('studySessions', JSON.stringify(sessions));
    
    closeSessionModal();
    loadStudySessions();
    renderCalendar();
    
    showNotification(currentEditingSessionId ? 'Session updated!' : 'Session created!');
}

// Edit session
function editSession(sessionId) {
    openSessionModal(sessionId);
}

// Delete session
function deleteSession(sessionId) {
    if (!confirm('Are you sure you want to delete this study session?')) return;
    
    let sessions = JSON.parse(localStorage.getItem('studySessions') || '[]');
    sessions = sessions.filter(s => s.id !== sessionId);
    localStorage.setItem('studySessions', JSON.stringify(sessions));
    
    loadStudySessions();
    renderCalendar();
    showNotification('Session deleted!');
}

// View session (for calendar clicks)
function viewSession(sessionId) {
    openSessionModal(sessionId);
}

// Utility functions
function formatDate(dateString) {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sessionDate = new Date(date);
    sessionDate.setHours(0, 0, 0, 0);
    
    if (sessionDate.getTime() === today.getTime()) {
        return 'Today';
    }
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (sessionDate.getTime() === tomorrow.getTime()) {
        return 'Tomorrow';
    }
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTime(timeString) {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

function calculateDuration(startTime, endTime) {
    if (!startTime || !endTime) return 'N/A';
    const start = new Date(`2000-01-01 ${startTime}`);
    const end = new Date(`2000-01-01 ${endTime}`);
    const diff = (end - start) / (1000 * 60); // minutes
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message) {
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

// Initialize week display
updateWeekDisplay();

