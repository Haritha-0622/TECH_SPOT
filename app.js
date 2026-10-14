/**
 * TECH SPOT - Interactive Application Logic
 * "One Solution For All" - Vandavasi, Tamil Nadu
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveHours();
  initRepairEstimator();
  initServiceFilter();
  initMobileNav();
  initSmoothScroll();
});

/* ==========================================================================
   1. Live Store Status (9:00 AM - 10:00 PM IST every day)
   ========================================================================== */
function initLiveHours() {
  const statusBadge = document.getElementById('liveStatusBadge');
  const statusText = document.getElementById('statusText');
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Calculate current time in IST (UTC+5:30)
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istTime = new Date(utc + (3600000 * 5.5));
  
  const currentHour = istTime.getHours();
  const currentMinute = istTime.getMinutes();
  const dayIndex = istTime.getDay();
  const currentDayName = days[dayIndex];
  
  // Highlight current day in the hours table
  const tableRows = document.querySelectorAll('.hours-table tr');
  tableRows.forEach(row => {
    const dayCell = row.querySelector('td:first-child');
    if (dayCell && dayCell.textContent.trim() === currentDayName) {
      row.classList.add('current-day');
    }
  });

  // Store hours: 9:00 AM (9) to 10:00 PM (22)
  const isOpen = currentHour >= 9 && currentHour < 22;

  if (statusBadge && statusText) {
    if (isOpen) {
      statusBadge.classList.remove('closed');
      statusText.innerHTML = `<strong>Open Now</strong> &bull; Closes 10:00 PM`;
    } else {
      statusBadge.classList.add('closed');
      statusText.innerHTML = `<strong>Closed Now</strong> &bull; Opens 9:00 AM`;
    }
  }
}

/* ==========================================================================
   2. Interactive Device Repair Estimator
   ========================================================================== */
const repairData = {
  mobile: {
    name: 'Mobile / Smartphone',
    issues: [
      { id: 'screen', name: 'Broken Screen / Display Replacement (OLED/LCD)', time: '30 - 45 Mins Express', warranty: '3 to 6 Months', priceGuide: '₹899 - ₹3,499 (Depending on Model)' },
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
    name: 'Desktop PC / Custom Rig',
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
  
  const resDevice = document.getElementById('resDevice');
  const resBrand = document.getElementById('resBrand');
  const resIssue = document.getElementById('resIssue');
  const resTime = document.getElementById('resTime');
  const resWarranty = document.getElementById('resWarranty');
  const resPrice = document.getElementById('resPrice');
  const whatsappBookBtn = document.getElementById('whatsappBookBtn');

  if (!deviceSelect) return;

  function updateBrandsAndIssues() {
    const selectedDeviceKey = deviceSelect.value;
    const deviceData = repairData[selectedDeviceKey];
    
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
    const deviceData = repairData[deviceKey];
    const selectedBrand = brandSelect.value;
    const selectedIssueId = issueSelect.value;

    const issueObj = deviceData.issues.find(i => i.id === selectedIssueId) || deviceData.issues[0];

    resDevice.textContent = deviceData.name;
    resBrand.textContent = selectedBrand;
    resIssue.textContent = issueObj ? issueObj.name : 'Standard Service';
    resTime.textContent = issueObj ? issueObj.time : 'Fast Service';
    resWarranty.textContent = issueObj ? issueObj.warranty : 'Standard Warranty';
    resPrice.textContent = issueObj ? issueObj.priceGuide : 'Contact for Quote';

    // WhatsApp Direct Link Generator
    const rawMsg = `Hello Tech Spot! 👋\nI need service/repair for my *${deviceData.name}* (*${selectedBrand}*).\n*Issue:* ${issueObj ? issueObj.name : 'General checkup'}.\nPlease let me know when I can bring it to your Vandavasi store!`;
    const encoded = encodeURIComponent(rawMsg);
    whatsappBookBtn.href = `https://wa.me/918838118304?text=${encoded}`;
  }

  deviceSelect.addEventListener('change', updateBrandsAndIssues);
  brandSelect.addEventListener('change', calculateEstimate);
  issueSelect.addEventListener('change', calculateEstimate);

  // Initialize with mobile default
  updateBrandsAndIssues();
}

/* ==========================================================================
   3. Service Filtering Tabs
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
   4. Mobile Navigation Drawer Toggle
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.mobile-drawer .nav-link');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.toggle('active');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('active');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }
}

/* ==========================================================================
   5. Smooth Scroll & Active Link Tracking
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
   6. Contact / Quick Inquire Form Handler
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
  
  // Show thank you modal/alert
  alert(`Thank you ${name}! Opening WhatsApp to connect with Tech Spot technicians directly.`);
  form.reset();
};
