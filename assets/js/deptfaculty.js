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

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isDeptMatch(dept, keywords) {
  const d = (dept || "").trim().toLowerCase();
  return keywords.some(k => d.includes(k));
}

const IT_STAFF_PREFERRED_ORDER = [
  { keywords: ["selvi"], rank: 1 },
  { keywords: ["priskilla", "priscilla"], rank: 2 },
  { keywords: ["gayathri", "gayatri"], rank: 3 },
  { keywords: ["mohan raj", "mohanraj"], rank: 4 },
  { keywords: ["babitha"], rank: 5 },
  { keywords: ["abinaya"], rank: 6 },
  { keywords: ["shruthi", "shruti"], rank: 7 },
  { keywords: ["padmapriya", "padma priya"], rank: 8 },
  { keywords: ["vidhya", "vidya"], rank: 9 },
  { keywords: ["lalitha"], rank: 10 },
  { keywords: ["kannan"], rank: 11 },
  { keywords: ["aravind", "aravindh"], rank: 12 },
  { keywords: ["sowndhariya", "sowndarya", "soundarya"], rank: 13 },
  { keywords: ["angelin"], rank: 14 },
  { keywords: ["umamaheswari", "uma maheswari", "umamaheshwari"], rank: 15 }
];

function getITStaffRank(staff) {
  const nameStr = [
    staff.title || "",
    staff.firstName || "",
    staff.lastName || "",
    staff.name || ""
  ].join(" ").toLowerCase();

  for (let i = 0; i < IT_STAFF_PREFERRED_ORDER.length; i++) {
    const item = IT_STAFF_PREFERRED_ORDER[i];
    if (item.keywords.some(kw => nameStr.includes(kw))) {
      return item.rank;
    }
  }
  return 999;
}

function getDesignationPriority(designation) {
  const d = (designation || "").trim().toLowerCase();
  if (d.includes("hod")) return 1;
  if (d === "professor") return 2;
  if (d.includes("associate")) return 3;
  if (d.includes("assistant")) return 4;
  if (d.includes("lab")) return 5;
  return 6;
}

function formatName(title, firstName, lastName) {
  title = (title || "").trim();
  firstName = (firstName || "").trim();
  lastName = (lastName || "").trim();

  // Fix missing space: "Dr.Sandhya" -> "Dr. Sandhya"
  firstName = firstName.replace(/([A-Za-z])\.(\S)/g, "$1. $2");

  // If title field empty but firstName has embedded prefix, extract it
  if (!title) {
    const m = firstName.match(/^(Dr\.|Mr\.|Mrs\.|Ms\.|Prof\.)\s*/i);
    if (m) {
      title = m[1];
      firstName = firstName.slice(m[0].length).trim();
    }
  }

  const raw = [title, firstName, lastName].filter(Boolean).join(" ");
  if (!raw) return "Faculty Member";

  return raw.split(/\s+/).map(w => {
    const l = w.toLowerCase().replace(/\.$/, "");
    if (l === "dr") return "Dr.";
    if (l === "mr") return "Mr.";
    if (l === "mrs") return "Mrs.";
    if (l === "ms") return "Ms.";
    if (l === "prof") return "Prof.";
    if (/^[a-z]\.?$/i.test(w)) return w.charAt(0).toUpperCase() + ".";
    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  }).join(" ");
}

function formatDesignation(desig) {
  return (desig || "").trim().split(/\s+/).map(w => {
    const l = w.toLowerCase().replace(/,$/, "");
    if (l === "hod") return "HOD";
    if (l === "lab") return "Lab";
    if (l === "and" || l === "&") return "and";
    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  }).join(" ").trim() || "Faculty";
}

function getInitials(name) {
  const parts = name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.|Prof\.)\s+/i, "").split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return parts[0] ? parts[0].substring(0, 2).toUpperCase() : "MS";
}

function injectCardStyles() {
  if (document.getElementById("dept-faculty-card-styles")) return;
  const s = document.createElement("style");
  s.id = "dept-faculty-card-styles";
  s.textContent = [
    ".msec-faculty-card{background:#fff;border:1px solid #f1f1f1;border-radius:20px;padding:32px 28px;",
    "text-align:center;box-shadow:0 2px 14px rgba(0,0,0,.07);transition:transform .25s,box-shadow .25s;",
    "height:100%;width:100%;display:flex;flex-direction:column;align-items:center}",
    ".msec-faculty-card:hover{transform:translateY(-5px);box-shadow:0 12px 32px rgba(220,38,38,.13)}",
    ".msec-faculty-avatar{width:120px;height:120px;border-radius:50%;object-fit:cover;",
    "border:3px solid #fca5a5;margin-bottom:18px;flex-shrink:0}",
    ".msec-faculty-initials{width:120px;height:120px;border-radius:50%;",
    "background:linear-gradient(135deg,#fee2e2,#fef2f2);border:3px solid #fca5a5;",
    "display:flex;align-items:center;justify-content:center;margin-bottom:18px;",
    "flex-shrink:0;font-size:32px;font-weight:700;color:#dc2626;letter-spacing:1px}",
    ".msec-faculty-name{font-size:1.05rem;font-weight:700;color:#0f172a;margin-bottom:6px;line-height:1.35}",
    ".msec-faculty-designation{font-size:.875rem;font-weight:600;color:#dc2626;margin-bottom:10px;line-height:1.4}",
    ".msec-faculty-dept-badge{display:inline-block;background:#fef2f2;color:#7f1d1d;",
    "border:1px solid #fecaca;border-radius:20px;padding:4px 16px;font-size:.78rem;font-weight:500;margin-top:6px}",
    ".msec-faculty-specialty{display:inline-block;background:#f8fafc;color:#475569;",
    "border:1px solid #e2e8f0;border-radius:20px;padding:3px 10px;font-size:.73rem;margin:2px}"
  ].join("");
  document.head.appendChild(s);
}

function getStaffPreviewUrl(staff) {
  let fn = (staff.firstName || "").trim();
  if (!fn) {
    const raw = (staff.name || staff.fullName || "").trim();
    fn = raw.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.|Prof\.)\s*/i, "").trim().split(/\s+/)[0] || "";
  } else {
    fn = fn.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.|Prof\.)\s*/i, "").trim();
  }
  const slug = encodeURIComponent(fn.toLowerCase());
  return `https://staff-management-inky.vercel.app/preview/${slug}`;
}

function createDeptCardHTML(s) {
  const name = formatName(s.title, s.firstName, s.lastName);
  const desig = formatDesignation(s.designation);
  const dept = (s.department || "").trim();
  const inits = getInitials(name);
  const hasImg = s.imageUrl && (s.imageUrl.startsWith("http") || s.imageUrl.startsWith("data:image"));
  const profileUrl = getStaffPreviewUrl(s);

  const avatar = hasImg
    ? '<img src="' + s.imageUrl + '" class="msec-faculty-avatar shadow-sm" alt="' + name + '" loading="lazy">'
    : '<div class="msec-faculty-initials shadow-sm">' + inits + '</div>';

  const specHtml = (s.specialties && s.specialties.length)
    ? '<div class="mt-2">' + s.specialties.map(function (sp) {
      return '<span class="msec-faculty-specialty">' + sp + '</span>';
    }).join("") + '</div>'
    : "";

  return '<div class="col-md-6 col-lg-4 mb-4 d-flex" data-aos="fade-up" data-aos-delay="100">' +
    '<a href="' + profileUrl + '" target="_blank" rel="noopener noreferrer" class="w-100 text-decoration-none" style="color:inherit;">' +
    '<div class="msec-faculty-card">' +
    avatar +
    '<h5 class="msec-faculty-name">' + name + '</h5>' +
    '<p class="msec-faculty-designation">' + desig + '</p>' +
    '<span class="msec-faculty-dept-badge">' + dept + '</span>' +
    specHtml +
    '</div>' +
    '</a></div>';
}

// ─── Generic Department Loader ────────────────────────────────────────────────
async function loadDeptFaculty(containerId, deptKeywords, headingText) {
  injectCardStyles();

  const container = document.getElementById(containerId);
  if (!container) return;

  const isIT = containerId === "itfaculty" || deptKeywords.some(k => k.includes("information technology") || k === "it");
  const querySnapshot = await getDocs(collection(db, "staff"));
  const staffList = querySnapshot.docs
    .map(d => Object.assign({ id: d.id }, d.data()))
    .filter(s => isDeptMatch(s.department, deptKeywords))
    .sort((a, b) => {
      if (isIT) {
        const rankA = getITStaffRank(a);
        const rankB = getITStaffRank(b);
        if (rankA !== rankB) return rankA - rankB;
      }
      return getDesignationPriority(a.designation) - getDesignationPriority(b.designation);
    });

  if (isIT) {
    const headList = staffList.filter(s => getITStaffRank(s) <= 2).sort((a, b) => getITStaffRank(a) - getITStaffRank(b));
    const facultyList = staffList.filter(s => getITStaffRank(s) > 2).sort((a, b) => getITStaffRank(a) - getITStaffRank(b));

    const heading = document.createElement("h2");
    heading.className = "text-center mb-4";
    heading.textContent = headingText;
    container.appendChild(heading);

    // Section 1: Professor and Head (Max 2 cards)
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
      headList.slice(0, 2).forEach(s => headRow.insertAdjacentHTML("beforeend", createDeptCardHTML(s)));
      container.appendChild(headSection);
    }

    // Section 2: Remaining Staff
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
      facultyList.forEach(s => facultyRow.insertAdjacentHTML("beforeend", createDeptCardHTML(s)));
      container.appendChild(facultySection);
    }

    if (window.AOS) window.AOS.refresh();
    return;
  }

  const heading = document.createElement("h2");
  heading.className = "text-center mb-4";
  heading.textContent = headingText;
  container.appendChild(heading);

  const row = document.createElement("div");
  row.className = "row g-4 mb-5 justify-content-center";

  staffList.forEach(function (s) {
    row.insertAdjacentHTML("beforeend", createDeptCardHTML(s));
  });

  container.appendChild(row);
  if (window.AOS) window.AOS.refresh();
}

// ─── Department Configs ────────────────────────────────────────────────────────
var DEPT_CONFIG = [
  { id: "aidsfaculty", keywords: ["artificial intelligence", "ai ds", "ai & ds", "data science"], heading: "Faculty \u2013 Artificial Intelligence and Data Science" },
  { id: "csefaculty", keywords: ["computer science"], heading: "Faculty \u2013 Computer Science and Engineering" },
  { id: "ecefaculty", keywords: ["electronics and communication", "electronics & communication", "ece"], heading: "Faculty \u2013 Electronics and Communication Engineering" },
  { id: "eeefaculty", keywords: ["electrical and electronics", "electrical & electronics", "eee"], heading: "Faculty \u2013 Electrical and Electronics Engineering" },
  { id: "itfaculty", keywords: ["information technology", "dept of it"], heading: "Faculty \u2013 Information Technology" },
  { id: "mechfaculty", keywords: ["mechanical"], heading: "Faculty \u2013 Mechanical Engineering" },
  { id: "civilfaculty", keywords: ["civil"], heading: "Faculty \u2013 Civil Engineering" }
];

// ─── Science & Humanities (multi-container page) ──────────────────────────────
var SCIENCE_CONTAINERS = [
  { id: "mathsfaculty", dept: "Mathematics" },
  { id: "physicsfaculty", dept: "Physics" },
  { id: "englishfaculty", dept: "English" },
  { id: "tamilfaculty", dept: "Tamil" },
  { id: "chemistryfaculty", dept: "Chemistry" }
];

async function loadScienceFaculty() {
  injectCardStyles();
  var querySnapshot = await getDocs(collection(db, "staff"));
  var allStaff = querySnapshot.docs.map(function (d) { return Object.assign({ id: d.id }, d.data()); });

  for (var j = 0; j < SCIENCE_CONTAINERS.length; j++) {
    var sc = SCIENCE_CONTAINERS[j];
    var container = document.getElementById(sc.id);
    if (!container) continue;

    var deptStaff = allStaff
      .filter(function (s) { return (s.department || "").trim().toLowerCase() === sc.dept.toLowerCase(); })
      .sort(function (a, b) { return getDesignationPriority(a.designation) - getDesignationPriority(b.designation); });

    if (deptStaff.length === 0) continue;

    var heading = document.createElement("h2");
    heading.className = "text-center mb-4";
    heading.textContent = "Faculty \u2013 " + sc.dept;
    container.appendChild(heading);

    var row = document.createElement("div");
    row.className = "row g-4 mb-5 justify-content-center";

    deptStaff.forEach(function (s) {
      var name = formatName(s.title, s.firstName, s.lastName);
      var desig = formatDesignation(s.designation);
      var dept = (s.department || "").trim();
      var inits = getInitials(name);
      var hasImg = s.imageUrl && (s.imageUrl.startsWith("http") || s.imageUrl.startsWith("data:image"));

      var avatar = hasImg
        ? '<img src="' + s.imageUrl + '" class="msec-faculty-avatar shadow-sm" alt="' + name + '" loading="lazy">'
        : '<div class="msec-faculty-initials shadow-sm">' + inits + '</div>';

      var specHtml = (s.specialties && s.specialties.length)
        ? '<div class="mt-2">' + s.specialties.map(function (sp) { return '<span class="msec-faculty-specialty">' + sp + '</span>'; }).join("") + '</div>'
        : "";

      var col = document.createElement("div");
      col.className = "col-md-6 col-lg-4 mb-4 d-flex";
      col.setAttribute("data-aos", "fade-up");
      col.setAttribute("data-aos-delay", "100");
      col.innerHTML =
        '<a href="https://staff-management-msec.web.app" class="w-100 text-decoration-none" style="color:inherit;">' +
        '<div class="msec-faculty-card">' +
        avatar +
        '<h5 class="msec-faculty-name">' + name + '</h5>' +
        '<p class="msec-faculty-designation">' + desig + '</p>' +
        '<span class="msec-faculty-dept-badge">' + dept + '</span>' +
        specHtml +
        '</div>' +
        '</a>';
      row.appendChild(col);
    });

    container.appendChild(row);
  }
  if (window.AOS) window.AOS.refresh();
}

// ─── Auto-detect and run ───────────────────────────────────────────────────────
// Check if this is the Science & Humanities page
var isSciencePage = SCIENCE_CONTAINERS.some(function (sc) { return !!document.getElementById(sc.id); });
if (isSciencePage) {
  loadScienceFaculty();
} else {
  for (var i = 0; i < DEPT_CONFIG.length; i++) {
    var cfg = DEPT_CONFIG[i];
    if (document.getElementById(cfg.id)) {
      loadDeptFaculty(cfg.id, cfg.keywords, cfg.heading);
      break;
    }
  }
}
