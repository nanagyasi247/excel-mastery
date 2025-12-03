// Import Firebase functions
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup, 
  sendPasswordResetEmail 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

// Your Firebase config (replace with your own project config)
const firebaseConfig = {
  apiKey: "AIzaSyDSYimKbYoPh45nZ7JzfO2uHVvC0Ky3G0Q",
  authDomain: "excelmasteryproject.firebaseapp.com",
  projectId: "excelmasteryproject",
  storageBucket: "excelmasteryproject.firebasestorage.app",
  messagingSenderId: "900065389050",
  appId: "1:900065389050:web:a88bd2989afed2d0371c43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ---------------- SIGNUP ----------------
const signupBtn = document.getElementById("signup-btn");
if (signupBtn) {
  signupBtn.addEventListener("click", () => {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        alert("Account created! Welcome to your dashboard.");
        window.location.href = "dashboard.html";
      })
      .catch(error => {
        alert("Signup error: " + error.message);
      });
  });
}

// ---------------- LOGIN ----------------
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        alert("Login successful!");
        window.location.href = "dashboard.html";
      })
      .catch(error => {
        alert("Login error: " + error.message);
      });
  });
}

// ---------------- GOOGLE LOGIN ----------------
const googleBtn = document.getElementById("google-login-btn");
if (googleBtn) {
  const provider = new GoogleAuthProvider();
  googleBtn.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        alert(`Welcome ${user.displayName}`);
        window.location.href = "dashboard.html";
      })
      .catch(error => {
        alert("Google login error: " + error.message);
      });
  });
}

// ---------------- FORGOT PASSWORD ----------------
const forgotPasswordLink = document.getElementById("forgot-password");
if (forgotPasswordLink) {
  forgotPasswordLink.addEventListener("click", () => {
    const email = document.getElementById("loginEmail").value;
    if (!email) {
      alert("Please enter your email first.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent! Check your inbox.");
      })
      .catch(error => {
        alert("Password reset error: " + error.message);
      });
  });
}

// ---------------- DASHBOARD ----------------
onAuthStateChanged(auth, (user) => {
  const userEmailSpan = document.getElementById("user-email");
  if (user) {
    if (userEmailSpan) userEmailSpan.textContent = user.email;
  } else {
    // Redirect to login if not authenticated
    if (window.location.pathname.includes("dashboard.html")) {
      window.location.href = "login.html";
    }
  }
});

// ---------------- LOGOUT ----------------
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      alert("Logged out successfully.");
      window.location.href = "login.html";
    });
  });
}
