/**
 * TECH SPOT - Interactive Application Logic
 * "One Solution For All" - Vandavasi, Tamil Nadu
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initLiveHours();
  initRepairEstimator();
  initSymptomChips();
  initServiceFilter();
  initMobileNav();
  initSmoothScroll();
  initFaqAccordion();
  initGalleryLightbox();
  initBackToTop();
  initCopyAddress();
});

/* ==========================================================================
   1. Live Store Status (9:00 AM - 10:00 PM IST every day)
   ========================================================================== */
function initLiveHours() {
  const statusBadge = document.getElementById('liveStatusBadge');
  const statusFull = document.querySelector('.status-full');
  const statusCompact = document.querySelector('.status-compact');
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Calculate current time in IST (UTC+5:30)
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istTime = new Date(utc + (3600000 * 5.5));
  
  const currentHour = istTime.getHours();
  const dayIndex = istTime.getDay();
  const currentDayName = days[dayIndex];
  
  // Highlight current day in the hours table
  const tableRows = document.querySelectorAll('.hours-table tr');
  tableRows.forEach(row => {
    const dayCell = row.querySelector('td:first-child');
    if (dayCell && dayCell.textContent.trim().toLowerCase() === currentDayName.toLowerCase()) {
      row.classList.add('current-day');
    }
  });

  // Store hours: 9:00 AM (9) to 10:00 PM (22)
  const isOpen = currentHour >= 9 && currentHour < 22;

  if (statusBadge) {
    if (isOpen) {
      statusBadge.classList.remove('closed');
      if (statusFull) statusFull.innerHTML = `<strong>Open Now</strong> &bull; Closes 10:00 PM`;
      if (statusCompact) statusCompact.textContent = 'Open Now';
    } else {
      statusBadge.classList.add('closed');
      if (statusFull) statusFull.innerHTML = `<strong>Closed Now</strong> &bull; Opens 9:00 AM`;
      if (statusCompact) statusCompact.textContent = 'Closed';
    }
  }
}

/* ==========================================================================
   2. Interactive Device Repair Estimator & Device Chips
   ========================================================================== */
const repairData = {
  mobile: {
    name: 'Mobile / Smartphone',
    issues: [
      { id: 'screen', name: 'Broken Screen / Display Replacement (OLED/LCD)', time: '30 - 45 Mins Express', warranty: '3 to 6 Months', priceGuide: '₹899 - ₹3,499' },
      { id: 'battery', name: 'Battery Drain / Battery Replacement', time: '20 - 30 Mins', warranty: '6 Months', priceGuide: '₹599 - ₹1,499' },
      { id: 'charging', name: 'Charging Port / Mic / Speaker Repair', time: '30 - 60 Mins', warranty: '3 Months', priceGuide: '₹350 - ₹750' },
      { id: 'water', name: 'Water / Liquid Damage Ultrasound Cleaning & Recovery', time: '2 - 4 Hours', warranty: 'Tested Warranty', priceGuide: '₹600 - ₹1,800' },
      { id: 'board', name: 'Chip-Level Motherboard / IC Repair', time: 'Same Day / 24 Hours', warranty: '1 Month', priceGuide: '₹800 - ₹2,500' },
      { id: 'software', name: 'Software Flashing / Unlocking / OS Restore', time: '30 - 60 Mins', warranty: 'Service Guarantee', priceGuide: '₹300 - ₹600' }
    ],
    brands: ['Apple iPhone', 'Samsung', 'OnePlus', 'Vivo', 'Oppo', 'Realme', 'Xiaomi / Redmi', 'Motorola', 'Poco', 'Other Brands']
  },
  laptop: {
    name: 'Laptop',
    issues: [
      { id: 'screen', name: 'Broken Display / Flickering Screen Replacement', time: 'Same Day (2 - 4 Hours)', warranty: '3 to 6 Months', priceGuide: '₹2,200 - ₹4,800' },
      { id: 'keyboard', name: 'Keyboard / Trackpad Replacement', time: '1 - 2 Hours', warranty: '3 Months', priceGuide: '₹750 - ₹1,800' },
      { id: 'battery', name: 'Laptop Battery Replacement (Original/OEM)', time: '30 Mins', warranty: '6 to 12 Months', priceGuide: '₹1,200 - ₹2,800' },
      { id: 'ssd_ram', name: 'Speed Boost: SSD Upgrade (256GB/512GB/1TB) + RAM', time: '45 - 90 Mins', warranty: '3 to 5 Years (Component)', priceGuide: '₹1,400 - ₹3,600' },
      { id: 'hinge', name: 'Broken Hinge / Body Fabrication Repair', time: 'Same Day', warranty: 'Fabrication Warranty', priceGuide: '₹600 - ₹1,500' },
      { id: 'overheat', name: 'Deep Cleaning & Thermal Paste Service', time: '1 Hour', warranty: 'Immediate Cooling Boost', priceGuide: '₹450 - ₹750' },
      { id: 'board', name: 'Motherboard Chip-Level Repair (No Display / Dead)', time: '24 - 48 Hours', warranty: '1 Month', priceGuide: '₹1,500 - ₹3,800' }
    ],
    brands: ['Dell', 'HP', 'Lenovo', 'Acer', 'Asus', 'Apple MacBook', 'MSI', 'Samsung']
  },
  desktop: {
    name: 'Desktop PC / Workstation',
    issues: [
      { id: 'power', name: 'No Power / SMPS Power Supply Replacement', time: '1 - 2 Hours', warranty: '1 to 2 Years', priceGuide: '₹850 - ₹1,900' },
      { id: 'slow', name: 'OS Installation (Win 11/10/Office) + Optimization', time: '1 - 2 Hours', warranty: 'Verified Setup', priceGuide: '₹400 - ₹600' },
      { id: 'custom_build', name: 'Custom Gaming / Business PC Assembly', time: 'Same Day', warranty: 'Full Component Warranties', priceGuide: 'Custom Config' },
      { id: 'data', name: 'Hard Drive Data Recovery', time: '1 - 3 Days', warranty: '100% Confidential', priceGuide: '₹900 - ₹3,500' }
    ],
    brands: ['Dell', 'HP', 'Lenovo', 'Custom Assembled', 'Acer', 'Asus']
  },
  cctv: {
    name: 'CCTV Security System',
    issues: [
      { id: 'install', name: 'New Complete CCTV Setup (Dome/Bullet IP/HD)', time: 'Scheduled Installation', warranty: '1 to 2 Years Warranty', priceGuide: 'Best Package Pricing' },
      { id: 'mobile_view', name: 'Remote Mobile Phone Live View Setup', time: '30 - 45 Mins', warranty: 'Tested Setup', priceGuide: '₹350 - ₹600' },
      { id: 'recording', name: 'DVR / NVR Hard Disk Not Recording', time: '1 - 2 Hours', warranty: 'Component Warranty', priceGuide: '₹500 - ₹2,800' },
      { id: 'camera_dead', name: 'Camera Video Loss / Night Vision Repair', time: 'Same Day', warranty: '3 Months', priceGuide: '₹400 - ₹1,200' }
    ],
    brands: ['Hikvision', 'CP Plus', 'Dahua', 'D-Link', 'HiLook']
  },
  printer: {
    name: 'Printer & Scanner',
    issues: [
      { id: 'refill', name: 'Ink Tank Refill / Laser Toner Cartridge Refilling', time: '20 - 40 Mins', warranty: 'Quality Print Guarantee', priceGuide: '₹300 - ₹550' },
      { id: 'head_clean', name: 'Print Head Clog / Line Streaks Cleaning', time: '1 - 2 Hours', warranty: 'Verified Clean Test', priceGuide: '₹400 - ₹800' },
      { id: 'paper_jam', name: 'Paper Jam / Roller Replacement', time: '1 - 2 Hours', warranty: '3 Months', priceGuide: '₹450 - ₹950' },
      { id: 'scanner', name: 'Scanner Error / Wi-Fi Network Setup', time: '45 Mins', warranty: 'Setup Guarantee', priceGuide: '₹350 - ₹600' }
    ],
    brands: ['HP', 'Epson', 'Canon', 'Brother']
  }
};

function initRepairEstimator() {
  const deviceSelect = document.getElementById('estimatorDevice');
  const brandSelect = document.getElementById('estimatorBrand');
  const issueSelect = document.getElementById('estimatorIssue');
  const deviceChips = document.querySelectorAll('#deviceChipsBar .device-chip');
  
  const resDevice = document.getElementById('resDevice');
  const resBrand = document.getElementById('resBrand');
  const resIssue = document.getElementById('resIssue');
  const resTime = document.getElementById('resTime');
  const resWarranty = document.getElementById('resWarranty');
  const resPrice = document.getElementById('resPrice');
  const whatsappBookBtn = document.getElementById('whatsappBookBtn');
  const copyQuoteBtn = document.getElementById('copyQuoteBtn');

  if (!deviceSelect) return;

  function syncDeviceChips(selectedKey) {
    deviceChips.forEach(chip => {
      if (chip.getAttribute('data-device') === selectedKey) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
  }

  function updateBrandsAndIssues() {
    const selectedDeviceKey = deviceSelect.value;
    const deviceData = repairData[selectedDeviceKey] || repairData.mobile;
    
    syncDeviceChips(selectedDeviceKey);

    // Populate brands
    brandSelect.innerHTML = '';
    deviceData.brands.forEach(b => {
      const opt = document.createElement('option');
      opt.value = b;
      opt.textContent = b;
      brandSelect.appendChild(opt);
    });

    // Populate issues
    issueSelect.innerHTML = '';
    deviceData.issues.forEach(issue => {
      const opt = document.createElement('option');
      opt.value = issue.id;
      opt.textContent = issue.name;
      issueSelect.appendChild(opt);
    });

    calculateEstimate();
  }

  function calculateEstimate() {
    const deviceKey = deviceSelect.value;
    const deviceData = repairData[deviceKey] || repairData.mobile;
    const selectedBrand = brandSelect.value;
    const selectedIssueId = issueSelect.value;

    const issueObj = deviceData.issues.find(i => i.id === selectedIssueId) || deviceData.issues[0];

    if (resDevice) resDevice.textContent = deviceData.name;
    if (resBrand) resBrand.textContent = selectedBrand;
    if (resIssue) resIssue.textContent = issueObj ? issueObj.name : 'Standard Service';
    if (resTime) resTime.textContent = issueObj ? issueObj.time : 'Fast Service';
    if (resWarranty) resWarranty.textContent = issueObj ? issueObj.warranty : 'Standard Warranty';
    if (resPrice) resPrice.textContent = issueObj ? issueObj.priceGuide : 'Contact for Quote';

    // WhatsApp Direct Link Generator
    if (whatsappBookBtn) {
      const rawMsg = `Hello Tech Spot! 👋\nI need service/repair for my *${deviceData.name}* (*${selectedBrand}*).\n*Issue:* ${issueObj ? issueObj.name : 'General checkup'}.\n*Estimated Time:* ${issueObj ? issueObj.time : 'Fast'}\n*Estimated Cost:* ${issueObj ? issueObj.priceGuide : 'Quote requested'}\nPlease confirm when I can visit your Vandavasi store!`;
      const encoded = encodeURIComponent(rawMsg);
      whatsappBookBtn.href = `https://wa.me/918838118304?text=${encoded}`;
    }
  }

  // Device Chip Click Handlers
  deviceChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const targetDevice = chip.getAttribute('data-device');
      deviceSelect.value = targetDevice;
      updateBrandsAndIssues();
    });
  });

  deviceSelect.addEventListener('change', updateBrandsAndIssues);
  brandSelect.addEventListener('change', calculateEstimate);
  issueSelect.addEventListener('change', calculateEstimate);

  // Copy Quote Button Handler
  if (copyQuoteBtn) {
    copyQuoteBtn.addEventListener('click', () => {
      const textToCopy = `TECH SPOT Repair Quote:\nDevice: ${resDevice.textContent}\nBrand: ${resBrand.textContent}\nIssue: ${resIssue.textContent}\nTime: ${resTime.textContent}\nWarranty: ${resWarranty.textContent}\nEstimate: ${resPrice.textContent}\nStore: Kottaimoolai, Vandavasi (Phone: 088381 18304)`;
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('Repair quote copied to clipboard!');
      }).catch(() => {
        showToast('Quote ready for booking!');
      });
    });
  }

  // Initialize
  updateBrandsAndIssues();
}

/* ==========================================================================
   3. Quick Symptom Selector (Mobile Spotlight -> Estimator Connection)
   ========================================================================== */
function initSymptomChips() {
  const symptomChips = document.querySelectorAll('.symptom-chip');
  const deviceSelect = document.getElementById('estimatorDevice');
  const issueSelect = document.getElementById('estimatorIssue');
  const estimatorSection = document.getElementById('estimator');

  symptomChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const issueId = chip.getAttribute('data-issue');
      
      // Ensure mobile is selected
      if (deviceSelect) {
        deviceSelect.value = 'mobile';
        deviceSelect.dispatchEvent(new Event('change'));
      }

      // Select issue
      if (issueSelect) {
        setTimeout(() => {
          issueSelect.value = issueId;
          issueSelect.dispatchEvent(new Event('change'));
        }, 50);
      }

      // Smooth scroll to estimator
      if (estimatorSection) {
        estimatorSection.scrollIntoView({ behavior: 'smooth' });
      }

      showToast('Calculated repair estimate for selected issue!');
    });
  });
}

/* ==========================================================================
   4. Service Filtering Tabs
   ========================================================================== */
function initServiceFilter() {
  const tabBtns = document.querySelectorAll('.service-tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Mobile Slide-Out Drawer & Overlay
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-nav-link');

  function openDrawer() {
    if (drawer) drawer.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   6. FAQ Accordion Logic
   ========================================================================== */
function initFaqAccordion() {
  const faqCards = document.querySelectorAll('.faq-card');

  faqCards.forEach(card => {
    const questionBtn = card.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isAlreadyActive = card.classList.contains('active');

      // Close all cards
      faqCards.forEach(c => {
        c.classList.remove('active');
        const btn = c.querySelector('.faq-question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      // If clicked card wasn't active, open it
      if (!isAlreadyActive) {
        card.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   7. Interactive Gallery Lightbox Modal
   ========================================================================== */
function initGalleryLightbox() {
  const galleryCards = document.querySelectorAll('.gallery-card[data-img]');
  const modal = document.getElementById('galleryLightbox');
  const modalImg = document.getElementById('lightboxImg');
  const modalCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxCloseBtn');
  const backdrop = document.getElementById('lightboxBackdrop');

  if (!modal) return;

  function openLightbox(imgSrc, captionText) {
    if (modalImg) modalImg.src = imgSrc;
    if (modalCaption) modalCaption.textContent = captionText;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const imgSrc = card.getAttribute('data-img');
      const caption = card.getAttribute('data-caption') || '';
      openLightbox(imgSrc, caption);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeLightbox();
    }
  });
}

/* ==========================================================================
   8. Back To Top Floating Action Button
   ========================================================================== */
function initBackToTop() {
  const topBtn = document.getElementById('backToTopBtn');
  if (!topBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 380) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  });

  topBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   9. One-Click Store Address Copy
   ========================================================================== */
function initCopyAddress() {
  const copyBtn = document.getElementById('copyAddressBtn');
  const addressText = document.getElementById('storeAddressText');

  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const text = addressText ? addressText.textContent.trim() : 'TECH SPOT, Kottaimollai, Kottai Moolai, Vandavasi, Tamil Nadu – 604408, India';
    navigator.clipboard.writeText(text).then(() => {
      showToast('Store address copied to clipboard!');
    }).catch(() => {
      showToast('Address: Kottaimoolai, Vandavasi - 604408');
    });
  });
}

/* ==========================================================================
   10. Toast Notification Helper
   ========================================================================== */
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast) return;

  if (toastMsg) toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

/* ==========================================================================
   11. Smooth Scroll & Active Link Tracking
   ========================================================================== */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach(sec => {
      const sectionTop = sec.offsetTop;
      const sectionHeight = sec.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   12. Contact / Quick Inquire Form Handler
   ========================================================================== */
window.handleQuickInquiry = function(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('[name="name"]').value;
  const phone = form.querySelector('[name="phone"]').value;
  const service = form.querySelector('[name="service"]').value;
  const note = form.querySelector('[name="note"]').value;

  const msg = `Hi Tech Spot! 🚀\n*Name:* ${name}\n*Phone:* ${phone}\n*Service Requested:* ${service}\n*Details:* ${note || 'None'}\n\nPlease confirm availability.`;
  const encoded = encodeURIComponent(msg);
  
  // Open WhatsApp in new tab
  window.open(`https://wa.me/918838118304?text=${encoded}`, '_blank');
  
  showToast(`Thank you ${name}! Opening WhatsApp directly.`);
  form.reset();
};

/* ==========================================================================
   13. Dynamic Theme Switcher (Dark Cyber Luxe & Titanium Clean Light)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const drawerThemeBtn = document.getElementById('drawerThemeBtn');
  const drawerThemeIcon = document.getElementById('drawerThemeIcon');
  const drawerThemeText = document.getElementById('drawerThemeText');
  
  // Force clean professional light theme on load
  const savedTheme = 'light';
  applyTheme('light', false);

  function applyTheme(theme, showFeedback = true) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('techspot_theme', theme);

    const isLight = theme === 'light';
    
    // In light mode, show Moon icon so user can switch to dark mode.
    // In dark mode, show Sun icon so user can switch to light mode.
    if (toggleBtn) {
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.className = isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
      }
      toggleBtn.setAttribute('title', isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode');
    }

    // Update Drawer Toggle
    if (drawerThemeIcon) {
      drawerThemeIcon.className = isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    }
    if (drawerThemeText) {
      drawerThemeText.textContent = isLight ? 'Light Mode (Active)' : 'Dark Mode (Active)';
    }

    if (showFeedback && typeof showToast === 'function') {
      showToast(isLight ? '☀️ Clean Professional Light Theme Activated' : '🌙 Cyber Dark Theme Activated');
    }
  }

  function toggle() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme, true);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggle);
  }
  if (drawerThemeBtn) {
    drawerThemeBtn.addEventListener('click', toggle);
  }
}
