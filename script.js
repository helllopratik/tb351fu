const yearNode = document.querySelector("#year");
const themeButtons = document.querySelectorAll(".theme-button");
const themeStorageKey = "tb351fu-theme";
const availableThemes = new Set(["ocean", "graphite", "amoled"]);

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const applyTheme = (themeName) => {
  if (!availableThemes.has(themeName)) {
    return;
  }

  document.body.dataset.theme = themeName;

  themeButtons.forEach((button) => {
    const isActive = button.dataset.themeValue === themeName;

    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  try {
    localStorage.setItem(themeStorageKey, themeName);
  } catch (error) {
    // Ignore storage failures and keep the selected theme for the current session.
  }
};

if (themeButtons.length > 0) {
  let initialTheme = document.body.dataset.theme || "ocean";

  try {
    const savedTheme = localStorage.getItem(themeStorageKey);

    if (savedTheme && availableThemes.has(savedTheme)) {
      initialTheme = savedTheme;
    }
  } catch (error) {
    // Ignore storage failures and keep the default theme.
  }

  applyTheme(initialTheme);

  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyTheme(button.dataset.themeValue);
    });
  });
}

const revealNodes = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -6% 0px",
    },
  );

  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}
