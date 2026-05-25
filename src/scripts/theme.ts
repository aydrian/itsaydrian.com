/* Theme toggle (light / dark / system), header scroll state, IntersectionObserver mount */
(function () {
  "use strict";

  const STORAGE = "theme-preference";
  const root = document.documentElement;

  /* --------------------------------------------- Theme */
  function resolve(pref: string): "light" | "dark" {
    if (pref === "light" || pref === "dark") return pref;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function apply(pref: string) {
    const resolved = resolve(pref);
    root.classList.toggle("dark", resolved === "dark");
    root.dataset.themePreference = pref;
    syncToggle(pref);
  }

  function syncToggle(pref: string) {
    document.querySelectorAll("[data-theme-set]").forEach((btn) => {
      btn.setAttribute("aria-pressed", (btn as HTMLElement).dataset.themeSet === pref ? "true" : "false");
    });
  }

  function init() {
    const stored = localStorage.getItem(STORAGE);
    const pref = stored === "light" || stored === "dark" ? stored : "system";
    apply(pref);

    document.querySelectorAll("[data-theme-set]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = (btn as HTMLElement).dataset.themeSet || "system";
        if (next === "system") localStorage.removeItem(STORAGE);
        else localStorage.setItem(STORAGE, next);
        apply(next);
      });
    });

    /* Live OS theme change while in system mode */
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    mql.addEventListener("change", () => {
      if (root.dataset.themePreference === "system") apply("system");
    });
  }

  /* --------------------------------------------- Header scroll state */
  function scrollWatcher() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const set = () => header.setAttribute("data-scrolled", window.scrollY > 12 ? "true" : "false");
    set();
    window.addEventListener("scroll", set, { passive: true });
  }

  /* --------------------------------------------- Mount-in animation */
  function reveal() {
    /* Opt into the JS-driven animation track. Without this class, .rise is
       always visible — so disabled JS, missing IntersectionObserver, or a
       slow-loading script never leaves the page blank. */
    root.classList.add("has-anim");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      document.querySelectorAll(".rise").forEach(el => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

    document.querySelectorAll(".rise").forEach(el => io.observe(el));

    /* Safety net: any element still hidden after 1500ms gets revealed. */
    setTimeout(() => {
      document.querySelectorAll(".rise:not(.is-in)").forEach(el => el.classList.add("is-in"));
    }, 1500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => { init(); scrollWatcher(); reveal(); });
  } else {
    init(); scrollWatcher(); reveal();
  }
})();
