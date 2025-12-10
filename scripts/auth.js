// ============================================
// AUTHENTICATION JAVASCRIPT
// ============================================

// Check if user is logged in
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser && !window.location.pathname.includes('index.html') && 
        !window.location.pathname.includes('login.html') && 
        !window.location.pathname.includes('register.html')) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Load user info if logged in
function loadUserInfo() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        const userNameElements = document.querySelectorAll('#userName');
        const userEmailElements = document.querySelectorAll('#userEmail');
        
        userNameElements.forEach(el => {
            if (el) el.textContent = user.fullName || 'Student';
        });
        userEmailElements.forEach(el => {
            if (el) el.textContent = user.email || 'student@example.com';
        });
    }
}

// Registration Form Handler
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(registerForm);
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        
        // Validate passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Get existing users
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if email already exists
        const emailExists = users.some(user => user.email === formData.get('email'));
        if (emailExists) {
            alert('Email already registered! Please login instead.');
            return;
        }
        
        // Create new user
        const newUser = {
            id: Date.now().toString(),
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            studentId: formData.get('studentId'),
            major: formData.get('major'),
            password: password, // In production, this should be hashed
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Auto login
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        alert('Registration successful! Redirecting to dashboard...');
        window.location.href = 'dashboard.html';
    });
}

// Login Form Handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(loginForm);
        const email = formData.get('email');
        const password = formData.get('password');
        
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Find user
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Set current user
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert('Login successful! Redirecting...');
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid email or password!');
        }
    });
}

// Logout Function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication for protected pages
    if (window.location.pathname.includes('dashboard.html') || 
        window.location.pathname.includes('tasks.html') || 
        window.location.pathname.includes('gpa.html') || 
        window.location.pathname.includes('study-plan.html')) {
        if (!checkAuth()) return;
        loadUserInfo();
    } else {
        loadUserInfo();
    }
});

// Sidebar toggle for mobile
document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
});

