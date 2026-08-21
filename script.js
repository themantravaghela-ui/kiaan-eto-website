(() => {
  "use strict";
  const whatsappNumber = "919558537188";
  const progress = document.getElementById("kiaanScrollProgress");
  const menuToggle = document.getElementById("menuToggle");
  const navbar = document.getElementById("navbar");
  const scrollTop = document.getElementById("scrollTop");
  const form = document.getElementById("kiaanContactForm");
  const status = document.getElementById("kiaanFormStatus");

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
      const open = navbar.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", String(open));
      const icon = menuToggle.querySelector("i");
      if (icon) { icon.classList.toggle("fa-bars", !open); icon.classList.toggle("fa-times", open); }
    });
    navbar.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      navbar.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    }));
  }

  const updateScrollUI = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    if (scrollTop) scrollTop.classList.toggle("active", window.scrollY > 500);
  };
  window.addEventListener("scroll", updateScrollUI, { passive: true });
  window.addEventListener("load", updateScrollUI);

  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener("click", event => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) { event.preventDefault(); target.scrollIntoView({ behavior: "smooth", block: "start" }); }
  }));

  const stats = document.querySelectorAll(".stat-number");
  const statsSection = document.querySelector(".stats");
  let animated = false;
  const animateStats = () => {
    if (animated || !statsSection) return;
    animated = true;
    stats.forEach(stat => {
      const target = Number(stat.dataset.target || 0);
      const decimal = stat.dataset.decimal === "true";
      const start = performance.now();
      const draw = now => {
        const progressValue = Math.min((now - start) / 1400, 1);
        const value = target * (1 - Math.pow(1 - progressValue, 3));
        stat.textContent = decimal ? value.toFixed(2) : Math.floor(value).toLocaleString("en-IN");
        if (progressValue < 1) requestAnimationFrame(draw);
        else stat.textContent = decimal ? target.toFixed(2) : target.toLocaleString("en-IN");
      };
      requestAnimationFrame(draw);
    });
  };
  if (statsSection && "IntersectionObserver" in window) {
    new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) animateStats(); }, { threshold: 0.3 }).observe(statsSection);
  } else animateStats();

  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const message = String(data.get("message") || "").trim();
      if (!name || !phone || !message) {
        if (status) status.textContent = "Please fill Name, Phone and Message.";
        return;
      }
      const text = [
        "Hello KIAAN ETO Centre, I want to send an enquiry.",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Hospital/Clinic: ${String(data.get("facility") || "Not provided").trim()}`,
        `Service: ${String(data.get("service") || "Not selected")}`,
        `Message: ${message}`
      ].join("\n");
      if (status) status.textContent = "Opening WhatsApp with your enquiry...";
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
      form.reset();
    });
  }
})();