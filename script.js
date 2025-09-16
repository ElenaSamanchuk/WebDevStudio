document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});
function initializeApp() {
  initCursor();
  initNavigation();
  initScrollEffects();
  initAnimations();
  initParallax();
  initTiltEffect();
  initFormHandling();
  initCounters();
  initTypingEffect();
  initParticles();
}
function initCursor() {
  const cursorDot = document.getElementById("cursorDot");
  const cursorOutline = document.getElementById("cursorOutline");
  if (!cursorDot || !cursorOutline) return;
  let mouseX = 0;
  let mouseY = 0;
  let outlineX = 0;
  let outlineY = 0;
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";
  });
  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    cursorOutline.style.left = outlineX - 16 + "px";
    cursorOutline.style.top = outlineY - 16 + "px";
    requestAnimationFrame(animateOutline);
  }
  animateOutline();
  const interactiveElements = document.querySelectorAll(
    "a, button, .portfolio-card, .service-card"
  );
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorOutline.style.transform = "scale(2)";
      cursorDot.style.transform = "scale(0.5)";
    });
    el.addEventListener("mouseleave", () => {
      cursorOutline.style.transform = "scale(1)";
      cursorDot.style.transform = "scale(1)";
    });
  });
}
function initNavigation() {
  const navbar = document.getElementById("navbar");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
        navToggle?.classList.remove("active");
        navMenu?.classList.remove("active");
      }
    });
  });
  function updateActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 100;
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const correspondingLink = document.querySelector(
        `.nav-link[href="#${sectionId}"]`
      );
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        navLinks.forEach((link) => link.classList.remove("active"));
        correspondingLink?.classList.add("active");
      }
    });
  }
  window.addEventListener("scroll", updateActiveLink);
}
function initScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        if (
          entry.target.classList.contains("service-card") ||
          entry.target.classList.contains("portfolio-item")
        ) {
          const delay =
            Array.from(entry.target.parentNode.children).indexOf(entry.target) *
            100;
          entry.target.style.transitionDelay = delay + "ms";
        }
      }
    });
  }, observerOptions);
  const animateElements = document.querySelectorAll(
    ".service-card, .portfolio-item, .showcase-card, .info-item"
  );
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(50px)";
    el.style.transition = "all 0.8s ease";
    observer.observe(el);
  });
}
function initAnimations() {
  const glowButtons = document.querySelectorAll(".glow-btn");
  glowButtons.forEach((btn) => {
    btn.addEventListener("mouseover", () => {
      btn.style.animation = "glow-pulse 0.5s ease-in-out";
    });
    btn.addEventListener("mouseleave", () => {
      setTimeout(() => {
        btn.style.animation = "glow-pulse 2s infinite";
      }, 500);
    });
  });
  const morphingCards = document.querySelectorAll(".morphing-card");
  morphingCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform =
        "perspective(1000px) rotateX(5deg) rotateY(5deg) translateY(-8px)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
  });
}
function initParallax() {
  const shapes = document.querySelectorAll(".shape");
  const floatingCards = document.querySelectorAll(".floating-card");
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    shapes.forEach((shape, index) => {
      const speed = 0.2 + index * 0.1;
      shape.style.transform = `translateY(${scrolled * speed}px) rotate(${
        scrolled * 0.1
      }deg)`;
    });
    floatingCards.forEach((card) => {
      card.style.transform = `translateY(${parallax * 0.3}px)`;
    });
  });
}
function initTiltEffect() {
  const tiltElements = document.querySelectorAll("[data-tilt]");
  tiltElements.forEach((element) => {
    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 5;
      const rotateY = (centerX - x) / 5;
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    element.addEventListener("mouseleave", () => {
      element.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    });
  });
}
function initFormHandling() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;
  const formInputs = contactForm.querySelectorAll("input, textarea");
  formInputs.forEach((input) => {
    input.setAttribute("placeholder", " ");
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("focused");
      createRipple(input);
    });
    input.addEventListener("blur", () => {
      input.parentElement.classList.remove("focused");
      if (!input.value) {
        input.parentElement.classList.remove("filled");
      } else {
        input.parentElement.classList.add("filled");
      }
    });
    input.addEventListener("input", () => {
      validateField(input);
    });
  });
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector(".submit-btn");
    const originalText = submitBtn.querySelector(".btn-text").textContent;
    let isValid = true;
    formInputs.forEach((input) => {
      if (!validateField(input)) {
        isValid = false;
      }
    });
    if (!isValid) {
      showNotification("Пожалуйста, заполните все обязательные поля", "error");
      return;
    }
    submitBtn.querySelector(".btn-text").textContent = "Отправляем...";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";
    setTimeout(() => {
      showNotification(
        "Сообщение отправлено! Мы свяжемся с вами в ближайшее время",
        "success"
      );
      contactForm.reset();
      submitBtn.querySelector(".btn-text").textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
      formInputs.forEach((input) => {
        input.parentElement.classList.remove("filled", "focused");
      });
    }, 2000);
  });
}
function validateField(field) {
  const value = field.value.trim();
  const isRequired = field.hasAttribute("required");
  let isValid = true;
  field.parentElement.classList.remove("error");
  if (isRequired && !value) {
    isValid = false;
  } else if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid = emailRegex.test(value);
  }
  if (!isValid) {
    field.parentElement.classList.add("error");
  }
  return isValid;
}
function createRipple(element) {
  const ripple = document.createElement("div");
  ripple.classList.add("ripple");
  ripple.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--gradient-primary);
        transform: scaleX(0);
        animation: ripple 0.6s ease-out;
    `;
  element.parentElement.appendChild(ripple);
  setTimeout(() => {
    ripple.remove();
  }, 600);
}
function initCounters() {
  const counters = document.querySelectorAll(".stat-number[data-count]");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("counted")
        ) {
          entry.target.classList.add("counted");
          animateCounter(entry.target);
        }
      });
    },
    { threshold: 0.7 }
  );
  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
}
function animateCounter(element) {
  const target = parseInt(element.dataset.count);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}
function initTypingEffect() {
  const typingElement = document.querySelector(".typing-animation");
  if (!typingElement) return;
  const text = typingElement.textContent;
  typingElement.textContent = "";
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      typingElement.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };
  setTimeout(typeWriter, 1000);
}
function initParticles() {
  const createParticle = (container) => {
    const particle = document.createElement("div");
    particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--primary);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0;
        `;
    const x = Math.random() * container.offsetWidth;
    const y = Math.random() * container.offsetHeight;
    particle.style.left = x + "px";
    particle.style.top = y + "px";
    container.appendChild(particle);
    particle.animate(
      [
        { opacity: 0, transform: "translateY(0px) scale(0)" },
        { opacity: 1, transform: "translateY(-20px) scale(1)" },
        { opacity: 0, transform: "translateY(-40px) scale(0)" },
      ],
      {
        duration: 2000,
        easing: "ease-out",
      }
    ).onfinish = () => particle.remove();
  };
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => createParticle(card), i * 200);
      }
    });
  });
}
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === "error" ? "var(--error)" : "var(--success)"};
        color: white;
        border-radius: var(--border-radius-sm);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.opacity = "1";
    notification.style.transform = "translateX(0)";
  }, 100);
  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateX(100%)";
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}
document.addEventListener("DOMContentLoaded", () => {
  const portfolioCards = document.querySelectorAll(".portfolio-card");
  portfolioCards.forEach((card) => {
    card.addEventListener("click", () => {
      
    });
  });
});
function showProjectModal(card) {
  const modal = document.createElement("div");
  modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
  const content = document.createElement("div");
  content.style.cssText = `
        background: var(--bg-secondary);
        border-radius: var(--border-radius);
        padding: 40px;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
  const title = card.querySelector(".project-title").textContent;
  const description = card.querySelector(".project-description").textContent;
  content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="color: var(--text-primary); margin: 0;">${title}</h3>
            <button onclick="closeModal()" style="background: none; border: none; color: var(--text-secondary); font-size: 24px; cursor: pointer;">×</button>
        </div>
        <p style="color: var(--text-secondary); line-height: 1.6;">${description}</p>
        <div style="margin-top: 20px;">
            <button onclick="closeModal()" class="btn btn-primary" style="margin-right: 12px;">Подробнее</button>
            <button onclick="closeModal()" class="btn btn-glass">Закрыть</button>
        </div>
    `;
  modal.appendChild(content);
  document.body.appendChild(modal);
  setTimeout(() => {
    modal.style.opacity = "1";
    content.style.transform = "scale(1)";
  }, 100);
  window.closeModal = () => {
    modal.style.opacity = "0";
    content.style.transform = "scale(0.8)";
    setTimeout(() => {
      modal.remove();
      delete window.closeModal;
    }, 300);
  };
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      window.closeModal();
    }
  });
}
const createScrollToTop = () => {
  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = "&#5123;";
  scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: transparent;
        color: white;
        border: none;
        font-size: 40px;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    `;
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollBtn.style.opacity = "1";
      scrollBtn.style.transform = "translateY(0)";
    } else {
      scrollBtn.style.opacity = "0";
      scrollBtn.style.transform = "translateY(20px)";
    }
  });
  document.body.appendChild(scrollBtn);
};
document.addEventListener("DOMContentLoaded", createScrollToTop);
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
window.addEventListener(
  "scroll",
  debounce(() => {}, 10)
);

window.addEventListener(
  "resize",
  debounce(() => {}, 100)
);
const addDynamicStyles = () => {
  const style = document.createElement("style");
  style.textContent = `
        @keyframes ripple {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
        }
        .form-group.error input,
        .form-group.error textarea {
            border-bottom-color: var(--error);
        }
        .form-group.error label {
            color: var(--error);
        }
        .portfolio-card {
            cursor: pointer;
        }
        .portfolio-card:hover {
            cursor: pointer;
        }
    `;
  document.head.appendChild(style);
};
document.addEventListener("DOMContentLoaded", addDynamicStyles);
console.log(`
    🎨 Добро пожаловать в WebDev Studio! 
    ✨ Этот сайт создан с любовью и магией кода
    🚀 Хотите работать с нами? Напишите нам!
    Технологии: HTML5, CSS3, JavaScript ES6+
    Эффекты: Custom Cursor, Parallax, 3D Transforms, WebGL
    © 2025 WebDev Studio
`);