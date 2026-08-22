import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAJm0LiLJchN86HzeCJHn3qKqdOhv0H_DE",
  authDomain: "niranjan-58d39.firebaseapp.com",
  projectId: "niranjan-58d39",
  storageBucket: "niranjan-58d39.firebasestorage.app",
  messagingSenderId: "686044853285",
  appId: "1:686044853285:web:5b08fbac20d2c80bdd7bcc",
  measurementId: "G-L30Y7NK061"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ─── Preferred Staff Ordering for Information Technology ───────────────────
const IT_STAFF_PREFERRED_ORDER = [
  { keywords: ["selvi"], rank: 1 },
  { keywords: ["priskilla", "priscilla", "priskila", "priscila"], rank: 2 },
  { keywords: ["mohan raj", "mohanraj", "mohan"], rank: 3 },
  { keywords: ["gayathri", "gayatri"], rank: 4 },
  { keywords: ["babitha", "babita"], rank: 5 },
  { keywords: ["abinaya", "abhinaya"], rank: 6 },
  { keywords: ["shruthi", "shruti", "suruthi", "sruthi", "sruti", "suruti"], rank: 7 },
  { keywords: ["padmapriya", "padma priya", "padmapiriya", "padma piriya", "padma"], rank: 8 },
  { keywords: ["vidhya", "vidya"], rank: 9 },
  { keywords: ["lalitha", "lalita"], rank: 10 },
  { keywords: ["kannan", "chenna krishnan", "krishnan"], rank: 11 },
  { keywords: ["aravind", "aravindh", "gosh"], rank: 12 },
  { keywords: ["sowndhariya", "sowndarya", "soundarya", "soundhariya"], rank: 13 },
  { keywords: ["angelin", "angelin joy", "joy"], rank: 14 },
  { keywords: ["umamaheswari", "uma maheswari", "umamaheshwari", "uma maheshwari"], rank: 15 }
];

function getITStaffRank(staff) {
  const nameStr = [
    staff.title || "",
    staff.firstName || "",
    staff.lastName || "",
    staff.name || "",
    staff.fullName || ""
  ].join(" ").toLowerCase();

  for (let i = 0; i < IT_STAFF_PREFERRED_ORDER.length; i++) {
    const item = IT_STAFF_PREFERRED_ORDER[i];
    if (item.keywords.some(kw => nameStr.includes(kw))) {
      return item.rank;
    }
  }
  return 999;
}

// ─── Preferred Staff Ordering for Computer Science & Engineering ───────────
const CSE_STAFF_PREFERRED_ORDER = [
  { keywords: ["aarthi"], rank: 1 },
  { keywords: ["sandhya"], rank: 2 },
  { keywords: ["jerin", "mahibha"], rank: 3 },
  { keywords: ["sundari"], rank: 4 },
  { keywords: ["yamuna"], rank: 5 },
  { keywords: ["nithya"], rank: 6 },
  { keywords: ["sowmiya"], rank: 7 },
  { keywords: ["kasithangam"], rank: 8 },
  { keywords: ["shafrin", "jeba"], rank: 9 },
  { keywords: ["preethi"], rank: 10 },
  { keywords: ["jebima", "jessy"], rank: 11 },
  { keywords: ["arnold"], rank: 12 },
  { keywords: ["meenachi"], rank: 13 },
  { keywords: ["jeevan"], rank: 14 },
  { keywords: ["kaviya"], rank: 15 },
  { keywords: ["haritha"], rank: 16 }
];

function getCSEStaffRank(staff) {
  const nameStr = [
    staff.title || "",
    staff.firstName || "",
    staff.lastName || "",
    staff.name || "",
    staff.fullName || ""
  ].join(" ").toLowerCase();

  for (let i = 0; i < CSE_STAFF_PREFERRED_ORDER.length; i++) {
    const item = CSE_STAFF_PREFERRED_ORDER[i];
    if (item.keywords.some(kw => nameStr.includes(kw))) {
      return item.rank;
    }
  }
  return 999;
}

const AIDS_STAFF_PREFERRED_ORDER = [
  { keywords: ["mathangi"], rank: 1 },
  { keywords: ["dhivya"], rank: 2 },
  { keywords: ["ramasubramanian"], rank: 3 },
  { keywords: ["madhurikkha", "madhurikha"], rank: 4 },
  { keywords: ["jaya", "priya"], rank: 5 },
  { keywords: ["valentina", "puffi"], rank: 6 },
  { keywords: ["swathy"], rank: 7 },
  { keywords: ["prema"], rank: 8 },
  { keywords: ["punitha"], rank: 9 },
  { keywords: ["reenie", "tanya"], rank: 10 },
  { keywords: ["parthiban"], rank: 11 },
  { keywords: ["tameem", "parvana"], rank: 12 },
  { keywords: ["vinothini"], rank: 13 },
  { keywords: ["hemalatha"], rank: 14 },
  { keywords: ["vetrivel", "murugan"], rank: 15 }
];

function getAIDSStaffRank(staff) {
  const nameStr = [
    staff.title || "",
    staff.firstName || "",
    staff.lastName || "",
    staff.name || "",
    staff.fullName || ""
  ].join(" ").toLowerCase();

  for (let i = 0; i < AIDS_STAFF_PREFERRED_ORDER.length; i++) {
    const item = AIDS_STAFF_PREFERRED_ORDER[i];
    if (item.keywords.some(kw => nameStr.includes(kw))) {
      return item.rank;
    }
  }
  return 999;
}

const EEE_STAFF_PREFERRED_ORDER = [
  { keywords: ["maya"], rank: 1 },
  { keywords: ["venkatesh"], rank: 2 },
  { keywords: ["mahalakshmi"], rank: 3 },
  { keywords: ["saji"], rank: 4 },
  { keywords: ["rajeswari", "rajeshwari"], rank: 5 },
  { keywords: ["vanathi"], rank: 6 },
  { keywords: ["manikandan"], rank: 7 },
  { keywords: ["bhasker", "bhaskar"], rank: 8 },
  { keywords: ["sivasubramaniyan", "sivasubramanian"], rank: 9 },
  { keywords: ["angelin", "stefi", "steffi"], rank: 10 },
  { keywords: ["hamsavalli"], rank: 11 },
  { keywords: ["nadhia", "nadhiya"], rank: 12 },
  { keywords: ["irfana"], rank: 13 },
  { keywords: ["shanmathi", "sanmathi"], rank: 14 }
];

function getEEEStaffRank(staff) {
  const nameStr = [
    staff.title || "",
    staff.firstName || "",
    staff.lastName || "",
    staff.name || "",
    staff.fullName || ""
  ].join(" ").toLowerCase();

  for (let i = 0; i < EEE_STAFF_PREFERRED_ORDER.length; i++) {
    const item = EEE_STAFF_PREFERRED_ORDER[i];
    if (item.keywords.some(kw => nameStr.includes(kw))) {
      return item.rank;
    }
  }
  return 999;
}

const ECE_STAFF_PREFERRED_ORDER = [
  { keywords: ["arul", "karthick"], rank: 1 },
  { keywords: ["sheeba", "joice"], rank: 2 },
  { keywords: ["babiyola"], rank: 3 },
  { keywords: ["siji", "sivanandan"], rank: 4 },
  { keywords: ["balasubramanian"], rank: 5 },
  { keywords: ["meenakshi"], rank: 6 },
  { keywords: ["sowmya"], rank: 7 },
  { keywords: ["vinoth"], rank: 8 },
  { keywords: ["nooruuzzaman", "khan"], rank: 9 },
  { keywords: ["satheesh"], rank: 10 },
  { keywords: ["velu"], rank: 11 },
  { keywords: ["r.lakshmi", "r. lakshmi", "r lakshmi"], rank: 12 },
  { keywords: ["annamalai"], rank: 13 },
  { keywords: ["sasikala"], rank: 14 },
  { keywords: ["arif"], rank: 15 },
  { keywords: ["selvarani"], rank: 16 },
  { keywords: ["mahalakshmi"], rank: 17 },
  { keywords: ["sandhya"], rank: 18 },
  { keywords: ["durkadevi"], rank: 19 },
  { keywords: ["nadhiya"], rank: 20 },
  { keywords: ["krithika"], rank: 21 },
  { keywords: ["janani"], rank: 22 },
  { keywords: ["sruthi"], rank: 23 }
];

function getECEStaffRank(staff) {
  const nameStr = [
    staff.title || "",
    staff.firstName || "",
    staff.lastName || "",
    staff.name || "",
    staff.fullName || ""
  ].join(" ").toLowerCase();

  for (let i = 0; i < ECE_STAFF_PREFERRED_ORDER.length; i++) {
    const item = ECE_STAFF_PREFERRED_ORDER[i];
    if (item.keywords.some(kw => nameStr.includes(kw))) {
      return item.rank;
    }
  }
  return 999;
}

const CIVIL_STAFF_PREFERRED_ORDER = [
  { keywords: ["poongothai"], rank: 1 },
  { keywords: ["arivazhagan", "arivazaghan"], rank: 2 },
  { keywords: ["asha"], rank: 3 },
  { keywords: ["nirmalambal"], rank: 4 },
  { keywords: ["ponni"], rank: 5 },
  { keywords: ["dhanasekar"], rank: 6 },
  { keywords: ["anbuneema", "anbu", "neema"], rank: 7 },
  { keywords: ["malinigayathri", "malini"], rank: 8 },
  { keywords: ["saravanan"], rank: 9 },
  { keywords: ["ravikumar"], rank: 10 },
  { keywords: ["raja"], rank: 11 },
  { keywords: ["saranya"], rank: 12 },
  { keywords: ["jothilakshmi"], rank: 13 },
  { keywords: ["nanthini"], rank: 14 },
  { keywords: ["vishnuvardhan"], rank: 15 }
];

function getCivilStaffRank(staff) {
  const nameStr = [
    staff.title || "",
    staff.firstName || "",
    staff.lastName || "",
    staff.name || "",
    staff.fullName || ""
  ].join(" ").toLowerCase();

  for (let i = 0; i < CIVIL_STAFF_PREFERRED_ORDER.length; i++) {
    const item = CIVIL_STAFF_PREFERRED_ORDER[i];
    if (item.keywords.some(kw => nameStr.includes(kw))) {
      return item.rank;
    }
  }
  return 999;
}
const getCIVILStaffRank = getCivilStaffRank;

const MECH_STAFF_PREFERRED_ORDER = [
  { keywords: ["saravanan"], rank: 1 },
  { keywords: ["thiyaghu", "thyagu"], rank: 2 },
  { keywords: ["kamatchi", "sankaran"], rank: 3 },
  { keywords: ["vijayan"], rank: 4 },
  { keywords: ["srimanickam", "sri manickam"], rank: 5 },
  { keywords: ["prabakaran", "prabhakaran"], rank: 6 },
  { keywords: ["chidambaram"], rank: 7 },
  { keywords: ["iyyanar"], rank: 8 },
  { keywords: ["arul"], rank: 9 },
  { keywords: ["rajkumar", "raj kumar"], rank: 10 },
  { keywords: ["brithivi", "prithivi"], rank: 11 },
  { keywords: ["daniel"], rank: 12 },
  { keywords: ["dhinakaran"], rank: 13 }
];

function getMECHStaffRank(staff) {
  const nameStr = [
    staff.title || "",
    staff.firstName || "",
    staff.lastName || "",
    staff.name || "",
    staff.fullName || ""
  ].join(" ").toLowerCase();

  for (let i = 0; i < MECH_STAFF_PREFERRED_ORDER.length; i++) {
    const item = MECH_STAFF_PREFERRED_ORDER[i];
    if (item.keywords.some(kw => nameStr.includes(kw))) {
      return item.rank;
    }
  }
  return 999;
}

const SCIENCE_STAFF_PREFERRED_ORDER = [
  // Physics
  { keywords: ["subathra"], rank: 1 },
  { keywords: ["ajitha"], rank: 2 },
  { keywords: ["thilageswari"], rank: 3 },
  { keywords: ["muthulakshmi"], rank: 4 },
  { keywords: ["mahalakshmi"], rank: 5 },
  { keywords: ["jinitha"], rank: 6 },
  { keywords: ["beena"], rank: 7 },

  // Chemistry
  { keywords: ["sowndarya"], rank: 1 },
  { keywords: ["srividya"], rank: 2 },
  { keywords: ["sujee"], rank: 3 },
  { keywords: ["madhavi"], rank: 4 },
  { keywords: ["vijayaragini"], rank: 5 },
  { keywords: ["jeyashri", "jeyasri"], rank: 6 },

  // Mathematics
  { keywords: ["amutha"], rank: 1 },
  { keywords: ["subashini"], rank: 2 },
  { keywords: ["purnalakshimi", "purnalakshmi"], rank: 3 },
  { keywords: ["muthuracku"], rank: 4 },
  { keywords: ["manjula"], rank: 5 },
  { keywords: ["bhuvana"], rank: 6 },
  { keywords: ["sengole", "elavarasi"], rank: 7 },
  { keywords: ["nalini"], rank: 8 },
  { keywords: ["adeline"], rank: 9 },
  { keywords: ["betsy"], rank: 10 },
  { keywords: ["angela", "constant"], rank: 11 },

  // English
  { keywords: ["riswana"], rank: 1 },
  { keywords: ["lavanya"], rank: 2 },
  { keywords: ["rajathi"], rank: 3 },
  { keywords: ["prabi"], rank: 4 },

  // Tamil
  { keywords: ["chitra"], rank: 1 },
  { keywords: ["vinnarasi"], rank: 2 }
];

function getScienceStaffRank(staff) {
  const nameStr = [
    staff.title || "",
    staff.firstName || "",
    staff.lastName || "",
    staff.name || "",
    staff.fullName || ""
  ].join(" ").toLowerCase();

  for (let i = 0; i < SCIENCE_STAFF_PREFERRED_ORDER.length; i++) {
    const item = SCIENCE_STAFF_PREFERRED_ORDER[i];
    if (item.keywords.some(kw => nameStr.includes(kw))) {
      return item.rank;
    }
  }
  return 999;
}

// function getECEStaffRank(staff) {
//   const nameStr = [
//     staff.title || "",
//     staff.firstName || "",
//     staff.lastName || "",
//     staff.name || "",
//     staff.fullName || ""
//   ].join(" ").toLowerCase();

//   for (let i = 0; i < ECE_STAFF_PREFERRED_ORDER.length; i++) {
//     const item = ECE_STAFF_PREFERRED_ORDER[i];
//     if (item.keywords.some(kw => nameStr.includes(kw))) {
//       return item.rank;
//     }
//   }
//   return 999;
// }

function formatDesignation(desig = "") {
  return (desig || "").trim().split(/\s+/).map(w => {
    const l = w.toLowerCase().replace(/,$/, "").replace(/^\(/, "").replace(/\)$/, "");
    if (l === "hod") return w.includes("(") ? "(HoD)" : "HoD";
    if (l === "ahod" || l === "a.hod") return w.includes("(") ? "(AHoD)" : "AHoD";
    if (l === "coe") return "COE";
    if (l === "iqac") return "IQAC";
    if (l === "dean") return "Dean";
    if (l === "ug") return "UG";
    if (l === "pg") return "PG";
    if (l === "lab") return "Lab";
    if (l === "and" || l === "&") return "&";
    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  }).join(" ").trim() || "Faculty";
}

function getDesignationPriority(designation = "") {
  const d = designation.trim().toLowerCase();
  if (d.includes("hod")) return 1;
  if (d === "professor") return 2;
  if (d.includes("associate")) return 3;
  if (d.includes("assistant")) return 4;
  if (d.includes("lab")) return 5;
  return 6;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatFacultyName(title = "", firstName = "", lastName = "") {
  title = (title || "").trim();
  firstName = (firstName || "").trim();
  lastName = (lastName || "").trim();

  firstName = firstName.replace(/([A-Za-z])\.(\S)/g, "$1. $2");

  if (!title) {
    const prefixMatch = firstName.match(/^(Dr\.|Mr\.|Mrs\.|Ms\.|Prof\.)\s*/i);
    if (prefixMatch) {
      title = prefixMatch[1];
      firstName = firstName.slice(prefixMatch[0].length).trim();
    }
  }

  const raw = [title, firstName, lastName].filter(Boolean).join(" ");
  if (!raw) return "Faculty Member";

  return raw.split(/\s+/).map(w => {
    const lower = w.toLowerCase().replace(/\.$/, "");
    if (lower === "dr") return "Dr.";
    if (lower === "mr") return "Mr.";
    if (lower === "mrs") return "Mrs.";
    if (lower === "ms") return "Ms.";
    if (lower === "prof") return "Prof.";
    if (/^[a-z]\.?$/i.test(w)) return w.charAt(0).toUpperCase() + ".";
    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  }).join(" ");
}



function getInitials(name = "") {
  const parts = name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.|Prof\.)\s+/i, "").split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return parts[0] ? parts[0].substring(0, 2).toUpperCase() : "MS";
}

function getTabIdForDepartment(dept) {
  if (!dept) return null;
  const d = dept.trim().toLowerCase();
  if (d.includes("information technology") || d.includes("it") || d.includes("dept of it")) return "faculty--staff-tab-1";
  if (d.includes("computer science") || d.includes("cse")) return "faculty--staff-tab-2";
  if (d.includes("artificial intelligence") || d.includes("ai ds") || d.includes("ai & ds") || d.includes("aids") || d.includes("data science")) return "faculty--staff-tab-3";
  if (d.includes("electronics and communication") || d.includes("electronics & communication") || d.includes("ece")) return "faculty--staff-tab-4";
  if (d.includes("electrical and electronics") || d.includes("electrical & electronics") || d.includes("electrical") || d.includes("eee")) return "faculty--staff-tab-5";
  if (d.includes("mechanical") || d.includes("mech")) return "faculty--staff-tab-6";
  if (d.includes("civil")) return "faculty--staff-tab-7";
  if (d.includes("physics") || d.includes("math") || d.includes("english") || d.includes("chemistry") || d.includes("tamil") || d.includes("humanities") || d.includes("science")) return "faculty--staff-tab-8";
  if (d.includes("dean")) return "faculty--staff-tab-admin-dean";
  if (d.includes("iqac")) return "faculty--staff-tab-admin-iqac";
  if (d.includes("academic")) return "faculty--staff-tab-admin-academics";
  return null;
}

function injectCardStyles() {
  if (document.getElementById("faculty-card-styles")) return;
  const style = document.createElement("style");
  style.id = "faculty-card-styles";
  style.textContent = `
    .msec-faculty-card {
      background: #ffffff;
      border: 1px solid #f1f1f1;
      border-radius: 20px;
      padding: 32px 28px;
      text-align: center;
      box-shadow: 0 2px 14px rgba(0,0,0,0.07);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .msec-faculty-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 32px rgba(220,38,38,0.13);
    }
    .msec-faculty-avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #fca5a5;
      margin-bottom: 18px;
      flex-shrink: 0;
    }
    .msec-faculty-initials {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: linear-gradient(135deg, #fee2e2, #fef2f2);
      border: 3px solid #fca5a5;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 18px;
      flex-shrink: 0;
      font-size: 32px;
      font-weight: 700;
      color: #dc2626;
      letter-spacing: 1px;
    }
    .msec-faculty-name {
      font-size: 1.05rem;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 6px;
      line-height: 1.35;
    }
    .msec-faculty-designation {
      font-size: 0.875rem;
      font-weight: 600;
      color: #dc2626;
      margin-bottom: 10px;
      line-height: 1.4;
    }
    .msec-faculty-dept-badge {
      display: inline-block;
      background: #fef2f2;
      color: #7f1d1d;
      border: 1px solid #fecaca;
      border-radius: 20px;
      padding: 4px 16px;
      font-size: 0.78rem;
      font-weight: 500;
      margin-top: 6px;
    }
    .msec-faculty-specialty {
      display: inline-block;
      background: #f8fafc;
      color: #475569;
      border: 1px solid #e2e8f0;
      border-radius: 20px;
      padding: 3px 10px;
      font-size: 0.73rem;
      margin: 2px;
    }
    @keyframes msec-skeleton-glow {
      0% { opacity: 0.6; }
      50% { opacity: 0.25; }
      100% { opacity: 0.6; }
    }
    .msec-skeleton-card {
      background: #fff;
      border: 1px solid #f1f1f1;
      border-radius: 20px;
      padding: 32px 28px;
      text-align: center;
      box-shadow: 0 2px 14px rgba(0,0,0,.04);
      animation: msec-skeleton-glow 1.4s infinite ease-in-out;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;
    }
    .msec-skeleton-avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: #e2e8f0;
      margin-bottom: 18px;
    }
    .msec-skeleton-line {
      height: 14px;
      background: #e2e8f0;
      border-radius: 7px;
      margin-bottom: 10px;
    }
  `;
  document.head.appendChild(style);
}

function showSkeletonLoaders() {
  const tabs = [
    "faculty--staff-tab-1",
    "faculty--staff-tab-2",
    "faculty--staff-tab-3",
    "faculty--staff-tab-4",
    "faculty--staff-tab-5",
    "faculty--staff-tab-6",
    "faculty--staff-tab-7",
    "faculty--staff-tab-8"
  ];
  tabs.forEach(tabId => {
    const pane = document.getElementById(tabId);
    if (!pane) return;
    const row = pane.querySelector(".row.g-4");
    if (row && row.children.length === 0) {
      row.innerHTML = Array(3).fill(0).map(() => `
        <div class="col-md-6 col-lg-4 mb-4 d-flex">
          <div class="msec-skeleton-card">
            <div class="msec-skeleton-avatar"></div>
            <div class="msec-skeleton-line" style="width: 70%;"></div>
            <div class="msec-skeleton-line" style="width: 50%;"></div>
            <div class="msec-skeleton-line" style="width: 40%;"></div>
          </div>
        </div>
      `).join("");
    }
  });
}

function getStaffPreviewUrl(staff) {
  let raw = "";
  if (staff.title || staff.firstName || staff.lastName) {
    raw = [staff.title, staff.firstName, staff.lastName].filter(Boolean).join(" ");
  } else {
    raw = staff.fullName || staff.name || "";
  }
  const clean = raw.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.|Prof\.)\s*/i, "").trim();
  const slug = clean.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  return `https://staff-management-inky.vercel.app/preview/${slug || "faculty"}`;
}

function createCardHTML(staff) {
  const name = formatFacultyName(staff.title, staff.firstName, staff.lastName);
  const desig = formatDesignation(staff.designation);
  const dept = (staff.department || "").trim();
  const initials = getInitials(name);
  const hasImg = staff.imageUrl && (staff.imageUrl.startsWith("http") || staff.imageUrl.startsWith("data:image") || staff.imageUrl.startsWith("assets/"));
  const profileUrl = getStaffPreviewUrl(staff);

  const specialtiesHtml = (staff.specialties && staff.specialties.length > 0)
    ? `<div class="mt-2">${staff.specialties.map(s => `<span class="msec-faculty-specialty">${s}</span>`).join("")}</div>`
    : "";

  const avatarHtml = hasImg
    ? `<img src="${staff.imageUrl}" class="msec-faculty-avatar shadow-sm" alt="${name}" loading="lazy">`
    : `<div class="msec-faculty-initials shadow-sm">${initials}</div>`;

  return `
    <div class="col-md-6 col-lg-4 mb-4 d-flex" data-aos="fade-up" data-aos-delay="100">
      <a href="${profileUrl}" target="_blank" rel="noopener noreferrer" class="w-100 text-decoration-none" style="color:inherit;">
        <div class="msec-faculty-card">
          ${avatarHtml}
          <h5 class="msec-faculty-name">${name}</h5>
          <p class="msec-faculty-designation">${desig}</p>
          <span class="msec-faculty-dept-badge">${dept}</span>
          ${specialtiesHtml}
        </div>
      </a>
    </div>`;
}

window.switchToPrincipalTab = function () {
  const principalTabBtn = document.querySelector('button[data-bs-target="#faculty--staff-tab-0"]');
  if (principalTabBtn) {
    const adminSubNav = document.getElementById("adminSubNav");
    if (adminSubNav && !adminSubNav.classList.contains("show")) {
      const adminToggle = document.querySelector('[data-bs-target="#adminSubNav"]');
      if (adminToggle) {
        if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
          const bsCollapse = bootstrap.Collapse.getInstance(adminSubNav) || new bootstrap.Collapse(adminSubNav, { toggle: false });
          bsCollapse.show();
        } else {
          adminSubNav.classList.add("show");
        }
      }
    }
    if (typeof bootstrap !== 'undefined' && bootstrap.Tab) {
      const tabTrigger = bootstrap.Tab.getInstance(principalTabBtn) || new bootstrap.Tab(principalTabBtn);
      tabTrigger.show();
    } else {
      principalTabBtn.click();
    }
    const tabTarget = document.querySelector('#faculty--staff-tab-0');
    if (tabTarget) {
      tabTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else {
    window.location.href = "faculty-staff.html#faculty--staff-tab-0";
  }
};

window.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash) {
    const targetHash = window.location.hash;
    if (targetHash === "#faculty--staff-tab-0" || targetHash.includes("admin")) {
      window.switchToPrincipalTab();
    }
  }
});

function isFullProfessor(desig = "") {
  const d = (desig || "").toLowerCase().trim();
  return d.includes("professor") && !d.includes("associate") && !d.includes("assistant");
}

function isMainFacultyStaffPage() {
  const path = window.location.pathname.toLowerCase();
  return path.endsWith("faculty-staff.html") || path.endsWith("faculty-staff") || path.endsWith("faculty-staff/");
}

function getDepartmentFromPath() {
  const path = window.location.pathname.toLowerCase();
  if (path.includes("informationtechnology.html")) return "faculty--staff-tab-1";
  if (path.includes("computerscience.html") || path.includes("csepostgraduate.html")) return "faculty--staff-tab-2";
  if (path.includes("aids.html")) return "faculty--staff-tab-3";
  if (path.includes("ece.html") || path.includes("ecepostgraduate.html")) return "faculty--staff-tab-4";
  if (path.includes("eee.html") || path.includes("eee copy.html")) return "faculty--staff-tab-5";
  if (path.includes("mech.html") || path.includes("mechpostgraduate.html")) return "faculty--staff-tab-6";
  if (path.includes("civil.html") || path.includes("civilpostgraduate.html")) return "faculty--staff-tab-7";
  if (path.includes("humanitiesscience.html")) return "faculty--staff-tab-8";
  return null;
}

function createPrincipalCardHTML(staff) {
  const name = formatFacultyName(staff.title, staff.firstName, staff.lastName);
  const desig = formatDesignation(staff.designation);
  const dept = (staff.department || "").trim();
  const initials = getInitials(name);
  const imageUrl = staff.imageUrl || "assets/img/principal.png";
  const hasImg = imageUrl && (imageUrl.startsWith("http") || imageUrl.startsWith("data:image") || imageUrl.startsWith("assets/"));

  const specialtiesHtml = (staff.specialties && staff.specialties.length > 0)
    ? `<div class="mt-2">${staff.specialties.map(s => `<span class="msec-faculty-specialty">${s}</span>`).join("")}</div>`
    : "";

  const avatarHtml = hasImg
    ? `<img src="${imageUrl}" class="msec-faculty-avatar shadow-sm" alt="${name}" loading="lazy">`
    : `<div class="msec-faculty-initials shadow-sm">${initials}</div>`;

  return `
    <div class="col-md-6 col-lg-4 mb-4 d-flex" data-aos="fade-up" data-aos-delay="100">
      <a href="javascript:void(0);" onclick="switchToPrincipalTab()" class="w-100 text-decoration-none" style="color:inherit; cursor: pointer;">
        <div class="msec-faculty-card">
          ${avatarHtml}
          <h5 class="msec-faculty-name">${name}</h5>
          <p class="msec-faculty-designation">${desig}</p>
          <span class="msec-faculty-dept-badge">${dept}</span>
          ${specialtiesHtml}
        </div>
      </a>
    </div>`;
}

function renderDepartmentPane(tabId, list, tabPane) {
  if (!tabPane) return;
  const isIT = tabId === "faculty--staff-tab-1";
  const isCSE = tabId === "faculty--staff-tab-2";
  const isAIDS = tabId === "faculty--staff-tab-3";
  const isECE = tabId === "faculty--staff-tab-4";
  const isEEE = tabId === "faculty--staff-tab-5";
  const isMech = tabId === "faculty--staff-tab-6";
  const isCivil = tabId === "faculty--staff-tab-7";
  const isScience = tabId === "faculty--staff-tab-8";

  const deptInfo = tabPane.querySelector(".department-info");
  tabPane.innerHTML = "";
  if (deptInfo) tabPane.appendChild(deptInfo);

  let headList = [];
  let facultyList = [];

  if (isIT) {
    headList = list.filter(s => getITStaffRank(s) <= 2).sort((a, b) => getITStaffRank(a) - getITStaffRank(b));
    facultyList = list.filter(s => getITStaffRank(s) > 2).sort((a, b) => getITStaffRank(a) - getITStaffRank(b));
  } else if (isCSE) {
    headList = list.filter(s => getCSEStaffRank(s) <= 2).sort((a, b) => getCSEStaffRank(a) - getCSEStaffRank(b));
    facultyList = list.filter(s => getCSEStaffRank(s) > 2).sort((a, b) => getCSEStaffRank(a) - getCSEStaffRank(b));
  } else if (isAIDS) {
    headList = list.filter(s => getAIDSStaffRank(s) <= 2).sort((a, b) => getAIDSStaffRank(a) - getAIDSStaffRank(b));
    facultyList = list.filter(s => getAIDSStaffRank(s) > 2).sort((a, b) => getAIDSStaffRank(a) - getAIDSStaffRank(b));
  } else if (isECE) {
    const deansList = list.filter(s => getECEStaffRank(s) >= 1 && getECEStaffRank(s) <= 2).sort((a, b) => getECEStaffRank(a) - getECEStaffRank(b));
    const coeList = list.filter(s => getECEStaffRank(s) === 3).sort((a, b) => getECEStaffRank(a) - getECEStaffRank(b));
    const headsList = list.filter(s => getECEStaffRank(s) >= 4 && getECEStaffRank(s) <= 5).sort((a, b) => getECEStaffRank(a) - getECEStaffRank(b));
    const facultyList = list.filter(s => !deansList.includes(s) && !coeList.includes(s) && !headsList.includes(s)).sort((a, b) => getECEStaffRank(a) - getECEStaffRank(b));

    if (deansList.length > 0) {
      const section = document.createElement("div");
      section.className = "mb-5";
      section.innerHTML = `
        <div class="text-center mb-4">
          <h4 class="fw-bold text-uppercase" style="color: #dc2626; border-bottom: 2px solid #fee2e2; display: inline-block; padding-bottom: 6px; letter-spacing: 0.05em;">
            Deans
          </h4>
        </div>
        <div class="row g-4 justify-content-center"></div>`;
      const row = section.querySelector(".row");
      deansList.forEach(s => row.insertAdjacentHTML("beforeend", createCardHTML(s)));
      tabPane.appendChild(section);
    }

    if (coeList.length > 0) {
      const section = document.createElement("div");
      section.className = "mb-5";
      section.innerHTML = `
        <div class="text-center mb-4">
          <h4 class="fw-bold text-uppercase" style="color: #dc2626; border-bottom: 2px solid #fee2e2; display: inline-block; padding-bottom: 6px; letter-spacing: 0.05em;">
            Controller of Examinations (COE)
          </h4>
        </div>
        <div class="row g-4 justify-content-center"></div>`;
      const row = section.querySelector(".row");
      coeList.forEach(s => row.insertAdjacentHTML("beforeend", createCardHTML(s)));
      tabPane.appendChild(section);
    }

    if (headsList.length > 0) {
      const section = document.createElement("div");
      section.className = "mb-5";
      section.innerHTML = `
        <div class="text-center mb-4">
          <h4 class="fw-bold text-uppercase" style="color: #dc2626; border-bottom: 2px solid #fee2e2; display: inline-block; padding-bottom: 6px; letter-spacing: 0.05em;">
            HEADS
          </h4>
        </div>
        <div class="row g-4 justify-content-center"></div>`;
      const row = section.querySelector(".row");
      headsList.forEach(s => row.insertAdjacentHTML("beforeend", createCardHTML(s)));
      tabPane.appendChild(section);
    }

    if (facultyList.length > 0) {
      const facultySection = document.createElement("div");
      facultySection.className = "mb-5";
      facultySection.innerHTML = `
        <div class="text-center mb-4">
          <h4 class="fw-bold text-uppercase" style="color: #0f172a; border-bottom: 2px solid #e2e8f0; display: inline-block; padding-bottom: 6px; letter-spacing: 0.05em;">
            FACULTY MEMBERS
          </h4>
        </div>
        <div class="row g-4 justify-content-center"></div>`;
      const facultyRow = facultySection.querySelector(".row");
      facultyList.forEach(s => facultyRow.insertAdjacentHTML("beforeend", createCardHTML(s)));
      tabPane.appendChild(facultySection);
    }
    return;
  } else if (isEEE) {
    headList = list.filter(s => getEEEStaffRank(s) <= 2).sort((a, b) => getEEEStaffRank(a) - getEEEStaffRank(b));
    facultyList = list.filter(s => getEEEStaffRank(s) > 2).sort((a, b) => getEEEStaffRank(a) - getEEEStaffRank(b));
  } else if (isMech) {
    const principalList = list.filter(s => getMECHStaffRank(s) === 1).sort((a, b) => getMECHStaffRank(a) - getMECHStaffRank(b));
    headList = list.filter(s => getMECHStaffRank(s) >= 2 && getMECHStaffRank(s) <= 3).sort((a, b) => getMECHStaffRank(a) - getMECHStaffRank(b));
    facultyList = list.filter(s => getMECHStaffRank(s) > 3).sort((a, b) => getMECHStaffRank(a) - getMECHStaffRank(b));

    const principalSection = document.createElement("div");
    principalSection.className = "mb-5";
    principalSection.innerHTML = `
      <div class="text-center mb-4">
        <h4 class="fw-bold text-uppercase" style="color: #dc2626; border-bottom: 2px solid #fee2e2; display: inline-block; padding-bottom: 6px; letter-spacing: 0.05em;">
          Principal
        </h4>
      </div>
      <div class="row g-4 justify-content-center"></div>`;
    const principalRow = principalSection.querySelector(".row");
    const principalStaff = {
      title: (principalList[0]?.title) || "Dr.",
      firstName: (principalList[0]?.firstName) || "S. V.",
      lastName: (principalList[0]?.lastName) || "SARAVANAN",
      designation: (principalList[0]?.designation) || "Principal & Professor",
      department: (principalList[0]?.department) || "Mechanical Engineering",
      imageUrl: "assets/img/principal.png"
    };
    principalRow.insertAdjacentHTML("beforeend", createPrincipalCardHTML(principalStaff));
    tabPane.appendChild(principalSection);
  } else if (isCivil) {
    const deanList = list.filter(s => getCivilStaffRank(s) === 1).sort((a, b) => getCivilStaffRank(a) - getCivilStaffRank(b));
    const headResearchList = list.filter(s => getCivilStaffRank(s) === 2).sort((a, b) => getCivilStaffRank(a) - getCivilStaffRank(b));
    const headsList = list.filter(s => getCivilStaffRank(s) >= 3 && getCivilStaffRank(s) <= 5).sort((a, b) => getCivilStaffRank(a) - getCivilStaffRank(b));
    const facultyList = list.filter(s => getCivilStaffRank(s) > 5).sort((a, b) => getCivilStaffRank(a) - getCivilStaffRank(b));

    if (deanList.length > 0) {
      const section = document.createElement("div");
      section.className = "mb-5";
      section.innerHTML = `
        <div class="text-center mb-4">
          <h4 class="fw-bold text-uppercase" style="color: #dc2626; border-bottom: 2px solid #fee2e2; display: inline-block; padding-bottom: 6px; letter-spacing: 0.05em;">
            Dean
          </h4>
        </div>
        <div class="row g-4 justify-content-center"></div>`;
      const row = section.querySelector(".row");
      deanList.forEach(s => row.insertAdjacentHTML("beforeend", createCardHTML(s)));
      tabPane.appendChild(section);
    }

    if (headResearchList.length > 0) {
      const section = document.createElement("div");
      section.className = "mb-5";
      section.innerHTML = `
        <div class="text-center mb-4">
          <h4 class="fw-bold text-uppercase" style="color: #dc2626; border-bottom: 2px solid #fee2e2; display: inline-block; padding-bottom: 6px; letter-spacing: 0.05em;">
            Head Research
          </h4>
        </div>
        <div class="row g-4 justify-content-center"></div>`;
      const row = section.querySelector(".row");
      headResearchList.forEach(s => row.insertAdjacentHTML("beforeend", createCardHTML(s)));
      tabPane.appendChild(section);
    }

    if (headsList.length > 0) {
      const section = document.createElement("div");
      section.className = "mb-5";
      section.innerHTML = `
        <div class="text-center mb-4">
          <h4 class="fw-bold text-uppercase" style="color: #dc2626; border-bottom: 2px solid #fee2e2; display: inline-block; padding-bottom: 6px; letter-spacing: 0.05em;">
            HEADS
          </h4>
        </div>
        <div class="row g-4 justify-content-center"></div>`;
      const row = section.querySelector(".row");
      headsList.forEach(s => row.insertAdjacentHTML("beforeend", createCardHTML(s)));
      tabPane.appendChild(section);
    }

    if (facultyList.length > 0) {
      const facultySection = document.createElement("div");
      facultySection.className = "mb-5";
      facultySection.innerHTML = `
        <div class="text-center mb-4">
          <h4 class="fw-bold text-uppercase" style="color: #0f172a; border-bottom: 2px solid #e2e8f0; display: inline-block; padding-bottom: 6px; letter-spacing: 0.05em;">
            FACULTY MEMBERS
          </h4>
        </div>
        <div class="row g-4 justify-content-center"></div>`;
      const facultyRow = facultySection.querySelector(".row");
      facultyList.forEach(s => facultyRow.insertAdjacentHTML("beforeend", createCardHTML(s)));
      tabPane.appendChild(facultySection);
    }
    return;
  } else if (isScience) {
    const subjects = [
      {
        name: "Mathematics",
        keywords: ["amutha", "subashini", "purnalakshimi", "purnalakshmi", "muthuracku", "manjula", "bhuvana", "sengole", "elavarasi", "nalini", "adeline", "betsy", "angela", "constant"],
        order: [
          { keywords: ["amutha"], rank: 1 },
          { keywords: ["subashini"], rank: 2 },
          { keywords: ["purnalakshimi", "purnalakshmi"], rank: 3 },
          { keywords: ["muthuracku"], rank: 4 },
          { keywords: ["manjula"], rank: 5 },
          { keywords: ["bhuvana"], rank: 6 },
          { keywords: ["sengole", "elavarasi"], rank: 7 },
          { keywords: ["nalini"], rank: 8 },
          { keywords: ["adeline"], rank: 9 },
          { keywords: ["betsy", "betsyprabhakar"], rank: 10 },
          { keywords: ["angela", "constant"], rank: 11 }
        ]
      },
      {
        name: "Physics",
        keywords: ["subathra", "ajitha", "thilageswari", "muthulakshmi", "mahalakshmi", "jinitha", "beena"],
        order: [
          { keywords: ["subathra"], rank: 1 },
          { keywords: ["ajitha"], rank: 2 },
          { keywords: ["thilageswari"], rank: 3 },
          { keywords: ["muthulakshmi"], rank: 4 },
          { keywords: ["mahalakshmi"], rank: 5 },
          { keywords: ["jinitha"], rank: 6 },
          { keywords: ["beena"], rank: 7 }
        ]
      },
      {
        name: "Chemistry",
        keywords: ["sowndarya", "srividya", "sujee", "madhavi", "vijayaragini", "jeyashri", "jeyasri"],
        order: [
          { keywords: ["sowndarya"], rank: 1 },
          { keywords: ["srividya"], rank: 2 },
          { keywords: ["sujee"], rank: 3 },
          { keywords: ["madhavi"], rank: 4 },
          { keywords: ["vijayaragini"], rank: 5 },
          { keywords: ["jeyashri", "jeyasri"], rank: 6 }
        ]
      },
      {
        name: "English",
        keywords: ["riswana", "lavanya", "rajathi", "prabi"],
        order: [
          { keywords: ["riswana"], rank: 1 },
          { keywords: ["lavanya"], rank: 2 },
          { keywords: ["rajathi"], rank: 3 },
          { keywords: ["prabi"], rank: 4 }
        ]
      },
      {
        name: "Tamil",
        keywords: ["chitra", "vinnarasi"],
        order: [
          { keywords: ["chitra"], rank: 1 },
          { keywords: ["vinnarasi"], rank: 2 }
        ]
      }
    ];

    function getSubjectRank(staff, orderList) {
      const nameStr = [
        staff.title || "",
        staff.firstName || "",
        staff.lastName || "",
        staff.name || "",
        staff.fullName || ""
      ].join(" ").toLowerCase();

      for (let i = 0; i < orderList.length; i++) {
        if (orderList[i].keywords.some(kw => nameStr.includes(kw))) {
          return orderList[i].rank;
        }
      }
      return 999;
    }

    subjects.forEach(subj => {
      const subjStaff = list.filter(s => {
        const nameStr = [s.title || "", s.firstName || "", s.lastName || "", s.name || "", s.fullName || ""].join(" ").toLowerCase();
        return subj.keywords.some(kw => nameStr.includes(kw));
      }).sort((a, b) => getSubjectRank(a, subj.order) - getSubjectRank(b, subj.order));

      if (subjStaff.length > 0) {
        const section = document.createElement("div");
        section.className = "mb-5";
        section.innerHTML = `
          <div class="text-center mb-4">
            <h4 class="fw-bold text-uppercase" style="color: #dc2626; border-bottom: 2px solid #fee2e2; display: inline-block; padding-bottom: 6px; letter-spacing: 0.05em;">
              ${subj.name}
            </h4>
          </div>
          <div class="row g-4 justify-content-center"></div>`;
        const row = section.querySelector(".row");
        subjStaff.forEach(s => row.insertAdjacentHTML("beforeend", createCardHTML(s)));
        tabPane.appendChild(section);
      }
    });
    return;
  } else {
    facultyList = list;
  }

  if (headList.length > 0) {
    const headSection = document.createElement("div");
    headSection.className = "mb-5";
    headSection.innerHTML = `
      <div class="text-center mb-4">
        <h4 class="fw-bold text-uppercase" style="color: #dc2626; border-bottom: 2px solid #fee2e2; display: inline-block; padding-bottom: 6px; letter-spacing: 0.05em;">
          HEADS
        </h4>
      </div>
      <div class="row g-4 justify-content-center"></div>`;
    const headRow = headSection.querySelector(".row");
    headList.forEach(s => headRow.insertAdjacentHTML("beforeend", createCardHTML(s)));
    tabPane.appendChild(headSection);
  }

  if (facultyList.length > 0) {
    const facultySection = document.createElement("div");
    facultySection.className = "mb-5";
    facultySection.innerHTML = `
      <div class="text-center mb-4">
        <h4 class="fw-bold text-uppercase" style="color: #0f172a; border-bottom: 2px solid #e2e8f0; display: inline-block; padding-bottom: 6px; letter-spacing: 0.05em;">
          FACULTY MEMBERS
        </h4>
      </div>
      <div class="row g-4 justify-content-center"></div>`;
    const facultyRow = facultySection.querySelector(".row");
    facultyList.forEach(s => facultyRow.insertAdjacentHTML("beforeend", createCardHTML(s)));
    tabPane.appendChild(facultySection);
  }
}

function renderAllTabs(staffArray) {
  const sheebaStaff = staffArray.find(s => {
    const nameStr = `${s.title || ""} ${s.firstName || ""} ${s.lastName || ""} ${s.name || ""} ${s.fullName || ""}`.toLowerCase();
    return nameStr.includes("sheeba") || nameStr.includes("joice");
  });

  if (sheebaStaff && sheebaStaff.imageUrl) {
    const frame = document.querySelector("#faculty--staff-tab-admin-academics .sheeba-photo-frame");
    if (frame) {
      frame.outerHTML = `<img src="${sheebaStaff.imageUrl}" alt="Dr. Sheeba Joice C" class="shadow-sm sheeba-photo" style="width: 155px; height: 155px; border-radius: 12px; border: 2px solid #fee2e2; margin-bottom: 14px; object-fit: cover;">`;
    } else {
      const existingImg = document.querySelector("#faculty--staff-tab-admin-academics img.sheeba-photo");
      if (existingImg) {
        existingImg.src = sheebaStaff.imageUrl;
      }
    }
  }

  const staffByTab = {};

  staffArray.forEach((staff) => {
    if (staff.email?.toLowerCase() === "lalettan@gmail.com") return;

    const nameStr = `${staff.title || ""} ${staff.firstName || ""} ${staff.lastName || ""} ${staff.name || ""} ${staff.fullName || ""}`.toLowerCase();
    if (nameStr.includes("santhanakrishnan") || nameStr.includes("santhana krishnan") || nameStr.includes("santhankrishnan")) return;

    const tabId = getTabIdForDepartment(staff.department);
    if (!tabId) return;

    if (!staffByTab[tabId]) {
      staffByTab[tabId] = [];
    }
    staffByTab[tabId].push(staff);
  });

  if (isMainFacultyStaffPage()) {
    Object.keys(staffByTab).forEach((tabId) => {
      const tabPane = document.getElementById(tabId);
      if (tabPane) {
        renderDepartmentPane(tabId, staffByTab[tabId], tabPane);
      }
    });
  } else {
    const standaloneTabId = getDepartmentFromPath();
    if (standaloneTabId) {
      const standalonePane = document.getElementById("faculty--staff-tab-3");
      if (standalonePane) {
        const deptList = staffByTab[standaloneTabId] || [];
        renderDepartmentPane(standaloneTabId, deptList, standalonePane);
      }
    }
  }

  if (window.AOS) window.AOS.refresh();
}

const CACHE_KEY = "msec_staff_data_v13";

async function loadFaculty() {
  injectCardStyles();

  // 1. Instant load from SessionStorage cache
  const cachedData = sessionStorage.getItem(CACHE_KEY);
  if (cachedData) {
    try {
      const cachedStaff = JSON.parse(cachedData);
      renderAllTabs(cachedStaff);
    } catch (e) {
      console.warn("Failed reading cached staff:", e);
      showSkeletonLoaders();
    }
  } else {
    showSkeletonLoaders();
  }

  // 2. Asynchronous background revalidation from Firestore
  try {
    const querySnapshot = await getDocs(collection(db, "staff"));
    const freshStaff = [];

    querySnapshot.forEach((doc) => {
      const staff = doc.data();
      if (staff.email?.toLowerCase() !== "lalettan@gmail.com") {
        freshStaff.push(staff);
      }
    });

    try {
      const cacheableStaff = freshStaff.map(s => {
        const copy = { ...s };
        if (copy.imageUrl && copy.imageUrl.startsWith("data:image")) {
          delete copy.imageUrl;
        }
        return copy;
      });
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(cacheableStaff));
    } catch (qErr) {
      console.warn("Storage quota limit reached for staff cache:", qErr);
    }
    renderAllTabs(freshStaff);
  } catch (err) {
    console.error("Error fetching staff from Firestore:", err);
  }
}

loadFaculty();
