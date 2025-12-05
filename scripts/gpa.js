// ============================================
// GPA CALCULATOR JAVASCRIPT
// ============================================

let currentEditingCourseId = null;

// Initialize GPA page
document.addEventListener('DOMContentLoaded', function() {
    loadCourses();
    setupEventListeners();
    updateGPADisplay();
});

// Setup event listeners
function setupEventListeners() {
    // Course form submit
    const courseForm = document.getElementById('courseForm');
    if (courseForm) {
        courseForm.addEventListener('submit', handleCourseSubmit);
    }
    
    // Clear all courses
    const clearAllCourses = document.getElementById('clearAllCourses');
    if (clearAllCourses) {
        clearAllCourses.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete all courses? This cannot be undone.')) {
                clearAllCoursesData();
            }
        });
    }
}

// Load courses
function loadCourses() {
    const courses = JSON.parse(localStorage.getItem('courses') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    const userCourses = courses.filter(course => course.userId === currentUser.id);
    renderCourses(userCourses);
    updateGPADisplay();
}

// Render courses
function renderCourses(courses) {
    const coursesList = document.getElementById('coursesList');
    const courseCount = document.getElementById('courseCount');
    
    if (courseCount) {
        courseCount.textContent = `${courses.length} ${courses.length === 1 ? 'course' : 'courses'}`;
    }
    
    if (!coursesList) return;
    
    if (courses.length === 0) {
        coursesList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-graduation-cap"></i>
                <p>No courses added yet. Add your first course above!</p>
            </div>
        `;
        return;
    }
    
    coursesList.innerHTML = courses.map(course => createCourseCard(course)).join('');
    
    // Attach event listeners
    courses.forEach(course => {
        attachCourseEventListeners(course.id);
    });
}

// Create course card HTML
function createCourseCard(course) {
    const gradeLetter = getGradeLetter(course.grade);
    
    return `
        <div class="course-item" data-course-id="${course.id}">
            <div class="course-header">
                <div class="course-info">
                    <h4>${escapeHtml(course.courseName)}</h4>
                    ${course.courseCode ? `<p>${escapeHtml(course.courseCode)}</p>` : ''}
                </div>
                <div class="course-grade-display">
                    <div class="course-grade-value">${parseFloat(course.grade).toFixed(1)}</div>
                    <div class="course-grade-letter">${gradeLetter}</div>
                </div>
            </div>
            <div class="course-details">
                <div class="course-detail-item">
                    <span class="course-detail-label">Credits</span>
                    <span class="course-detail-value">${course.credits}</span>
                </div>
                <div class="course-detail-item">
                    <span class="course-detail-label">Grade Points</span>
                    <span class="course-detail-value">${(parseFloat(course.grade) * parseFloat(course.credits)).toFixed(1)}</span>
                </div>
                ${course.semester ? `
                <div class="course-detail-item">
                    <span class="course-detail-label">Semester</span>
                    <span class="course-detail-value">${escapeHtml(course.semester)}</span>
                </div>
                ` : ''}
            </div>
            <div class="course-actions">
                <button class="course-action-btn edit" onclick="editCourse('${course.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="course-action-btn delete" onclick="deleteCourse('${course.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `;
}

// Attach event listeners
function attachCourseEventListeners(courseId) {
    // Event listeners attached via onclick
}

// Handle course form submit
function handleCourseSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    const courseData = {
        id: currentEditingCourseId || Date.now().toString(),
        userId: currentUser.id,
        courseName: formData.get('courseName'),
        courseCode: formData.get('courseCode'),
        grade: parseFloat(formData.get('grade')),
        credits: parseFloat(formData.get('credits')),
        semester: formData.get('semester'),
        createdAt: currentEditingCourseId ?
            (JSON.parse(localStorage.getItem('courses') || '[]').find(c => c.id === currentEditingCourseId)?.createdAt || new Date().toISOString()) :
            new Date().toISOString()
    };
    
    // Validate
    if (!courseData.courseName || !courseData.grade || !courseData.credits) {
        alert('Please fill in all required fields!');
        return;
    }
    
    // Save course
    let courses = JSON.parse(localStorage.getItem('courses') || '[]');
    
    if (currentEditingCourseId) {
        // Update existing
        const index = courses.findIndex(c => c.id === currentEditingCourseId);
        if (index !== -1) {
            courses[index] = courseData;
        }
    } else {
        // Add new
        courses.push(courseData);
    }
    
    localStorage.setItem('courses', JSON.stringify(courses));
    
    // Reset form
    e.target.reset();
    currentEditingCourseId = null;
    
    loadCourses();
    showNotification(currentEditingCourseId ? 'Course updated!' : 'Course added!');
}

// Edit course
function editCourse(courseId) {
    const courses = JSON.parse(localStorage.getItem('courses') || '[]');
    const course = courses.find(c => c.id === courseId);
    
    if (!course) return;
    
    currentEditingCourseId = courseId;
    
    // Populate form
    document.getElementById('courseName').value = course.courseName || '';
    document.getElementById('courseCode').value = course.courseCode || '';
    document.getElementById('courseGrade').value = course.grade || '';
    document.getElementById('courseCredits').value = course.credits || '';
    document.getElementById('courseSemester').value = course.semester || '';
    
    // Scroll to form
    document.getElementById('courseForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Delete course
function deleteCourse(courseId) {
    if (!confirm('Are you sure you want to delete this course?')) return;
    
    let courses = JSON.parse(localStorage.getItem('courses') || '[]');
    courses = courses.filter(c => c.id !== courseId);
    localStorage.setItem('courses', JSON.stringify(courses));
    
    loadCourses();
    showNotification('Course deleted!');
}

// Clear all courses
function clearAllCoursesData() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    let courses = JSON.parse(localStorage.getItem('courses') || '[]');
    courses = courses.filter(c => c.userId !== currentUser.id);
    localStorage.setItem('courses', JSON.stringify(courses));
    
    loadCourses();
    showNotification('All courses cleared!');
}

// Update GPA display
function updateGPADisplay() {
    const courses = JSON.parse(localStorage.getItem('courses') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    const userCourses = courses.filter(course => course.userId === currentUser.id);
    const gpa = calculateGPA(userCourses);
    const grade = getGPAGrade(gpa);
    
    // Update display
    const gpaValue = document.getElementById('gpaValue');
    const gpaGrade = document.getElementById('gpaGrade');
    const totalCredits = document.getElementById('totalCredits');
    const totalPoints = document.getElementById('totalPoints');
    
    if (gpaValue) gpaValue.textContent = gpa.toFixed(2);
    if (gpaGrade) gpaGrade.textContent = grade;
    
    let credits = 0;
    let points = 0;
    userCourses.forEach(course => {
        const courseCredits = parseFloat(course.credits) || 0;
        const courseGrade = parseFloat(course.grade) || 0;
        credits += courseCredits;
        points += courseGrade * courseCredits;
    });
    
    if (totalCredits) totalCredits.textContent = credits.toFixed(1);
    if (totalPoints) totalPoints.textContent = points.toFixed(2);
}

// Calculate GPA
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

// Get grade letter from grade points
function getGradeLetter(gradePoints) {
    const grade = parseFloat(gradePoints);
    if (grade >= 4.0) return 'A+';
    if (grade >= 3.7) return 'A';
    if (grade >= 3.3) return 'A-';
    if (grade >= 3.0) return 'B+';
    if (grade >= 2.7) return 'B';
    if (grade >= 2.3) return 'B-';
    if (grade >= 2.0) return 'C+';
    if (grade >= 1.7) return 'C';
    if (grade >= 1.3) return 'C-';
    if (grade >= 1.0) return 'D+';
    if (grade >= 0.7) return 'D';
    return 'F';
}

// Get GPA grade
function getGPAGrade(gpa) {
    if (gpa >= 3.7) return 'Excellent';
    if (gpa >= 3.0) return 'Good';
    if (gpa >= 2.0) return 'Satisfactory';
    if (gpa >= 1.0) return 'Needs Improvement';
    return 'Failing';
}

// Utility functions
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

