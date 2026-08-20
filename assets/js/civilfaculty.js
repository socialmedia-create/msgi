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

// Preferred Civil Staff Ordering
const CIVIL_STAFF_PREFERRED_ORDER = [
  { keywords: ["asha"], rank: 1 },
  { keywords: ["nirmalambal"], rank: 2 },
  { keywords: ["ponni"], rank: 3 },
  { keywords: ["poongothai"], rank: 4 },
  { keywords: ["arivazhagan", "arivazaghan"], rank: 5 },
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

// Load and display only Civil faculty, sorted by priority
async function loadCSEFaculty() {
  const querySnapshot = await getDocs(collection(db, "staff"));
  const cseFaculty = querySnapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(staff => staff.department?.trim() === "Civil Engineering");

  const container = document.getElementById("civilfaculty");
  if (!container) return;

  // Section heading
  const heading = document.createElement("h2");
  heading.className = "text-center mb-4";
  heading.textContent = "Faculty – Civil Engineering";
  container.appendChild(heading);

  // Card wrapper
  const cardRow = document.createElement("div");
  cardRow.className = "row g-4 mb-5";

  // Sort by preferred rank
  const sortedFaculty = cseFaculty.sort(
    (a, b) => getCivilStaffRank(a) - getCivilStaffRank(b)
  );

  sortedFaculty.forEach((staff) => {
    const card = document.createElement("div");
    card.className = "col-md-6 col-lg-4";
    card.setAttribute("data-aos", "fade-up");
    card.setAttribute("data-aos-delay", "200");

    const rawName = [staff.title, staff.firstName, staff.lastName].filter(Boolean).join(" ") || staff.fullName || staff.name || "";
    const cleanName = rawName.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.|Prof\.)\s*/i, "").trim();
    const nameSlug = cleanName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || "faculty";
    const profileUrl = `https://staff-management-inky.vercel.app/preview/${nameSlug}`;

    card.innerHTML = `
      <a href="${profileUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit;">
        <div class="faculty-card m-1 row align-items-center justify-content-center">
          <div class="faculty-image1 text-center mb-2">
            ${
              staff.imageUrl && (staff.imageUrl.startsWith("data:image") || staff.imageUrl.includes("http"))
                ? `<img src="${staff.imageUrl}" class="img-fluid" style="width: 100px; height: 100px; object-fit: cover; border-radius: 50%;">`
                : `<div class="d-flex align-items-center justify-content-center rounded-circle text-danger"
                       style="
                         width: 100px;
                         height: 100px;
                         font-size: 36px;
                         font-weight: bold;
                         text-transform: uppercase;
                         margin: 0 auto;">
                     ${getInitials(staff.firstName, staff.lastName)}
                   </div>`
            }
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
    `;
    cardRow.appendChild(card);
  });

  container.appendChild(cardRow);
  AOS.init();
}

function getInitials(firstName = "", lastName = "") {
  const f = firstName.trim().charAt(0).toUpperCase();
  const l = lastName.trim().charAt(0).toUpperCase();
  return `${f}${l}`;
}
loadCSEFaculty();
