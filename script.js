// Preloader (backup method, the inline script should handle this first)
document.addEventListener("DOMContentLoaded", () => {
    // Immediately hide preloader
    setTimeout(() => {
      const preloader = document.querySelector(".preloader")
      if (preloader) {
        preloader.style.opacity = "0"
        preloader.style.visibility = "hidden"
        setTimeout(() => {
          preloader.style.display = "none"
        }, 500)
      }
    }, 1000)
  
    // Theme Toggle
    const themeToggle = document.querySelector(".theme-toggle")
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark")
      // Save theme preference to localStorage
      if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark")
      } else {
        localStorage.setItem("theme", "light")
      }
    })
  
    // Check for saved theme preference
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark")
    }
  
    // Sticky Header
    const header = document.querySelector("header")
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("sticky")
      } else {
        header.classList.remove("sticky")
      }
    })
  
    // Mobile Menu Toggle
    const menuBtn = document.querySelector(".menu-btn")
    const navLinks = document.querySelector(".nav-links")
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      document.body.classList.toggle("no-scroll")
    })
  
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll(".nav-links a")
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        navLinks.classList.remove("active")
        document.body.classList.remove("no-scroll")
      })
    })
  
    // Active Navigation Link
    const sections = document.querySelectorAll("section")
    const navLinks2 = document.querySelectorAll(".nav-links a") //Renamed to avoid redeclaration
  
    window.addEventListener("scroll", () => {
      let current = ""
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
        if (pageYOffset >= sectionTop - 200) {
          current = section.getAttribute("id")
        }
      })
  
      navLinks2.forEach((link) => {
        //Using renamed variable
        link.classList.remove("active")
        if (link.getAttribute("href").substring(1) === current) {
          link.classList.add("active")
        }
      })
    })
  
    // Typing Animation
    const typedTextSpan = document.querySelector(".typed-text")
    const cursorSpan = document.querySelector(".cursor")
  
    const textArray = ["Web Developer", "App Developer", "UI/UX Designer", "Freelancer"]
    const typingDelay = 100
    const erasingDelay = 50
    const newTextDelay = 2000
    let textArrayIndex = 0
    let charIndex = 0
  
    function type() {
      if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) {
          cursorSpan.classList.add("typing")
        }
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex)
        charIndex++
        setTimeout(type, typingDelay)
      } else {
        cursorSpan.classList.remove("typing")
        setTimeout(erase, newTextDelay)
      }
    }
  
    function erase() {
      if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) {
          cursorSpan.classList.add("typing")
        }
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1)
        charIndex--
        setTimeout(erase, erasingDelay)
      } else {
        cursorSpan.classList.remove("typing")
        textArrayIndex++
        if (textArrayIndex >= textArray.length) {
          textArrayIndex = 0
        }
        setTimeout(type, typingDelay + 1100)
      }
    }
  
    if (textArray.length) {
      setTimeout(type, newTextDelay + 250)
    }
  
    // Certificate Image Upload Preview
    const certUploads = document.querySelectorAll(".cert-upload")
  
    certUploads.forEach((upload) => {
      upload.addEventListener("change", function (e) {
        const id = this.id
        const previewId = id.replace("upload", "preview")
        const preview = document.getElementById(previewId)
        const placeholder = this.previousElementSibling.querySelector(".upload-placeholder")
  
        const file = this.files[0]
        if (file) {
          const reader = new FileReader()
  
          reader.onload = (e) => {
            preview.src = e.target.result
            preview.style.display = "block"
            placeholder.style.display = "none"
          }
  
          reader.readAsDataURL(file)
        }
      })
    })
  
    // Project Filtering
    const filterBtns = document.querySelectorAll(".filter-btn")
    const projectItems = document.querySelectorAll(".project-item")
  
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        filterBtns.forEach((btn) => {
          btn.classList.remove("active")
        })
        // Add active class to clicked button
        this.classList.add("active")
  
        const filterValue = this.getAttribute("data-filter")
  
        projectItems.forEach((item) => {
          if (filterValue === "all") {
            item.style.display = "block"
            setTimeout(() => {
              item.style.opacity = "1"
              item.style.transform = "scale(1)"
            }, 200)
          } else if (item.getAttribute("data-category") === filterValue) {
            item.style.display = "block"
            setTimeout(() => {
              item.style.opacity = "1"
              item.style.transform = "scale(1)"
            }, 200)
          } else {
            item.style.opacity = "0"
            item.style.transform = "scale(0.8)"
            setTimeout(() => {
              item.style.display = "none"
            }, 500)
          }
        })
      })
    })
  
    // Add Skill Cards Animation
    const skillsSection = document.querySelector(".skills")
    const skillCards = document.querySelectorAll(".skill-card")
  
    function animateSkillCards() {
      skillCards.forEach((card, index) => {
        card.style.opacity = "0"
        card.style.transform = "translateY(20px)"
        card.style.transition = `opacity 0.3s ease, transform 0.3s ease ${index * 0.1}s`
      })
  
      function showSkillCards() {
        const sectionPos = skillsSection.getBoundingClientRect().top
        const screenPos = window.innerHeight / 1.3
  
        if (sectionPos < screenPos) {
          skillCards.forEach((card) => {
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
          })
        }
      }
  
      window.addEventListener("scroll", showSkillCards)
      // Check once on load
      showSkillCards()
    }
  
    // Call the function to initialize the animation
    animateSkillCards()
  
    // Contact Form Submission
    
    document.getElementById("contactForm").addEventListener("submit", function (e) {
        e.preventDefault();
    
        // Get form values and encode them for URL
        const name = encodeURIComponent(document.getElementById("name").value);
        const email = encodeURIComponent(document.getElementById("email").value);
        const subject = encodeURIComponent(document.getElementById("subject").value);
        const message = encodeURIComponent(document.getElementById("message").value);
    
        // Google Form Base URL (Change "/viewform" to "/formResponse")
        const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSdcNGTSHjHRrtEGMuvu4DWo8d21iXczy82m5aN2eAGUgVbB-Q/formResponse";
    
        // Construct GET request URL with form entries
        const formData = `${googleFormURL}?entry.1425261101=${name}&entry.958802012=${email}&entry.1970512462=${subject}&entry.1547088931=${message}`;
    
        // Show "Sending" Swal alert
        Swal.fire({
          title: "Sending...",
          text: "Please wait while we send your message.",
          icon: "info",
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
    
        // Send data using a GET request
        fetch(formData, { method: "GET", mode: "no-cors" })
          .then(() => {
            // Show success Swal alert
            Swal.fire({
              title: "Message Sent!",
              text: "Thank you for reaching out. I'll get back to you soon.",
              icon: "success"
            });
            document.getElementById("contactForm").reset();
          })
          .catch((error) => {
            // Show error Swal alert
            Swal.fire({
              title: "Error",
              text: "There was an issue sending your message. Please try again later.",
              icon: "error"
            });
            console.error(error);
          });
      });
      
    // Back to Top Button
    const backToTopBtn = document.querySelector(".back-to-top")
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("active")
      } else {
        backToTopBtn.classList.remove("active")
      }
    })
  
    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        window.scrollTo({
          top: target.offsetTop,
          behavior: "smooth",
        })
      })
    })
  
    // Scroll Reveal Animation
    function revealOnScroll() {
      const reveals = document.querySelectorAll(
        ".section-header, .about-content, .timeline-item, .skills-content, .certifications-grid, .contact-content",
      )
  
      reveals.forEach((reveal) => {
        const revealTop = reveal.getBoundingClientRect().top
        const revealPoint = window.innerHeight * 0.8
  
        if (revealTop < revealPoint) {
          reveal.classList.add("revealed")
        }
      })
    }
  
    window.addEventListener("scroll", revealOnScroll)
  
    // Call once on load to check for elements already in view
    revealOnScroll()
  })
  
  