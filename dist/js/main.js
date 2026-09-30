/* Navbar Portal Kampus: Dynamic HTML Loader + Interaktivitas UI */

document.addEventListener("DOMContentLoaded", async () => {
  // FETCH / INJECT HTML
  const loadComponents = async () => {
    const elements = document.querySelectorAll("[data-include]");

    // Gunakan Promise.all agar semua komponen selesai di-fetch secara bersamaan
    const promises = Array.from(elements).map(async (el) => {
      const file = el.getAttribute("data-include");
      if (!file) return;

      try {
        const response = await fetch(file);
        if (response.ok) {
          const html = await response.text();
          el.outerHTML = html; // Ganti div placeholder dengan komponen asli
        } else {
          console.error(`Gagal memuat: ${file}`);
        }
      } catch (err) {
        console.error(`Error fetching ${file}:`, err);
      }
    });

    await Promise.all(promises);
  };

  // Tunggu hingga semua elemen HTML berhasil disisipkan ke DOM
  await loadComponents();

  // SETELAH DOM LENGKAP, JALANKAN LOGIKA JAVASCRIPT
  initUI();
  // Inisialisasi JS Modal
  initModal();
  scrollToHash();
  // Konten Detail
  window.initPrestasiDetail?.();
  window.initKarirDetail?.();
  window.initKeagamaanDetail?.();
  window.initSyiarDetail?.();
});

// --- LOGIKA INTERAKSI ---
function initUI() {
  const nav = document.querySelector("[data-nav]");
  const menuButton = document.querySelector("[data-menu-button]");
  const menu = document.querySelector("[data-menu]");
  const menuIconOpen = document.querySelector("[data-icon-open]");
  const menuIconClose = document.querySelector("[data-icon-close]");

  // --- Navbar menebal saat discroll ---
  const setScrolled = () => {
    if (!nav) return;
    if (window.scrollY > 8) {
      nav.setAttribute("data-scrolled", "");
    } else {
      nav.removeAttribute("data-scrolled");
    }
  };
  setScrolled();
  window.addEventListener("scroll", setScrolled, { passive: true });

  // --- Menu mobile (akordeon) ---
  const closeMobileMenu = () => {
    if (!menu) return;
    menu.classList.add("hidden");
    menuButton?.setAttribute("aria-expanded", "false");
    menuIconOpen?.classList.remove("hidden");
    menuIconClose?.classList.add("hidden");
    document
      .querySelectorAll("[data-mobile-submenu]")
      .forEach((el) => el.classList.add("hidden"));
  };

  const openMobileMenu = () => {
    if (!menu) return;
    menu.classList.remove("hidden");
    menuButton?.setAttribute("aria-expanded", "true");
    menuIconOpen?.classList.add("hidden");
    menuIconClose?.classList.remove("hidden");
  };

  menuButton?.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    isOpen ? closeMobileMenu() : openMobileMenu();
  });

  document
    .querySelectorAll("[data-mobile-submenu-toggle]")
    .forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const submenu = toggle.nextElementSibling;
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        submenu?.classList.toggle("hidden");
        toggle.querySelector("[data-chevron]")?.classList.toggle("rotate-180");
      });
    });

  // Tautan di dalam menu (anchor) menutup menu mobile setelah diklik
  document.querySelectorAll("[data-menu] a").forEach((a) => {
    a.addEventListener("click", () => closeMobileMenu());
  });

  document.addEventListener("click", (e) => {
    if (nav && !nav.contains(e.target)) closeMobileMenu();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileMenu();
  });

  // --- Dropdown desktop ---
  const closeAllDropdowns = () => {
    document
      .querySelectorAll("[data-dropdown-button]")
      .forEach((b) => b.setAttribute("aria-expanded", "false"));
    document
      .querySelectorAll("[data-dropdown-panel]")
      .forEach((p) =>
        p.classList.add("invisible", "opacity-0", "translate-y-1"),
      );
  };

  document.querySelectorAll("[data-dropdown]").forEach((dropdown) => {
    const button = dropdown.querySelector("[data-dropdown-button]");
    const panel = dropdown.querySelector("[data-dropdown-panel]");

    if (!button || !panel) return;

    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = button.getAttribute("aria-expanded") === "true";
      closeAllDropdowns();
      if (!isOpen) {
        panel.classList.remove("invisible", "opacity-0", "translate-y-1");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Klik tautan di dalam panel dropdown
  document.querySelectorAll("[data-dropdown-link]").forEach((a) => {
    a.addEventListener("click", () => closeAllDropdowns());
  });

  document.addEventListener("click", () => closeAllDropdowns());

  // --- Scroll-spy ---
  const sectionToGroup = new Map();
  document.querySelectorAll("[data-section-group]").forEach((el) => {
    const group = el.getAttribute("data-section-group");
    el.querySelectorAll('a[href^="#"]').forEach((a) => {
      const id = a.getAttribute("href").slice(1);
      sectionToGroup.set(id, group);
    });
  });

  const simpleLinks = document.querySelectorAll("[data-nav-link]");
  const groupButtons = document.querySelectorAll("[data-nav-group]");

  const setActive = (sectionId) => {
    const group = sectionToGroup.get(sectionId);

    simpleLinks.forEach((a) => {
      const isBeranda =
        sectionId === "beranda" && a.dataset.section === "beranda";
      a.setAttribute("aria-current", isBeranda ? "true" : "false");
    });

    groupButtons.forEach((btn) => {
      const parent = btn.closest("[data-section-group]");
      const btnGroup = parent
        ? parent.getAttribute("data-section-group")
        : null;
      btn.setAttribute(
        "aria-current",
        group && btnGroup === group ? "true" : "false",
      );
    });
  };

  const sections = document.querySelectorAll("main [id]");
  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((section) => observer.observe(section));
  }
}

// Modal Function
function initModal() {
  // Buka Modal berdasarkan ID yang ditentukan pada tombol/card
  document.querySelectorAll("[data-modal-open]").forEach((button) => {
    button.addEventListener("click", () => {
      const targetModalId = button.getAttribute("data-modal-open");
      const targetModal = document.getElementById(targetModalId);
      if (targetModal) {
        targetModal.showModal();
      }
    });
  });

  // Tutup Modal yang sedang terbuka saat tombol [data-modal-close] diklik
  document.querySelectorAll("[data-modal-close]").forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest("dialog");
      if (modal) {
        modal.close();
      }
    });
  });

  // (Opsional) Tutup modal ketika mengklik area di luar kotak modal (backdrop)
  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        dialog.close();
      }
    });
  });
}

// Scroll ke anchor di URL (mis. index.html#prestasi) setelah komponen tersisip
function scrollToHash() {
  const { hash } = window.location;
  if (!hash) return;

  const jump = () => {
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target) target.scrollIntoView();
  };

  jump();
  // Ulangi setelah gambar selesai dimuat, karena tinggi halaman bisa bergeser
  window.addEventListener("load", jump, { once: true });
}
