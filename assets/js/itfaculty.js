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

function isITDepartment(dept = "") {
  const d = dept.trim().toLowerCase();
  return d.includes("information technology") || d === "it" || d.includes("dept of it");
}

function getDesignationPriority(designation = "") {
  const d = designation.trim().toLowerCase();
  if (d.includes("hod"))        return 1;
  if (d === "professor")        return 2;
  if (d.includes("associate"))  return 3;
  if (d.includes("assistant"))  return 4;
  if (d.includes("lab"))        return 5;
  return 6;
}

function formatName(title = "", firstName = "", lastName = "") {
  // Combine title + first + last, then normalise
  let raw = `${title} ${firstName} ${lastName}`.trim();
  if (!raw) return "Faculty Member";
  // Fix missing space after initials: "Dr.Sandhya" → "Dr. Sandhya"
  raw = raw.replace(/([A-Za-z])\.(\S)/g, "$1. $2");
  return raw.split(/\s+/).map(w => {
    const lower = w.toLowerCase().replace(/\.$/,"");
    if (lower === "dr")   return "Dr.";
    if (lower === "mr")   return "Mr.";
    if (lower === "mrs")  return "Mrs.";
    if (lower === "ms")   return "Ms.";
    if (lower === "prof") return "Prof.";
    if (/^[a-z]\.?$/i.test(w)) return w.charAt(0).toUpperCase() + ".";
    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  }).join(" ");
}

function formatDesignation(desig = "") {
  return (desig || "").trim().split(/\s+/).map(w => {
    const l = w.toLowerCase().replace(/,$/,"");
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

// ─── Card Styles (injected once) ─────────────────────────────────────────────
function injectCardStyles() {
  if (document.getElementById("it-faculty-card-styles")) return;
  const style = document.createElement("style");
  style.id = "it-faculty-card-styles";
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
  `;
  document.head.appendChild(style);
}

// ─── Main Loader ──────────────────────────────────────────────────────────────
async function loadITFaculty() {
  injectCardStyles();

  const container = document.getElementById("itfaculty");
  if (!container) return;

  const querySnapshot = await getDocs(collection(db, "staff"));

  const itStaff = querySnapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(staff => isITDepartment(staff.department))
    .sort((a, b) => getDesignationPriority(a.designation) - getDesignationPriority(b.designation));

  if (itStaff.length === 0) return;

  const heading = document.createElement("h2");
  heading.className = "text-center mb-4";
  heading.textContent = "Faculty – Information Technology";
  container.appendChild(heading);

  const cardRow = document.createElement("div");
  cardRow.className = "row g-4 mb-5 justify-content-center";

  itStaff.forEach(staff => {
    const name    = formatName(staff.title, staff.firstName, staff.lastName);
    const desig   = formatDesignation(staff.designation);
    const dept    = (staff.department || "Information Technology").trim();
    const initials = getInitials(name);
    const hasImg  = staff.imageUrl && (staff.imageUrl.startsWith("http") || staff.imageUrl.startsWith("data:image"));

    const specialtiesHtml = (staff.specialties && staff.specialties.length > 0)
      ? `<div class="mt-2">${staff.specialties.map(s => `<span class="msec-faculty-specialty">${s}</span>`).join("")}</div>`
      : "";

    const avatarHtml = hasImg
      ? `<img src="${staff.imageUrl}" class="msec-faculty-avatar shadow-sm" alt="${name}" loading="lazy">`
      : `<div class="msec-faculty-initials shadow-sm">${initials}</div>`;

    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4 mb-4 d-flex";
    col.setAttribute("data-aos", "fade-up");
    col.setAttribute("data-aos-delay", "100");
    col.innerHTML = `
      <a href="https://staff-management-msec.web.app" class="w-100 text-decoration-none" style="color:inherit;">
        <div class="msec-faculty-card">
          ${avatarHtml}
          <h5 class="msec-faculty-name">${name}</h5>
          <p class="msec-faculty-designation">${desig}</p>
          <span class="msec-faculty-dept-badge">${dept}</span>
          ${specialtiesHtml}
        </div>
      </a>`;

    cardRow.appendChild(col);
  });

  container.appendChild(cardRow);
  if (window.AOS) window.AOS.refresh();
}

loadITFaculty();
