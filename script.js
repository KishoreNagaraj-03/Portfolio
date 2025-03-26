// Navigation Toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking a nav link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Active navigation based on scroll position
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href").slice(1) === current) {
      item.classList.add("active");
    }
  });
});

// Scroll Animation
const fadeElements = document.querySelectorAll(".fade-in");

const fadeInOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -100px 0px",
};

const fadeInObserver = new IntersectionObserver(function (
  entries,
  fadeInObserver
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      fadeInObserver.unobserve(entry.target);
    }
  });
},
fadeInOptions);

fadeElements.forEach((element) => {
  fadeInObserver.observe(element);
});

// Form Submission
document.addEventListener("DOMContentLoaded", function () {
  // ✅ Initialize EmailJS
  emailjs.init("KzbUKFvgwl5YNrNew"); // Replace with your actual Public Key

  const contactForm = document.querySelector(".contact-form");
  const messageBox = document.getElementById("form-message");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // ✅ Collect form data properly
    const formData = {
      from_name: document.getElementById("name").value,
      from_email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    // ✅ Send email using EmailJS
    emailjs
      .send("service_8wlhmd8", "template_43swayk", formData)
      .then((response) => {
        console.log("✅ Email sent successfully!", response);
        messageBox.textContent =
          "✅ Thanks for your message! I'll get back to you soon.";
        messageBox.style.color = "green";
        // alert("✅ Thanks for your message! I'll get back to you soon.");
        contactForm.reset();
      })
      .catch((error) => {
        console.error("❌ Failed to send email:", error);
        messageBox.textContent =
          "❌ Oops! Something went wrong. Please try again.";
        messageBox.style.color = "red";
        // alert("❌ Oops! Something went wrong. Please try again.");
      });
  });
});


// Dynamic year for copyright
document.querySelector(
  ".footer-bottom p"
).innerHTML = `&copy; ${new Date().getFullYear()} Kishore Nagaraj. All rights reserved.`;

