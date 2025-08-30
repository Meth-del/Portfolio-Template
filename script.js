document.addEventListener("DOMContentLoaded", () => {
  // Dark mode functionality
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  
  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', currentTheme);
  
  // Update toggle text based on current theme
  const updateToggleText = (theme) => {
    const toggleText = darkModeToggle.querySelector('.text');
    if (theme === 'dark') {
      toggleText.textContent = 'Light Mode';
    } else {
      toggleText.textContent = 'Dark Mode';
    }
  };
  
  updateToggleText(currentTheme);
  
  darkModeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleText(newTheme);
    
    // Add a little animation to the toggle
    darkModeToggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
      darkModeToggle.style.transform = 'scale(1)';
    }, 150);
  });

  // Add loading screen effect
  const loadingScreen = document.createElement('div');
  loadingScreen.style.position = 'fixed';
  loadingScreen.style.top = '0';
  loadingScreen.style.left = '0';
  loadingScreen.style.width = '100%';
  loadingScreen.style.height = '100%';
  loadingScreen.style.background = 'var(--bg-primary)';
  loadingScreen.style.zIndex = '9999';
  loadingScreen.style.display = 'flex';
  loadingScreen.style.alignItems = 'center';
  loadingScreen.style.justifyContent = 'center';
  loadingScreen.style.flexDirection = 'column';
  loadingScreen.innerHTML = `
    <div style="width: 50px; height: 50px; border: 4px solid var(--border-color); border-top: 4px solid var(--accent-color); border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px;"></div>
    <p style="color: var(--text-secondary); font-size: 1.1rem; animation: pulseGlow 2s infinite;">Loading Portfolio...</p>
  `;
  
  document.body.appendChild(loadingScreen);
  
  // Remove loading screen after animations are ready
  setTimeout(() => {
    loadingScreen.style.animation = 'fadeInUp 0.5s ease-out reverse';
    setTimeout(() => {
      loadingScreen.remove();
    }, 500);
  }, 2000);

  // Populate About section with typing effect
  const nameElement = document.getElementById("name");
  const bioElement = document.getElementById("bio");
  
  // Typing effect for name
  const typeWriter = (element, text, speed = 100, callback) => {
    let i = 0;
    element.textContent = '';
    element.style.borderRight = '2px solid var(--accent-color)';
    element.style.animation = 'blink 1s infinite';
    
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
        element.style.borderRight = 'none';
        element.style.animation = 'none';
        if (callback) callback();
      }
    }, speed);
  };

  // Start typing animation after loading screen
  setTimeout(() => {
    typeWriter(nameElement, portfolioData.name, 150, () => {
      // After name is typed, show bio with fade effect
      bioElement.textContent = portfolioData.bio;
      bioElement.style.animation = 'slideInFromBottom 1s ease-out both';
    });
  }, 2500);

  // Create floating particles
  const createParticles = () => {
    const aboutSection = document.getElementById('about');
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.width = (Math.random() * 8 + 4) + 'px';
      particle.style.height = particle.style.width;
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
      
      aboutSection.appendChild(particle);
    }
  };

  createParticles();

  // Populate Projects section with staggered animation
  const projectContainer = document.getElementById("projects-list");
  portfolioData.projects.forEach((project, index) => {
    const div = document.createElement("div");
    div.className = "project-card";
    div.style.animationDelay = `${index * 0.1}s`;
    div.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
    `;
    
    // Add click effect
    div.addEventListener('click', () => {
      div.style.animation = 'wobble 0.6s ease-in-out';
      setTimeout(() => {
        div.style.animation = '';
      }, 600);
    });
    
    projectContainer.appendChild(div);
  });

  // Populate Skills section with staggered pop-in animation
  const skillList = document.getElementById("skills-list");
  portfolioData.skills.forEach((skill, index) => {
    const li = document.createElement("li");
    li.textContent = skill;
    li.style.animationDelay = `${index * 0.05}s`;
    
    // Add click bounce effect
    li.addEventListener('click', () => {
      li.style.animation = 'bounce 0.6s ease-in-out';
      setTimeout(() => {
        li.style.animation = `popIn 0.6s ease-out both`;
        li.style.animationDelay = `${index * 0.05}s`;
      }, 600);
    });
    
    skillList.appendChild(li);
  });

  // Enhanced smooth scrolling with easing
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        // Add loading animation to clicked nav item
        this.style.animation = 'pulseGlow 0.3s ease-in-out';
        setTimeout(() => {
          this.style.animation = '';
        }, 300);
        
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Enhanced scroll animations with Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        
        // Trigger specific animations for different sections
        if (entry.target.id === 'projects') {
          const cards = entry.target.querySelectorAll('.project-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.animation = 'slideInCard 0.8s ease-out both';
            }, index * 100);
          });
        }
        
        if (entry.target.id === 'skills') {
          const skills = entry.target.querySelectorAll('#skills-list li');
          skills.forEach((skill, index) => {
            setTimeout(() => {
              skill.style.animation = 'popIn 0.6s ease-out both';
            }, index * 50);
          });
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });

  // Enhanced header scroll effect with smooth transitions
  let lastScrollY = 0;
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const currentScrollY = window.scrollY;
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentScrollY > 100) {
      if (currentTheme === 'dark') {
        header.style.background = 'rgba(26, 32, 44, 0.98)';
      } else {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
      }
      header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
      header.style.backdropFilter = 'blur(15px)';
    } else {
      if (currentTheme === 'dark') {
        header.style.background = 'rgba(26, 32, 44, 0.95)';
      } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
      }
      header.style.boxShadow = 'none';
      header.style.backdropFilter = 'blur(10px)';
    }
    
    // Add bounce effect when scrolling up
    if (currentScrollY < lastScrollY && currentScrollY > 200) {
      header.style.animation = 'slideInFromTop 0.3s ease-out';
      setTimeout(() => {
        header.style.animation = '';
      }, 300);
    }
    
    lastScrollY = currentScrollY;
  });

  // Enhanced form submission with animations
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    const form = document.querySelector('form');
    
    // Animate form elements
    form.style.animation = 'wobble 0.5s ease-in-out';
    
    // Show loading state with animation
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.animation = 'pulseGlow 1s infinite';
    
    // Create sending particles
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = '4px';
      particle.style.height = '4px';
      particle.style.background = 'var(--accent-color)';
      particle.style.borderRadius = '50%';
      particle.style.left = '50%';
      particle.style.top = '50%';
      particle.style.transform = 'translate(-50%, -50%)';
      particle.style.animation = `float 2s ease-out ${i * 0.2}s both`;
      particle.style.zIndex = '1000';
      
      submitBtn.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.remove();
        }
      }, 2000);
    }
    
    // Simulate form submission
    setTimeout(() => {
      submitBtn.textContent = 'Message Sent! ✓';
      submitBtn.style.background = 'var(--success-color)';
      submitBtn.style.animation = 'bounce 0.6s ease-in-out';
      
      // Reset form after success
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = 'var(--gradient-primary)';
        submitBtn.style.animation = 'pulseGlow 2s infinite';
        form.reset();
        form.style.animation = '';
      }, 2500);
    }, 1500);
  });

  // Enhanced active navigation highlighting with animations
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
        link.style.animation = 'bounce 0.6s ease-in-out';
        setTimeout(() => {
          link.style.animation = '';
        }, 600);
      }
    });
  });

  // Add hover effects to project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Create ripple effect
      const ripple = document.createElement('div');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(49, 130, 206, 0.1)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s ease-out';
      ripple.style.left = '50%';
      ripple.style.top = '50%';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.marginLeft = '-10px';
      ripple.style.marginTop = '-10px';
      
      card.appendChild(ripple);
      
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.remove();
        }
      }, 600);
    });
  });
});

// Add mouse trail effect
document.addEventListener('mousemove', (e) => {
  const trail = document.createElement('div');
  trail.className = 'mouse-trail';
  trail.style.left = e.clientX + 'px';
  trail.style.top = e.clientY + 'px';
  
  document.body.appendChild(trail);
  
  setTimeout(() => {
    if (trail.parentNode) {
      trail.remove();
    }
  }, 1000);
});

// Add scroll progress indicator
const scrollIndicator = document.createElement('div');
scrollIndicator.className = 'scroll-indicator';
document.body.appendChild(scrollIndicator);

window.addEventListener('scroll', () => {
  const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  scrollIndicator.style.width = scrollPercent + '%';
});

// Add parallax effect to about section
window.addEventListener('scroll', () => {
  const aboutSection = document.getElementById('about');
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;
  
  if (aboutSection) {
    aboutSection.style.transform = `translateY(${rate}px)`;
  }
});