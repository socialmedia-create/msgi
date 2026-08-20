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

function createCardHTML(staff) {
  const photoUrl = staff.imageUrl || "https://via.placeholder.com/80";
  const rawName = [staff.title, staff.firstName, staff.lastName].filter(Boolean).join(" ") || staff.fullName || staff.name || "";
  const cleanName = rawName.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.|Prof\.)\s*/i, "").trim();
  const nameSlug = cleanName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || "faculty";
  const profileUrl = `https://staff-management-inky.vercel.app/preview/${nameSlug}`;

  return `
    <div class="col-md-6 col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="200">
      <a href="${profileUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit;">
        <div class="faculty-card m-1 row align-items-center justify-content-center">
          <div class="faculty-image1">
            <img src="${photoUrl}" class="img-fluid" alt="${getInitials(staff.firstName, staff.lastName)}">
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
    </div>
  `;
}

// Load and display only CSE faculty, sorted in 2 sections (Heads + Faculty Members)
async function loadCSEFaculty() {
  const querySnapshot = await getDocs(collection(db, "staff"));
  const cseFaculty = querySnapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(staff => { const d = (staff.department || "").trim().toLowerCase(); return d.includes("computer science") || d === "cse"; });

  const container = document.getElementById("csefaculty");
  if (!container) return;
  container.innerHTML = "";

  // Section heading
  const heading = document.createElement("h2");
  heading.className = "text-center mb-4";
  heading.textContent = "Faculty – Computer Science and Engineering";
  container.appendChild(heading);

  const headList = cseFaculty.filter(s => getCSEStaffRank(s) <= 2).sort((a, b) => getCSEStaffRank(a) - getCSEStaffRank(b));
  const facultyList = cseFaculty.filter(s => getCSEStaffRank(s) > 2).sort((a, b) => getCSEStaffRank(a) - getCSEStaffRank(b));

  // Section 1: Heads (Dr. S. Aarthi & Dr. M. K. Sandhya)
  if (headList.length > 0) {
    const headSection = document.createElement("div");
    headSection.className = "mb-5";
    headSection.innerHTML = `
      <div class="text-center mb-4">
        <h4 class="fw-bold text-uppercase" style="color: #dc2626; border-bottom: 2px solid #fee2e2; display: inline-block; padding-bottom: 6px; letter-spacing: 0.05em;">
          Heads
        </h4>
      </div>
      <div class="row g-4 justify-content-center"></div>`;
    const headRow = headSection.querySelector(".row");
    headList.slice(0, 2).forEach(s => headRow.insertAdjacentHTML("beforeend", createCardHTML(s)));
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
    facultyList.forEach(s => facultyRow.insertAdjacentHTML("beforeend", createCardHTML(s)));
    container.appendChild(facultySection);
  }

  if (window.AOS) window.AOS.init();
}

function getInitials(firstName = "", lastName = "") {
  const f = firstName.trim().charAt(0).toUpperCase();
  const l = lastName.trim().charAt(0).toUpperCase();
  return `${f}${l}`;
}

loadCSEFaculty();
