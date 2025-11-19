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

/* drag */
const carousel = document.querySelector(".carousel");

let isDown = false;
let startX;
let scrollLeft;

carousel.addEventListener("mousedown", (e) => {
  isDown = true;
  carousel.classList.add("dragging");
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
  e.preventDefault();
});

carousel.addEventListener("mouseleave", () => {
  isDown = false;
  carousel.classList.remove("dragging");
});

carousel.addEventListener("mouseup", () => {
  isDown = false;
  carousel.classList.remove("dragging");
});

carousel.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 1.5; 
  carousel.scrollLeft = scrollLeft - walk;
});

/* mobile */
// Touch start
carousel.addEventListener("touchstart", (e) => {
  isDown = true;
  startX = e.touches[0].pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});

// Touch end
carousel.addEventListener("touchend", () => {
  isDown = false;
});

// Touch move
carousel.addEventListener("touchmove", (e) => {
  if (!isDown) return;
  const x = e.touches[0].pageX - carousel.offsetLeft;
  const walk = (x - startX) * 1.6;
  carousel.scrollLeft = scrollLeft - walk;
});


