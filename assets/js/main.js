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

