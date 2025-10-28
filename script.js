"use strict";

/* ========= Utility Functions ========= */
const toggleClass = (el, cls) => el?.classList.toggle(cls);
const addClass = (el, cls) => el?.classList.add(cls);
const removeClass = (el, cls) => el?.classList.remove(cls);

/* ========= Sidebar Toggle ========= */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", () => toggleClass(sidebar, "active"));
}

/* ========= Page Navigation ========= */
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const targetPage = link.innerText.toLowerCase().trim();

    // Update active state
    navLinks.forEach((btn) => removeClass(btn, "active"));
    pages.forEach((page) => removeClass(page, "active"));

    addClass(link, "active");
    const selectedPage = [...pages].find((p) => p.dataset.page === targetPage);
    if (selectedPage) addClass(selectedPage, "active");

    // Smooth scroll + fade
    window.scrollTo({ top: 0, behavior: "smooth" });
    selectedPage.style.opacity = 0;
    setTimeout(() => {
      selectedPage.style.transition = "opacity 0.4s ease";
      selectedPage.style.opacity = 1;
    }, 50);
  });
});

/* ========= Scroll Reveal Animation ========= */
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  revealElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) addClass(el, "visible");
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* ========= Contact Form Validation ========= */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form) {
  formInputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (form.checkValidity()) formBtn?.removeAttribute("disabled");
      else formBtn?.setAttribute("disabled", "");
    });
  });
}

/* ========= Theme Toggle ========= */
const themeBtn = document.querySelector(".theme-toggle");

const setTheme = (theme) => {
  document.body.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  themeBtn.innerHTML =
    theme === "dark"
      ? `<ion-icon name="sunny-outline"></ion-icon>`
      : `<ion-icon name="moon-outline"></ion-icon>`;
};

if (themeBtn) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme =
    localStorage.getItem("theme") || (prefersDark ? "dark" : "light");

  setTheme(savedTheme);

  themeBtn.addEventListener("click", () => {
    const newTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  });
}

/* ========= Floating Nav & Section Motion ========= */
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 60) addClass(navbar, "scrolled");
  else removeClass(navbar, "scrolled");
});

/* ========= Smooth Page Load Animation ========= */
window.addEventListener("load", () => {
  document.body.classList.add("page-loaded");
});

/* ========= Optional Scroll Progress Bar ========= */
const createScrollProgress = () => {
  const bar = document.createElement("div");
  bar.classList.add("scroll-progress");
  document.body.appendChild(bar);
  window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const width = (scrollTop / scrollHeight) * 100;
    bar.style.width = width + "%";
  });
};
createScrollProgress();

/* ========= Console Easter Egg ========= */
console.log(
  "%cHey there 👋🏽! Built by Bezawit Berhanu — sleek, smart, and built with purpose.",
  "color:#facc15;font-size:14px;"
);
