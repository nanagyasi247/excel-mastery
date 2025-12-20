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
   EMAILJS (FRONTEND ONLY)
========================= */
function sendWelcomeEmail(name, email) {
  if (typeof emailjs === "undefined") {
    console.error("❌ EmailJS not loaded");
    return;
  }

  emailjs.send(
    "service_5qm09oy",
    "template_l1ra1qv", // ✅ CORRECT TEMPLATE ID
    {
      user_name: name,
      user_email: email
    }
  )
  .then((response) => {
    console.log("✅ Welcome email sent:", response.status);
  })
  .catch((error) => {
    console.error("❌ EmailJS error:", error);
  });
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
      .then(() => {
        // ✅ SEND WELCOME EMAIL AFTER ACCOUNT CREATION
        sendWelcomeEmail(name, email);

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

        // ✅ SEND WELCOME EMAIL FOR GOOGLE USERS
        sendWelcomeEmail(name, email);

        alert(`Welcome ${name}!`);
        window.location.href = "dashboard.html";
      })
      .catch(error => {
        alert("Google login error: " + error.message);
      });
  });
}

/* =========================
   AUTH STATE (DASHBOARD)
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
