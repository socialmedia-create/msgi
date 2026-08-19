import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

// Firebase Config
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

function createCardHTML(staff) {
  const rawName = [staff.title, staff.firstName, staff.lastName].filter(Boolean).join(" ") || staff.fullName || staff.name || "";
  const cleanName = rawName.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.|Prof\.)\s*/i, "").trim();
  const nameSlug = cleanName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || "faculty";
  const profileUrl = `https://staff-management-inky.vercel.app/preview/${nameSlug}`;

  const hasImg = staff.imageUrl && (staff.imageUrl.startsWith("data:image") || staff.imageUrl.includes("http"));
  const avatarHtml = hasImg
    ? `<img src="${staff.imageUrl}" class="img-fluid" style="width: 100px; height: 100px; object-fit: cover; border-radius: 50%;">`
    : `<div class="d-flex align-items-center justify-content-center rounded-circle text-danger" style="width: 100px; height: 100px; font-size: 36px; font-weight: bold; text-transform: uppercase; margin: 0 auto;">${getInitials(staff.firstName, staff.lastName)}</div>`;

  return `
    <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
      <a href="${profileUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit;">
        <div class="faculty-card m-1 row align-items-center justify-content-center">
          <div class="faculty-image1 text-center mb-2">
            ${avatarHtml}
          </div>
          <div class="faculty-info">
            <h4 class="text-center">${staff.firstName || 'No Name'} ${staff.lastName || ''}</h4>
            <p class="faculty-title text-center text-danger">${staff.designation || ''}</p>
            <div class="faculty-specialties">
              ${(staff.specialties || []).map(spec => `<span>${spec}</span>`).join('')}
            </div>
          </div>
        </div>
      </a>
    </div>`;
}

// Load and display AI DS faculty, sorted by order
async function loadAIDSFaculty() {
  const querySnapshot = await getDocs(collection(db, "staff"));
  const aidsFaculty = querySnapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(staff => {
      const d = (staff.department || "").trim().toLowerCase();
      return d.includes("artificial intelligence") || d.includes("ai ds") || d.includes("ai & ds") || d.includes("data science");
    })
    .sort((a, b) => getAIDSStaffRank(a) - getAIDSStaffRank(b));

  const container = document.getElementById("aidsfaculty");
  if (!container) return;
  container.innerHTML = "";

  const heading = document.createElement("h2");
  heading.className = "text-center mb-4";
  heading.textContent = "Faculty – Artificial Intelligence and Data Science";
  container.appendChild(heading);

  const headList = aidsFaculty.filter(s => getAIDSStaffRank(s) <= 1);
  const facultyList = aidsFaculty.filter(s => getAIDSStaffRank(s) > 1);

  if (headList.length > 0) {
    const headSec = document.createElement("div");
    headSec.className = "mb-5";
    headSec.innerHTML = `
      <div class="text-center mb-4">
        <h4 class="fw-bold text-uppercase" style="color: #dc2626; border-bottom: 2px solid #fee2e2; display: inline-block; padding-bottom: 6px; letter-spacing: 0.05em;">
          Professor and Head
        </h4>
      </div>
      <div class="row g-4 justify-content-center"></div>`;
    const headRow = headSec.querySelector(".row");
    headList.slice(0, 1).forEach(s => headRow.insertAdjacentHTML("beforeend", createCardHTML(s)));
    container.appendChild(headSec);
  }

  if (facultyList.length > 0) {
    const facSec = document.createElement("div");
    facSec.className = "mb-5";
    facSec.innerHTML = `
      <div class="text-center mb-4">
        <h4 class="fw-bold text-uppercase" style="color: #0f172a; border-bottom: 2px solid #e2e8f0; display: inline-block; padding-bottom: 6px; letter-spacing: 0.05em;">
          Faculty Members
        </h4>
      </div>
      <div class="row g-4 justify-content-center"></div>`;
    const facRow = facSec.querySelector(".row");
    facultyList.forEach(s => facRow.insertAdjacentHTML("beforeend", createCardHTML(s)));
    container.appendChild(facSec);
  }

  if (window.AOS) window.AOS.init();
}

function getInitials(firstName = "", lastName = "") {
  const f = (firstName || "").trim().charAt(0).toUpperCase();
  const l = (lastName || "").trim().charAt(0).toUpperCase();
  return `${f}${l}`;
}

loadAIDSFaculty();
