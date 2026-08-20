/* KIAAN Add-On Enhancements
   This file is independent from the existing script.js. */
(function () {
  "use strict";

  const whatsappNumber = "919558537188";
  const progress = document.getElementById("kiaanScrollProgress");
  const toast = document.getElementById("kiaanToast");
  const lightbox = document.getElementById("kiaanLightbox");
  const lightboxImage = document.getElementById("kiaanLightboxImage");
  const lightboxClose = document.getElementById("kiaanLightboxClose");

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 3500);
  }

  function updateScrollProgress() {
    if (!progress) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progress.style.width = Math.min(100, Math.max(0, percent)) + "%";
  }

  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  window.addEventListener("load", updateScrollProgress);

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  function openLightbox(image) {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || "KIAAN ETO gallery image";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  document.querySelectorAll(".gallery-item img, .gallery img").forEach(function (image) {
    image.classList.add("kiaan-gallery-clickable");
    image.addEventListener("click", function () {
      openLightbox(image);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeLightbox();
  });

  function getValue(form, selector) {
    const field = form.querySelector(selector);
    return field ? field.value.trim() : "";
  }

  function handleEnquiry(form) {
    const name = getValue(form, '[name="name"], [name="patientName"], #name');
    const phone = getValue(form, '[name="phone"], [name="phoneNumber"]');
    const email = getValue(form, '[name="email"]');
    const service = getValue(form, '[name="service"]');
    const facility = getValue(form, '[name="facility"], [name="hospital"]');
    const message = getValue(form, '[name="message"]');

    if (!name || !phone || !message) {
      showToast("Please fill Name, Phone and Message first.");
      return;
    }

    const whatsappText = [
      "Hello KIAAN ETO Centre, I want to send an enquiry.",
      "Name: " + name,
      "Phone: " + phone,
      email ? "Email: " + email : "",
      facility ? "Hospital/Clinic: " + facility : "",
      service ? "Service: " + service : "",
      "Message: " + message
    ].filter(Boolean).join("\n");

    const url = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(whatsappText);
    window.open(url, "_blank", "noopener");
    showToast("WhatsApp is opening with your enquiry.");
  }

  document.querySelectorAll("form").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      handleEnquiry(form);
    });
  });

  const currentYear = document.querySelector("[data-kiaan-current-year]");
  if (currentYear) currentYear.textContent = String(new Date().getFullYear());
})();
