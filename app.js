/* =========================
   FIREBASE IMPORTS
========================= */
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

/* =========================
   FIREBASE CONFIG
========================= */
const firebaseConfig = {
  apiKey: "AIzaSyDSYimKbYoPh45nZ7JzfO2uHVvC0Ky3G0Q",
  authDomain: "excelmasteryproject.firebaseapp.com",
  projectId: "excelmasteryproject",
  storageBucket: "excelmasteryproject.firebasestorage.app",
  messagingSenderId: "900065389050",
  appId: "1:900065389050:web:a88bd2989afed2d0371c43"
};

/* =========================
   INIT FIREBASE
========================= */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* =========================
   EMAILJS
========================= */
function sendWelcomeEmail(name, email) {
  if (typeof emailjs === "undefined") {
    console.error("EmailJS not loaded");
    return Promise.resolve();
  }

  return emailjs.send(
    "service_5qm09oy",
    "template_l1ra1qv",
    {
      user_name: name,
      user_email: email
    }
  );
}

/* =========================
   SEND ONCE HELPER
========================= */
function shouldSendWelcomeEmail(userId) {
  const key = `welcome_email_sent_${userId}`;

  if (localStorage.getItem(key)) {
    return false;
  }

  localStorage.setItem(key, "true");
  return true;
}

/* =========================
   SIGNUP (EMAIL & PASSWORD)
========================= */
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("signup-name")?.value.trim();
    const email = document.getElementById("signup-email")?.value.trim();
    const password = document.getElementById("signup-password")?.value;
    const confirmPassword = document.getElementById("signup-password-confirm")?.value;

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        const userId = cred.user.uid;

        if (shouldSendWelcomeEmail(userId)) {
          return sendWelcomeEmail(name, email);
        }
      })
      .then(() => {
        alert(`Account created! Welcome, ${name}.`);
        window.location.href = "dashboard.html";
      })
      .catch(error => {
        alert("Signup error: " + error.message);
      });
  });
}

/* =========================
   LOGIN (EMAIL & PASSWORD)
========================= */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Login successful!");
        window.location.href = "dashboard.html";
      })
      .catch(error => {
        alert("Login error: " + error.message);
      });
  });
}

/* =========================
   GOOGLE SIGNUP / SIGNIN
========================= */
const googleBtn = document.getElementById("google-signup-btn");

if (googleBtn) {
  const provider = new GoogleAuthProvider();

  googleBtn.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        const name = user.displayName || "Excel Mastery User";
        const email = user.email;

        if (shouldSendWelcomeEmail(user.uid)) {
          sendWelcomeEmail(name, email);
        }

        alert(`Welcome ${name}!`);
        window.location.href = "dashboard.html";
      })
      .catch(error => {
        alert("Google login error: " + error.message);
      });
  });
}

/* =========================
   AUTH STATE
========================= */
onAuthStateChanged(auth, (user) => {
  const userEmailSpan = document.getElementById("user-email");

  if (user) {
    if (userEmailSpan) {
      userEmailSpan.textContent = user.email;
    }
  } else {
    if (window.location.pathname.includes("dashboard.html")) {
      window.location.href = "login.html";
    }
  }
});

/* =========================
   LOGOUT
========================= */
const logoutBtn = document.getElementById("logout-btn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      alert("Logged out successfully.");
      window.location.href = "login.html";
    });
  });
}
