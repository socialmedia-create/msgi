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
  { keywords: ["gayathri", "gayatri"], rank: 3 },
  { keywords: ["mohan raj", "mohanraj", "mohan"], rank: 4 },
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
  return 999;
}

const AIDS_STAFF_PREFERRED_ORDER = [
  { keywords: ["mathangi"], rank: 1 },
  { keywords: ["ramasubramanian"], rank: 2 },
  { keywords: ["madhurikkha", "madhurikha"], rank: 3 },
  { keywords: ["dhivya"], rank: 4 },
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

function formatDesignation(desig = "") {
  return (desig || "").trim().split(/\s+/).map(w => {
    const l = w.toLowerCase().replace(/,$/, "");
    if (l === "hod") return "HOD";
    if (l === "lab") return "Lab";
    if (l === "and" || l === "&") return "and";
    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  }).join(" ").trim() || "Faculty";
}

function getInitials(name = "") {
  const parts = name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.|Prof\.)\s+/i, "").split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return parts[0] ? parts[0].substring(0, 2).toUpperCase() : "MS";
}

function getTabIdForDepartment(dept) {
  if (!dept) return null;
  const d = dept.trim().toLowerCase();
  if (d.includes("information technology") || d === "it" || d.includes("dept of it")) return "faculty--staff-tab-1";
  if (d.includes("computer science") || d === "cse") return "faculty--staff-tab-2";
  if (d.includes("artificial intelligence") || d.includes("ai ds") || d.includes("ai & ds") || d.includes("data science")) return "faculty--staff-tab-3";
  if (d.includes("electronics and communication") || d.includes("electronics & communication") || d === "ece") return "faculty--staff-tab-4";
  if (d.includes("electrical and electronics") || d.includes("electrical & electronics") || d === "eee") return "faculty--staff-tab-5";
  if (d.includes("mechanical") || d === "mech") return "faculty--staff-tab-6";
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
  const hasImg = staff.imageUrl && (staff.imageUrl.startsWith("http") || staff.imageUrl.startsWith("data:image"));
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

const CACHE_KEY = "msec_staff_data_v1";

function renderAllTabs(staffArray) {
  const staffByTab = {};

  staffArray.forEach((staff) => {
    if (staff.email?.toLowerCase() === "lalettan@gmail.com") return;

    const tabId = getTabIdForDepartment(staff.department);
    if (!tabId) return;

    if (!staffByTab[tabId]) {
      staffByTab[tabId] = [];
    }
    staffByTab[tabId].push(staff);
  });

  Object.keys(staffByTab).forEach((tabId) => {
    const isIT = tabId === "faculty--staff-tab-1";
    const isCSE = tabId === "faculty--staff-tab-2";
    const isScience = tabId === "faculty--staff-tab-8";
    const tabPane = document.getElementById(tabId);
    if (!tabPane) return;

    const list = staffByTab[tabId];

    if (isIT) {
      const headList = list.filter(s => getITStaffRank(s) <= 2).sort((a, b) => getITStaffRank(a) - getITStaffRank(b));
      const facultyList = list.filter(s => getITStaffRank(s) > 2).sort((a, b) => getITStaffRank(a) - getITStaffRank(b));

      const deptInfo = tabPane.querySelector(".department-info");
      tabPane.innerHTML = "";
      if (deptInfo) tabPane.appendChild(deptInfo);

      if (headList.length > 0) {
        const headSection = document.createElement("div");
        headSection.className = "mb-5";
        headSection.innerHTML = `
          <div class="text-center mb-4">
            <h4 class="fw-bold text-uppercase" style="color: #dc2626; border-bottom: 2px solid #fee2e2; display: inline-block; padding-bottom: 6px; letter-spacing: 0.05em;">
              Professor and Head
            </h4>
          </div>
          <div class="row g-4 justify-content-center"></div>`;
        const headRow = headSection.querySelector(".row");
        headList.slice(0, 2).forEach(s => headRow.insertAdjacentHTML("beforeend", createCardHTML(s)));
        tabPane.appendChild(headSection);
      }

      if (facultyList.length > 0) {
        const facultySection = document.createElement("div");
        facultySection.className = "mb-5";
        facultySection.innerHTML = `
          <div class="text-center mb-4">
            <h4 class="fw-bold text-uppercase" style="color: #0f172a; border-bottom: 2px solid #e2e8f0; display: inline-block; padding-bottom: 6px; letter-spacing: 0.05em;">
              Faculty Members
            </h4>
          </div>
          <div class="row g-4 justify-content-center"></div>`;
        const facultyRow = facultySection.querySelector(".row");
        facultyList.forEach(s => facultyRow.insertAdjacentHTML("beforeend", createCardHTML(s)));
        tabPane.appendChild(facultySection);
      }
      return;
    }

    if (isCSE) {
      const headList = list.filter(s => getCSEStaffRank(s) <= 2).sort((a, b) => getCSEStaffRank(a) - getCSEStaffRank(b));
      const facultyList = list.filter(s => getCSEStaffRank(s) > 2).sort((a, b) => getCSEStaffRank(a) - getCSEStaffRank(b));

      const deptInfo = tabPane.querySelector(".department-info");
      tabPane.innerHTML = "";
      if (deptInfo) tabPane.appendChild(deptInfo);

      if (headList.length > 0) {
        const headSection = document.createElement("div");
        headSection.className = "mb-5";
        headSection.innerHTML = `
          <div class="text-center mb-4">
            <h4 class="fw-bold text-uppercase" style="color: #dc2626; border-bottom: 2px solid #fee2e2; display: inline-block; padding-bottom: 6px; letter-spacing: 0.05em;">
              Professor and Head
            </h4>
          </div>
          <div class="row g-4 justify-content-center"></div>`;
        const headRow = headSection.querySelector(".row");
        headList.slice(0, 2).forEach(s => headRow.insertAdjacentHTML("beforeend", createCardHTML(s)));
        tabPane.appendChild(headSection);
      }

      if (facultyList.length > 0) {
        const facultySection = document.createElement("div");
        facultySection.className = "mb-5";
        facultySection.innerHTML = `
          <div class="text-center mb-4">
            <h4 class="fw-bold text-uppercase" style="color: #0f172a; border-bottom: 2px solid #e2e8f0; display: inline-block; padding-bottom: 6px; letter-spacing: 0.05em;">
              Faculty Members
            </h4>
          </div>
          <div class="row g-4 justify-content-center"></div>`;
        const facultyRow = facultySection.querySelector(".row");
        facultyList.forEach(s => facultyRow.insertAdjacentHTML("beforeend", createCardHTML(s)));
        tabPane.appendChild(facultySection);
      }
      return;
    }

    const isAIDS = tabId === "faculty--staff-tab-3";
    if (isAIDS) {
      const headList = list.filter(s => getAIDSStaffRank(s) <= 1).sort((a, b) => getAIDSStaffRank(a) - getAIDSStaffRank(b));
      const facultyList = list.filter(s => getAIDSStaffRank(s) > 1).sort((a, b) => getAIDSStaffRank(a) - getAIDSStaffRank(b));

      const deptInfo = tabPane.querySelector(".department-info");
      tabPane.innerHTML = "";
      if (deptInfo) tabPane.appendChild(deptInfo);

      if (headList.length > 0) {
        const headSection = document.createElement("div");
        headSection.className = "mb-5";
        headSection.innerHTML = `
          <div class="text-center mb-4">
            <h4 class="fw-bold text-uppercase" style="color: #dc2626; border-bottom: 2px solid #fee2e2; display: inline-block; padding-bottom: 6px; letter-spacing: 0.05em;">
              Professor and Head
            </h4>
          </div>
          <div class="row g-4 justify-content-center"></div>`;
        const headRow = headSection.querySelector(".row");
        headList.slice(0, 1).forEach(s => headRow.insertAdjacentHTML("beforeend", createCardHTML(s)));
        tabPane.appendChild(headSection);
      }

      if (facultyList.length > 0) {
        const facultySection = document.createElement("div");
        facultySection.className = "mb-5";
        facultySection.innerHTML = `
          <div class="text-center mb-4">
            <h4 class="fw-bold text-uppercase" style="color: #0f172a; border-bottom: 2px solid #e2e8f0; display: inline-block; padding-bottom: 6px; letter-spacing: 0.05em;">
              Faculty Members
            </h4>
          </div>
          <div class="row g-4 justify-content-center"></div>`;
        const facultyRow = facultySection.querySelector(".row");
        facultyList.forEach(s => facultyRow.insertAdjacentHTML("beforeend", createCardHTML(s)));
        tabPane.appendChild(facultySection);
      }
      return;
    }

    if (isScience) {
      const deptInfo = tabPane.querySelector(".department-info");
      tabPane.innerHTML = "";
      if (deptInfo) tabPane.appendChild(deptInfo);

      const scienceClusters = ["Mathematics", "Physics", "Chemistry", "English", "Tamil"];
      const getCluster = (dept = "") => {
        const d = dept.trim().toLowerCase();
        if (d.includes("math")) return "Mathematics";
        if (d.includes("physics")) return "Physics";
        if (d.includes("chemistry")) return "Chemistry";
        if (d.includes("english")) return "English";
        if (d.includes("tamil")) return "Tamil";
        return "Other";
      };

      const grouped = {};
      list.forEach(s => {
        const c = getCluster(s.department);
        if (!grouped[c]) grouped[c] = [];
        grouped[c].push(s);
      });

      scienceClusters.forEach(clusterName => {
        const clusterList = grouped[clusterName];
        if (clusterList && clusterList.length > 0) {
          clusterList.sort((a, b) => getDesignationPriority(a.designation || "") - getDesignationPriority(b.designation || ""));

          const sec = document.createElement("div");
          sec.className = "mb-5";
          sec.innerHTML = `
            <div class="text-center mb-4">
              <h4 class="fw-bold text-uppercase" style="color: #0f172a; border-bottom: 2px solid #e2e8f0; display: inline-block; padding-bottom: 6px; letter-spacing: 0.05em;">
                ${clusterName}
              </h4>
            </div>
            <div class="row g-4 justify-content-center"></div>`;
          const row = sec.querySelector(".row");
          clusterList.forEach(s => row.insertAdjacentHTML("beforeend", createCardHTML(s)));
          tabPane.appendChild(sec);
        }
      });

      if (grouped["Other"] && grouped["Other"].length > 0) {
        grouped["Other"].sort((a, b) => getDesignationPriority(a.designation || "") - getDesignationPriority(b.designation || ""));
        const sec = document.createElement("div");
        sec.className = "mb-5";
        sec.innerHTML = `
          <div class="text-center mb-4">
            <h4 class="fw-bold text-uppercase" style="color: #0f172a; border-bottom: 2px solid #e2e8f0; display: inline-block; padding-bottom: 6px; letter-spacing: 0.05em;">
              Other Disciplines
            </h4>
          </div>
          <div class="row g-4 justify-content-center"></div>`;
        const row = sec.querySelector(".row");
        grouped["Other"].forEach(s => row.insertAdjacentHTML("beforeend", createCardHTML(s)));
        tabPane.appendChild(sec);
      }
      return;
    }

    const tabContainer = tabPane.querySelector(".row.g-4");
    if (!tabContainer) return;
    tabContainer.innerHTML = "";

    list.sort((a, b) => getDesignationPriority(a.designation || "") - getDesignationPriority(b.designation || ""));
    list.forEach(staff => tabContainer.insertAdjacentHTML("beforeend", createCardHTML(staff)));
  });

  if (window.AOS) window.AOS.refresh();
}

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
