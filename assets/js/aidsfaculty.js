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

// Designation priority logic
function getDesignationPriority(designation = "") {
  const d = designation.trim().toLowerCase();

  if (d.includes("hod")) return 1;
  if (d === "professor") return 2;
  if (d.includes("associate")) return 3;
  if (d.includes("assistant")) return 4;
  return 5;
}

// Load and display only CSE faculty, sorted by priority
async function loadCSEFaculty() {
  const querySnapshot = await getDocs(collection(db, "staff"));
  const cseFaculty = querySnapshot.docs
    .map(doc => doc.data())
    .filter(staff => staff.department?.trim() === "AI DS");

  const container = document.getElementById("aidsfaculty");
  if (!container) return;

  // Section heading
  const heading = document.createElement("h2");
  heading.className = "text-center mb-4";
  heading.textContent = "Faculty – Artificial Intelligence and Data Science";
  container.appendChild(heading);

  // Card wrapper
  const cardRow = document.createElement("div");
  cardRow.className = "row g-4 mb-5";

  // Sort by designation
  const sortedFaculty = cseFaculty.sort(
    (a, b) => getDesignationPriority(a.designation) - getDesignationPriority(b.designation)
  );

  sortedFaculty.forEach((staff) => {
    const photoUrl = staff.imageUrl || "https://via.placeholder.com/80";

    const card = document.createElement("div");
    card.className = "col-md-6 col-lg-4";
    card.setAttribute("data-aos", "fade-up");
    card.setAttribute("data-aos-delay", "200");

    card.innerHTML = `
      <a href="https://staff-management-msec.web.app/" target="_blank" style="text-decoration: none; color: inherit;">
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
