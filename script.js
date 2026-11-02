(() => {
  const menuButton = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('is-open', !isOpen);
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    }));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        nav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
      }
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const progress = document.getElementById('scrollProgress');
  const updateProgress = () => {
    if (!progress) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progress.style.width = `${Math.min(percent, 100)}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        activeObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const form = document.getElementById('inquiryForm');
  const status = document.getElementById('formNote');
  const bookingFields = document.getElementById('bookingFields');
  const submitButton = document.getElementById('formSubmit');
  const pickupAddress = document.getElementById('pickupAddress');
  const deliveryAddress = document.getElementById('deliveryAddress');
  const sameAddress = document.getElementById('sameAddress');
  const pickupDate = document.getElementById('pickupDate');
  const service = document.getElementById('service');

  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  if (pickupDate) pickupDate.min = localToday;

  const selectedRequestType = () => form?.querySelector('input[name="requestType"]:checked')?.value || 'pickup';
  const updateRequestMode = () => {
    if (!form || !bookingFields) return;
    const isPickup = selectedRequestType() === 'pickup';
    bookingFields.hidden = !isPickup;
    bookingFields.disabled = !isPickup;
    if (submitButton) submitButton.innerHTML = isPickup
      ? 'Continue pickup request in WhatsApp <span aria-hidden="true">↗</span>'
      : 'Continue enquiry in WhatsApp <span aria-hidden="true">↗</span>';
    if (status) status.textContent = isPickup
      ? 'Your preferred date and time are a request, not a confirmed booking. Our team will confirm with you on WhatsApp. This static website does not store form entries.'
      : 'Your details will be used to prepare a WhatsApp message. The static website does not store form entries.';
  };

  form?.querySelectorAll('input[name="requestType"]').forEach((radio) => {
    radio.addEventListener('change', updateRequestMode);
  });

  const updateDeliveryAddress = () => {
    if (!deliveryAddress || !sameAddress) return;
    const isSame = sameAddress.checked;
    deliveryAddress.disabled = isSame;
    deliveryAddress.required = !isSame;
    deliveryAddress.placeholder = isSame ? 'Same as pickup address' : 'Enter the delivery address';
    if (isSame && pickupAddress) deliveryAddress.value = pickupAddress.value;
  };
  sameAddress?.addEventListener('change', updateDeliveryAddress);
  pickupAddress?.addEventListener('input', () => {
    if (sameAddress?.checked && deliveryAddress) deliveryAddress.value = pickupAddress.value;
  });
  updateDeliveryAddress();
  updateRequestMode();

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const values = new FormData(form);
    const isPickup = selectedRequestType() === 'pickup';
    const lines = [
      isPickup
        ? 'Hello KIAAN ETO Centre, I would like to request instrument pickup and delivery service.'
        : 'Hello KIAAN ETO Centre, I have a service enquiry.',
      `Name: ${values.get('name') || ''}`,
      `Hospital / clinic: ${values.get('facility') || ''}`,
      `Phone: ${values.get('phone') || ''}`,
      `Service: ${values.get('service') || ''}`,
    ];
    if (isPickup) {
      const same = Boolean(sameAddress?.checked);
      lines.push(
        `Pickup address: ${values.get('pickupAddress') || ''}`,
        `Preferred pickup date: ${values.get('pickupDate') || ''}`,
        `Preferred time: ${values.get('pickupWindow') || ''}`,
        `Approximate trays / boxes: ${values.get('quantity') || ''}`,
        `Delivery address: ${same ? (values.get('pickupAddress') || '') : (values.get('deliveryAddress') || '')}`,
      );
    }
    lines.push(`Additional details: ${values.get('message') || 'None'}`);

    const url = `https://wa.me/919558537188?text=${encodeURIComponent(lines.join('\n'))}`;
    if (status) status.textContent = 'Opening WhatsApp with your request. Please review the details and tap Send. Your preferred pickup is not confirmed until our team replies.';
    window.open(url, '_blank', 'noopener,noreferrer');
  });
})();
