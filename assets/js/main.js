const menuToggles = document.querySelectorAll("[data-menu-toggle]");
const menuCloseButtons = document.querySelectorAll("[data-menu-close]");
const overlayMenu = document.querySelector(".overlay-menu");
const toast = document.querySelector(".toast");

const openMenu = () => {
  overlayMenu?.classList.add("open");
  document.body.classList.add("menu-open");
  menuToggles.forEach((btn) => btn.setAttribute("aria-expanded", "true"));
};

const closeMenu = () => {
  overlayMenu?.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggles.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
};

menuToggles.forEach((button) => button.addEventListener("click", openMenu));
menuCloseButtons.forEach((button) => button.addEventListener("click", closeMenu));

overlayMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keyup", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

document.querySelectorAll("[data-year]").forEach((slot) => {
  slot.textContent = new Date().getFullYear();
});

const emailForm = document.querySelector("[data-email-form]");
emailForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  toast?.classList.add("show");
  setTimeout(() => toast?.classList.remove("show"), 2500);
  const input = event.target.querySelector("input");
  if (input) {
    input.value = "";
  }
});

const activePage = document.body.dataset.page;
if (activePage) {
  document.querySelectorAll(`[data-nav="${activePage}"]`).forEach((link) => link.classList.add("active"));
}

/* sign up */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-shell");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop form submission

    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const plan = document.getElementById("signup-plan").value;

    let isValid = true;

    // Helper to show error message
    function showError(inputId, message) {
      const inputField = document.getElementById(inputId).parentElement;

      let error = inputField.querySelector(".error-text");
      if (!error) {
        error = document.createElement("p");
        error.className = "error-text";
        error.style.color = "red";
        error.style.fontSize = "13px";
        error.style.marginTop = "4px";
        inputField.appendChild(error);
      }
      error.textContent = message;
    }

    // Helper to clear error
    function clearError(inputId) {
      const inputField = document.getElementById(inputId).parentElement;
      const error = inputField.querySelector(".error-text");
      if (error) error.remove();
    }

    // Validate Name
    if (name.length < 3) {
      showError("signup-name", "Full name must be at least 3 characters");
      isValid = false;
    } else {
      clearError("signup-name");
    }

    // Validate Email Use Basic Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError("signup-email", "Enter a valid email address");
      isValid = false;
    } else {
      clearError("signup-email");
    }

    // Validate Password
    if (password.length < 6) {
      showError("signup-password", "Password must be at least 6 characters");
      isValid = false;
    } else {
      clearError("signup-password");
    }

    // Validate Plan
    if (plan === "") {
      showError("signup-plan", "Please select a plan");
      isValid = false;
    } else {
      clearError("signup-plan");
    }

    // If all good → Submit or redirect
    if (isValid) {
      alert("Account created successfully!");
      window.location.href = "my-spaces.html"; // Redirect to Spaces
    }
  });
});

/* login */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-login-form]");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    let isValid = true;

    // --- Helper: Show error ---
    function showError(inputId, message) {
      const wrapper = document.getElementById(inputId).parentElement;
      let errorBox = wrapper.querySelector(".error-text");

      if (!errorBox) {
        errorBox = document.createElement("p");
        errorBox.className = "error-text";
        errorBox.style.color = "red";
        errorBox.style.fontSize = "13px";
        errorBox.style.marginTop = "4px";
        wrapper.appendChild(errorBox);
      }

      errorBox.textContent = message;
    }

    // --- Helper: Clear error ---
    function clearError(inputId) {
      const wrapper = document.getElementById(inputId).parentElement;
      const error = wrapper.querySelector(".error-text");
      if (error) error.remove();
    }

    // --- Email Validation ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError("login-email", "Enter a valid email address");
      isValid = false;
    } else {
      clearError("login-email");
    }

    // --- Password Validation ---
    if (password.length < 6) {
      showError("login-password", "Password must be at least 6 characters");
      isValid = false;
    } else {
      clearError("login-password");
    }

    // --- If everything correct ---
    if (isValid) {
      alert("Login successful!");
      window.location.href = "my-spaces.html";
    }
  });
});

/* drag for all carousels with smooth momentum */
document.querySelectorAll(".carousel").forEach((carousel) => {
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let velocity = 0;
  let lastX = 0;
  let lastTime = 0;
  let animationId = null;

  const applyMomentum = () => {
    if (Math.abs(velocity) > 0.5) {
      velocity *= 0.93;
      carousel.scrollLeft -= velocity;
      animationId = requestAnimationFrame(applyMomentum);
    }
  };

  carousel.addEventListener("mousedown", (e) => {
    if (animationId) cancelAnimationFrame(animationId);
    isDown = true;
    carousel.style.cursor = "grabbing";
    carousel.style.scrollBehavior = "auto";
    startX = e.pageX;
    lastX = e.pageX;
    scrollLeft = carousel.scrollLeft;
    velocity = 0;
    lastTime = Date.now();
    e.preventDefault();
  });

  carousel.addEventListener("mouseleave", () => {
    if (isDown) {
      isDown = false;
      carousel.style.cursor = "grab";
      if (Math.abs(velocity) > 0.5) {
        applyMomentum();
      }
    }
  });

  carousel.addEventListener("mouseup", () => {
    if (isDown) {
      isDown = false;
      carousel.style.cursor = "grab";
      if (Math.abs(velocity) > 0.5) {
        applyMomentum();
      }
    }
  });

  carousel.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    
    const x = e.pageX;
    const now = Date.now();
    const timeDelta = Math.max(now - lastTime, 1);
    const delta = lastX - x;
    
    // Direct scroll without acceleration
    carousel.scrollLeft += delta;
    
    // Calculate velocity for momentum
    velocity = delta * (16 / timeDelta);
    
    lastX = x;
    lastTime = now;
  });

  /* touch events */
  carousel.addEventListener("touchstart", (e) => {
    if (animationId) cancelAnimationFrame(animationId);
    isDown = true;
    startX = e.touches[0].clientX;
    lastX = e.touches[0].clientX;
    scrollLeft = carousel.scrollLeft;
    velocity = 0;
    lastTime = Date.now();
  });

  carousel.addEventListener("touchend", () => {
    if (isDown) {
      isDown = false;
      if (Math.abs(velocity) > 0.5) {
        applyMomentum();
      }
    }
  });

  carousel.addEventListener("touchmove", (e) => {
    if (!isDown) return;
    
    const x = e.touches[0].clientX;
    const now = Date.now();
    const timeDelta = Math.max(now - lastTime, 1);
    const delta = lastX - x;
    
    // Direct scroll without acceleration
    carousel.scrollLeft += delta;
    
    // Calculate velocity for momentum
    velocity = delta * (16 / timeDelta);
    
    lastX = x;
    lastTime = now;
  });
});

/* Map Modal functionality */
document.addEventListener("DOMContentLoaded", () => {
  const mapToggle = document.querySelector("[data-map-toggle]");
  const mapClose = document.querySelector("[data-map-close]");
  const mapModal = document.getElementById("mapModal");

  if (mapToggle && mapModal) {
    mapToggle.addEventListener("click", (e) => {
      e.preventDefault();
      mapModal.classList.add("active");
    });
  }

  if (mapClose && mapModal) {
    mapClose.addEventListener("click", () => {
      mapModal.classList.remove("active");
    });
  }

  // Close modal when clicking outside
  if (mapModal) {
    mapModal.addEventListener("click", (e) => {
      if (e.target === mapModal) {
        mapModal.classList.remove("active");
      }
    });
  }

  // Close modal on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mapModal?.classList.contains("active")) {
      mapModal.classList.remove("active");
    }
  });
});

/* Chart.js initialization for dashboard */
document.addEventListener("DOMContentLoaded", () => {
  // Chart colors matching the theme
  const accentColor = "#1b9fff";
  const accentColor2 = "#7c3aed";
  const accentColor3 = "#f472b6";
  const mutedColor = "#9aa0b5";
  const textColor = "#f4f6fb";
  const panelColor = "#0b0d13";

  // Watch Hours Chart
  const watchHoursCtx = document.getElementById("watchHoursChart");
  if (watchHoursCtx) {
    new Chart(watchHoursCtx, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Watch Hours",
            data: [12, 19, 8, 15, 22, 18, 25],
            borderColor: accentColor,
            backgroundColor: `rgba(27, 159, 255, 0.1)`,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: accentColor,
            pointBorderColor: textColor,
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: textColor,
              font: { size: 12, weight: "600" },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 30,
            ticks: {
              color: mutedColor,
              font: { size: 11 },
            },
            grid: {
              color: "rgba(255, 255, 255, 0.05)",
              drawBorder: false,
            },
          },
          x: {
            ticks: {
              color: mutedColor,
              font: { size: 11 },
            },
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  // Views by Category Chart
  const viewsCategoryCtx = document.getElementById("viewsCategoryChart");
  if (viewsCategoryCtx) {
    new Chart(viewsCategoryCtx, {
      type: "doughnut",
      data: {
        labels: ["Movies", "Shows", "Sports", "Kids", "Originals"],
        datasets: [
          {
            data: [35, 25, 18, 12, 10],
            backgroundColor: [accentColor, accentColor2, accentColor3, mutedColor, "#45a29e"],
            borderColor: panelColor,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              color: textColor,
              font: { size: 12, weight: "600" },
              padding: 15,
            },
          },
        },
      },
    });
  }

  // Monthly vs Yearly Performance Chart
  const performanceCtx = document.getElementById("performanceChart");
  if (performanceCtx) {
    new Chart(performanceCtx, {
      type: "bar",
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            label: "Monthly Views",
            data: [1200, 1400, 1100, 1600, 1300, 1500],
            backgroundColor: accentColor,
            borderRadius: 8,
            borderSkipped: false,
          },
          {
            label: "Yearly Avg",
            data: [1350, 1350, 1350, 1350, 1350, 1350],
            backgroundColor: accentColor2,
            borderRadius: 8,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: textColor,
              font: { size: 12, weight: "600" },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 2000,
            ticks: {
              color: mutedColor,
              font: { size: 11 },
            },
            grid: {
              color: "rgba(255, 255, 255, 0.05)",
              drawBorder: false,
            },
          },
          x: {
            ticks: {
              color: mutedColor,
              font: { size: 11 },
            },
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }
});


