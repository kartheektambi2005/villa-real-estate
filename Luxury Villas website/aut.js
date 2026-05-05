/* ============================================================
   auth.js — User Authentication (localStorage)
   ============================================================ */

const Auth = (() => {
  const USERS_KEY = 'villa_users';
  const SESSION_KEY = 'villa_session';

  /* ---------- helpers ---------- */
  function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  }
  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
  function getSession() {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  }
  function saveSession(user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  }
  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
  }

  /* ---------- register ---------- */
  function register(fullName, email, password) {
    const users = getUsers();
    // Check unique email
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'This email is already registered. Please log in.' };
    }
    if (password.length < 6) {
      return { ok: false, error: 'Password must be at least 6 characters.' };
    }
    const newUser = { id: Date.now(), fullName, email, password };
    users.push(newUser);
    saveUsers(users);
    return { ok: true };
  }

  /* ---------- login ---------- */
  function login(email, password) {
    const users = getUsers();
    const user = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) {
      return { ok: false, error: 'Invalid email or password.' };
    }
    saveSession({ id: user.id, fullName: user.fullName, email: user.email });
    return { ok: true, user };
  }

  /* ---------- logout ---------- */
  function logout() {
    clearSession();
    window.location.href = 'login.html';
  }

  /* ---------- requireAuth ---------- */
  function requireAuth(redirectUrl = 'login.html') {
    if (!getSession()) {
      window.location.href = redirectUrl;
      return false;
    }
    return true;
  }

  /* ---------- updateNavbar ---------- */
  function updateNavbar() {
    const session = getSession();
    const authArea = document.getElementById('navAuthArea');
    if (!authArea) return;

    if (session) {
      authArea.innerHTML = `
        <span class="user-greeting me-2">Hi, ${session.fullName.split(' ')[0]}</span>
        <button class="btn-nav-logout" onclick="Auth.logout()">Logout</button>
      `;
    } else {
      authArea.innerHTML = `
        <a href="login.html" class="btn-nav-login me-1">Login</a>
        <a href="register.html" class="btn-schedule">
          <span class="icon-dot"></span>Register
        </a>
      `;
    }
  }

  /* ---------- isLoggedIn ---------- */
  function isLoggedIn() {
    return !!getSession();
  }

  return { register, login, logout, requireAuth, updateNavbar, isLoggedIn, getSession };
})();

/* Run on every page */
document.addEventListener('DOMContentLoaded', () => {
  Auth.updateNavbar();
});