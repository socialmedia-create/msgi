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

// Preferred ECE Staff Ordering
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

// Load and display only ECE faculty, sorted by priority
async function loadCSEFaculty() {
  const querySnapshot = await getDocs(collection(db, "staff"));
  const cseFaculty = querySnapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(staff => { const d = (staff.department||"").trim().toLowerCase(); return d.includes("electronics and communication") || d.includes("electronics & communication") || d === "ece"; });

  const container = document.getElementById("ecefaculty");
  if (!container) return;

  // Section heading
  const heading = document.createElement("h2");
  heading.className = "text-center mb-4";
  heading.textContent = "Faculty – Electronics and Communication Engineering";
  container.appendChild(heading);

  // Card wrapper
  const cardRow = document.createElement("div");
  cardRow.className = "row g-4 mb-5";

  // Sort by preferred rank
  const sortedFaculty = cseFaculty.sort(
    (a, b) => getECEStaffRank(a) - getECEStaffRank(b)
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
