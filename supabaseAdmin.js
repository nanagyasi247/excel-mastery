<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Excel Mastery Academy</title>
<link rel="stylesheet" href="style.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
<header>
  <div class="container">
    <h1>Excel Mastery Academy</h1>
    <nav>
      <a href="#courses">Courses</a>
      <a href="#pricing">Buy Course</a>
      <a href="#login">Login</a>
      <a href="verify.html">Verify Certificate</a>
    </nav>
  </div>
</header>

<main>
  <section class="hero">
    <img src="hero.jpg" alt="Students studying together">
    <h2>Become an Excel Pro</h2>
    <p>Practical lessons, quizzes, and certificate included.</p>
    <button id="enrollNow" class="btn">Enroll Now</button>
  </section>

  <section id="courses" class="container">
    <h3>Course Curriculum</h3>
    <div class="course-cards">
      <div class="card">
        <i class="fas fa-user-graduate fa-2x"></i>
        <h4>Beginner</h4>
        <p>Interface, formulas, formatting</p>
      </div>
      <div class="card">
        <i class="fas fa-chart-line fa-2x"></i>
        <h4>Intermediate</h4>
        <p>VLOOKUP/XLOOKUP, PivotTables, Charts</p>
      </div>
      <div class="card">
        <i class="fas fa-cogs fa-2x"></i>
        <h4>Advanced</h4>
        <p>Power Query, Dashboards, Macros (Intro)</p>
      </div>
    </div>
  </section>

  <section id="pricing" class="container">
    <h3>Pricing</h3>
    <p>Full course — <strong>$25 one-time</strong></p>
    <button id="checkoutBtn" class="btn">Buy with Card</button>
  </section>

  <section id="login" class="container">
    <h3>Student Login</h3>
    <input id="email" placeholder="Email"><br>
    <input id="password" type="password" placeholder="Password"><br>
    <button id="signup">Sign Up</button>
    <button id="loginBtn">Log In</button>
    <button id="logoutBtn" style="display:none">Log Out</button>
  </section>

  <section id="certificate" class="container">
    <h3>Your Certificate</h3>
    <p id="certMsg">After you complete the course, a certificate will be generated.</p>
    <button id="downloadCert" style="display:none">Download Certificate PDF</button>
  </section>
</main>

<footer>
  <p>© 2025 Excel Mastery Academy</p>
</footer>
<script type="module" src="./app.js"></script>
</body>
</html>
